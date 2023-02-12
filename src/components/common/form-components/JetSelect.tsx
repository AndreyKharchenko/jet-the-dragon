import React, { PointerEvent, useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type selectOptionsType = {
    value: string | number,
    label: string,
}

type SelectProps = {
    options: selectOptionsType[]
    selectLabel: string,
    selectName: string,
    initValue?: string,
    disabled?: boolean,
    sx?: object
}

const JetSelect:React.FC<SelectProps> = ({selectLabel, selectName, initValue, options, disabled, sx}) => {
    const {control, setValue, getValues} = useFormContext();
    let [selectValue, setSelectValue] = useState(options[0].value);
    
    useEffect(() => {
        setValue(selectName, initValue || options[0].value);
        setSelectValue(initValue || options[0].value);
    }, [])

    const handleChange = (e: any) => {
        setValue(selectName, e.target.value);
        setSelectValue(e.target.value);
    }

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
        <FormControl fullWidth>
            {
                (selectLabel)
                ?
                    <InputLabel>{selectLabel}</InputLabel>
                :
                    <></>
            }
            
            <Controller 
                render={({field}) => (
                    <Select 
                        {...field} 
                        autoWidth
                        sx={sx} 
                        value={selectValue}
                        onChange={(e) => handleChange(e)}
                        disabled={disabled || false}
                    >
                        { generateSingleOptions() }                   
                    </Select>
                )}
                control={control}
                name={selectName}
            />
        </FormControl>
    )
}

export default JetSelect