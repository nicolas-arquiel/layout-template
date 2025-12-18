import { createSlice } from "@reduxjs/toolkit"
import { encryptData, decryptData } from '@src/@core/utils/encryption'
import {
  AUTH_USER_DATA_KEY,
  AUTH_TOKEN_KEY,
  AUTH_USER_PERMISOS_KEY
} from '@src/config/storageKeys'




const initialUser = () => {
    const item = window.localStorage.getItem(AUTH_USER_DATA_KEY)
    if (!item) return null
    
    try {
        const parsed = JSON.parse(item)
        // Verificar que sea un objeto válido con datos de usuario
        if (parsed && typeof parsed === 'object' && (parsed.id || parsed.email)) {
            return parsed
        }
        return null
    } catch (error) {
        console.error('[authSlice] Error parsing user data:', error)
        return null
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        dataUser: initialUser(),
        access_token: localStorage.getItem(AUTH_TOKEN_KEY) || null,
        permisos: sessionStorage.getItem(AUTH_USER_PERMISOS_KEY) || null,
    },
    reducers: {
        handleLogin: (state, action) => {
            const { dataUser, access_token } = action.payload
            state.dataUser = dataUser
            state.access_token = access_token
            localStorage.setItem(AUTH_USER_DATA_KEY, JSON.stringify(dataUser))
            localStorage.setItem(AUTH_TOKEN_KEY, access_token)
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
            sessionStorage.setItem(AUTH_USER_PERMISOS_KEY, permisosEncriptados);


        },
        handleLogout: state => {
            state.dataUser = null
            state.access_token = null
            state.permisos = null
            
            // Limpiar SOLO los datos de autenticación
            // Las configuraciones de tema, layout y accesibilidad se mantienen
            localStorage.removeItem(AUTH_USER_DATA_KEY)
            localStorage.removeItem(AUTH_TOKEN_KEY)
            sessionStorage.removeItem(AUTH_USER_PERMISOS_KEY)
        },
        refreshUserData: (state, action) => {
            const { currentData } = action.payload
            state.dataUser = currentData
            localStorage.setItem(AUTH_USER_DATA_KEY, JSON.stringify(currentData))
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
