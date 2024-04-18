import { Palette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useSelector } from "react-redux";
import { Slice } from "@/types/sliceTypes";
import { useDispatch } from "react-redux";
import { setThemeLocal } from "@/utils/globalSlice";
import useSetNotesPref from "@/hooks/useSetNotesPref";

const themeOpt = [
  {
    name: "default",
    bg: "bg-white",
    color: "text-black",
  },
  {
    name: "Light gray",
    bg: "bg-gray-200",
    color: "text-black",
  },
  {
    name: "dark",
    bg: "bg-[#03001C]",
    color: "text-white",
  },
  {
    name: "wheat",
    bg: "bg-[#fbdeb3]",
    color: "text-black",
  },
];

type ThemeTypes = {
  name: string;
  bg: string;
  color: string;
};

function SetThemeButton() {
  const { notesId, isOnRead, theme } = useSelector(
    (state: Slice) => state.persistedReducer
  );
  const dispatch = useDispatch();

  const { mutate } = useSetNotesPref();

  function onSelectTheme(items: ThemeTypes) {
    const pref = {
      theme: {
        bg: items.bg,
        color: items.color,
      },
    };

    if (!isOnRead)
      return dispatch(
        setThemeLocal({ bg: pref.theme.bg, color: pref.theme.color })
      );

    if (pref.theme.bg === theme.bg) return;

    mutate(
      { id: notesId, pref },
      {
        onSuccess: () =>
          dispatch(
            setThemeLocal({ bg: pref.theme.bg, color: pref.theme.color })
          ),
      }
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex flex-col items-center text-xs">
          <Palette strokeWidth={2} className="w-5" />
          Theme
        </button>
      </PopoverTrigger>

      <PopoverContent className="flex flex-col gap-1 w-26">
        {themeOpt.map((items: ThemeTypes) => {
          return (
            <button
              className={`flex  gap-2 items-center hover:scale-[1.02] hover:underline ${
                items.bg === theme.bg && "underline"
              }`}
              key={items.name}
              onClick={() => onSelectTheme(items)}
            >
              <span
                className={`size-4 block border border-black rounded-sm  ${items.bg} `}
              ></span>
              {items.name}
            </button>
          );
        })}
      </PopoverContent>
      <Popover />
    </Popover>
  );
}

export default SetThemeButton;
