import { Box, Button, Container, createStyles } from '@mantine/core';
import Header from 'components/Header/Header';
import AppLogo from 'components/Logo/AppLogo';

export default function UI() {
  return (
    <Container
      size={1024}
      sx={{
        paddingLeft: 24,
        paddingRight: 24,

        '@media (min-width: 639px)': {
          paddingLeft: 50,
          paddingRight: 50,
        },
      }}
    >
      <Box
        sx={{
          paddingTop: 24,
          paddingBottom: 22,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'space-between',
          borderBottom: '1px dotted #aae',

          '@media (min-width: 640px)': {
            // paddingTop: 36,
            // paddingBottom: 32,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            margin: 0,
            flexGrow: 0,
          }}
        >
          <AppLogo />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            margin: 0,
            flexGrow: 1,
          }}
        >
          <Button size="xs" color="gray" variant="outline">
            Logout
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
