import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unSetUserToken } from '../features/authSlice';
import { unsetUserInfo } from '../features/userSlice';
import { removeToken } from '../services/LocalStorageService';

const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
      dispatch(unsetUserInfo({ first_Name: "",last_Name: "",email: "",type: "", }))
      dispatch(unSetUserToken({ access_token: null }))
      removeToken()
      navigate("/login")
    }
    handleLogout ()
};
  
export default Logout;