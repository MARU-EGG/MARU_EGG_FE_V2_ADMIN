import { handler } from './handler.mock';
import { setupServer } from 'msw/node';

export const server = setupServer(...handler);
