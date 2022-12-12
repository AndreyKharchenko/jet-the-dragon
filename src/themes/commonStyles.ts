/* Flexbox styles */

export const flexBetween = {
    display: 'flex',
    justifyContent: 'space-between'
};

export const flexAround = {
    display: 'flex',
    justifyContent: 'space-around'
};

export const flexBetweenCenter = {
    display: 'flex',
    justifyContent: {xs: 'center', md: 'space-between'},
    alignItems: 'center'
};

export const footerLayout = {
    display: 'flex',
    flexDirection: {xs: 'column'},
    justifyContent: {xs: 'center', md: 'space-between'},
    alignItems: 'center'
};

export const flexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

export const fullWidthFlex = {
    display: 'flex',
    width: '100%'
};

export const justifyCenter = {display: 'flex', justifyContent: 'center'};

export const dFlex = {
    display: 'flex',
    flexDirection: 'row'
}

export const dFlexCol = {
    display: 'flex',
    flexDirection: 'column'
}

export const fixedBottom = {
   position: 'absolute', 
   bottom: 100,
   width: '100%'
}

export const defaultButton = {
    fontWeight: '800',
    textTransform: 'uppercase'
}

