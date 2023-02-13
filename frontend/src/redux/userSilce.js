import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
        msg: '',
    },

    reducers: {
        getAllUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getAllUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        getAllUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.error = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        }
    }
})

export const {getAllUsersStart, getAllUsersSuccess, getAllUsersFailed, deleteUserStart, deleteUserSuccess, deleteUserFailed} = userSlice.actions;

export default userSlice.reducer;