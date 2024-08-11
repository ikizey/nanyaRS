import Layout from "../components/Layout";

interface indexProps {
  searchParams: Record<string, string>;
}

export default async function Index({ searchParams }: indexProps) {
  return <Layout searchParams={searchParams} />;
}
