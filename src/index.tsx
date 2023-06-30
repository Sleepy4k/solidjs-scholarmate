import './index.css';
import App from './App';
import { Auth } from '@contexts';
import { render } from 'solid-js/web';
import { Toaster } from 'solid-toast';
import { Router } from '@solidjs/router';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const title = import.meta.env.VITE_APP_NAME;

document.title = title ? title + ' Mate' : 'Solid App';

render(() => (
  <Router>
    <Auth.Provider>
      <App />
    </Auth.Provider>
    <Toaster />
  </Router>
), root!);
