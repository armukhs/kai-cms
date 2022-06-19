import { Button, LoadingOverlay, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import fetchJson from 'lib/fetchJson';
import useAuthApi from 'lib/useAuthApi';
import { createPostData } from 'lib/utils';
import { useState } from 'react';

export default function FormKomentarProgress({
  rencanaId,
  userId,
}: {
  rencanaId: string;
  userId: string;
}) {
  const { mutate } = useAuthApi('get-komentar-progress', rencanaId);

  const form = useForm({
    initialValues: {
      userId: userId,
      rencanaId: rencanaId,
      value: '',
    },
  });

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      await fetchJson('/api/auth/post?sub=save-komentar-progress', createPostData(values));
      mutate();
      form.setFieldValue('value', '');
    } catch (error) {}
    setSubmitting(false);
  }

  return (
    <div style={{ position: 'relative', marginTop: 25 }}>
      <LoadingOverlay visible={submitting} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea {...form.getInputProps('value')} minRows={5} required />
        <Button type="submit" size="xs" variant="outline" color="dark" mt={10}>
          Submit
        </Button>
      </form>
    </div>
  );
}
