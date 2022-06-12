import { GetServerSideProps } from 'next';
import prisma from 'lib/db';
import { Invitation } from '@prisma/client';
import Pojo from 'components/Pojo/Pojo';
import {
  Box,
  Button,
  Container,
  Divider,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import AppLogo from 'components/Logo/AppLogo';
import { useContext, useState } from 'react';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useForm } from '@mantine/form';
import Show from 'components/Show';
import { useRouter } from 'next/router';
import SessionContext from 'components/SessionProvider/SessionProvider';
import { SessionUser } from 'lib/session';

export default function Token({ data }: { data: Invitation }) {
  if (data == null) return <div>NULL</div>;

  const { setSessionUser } = useContext(SessionContext);
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      invitationId: data.id,
      unitId: data.unitId,
      jabatan: data.jabatan,
      jabatanId: data.jabatanId,
      nipp: data.nipp,
      email: data.email,
      nama: data.nama,
      roles: data.roles,
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => (value.length > 5 ? null : 'Min. 6 karakter'),
      confirmPassword: (value, values) =>
        value == values['password'] ? null : 'Password tidak sama',
    },
  });

  async function handleSubmit(values: typeof form.values) {
    // create-invitation
    setSubmitting(true);
    try {
      const rs = await fetchJson('/api/post?sub=new-user', createPostData(values));
      form.reset();
      setSessionUser(rs as SessionUser);
      router.push('/projects');
    } catch (error) {}
    setSubmitting(false);
  }

  return (
    <Box sx={(theme) => ({ backgroundColor: theme.colors.gray[1], minHeight: '100vh' })}>
      <Container size={460} px={20} py={50}>
        {/* <Pojo obj={data} /> */}
        {/* <Pojo obj={form.values} /> */}
        <Paper p="md" shadow="xs" withBorder>
          <AppLogo />
          <Divider my={20} />
          <Title order={4} mb={16} sx={{ fontWeight: 500 }}>
            Selamat Datang
          </Title>
          <LoadingOverlay visible={submitting} />
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <div style={{ border: '1px solid #ddd', marginBottom: 16 }}>
              <Table>
                <tbody>
                  <tr>
                    <td>Nama:</td>
                    <td>{data.nama}</td>
                  </tr>
                  <tr>
                    <td>NIPP:</td>
                    <td>{data.nipp}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <td>Jabatan:</td>
                    <td>{data.jabatan}</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <p style={{ fontSize: 14 }}>Silakan membuat password.</p>

            <PasswordInput
              {...form.getInputProps('password')}
              label="Password"
              required
              mb={5}
              styles={{
                label: { fontSize: 13 },
              }}
              onChange={(ev) => {
                form.setFieldValue('password', ev.currentTarget.value);
                form.clearFieldError('password');
              }}
            />
            <PasswordInput
              {...form.getInputProps('confirmPassword')}
              label="Confirm Password"
              required
              mb={5}
              styles={{
                label: { fontSize: 13 },
              }}
              onChange={(ev) => {
                form.setFieldValue('confirmPassword', ev.currentTarget.value);
                form.clearFieldError('confirmPassword');
              }}
            />

            <Button mt={10} type="submit">
              Submit
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = String(context.req.url);
  const array = Array.from(url?.split('/'));
  const token = array[array?.length - 1];

  // cl42s e88f0 018lb sqv20 5467d
  if (token.length < 20) {
    return {
      props: { data: null },
    };
  }

  const found = await prisma.invitation.findFirst({
    where: { token: token },
  });

  if (!found) {
    return {
      props: { data: null },
    };
  }

  return {
    props: {
      data: JSON.parse(JSON.stringify(found)),
    },
  };
};
