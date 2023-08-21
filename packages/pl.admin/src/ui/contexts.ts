import { createContext } from 'react';
import { APIClient } from '@riogz/lib.core';
import { Container } from 'inversify';

const APIClientContext = createContext<APIClient | null>(null);
const DIContext = createContext<Container | null>(null);

if (process.env.NODE_ENV !== 'production') {
  APIClientContext.displayName = 'APIClientContext';
  DIContext.displayName = 'DIContext';
}

export { APIClientContext, DIContext };
