import { Autocomplete, TextField } from "@mui/material"
import { IJetTechMapComboboxOption, IJetTechMapComboboxProps } from "./types"

const JetTechMapCombobox: React.FC<IJetTechMapComboboxProps> = ({options, onChange}) => {
    const onChangeData = (event: any, newValue: IJetTechMapComboboxOption | null) => {
        if(newValue) {
            onChange(newValue)
        }
    }

    return (
        <Autocomplete
            options={options}
            sx={{ width: 300 }}
            defaultValue={options[0]}
            onChange={onChangeData}
            renderInput={(params) => <TextField {...params} label="Технологические карты" />}
        />
    )
}

export default JetTechMapCombobox