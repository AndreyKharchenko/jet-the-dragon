import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TextField } from '@mui/material';


type InputProps = {
    name: string, 
    label: string,
    placeholder: string,
    type?: string,
    fullWidth?: boolean,
    sx?: object | {}
}


export const JetInput: React.FC<InputProps> = ({name, label, placeholder, type, fullWidth, sx}) => {
    const {control, formState: {errors}} = useFormContext();

    return (
    
        <Controller
            name={name}
            control={control}
            defaultValue=''
            render={({ field }) => (
                <TextField 
                    {...field} 
                    type={type}
                    label={label}
                    variant='standard'
                    placeholder={placeholder}
                    fullWidth={fullWidth}
                    sx={sx}
                />
            )}
        />
        
    );
}

