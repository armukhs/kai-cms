export default function Pojo({ obj }: { obj: any }) {
  return (
    <pre
      style={{
        display: 'block',
        color: 'red',
        backgroundColor: '#ffd',
        fontSize: 12,
        maxHeight: 400,
        overflowX: 'auto',
        overflowY: 'auto',
      }}
    >
      {JSON.stringify(obj, null, 2)}
    </pre>
  );
}
