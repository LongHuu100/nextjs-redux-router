import Immutable from 'immutable'
import * as ActionType from 'actions/repos'

export const initialState = Immutable.fromJS({
    isLoading: false,
    listCategory: [],
    productCategory: [],
    page_view: ''
})

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionType.GET_DATA_INIT:
            return state.set('isLoading', true)
        case ActionType.GET_ALL_CATEGORY_SUCCESS:
            return state.merge({isLoading: false,listCategory: action.payload})
        case ActionType.GET_PRODUCT_CATEGORY_SUCCESS:
            return state.merge({isLoading: false, productCategory: action.payload})
        case ActionType.GET_PAGE_VIEW:
            return state.merge({
                isLoading: false,
                page_view: action.payload
            })
        default: return state
    }
}
