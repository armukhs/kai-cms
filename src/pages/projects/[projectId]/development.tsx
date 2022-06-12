import Rencana from 'components/Rencana/Rencana';

const TYPE = 'development';
const SUBJECT = 'rencana-development';
const TITLE = 'Rencana Development';

export default function HalamanRencana() {
  return <Rencana title={TITLE} type={TYPE} subject={SUBJECT} />;
}
