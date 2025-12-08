
import ProtectedRoute from './ProtectedRoute'
import Alert from '../components/Alert/Alert'
import MenuLeft from '../components/MenuLeft/MenuLeft'
import { Outlet } from 'react-router-dom'

function MasterLayout() {
    return (
        <ProtectedRoute>
            <Alert>
                <MenuLeft>
                    <Outlet />
                </MenuLeft>
            </Alert>
        </ProtectedRoute>
    )
}

export default MasterLayout