import Notes from "./MainNotesItems";
import NotesType from "@/types/notesItemsType";
import useGetUserData from "@/hooks/useGetUserData";

type IsRecyled = {
  isRecycled: boolean;
};

function MainNotesList() {
  const { data } = useGetUserData();

  const notesList = data?.data?.user.notes.filter(
    (items: IsRecyled) => (items.isRecycled as boolean) === false
  );

  return (
    <div className="flex h-full overflow-auto px-4 py-2 mt-2 sm:px-8 md:px-14 lg:border-2 lg:border-gray-400 lg:p-8 lg:my-2 lg:mx-14 lg:rounded-xl lg:bg-gray-50 xl:mx-36 2xl:mx-40 xxl:mx-80 xxl:px-16">
      {notesList?.length > 0 ? (
        <div className="flex flex-col gap-3 w-full lg:gap-4">
          {notesList?.map((items: NotesType) => {
            return (
              <Notes
                title={items.title}
                content={items.content}
                _id={items._id}
                createdAt={items.createdAt}
                notesPreference={items.notesPreference}
                isRecycled={items.isRecycled}
                key={items._id}
              />
            );
          })}
        </div>
      ) : (
        <div className="w-full h-full grid place-items-center text-xl ">
          📪 Empty ...
        </div>
      )}
    </div>
  );
}

export default MainNotesList;
