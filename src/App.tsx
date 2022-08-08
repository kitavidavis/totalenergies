import React, { useState} from 'react';
import './App.css';
import Dashboard from './dashboard';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>

    <Dashboard />

    </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
