import Layout from 'components/Layout/Layout';
import Navbar from 'components/Navbar/Navbar';
import Pojo from 'components/Pojo/Pojo';
import AdminProjects from 'components/Projects/AdiminProjects';
import UserProjects from 'components/Projects/UserProjects';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Unauthorized from 'components/Unauthorized/Unauthorized';
import { useContext } from 'react';

export default function Projects() {
  const { sessionUser } = useContext(SessionContext);

  if (!sessionUser || !sessionUser.isLoggedIn) return <Unauthorized />;

  if (sessionUser.roles.includes('admin')) {
    return (
      <Layout title="Projects" navbar={<Navbar user={sessionUser} />}>
        <AdminProjects />
      </Layout>
    );
  }

  return (
    <Layout title="Projects" navbar={<Navbar user={sessionUser} />}>
      <UserProjects user={sessionUser} />
    </Layout>
  );
}
