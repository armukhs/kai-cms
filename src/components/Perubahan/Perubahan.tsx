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

export default function Perubahan({
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
  const [perubahan, setPerubahan] = useState<any>(newPerubahan());
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

  function newPerubahan() {
    return {
      id: null,
      picId: '',
      projectId: id,
      type: type,
      kondisi: '',
      perubahan: '',
      unitTerdampak: [],
    };
  }

  return (
    <Layout title={title} navbar={<NavbarProject id={id} />}>
      <div style={{ display: showForm == 'edit' || showForm == 'create' ? 'block' : 'none' }}>
        <Title order={4} mb={20}>
          {showForm == 'edit' ? 'Edit' : 'Form'} {title}
        </Title>
        <FormPerubahan
          data={perubahan}
          units={organization?.units}
          topUnits={organization?.parents}
          pic={PIC}
          mutate={mutate}
          dataJabatan={organization?.jabatans}
          onCancel={() => {
            setShowForm('');
            setPerubahan(null);
            setPIC(null);
          }}
        />
      </div>

      <Show when={showForm == '' && data.perubahan.length == 0}>
        <Title order={4} mb={20}>
          Daftar {title}
        </Title>
        <Paper px={16} py={50} mb={28} withBorder sx={{ borderColor: '#ddd', textAlign: 'center' }}>
          <Text size="sm">Tidak ada data {title.toLowerCase()} dalam proyek ini.</Text>
          {canCreate && (
            <Button
              mt={20}
              style={{ fontWeight: 500 }}
              onClick={() => {
                setPerubahan(newPerubahan());
                setShowForm('create');
                window.scrollTo(0, 0);
              }}
            >
              Create Perubahan
            </Button>
          )}
        </Paper>
      </Show>

      <Show when={showForm == '' && data.perubahan.length > 0}>
        <Title order={4} mb={20}>
          Daftar {title}
        </Title>

        {data.perubahan.map((perubahan: any, index: number) => (
          <ItemPerubahan
            key={perubahan.id}
            data={perubahan}
            units={organization?.units}
            mutate={mutate}
            index={index}
            canEdit={canEdit}
            pic={getJabatan}
            onClick={() => {
              window.scrollTo(0, 0);
              setPerubahan(perubahan);
              setShowForm('edit');
              // Activate PIC
              setPIC(getJabatan(perubahan.picId));
            }}
          />
        ))}

        {canCreate && (
          <Button
            mt={0}
            style={{ fontWeight: 500 }}
            onClick={() => {
              setPerubahan(newPerubahan());
              setShowForm('create');
              window.scrollTo(0, 0);
            }}
          >
            Add Perubahan
          </Button>
        )}
      </Show>

      <Show when={!showForm}>
        <Komentar projectId={id} type={type} />
        {allowEdit && <FormKomentar type={type} userId={sessionUser.id} projectId={id} />}
      </Show>
    </Layout>
  );
}
