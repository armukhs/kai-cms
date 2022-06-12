import { Text } from '@mantine/core';
import { SessionUser } from 'lib/session';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar({ user }: { user: SessionUser }) {
  const adminLinks = [
    { href: `/projects`, label: 'Projects' },
    { href: `/users`, label: 'Users' },
    { href: `/invitations`, label: 'Invitations' },
    { href: `/profile`, label: 'Profile' },
  ];
  const userLinks = [
    { href: `/projects`, label: 'Projects' },
    { href: `/profile`, label: 'Profile' },
  ];
  const roles = user?.roles?.split(' ');
  const links = roles?.includes('admin') ? adminLinks : userLinks;

  return (
    <div>
      <div>
        {links.map((link) => (
          <NavbarItem key={link.href} label={link.label} href={link.href} />
        ))}
      </div>
    </div>
  );
}

function NavbarItem({ label, href }: { label: string; href: string }) {
  const router = useRouter();
  const path = router.asPath;

  return (
    <Link href={`${href}`}>
      <a
        style={{
          textDecoration: 'none',
        }}
      >
        <Text
          sx={(theme) => ({
            display: 'block',
            fontSize: 13.25,
            fontWeight: 400,
            lineHeight: 1.75,
            color: path == href ? theme.colors.gray[9] : theme.colors.cyan[9],
            textDecoration: 'none',
            cursor: 'pointer',
            padding: '6px 0',
            borderBottom: '1px dotted #ffad91',

            '&:hover': {
              color: path == href ? theme.colors.gray[6] : theme.colors.orange[8],
            },
          })}
        >
          {label}
        </Text>
      </a>
    </Link>
  );
}
