import * as ActionTypes from './ActionTypes'

export const favorites = (state = [], action) => {
  switch(action.type) {
    case ActionTypes.ADD_FAVORITE:
      if(state.some(el => el === action.payload))
        return state  
      else 
        return state.concat(action.payload)
    case ActionTypes.REMOVE_FAVORITE:
      const index = state.indexOf(action.payload)
      if(index > -1) {
        let favorites = state
        favorites.splice(index, 1)
        return favorites
      } else
        return state
    default:
      return state
  }
}