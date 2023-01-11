import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';


const theme = createTheme({
    zIndex: {
        drawer: 1250
    },
    typography: {
        allVariants: {
            textTransform: 'none',
            fontSize: 15
        }
    },
    palette: {
        primary: {
            main: '#3853D8'
        },
        secondary: {
            main: grey[700]
        },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                sx: {
                    px: 1
                },
                variant: 'subtitle2',
                //textTransform: 'capitalize'
            }
        },
        MuiStack: {
            defaultProps: {
                sx: {
                    px: 2,
                    py: 1
                }, 
                spacing: 2,
                direction: 'row',
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            }
        },
        MuiLink: {
            defaultProps: {
                sx: {
                    color: theme => theme.palette.secondary.main
                },
                underline: 'none'
            }
        },
        MuiButton: {
            defaultProps: {
                size: 'small',
                disableRipple: true
            },
        },
        MuiTab: {
            defaultProps: {
                disableRipple: true
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    fontSize: 'small',
                    color: grey[700]
                },
                /*error: {
                    fontSize: 'small',
                    color: grey[700]
                }*/
            }
        },
        
        
        

    }
});

const AppThemeProvider = (props: any) => {
    return <ThemeProvider theme={theme}> {props.children} </ThemeProvider>
}

export default AppThemeProvider;