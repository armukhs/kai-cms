import { Text } from '@mantine/core';
import { Project } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavbarProject({ id }: { id: string }) {
  if (!id || id == '')
    return (
      <>
        <Dummy label="Projects" />
        <Dummy label="Project Info" />
        <Dummy label="Perubahan Proses" />
        <Dummy label="Perubahan Teknologi" />
        <Dummy label="Perubahan Struktur" />
        <Dummy label="Perubahan Peran" />
        <Dummy label="Perubahan Budaya" />
        <Dummy label="Perubahan Kompetensi" />
        <Dummy label="Perubahan Lainnya" />
      </>
    );

  return (
    <>
      <NavbarItem href={`/projects`} label="Projects" />
      <NavbarItem href={`/projects/${id}`} label="Project Info" />
      <NavbarItem href={`/projects/${id}/proses`} label="Perubahan Proses" />
      <NavbarItem href={`/projects/${id}/teknologi`} label="Perubahan Teknologi" />
      <NavbarItem href={`/projects/${id}/struktur`} label="Perubahan Struktur" />
      <NavbarItem href={`/projects/${id}/peran`} label="Perubahan Peran" />
      <NavbarItem href={`/projects/${id}/budaya`} label="Perubahan Budaya" />
      <NavbarItem href={`/projects/${id}/kompetensi`} label="Perubahan Kompetensi" />
      <NavbarItem href={`/projects/${id}/lainnya`} label="Perubahan Lainnya" />
      <br />
      <NavbarItem href={`/projects/${id}/analisis`} label="Analisis" />
      <br />
      <NavbarItem href={`/projects/${id}/komunikasi`} label="Rencana Komunikasi" />
      <NavbarItem href={`/projects/${id}/sponsorship`} label="Rencana Sponsorship" />
      <NavbarItem href={`/projects/${id}/development`} label="Rencana Development" />
    </>
  );
}

function Dummy({ label }: { label: string }) {
  return (
    <Text
      sx={(theme) => ({
        display: 'block',
        fontSize: 13.25,
        fontWeight: 400,
        lineHeight: 1.75,
        color: theme.colors.cyan[9],
        textDecoration: 'none',
        cursor: 'pointer',
        padding: '6px 0',
        borderBottom: '1px dotted #ffad91',
      })}
    >
      {label}
    </Text>
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
              cursor: 'pointer',
            },
          })}
        >
          {label}
        </Text>
      </a>
    </Link>
  );
}
