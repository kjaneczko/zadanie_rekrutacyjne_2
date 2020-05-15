import React from 'react';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login';
import Logout from './views/Logout';
import Register from './views/Register';
import E404 from './views/errors/E404';
import PrivateRoute from './PrivateRoutes';
import Profile from './views/Profile';
import Dashboard from './views/Dashboard';
import Users from './views/Users';
// Operations on users
import UserDetails from './views/users/Details';
import AddUser from './views/users/Add';
import EditUser from './views/users/Edit';
import RemoveUser from './views/users/Remove';

const Main = props => (
    <Switch>
        {/* User might LogIn */}
        <Route exact path='/' component={Home}/>

        {/* User will LogIn */}
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>

        {/* User is LoggedIn */}
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path='/users' component={Users}/>
        <PrivateRoute path='/profile' component={Profile}/>
        <PrivateRoute path='/logout' component={Logout}/>

        {/* Operations on users */}
        <PrivateRoute path='/user' component={UserDetails}/>
        <PrivateRoute path='/add-user' component={AddUser}/>
        <PrivateRoute path='/edit-user' component={EditUser}/>
        <PrivateRoute path='/remove-user' component={RemoveUser}/>

        {/* Page Not Found */}
        <Route component={E404}/>
    </Switch>
);
export default Main;
