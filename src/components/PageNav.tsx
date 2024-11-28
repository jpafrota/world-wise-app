import { NavLink } from "react-router";
import { RoutesPath } from "../routes/routes";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>
          <NavLink to={RoutesPath.Homepage}>Home</NavLink>
        </li>
        <li>
          <NavLink to={RoutesPath.Pricing}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={RoutesPath.Product}>Product</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
