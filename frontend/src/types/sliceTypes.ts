export type Slice = {
  persistedReducer: {
    isOnRead: boolean;
    title: string;
    content: string;
    isAuth: boolean;
    notesId: string | undefined;
    onEdit: boolean;
    onEditRecycle: boolean;
    selected: [];
    isSelectAll: boolean;
    isRecycled: boolean;
    fontSize: "";
    forgotPassEmail: string;
    theme: {
      bg: string;
      color: string;
    };
  };
};
