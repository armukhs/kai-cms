import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Paper, Text, Title } from '@mantine/core';
import useAuthApi from 'lib/useAuthApi';
import Layout from 'components/Layout/Layout';
import NavbarProject from 'components/NavbarProject/NavbarProject';
import FormPerubahan from 'components/Perubahan/FormPerubahan';
import ItemPerubahan from 'components/Perubahan/ItemPerubahan';
import Show from 'components/Show';
import Unauthorized from 'components/Unauthorized/Unauthorized';
import OrganizationContext from 'components/OrganizationContext/OrganizationContext';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Komentar from 'components/Komentar/Komentar';
import FormKomentar from 'components/FormKomentar/FormKomentar';
import Pojo from 'components/Pojo/Pojo';
import FormRencana from 'components/FormRencana/FormRencana';
import ItemRencana from 'components/ItemRencana/ItemRencana';

export default function Rencana({
  type,
  title,
  subject,
}: {
  title: string;
  type: string;
  subject: string;
}) {
  const router = useRouter();
  const { sessionUser } = useContext(SessionContext);
  const id = router.query['projectId'] as string;
  const { data, error, mutate } = useAuthApi(subject, id);
  const { organization, getJabatan } = useContext(OrganizationContext);

  const [showForm, setShowForm] = useState('');
  const [rencana, setRencana] = useState<any>(newRencana());
  const [PIC, setPIC] = useState<any>(null);

  if (!sessionUser || !sessionUser.isLoggedIn) return <Unauthorized />;
  if (error) return <Layout title="Projects">Error</Layout>;
  if (!data || !organization)
    return (
      <Layout title="Projects" navbar={<NavbarProject id={id} />}>
        &nbsp;
      </Layout>
    );

  const canEdit =
    sessionUser.id == data.project.managerId || sessionUser.id == data.project.staffId;
  const allowEdit = data.project.tglKonfirmasi == null;
  const canCreate = canEdit && allowEdit;

  function newRencana() {
    return {
      id: null,
      picId: '',
      projectId: id,
      type: type,
      rencana: '',
      audien: '',
      waktu: '',
      tempat: '',
      tolokUkur: '',
      monitoring: '',
      unitTerdampak: [],
    };
  }

  return (
    <Layout title={title} navbar={<NavbarProject id={id} />}>
      <div style={{ display: showForm == 'edit' || showForm == 'create' ? 'block' : 'none' }}>
        <Title order={4} mb={20}>
          {showForm == 'edit' ? 'Edit' : 'Form'} {title}
        </Title>
        <FormRencana
          data={rencana}
          units={organization?.units}
          topUnits={organization?.parents}
          pic={PIC}
          mutate={mutate}
          dataJabatan={organization?.jabatans}
          onCancel={() => {
            setShowForm('');
            setRencana(null);
            setPIC(null);
          }}
        />
      </div>

      <Show when={showForm == '' && data.rencana.length == 0}>
        <Title order={4} mb={20}>
          Daftar {title}
        </Title>
        <Paper px={16} py={50} mb={28} withBorder sx={{ borderColor: '#ddd', textAlign: 'center' }}>
          <Text size="sm">Tidak ada data {title.toLowerCase()} dalam proyek ini.</Text>
          {/* {canCreate && ( */}
          <Button
            mt={20}
            style={{ fontWeight: 500 }}
            onClick={() => {
              setRencana(newRencana());
              setShowForm('create');
              window.scrollTo(0, 0);
            }}
          >
            Create Rencana
          </Button>
          {/* )} */}
        </Paper>
      </Show>

      <div style={{ display: showForm == '' && data.rencana.length > 0 ? 'block' : 'none' }}>
        {/* <Show when={showForm == '' && data.rencana.length > 0}> */}
        <Title order={4} mb={20}>
          Daftar {title}
        </Title>

        {data.rencana.map((rencana: any, index: number) => (
          <ItemRencana
            key={rencana.id}
            data={rencana}
            units={organization?.units}
            mutate={mutate}
            index={index}
            canEdit={canEdit}
            pic={getJabatan}
            onClick={() => {
              window.scrollTo(0, 0);
              setRencana(rencana);
              setShowForm('edit');
              // Activate PIC
              setPIC(getJabatan(rencana.picId));
            }}
          />
        ))}

        <Button
          mt={0}
          style={{ fontWeight: 500 }}
          onClick={() => {
            setRencana(newRencana());
            setShowForm('create');
            window.scrollTo(0, 0);
          }}
        >
          Add Rencana
        </Button>
        {/* </Show> */}
      </div>

      <Show when={!showForm}>
        <Komentar projectId={id} type={type} />
        <FormKomentar type={type} userId={sessionUser.id} projectId={id} />
      </Show>
      {/* <Pojo obj={data} /> */}
    </Layout>
  );
}
