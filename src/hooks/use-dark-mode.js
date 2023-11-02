import { createTheme } from '@mui/material';
import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const persistedMode = localStorage.getItem('mode') === 'dark';
  const [mode, setMode] = useState(persistedMode);

  useEffect(() => {
    localStorage.setItem('mode', mode ? 'dark' : 'light');
  }, [mode]);

  const appTheme = createTheme({
    palette: {
      mode: mode ? 'dark' : 'light',
      primary: {
        main: '#CDB4DB',
      },
      secondary: {
        main: '#FFC8DD',
      },
      ...(mode
        ? {
            background: {
              default: '#303030',
              paper: '#424242',
            },
            text: {
              primary: '#ffffff',
              secondary: '#ffffffb3',
              disabled: '#ffffff80',
            },
          }
        : {}),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
            borderRadius: '6px',
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
            backgroundColor: mode ? '#424242' : '',
            textTransform: 'capitalize',
            color: mode ? '#fff' : '#000000DE',
          },
        },
      },
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: '1rem 0',
          },
        },
      },
    },
  });

  const handleChange = () => {
    setMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('mode', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return { mode, appTheme, handleChange };
};
