import useGetUserData from "@/hooks/useGetUserData";
import MainAddNotes from "./MainAddNotes";
import MainHeader from "./MainHeader";
import MainNotesList from "./MainNoteList";
import { Loader } from "lucide-react";

function MainApp() {
  const { isLoading } = useGetUserData();

  return (
    <div className="h-dvh w-full flex flex-col">
      {isLoading ? (
        <div className="h-dvh grid place-content-center">
          <div className="flex flex-col items-center gap-2">
            <p>Fetching Notes...</p>
            <Loader className="animate-spin -ml-2 text-blue-900" />
          </div>
        </div>
      ) : (
        <>
          <MainHeader />
          <MainNotesList />
          <MainAddNotes />
        </>
      )}
    </div>
  );
}

export default MainApp;
