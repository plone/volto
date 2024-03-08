import ReactDOM from 'react-dom/client';

import { StartClient } from '@tanstack/react-router-server/client';
import { createRouter } from './router';

import './config';

const router = createRouter();

ReactDOM.hydrateRoot(document, <StartClient router={router} />);
