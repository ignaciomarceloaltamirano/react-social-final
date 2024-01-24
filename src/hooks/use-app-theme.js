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
        main: '#646cff',
      },
      secondary: {
        main: '#8c8df5',
      },
      ...(mode
        ? {
            background: {
              default: '#1b1b1f',
              paper: '#202127',
            },
            text: {
              primary: '#ffffff',
            },
          }
        : {
            background: {
              default: '#fff',
              paper: '#f6f6f7',
            },
            text: {
              primary: '#3c3c43',
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
            color: mode ? '#fff' : '#1b1b1f',
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
            border: 0,
            borderRadius: '8px',
          },
        },
      },
    },
  });

  return { appTheme, mode, handleChange };
};
