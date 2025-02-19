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
    InputProps?: object,
    variant?: variantType,
    helperText?: string | '',
    required?: boolean,
    disabled?: boolean,
    multiline?: boolean,
    initialVal?: string | number
}

type variantType = 'standard' | 'filled' | 'outlined';


export const JetInput: React.FC<InputProps> = ({name, label, placeholder, mask, type, fullWidth, inputProps, InputProps, variant, sx, helperText, required, disabled, multiline, initialVal}) => {
    const {control, setValue, setError, clearErrors, register, getValues} = useFormContext();

    const handleInputChange = (val: string) => {
        setValue(name, val);
        if(!(!!val)) {
            setError(name, {type: 'onChange', message: `Поле ${label} обязательно`});
            return;
        } 
        
        clearErrors(name);
    }

    const emailHandler = (val: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(val)) {
            setError(name, {type: 'onChange', message:'Некорректный E-mail'});
        }else {
            clearErrors(name);
        }
        setValue(name, val);
    }

    const phoneHandler = (val: string) => {
        const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
        if(!re.test(val)) {
            setError(name, {type: 'onChange', message:'Некорректный номер телефона'});
        }else {
            clearErrors(name);
        }
        setValue(name, val);
    }

    const bankCardHandler = (val: string) => {
        const cardNum = val.split(" ").join("");
        if(cardNum.length % 4 == 0) {
            setValue(name, val+" ");
        } else {
            setValue(name, val);
        }
        

        if(!(!!val)) {
            setError(name, {type: 'onChange', message: `Поле ${label} обязательно`});
            return;
        } 

        clearErrors(name);
    }

    useEffect(() => {
        if(initialVal) {
            setValue(name, initialVal);
        }
    },[initialVal])

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
                        required: {value: (required == undefined) ? true : false, message: `Поле ${label} обязательно`},
                    }}
                    render={({ field: {onChange, value}, fieldState: {error} }) => (
                        <TextField 
                            {...register(name)}
                            onChange={(e) => handleInputChange(e.target.value)}
                            type={type}
                            label={label}
                            variant={!!variant ? variant : 'standard'}
                            placeholder={placeholder}
                            fullWidth={fullWidth}
                            sx={sx}
                            inputProps={inputProps}
                            InputProps={InputProps}
                            helperText={!!error ? error.message : helperText}  
                            error={!!error}
                            disabled={disabled || false}
                            multiline={multiline || false}
                            rows={multiline ? 4 : 1}
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
                            {...register(name)}
                            onChange={(e) => emailHandler(e.target.value)}
                            type={type}
                            label={label}
                            variant='standard'
                            placeholder={placeholder}
                            fullWidth={fullWidth}
                            sx={sx}
                            inputProps={inputProps}
                            value={value}
                            helperText={!!error ? error.message : helperText} 
                            error={!!error}
                            disabled={disabled || false} 
                        />
                    )}
                />
            :
            (mask == 'phone')
            ?
                <Controller
                    name={name}
                    control={control}
                    defaultValue='+7'
                    rules={{
                        required: {value: true, message: `Поле ${label} обязательно`}
                    }}
                    render={({ field: {onChange, value}, fieldState: {error} }) => (
                        <TextField 
                            {...register(name)}
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
                            value={value} 
                            error={!!error} 
                            disabled={disabled || false}
                        />
                    )}
                />
            :
            (mask == 'bankCard')
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
                            onChange={(e) => bankCardHandler(e.target.value)}
                            type={type}
                            label={label}
                            variant={!!variant ? variant : 'standard'}
                            placeholder={placeholder}
                            fullWidth={fullWidth}
                            sx={sx}
                            inputProps={inputProps}
                            value={value}
                            helperText={!!error ? error.message : helperText}  
                            error={!!error}
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