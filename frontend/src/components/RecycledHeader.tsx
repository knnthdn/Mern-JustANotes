import useOnCancelSelect from "@/hooks/useOnCancelNotes";
import useOnSelectAll from "@/hooks/useOnSelectAll";
import { Slice } from "@/types/sliceTypes";
import { resetNotes, toggleOnEditRecycle } from "@/utils/globalSlice";
import { MoveLeft } from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function RecycledHeader() {
  const { onEditRecycle } = useSelector(
    (state: Slice) => state.persistedReducer
  );

  return <>{!onEditRecycle ? <RecycleHeaderMain /> : <OnEditRecycle />}</>;
}

function RecycleHeaderMain() {
  const { onEditRecycle } = useSelector(
    (state: Slice) => state.persistedReducer
  );

  const dispatch = useDispatch();
  function exitRecycle() {
    dispatch(resetNotes());
  }

  function handleOnEditRecycle() {
    dispatch(toggleOnEditRecycle(!onEditRecycle));
  }

  return (
    <header className="flex justify-between items-center px-4 py-6 border-b border-b-gray-300 sm:px-8 lg:py-10 lg:text-lg ">
      <Link
        to="/notes"
        onClick={() => exitRecycle()}
        className="cursor-pointer hover:scale-[.95]"
      >
        <MoveLeft />
      </Link>

      <span>Recenty deleted</span>

      <button
        className="flex text-sm border border-gray-300 rounded-md h-fit px-2 font-medium cursor-pointer hover:scale-[.95]"
        onClick={() => handleOnEditRecycle()}
      >
        <span className="mr-1">🖊</span>
        Edit
      </button>
    </header>
  );
}

function OnEditRecycle() {
  const onCancelSelect = useOnCancelSelect();
  const { selected, isSelectAll } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const { onSelectAll } = useOnSelectAll();
  return (
    <header className="flex justify-between items-center px-4 py-6 border-b border-b-gray-300 sm:px-8 lg:py-10 lg:text-lg">
      <button onClick={() => onSelectAll()}>
        {!isSelectAll ? "Select all" : "Deselect all"}
      </button>

      <span>{selected.length ? selected.length : "Select Items"}</span>

      <button onClick={() => onCancelSelect()}>Cancel</button>
    </header>
  );
}

export default RecycledHeader;
