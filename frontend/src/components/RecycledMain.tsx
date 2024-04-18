import useGetUserData from "@/hooks/useGetUserData";
import RecycledList from "./RecycledList";
import NotesType from "@/types/notesItemsType";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deselectAll, toggleOnEditRecycle } from "@/utils/globalSlice";

function RecycledMain() {
  const { data } = useGetUserData();
  const dispatch = useDispatch();
  const recycledNotes = data?.data?.user.notes.filter(
    (items: { isRecycled: boolean }) => (items.isRecycled as boolean) !== false
  );

  useEffect(() => {
    return () => {
      dispatch(deselectAll());
      dispatch(toggleOnEditRecycle(false));
    };
  }, [dispatch]);

  return (
    <main className="flex h-full overflow-auto px-4 py-2 mt-2 sm:px-8 md:px-14 lg:border-2 lg:border-gray-400 lg:p-8 lg:my-2 lg:mx-14 lg:rounded-xl lg:bg-gray-50 xl:mx-36 2xl:mx-40 xxl:mx-80 xxl:px-16">
      {recycledNotes?.length > 0 ? (
        <div className="flex flex-col gap-3 w-full lg:gap-4">
          {recycledNotes?.map((items: NotesType) => {
            return (
              <RecycledList
                title={items.title}
                content={items.content}
                createdAt={items.createdAt}
                notesPreference={items.notesPreference}
                _id={items._id}
                isRecycled={items.isRecycled}
                key={items._id}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-full w-full grid place-items-center -mt-10 text-xl">
          📪 Empty ...
        </div>
      )}
    </main>
  );
}

export default RecycledMain;
