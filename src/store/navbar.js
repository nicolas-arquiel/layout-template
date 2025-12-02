import { createSlice } from '@reduxjs/toolkit'

const navbarSlice = createSlice({
  name: 'navbar',
  initialState: {
    suggestions: [],
    bookmarks: []
  },
  reducers: {
    handleSearchQuery: (state, action) => {
      state.query = action.payload
    },
    handleBookmarks: (state, action) => {
      state.bookmarks = action.payload
    },
    handleSuggestions: (state, action) => {
      state.suggestions = action.payload
    }
  }
})

export const {
  handleSearchQuery,
  handleBookmarks,
  handleSuggestions
} = navbarSlice.actions

export default navbarSlice.reducer
