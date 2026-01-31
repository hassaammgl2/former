
export type FieldType =
    | 'text' | 'email' | 'password' | 'number' | 'textarea'
    | 'select' | 'radio' | 'checkbox' | 'switch'
    | 'date' | 'file' | 'heading' | 'paragraph' | 'divider' | 'button';

export interface FormField {
    id: string;
    type: FieldType;
    label: string;
    placeholder?: string;
    helpText?: string;
    required?: boolean;
    defaultValue?: string;
    options?: string[]; // for select, radio, checkbox
    width?: 'full' | 'half' | 'third';
    validation?: {
        min?: number;
        max?: number;
        pattern?: string;
    };
    logic?: {
        showIfFieldId?: string;
        showIfValue?: string;
    };
}

export interface Form {
    id: string;
    title: string;
    description: string;
    status: 'draft' | 'published' | 'archived';
    fields: FormField[];
    createdAt: string;
    submissionsCount: number;
}

export interface Submission {
    id: string;
    formId: string;
    data: Record<string, unknown>;
    submittedAt: string;
}

export type ViewState = 'landing' | 'auth-login' | 'auth-signup' | 'dashboard' | 'builder' | 'submissions' | 'integrations' | 'settings';

export interface User {
    name: string;
    email: string;
    role: 'admin' | 'user';
    avatar?: string;
}