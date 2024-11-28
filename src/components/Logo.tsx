import { Link } from "react-router";
import styles from "./Logo.module.css";
import { RoutesPath } from "../routes/routes";

function Logo() {
  return (
    <Link to={RoutesPath.Homepage}>
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
