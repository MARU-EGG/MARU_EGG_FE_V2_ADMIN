import { handler } from './handlers/index.mock';
import { setupServer } from 'msw/node';

export const server = setupServer(...handler);
