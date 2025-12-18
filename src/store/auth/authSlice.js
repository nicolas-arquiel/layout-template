import { createSlice } from "@reduxjs/toolkit"
import { encryptData, decryptData } from '@src/@core/utils/encryption';


const initialUser = () => {
    const item = window.localStorage.getItem('userData')
    return item ? JSON.parse(item) : {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        dataUser: initialUser(),
        access_token: localStorage.getItem('access_token'),
        permisos: sessionStorage.getItem('userPermisos'),
    },
    reducers: {
        handleLogin: (state, action) => {
            const { dataUser, access_token } = action.payload
            state.dataUser = dataUser
            state.access_token = access_token
            localStorage.setItem('userData', JSON.stringify(dataUser))
            localStorage.setItem('access_token', access_token)
        },
        handlePermisos: (state, action) => {
            const {
                roles_descripcion,    // Descripción de roles
                id_roles,             // IDs de roles
                todos_permisos,       // Todos los permisos del usuario
                todos_permisos_id     // Todos los IDs de permisos
            } = action.payload;

/*             state.permisos = {
                descripcionRoles: roles_descripcion,
                idRoles: id_roles,
                // Todos los permisos del usuario (específicos + rol)
                permisosUser: todos_permisos,
                idPermisosUser: todos_permisos_id
            } */

            console.log('todos_permisos',todos_permisos);
            
            // Encriptamos los permisos
            const permisosEncriptados = encryptData(todos_permisos);
            console.log('permisosEncriptados',permisosEncriptados);

            state.permisos = permisosEncriptados;
            sessionStorage.setItem('userPermisos', permisosEncriptados);


        },
        handleLogout: state => {
            state.dataUser = null
            state.access_token = null
            state.permisos = {}
            localStorage.removeItem('userData')
            localStorage.removeItem('access_token'),
            sessionStorage.removeItem('userPermisos')
        },
        refreshUserData: (state, action) => {
            const { currentData } = action.payload
            state.dataUser = currentData
            localStorage.setItem('userData', JSON.stringify(currentData))
        }
    }
})

export const { handleLogin, handleLogout, handlePermisos, refreshUserData } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.dataUser
export const selectCurrentToken = (state) => state.auth.access_token

// Selector  para desencriptar los permisos
export const selectPermisos = (state) => {
    const permisosEncriptados = state.auth.permisos;
    if (!permisosEncriptados) return {};
    
    return decryptData(permisosEncriptados) || {};
};
