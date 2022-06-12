import Analisis from 'components/Analisis/Analisis';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Unauthorized from 'components/Unauthorized/Unauthorized';
import { useContext } from 'react';

export default function HalamanAnalisis() {
  const { sessionUser } = useContext(SessionContext);

  if (!sessionUser || !sessionUser.isLoggedIn) return <Unauthorized />;

  return <Analisis user={sessionUser} />;
}
