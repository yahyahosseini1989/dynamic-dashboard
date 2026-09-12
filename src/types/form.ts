export type FieldType = 'text' | 'password' | 'number' | 'select'

export interface SelectOption {
    label: string
    value: string | number
}

export interface FormField {
    name: string
    label: string
    type: FieldType
    required?: boolean
    options?: SelectOption[]
    placeholder?: string
}