import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { Character } from "../types/character";

export interface CharactersResults {
  count: number;
  results: Character[];
}

interface IndexProps {
  characters: Character[];
  count: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query as Record<string, string>;
  const searchParams = new URLSearchParams(query);

  const res = await fetch(`https://swapi.dev/api/people/?${searchParams}`);
  const data: CharactersResults = await res.json();

  return {
    props: {
      characters: data.results || [],
      count: data.count || 0,
    },
  };
};

export default function Index({ characters, count }: IndexProps) {
  return <Layout characters={characters} count={count} />;
}
