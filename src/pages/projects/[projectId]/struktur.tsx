import Perubahan from 'components/Perubahan/Perubahan';

const TYPE = 'struktur';
const SUBJECT = 'perubahan-struktur';
const TITLE = 'Perubahan Struktur Organisasi';

export default function HalamanPerubahan() {
  return <Perubahan title={TITLE} type={TYPE} subject={SUBJECT} />;
}
