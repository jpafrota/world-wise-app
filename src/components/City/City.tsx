import BackButton from "@/components/BackButton/BackButton";
import Spinner from "@/components/Spinner/Spinner";
import { useCities } from "@/context/useCities";
import { useEffect } from "react";
import { useParams } from "react-router";
import styles from "./City.module.css";

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

    // getCity updates the id state but it also triggers a re-render
    // in the Context. in order to solve that, we need to memoize the getCity
    // function so it does not get recreated when Context renders.
  }, [id, getCity]);

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
