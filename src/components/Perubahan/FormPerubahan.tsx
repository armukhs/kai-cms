import {
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import PICSelector from 'components/PICSelector/PICSelector';
import Pojo from 'components/Pojo/Pojo';
import TopUnitSelector from 'components/TopUnitSelector/TopUnitSelector';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useEffect, useRef, useState } from 'react';

export default function FormPerubahan({
  data,
  units,
  topUnits,
  pic,
  dataJabatan,
  withKondisi = true,
  mutate,
  onCancel,
}: {
  data: any;
  units: any[];
  topUnits: any[];
  pic: any;
  dataJabatan: any[];
  withKondisi?: boolean;
  mutate: () => void;
  onCancel: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [kodeInduk, setKodeInduk] = useState(topUnits ? topUnits[0]?.kode : '');
  // const [daftarInduk, setDaftarInduk] = useState<string[]>([]);
  const [daftarIDTerdampak, setDaftarIDTerdampak] = useState<string[]>([]);
  const [daftarUnitTerdampak, setDaftarUnitTerdampak] = useState<any[]>([]);

  const [picId, setPicId] = useState('');
  // PIC object
  // const [PIC, setPIC] = useState<any>(null);

  const form = useForm({
    // initialValues: { ...data },
    initialValues: {
      id: '',
      picId: '',
      projectId: '',
      type: '',
      kondisi: '',
      perubahan: '',
    },
  });

  useEffect(() => {
    form.setFieldValue('picId', picId);

    return () => {};
  }, [picId]);

  useEffect(() => {
    if (units) {
      setDaftarUnitTerdampak(units.filter((unit) => daftarIDTerdampak.includes(unit.id)));
    }

    return () => {};
  }, [daftarIDTerdampak, setDaftarUnitTerdampak]);

  useEffect(() => {
    if (data?.projectId) {
      form.setFieldValue('type', data.type);
      form.setFieldValue('projectId', data.projectId);
    }
    if (data?.id) {
      form.setFieldValue('id', data.id);
      form.setFieldValue('picId', data.picId || '');
      form.setFieldValue('projectId', data.projectId);
      form.setFieldValue('type', data.type);
      form.setFieldValue('kondisi', data.kondisi);
      form.setFieldValue('perubahan', data.perubahan);

      if (data.UnitPerubahan.length > 0) {
        const ids: string[] = [];
        data.UnitPerubahan.forEach((d: any) => ids.push(d.unitId));
        setDaftarIDTerdampak(ids);
      }

      // setPIC(getPIC(data.picID));
    }

    return () => {};
  }, [data]);

  function reset() {
    setDaftarIDTerdampak([]);
    setDaftarUnitTerdampak([]);
    setKodeInduk(topUnits[0].kode);
    form.setFieldValue('id', '');
    form.setFieldValue('kondisi', '');
    form.setFieldValue('perubahan', '');
  }

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    const body = { ...values, unitTerdampak: [''] };
    body.unitTerdampak = daftarIDTerdampak;
    console.log(body);

    try {
      const url = '/api/auth/post?sub=save-perubahan';
      await fetchJson(url, createPostData(body));
      mutate();
      reset();
      onCancel();
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  function getPIC(id = '') {
    const filtered: any[] = dataJabatan.filter((j: any) => j.id == id);
    if (filtered.length > 0) {
      return filtered[0];
    }
    return null;
  }

  // const prevPIC = getPIC(data.picID);

  const viewport = useRef<HTMLDivElement>();
  const scrollToTop = () => viewport.current?.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div style={{ position: 'relative' }}>
      {/* <Pojo obj={data} /> */}
      <LoadingOverlay visible={submitting} />
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        {data && (data.type == 'proses' || data.type == 'teknologi') && (
          <Box mb={10}>
            <Text sx={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Kondisi Sekarang</Text>
            <Textarea
              {...form.getInputProps('kondisi')}
              autosize
              minRows={3}
              required
              onKeyDown={(e) => {
                if (e.code == 'Enter') {
                  e.preventDefault();
                }
              }}
            />
          </Box>
        )}

        <Box mb={10}>
          <Text sx={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Bentuk Perubahan</Text>
          <Textarea
            {...form.getInputProps('perubahan')}
            autosize
            minRows={3}
            required
            onKeyDown={(e) => {
              if (e.code == 'Enter') {
                e.preventDefault();
              }
            }}
          />
        </Box>

        <Box mb={10}>
          <Text sx={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Unit Tedampak</Text>

          <Paper withBorder sx={{ borderColor: '#d4d4d4' }}>
            <div
              style={{
                padding: 7,
                paddingLeft: 10,
                minHeight: 65,
                borderBottom: '1px solid #d4d4d4',
                fontSize: 14,
              }}
            >
              {daftarUnitTerdampak.map((unit) => (
                <UnitTerdampak key={unit.kode} unit={unit} />
              ))}
            </div>
            <div style={{ padding: 7, borderBottom: '1px solid #d4d4d4' }}>
              <TopUnitSelector
                parents={topUnits}
                selected={kodeInduk}
                callback={setKodeInduk}
                effect={scrollToTop}
              />
            </div>

            <ScrollArea
              style={{
                height: 168,
                paddingTop: 7,
                paddingLeft: 10,
              }}
              // @ts-ignore
              viewportRef={viewport}
            >
              {units &&
                units
                  .filter((unit) => unit.kode.startsWith(kodeInduk))
                  .map((unit) => (
                    <Checkbox
                      key={unit.kode}
                      value={unit.id}
                      label={unit.nama}
                      width="100%"
                      size="sm"
                      py={2}
                      checked={daftarIDTerdampak.includes(unit.id)}
                      onChange={(e) => {
                        if (e.currentTarget.checked) {
                          setDaftarIDTerdampak([...daftarIDTerdampak, unit.id]);
                        } else {
                          setDaftarIDTerdampak(daftarIDTerdampak.filter((id) => id != unit.id));
                        }
                      }}
                    />
                  ))}
            </ScrollArea>
          </Paper>
        </Box>

        <Box my={20}>
          <Text sx={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>PIC Perubahan</Text>
          <Text sx={{ fontSize: 13, fontWeight: 500, marginBottom: 4, color: 'gray' }}>
            {pic ? pic.label : 'Pilih PIC'}
          </Text>
          <PICSelector
            dataInduk={topUnits}
            dataUnit={units}
            dataJabatan={dataJabatan}
            selected={pic}
            callback={setPicId}
          />
        </Box>

        <Box mt={20}>
          <Button type="submit">Save Perubahan</Button>
          <Button
            ml={10}
            onClick={() => {
              reset();
              onCancel();
              window.scrollTo(0, 0);
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>

      {/* <Pojo obj={form.values} /> */}
    </div>
  );
}

function UnitTerdampak({ unit }: { unit: { kode: string; nama: string } }) {
  return (
    <div style={{ fontSize: 13 }}>
      {unit.kode} - {unit.nama}
    </div>
  );
}
