type NotesType = {
  title: string;
  content?: string;
  _id?: string;
  createdAt: Date;
  isRecycled: boolean;
  notesPreference?: {
    fontSize: object;
    theme: {
      bg: string;
      color: string;
    };
  };
};

export default NotesType;
