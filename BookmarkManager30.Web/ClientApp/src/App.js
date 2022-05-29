import React from "react";
import { Route } from 'react-router-dom';
import { BookmarksContextComp } from "./BookmarksContext";
import Layout from "./Layout";
import Home from './Pages/Home';
import SignUp from "./Pages/SignUp";
import LogIn from './Pages/LogIn';
import LogOut from './Pages/LogOut';
import AddBookmark from "./Pages/AddBookmark";
import MyBookmarks from "./Pages/MyBookmarks";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
    return <BookmarksContextComp>
        <Layout>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/login' component={LogIn} />
            <Route exact path='/logout' component={LogOut} />
            <PrivateRoute exact path='/addbookmark' component={AddBookmark} />
            <PrivateRoute exact path='/mybookmarks' component={MyBookmarks} />
        </Layout>
    </BookmarksContextComp>
}

export default App;