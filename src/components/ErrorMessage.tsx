export interface ErrorMessageProps {
  children: React.ReactNode;
}
export default function ErrorMessage({ children }: ErrorMessageProps) {
  return <div style={{ height: "30px", color: "red" }}>{children}</div>;
}
