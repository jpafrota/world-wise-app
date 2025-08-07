// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import { useURLPosition } from "../hooks/useURLPosition";
import { convertToEmoji } from "../utils/convertToEmoji";
import BackButton from "./BackButton";
import Button from "./Button";
import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const [urlLat, urlLng] = useURLPosition();
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(true);

  useEffect(() => {
    async function getCityData() {
      try {
        setIsGeocodingLoading(true);
        const res = await fetch(
          `${BASE_URL}?latitude=${urlLat}&longitude=${urlLng}`
        );
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "Selected location is not a city. Try somewhere else!"
          );
        }

        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
        setError("");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsGeocodingLoading(false);
      }
    }

    if (!urlLat || !urlLng) return;

    getCityData();
  }, [urlLat, urlLng]);

  if (!urlLat || !urlLng)
    return <Message message={"Start by clicking somewhere on the map!"} />;

  if (isGeocodingLoading) return <Spinner />;

  if (error) return <Message message={error}></Message>;

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date.toString()}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => {}}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
