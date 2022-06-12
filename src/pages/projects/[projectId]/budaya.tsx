import Perubahan from 'components/Perubahan/Perubahan';

const TYPE = 'budaya';
const SUBJECT = 'perubahan-budaya';
const TITLE = 'Perubahan Budaya';

export default function HalamanPerubahan() {
  return <Perubahan title={TITLE} type={TYPE} subject={SUBJECT} />;
}
