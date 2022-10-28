import React from "react";
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import style from './JetProductCard.module.css';
import { dFlex, flexBetween } from "../../../themes/commonStyles";

type PropsType = {
    card: {
        id: number,
        url: string
    }
}

const JetProductCard: React.FC<PropsType> = (props) => {
    const isNew = true;
    return(
        <Box sx={{flexGrow:1,position:'relative', ml: 3, cursor: 'pointer'}}>
            <Card sx={{maxWidth: '100%'}}>
                <CardMedia
                    height={275}
                    className={style.productImage}
                    component="img"
                    image={props.card.url}
                />
                <CardContent className={style.productContent}>
                    <Box sx={flexBetween}>
                        <Box>
                            <Typography component="h3" sx={{fontWeight: 'bold'}}>Название проудкта</Typography>
                            <Typography component="h4" color={theme => theme.palette.secondary.main}>Описание Описание Описание Описание</Typography>
                            <Typography component="h5" sx={{fontWeight: 'bold'}}>2000 Р.</Typography>
                        </Box>
                        <Box>
                            <Box sx={dFlex}>
                            {
                                isNew ? 
                                <React.Fragment>
                                    <StarIcon className={style.productRaiting} />
                                    <Typography component="h5">New</Typography>
                                </React.Fragment>
                                : 
                                <React.Fragment>
                                    <StarIcon className={style.productRaiting} />
                                    <Typography component="h5">5.0</Typography>
                                </React.Fragment>
                            }     
                            </Box>
                        </Box>
                    </Box>
                    
                </CardContent>
                <CardActions className={style.productActions}>
                    <IconButton>
                        <AddBoxOutlinedIcon />
                    </IconButton>

                    <IconButton>
                        <FavoriteBorderIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
}

export default JetProductCard;