import Users from 'components/Users/Users';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Unauthorized from 'components/Unauthorized/Unauthorized';
import { useContext } from 'react';
import Invitations from 'components/Invitations/Invitations';

export default function AdminPage() {
  const { sessionUser } = useContext(SessionContext);

  if (!sessionUser || !sessionUser.isLoggedIn || !sessionUser.roles.includes('admin'))
    return <Unauthorized />;

  return <Invitations user={sessionUser} />;
}
