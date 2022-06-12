import { Box, Button, Text, Textarea, Title } from '@mantine/core';
import FormKomentar from 'components/FormKomentar/FormKomentar';
import FormProject from 'components/FormProject/FormProject';
import Komentar from 'components/Komentar/Komentar';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Navbar/Navbar';
import NavbarProject from 'components/NavbarProject/NavbarProject';
import Pojo from 'components/Pojo/Pojo';
import ProjectInfo from 'components/ProjectInfo/ProjectInfo';
import ProjectLoading from 'components/ProjectLoading/ProjectLoading';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Show from 'components/Show';
import Unauthorized from 'components/Unauthorized/Unauthorized';
import useAuthApi from 'lib/useAuthApi';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function Project() {
  const { sessionUser } = useContext(SessionContext);
  const router = useRouter();
  const id = router.query['projectId'] as string;
  const { data, isLoading, error } = useAuthApi('get-project', id);
  const { data: komentar } = useAuthApi('get-komentar', [id, 'project']);

  const [edit, setEdit] = useState(false);
  const [daftarKomentar, setDaftarKomentar] = useState<any[]>([]);

  // useEffect(() => {
  //   if (komentar) {
  //     setDaftarKomentar(komentar.filter((k: any) => k.type == 'project'));
  //   }
  // }, [komentar]);

  if (!sessionUser || !sessionUser.isLoggedIn) return <Unauthorized />;
  if (error) return <Layout title="Projects">Error</Layout>;
  if (isLoading) return <ProjectLoading />;

  const canEdit = sessionUser.id == data.managerId || sessionUser.id == data.staffId;
  const allowEdit = data.tglKonfirmasi == null;
  const canCreate = canEdit && allowEdit;

  const navbar = <NavbarProject id={data.id} />;

  return (
    <Layout title="Projects" navbar={navbar}>
      <Show when={!edit}>
        <ProjectInfo user={sessionUser} project={data} />
        <Show when={canCreate}>
          <Button mt={20} type="submit" onClick={() => setEdit(true)}>
            Edit Project
          </Button>
        </Show>

        {/* <Komentar data={data.Komentar} /> */}
        <Komentar projectId={id} type="project" />

        <FormKomentar type="project" userId={sessionUser.id} projectId={id} />
      </Show>
      <Show when={edit}>
        <FormProject user={sessionUser} data={data} onCancel={() => setEdit(false)} />
      </Show>
      <br />
    </Layout>
  );
}
