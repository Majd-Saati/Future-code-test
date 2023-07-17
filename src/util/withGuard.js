
import Login from "../pages/Login";

// HOC Protected Route
const withGuard = (Component) => {
  const Wrapper = (props) => {
    const token = localStorage.getItem('token')
    return token ? (
      <Component {...props} />
    ) : (
     <Login/>
    );
  };
  return Wrapper;
};

export default withGuard;
