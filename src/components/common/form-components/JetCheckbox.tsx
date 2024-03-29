import React, { useEffect, useState } from 'react'
import { FormControl, FormControlLabel, FormHelperText, FormLabel,Checkbox } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type CheckboxProps = {
    name: string
    label: string,
    value: boolean
}

export const JetCheckbox: React.FC<CheckboxProps> = ({name, label, value}) => {
    const [selectedItem, setSelectedItem] = useState<any>(value);
    const {control, setValue, formState: {errors}} = useFormContext();

    useEffect(() => {
        setValue(name, value);
    }, [])

    const handleSelect = (val:boolean) => {
        setSelectedItem(val);
        setValue(name, val);
    }

    return(
        <div>
            <FormControlLabel 
                control={
                    <Controller 
                        name={name}
                        render={({ field: {onChange}}) => {
                            return <Checkbox checked={selectedItem} onChange={(e) => handleSelect(!selectedItem)} />
                        }}
                        control={control}
                    />
                }
                label={label}  
            />
        </div>
    )
    
}

