import { Button, NativeSelect, Paper, Table, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Kesiapan } from '@prisma/client';
import Pojo from 'components/Pojo/Pojo';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useEffect, useState } from 'react';

export default function FormAnalisis({ data, canEdit }: { data: Kesiapan; canEdit: boolean }) {
  const form = useForm({
    initialValues: {
      projectId: data.projectId,
      sepakat_dengan_misi: data.sepakat_dengan_misi,
      komunikasi_terbuka: data.komunikasi_terbuka,
      percaya_bawahan: data.percaya_bawahan,
      ide_bawahan: data.ide_bawahan,
      interaksi_bersahabat: data.interaksi_bersahabat,
      saling_percaya: data.saling_percaya,
      kinerja_teamwork: data.kinerja_teamwork,
      lingkungan_koperatif: data.lingkungan_koperatif,
      saling_menghargai: data.saling_menghargai,
      kompetensi_memadai: data.kompetensi_memadai,
      ekspektasi_realistis: data.ekspektasi_realistis,
      komunikasi_intens: data.komunikasi_intens,
      tanpa_isu_otoritas: data.tanpa_isu_otoritas,
      tanpa_isu_hilang_kerja: data.tanpa_isu_hilang_kerja,
      optimis_terhadap_hasil: data.optimis_terhadap_hasil,
      nyaman_dengan_hasil: data.nyaman_dengan_hasil,
    },
  });

  useEffect(() => {
    if (data) {
      form.setFieldValue('sepakat_dengan_misi', data.sepakat_dengan_misi);
      form.setFieldValue('komunikasi_terbuka', data.komunikasi_terbuka);
      form.setFieldValue('percaya_bawahan', data.percaya_bawahan);
      form.setFieldValue('ide_bawahan', data.ide_bawahan);
      form.setFieldValue('interaksi_bersahabat', data.interaksi_bersahabat);
      form.setFieldValue('saling_percaya', data.saling_percaya);
      form.setFieldValue('kinerja_teamwork', data.kinerja_teamwork);
      form.setFieldValue('lingkungan_koperatif', data.lingkungan_koperatif);
      form.setFieldValue('saling_menghargai', data.saling_menghargai);
      form.setFieldValue('kompetensi_memadai', data.kompetensi_memadai);
      form.setFieldValue('ekspektasi_realistis', data.ekspektasi_realistis);
      form.setFieldValue('komunikasi_intens', data.komunikasi_intens);
      form.setFieldValue('tanpa_isu_otoritas', data.tanpa_isu_otoritas);
      form.setFieldValue('tanpa_isu_hilang_kerja', data.tanpa_isu_hilang_kerja);
      form.setFieldValue('optimis_terhadap_hasil', data.optimis_terhadap_hasil);
      form.setFieldValue('nyaman_dengan_hasil', data.nyaman_dengan_hasil);
    }
  }, [data]);

  function intValues() {
    const original = {};
    Object.keys(form.values).forEach((key: string) => {
      if (key != 'projectId') {
        // @ts-ignore
        original[key] = parseInt(form.values[key]);
      }
    });
    return {
      projectId: data.projectId,
      data: original,
    };
  }

  const [submitting, setSubmitting] = useState(false);

  async function saveAnalisis() {
    setSubmitting(true);
    try {
      await fetchJson('/api/auth/post?sub=save-analisis', createPostData(intValues()));
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  return (
    <div>
      <Title order={4} mt={30} mb={10} sx={{ fontWeight: 500 }}>
        Analisis Kesiapan
      </Title>

      <Paper withBorder sx={{ borderColor: '#ddd' }}>
        <Table fontSize={13.5}>
          <tbody style={{ verticalAlign: 'middle' }}>
            <tr style={{ backgroundColor: '#fcfcfc' }}>
              <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                <Text my={3} size="sm" weight={600}>
                  Kepemimpinan
                </Text>
              </td>
            </tr>

            {/* <tr>
              <td colSpan={2}>
                <
              </td>
            </tr> */}

            <SelectVal
              label="Membangun kesepakatan terhadap misi bersama"
              field={form.getInputProps('sepakat_dengan_misi')}
            />
            <SelectVal
              label="Membangun komunikasi terbuka"
              field={form.getInputProps('komunikasi_terbuka')}
            />
            <SelectVal
              label="Keyakinan &amp; kepercayaan pada bawahan"
              field={form.getInputProps('percaya_bawahan')}
            />
            <SelectVal
              label="Penggunaan ide bawahan secara konstruktif"
              field={form.getInputProps('ide_bawahan')}
              pb={10}
            />

            <tr style={{ backgroundColor: '#fcfcfc' }}>
              <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                <Text my={3} size="sm" weight={600}>
                  Lingkungan Kerja Kolaboratif
                </Text>
              </td>
            </tr>

            <SelectVal
              //
              label="Interaksi yang bersahabat"
              field={form.getInputProps('interaksi_bersahabat')}
            />
            <SelectVal
              // ssss
              label="Saling percaya"
              field={form.getInputProps('saling_percaya')}
            />
            <SelectVal
              //
              label="Kinerja teamwork"
              field={form.getInputProps('kinerja_teamwork')}
            />
            <SelectVal
              label="Lingkungan kerja yang kooperatif"
              field={form.getInputProps('lingkungan_koperatif')}
            />
            <SelectVal
              //
              label="Saling menghargai"
              field={form.getInputProps('saling_menghargai')}
              pb={10}
            />

            <tr style={{ backgroundColor: '#fcfcfc' }}>
              <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                <Text my={3} size="sm" weight={600}>
                  Komitmen Top Management
                </Text>
              </td>
            </tr>

            <SelectVal
              //
              label="Kompetensi yang memadai"
              field={form.getInputProps('kompetensi_memadai')}
            />
            <SelectVal
              // ssss
              label="Ekspektasi realistis terhadap hasil"
              field={form.getInputProps('ekspektasi_realistis')}
            />
            <SelectVal
              //
              label="Komunikasi yang intens"
              field={form.getInputProps('komunikasi_intens')}
              pb={10}
            />

            <tr style={{ backgroundColor: '#fcfcfc' }}>
              <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                <Text my={3} size="sm" weight={600}>
                  Resistensi Terhadap Perubahan
                </Text>
              </td>
            </tr>

            <SelectVal
              //
              label="Tidak ada isu kehilangan otoritas"
              field={form.getInputProps('tanpa_isu_otoritas')}
            />
            <SelectVal
              // ssss
              label="Tidak ada isu kehilangan perkerjaan"
              field={form.getInputProps('tanpa_isu_hilang_kerja')}
            />
            <SelectVal
              //
              label="Optimis terhadap hasil perubahan"
              field={form.getInputProps('optimis_terhadap_hasil')}
            />
            <SelectVal
              //
              label="Nyaman dengan tujuan/hasil perubahan"
              field={form.getInputProps('nyaman_dengan_hasil')}
              pb={10}
            />
          </tbody>
        </Table>
      </Paper>

      {canEdit && (
        <Button my={20} onClick={() => saveAnalisis()} loading={submitting}>
          Save Analysis
        </Button>
      )}

      {/* <Pojo obj={intValues()} /> */}
    </div>
  );
}

function SelectVal({ label, field, pb }: { label: string; field: any; pb?: number }) {
  const values = [
    { label: '', value: 0 },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  return (
    <tr>
      <td style={{ borderWidth: pb ? 1 : 0, paddingBottom: pb || 0, paddingLeft: 24 }}>{label}</td>
      <td width="30" style={{ borderWidth: pb ? 1 : 0, paddingBottom: pb || 0 }}>
        <NativeSelect
          {...field}
          sx={{ width: 32 }}
          styles={{ input: { fontSize: 14 } }}
          size="xs"
          data={values}
          rightSection={<></>}
          rightSectionWidth={0}
        />
      </td>
    </tr>
  );
}
