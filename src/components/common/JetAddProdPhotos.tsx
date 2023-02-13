import React from 'react'
import { Box, IconButton } from '@mui/material'
import style from './Common.module.css'
import { Add } from '@mui/icons-material';


interface IAddProdPhotos {
  photos: Array<string>,
  addPhoto: () => void
}

const JetAddProdPhotos: React.FC<IAddProdPhotos> = ({ photos, addPhoto }) => {
  return (
    <>
      <Box className={style.addPhotosContainer}>
        <Box className={style.addPhotoBtn}>
          <IconButton color="primary" aria-label="upload picture" component="label" onClick={addPhoto}>
            <input hidden accept="image/*" type="file" />
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
                src={photo}
              />
            )
          })
        }

      </Box>
    </>
  )
}

export default JetAddProdPhotos