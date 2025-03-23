import { handler } from './handlers/index.mock';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...handler);
