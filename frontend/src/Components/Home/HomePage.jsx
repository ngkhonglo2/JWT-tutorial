import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import "./home.css";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";

const HomePage = () => {
  const user = useSelector( state => state.auth.login?.currentUser);
  const userData = useSelector(state => state.users.users.allUsers)
  const deleteMeseger = useSelector(state => state.users.msg)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //DUMMY DATA
  const hanldeDelete = (id) => {
    deleteUser(user?.accessToken, id, dispatch, axiosJWT)
  };
  let axiosJWT = createAxios(user, dispatch, loginSuccess)
  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
    if(user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT)
    }
  }, []);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`your role: ${user?.admin ? 'Admin' : 'User'}`}
      </div>
      <div className="home-userlist">
        {userData?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.userName}</div>

              <div className="delete-user" onClick={() => hanldeDelete(user._id)}> Delete </div>
            </div>
          );
        })}
      </div>
      {deleteMeseger}
    </main>
  );
};

export default HomePage;
