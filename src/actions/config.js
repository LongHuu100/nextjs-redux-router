import { post } from 'libs/request'
import { api } from 'config'

export const CONFIG_ROUTE = Symbol('CONFIG_ROUTE')
export const CONFIG_USER = Symbol('CONFIG_USER')
export const CONFIG_MESSAGE = Symbol('CONFIG_MESSAGE')

export function configRoute (route) {
    return dispatch => {
        dispatch({
            type: CONFIG_ROUTE,
            payload: route
        })
    }
}

export function login (data) {
    return dispatch => {
        post(api.login, data).then(res => {
            console.log('login res -> ', res)
            configUser(res.data)
        }).catch(er => {
            console.log('login er -> ', er)
            dispatch({
                type: CONFIG_MESSAGE,
                payload: {
                    type: 'error',
                    data: er.toString()
                }
            })
        })
    }
}

export function configUser (user) {
    return dispatch => {
        dispatch({
            type: CONFIG_USER,
            payload: user
        })
    }
}
