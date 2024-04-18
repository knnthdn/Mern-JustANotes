import { NavLink, Outlet } from "react-router-dom";

export type Inputs = {
  email: string;
  password: string;
};

function RootMain() {
  return (
    <main className="flex-1 flex items-center px-5">
      <div className=" w-full  max-h-96  -mt-10 flex flex-col gap-2 ">
        <div className="w-full flex  rounded-md p-1 ring-offset-background bg-[#71717a38] min-[500px]:w-[400px] min-[500px]:mx-auto md:w-[450px] md:p-2">
          <NavLink
            to="login"
            className=" w-full py-2 grid place-content-center text-main tracking-wide text-sm  rounded-md"
          >
            Log in
          </NavLink>

          <NavLink
            to="register"
            className="grid place-content-center w-full text-center text-main  text-sm tracking-wide rounded-sm"
          >
            Register
          </NavLink>
        </div>

        <Outlet />
      </div>
    </main>
  );
}

export default RootMain;
