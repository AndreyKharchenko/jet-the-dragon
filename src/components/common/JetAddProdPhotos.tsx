import React from 'react'
import { Box, IconButton } from '@mui/material'
import style from './Common.module.css'
import { Add } from '@mui/icons-material';


interface IAddProdPhotos {
  photos: Array<File>,
  addPhoto: (event: any) => void
}

const JetAddProdPhotos: React.FC<IAddProdPhotos> = ({ photos, addPhoto }) => {
  return (
    <>
      <Box className={style.addPhotosContainer}>
        <Box className={style.addPhotoBtn}>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onChange={addPhoto} />
            <Add fontSize='large' />
          </IconButton>
        </Box>

        {
          photos.map((photo, index) => {
            return (
              <Box 
                component="img"
                className={style.prodPhoto} 
                key={index} 
                src={URL.createObjectURL(photo)}
              />
            )
          })
        }

      </Box>
    </>
  )
}

export default JetAddProdPhotos