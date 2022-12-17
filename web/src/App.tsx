import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import HomePage from "@pages/home/HomePage";
import LoginPage from "@pages/login/LoginPage";
import RegisterPage from "@pages/register/RegisterPage";

import GlobalStyles from "@utils/globalStyles";
import { AppLayout } from "./App.styled";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <AppLayout>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AppLayout>
  );
}

export default App;
