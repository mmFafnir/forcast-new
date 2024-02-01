import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/shared/core/axios";

export const togglePinLeague = createAsyncThunk(
  "pinLeagues",
  async (id: number) => {
    const { data } = await axios.post("/user_add_league_in_pind", {
      league_id: id,
    });
    console.log(data);
    return data;
  }
);
