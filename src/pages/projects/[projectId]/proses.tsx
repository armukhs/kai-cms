import Perubahan from 'components/Perubahan/Perubahan';

const TYPE = 'proses';
const SUBJECT = 'perubahan-proses';
const TITLE = 'Perubahan Proses Bisnis';

export default function HalamanPerubahan() {
  return <Perubahan title={TITLE} type={TYPE} subject={SUBJECT} />;
}
