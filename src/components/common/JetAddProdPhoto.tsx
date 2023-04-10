import React, { useState } from 'react'
import style from './Common.module.css'
import { getImage } from '../../utils/utils'
import { Box, IconButton } from '@mui/material'
import { DeleteOutline } from '@mui/icons-material';

interface IJetAddProdPhoto {
    newPhoto?: File
    photoId?: string,
    index: number,
    delNewPhoto?: (id: number) => void,
    delPhoto?: (id: string) => void
}

const JetAddProdPhoto: React.FC<IJetAddProdPhoto> = ({ newPhoto, photoId, index, delNewPhoto, delPhoto }) => {
    let [delIcon, setDelIcon] = useState<boolean>(false);
    const onMouseOver = () => setDelIcon(true);
    const onMouseOut = () => setDelIcon(false);
    return (
        <>
            {!!newPhoto &&
                <Box>
                    {delIcon && delNewPhoto &&
                        <Box
                            className={style.deletePhotoCard}
                            onMouseOut={onMouseOut}
                            onMouseOver={onMouseOver}
                        >
                            <IconButton color="error" onClick={() => delNewPhoto(index)}>
                                <DeleteOutline fontSize='large' />
                            </IconButton>
                        </Box>
                    }

                    {!delIcon &&
                        <Box
                            component="img"
                            className={style.prodPhoto}
                            key={index}
                            src={URL.createObjectURL(newPhoto)}
                            onMouseOver={onMouseOver}
                            onMouseOut={onMouseOut}
                        />
                    }
                </Box>
            }
            
            {!!photoId &&
                <Box>
                    {delIcon && delPhoto &&
                        <Box
                            className={style.deletePhotoCard}
                            onMouseOut={onMouseOut}
                            onMouseOver={onMouseOver}
                        >
                            <IconButton color="error" onClick={() => delPhoto(photoId)}>
                                <DeleteOutline fontSize='large' />
                            </IconButton>
                        </Box>
                    }

                    {!delIcon &&
                        <Box
                            component="img"
                            className={style.prodPhoto}
                            key={photoId}
                            src={getImage(photoId)}
                            onMouseOver={onMouseOver}
                            onMouseOut={onMouseOut}
                        />
                    }
                </Box>
            }
        </>
    )
}

export default JetAddProdPhoto