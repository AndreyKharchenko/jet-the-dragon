import React, { useEffect } from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type selectOptionsType = {
    value: string | number,
    label: string,
}

type SelectProps = {
    options: selectOptionsType[]
    selectLabel: string,
    selectName: string, 
    sx: object
}

const JetSelect:React.FC<SelectProps> = ({selectLabel, selectName, options, sx}) => {
    const {control, setValue} = useFormContext();
    
    useEffect(() => {
        setValue(selectName, options[0].value);
    }, [])

    const generateSingleOptions = () => {
        return options.map((option: selectOptionsType) => {
            return(
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            )
        })
    }

    return (
        <FormControl size='small'>
            {
                (selectLabel)
                ?
                    <InputLabel>{selectLabel}</InputLabel>
                :
                    <></>
            }
            
            <Controller 
                render={({field}) => (
                    <Select autoWidth {...field} sx={sx} defaultValue={options[0].value}>
                        { generateSingleOptions() }                   </Select>
                )}
                control={control}
                name={selectName}
            />
        </FormControl>
    )
}

export default JetSelect