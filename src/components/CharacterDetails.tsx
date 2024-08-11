"use client";

import getDetails from "../lib/character/getDetails";
import useDetails from "../hooks/useDetails";
import { Character } from "../types/character";
import CharacterDetail from "./CharacterDetail";
import styles from "./CharacterDetails.module.css";

interface CharacterDetailsProps {
  character: Character;
}

export default function CharacterDetails({ character }: CharacterDetailsProps) {
  const { closeDetails } = useDetails();

  const characterDetails = getDetails(character);

  return (
    <div className={styles.details}>
      <button className={styles.closeButton} onClick={closeDetails}>
        x
      </button>
      <h2 className={styles.header}>{character.name}</h2>
      {characterDetails.map(({ key, value }) => (
        <CharacterDetail key={key} name={key}>
          {value}
        </CharacterDetail>
      ))}
    </div>
  );
}
