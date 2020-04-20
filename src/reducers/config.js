import Immutable from 'immutable'
import * as ActionType from 'actions/config'

export const initialState = Immutable.fromJS({
    route: null,
    user:null,
    message: {
        type: 'success',
        data: null
    }
})

export default function (state = initialState, action) {
    switch (action.type) {
        case ActionType.CONFIG_ROUTE:
            return state.set('route', action.payload)
        case ActionType.CONFIG_MESSAGE:
            return state.set('message', action.payload)
        default:
            return state
    }
}
