
import ProtectedRoute from './ProtectedRoute'
import Alert from '../components/Alert/Alert'
import MenuLeft from '../components/MenuLeft/MenuLeft'

function MasterLayout({children}) {
    return (
        <ProtectedRoute>
            <Alert>
                <MenuLeft>
                    {children}
                </MenuLeft>
            </Alert>
        </ProtectedRoute>
    )
}

export default MasterLayout