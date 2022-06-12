import {
  Alert,
  Button,
  LoadingOverlay,
  Modal,
  Notification,
  PasswordInput,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import fetchJson from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import { createPostData } from 'lib/utils';
import { useState } from 'react';

export default function FormPassword({ user }: { user: SessionUser }) {
  const [updated, setUpdated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      id: user?.id,
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value) => (value?.length > 5 ? null : 'Minimum 6 karakter'),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      const rs: SessionUser = await fetchJson(
        '/api/auth/post?sub=update-password',
        createPostData(values)
      );
      // form.setFieldValue('password', '');
      // form.setFieldValue('confirmPassword', '');
      setUpdated(true);
    } catch (error) {}
    setSubmitting(false);
  }

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={submitting} />
      <Title order={4}>Update Password</Title>
      {updated && (
        <Alert mt={16} title="Password updated!" color="blue">
          Password baru Anda telah berhasil tersimpan. Silakan logout dan login lagi untuk mencoba.
        </Alert>
      )}
      {!updated && (
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
                <td>New Password:</td>
                <td>
                  <PasswordInput
                    {...form.getInputProps('password')}
                    placeholder="Minimum 6 karakter"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td width={140}>Confirm&nbsp;Password:</td>
                <td>
                  <PasswordInput
                    {...form.getInputProps('confirmPassword')}
                    placeholder="Minimum 6 karakter"
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>&nbsp;</td>
                <td>
                  <Button type="submit" disabled={form.values['password'].length < 6}>
                    Update
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </form>
      )}
    </div>
  );
}
