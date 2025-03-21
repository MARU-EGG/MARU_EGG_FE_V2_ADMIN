import { handler } from './handler.mock';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...handler);
