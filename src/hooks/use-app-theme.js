import { createTheme } from '@mui/material';
import { useEffect, useState } from 'react';

export const useAppTheme = () => {
  const persistedMode = localStorage.getItem('mode') === 'dark';
  const [mode, setMode] = useState(persistedMode);

  useEffect(() => {
    localStorage.setItem('mode', mode ? 'dark' : 'light');
  }, [mode]);

  const handleChange = () => {
    setMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('mode', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const appTheme = createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
      primary: {
        main: '#ABC4FF',
      },
      secondary: {
        main: '#C1D3FE',
      },
      ...(mode
        ? {
            background: {
              default: '#1d1d20',
              paper: '#2c2c30',
            },
            text: {
              primary: '#ffffff',
              secondary: '#ffffffb3',
              disabled: '#ffffff80',
            },
          }
        : {
            background: {
              default: '#EDF2FB',
            },
          }),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#fff',
            textTransform: 'capitalize',
            borderRadius: '6px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            },
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: !mode && '#000000de',
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: mode && '#fff',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
            color: mode ? '#fff' : '#000000DE',
          },
        },
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: '1rem 0rem 0rem 0rem',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            border: !mode && '1px solid #0000001f',
          },
        },
      },
    },
  });

  return { appTheme, mode, handleChange };
};
