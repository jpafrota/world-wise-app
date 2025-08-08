// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useURLPosition } from "../hooks/useURLPosition";
import { convertToEmoji } from "../utils/convertToEmoji";
import BackButton from "./BackButton";
import Button from "./Button";
import styles from "./Form.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/useCities";
import { useNavigate } from "react-router";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [error, setError] = useState("");
  const [lat, lng] = useURLPosition();

  // geoLocation != geoCoding
  // geoLocation: current user position
  // geoCoding: get place information such as citiName from lat/lng values

  const [isGeocodingLoading, setIsGeocodingLoading] = useState(true);

  // TODO: how to automatically update the form when the user
  // requests geoLocation?

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!cityName || !date) return;

    const city = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(city);
    navigate("/app/cities");
  }

  useEffect(() => {
    async function getCityData() {
      try {
        setIsGeocodingLoading(true);
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
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

    if (!lat || !lng) return;

    getCityData();
  }, [lat, lng]);

  if (!lat || !lng)
    return <Message message={"Start by clicking somewhere on the map!"} />;

  if (isGeocodingLoading) return <Spinner />;

  if (error) return <Message message={error}></Message>;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}>
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
        <DatePicker
          selected={date}
          dateFormat={"dd/MM/YYYY"}
          onChange={(date) => {
            setDate(date ?? undefined);
          }}
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
        <BackButton />
        <Button type="primary" onClick={() => {}}>
          Add
        </Button>
      </div>
    </form>
  );
}

export default Form;
