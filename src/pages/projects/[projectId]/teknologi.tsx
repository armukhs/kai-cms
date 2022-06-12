import Perubahan from 'components/Perubahan/Perubahan';

const TYPE = 'teknologi';
const SUBJECT = 'perubahan-teknologi';
const TITLE = 'Perubahan Teknologi';

export default function HalamanPerubahan() {
  return <Perubahan title={TITLE} type={TYPE} subject={SUBJECT} />;
}
