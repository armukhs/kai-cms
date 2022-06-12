import { ReactNode } from 'react';
import Head from 'next/head';
import { Box, Container, Space } from '@mantine/core';
import Header from 'components/Header/Header';
import useStyles from './Layout.styles';

export default function Layout({
  title,
  navbar,
  children,
}: {
  title: string;
  navbar?: ReactNode;
  children: ReactNode;
}) {
  const { classes } = useStyles();

  return (
    <>
      <Head>
        <title>{title ? title : 'KAI Change Management'}</title>
      </Head>
      <Container size={1024} px={50} className={classes.container}>
        <Header />
        {!navbar && <Box className={classes.withoutNavbar}>{children}</Box>}

        {navbar && (
          <Box className={classes.withNavbar}>
            <Box className={classes.navbarWrapper}>
              <Box className={classes.navbarInner}>{navbar}</Box>
            </Box>

            <Box className={classes.mainWrapper}>{children}</Box>
          </Box>
        )}
      </Container>
      <Space h={100} />
    </>
  );
}
