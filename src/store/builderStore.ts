import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { nanoid } from "nanoid"

const initialMeta: FormMeta = {
    id: nanoid(),
    title: "Untitled Form",
    description: "Write your description here",
    version: "1"
}

export const useBuilderStore = create<FormBuilderState>()(
    // immer((set, get) => ({
    immer((set,) => ({
        meta: initialMeta,
        fields: [],
        selectedFieldId: null,
        isDirty: false,
        // history: [],
        // historyIndex: -1,


        addField: (type) => {
            set((state) => {
                const field: Field = {
                    id: nanoid(),
                    type,
                    label: "New Field",
                    required: false,
                    helperText: "",
                    options: type === "select" || type === "radio" ? [] : undefined,
                    config: type === "text" ? [{
                        label: "Min",
                        value: 0
                    }, { label: "Max", value: 200 }] : undefined
                }
                state.fields.push(field)
                state.isDirty = true
            })
        },

        updateField: (id, data) => {

            console.log(id, data);
        },

        deleteField: (id) => {
            console.log(id);
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
                state.selectedFieldId = id
            })
        },

        // addOption: (fieldId) => {
        //     set((state) => {
        //         const field = state.fields.find((f) => f.id === fieldId)
        //         if (!field || !field.options) return
        //         field.options.push({
        //             id: nanoid(),
        //             label: "Option",
        //             value: "option",
        //         })
        //         state.isDirty = true
        //     })
        //         ; (get() as any)._pushHistory()
        // },

        updateOption: (fieldId, optionId, data) => {
            set((state) => {
                const field = state.fields.find((f) => f.id === fieldId)
                if (!field?.options) return
                const opt = field.options.find((o) => o.id === optionId)
                if (opt) Object.assign(opt, data)
                state.isDirty = true
            })
            // ; (get() as any)._pushHistory()
        },

        // deleteOption: (fieldId, optionId) => {
        //     set((state) => {
        //         const field = state.fields.find((f) => f.id === fieldId)
        //         if (!field?.options) return
        //         field.options = field.options.filter((o) => o.id !== optionId)
        //         state.isDirty = true
        //     })
        //         ; (get() as any)._pushHistory()
        // },

        // undo: () => {
        //     const { historyIndex, history } = get()
        //     if (historyIndex <= 0) return
        //     set((state) => {
        //         state.historyIndex--
        //         state.fields = JSON.parse(JSON.stringify(history[state.historyIndex]))
        //     })
        // },

        // redo: () => {
        //     const { historyIndex, history } = get()
        //     if (historyIndex >= history.length - 1) return
        //     set((state) => {
        //         state.historyIndex++
        //         state.fields = JSON.parse(JSON.stringify(history[state.historyIndex]))
        //     })
        // },

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
                Object.assign(state.meta, meta)
                state.isDirty = true
            })
        },
    }))
)
