import { Paper, Table, Text, Title } from '@mantine/core';
import FormAnalisis from 'components/FormAnalisis/FormAnalisis';
import Layout from 'components/Layout/Layout';
import NavbarProject from 'components/NavbarProject/NavbarProject';
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
      <Title order={4} mb={10} sx={{ fontWeight: 500 }}>
        Bobot Perubahan
      </Title>

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

      {showAnalisis && (
        <FormAnalisis
          // tglKonfirmasi={data.tglKonfirmasi}
          data={data}
          canEdit={user?.id == data.mentorId}
          mutate={mutate}
        />
      )}
    </Layout>
  );
}
