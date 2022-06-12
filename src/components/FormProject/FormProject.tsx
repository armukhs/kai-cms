import { Button, LoadingOverlay, Textarea, TextInput, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import Show from 'components/Show';
import fetchJson from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import { createPostData } from 'lib/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';

export default function FormProject({
  user,
  data = null,
  onCancel,
}: {
  user: SessionUser;
  data?: any;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    initialValues: {
      id: null,
      unitId: user?.unitId,
      managerId: user?.id,
      judul: '',
      deskripsi: '',
      tujuan: '',
      target: '',
      tglMulai: '',
      tglSelesai: '',
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('id', data.id);
      form.setFieldValue('unitId', data.unitId);
      form.setFieldValue('managerId', data.managerId);
      form.setFieldValue('judul', data.judul);
      form.setFieldValue('deskripsi', data.deskripsi);
      form.setFieldValue('tujuan', data.tujuan);
      form.setFieldValue('target', data.target);
      form.setFieldValue('tglMulai', data.tglMulai);
      form.setFieldValue('tglSelesai', data.tglSelesai);
    }
    return () => {};
  }, []);

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      const url = data ? '/api/auth/post?sub=save-project' : '/api/auth/post?sub=register-project';
      const rs: SessionUser = await fetchJson(url, createPostData(values));
      if (data && onCancel != undefined) {
        mutate(`/api/auth/get?sub=get-project&opt=${data.id}`);
        onCancel();
      } else {
        router.push(`/projects/${rs?.id}`);
      }
    } catch (error) {}
    setSubmitting(false);
  }

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={submitting} />
      <Title order={4} mb={10}>
        {data ? 'Edit Project Info' : 'Register Project'}
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          {...form.getInputProps('judul')}
          label="Judul Proyek"
          placeholder="Judul Proyek"
          required
          autoFocus
          mb={10}
        />
        <Textarea
          {...form.getInputProps('deskripsi')}
          label="Deskripsi"
          placeholder="Deskripsi singkat"
          required
          mb={10}
          onKeyDown={(e) => {
            if (e.code == 'Enter') e.preventDefault();
          }}
        />
        <Textarea
          {...form.getInputProps('tujuan')}
          label="Tujuan"
          placeholder="Tujuan"
          required
          mb={10}
          onKeyDown={(e) => {
            if (e.code == 'Enter') e.preventDefault();
          }}
        />
        <Textarea
          {...form.getInputProps('target')}
          label="Target"
          placeholder="Target"
          required
          mb={10}
          onKeyDown={(e) => {
            if (e.code == 'Enter') e.preventDefault();
          }}
        />
        <DatePicker
          {...form.getInputProps('tglMulai')}
          label="Tanggal Mulai"
          inputFormat="DD - MM - YYYY"
          required
          mb={10}
        />
        <DatePicker
          {...form.getInputProps('tglSelesai')}
          label="Tanggal Selesai"
          inputFormat="DD - MM - YYYY"
          required
          mb={10}
        />
        <Button mt={20} type="submit">
          {data ? 'Save Project' : 'Register Project'}
        </Button>
        <Show when={onCancel !== undefined}>
          <Button mt={20} ml={10} variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </Show>
      </form>
    </div>
  );
}
