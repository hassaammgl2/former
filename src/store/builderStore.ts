import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import { handleFields } from "@/lib/handleFields";
import { getFieldCategory } from "@/lib/get-field-category";

const initialMeta: FormMeta = {
  id: nanoid(),
  title: `Untitled Form ${Date.now()}`,
  description: "Write your description here",
  version: 1,
};

const MAX_HISTORY = 30;

export const useBuilderStore = create<FormBuilderState>()(
  immer((set, get) => ({
    meta: initialMeta,
    fields: [],
    status: "draft",
    selectedFieldId: null,
    isDirty: false,
    history: [],
    historyIndex: -1,
    setIsDirty: (value) => {
      set({ isDirty: value });
    },
    updateHistory: () => {
      const { fields, history, historyIndex } = get();
      const snapshot = structuredClone(fields);

      set((state) => {
        if (historyIndex < history.length - 1) {
          state.history = state.history.slice(0, historyIndex + 1);
        }
        state.history.push(snapshot);
        if (state.history.length > MAX_HISTORY) {
          state.history.shift();
          state.historyIndex--;
        } else {
          state.historyIndex++;
        }
      });
    },

    addField: (type) => {
      const ftype = `${type.substring(0, 1).toUpperCase()}${type.substring(1)}`;

      set((state) => {
        if (getFieldCategory(type) === null) {
          const field: Field = {
            id: nanoid(),
            type,
            label: `New ${ftype} Field`,
            required: false,
            helperText: "",
            config: handleFields(type),
          };
          state.fields.push(field);
          state.isDirty = true;
        } else if (getFieldCategory(type) === "layout") {
          const field: Field = {
            id: nanoid(),
            type,
            innerText: `This is ${ftype}`,
          };
          state.fields.push(field);
          state.isDirty = true;
        } else {
          const field: Field = {
            id: nanoid(),
            type,
            label: `New ${ftype} Field`,
            required: false,
            helperText: "",
            options: [
              {
                id: nanoid(),
                label: "Option 1",
                value: "option-1",
              },
            ],
            config: handleFields(type),
          };
          state.fields.push(field);
          state.isDirty = true;
        }
      });
      get().updateHistory();
    },

    updateField: (id, data) => {
      set((state) => {
        const field = state.fields.find((f) => f.id === id);
        if (!field) return;
        Object.assign(field, data);
        state.isDirty = true;
      });
      get().updateHistory();
    },

    deleteField: (id) => {
      set((state) => {
        state.fields = state.fields.filter((f) => f.id !== id);
        state.isDirty = true;
      });
      get().updateHistory();
    },

    // reorderFields: (from, to) => {
    //     set((state) => {
    //         const [moved] = state.fields.splice(from, 1)
    //         state.fields.splice(to, 0, moved)
    //         state.isDirty = true
    //     })
    //         ; (get() as any)._pushHistory()
    // },

    selectField: (id) => {
      set((state) => {
        state.selectedFieldId = id;
      });
    },

    addOption: (fieldId) => {
      set((state) => {
        const field = state.fields.find((f) => f.id === fieldId);
        if (!field) return;
        if (!field.options) field.options = [];

        const count = field.options.length + 1;

        field.options.push({
          id: nanoid(),
          label: `Option ${count}`,
          value: `option-${count}`,
        });

        state.isDirty = true;
      });
      get().updateHistory();
    },

    updateOption: (fieldId, optionId, data) => {
      set((state) => {
        const field = state.fields.find((f) => f.id === fieldId);
        if (!field?.options) return;
        const opt = field.options.find((o) => o.id === optionId);
        if (opt) Object.assign(opt, data);
        state.isDirty = true;
      });
      get().updateHistory();
    },

    deleteOption: (fieldId, optionId) => {
      set((state) => {
        const field = state.fields.find((f) => f.id === fieldId);
        if (!field?.options) return;
        if (field.options.length <= 1) return;

        field.options = field.options.filter((opt) => opt.id !== optionId);

        state.isDirty = true;
      });
      get().updateHistory();
    },

    undo: () => {
      const { historyIndex, history } = get();
      if (historyIndex <= 0) return;

      set((state) => {
        state.historyIndex--;
        state.fields = structuredClone(history[state.historyIndex]);
        state.isDirty = true;
      });
    },

    redo: () => {
      const { historyIndex, history } = get();
      if (historyIndex >= history.length - 1) return;

      set((state) => {
        state.historyIndex++;
        state.fields = structuredClone(history[state.historyIndex]);
        state.isDirty = true;
      });
    },

    // resetForm: () => {
    //     set((state) => {
    //         state.meta = initialMeta
    //         state.fields = []
    //         state.selectedFieldId = null
    //         state.isDirty = false
    //         state.history = []
    //         state.historyIndex = -1
    //     })
    // },

    setMeta: (meta) => {
      set((state) => {
        Object.assign(state.meta, meta);
        state.isDirty = true;
      });
    },
  })),
);
