import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { googleLogin } from "../../actions/userActions";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const clientId =
  "629274107705-pppj24d559dgmpqcrkubgfqnl0hr9j4p.apps.googleusercontent.com";

function LoginGoogle() {
  const history = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";
  const { isAuthenticated, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history(redirect);
    }
  }, [dispatch, isAuthenticated, error, history, redirect]);

  const onSuccess = (response) => {
    console.log("Login success! currentUser:", response.profileObj);
    dispatch(
      googleLogin(
        response.profileObj.email,
        response.profileObj.name,
        response.profileObj.imageUrl,
        response.profileObj.googleId
      )
    );
  };

  const onFailure = (response) => {
    console.log("Login failed! res", response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        scope="profile email"
      />
    </div>
  );
}

export default LoginGoogle;
