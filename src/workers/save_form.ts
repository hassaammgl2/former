import { Worker, Job } from "bullmq";
import { redis } from "@/constants/redis";
import prisma from "@/services/prisma/prisma";

class SaveFormWorker {
  private worker!: Worker;

  private handleWorker() {
    this.worker = new Worker(
      "save-form-queue",
      async (job: Job<ISaveForm>) => {
        const { data } = job;

        try {
          await prisma.backgroundJob.update({
            where: {
              jobId: job.id!,
            },
            data: {
              status: "PROCESSING",
              startedAt: new Date(),
              attempts: job.attemptsMade + 1,
            },
          });

          const result = await prisma.$transaction(async (tx) => {
            // Create or update form
            const form = await tx.form.upsert({
              where: {
                id: data.meta.id,
              },
              update: {
                name: data.meta.title,
                description: data.meta.description,
              },
              create: {
                id: data.meta.id,
                ownerId: data.userId,
                name: data.meta.title,
                description: data.meta.description,
              },
            });

            // Find existing version
            let version = await tx.formVersion.findUnique({
              where: {
                formId_version: {
                  formId: form.id,
                  version: data.meta.version,
                },
              },
            });

            if (version) {
              // Update schema
              version = await tx.formVersion.update({
                where: {
                  formId_version: {
                    formId: form.id,
                    version: data.meta.version,
                  },
                },
                data: {
                  schema: JSON.parse(JSON.stringify(data.fields)),
                },
              });

              // Remove previous fields
              await tx.formField.deleteMany({
                where: {
                  formVersionId: version.id,
                },
              });
            } else {
              // Create new version
              version = await tx.formVersion.create({
                data: {
                  id: crypto.randomUUID(),
                  formId: form.id,
                  version: data.meta.version,
                  schema: JSON.parse(JSON.stringify(data.fields)),
                  isPublished: false,
                },
              });
            }

            // Insert latest fields
            await tx.formField.createMany({
              data: data.fields.map((field, index) => ({
                id: crypto.randomUUID(),
                formVersionId: version.id,
                type: field.type,
                label: field.label ?? "",
                name: field.id,
                required: field.required ?? false,
                order: index,
                config: JSON.parse(JSON.stringify(field)),
              })),
            });

            return {
              formId: form.id,
              versionId: version.id,
            };
          });

          await prisma.backgroundJob.update({
            where: {
              jobId: job.id!,
            },
            data: {
              status: "COMPLETED",
              finishedAt: new Date(),
              error: null,
              result,
            },
          });

          return result;
        } catch (error) {
          await prisma.backgroundJob.update({
            where: {
              jobId: job.id!,
            },
            data: {
              status: "FAILED",
              finishedAt: new Date(),
              error: error instanceof Error ? error.message : String(error),
            },
          });

          throw error;
        }
      },
      {
        connection: redis,
      },
    );

    this.worker.on("completed", (job) => {
      console.log(`✅ Job ${job.id} completed`);
    });

    this.worker.on("failed", (job, err) => {
      console.error(`❌ Job ${job?.id} failed:`, err);
    });

    this.worker.on("error", (err) => {
      console.error("Worker error:", err);
    });
  }

  public start() {
    console.log("Save Form Worker started");
    this.handleWorker();
    console.log("Save Form Worker ready");
  }
}

export const saveFormWorker = new SaveFormWorker();
