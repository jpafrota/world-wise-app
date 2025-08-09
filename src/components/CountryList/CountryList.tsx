import { useCities } from "@/context/useCities";
import CountryItem from "@/components/CountryItem/CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "../Spinner/Spinner";

type Country = {
  country: string;
  emoji: string;
};

type City = {
  country: string;
  emoji: string;
};

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  // this is very time efficient. O(n) time complexity.

  const countries = Array.from(
    new Map(
      cities.map((city: City) => [
        city.country,
        { country: city.country, emoji: city.emoji },
      ])
    ).values()
  );

  // also works. that's the way I'd initially do it.
  // but it's O(n²). way too costly.
  // const countriesWithReduce = cities.reduce((acc, city) => {
  //   if (!acc.includes(city.country)) {
  //     acc.push(city.country);
  //   }
  //   return acc;
  // }, []);

  // this could work if cities.country was just a string. unfortunately JS does not
  // provide a way of customizing comparison like in java.
  // const countries = Array.from(new Set(cities.map((city) => city.country)));

  return (
    <ul className={styles.countryList}>
      {countries.map((country: Country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
