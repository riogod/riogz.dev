import Container from '@mui/material/Container';
import { FC, PropsWithChildren } from 'react';

export const LoginBackdrop: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container
      sx={{
        background:
          'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)',
        height: '100vh',
      }}
      component="main"
      maxWidth={false}
    >
      {children}
    </Container>
  );
};

// &:after
// content: " "
// position: absolute
// top: 2000px
// width: 1px
// height: 1px
// background: transparent
// box-shadow: $shadows-small
