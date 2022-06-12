import Perubahan from 'components/Perubahan/Perubahan';

const TYPE = 'peran';
const SUBJECT = 'perubahan-peran';
const TITLE = 'Perubahan Peran';

export default function HalamanPerubahan() {
  return <Perubahan title={TITLE} type={TYPE} subject={SUBJECT} />;
}
