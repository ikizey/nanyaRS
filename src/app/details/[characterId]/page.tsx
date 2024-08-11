import React, { Suspense } from "react";
import CharacterDetails from "../../../components/CharacterDetails";
import { Character } from "../../../types/character";
import Layout from "../../../components/Layout";
import Loading from "../../../components/Loading";

async function getCharacter(characterId: string) {
  const res = await fetch(`https://swapi.dev/api/people/${characterId}/`);
  if (!res.ok) {
    return null;
  }
  const character: Character = await res.json();
  return character;
}

export default async function CharacterDetailsPage({
  params,
  searchParams,
}: {
  params: { characterId: string };
  searchParams: Record<string, string>;
}) {
  const character = await getCharacter(params.characterId);

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <Layout searchParams={searchParams}>
      <Suspense fallback={<Loading />}>
        <CharacterDetails character={character} />;
      </Suspense>
    </Layout>
  );
}
