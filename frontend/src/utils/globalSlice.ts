import { createSlice } from "@reduxjs/toolkit";

export type IdType = {
  _id: string;
  isRecycled: boolean;
};

const initialState = {
  isOnRead: false,
  title: "",
  content: "",
  notesId: "",
  isAuth: false,
  onEdit: false,
  onEditRecycle: false,
  selected: [],
  isSelectAll: false,
  theme: {},
  fontSize: "",
  isRecycled: false,
  forgotPassEmail: "",
};

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    storeNotes(state, action) {
      state.isOnRead = action.payload.isOnRead;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.notesId = action.payload.notesId;
      state.theme = action.payload.theme;
      state.fontSize = action.payload.fontSize;
      state.isRecycled = action.payload.isRecycled;
    },
    toggleAuth(state, action) {
      state.isAuth = action.payload;
    },
    onEditContent(state, action) {
      state.content = action.payload;
    },
    onEditTitle(state, action) {
      state.title = action.payload;
    },
    resetNotes(state) {
      state.title = "";
      state.content = "";
      state.notesId = "";
      state.isOnRead = false;
      state.isOnRead = false;
      state.onEditRecycle = false;
      state.theme = {};
      state.fontSize = "";
      state.selected = [];
    },
    toggleOnEdit(state, action) {
      state.onEdit = action.payload;
    },
    toggleOnEditRecycle(state, action) {
      state.onEditRecycle = action.payload;
    },
    addToSelect(state, action) {
      state.selected = action.payload;
    },
    filterSelected(state, action) {
      state.selected = state.selected.filter(
        (items: IdType) => items._id !== action.payload
      );
    },
    selectAll(state, action) {
      state.isSelectAll = action.payload;
    },
    deselectAll(state) {
      state.selected = [];
    },
    setThemeLocal(state, action) {
      state.theme = action.payload;
    },
    setFontLocal(state, action) {
      state.fontSize = action.payload;
    },
    userLogout(state) {
      state.isAuth = false;
    },
    setForgotPassEmail(state, action) {
      state.forgotPassEmail = action.payload;
    },
  },
});

export const {
  storeNotes,
  toggleAuth,
  onEditContent,
  onEditTitle,
  resetNotes,
  toggleOnEdit,
  toggleOnEditRecycle,
  addToSelect,
  filterSelected,
  selectAll,
  deselectAll,
  setThemeLocal,
  setFontLocal,
  userLogout,
  setForgotPassEmail,
} = globalSlice.actions;
export default globalSlice.reducer;
