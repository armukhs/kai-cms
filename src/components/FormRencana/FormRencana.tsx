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

export default function FormRencana({
  data,
  units,
  topUnits,
  pic,
  dataJabatan,
  mutate,
  onCancel,
}: {
  data: any;
  units: any[];
  topUnits: any[];
  pic: any;
  dataJabatan: any[];
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
      rencana: '',
      audien: '',
      waktu: '',
      tempat: '',
      tolokUkur: '',
      monitoring: '',
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
      form.setFieldValue('rencana', data.rencana);
      form.setFieldValue('audien', data.audien);
      form.setFieldValue('waktu', data.waktu);
      form.setFieldValue('tempat', data.tempat);
      form.setFieldValue('tolokUkur', data.tolokUkur);
      form.setFieldValue('monitoring', data.monitoring);

      if (data.UnitRencana.length > 0) {
        const ids: string[] = [];
        data.UnitRencana.forEach((d: any) => ids.push(d.unitId));
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
    form.setFieldValue('rencana', '');
    form.setFieldValue('audien', '');
    form.setFieldValue('waktu', '');
    form.setFieldValue('tempat', '');
    form.setFieldValue('tolokUkur', '');
    form.setFieldValue('monitoring', '');
  }

  function cleanUp(param: string) {
    const lines = param.split('\n');
    let items: string[] = [];
    lines.forEach((l) => {
      if (l.length > 0) items.push(l);
    });

    if (items.length > 0) return items.join('\n');
    return '';
  }

  async function handleSubmit(values: typeof form.values) {
    setSubmitting(true);
    const body = { ...values, unitTerdampak: [''] };
    body.tolokUkur = cleanUp(values['tolokUkur']);
    body.unitTerdampak = daftarIDTerdampak;
    console.log(body);

    try {
      const url = '/api/auth/post?sub=save-rencana';
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
        <Textarea
          {...form.getInputProps('rencana')}
          autosize
          label="Rencana Kegiatan"
          minRows={3}
          mb={10}
          required
          onKeyDown={(e) => {
            if (e.code == 'Enter') {
              e.preventDefault();
            }
          }}
        />

        <Textarea
          {...form.getInputProps('audien')}
          autosize
          label="Audien"
          minRows={2}
          mb={10}
          required
          onKeyDown={(e) => {
            if (e.code == 'Enter') {
              e.preventDefault();
            }
          }}
        />

        <TextInput {...form.getInputProps('waktu')} label="Waktu" mb={10} required />
        <TextInput {...form.getInputProps('tempat')} label="Tempat" mb={10} required />

        <Textarea
          {...form.getInputProps('tolokUkur')}
          autosize
          label="Tolok Ukur"
          minRows={3}
          mb={10}
          required
          // onKeyDown={(e) => {
          //   if (e.code == 'Enter') {
          //     e.preventDefault();
          //   }
          // }}
        />

        <TextInput {...form.getInputProps('monitoring')} label="Monitoring" mb={10} required />

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
          <Button type="submit">Save Rencana</Button>
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
