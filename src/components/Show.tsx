import { ReactNode } from 'react';

export default function Show({ when, children }: { when: boolean; children: ReactNode }) {
  if (!when) return <></>;

  return <>{children}</>;
}
