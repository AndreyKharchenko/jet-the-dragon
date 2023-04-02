
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

type RadioProps = {
    label: string,
    value: string
}

type RadioGropProps = {
    radios: RadioProps[],
    radioGroupLabel: string,
    name: string,
    isRow: boolean
}

const JetRadioGroup: React.FC<RadioGropProps> = ({radios, radioGroupLabel, name, isRow}) => {
    const {control, setValue} = useFormContext();

    useEffect(() => {
        setValue(name, radios[0].value);
    }, [])
    return (
        <FormControl>
            <FormLabel id="radio-buttons-group">{radioGroupLabel}</FormLabel>
            {/*<RadioGroup
                aria-labelledby="radio-buttons-group-label"
                row={isRow}
                defaultValue={radios[0].value}
                name={name}
            >
                {
                    radios.map((radio, index) => {
                        return <FormControlLabel value={radio.value} control={<Radio />} label={radio.label} key={index} />
                    })
                }
                
            </RadioGroup>*/}
            <Controller 
                render={({field}) => (
                    <RadioGroup
                        {...field}
                        row={isRow}
                        defaultValue={radios[0].value}
                        name={name}
                    >
                        {
                            radios.map((radio, index) => {
                                return <FormControlLabel value={radio.value} control={<Radio />} label={radio.label} key={index} />
                            })
                        }
                        
                    </RadioGroup>
                )}
                control={control}
                name={name}
            />
        </FormControl>
    )
}

export default JetRadioGroup;