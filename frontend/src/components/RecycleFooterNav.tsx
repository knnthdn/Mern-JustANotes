import { ArchiveRestore, Loader, Trash } from "lucide-react";
import useOnPermanentDelete from "@/hooks/useOnPermanentDelete";

import useRestoreNotes from "@/hooks/useRestoreNotes";

function RecycleFooterNav() {
  const { onPermanentDelete, isPending: isDeleting } = useOnPermanentDelete();
  const { onRestore, isPending: isRestoring } = useRestoreNotes();

  return (
    <div className="border-t border-t-gray-300 py-3 flex justify-evenly lg:py-6">
      <button
        className="flex flex-col items-center"
        onClick={() => onPermanentDelete()}
        disabled={isDeleting || isRestoring}
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
        disabled={isDeleting || isRestoring}
      >
        {!isRestoring ? (
          <>
            <ArchiveRestore className="w-5" />
            <span className="text-xs font-medium">Restore</span>
          </>
        ) : (
          <>
            <Loader className=" w-5 animate-spin" />
            <span className="text-xs  font-medium">Restoring...</span>
          </>
        )}
      </button>
    </div>
  );
}

export default RecycleFooterNav;
