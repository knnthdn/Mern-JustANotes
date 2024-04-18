import {
  deselectAll,
  selectAll,
  toggleOnEdit,
  toggleOnEditRecycle,
} from "@/utils/globalSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

function useOnCancelSelect() {
  const { pathname } = useLocation();

  const dispatch = useDispatch();
  function onCancelSelect() {
    dispatch(selectAll(false));
    dispatch(deselectAll());
    if (pathname === "/recyclebin") return dispatch(toggleOnEditRecycle(false));
    if (pathname === "/notes") return dispatch(toggleOnEdit(false));
  }
  return onCancelSelect;
}

export default useOnCancelSelect;
