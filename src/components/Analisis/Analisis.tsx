import { Box, Paper, Table, Tabs, Text, Title } from '@mantine/core';
import FormAnalisis from 'components/FormAnalisis/FormAnalisis';
import Layout from 'components/Layout/Layout';
import NavbarProject from 'components/NavbarProject/NavbarProject';
import ProjectLabel from 'components/ProjectLabel/ProjectLabel';
import { SessionUser } from 'lib/session';
import useAuthApi from 'lib/useAuthApi';
import { useRouter } from 'next/router';

const title = 'Analisis Change Management';

export default function Analisis({ user }: { user: SessionUser }) {
  const router = useRouter();
  const id = router.query['projectId'] as string;
  const { data, error, mutate } = useAuthApi('get-analisis', id);

  if (!data) return <></>;

  const showAnalisis = user?.id == data?.mentorId || user?.roles.includes('admin');
  const isMentor = data.mentorId == user?.id;

  return (
    <Layout title={title} navbar={<NavbarProject id={id} />}>
      <ProjectLabel judul={data.judulProyek} namaUnit={data.namaUnit} />

      <Title order={4} mb={15}>
        Analisis
      </Title>

      <Tabs variant="default">
        <Tabs.Tab label="Bobot Perubahan">
          <Text size="sm" mb={15} color="gray">
            Berdasar jumlah dan jenis unit-unit terdampak beserta level organisasinya.
          </Text>

          <Paper withBorder sx={{ borderColor: '#ddd' }}>
            <Table fontSize={13.5}>
              <tbody style={{ verticalAlign: 'top' }}>
                <tr style={{ backgroundColor: '#fcfcfc' }}>
                  <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                    <Text my={3} size="sm" weight={600}>
                      Unit Perubahan
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Level Unit Perubahan Tertinggi</td>
                  <td align="center">{data.topLevel}</td>
                </tr>

                <tr style={{ backgroundColor: '#fcfcfc' }}>
                  <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                    <Text my={3} size="sm" weight={600}>
                      Tingkat Perubahan
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Peran &amp; Tanggugjawab</td>
                  <td align="center">{data.unitPeranVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Budaya Kerja</td>
                  <td align="center">{data.unitBudayaVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Knowledge, Skill, Ability</td>
                  <td align="center">{data.unitKompetensiVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Struktur Organisasi</td>
                  <td align="center">{data.unitStrukturVal}</td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Pola Kerja, Dll.</td>
                  <td align="center">{data.unitLainnyaVal}</td>
                </tr>

                <tr style={{ backgroundColor: '#fcfcfc' }}>
                  <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                    <Text my={3} size="sm" weight={600}>
                      Tingkat Perubahan Proses Bisnis
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Level Unit Perubahan Tertinggi</td>
                  <td align="center">{data.topProsesLevel}</td>
                </tr>

                <tr style={{ backgroundColor: '#fcfcfc' }}>
                  <td colSpan={2} style={{ paddingLeft: 10, paddingRight: 14 }}>
                    <Text my={3} size="sm" weight={600}>
                      Tingkat Perubahan Teknologi
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingLeft: 24 }}>Level Unit Perubahan Tertinggi</td>
                  <td align="center">{data.topTeknologiLevel}</td>
                </tr>

                <tr style={{ backgroundColor: '#f0f0f0' }}>
                  <td style={{ paddingLeft: 10, paddingRight: 14 }}>
                    <Text my={3} size="sm" weight={600}>
                      Nilai Bobot Perubahan
                    </Text>
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      fontWeight: 600,
                      width: 40,
                      paddingLeft: 10,
                      paddingRight: 14,
                    }}
                  >
                    {data.topLevel +
                      data.unitStrukturVal +
                      data.unitPeranVal +
                      data.unitBudayaVal +
                      data.unitKompetensiVal +
                      data.unitLainnyaVal +
                      data.topProsesLevel +
                      data.topTeknologiLevel}
                  </td>
                </tr>
              </tbody>
            </Table>
          </Paper>
        </Tabs.Tab>
        <Tabs.Tab label="Analisis Perubahan">
          {/* {showAnalisis && ( */}
          <FormAnalisis
            // tglKonfirmasi={data.tglKonfirmasi}
            data={data}
            canEdit={user?.id == data.mentorId}
            mutate={mutate}
          />
          {/* )} */}
          {!showAnalisis && (
            <Text size="sm" mt={10} mb={15} color="gray">
              Halama ini khusus untuk Petugas CM.
            </Text>
          )}
        </Tabs.Tab>
      </Tabs>
    </Layout>
  );
}
