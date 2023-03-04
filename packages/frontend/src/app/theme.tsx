import { createTheme, Theme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: '"Exo 2", Arial',
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: '100%',
        },
        paper: {
          backgroundColor: 'black',
          width: '90%',
          margin: '10px 10% 0 10px',
        },
        popupIndicator: {
          color: '#006683',
        },
        option: {
          color: '#006683',
        },
        input: {
          color: 'white',
        },
        groupLabel: {
          color: 'white',
        },
        popper: {
          width: '400px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#FFFFFF',
        },
      },
    },
    MuiSelect: {},
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
        filled: {
          color: 'rgba(0,0,0,0)',
          display: 'none !important',
        },
      },
    },
  },
  palette: {
    text: {
      primary: '#FFFFFF',
      secondary: '#1ec0cb',
    },
    // primary: {
    //     light: 'rgba(147, 225, 231, 1)',
    //     main: 'rgba(91, 190, 198, 1)',
    //     dark: 'rgba(35, 162, 172, 1)',
    // },
    secondary: {
      main: 'rgba(91, 190, 198, 1)',
      dark: 'rgba(35, 162, 172, 1)',
    },
    primary: {
      // light: 'rgba(147, 225, 231, 1)',
      main: 'rgba(255, 255, 255, 1)',
      // dark: 'rgba(35, 162, 172, 1)',
    },
    background: {
      default: '#FFF',
    },
  },
});
