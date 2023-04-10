import React from 'react'
import { Box, IconButton } from '@mui/material'
import style from './Common.module.css'
import { Add } from '@mui/icons-material';
import { getImage } from '../../utils/utils';
import JetAddProdPhoto from './JetAddProdPhoto';
import { newPhoto } from '../../models/product';


interface IAddProdPhotos {
  photos: string[],
  newPhotos: newPhoto[],
  addNewPhoto: (event: any) => void,
  delNewPhoto: (id: number) => void,
  delPhoto: (id: string) => void
}

const JetAddProdPhotos: React.FC<IAddProdPhotos> = ({ newPhotos, photos, addNewPhoto, delNewPhoto, delPhoto }) => {
  return (
    <>
      <Box className={style.addPhotosContainer}>
        <Box className={style.addPhotoBtn}>
          <IconButton color="primary" aria-label="upload picture" component="label">
            <input hidden accept="image/*" type="file" onChange={addNewPhoto} />
            <Add fontSize='large' />
          </IconButton>
        </Box>

        {
          newPhotos.map((newPhoto, index) => {
            return (
              <JetAddProdPhoto 
                newPhoto={newPhoto.photo} 
                index={newPhoto.id} 
                delNewPhoto={delNewPhoto}
              />
            )
          })
        }

        {
          photos.map((photo, index) => {
            return (
              <JetAddProdPhoto photoId={photo} index={index} delPhoto={delPhoto} />
            )
          })
        }

        

      </Box>
    </>
  )
}

export default JetAddProdPhotos