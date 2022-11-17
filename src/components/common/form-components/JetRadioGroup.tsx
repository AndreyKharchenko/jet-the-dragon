
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type RadioProps = {
    label: string,
    value: string
}

type RadioGropProps = {
    radios: RadioProps[],
    radioGroupLabel: string,
    radioGroupName: string,
    isRow: boolean
}

const JetRadio: React.FC<RadioGropProps> = ({radios, radioGroupLabel, radioGroupName, isRow}) => {
    const {control, formState: {errors}} = useFormContext();

    //const errorMessage = errors[name] ? errors[name] : null;


    return (
        <FormControl>
            <FormLabel id="radio-buttons-group">{radioGroupLabel}</FormLabel>
            <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                row={isRow}
                defaultValue={radios[0].value}
                name={radioGroupName}
            >
                {
                    radios.map((radio, index) => {
                        return <FormControlLabel value={radio.value} control={<Radio />} label={radio.label} key={index} />
                    })
                }
                
            </RadioGroup>
        </FormControl>
    )
}

export default JetRadio;