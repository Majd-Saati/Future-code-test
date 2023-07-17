import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { logOutHandler } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const logOut = () => {
    dispatch(logOutHandler(localStorage.getItem("token")))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        alert(error.mesaage);
      });
  };

  return (
    <div className="header">
      <h1>Future Code Test</h1>
      <ul className="nav">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="advertisment/add">Add</NavLink>
        </li>
        <li className="login">
          <Loading loading={loading} error={error}>
            <Button variant="danger" onClick={() => logOut()}>
              Log out
            </Button>
          </Loading>
        </li>
      </ul>
    </div>
  );
};

export default Header;
