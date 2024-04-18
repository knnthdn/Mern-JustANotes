import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootPage from "./pages/RootPage";
import Login from "./components/Login";
import MainApp from "./components/MainApp";
import NewNote from "./pages/NewNote";
import { Toaster } from "./components/ui/toaster";
import AuthProtect from "./components/AuthProtect";
import RecycledNotes from "./components/RecycledNotes";
import ChangePassword from "./components/ChangePassword";
import UserSettings from "./components/UserSettings";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import FindUser from "./components/FindUser";
import ResetPassword from "./components/ResetPassword";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootPage />}>
          <Route index element={<Navigate replace to="login" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/forgotpassword" element={<ForgotPassword />}>
          <Route index element={<Navigate replace to="findUser" />} />
          <Route path="findUser" element={<FindUser />} />
          <Route path="resetPassword" element={<ResetPassword />} />
        </Route>

        <Route
          path="/notes"
          element={
            <AuthProtect>
              <MainApp />
            </AuthProtect>
          }
        />

        <Route
          path="/newnote"
          element={
            <AuthProtect>
              <NewNote />
            </AuthProtect>
          }
        />

        <Route
          path="/recyclebin"
          element={
            <AuthProtect>
              <RecycledNotes />
            </AuthProtect>
          }
        />

        <Route
          path="/changepassword"
          element={
            <AuthProtect>
              <ChangePassword />
            </AuthProtect>
          }
        />

        <Route
          path="/user"
          element={
            <AuthProtect>
              <UserSettings />
            </AuthProtect>
          }
        />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
