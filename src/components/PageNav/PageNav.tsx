import { NavLink } from "react-router";
import { RoutesPath } from "../../routes/routes";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul className={styles.ul}>
        <li>
          <NavLink to={RoutesPath.Pricing}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={RoutesPath.Product}>Product</NavLink>
        </li>
        <li>
          <NavLink to={RoutesPath.Login} className={styles.ctaLink}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
