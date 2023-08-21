import { FC } from 'react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router5';
import { CORE_ROUTES } from '../../../modules/core/config/routes';

export const Layout: FC = observer(() => {
  return (
    <>
      <Link routeName={CORE_ROUTES.DASHBOARD}>asdas</Link>
      <Box
        component="nav"
        sx={{
          width: { sm: '200px' },
          flexShrink: { sm: 0 },
          backgroundColor: 'primary.main',
        }}
        aria-label="mailbox folders"
      ></Box>
      <Box component="main" aria-label="mailbox folders"></Box>
    </>
  );
});
