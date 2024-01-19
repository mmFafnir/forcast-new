import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICoordinates {
  x: number;
  y: number;
}

interface IState {
  text: string | null;
  coordinates: ICoordinates | null;
}

const initialState: IState = {
  text: "",
  coordinates: null,
};

const toolkitSlice = createSlice({
  name: "toolkit",
  initialState,
  reducers: {
    setToolkitText: (state, action: PayloadAction<string | null>) => {
      state.text = action.payload;
    },
    setToolkitCor: (state, action: PayloadAction<ICoordinates | null>) => {
      state.coordinates = action.payload;
    },
  },
});

export const { setToolkitText, setToolkitCor } = toolkitSlice.actions;
export default toolkitSlice.reducer;
