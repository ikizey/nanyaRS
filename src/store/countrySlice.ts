import { createSlice } from "@reduxjs/toolkit";
import countries from "../lib/countries";

export interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries,
};

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
});

export default countrySlice.reducer;
