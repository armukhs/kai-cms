import Perubahan from 'components/Perubahan/Perubahan';

const TYPE = 'kompetensi';
const SUBJECT = 'perubahan-kompetensi';
const TITLE = 'Perubahan Kompetensi';

export default function HalamanPerubahan() {
  return <Perubahan title={TITLE} type={TYPE} subject={SUBJECT} />;
}
