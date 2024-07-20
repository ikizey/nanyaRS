export default function FlyoutText({ length }: { length: number }) {
  const items = length === 1 ? "item" : "items";
  return <p>{`${length} ${items} selected`}</p>;
}
