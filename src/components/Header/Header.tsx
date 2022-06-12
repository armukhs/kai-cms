import { Box } from '@mantine/core';
import AppLogo from 'components/Logo/AppLogo';
import SessionContext from 'components/SessionProvider/SessionProvider';
import HeaderNav from './HeaderNav';
import useStyles from './Header.styles';
import { useContext } from 'react';

export default function Header() {
  const { sessionUser } = useContext(SessionContext);
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <div className={classes.inner}>
        <AppLogo />
      </div>

      <div className={classes.right}>{sessionUser?.isLoggedIn && <HeaderNav />}</div>
    </Box>
  );
}
