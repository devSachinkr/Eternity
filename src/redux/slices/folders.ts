import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  folders: ({
    _count: {
      videos: number;
    };
  } & {
    id: string;
    name: string;
    workspaceId: string | null;
    createdAt: Date;
  })[];
};

const initialState: InitialState = {
  folders: [],
};

export const FolderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    FOLDERS: (state, action: PayloadAction<InitialState>) => {
      return { ...action.payload };
    },
  },
});

export const { FOLDERS } = FolderSlice.actions;
export default FolderSlice.reducer;

