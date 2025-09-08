import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router";

import { RoutesPath } from "./routes/routes";

import City from "@/components/City/City";
import CityList from "@/components/CityList/CityList";
import CountryList from "@/components/CountryList/CountryList";
import Form from "@/components/Form/Form";
import { ProtectedRoute } from "@/components/ProtectedRoute/ProtectedRoute";
import SpinnerFullPage from "@/components/SpinnerFullPage/SpinnerFullPage";

// const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
// const Product = lazy(() => import("./pages/Product/Product"));
// const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
// const Login = lazy(() => import("./pages/Login/Login"));
// const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Pricing from "./pages/Pricing/Pricing";
import Product from "./pages/Product/Product";
// import AppLayout from "./pages/AppLayout/AppLayout";

function Suspended() {
  const location = useLocation();
  return (
    <Suspense key={location.key} fallback={<SpinnerFullPage />}>
      <Outlet />
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suspended />}>
          <Route
            path={RoutesPath.App}
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
            {/* An index route is matched if none of the children matches. */}
            <Route
              index
              element={<Navigate replace to={RoutesPath.Cities} />}
            />
            <Route path={RoutesPath.Cities} element={<CityList />} />
            <Route path={RoutesPath.City} element={<City />} />
            <Route path={RoutesPath.Countries} element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path={RoutesPath.Homepage} element={<Homepage />} />
          <Route path={RoutesPath.Product} element={<Product />} />
          <Route path={RoutesPath.Pricing} element={<Pricing />} />
          <Route path={RoutesPath.Login} element={<Login />} />
          <Route path={RoutesPath.NotFound} element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
