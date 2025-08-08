import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import { useCities } from "../context/useCities";
import BackButton from "./BackButton";
import styles from "./City.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  useEffect(() => {
    if (!id) return;

    // if we change cities, the old selected id will still show briefly
    // before fetching a new city.
    // that is because the `currentCity` obj is already in place in the CitiesContext,
    // and it will only be updated after the fetch is completed. so the destructuring
    // of the currentCity fields below will have old data until fetch completes.
    // to avoid that, we simply add a loading state.
    getCity(id);

    // for some reason we will not add getCity to the dep array now
    // spotted... when we get a new city, it will update the URL params
    // because of the `CityItem.tsx` component.
    // it will cause the "id" to change and re-run getCity,
    // then stay in this loop forever.
    // how to solve that? well... don't know.
  }, [id]);

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer">
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
