import { Paper } from '@mantine/core';

export default function ProjectLabel({ judul, namaUnit }: { judul: string; namaUnit: string }) {
  return (
    <Paper withBorder px={16} py={10} mb={20} style={{ borderColor: '#aaa' }}>
      <div style={{ display: 'flex', alignItems: 'start', fontSize: 15, marginBottom: 5 }}>
        <span style={{ flexShrink: 0, width: 50, marginRight: 16 }}>Proyek:</span>
        <span style={{ fontWeight: 600 }}>{judul}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'start', fontSize: 14, color: '#333' }}>
        <span style={{ fontWeight: 600 }}>{namaUnit}</span>
      </div>
    </Paper>
  );
}
