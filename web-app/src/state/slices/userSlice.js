import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  loading: false,
  hasErrors: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getUserFailure: (state) => {
      state.user = null;
      state.loading = false;
      state.hasErrors = true;
    },
  },
});

export const { getUser, getUserSuccess, getUserFailure } = userSlice.actions;

export const userSelector = (state) => state.user;
export default userSlice.reducer;

// export function fetchPost(postId) {
//   return async (dispatch) => {
//     dispatch(getPost());
//     try {
//       const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
//       const response = await fetch(url);
//       const data = await response.json();
//       dispatch(getPostSuccess(data));
//     } catch (error) {
//       dispatch(getPostFailure());
//     }
//   };
// }
