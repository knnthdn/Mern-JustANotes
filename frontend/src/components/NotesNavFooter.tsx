import { Slice } from "@/types/sliceTypes";
import { ArchiveRestore, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import SetThemeButton from "./SetThemeButton";
import SetFontButton from "./SetFontButton";
import useRecyleNotes from "@/hooks/useRecycleNotes";
import useOnPermanentDelete from "@/hooks/useOnPermanentDelete";
import useRestoreNotes from "@/hooks/useRestoreNotes";

function NotesNavFooter() {
  const { isOnRead, isRecycled } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const onRecyleNotes = useRecyleNotes();
  const onPermanentDelete = useOnPermanentDelete();
  const onRestore = useRestoreNotes();

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
          onClick={() => onRecyleNotes()}
        >
          <Trash2 strokeWidth={2} className="w-5" />
          Delete
        </button>
      )}

      {isOnRead && isRecycled && (
        <>
          <button className="flex flex-col items-center text-xs">
            <Trash2
              strokeWidth={2}
              className="w-5"
              onClick={() => onPermanentDelete()}
            />
            permanent delete
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
