export { }

declare global {
    type FieldType =
        | 'text'
        | 'email'
        | 'password'
        | 'number'
        | 'textarea'
        | 'select'
        | 'radio'
        | 'checkbox'
        | 'switch'
        | 'date'
        | 'file'
        | 'hidden'
        | 'divider'
        | 'heading'
        | 'paragraph'
        | 'button';


    interface ConditionalLogic {
        fieldId: string;
        operator: 'equals' | 'not_equals' | 'contains' | 'not_contains';
        value: string;
        action: 'show' | 'hide';
    }

    interface SelectOption {
        label: string;
        value: string;
    }

    interface ValidationRule {
        type: 'min' | 'max' | 'regex' | 'email' | 'required';
        value?: string | number;
        message?: string;
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