import { useContext, useState } from 'react';
import { Button, LoadingOverlay, Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import fetchJson from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import { createPostData } from 'lib/utils';
import SessionContext from 'components/SessionProvider/SessionProvider';

export default function FormProfile({ user }: { user: SessionUser }) {
  const [nama, setNama] = useState(user?.nama as string);
  const [submitting, setSubmitting] = useState(false);
  const { setSessionUser } = useContext(SessionContext);

  const form = useForm({
    initialValues: {
      id: user?.id,
      nama: nama,
    },
    validate: {
      nama: (value) => (value?.length > 5 ? null : 'Minimum 5 karakter'),
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      const rs: SessionUser = await fetchJson(
        '/api/auth/post?sub=update-profile',
        createPostData(values)
      );
      setSessionUser(rs as SessionUser);
      setNama(rs?.nama as string);
    } catch (error) {}
    setSubmitting(false);
  }

  return (
    <div style={{ position: 'relative' }}>
      <Title order={3}>Profile</Title>
      <LoadingOverlay visible={submitting} />
      <form
        style={{
          border: '1px solid #ddd',
          marginTop: 16,
        }}
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
      >
        <Table>
          <tbody>
            <tr>
              <td width={140}>Nama:</td>
              <td>
                <TextInput {...form.getInputProps('nama')} placeholder="Nama Lengkap" required />
              </td>
            </tr>
            <tr>
              <td>Unit:</td>
              <td>
                <TextInput disabled value={`${user?.kodeUnit} - ${user?.unit}`} />
              </td>
            </tr>
            <tr>
              <td>Jabatan:</td>
              <td>
                <TextInput disabled value={`${user?.kodeJabatan} - ${user?.jabatan}`} />
              </td>
            </tr>
            <tr>
              <td>NIPP:</td>
              <td>
                <TextInput disabled value={user?.nipp as string} />
              </td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>
                <TextInput disabled value={user?.email as string} />
              </td>
            </tr>

            <tr>
              <td>&nbsp;</td>
              <td>
                <Button type="submit" disabled={form.values['nama'] == nama}>
                  Update
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </div>
  );
}
