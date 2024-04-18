import { useSelector } from "react-redux";
import RecycleFooterNav from "./RecycleFooterNav";
import RecycledHeader from "./RecycledHeader";
import RecycledMain from "./RecycledMain";
import { Slice } from "@/types/sliceTypes";

function RecycledNotes() {
  const { onEditRecycle } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  return (
    <div className="h-dvh w-full flex flex-col">
      <RecycledHeader />
      <RecycledMain />
      {onEditRecycle && <RecycleFooterNav />}
    </div>
  );
}

export default RecycledNotes;
