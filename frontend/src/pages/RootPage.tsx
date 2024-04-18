import RootHeader from "@/components/RootHeader";
import RootMain from "@/pages/RootMainPage";
import { Slice } from "@/types/sliceTypes";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function RootPage() {
  const { isAuth } = useSelector((state: Slice) => state.persistedReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate("/notes");
    }
  }, [isAuth, navigate]);

  return (
    <div className="flex flex-col h-dvh ">
      <RootHeader />
      <RootMain />
    </div>
  );
}

export default RootPage;
