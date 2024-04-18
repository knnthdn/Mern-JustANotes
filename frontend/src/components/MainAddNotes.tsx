import { Link } from "react-router-dom";
import { NotebookPen, Trash2 } from "lucide-react";
import { Slice } from "../types/sliceTypes";
import { useSelector } from "react-redux";
import useRecyleNotes from "@/hooks/useRecycleNotes";

function MainAddNotes() {
  const { onEdit } = useSelector((state: Slice) => state.persistedReducer);
  const onRecyleNotes = useRecyleNotes();

  return (
    <div className="border-t border-t-gray-300 py-3 flex justify-center lg:py-6">
      {!onEdit ? (
        <Link to="/newnote" className="flex flex-col items-center ">
          <NotebookPen strokeWidth={2} className="w-5" />
          <span className="text-xs font-medium xl:text-sm">New Note</span>
        </Link>
      ) : (
        <div
          role="button"
          className="flex flex-col items-center"
          onClick={() => onRecyleNotes()}
        >
          <Trash2 className="text-red-800 w-5" />
          <span className="text-xs text-red-800 font-medium">delete</span>
        </div>
      )}
    </div>
  );
}

export default MainAddNotes;
