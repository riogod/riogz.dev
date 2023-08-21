import { APIClient } from '@riogz/lib.core';
import { FC } from 'react';
import { APIClientContext } from '../contexts';

interface IProps extends React.PropsWithChildren {
  api: APIClient;
}

const APIClientProvider: FC<IProps> = ({ api, children }) => (
  <APIClientContext.Provider value={api}>{children}</APIClientContext.Provider>
);

export { APIClientProvider };
