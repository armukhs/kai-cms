import Progress from 'components/Progress/Progress';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Unauthorized from 'components/Unauthorized/Unauthorized';
import { useRouter } from 'next/router';
import { useContext } from 'react';

export default function ProgressPage() {
  const { sessionUser } = useContext(SessionContext);
  const router = useRouter();
  const id = router.query['id'] as string;

  if (!sessionUser || !sessionUser.isLoggedIn) return <Unauthorized />;
  return <Progress user={sessionUser} rencanaId={id} />;
}
