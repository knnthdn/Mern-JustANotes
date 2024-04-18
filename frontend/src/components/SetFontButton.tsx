import { WholeWord } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import useSetNotesPref from "@/hooks/useSetNotesPref";
import { useSelector } from "react-redux";
import { Slice } from "@/types/sliceTypes";
import { useDispatch } from "react-redux";
import { setFontLocal } from "@/utils/globalSlice";

const fontOpt = [
  {
    name: "normal",
    fontSize: "text-base",
  },
  {
    name: "medium",
    fontSize: "text-xl",
  },
  {
    name: "large",
    fontSize: "text-2xl",
  },
];

type FontTypes = {
  name: string;
  fontSize: string;
};

function SetFontButton() {
  const { notesId, isOnRead, fontSize } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const { mutate } = useSetNotesPref();
  const dispatch = useDispatch();

  function onSetFont(fs: FontTypes) {
    const pref = {
      fontSize: fs.fontSize,
    };

    if (!isOnRead) return dispatch(setFontLocal(pref.fontSize));
    if (pref.fontSize === fontSize) return;

    mutate(
      { id: notesId, pref },
      {
        onSuccess: () => dispatch(setFontLocal(pref.fontSize)),
      }
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex flex-col items-center text-xs">
          <WholeWord strokeWidth={2} className="w-5" />
          Font Size
        </button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col w-26 gap-1">
        {fontOpt.map((items: FontTypes) => {
          return (
            <button
              className={`hover:scale-[1.02] hover:underline ${
                items.fontSize === fontSize && "underline"
              }`}
              key={items.name}
              onClick={() => onSetFont(items)}
            >
              {items.name}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

export default SetFontButton;
