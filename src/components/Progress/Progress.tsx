import { Box, Button, Divider, Paper, Select, Table, Text, Textarea, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Layout from 'components/Layout/Layout';
import NavbarProject from 'components/NavbarProject/NavbarProject';
import Pojo from 'components/Pojo/Pojo';
import ProjectLoading from 'components/ProjectLoading/ProjectLoading';
import { SessionUser } from 'lib/session';
import useAuthApi from 'lib/useAuthApi';
import FormKomentarProgress from './FormKomentarProgress';
import FormProgress from './FormProgress';
import ItemProgress from './ItemProgress';
import KomentarProgress from './KomentarProgress';

export default function Progress({ user, rencanaId }: { user: SessionUser; rencanaId: string }) {
  const { data, isLoading, mutate, error } = useAuthApi('get-progress', rencanaId);

  if (error) return <Layout title="Projects">Error</Layout>;
  if (isLoading) return <ProjectLoading />;

  const canEdit = user?.id == data.rencana.managerId || user?.id == data.rencana.staffId;

  const navbar = <NavbarProject id={data.rencana.projectId} />;

  return (
    <Layout title="Progress" navbar={navbar}>
      <Title order={4} mb={15}>
        Rencana
      </Title>
      {/* Rencana */}
      <Paper withBorder mb={20} sx={{ borderColor: '#ddd' }}>
        <Table fontSize={13.5}>
          <tbody style={{ verticalAlign: 'top' }}>
            <tr>
              <td width={70} style={{ paddingLeft: 14, fontWeight: 500 }}>
                Kegiatan:
              </td>
              <td>{data.rencana.rencana}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: 14, fontWeight: 500 }}>Audien:</td>
              <td>{data.rencana.audien}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: 14, fontWeight: 500 }}>Waktu:</td>
              <td>{data.rencana.waktu}</td>
            </tr>
            <tr>
              <td style={{ paddingLeft: 14, fontWeight: 500 }}>Tempat:</td>
              <td>{data.rencana.tempat}</td>
            </tr>
          </tbody>
        </Table>
      </Paper>

      <Title order={4} mb={15} mt={30}>
        Progress
      </Title>

      {/* <ItemProgress /> */}

      {data &&
        data.progress.map((progress: any) => (
          <ItemProgress key={progress.id} progress={progress} />
        ))}

      {/* <Button>Add Progress</Button> */}
      <Divider my={20} />

      {canEdit && <FormProgress rencanaId={rencanaId} mutate={mutate} />}

      <KomentarProgress rencanaId={rencanaId} />

      <FormKomentarProgress userId={user?.id as string} rencanaId={rencanaId} />

      {/* <Pojo obj={data} /> */}
    </Layout>
  );
}
