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
    inputProps?: object,
    variant?: variantType,
}

type variantType = 'standard' | 'filled' | 'outlined';


export const JetInput: React.FC<InputProps> = ({name, label, placeholder, mask, type, fullWidth, inputProps, variant, sx}) => {
    const {control, setValue, setError} = useFormContext();

    const handleInputChange = (val: string) => {
        setValue(name, val);

        if(!(!!val)) {
            setError(name, {type: 'onChange', message: `Поле ${label} обязательно`});
            return;
        } 
        setError(name, {type: 'onChange', message: ''});

        
    }

    const emailHandler = (val: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(val)) {
            setError(name, {type: 'onChange', message:'Некорректный E-mail'});
        }else {
            setError(name, {type: 'onChange', message:''});
        }
        handleInputChange(val);
    }

    const phoneHandler = (val: string) => {
        const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if(!re.test(val)) {
            setError(name, {type: 'onChange', message:'Некорректный номер телефона'});
        }else {
            setError(name, {type: 'onChange', message:''});
        }
        handleInputChange(val);
    }

    

    return (
        <>
        {
            (mask == 'text' || !(!!mask))
            ?
                <Controller
                    name={name}
                    control={control}
                    defaultValue=''
                    rules={{
                        required: {value: true, message: `Поле ${label} обязательно`},
                    }}
                    render={({ field: {onChange, value}, fieldState: {error} }) => (
                        <TextField 
                            onChange={(e) => handleInputChange(e.target.value)}
                            type={type}
                            label={label}
                            variant={!!variant ? variant : 'standard'}
                            placeholder={placeholder}
                            fullWidth={fullWidth}
                            sx={sx}
                            inputProps={inputProps}
                            value={value}
                            helperText={!!error ? error.message : ''}    
                        />
                    )}
                />
            :
            (mask == 'email')
            ?
                <Controller
                    name={name}
                    control={control}
                    defaultValue=''
                    rules={{
                        required: {value: true, message: `Поле ${label} обязательно`},
                    }}
                    render={({ field: {onChange, value}, fieldState: {error} }) => (
                        <TextField 
                            onChange={(e) => emailHandler(e.target.value)}
                            type={type}
                            label={label}
                            variant='standard'
                            placeholder={placeholder}
                            fullWidth={fullWidth}
                            value={value}
                            sx={sx}
                            helperText={!!error ? error.message : ''} 
                        />
                    )}
                />
            :
            (mask == 'phone')
            ?
                <Controller
                    name={name}
                    control={control}
                    defaultValue=''
                    rules={{
                        required: {value: true, message: `Поле ${label} обязательно`}
                    }}
                    render={({ field: {onChange, value}, fieldState: {error} }) => (
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
                            helperText={!!error ? error.message : ''}
                        />
                    )}
                />
            :
                null
        }
        </>
       
        
    );
}

export default JetInput;