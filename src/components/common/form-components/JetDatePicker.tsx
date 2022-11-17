import React, { useEffect, useState } from 'react'
import { FormControl, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment, {Moment} from 'moment';
import { Controller, useFormContext } from 'react-hook-form';


type datePickerType = {
    label: string,
    format: string,
    name: string
}

const JetDatePicker: React.FC<datePickerType> = ({label, format, name}) => {
    const {control, setValue, getValues} = useFormContext();

    useEffect(() => {
        setValue(name, moment());
        console.log(getValues());
    }, [])

    const [time, setTime] = useState<Moment | null>(moment());
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