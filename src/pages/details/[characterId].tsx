import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import CharacterDetails from "../../components/CharacterDetails";
import { Character } from "../../types/character";

export interface CharactersResults {
  count: number;
  results: Character[];
}

interface CharacterDetailsPageProps {
  character: Character | null;
  characters: Character[];
  count: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { characterId } = context.params as { characterId: string };

  const characterRes = await fetch(
    `https://swapi.dev/api/people/${characterId}/`,
  );
  if (!characterRes.ok) {
    return {
      notFound: true,
    };
  }
  const character: Character = await characterRes.json();

  const query = context.query as Record<string, string>;
  const searchParams = new URLSearchParams(query);

  const searchRes = await fetch(
    `https://swapi.dev/api/people/?${searchParams}`,
  );
  const searchData: CharactersResults = await searchRes.json();

  return {
    props: {
      character,
      characters: searchData.results || [],
      count: searchData.count || -1,
    },
  };
};

export default function CharacterDetailsPage({
  character,
  characters,
  count,
}: CharacterDetailsPageProps) {
  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <Layout characters={characters} count={count}>
      <CharacterDetails character={character} />
    </Layout>
  );
}
