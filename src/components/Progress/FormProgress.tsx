import { Button, Select, Text, Textarea } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import Pojo from 'components/Pojo/Pojo';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useState } from 'react';
import { KeyedMutator } from 'swr';

export default function FormProgress({
  rencanaId,
  mutate,
}: {
  rencanaId: string;
  mutate: KeyedMutator<any>;
}) {
  const form = useForm({
    initialValues: {
      rencanaId: rencanaId,
      type: '',
      progress: '',
      // tanggal: '',
    },
  });

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    try {
      const url = `/api/auth/post?sub=save-progress`;
      await fetchJson(url, createPostData(values));
      form.reset();
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <div style={{ display: 'flex', alignItems: 'start', marginTop: 10 }}>
          <Text size="sm" pt={5} weight={500} style={{ width: 100, flexShrink: 0 }}>
            Tipe:
          </Text>
          <div style={{ flexGrow: 1 }}>
            <Select
              {...form.getInputProps('type')}
              data={[
                { value: 'progress', label: 'Progress' },
                { value: 'isu', label: 'Isu / Masalah' },
              ]}
            />
          </div>
        </div>
        {/* <div style={{ display: 'flex', alignItems: 'start', marginTop: 10 }}>
          <Text size="sm" pt={5} weight={500} style={{ width: 100, flexShrink: 0 }}>
            Tanggal:
          </Text>
          <div style={{ flexGrow: 1 }}>
            <DatePicker {...form.getInputProps('tanggal')} />
          </div>
        </div> */}
        <div style={{ display: 'flex', alignItems: 'start', marginTop: 10 }}>
          <Text size="sm" pt={5} weight={500} style={{ width: 100, flexShrink: 0 }}>
            Tanggal:
          </Text>
          <div style={{ flexGrow: 1 }}>
            <Textarea {...form.getInputProps('progress')} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'start', marginTop: 10 }}>
          <Text size="sm" pt={5} weight={500} style={{ width: 100, flexShrink: 0 }}></Text>
          <div style={{ flexGrow: 1 }}>
            <Button
              type="submit"
              disabled={form.values['progress'] == '' || form.values['type'] == ''}
            >
              Save Progress
            </Button>
          </div>
        </div>
        {/* <Pojo obj={form.values} /> */}
      </form>
    </div>
  );
}
