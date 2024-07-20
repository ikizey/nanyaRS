import { useParams } from "react-router-dom";
import Loading from "./Loading";
import { starWarsApi } from "../features/starWarsApi/starWarsSlice";
import useDetails from "../hooks/useDetails";
import styles from "./CharacterDetails.module.css";
import CharacterDetail from "./CharacterDetail";

export default function CharacterDetails() {
  const { characterId = "1" } = useParams();
  const { data: character, isLoading } =
    starWarsApi.useGetCharacterByIdQuery(characterId);
  const { closeDetails } = useDetails();

  if (isLoading) {
    return <Loading />;
  }

  if (typeof character?.name === "undefined") {
    return <div>Character not found</div>;
  }

  const desiredDetails = [
    "gender",
    "height",
    "mass",
    "hair_color",
    "skin_color",
    "eye_color",
    "birth_year",
    "url",
  ];

  const characterDetails = Object.entries(character)
    .filter(([key]) => desiredDetails.includes(key))
    .map(([key, value]) => {
      const name = key
        .replace("_", " ")
        .replace(/\b\w/g, (firstLetter) => firstLetter.toUpperCase());
      return { name, value };
    });

  return (
    <div className={styles.details}>
      <button className={styles.closeButton} onClick={closeDetails}>
        x
      </button>
      <h2 className={styles.header}>{character.name}</h2>
      {characterDetails.map(({ name, value }) => (
        <CharacterDetail key={name} name={name}>
          {value}
        </CharacterDetail>
      ))}
    </div>
  );
}
