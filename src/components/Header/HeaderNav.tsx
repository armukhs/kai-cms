import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Group, Text } from '@mantine/core';
import fetchJson from 'lib/fetchJson';
import useUser from 'lib/useUser';
import { useContext } from 'react';
import SessionContext from 'components/SessionProvider/SessionProvider';

export default function HeaderNav() {
  const router = useRouter();
  const { sessionUser } = useContext(SessionContext);
  const { mutateUser } = useUser();

  const HeaderLink = ({
    text,
    href,
    smHide = false,
  }: {
    text: string;
    href: string;
    smHide?: boolean;
  }) => {
    return (
      <Box
        sx={
          smHide
            ? {
                '@media (max-width: 639px)': {
                  display: 'none',
                },
              }
            : {}
        }
      >
        <Link href={href}>
          <a
            style={{
              display: 'block',
              textDecoration: 'none',
            }}
          >
            <Text
              sx={{
                fontSize: 13,
                color: '#434343',
                fontWeight: 500,
                textTransform: 'uppercase',
                '&:hover': {
                  color: 'rgba(247, 107, 35, 1)',
                },
              }}
            >
              {text}
            </Text>
          </a>
        </Link>
      </Box>
    );
  };

  const Divider = ({ smHide = false }) => (
    <Text
      size="lg"
      color="#f7470770"
      sx={
        smHide
          ? {
              fontWeight: 300,
              cursor: 'default',
              '@media (max-width: 639px)': {
                display: 'none',
              },
            }
          : {
              fontWeight: 300,
              cursor: 'default',
            }
      }
    >
      /
    </Text>
  );

  return (
    <Group position="right" spacing="sm">
      {/* <HeaderLink text="Dashboard" href="/dashboard" /> */}
      <Text size="sm" weight={500}>
        {sessionUser?.nama}
      </Text>
      {/* <Divider smHide /> */}
      {/* <HeaderLink smHide text="Direktori" href="/direktori" /> */}
      <Divider />
      <Link href="/api/logout">
        <a
          style={{
            display: 'block',
            textDecoration: 'none',
          }}
          onClick={async (e) => {
            e.preventDefault();
            mutateUser(await fetchJson('/api/logout', { method: 'POST' }));
            router.push('/');
          }}
        >
          <Text
            sx={{
              fontSize: 13,
              color: '#434343',
              fontWeight: 500,
              // textTransform: 'uppercase',
              '&:hover': {
                color: 'rgba(247, 107, 35, 1)',
              },
            }}
          >
            Logout
          </Text>
        </a>
      </Link>
    </Group>
  );
}
