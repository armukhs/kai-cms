import Rencana from 'components/Rencana/Rencana';

const TYPE = 'sponsorship';
const SUBJECT = 'rencana-sponsorship';
const TITLE = 'Rencana Sponsorship';

export default function HalamanRencana() {
  return <Rencana title={TITLE} type={TYPE} subject={SUBJECT} />;
}
