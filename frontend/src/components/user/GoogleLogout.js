import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { googleLogout } from "../../actions/userActions";
const clientId =
  "629274107705-pppj24d559dgmpqcrkubgfqnl0hr9j4p.apps.googleusercontent.com";

function LogoutGoogle() {
  const dispatch = useDispatch();

  const onSuccess = () => {
    console.log("Logout success");
    dispatch(googleLogout());
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default LogoutGoogle;
