import type { LucideIcon } from "lucide-react"

export { }

declare global {


    type FieldType =
        "text" | "textarea" | "number" | "email" | "password" | "select" | "checkbox" | "radio" | "date"

    interface FieldOption {
        id: string
        label: string
        value: string
    }
    interface FieldConfigs {
        label: string
        value: string | number | boolean
    }
    interface Field {
        id: string
        type: FieldType
        label: string
        placeholder?: string
        helperText?: string
        required: boolean
        options?: FieldOption[]
        config?: FieldConfigs[]
    }

    interface FormMeta {
        id: string
        title: string
        description?: string
        version: string
    }

    interface FormBuilderState {
        meta: FormMeta
        fields: Field[]

        // // UI state
        selectedFieldId: string | null
        isDirty: boolean

        // // History for undo/redo
        // history: Field[][]
        // historyIndex: number

        // // Actions
        addField: (type: FieldType) => void
        updateField: (id: string, data: Partial<Field>) => void
        deleteField: (id: string) => void
        // reorderFields: (from: number, to: number) => void
        selectField: (id: string | null) => void

        // addOption: (fieldId: string) => void
        updateOption: (fieldId: string, optionId: string, data: Partial<FieldOption>) => void
        // deleteOption: (fieldId: string, optionId: string) => void

        // undo: () => void
        // redo: () => void

        // resetForm: () => void
        setMeta: (meta: Partial<FormMeta>) => void
    }




    type FieldCategory =
        | "basic"
        | "numbers"
        | "contact"
        | "datetime"
        | "choices"
        | "files"
        | "special"
        | "layout"

    type FieldSchema = {
        _id: string
        type: string
        label: string
        description: string
        icon: LucideIcon,
        category: FieldCategory
        defaultProps: Record<string, unknown>
    }


    interface FormField {
        id: string;
        type: FieldType;
        label: string;
        placeholder?: string;
        helpText?: string;
        required: boolean;
        defaultValue?: string;
        validationRules: ValidationRule[];
        conditionalLogic?: ConditionalLogic;
        options?: SelectOption[];
        width: 'full' | 'half' | 'third';
        alignment: 'left' | 'center' | 'right';
        customClass?: string;
    }

    interface FormData {
        id: string;
        name: string;
        description?: string;
        status: 'draft' | 'published' | 'archived';
        fields: FormField[];
        createdAt: string;
        updatedAt: string;
    }


}