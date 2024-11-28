import { BrowserRouter, Route, Routes } from "react-router";
import { RoutesPath } from "./routes/routes";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesPath.App} element={<AppLayout />}></Route>
        <Route path={RoutesPath.Homepage} element={<Homepage />}></Route>
        <Route path={RoutesPath.Product} element={<Product />}></Route>
        <Route path={RoutesPath.Pricing} element={<Pricing />}></Route>
        <Route path={RoutesPath.Login} element={<Login />}></Route>
        <Route path={RoutesPath.NotFound} element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
