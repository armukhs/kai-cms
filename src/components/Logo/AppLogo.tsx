import { Text } from '@mantine/core';
import KAI from './KAI';

export default function AppLogo() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: 0,
      }}
    >
      <div style={{ width: 70 }}>
        <KAI />
      </div>

      <Text
        component="span"
        variant="gradient"
        pt={1}
        gradient={{ from: 'indigo', to: 'pink', deg: 85 }}
        style={{
          fontSize: 18,
          fontWeight: 800,
          textTransform: 'uppercase',
          lineHeight: 0.8,
          letterSpacing: -0.8,
          marginLeft: 5,
          paddingRight: 5,
          fontStyle: 'oblique',
        }}
      >
        Change
        <br />
        Management
      </Text>
    </div>
  );
}
