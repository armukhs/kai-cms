import { Box, Title } from '@mantine/core';
import useAuthApi from 'lib/useAuthApi';

// export default function Komentar({ data }: { data: any[] }) {
export default function KomentarProgress({ rencanaId }: { rencanaId: string }) {
  const { data, error } = useAuthApi('get-komentar-progress', rencanaId);

  function tanggal(d: string) {
    const tgl = new Date(d);
    return tgl.toLocaleDateString();
  }

  return (
    <Box my={40}>
      <Title order={4} style={{ fontWeight: 400, borderBottom: '1px solid #aaa' }}>
        Saran &amp; Komentar
      </Title>
      {!data && !error && <div>Loading...</div>}
      {data &&
        data.map((komentar: any) => (
          <Box key={komentar.id} style={{ fontSize: 12.3, marginBottom: 20 }}>
            <p style={{ marginBottom: 0, fontWeight: 600, color: '#b34' }}>
              {komentar.User.nama} ({tanggal(komentar.created)}):
            </p>
            <div
              style={{ fontSize: 12.3, marginTop: 3 }}
              dangerouslySetInnerHTML={{ __html: komentar?.value }}
            />
          </Box>
        ))}
    </Box>
  );
}
