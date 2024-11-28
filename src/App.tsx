import { BrowserRouter, Route, Routes } from "react-router";
import { RoutesPath } from "./routes/routes";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesPath.Homepage} element={<Homepage />}></Route>
        <Route path={RoutesPath.Product} element={<Product />}></Route>
        <Route path={RoutesPath.Pricing} element={<Pricing />}></Route>
        <Route path={RoutesPath.NotFound} element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
