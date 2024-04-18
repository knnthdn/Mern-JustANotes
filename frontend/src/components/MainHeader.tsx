import { useDispatch } from "react-redux";
import { Separator } from "./ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import logo from "/header-icon.png";
import { CircleUserRound, Menu, Recycle } from "lucide-react";
import { userLogout } from "@/utils/globalSlice";
import { Slice } from "../types/sliceTypes";
import { useSelector } from "react-redux";
import useOnCancelSelect from "@/hooks/useOnCancelNotes";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import logout from "@/services/logout";
import useOnSelectAll from "@/hooks/useOnSelectAll";
import useGetUserData from "@/hooks/useGetUserData";

function MainHeader() {
  const { onEdit } = useSelector((state: Slice) => state.persistedReducer);

  return <>{!onEdit ? <Main /> : <OnEdit />}</>;
}

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onLogout() {
    dispatch(userLogout());
    logout();
  }
  const { data } = useGetUserData();

  const headerGreet =
    data?.data.user.nickname === undefined
      ? data?.data.user.email.split("@")[0]
      : data?.data.user.nickname;

  return (
    <header className="flex justify-between items-center p-4 border-b border-b-gray-300 sm:px-8 lg:py-6 ">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-12 lg:w-14" />
        <h1 className="text-4xl font-medium  text-main lg:text-5xl">Notes</h1>
      </div>

      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>

        <SheetContent className="flex flex-col gap-3">
          <SheetTitle className="font-medium capitalize">
            Welcome{" "}
            <span className="hover:underline" onClick={() => navigate("/user")}>
              {headerGreet}
            </span>
          </SheetTitle>

          <Separator className="my-2 text-red-600" />

          <Accordion type="single" collapsible className="">
            <AccordionItem value="account" className="border-none ">
              <AccordionTrigger className="py-0">
                <span className="flex gap-2 items-center">
                  <CircleUserRound className="w-5" />
                  Account
                </span>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-1 mt-2 py-0">
                <Link to="/user">User</Link>
                <Link to="/changepassword">Change Password</Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Link
            to="/recyclebin"
            className="text-sm font-medium flex items-center gap-2"
          >
            <Recycle className="w-5 " />
            Recycle Bin
          </Link>

          <Button onClick={onLogout}>Logout</Button>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function OnEdit() {
  const { selected, isSelectAll } = useSelector(
    (state: Slice) => state.persistedReducer
  );

  const onCancelSelect = useOnCancelSelect();
  const { onSelectAll } = useOnSelectAll();

  return (
    <header className="flex justify-between items-center p-7 border-b border-b-gray-300 sm:px-8 lg:py-9 lg:text-2xl ">
      <button onClick={onSelectAll} className="">
        {!isSelectAll ? "Select all" : "Deselect all"}
      </button>

      <span>{selected.length ? selected.length : "Select Items"}</span>

      <button onClick={onCancelSelect}>Cancel</button>
    </header>
  );
}

export default MainHeader;
