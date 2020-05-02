
import { post } from 'libs/request'
import { api, SUCCESS } from 'config'

export const GET_DATA_INIT = Symbol('GET_DATA_INIT')
export const GET_PAGE_VIEW = Symbol('GET_PAGE_VIEW')
export const GET_ALL_CATEGORY_SUCCESS = Symbol('GET_ALL_CATEGORY_SUCCESS')

export function listCategory () {
    return dispatch => {
        dispatch({type: GET_DATA_INIT})
        return post(api.page_cate_list, null).then(res => {
            if(res.errorCode == SUCCESS) {
                dispatch({ type: GET_ALL_CATEGORY_SUCCESS, payload: res.data })
            }
        })
    }
}

export function getPage (slug) {
    return dispatch => {
        dispatch({ type: GET_DATA_INIT})
        return fetch(api.page_view, {slug: slug}).then(res => {
            if(res.errorCode == SUCCESS) {
                dispatch({ type: GET_PAGE_VIEW, payload: res.data })
            }
        })
    }
}
