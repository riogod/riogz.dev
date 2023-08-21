import { APIClient } from '@riogz/lib.core';
import { useContext } from 'react';
import { APIClientContext } from '../contexts';

/**
 * Возвращает API модуль из контекста
 */
function useAPI(): APIClient {
  return useContext(APIClientContext) as APIClient;
}

export { useAPI };
