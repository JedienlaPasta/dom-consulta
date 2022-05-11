import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

export default function PrivateRoute() {
    const { isAuth } = useContext(DataContext)

    return isAuth ? <Outlet /> : <Navigate to='/auth'/>
}