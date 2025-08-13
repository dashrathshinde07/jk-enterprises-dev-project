import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n/i18n";

// Get language from localStorage, fallback to Marathi
const storedLanguage = localStorage.getItem("language") || "mr";

const initialState = {
  language: storedLanguage,
};

// Set i18n to stored language at startup
i18n.changeLanguage(storedLanguage);

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem("language", action.payload); // Save to localStorage
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
