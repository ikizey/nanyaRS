import { useParams } from "react-router-dom";
import getDetails from "../lib/character/getDetails";
import useDetails from "../hooks/useDetails";
import { starWarsApi } from "../features/starWarsApi/starWarsSlice";
import Loading from "./Loading";
import CharacterDetail from "./CharacterDetail";
import styles from "./CharacterDetails.module.css";

export default function CharacterDetails() {
  const { characterId = "1" } = useParams();
  const {
    data: character,
    isLoading,
    isFetching,
  } = starWarsApi.useGetCharacterByIdQuery(characterId);
  const { closeDetails } = useDetails();

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (typeof character?.name === "undefined") {
    return <div role="status">Character not found</div>;
  }

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
