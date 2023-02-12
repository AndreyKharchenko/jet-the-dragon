import React from 'react'
import { Box, IconButton } from '@mui/material'
import style from './Common.module.css'
import { Add } from '@mui/icons-material';


interface IAddProdPhotos {
  photos: Array<number>,
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
          photos.map(photo => {
            return (
              <Box className={style.prodPhoto}>
                {photo}
              </Box>
            )
          })
        }

      </Box>
    </>
  )
}

export default JetAddProdPhotos