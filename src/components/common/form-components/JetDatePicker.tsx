import React, { useEffect, useState } from 'react'
import { FormControl, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, {Moment} from 'moment';
import { Controller, useFormContext } from 'react-hook-form';


type datePickerType = {
    label: string,
    format: string,
    name: string,
    initialValue?: Moment,
    disabled?: boolean,
    views?: Array<Views>
}

type Views = 'day' | 'month' | 'year';

const JetDatePicker: React.FC<datePickerType> = ({label, format, name, views, initialValue, disabled}) => {
    const {control, setValue, getValues} = useFormContext();
    const [time, setTime] = useState<Moment | null>(moment());
    
    useEffect(() => {
        setValue(name, initialValue || moment());
        setTime(initialValue || moment());
    }, [])

    
    const handleChange = (newValue: Moment | null) => {
        setValue(name, newValue);
        setTime(newValue);
    };

    return (
        <FormControl size='small'>
            <Controller 
                render={({field}) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker 
                            label={label}
                            inputFormat={format}
                            value={time}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}
                            views={!!views?.length ? views : ['year', 'day']}
                            disabled={disabled || false}
                        />
                    </LocalizationProvider>
                )}
                control={control}
                name={name}
            />
        </FormControl>
    )
}

export default JetDatePicker