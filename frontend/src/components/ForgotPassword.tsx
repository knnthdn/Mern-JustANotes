import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "/header-icon.png";

function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <div>
      <header className=" border-b border-b-gray-400 flex justify-between items-center px-4 py-4 sm:px-8 lg:py-6 ">
        <div className="flex gap-1 items-center font-semibold text-2xl text-main">
          <img src={logo} alt="Logo notes" className="w-10" />
          <h1 className="text-main md:text-4xl ">Just a Notes</h1>
        </div>
        <Button onClick={() => navigate("/login")}>Log in</Button>
      </header>

      <Outlet />
    </div>
  );
}

export default ForgotPassword;
