import React from 'react';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import style from  './JetSearch.module.css';
import { useInput } from '../../../hooks/useInput';


const JetSearch: React.FC<{}> = () => {
    const input = useInput();
    return(
        <Paper 
            component="form"
            className={style.searchPaper}
            >

            <IconButton type="button" sx={{ p: '10px', color: theme => theme.palette.primary.main }} aria-label="search">
                <SearchIcon />
            </IconButton>   

            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search product" {...input} />

            <IconButton sx={{ p: '10px' }}>
                <TuneIcon />
            </IconButton>
        </Paper>
    );
}

export default JetSearch;