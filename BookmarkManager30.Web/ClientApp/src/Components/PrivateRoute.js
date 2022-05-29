import React from 'react';
import { Route } from 'react-router-dom';
import { useBookmarksContext } from '../BookmarksContext';
import LogIn from '../Pages/LogIn';

function PrivateRoute({ component, ...options }) {
    const { user } = useBookmarksContext();
    const finalComponent = !!user ? component : LogIn;
    return <Route {...options} component={finalComponent} />
}

export default PrivateRoute;