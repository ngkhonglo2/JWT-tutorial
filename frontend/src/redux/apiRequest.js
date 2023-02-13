import axios from 'axios';
import {loginStart, loginSuccess, loginFailed, registerStart, registerSuccess, registerFailed, logoutStart, logoutSuccess, logoutFailed} from './authSlice';
import {getAllUsersStart, getAllUsersSuccess, getAllUsersFailed, deleteUserStart, deleteUserSuccess, deleteUserFailed} from './userSilce';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post("/v1/auth/login", user)
        dispatch(loginSuccess(res.data))
        navigate('/')
    } catch(err) {
        dispatch(loginFailed())
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post("/v1/auth/register", user)
        dispatch(registerSuccess())
        navigate('/login')
    } catch(err) {
        dispatch(registerFailed())
    }
};


export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getAllUsersStart());
    try {
        const res = await axiosJWT.get("/v1/user/", {
            headers: {token: `Bearer ${accessToken}`}
        });
        dispatch(getAllUsersSuccess(res.data))
    } catch(err) {
        dispatch(getAllUsersFailed())
    }
};

export const deleteUser = async ( accessToken, id, dispatch, axiosJWT) => {
    dispatch(deleteUserStart());
    try {
        const res =await axiosJWT.delete(`/v1/user/${id}`, {
            headers: {token: `Bearer ${accessToken}`}
        })
        dispatch(deleteUserSuccess(res.data))
    } catch(err) {
        dispatch(deleteUserFailed(err.response.data))
    }
};

export const logoutUser = async (accessToken, id, dispatch, navigate, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/v1/auth/logout", id,{
            headers: {token: `Bearer ${accessToken}`}
        });
        dispatch(logoutSuccess())
        navigate('/login')
    } catch(err) {
        dispatch(logoutFailed())
    }
}