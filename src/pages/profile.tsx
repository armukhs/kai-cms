import FormPassword from 'components/FormPassword/FormPassword';
import FormProfile from 'components/FormProfile/FormProfile';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Navbar/Navbar';
import OrganizationContext from 'components/OrganizationContext/OrganizationContext';
import Pojo from 'components/Pojo/Pojo';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Unauthorized from 'components/Unauthorized/Unauthorized';
import { useContext } from 'react';

export default function Profile() {
  const { sessionUser } = useContext(SessionContext);
  const { organization } = useContext(OrganizationContext);

  if (!sessionUser || !sessionUser.isLoggedIn) return <Unauthorized />;

  const navbar = <Navbar user={sessionUser} />;

  function getSubUnits() {
    if (!sessionUser || !organization) return [];
    return organization.units.filter((u) => u.parentId == sessionUser.unitId);
  }

  function getSubJabatans() {
    if (!sessionUser || !organization) return [];
    const units = getSubUnits();
    const unitIds: string[] = [];
    units.forEach((u) => {
      unitIds.push(u.id);
    });
    return organization.jabatans.filter((j) => unitIds.includes(j.unitId));
  }

  return (
    <Layout title="Profile" navbar={navbar}>
      <FormProfile user={sessionUser} />
      <br />
      {/* {organization && <Pojo obj={getSubJabatans()} />} */}
      <FormPassword user={sessionUser} />
    </Layout>
  );
}
