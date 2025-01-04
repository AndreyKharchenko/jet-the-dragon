export interface IJetTechMapComboboxProps {
    options: IJetTechMapComboboxOption[]
    onChange: (option: IJetTechMapComboboxOption) => void
}

export interface IJetTechMapComboboxOption {
    label: string
    id: string
}