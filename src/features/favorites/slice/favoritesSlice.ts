import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IState {
  favorites: number[];
}

const initialState: IState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorite: (state, action: PayloadAction<number[]>) => {
      const set = new Set([...action.payload, ...state.favorites]);
      const uniqueArray = Array.from(set);
      state.favorites = uniqueArray;
    },

    deleteFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((fav) => fav !== action.payload);
    },
    deleteIdsFavorite: (state, action: PayloadAction<number[]>) => {
      state.favorites = state.favorites.filter((fav) => {
        return !action.payload.includes(fav);
      });
    },

    deleteAllFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const {
  setFavorite,
  deleteFavorite,
  deleteIdsFavorite,
  deleteAllFavorites,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
