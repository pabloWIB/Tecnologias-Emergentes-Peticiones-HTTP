import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import 'themes/ux-tokens.css';

import 'simplebar-react/dist/simplebar.min.css';

import { Provider as ReduxProvider } from 'react-redux';

import 'assets/third-party/apex-chart.css';

import App from './App';
import { store } from 'store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </StrictMode>
);
