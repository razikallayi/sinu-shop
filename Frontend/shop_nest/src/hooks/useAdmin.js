import axios from "axios";
import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base64Decode } from "utils/utils";

export const ACCESS_TOKEN = "AdminToken"

export const useAdmin = () => {
  const { admin, setAdmin } = useContext(AuthContext)
  const navigate = useNavigate()

  const removeUser = () => {
    setAdmin(null);
  };

  const login = (email, password) => {
    axios.post("http://localhost:5000/admin/login", { email: email, password: password }).then(response => {
      if (response.data) {
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken)
        const token = response.data.accessToken
        extractUser(token)
        navigate('/dashboard')
      } else {
        toast(response.data.message)
      }
    }).catch(e => {
      toast.error(e.response?.data?.message)
    })
  };


  const extractUser = (token) => {
    const decodeToken = JSON.parse(base64Decode(token.split('.')[1]))
    setAdmin(decodeToken)
  }

  const isLoggedIn = () => {
    if(!admin) return false
    const FifteenMinutes = 900
    const tokenExpiryTime = (Date.now() + FifteenMinutes)/1000
    if(admin?.exp <= tokenExpiryTime){
      logout()
      return false
    }else{
      return true
    }
  }

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN)
    removeUser();
    navigate('/admin')
  };

  return { login, logout, isLoggedIn, user: admin };
};