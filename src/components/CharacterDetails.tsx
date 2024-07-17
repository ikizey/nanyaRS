import { useParams } from "react-router-dom";
import Loading from "./Loading";
import styles from "./CharacterDetails.module.css";
import { starWarsApi } from "../features/starWarsApi/starWarsSlice";
import useDetails from "../hooks/useDetails";

export default function CharacterDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: character, isLoading } = starWarsApi.useGetCharacterByIdQuery(
    id!,
  );
  const { closeDetails } = useDetails();

  if (isLoading) {
    return <Loading />;
  }

  if (typeof character?.name === "undefined") {
    return <div>Character not found</div>;
  }

  return (
    <div className={styles.details}>
      <button className={styles.closeButton} onClick={closeDetails}>
        x
      </button>
      <h2 className={styles.header}>{character.name}</h2>
      <p className={styles.detailItem}>
        <strong>Gender:</strong> {character.gender}
      </p>
      <p className={styles.detailItem}>
        <strong>Height:</strong> {character.height}
      </p>
      <p className={styles.detailItem}>
        <strong>Mass:</strong> {character.mass}
      </p>
      <p className={styles.detailItem}>
        <strong>Hair Color:</strong> {character.hair_color}
      </p>
      <p className={styles.detailItem}>
        <strong>Skin Color:</strong> {character.skin_color}
      </p>
      <p className={styles.detailItem}>
        <strong>Eye Color:</strong> {character.eye_color}
      </p>
      <p className={styles.detailItem}>
        <strong>Birth Year:</strong> {character.birth_year}
      </p>
      <p className={styles.detailItem}>
        <strong>Homeworld:</strong> <a href={character.homeworld}>Link</a>
      </p>
      <p className={styles.detailItem}>
        <strong>URL:</strong> {character.url}
      </p>
    </div>
  );
}
