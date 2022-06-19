import { Text } from '@mantine/core';

export default function ItemProgress({ progress }: { progress: any }) {
  return (
    <div style={{ display: 'flex', alignItems: 'start', marginBottom: 10 }}>
      <Text size="sm" weight={500} style={{ width: 100, flexShrink: 0 }}>
        {progress.created.substring(0, 10)}
      </Text>
      <Text style={{ flexGrow: 1, fontSize: 13, color: progress.type == 'isu' ? 'red' : '' }}>
        <div dangerouslySetInnerHTML={{ __html: progress.progress }} />
      </Text>
    </div>
  );
}
