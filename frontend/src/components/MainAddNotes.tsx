import { Link } from "react-router-dom";
import { Loader, NotebookPen, Trash2 } from "lucide-react";
import { Slice } from "../types/sliceTypes";
import { useSelector } from "react-redux";
import useRecyleNotes from "@/hooks/useRecycleNotes";

function MainAddNotes() {
  const { onEdit, selected } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const { mutate, isPending } = useRecyleNotes();

  function onRecycleNotes() {
    mutate(selected);
  }

  return (
    <div className="border-t border-t-gray-300 py-3 flex justify-center lg:py-6">
      {!onEdit ? (
        <Link to="/newnote" className="flex flex-col items-center ">
          <NotebookPen strokeWidth={2} className="w-5" />
          <span className="text-xs font-medium xl:text-sm">New Note</span>
        </Link>
      ) : (
        <button
          className="flex flex-col items-center"
          onClick={() => onRecycleNotes()}
          disabled={isPending}
        >
          {!isPending ? (
            <>
              <Trash2 className="text-red-800 w-5" />
              <span className="text-xs text-red-800 font-medium">delete</span>
            </>
          ) : (
            <>
              {" "}
              <Loader className="text-red-800 w-5 animate-spin" />
              <span className="text-xs text-red-800 font-medium ml-3">
                Deleting...
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default MainAddNotes;
