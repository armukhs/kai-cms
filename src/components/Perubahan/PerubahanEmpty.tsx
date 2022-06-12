import { Button, LoadingOverlay, Paper, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import Show from 'components/Show';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useState } from 'react';

export default function PerubahanEmpty({
  canEdit,
  allowEdit,
  projectId,
  type,
  mutate,
}: {
  canEdit: boolean;
  allowEdit: boolean;
  projectId: string;
  type: string;
  mutate: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      picId: null,
      projectId: projectId,
      type: type,
      kondisi: 'Kondisi sekarang',
      perubahan: 'Bentuk perubahan',
      unitTerdampak: [],
    },
  });

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      await fetchJson('/api/post?sub=new-perubahan', createPostData(values));
      mutate();
    } catch (error) {}
    setSubmitting(false);
  }

  return (
    <div>
      <Show when={!showForm}>
        <Paper px={16} py={50} mb={28} withBorder sx={{ borderColor: '#ddd', textAlign: 'center' }}>
          <Text size="sm">Tidak ada data perubahan teknlogi dalam proyek ini.</Text>
          {canEdit && allowEdit && (
            <Button mt={20} style={{ fontWeight: 500 }} onClick={() => setShowForm(!showForm)}>
              Create Perubahan
            </Button>
          )}
        </Paper>
      </Show>

      <Show when={showForm}>
        <div style={{ position: 'relative' }}>
          <LoadingOverlay visible={submitting} />
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput {...form.getInputProps('projectId')} label="Project ID" />
            <TextInput {...form.getInputProps('type')} label="Tipe" />
            <TextInput {...form.getInputProps('kondisi')} label="Kondisi Sekarang" />
            <TextInput {...form.getInputProps('perubahan')} label="Perubahan" />
            <TextInput {...form.getInputProps('picId')} label="PIC Perubahan" />
            <Button my={10} type="submit">
              Save Perubahan
            </Button>
          </form>
        </div>
      </Show>
    </div>
  );
}
