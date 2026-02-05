import TextField from "@/components/form/fields/TextField";

export default function FieldFactory({ field }: { field: Field }) {
  switch (field.type) {
    case "text":
      return <TextField data={field} />;

    default:
      return "Wrong element";
  }
}
