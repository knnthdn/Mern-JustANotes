import { ArchiveRestore, Trash } from "lucide-react";
import useOnPermanentDelete from "@/hooks/useOnPermanentDelete";

import useRestoreNotes from "@/hooks/useRestoreNotes";

function RecycleFooterNav() {
  const onPermanentDelete = useOnPermanentDelete();
  const onRestore = useRestoreNotes();

  return (
    <div className="border-t border-t-gray-300 py-3 flex justify-evenly lg:py-6">
      <button
        className="flex flex-col items-center"
        onClick={() => onPermanentDelete()}
      >
        <Trash className="text-red-800 w-5" />
        <span className="text-xs text-red-800 font-medium">
          permanently delete
        </span>
      </button>

      <button
        className="flex flex-col items-center"
        onClick={() => onRestore()}
      >
        <ArchiveRestore className="w-5" />
        <span className="text-xs font-medium">Restore</span>
      </button>
    </div>
  );
}

export default RecycleFooterNav;
