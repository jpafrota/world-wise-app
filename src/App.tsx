import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { RoutesPath } from "./routes/routes";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { useCities } from "./context/useCities";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesPath.App} element={<AppLayout />}>
          {/* An index route is matched if none of the children matches. */}
          <Route index element={<Navigate replace to={RoutesPath.Cities} />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
