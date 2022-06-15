import { Button } from '@mantine/core';
import Layout from 'components/Layout/Layout';
import NavbarProject from 'components/NavbarProject/NavbarProject';
import Pojo from 'components/Pojo/Pojo';
import ProjectLoading from 'components/ProjectLoading/ProjectLoading';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Unauthorized from 'components/Unauthorized/Unauthorized';
import useAuthApi from 'lib/useAuthApi';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function ProgressPage() {
  const { sessionUser } = useContext(SessionContext);
  const router = useRouter();
  const id = router.query['id'] as string;
  const { data, isLoading, error } = useAuthApi('get-progress', id);

  if (!sessionUser || !sessionUser.isLoggedIn) return <Unauthorized />;
  if (error) return <Layout title="Projects">Error</Layout>;
  if (isLoading) return <ProjectLoading />;

  const navbar = <NavbarProject id={data.rencana.projectId} />;

  return (
    <Layout title="Progress" navbar={navbar}>
      <div>Progress</div>
      {/* {data && <Pojo obj={data} />} */}

      <Button mt={20}>Create Progress Report</Button>
    </Layout>
  );
}
