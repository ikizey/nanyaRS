import React from "react";
import {
  Await,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { CharacterLoaderData } from "../loaders/characterDetailsLoader";
import Loading from "./Loading";
import styles from "./CharacterDetails.module.css";

export default function CharacterDetails() {
  const { character } = useLoaderData() as CharacterLoaderData;
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <React.Suspense fallback={<Loading />}>
      <Await resolve={character}>
        {(character) => (
          <div className={styles.details}>
            <button
              className={styles.closeButton}
              onClick={() => {
                navigate(`/${location.search}`);
              }}
            >
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
        )}
      </Await>
    </React.Suspense>
  );
}
