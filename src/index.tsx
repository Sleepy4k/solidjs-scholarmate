/* @refresh reload */
import './index.css';
import { render } from 'solid-js/web';

import App from './App';
import { Router } from "@solidjs/router";
const title = import.meta.env.VITE_APP_NAME || 'SolidJS';
const root = document.getElementById('root');
document.title = title + ' Mates';

render(() =>  (
    <Router>
      <App />
    </Router>
    ),
document.getElementById('root') as HTMLElement);
