import { Slice } from "@/types/sliceTypes";
import { ArchiveRestore, Loader, Trash, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import SetThemeButton from "./SetThemeButton";
import SetFontButton from "./SetFontButton";
import useRecyleNotes from "@/hooks/useRecycleNotes";
import useOnPermanentDelete from "@/hooks/useOnPermanentDelete";
import useRestoreNotes from "@/hooks/useRestoreNotes";

function NotesNavFooter() {
  const { isOnRead, isRecycled, selected } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const { isPending: isRecycling, mutate } = useRecyleNotes();
  const { onPermanentDelete, isPending: isDeleting } = useOnPermanentDelete();
  const { onRestore } = useRestoreNotes();

  function onRecycleNotes() {
    mutate(selected);
  }

  return (
    <div
      className={`border-t border-t-gray-300 py-3 flex justify-center lg:py-6 ${
        isRecycled && isOnRead ? "gap-8" : "gap-14"
      }`}
    >
      <SetThemeButton />

      <SetFontButton />

      {isOnRead && !isRecycled && (
        <button
          className="flex flex-col items-center text-xs"
          onClick={() => onRecycleNotes()}
          disabled={isRecycling}
        >
          {!isRecycling ? (
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

      {isOnRead && isRecycled && (
        <>
          <button
            className="flex flex-col items-center text-xs"
            onClick={() => onPermanentDelete()}
          >
            {!isDeleting ? (
              <>
                {" "}
                <Trash className="text-red-800 w-5" />
                <span className="text-xs text-red-800 font-medium">
                  permanently delete
                </span>{" "}
              </>
            ) : (
              <>
                <Loader className="text-red-800 w-5 animate-spin" />
                <span className="text-xs text-red-800 font-medium">
                  Deleting...
                </span>
              </>
            )}
          </button>

          <button
            className="flex flex-col items-center"
            onClick={() => onRestore()}
          >
            <ArchiveRestore className="w-5" />
            <span className="text-xs font-medium">Restore</span>
          </button>
        </>
      )}
    </div>
  );
}

export default NotesNavFooter;
