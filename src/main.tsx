import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ModalsProvider } from '@mantine/modals';
import App from './components/App.tsx';

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/nprogress/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
	primaryColor: 'indigo',
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MantineProvider theme={theme} defaultColorScheme='dark'>
			<ModalsProvider>
				<App />
			</ModalsProvider>
		</MantineProvider>
	</StrictMode>
);
