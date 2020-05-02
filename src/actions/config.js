import { post } from 'libs/request'
import { api } from 'config'

export const CONFIG_ROUTE = 'CONFIG_ROUTE'
export const CONFIG_USER = 'CONFIG_USER'
export const CONFIG_MESSAGE = 'CONFIG_MESSAGE'

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

export function message (data) {
    return dispatch => {
        dispatch({
            type: CONFIG_MESSAGE,
            payload: {
                type: data.type,
                data: data.message
            }
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
