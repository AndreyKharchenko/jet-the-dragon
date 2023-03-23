import React, { useEffect } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { Charak } from '../../models/product'
import { flexBetweenCenter } from '../../themes/commonStyles'
import style from './Common.module.css'
interface IAddProdCharak {
    charaks: Charak[],
    addCharak: () => void
}

const JetAddProdCharak: React.FC<IAddProdCharak> = ({charaks, addCharak}) => {
    
    const handleCharakInput = (id: number, field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        let charak = charaks.find(it => it.id == id);

        if (!!charak) {
            if(field.toUpperCase() == 'VALUE') {
                charak.value = e.target.value;
            } else {
                charak.key = e.target.value;
            }
             
        }

        console.log('CHARAK', charak);
    }

    useEffect(() => {
        console.log('CHARAKS', charaks)
        
    },[charaks])
    return (
        <>
            <Box>
                <Box className={style.addCharakTitle}>Характеристики продукта</Box>
                {
                    charaks.map((ch) => {
                        return (
                            <Box sx={flexBetweenCenter} key={ch.id}>
                                <TextField
                                    name={ch.key}
                                    label='Название характеристики'
                                    placeholder='Название характеристики'
                                    variant="standard"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCharakInput(ch.id, 'name', e)}
                                    defaultValue={ch.key}
                                />
                                <TextField
                                    name={ch.value}
                                    label='Значение'
                                    placeholder='Значение'
                                    variant="standard"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCharakInput(ch.id, 'value', e)}
                                    defaultValue={ch.value}
                                />
                            </Box>
                        )
                    })
                }
                <Box sx={{mt: 2, mb:2}}>
                    <Button 
                        variant='outlined'
                        onClick={addCharak}
                    >
                        Добавить
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default JetAddProdCharak