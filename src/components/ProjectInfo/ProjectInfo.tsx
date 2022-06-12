import { Box, Paper, Table, Text, Title } from '@mantine/core';
import { Project } from '@prisma/client';
import { SessionUser } from 'lib/session';

export default function ProjectInfo({ user, project }: { user: SessionUser; project: any }) {
  return (
    <Box style={{ fontSize: 13.5 }}>
      <Title order={4} mb={10}>
        Project Info
      </Title>
      <Paper withBorder sx={{ borderColor: '#ddd' }}>
        <Table>
          <tbody style={{ verticalAlign: 'top' }}>
            <tr>
              <td>Judul Proyek:</td>
              <td>{project.judul}</td>
            </tr>
            <tr>
              <td>Deskripsi:</td>
              <td>{project.deskripsi}</td>
            </tr>
            <tr>
              <td>Tanggal Mulai:</td>
              <td>{project.tglMulai ? String(project.tglMulai).substring(0, 10) : '-'}</td>
            </tr>
            <tr>
              <td width={130}>Tanggal&nbsp;Selesai:</td>
              <td>{project.tglMulai ? String(project.tglSelesai).substring(0, 10) : '-'}</td>
            </tr>
            <tr>
              <td>Unit&nbsp;Pengampu:</td>
              <td>{project.Unit.nama}</td>
            </tr>
            <tr>
              <td width={130}>Manajer:</td>
              <td>{project.Manager.nama}</td>
            </tr>
            <tr>
              <td width={130}>Staf:</td>
              <td>{project.Staff ? project.Staff.nama : '-'}</td>
            </tr>
            <tr>
              <td width={130}>Pengawas:</td>
              <td>{project.Mentor ? project.Mentor.nama : '-'}</td>
            </tr>
          </tbody>
        </Table>
      </Paper>

      <Title order={4} mt={20} mb={10}>
        Tujuan &amp; Target
      </Title>
      <Paper withBorder sx={{ borderColor: '#ddd' }}>
        <Table>
          <tbody style={{ verticalAlign: 'top' }}>
            <tr>
              <td width={130}>Tujuan:</td>
              <td>{project.tujuan}</td>
            </tr>
            <tr>
              <td width={130}>Target:</td>
              <td>{project.target}</td>
            </tr>
          </tbody>
        </Table>
      </Paper>
    </Box>
  );
}
