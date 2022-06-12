import { Box, Container, Divider, Paper } from '@mantine/core';
import FormLogin from 'components/FormLogin/FormLogin';
import AppLogo from 'components/Logo/AppLogo';
import useUser from 'lib/useUser';

export default function HomePage() {
  const { mutateUser } = useUser({ redirectTo: '/projects', redirectIfFound: true });

  return (
    <Box sx={(theme) => ({ backgroundColor: theme.colors.gray[1], minHeight: '100vh' })}>
      <Container size={400} px={20} py={50}>
        <Paper p="md" shadow="xs" withBorder>
          <AppLogo />
          <Divider my={20} />
          <FormLogin mutate={mutateUser} />
        </Paper>
      </Container>
    </Box>
  );
}
