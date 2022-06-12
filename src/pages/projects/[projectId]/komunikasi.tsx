import Rencana from 'components/Rencana/Rencana';

const TYPE = 'komunikasi';
const SUBJECT = 'rencana-komunikasi';
const TITLE = 'Rencana Komunkasi';

export default function HalamanRencana() {
  return <Rencana title={TITLE} type={TYPE} subject={SUBJECT} />;
}
