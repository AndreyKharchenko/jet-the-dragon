import { ITechMapJobForm } from "../../models/techmap";

export interface IJetTechMapFormProps {
    onSaveForm: (data: TechMapFormValues) => void
    defaultValue?: TechMapFormValues | null
    isEdit: boolean
}

export interface TechMapFormValues {
    name: string
    jobs: ITechMapJobForm[];
};