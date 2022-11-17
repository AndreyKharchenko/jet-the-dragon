import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormHelperText, TextField } from '@mui/material';


type InputProps = {
    name: string, 
    label: string,
    placeholder: string,
    mask?: string,
    type?: string,
    fullWidth?: boolean,
    sx?: object | {},
    inputProps?: object
}


export const JetInput: React.FC<InputProps> = ({name, label, placeholder, mask, type, fullWidth, inputProps, sx}) => {
    const {control, setValue} = useFormContext();

    

    const handleInputChange = (val: string) => {
        setValue(name, val);
    }

    const emailHandler = (val: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(val)) {
            console.log('Error');
        }else {
            console.log('Good')
        }
        handleInputChange(val);
    }

    const phoneHandler = (val: string) => {
        const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if(!re.test(val)) {
            console.log('Error nummer');
        }else {
            console.log('Good number')
        }
        handleInputChange(val);
    }

    

    return (
        <>
        <Controller
            name={name}
            control={control}
            defaultValue=''
            rules={{
                required: true,
                minLength: {value: 3, message: 'Min Length'}
            }}
            render={({ field: {onChange, value, ref}, fieldState: {error} }) => (
                (mask == 'text' || !(!!mask))
                ?
                    <TextField 
                        onChange={(e) => handleInputChange(e.target.value)}
                        type={type}
                        label={label}
                        variant='standard'
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        sx={sx}
                        inputProps={inputProps}
                        value={value}
                        helperText={!!error ? error.message : ''}
                    />
                    
                :
                (mask == 'email')
                ?
                    <TextField 
                        onChange={(e) => emailHandler(e.target.value)}
                        type={type}
                        label={label}
                        variant='standard'
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        sx={sx}
                    />
                :
                (mask == 'phone')
                ?
                    <TextField 
                        onChange={(e) => phoneHandler(e.target.value)}
                        type={type}
                        label={label}
                        variant='standard'
                        placeholder={placeholder}
                        fullWidth={fullWidth}
                        sx={sx}
                        inputProps={{maxLength:12}}
                        defaultValue='+7'
                    />
                :
                <></>

            )}
        />
        
        </>
       
        
    );
}

export default JetInput;