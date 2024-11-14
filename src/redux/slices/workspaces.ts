import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  workspaces: {
    type: "PERSONAL" | "PUBLIC";
    name: string;
    id: string;
  }[];
};

const initialState: InitialState = {
  workspaces: [],
};

export const WorkspaceSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    WORKSPACES: (state, action: PayloadAction<InitialState>) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACES } = WorkspaceSlice.actions;
export default WorkspaceSlice.reducer;
