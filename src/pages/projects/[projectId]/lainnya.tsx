import Perubahan from 'components/Perubahan/Perubahan';

const TYPE = 'lainnya';
const SUBJECT = 'perubahan-lainnya';
const TITLE = 'Perubahan Lainnya';

export default function HalamanPerubahan() {
  return <Perubahan title={TITLE} type={TYPE} subject={SUBJECT} />;
}
