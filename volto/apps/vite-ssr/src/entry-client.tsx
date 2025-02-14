import ReactDOM from 'react-dom/client';

import { StartClient } from '@tanstack/start/client';
import { createRouter } from './router';

import './config';

const router = createRouter();

ReactDOM.hydrateRoot(document, <StartClient router={router} />);
