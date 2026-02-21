import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store/store";

import AppNavbar from "./Components/Common/Navbar";
import Footer from "./Components/Common/Footer";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppNavbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
