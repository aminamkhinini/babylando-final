import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const PrivateRoute = ({ component: Component, ...rest }) => {
  //const userlogin= useSelector((state) => state.auth);
  //const { userInfo } = userlogin;
  const isAuth = useSelector((state) => state.auth.userInfo.isAuth);
  const role = useSelector((state) => state.auth.userInfo.user?.role);

  return (
    <Route
      {...rest} render={(props) =>
        isAuth && role === 'user' ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
