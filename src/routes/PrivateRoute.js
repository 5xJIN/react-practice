//
import { Outlet, Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';

//
import { CheckToken } from '../utils/ToeknUtil';


export default function PrivateRoute() {
    const location = useLocation();
    const { isAuth } = CheckToken(location.key);

    if (isAuth === 'Failed') {
        return (
            <Navigate to="/user/login" state={{from: location}}/>
        )
    }

    return <Outlet />
}
