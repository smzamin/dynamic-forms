// Define the types of fields supported by the form builder
export type FieldType = 'text' | 'number' | 'email' | 'checkbox' | 'radio';

// Interface for form field configuration
export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[];
  value?: any;
}

// Interface for form data structure
export interface FormData {
  fields: FormField[];
}
