import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.scss';

import { router } from './routes';
import { UtilsContextProvider, utilContextValue } from './context/UtilsContext';

const createRouter = createBrowserRouter(router);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UtilsContextProvider value={utilContextValue}>
			<RouterProvider router={createRouter} />
		</UtilsContextProvider>
	</React.StrictMode>
);
