import * as ActionTypes from './ActionTypes'
import { baseUrl } from '../shared/baseUrl'

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(response => {
      if(response.ok) {
        return response
      } else {
        var err = new Error('Error ' + response.status + ': ' + response.statusText)
        err.response = response
        throw err
      }
    },
    err => {
      var errMess = new Error(err.message)
      throw errMess
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(err => dispatch(commentsFailed(err)))
}

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess
})

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
})

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading())

  return fetch(baseUrl + 'dishes')
    .then(response => {
      if(response.ok) {
        return response
      } else {
        var err = new Error('Error ' + response.status + ': ' + response.statusText)
        err.response = response
        throw err
      }
    },
    err => {
      var errMess = new Error(err.message)
      throw errMess
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(err => dispatch(dishesFailed(err)))
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errMess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMess
})

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
})

export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading())

  return fetch(baseUrl + 'leaders')
    .then(response => {
      if(response.ok) {
        return response
      } else {
        var err = new Error('Error ' + response.status + ': ' + response.statusText)
        err.response = response
        throw err
      }
    },
    err => {
      var errMess = new Error(err.message)
      throw errMess
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(err => dispatch(leadersFailed(err)))
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (errMess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMess
})

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
})

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading())

  return fetch(baseUrl + 'promotions')
    .then(response => {
      if(response.ok) {
        return response
      } else {
        var err = new Error('Error ' + response.status + ': ' + response.statusText)
        err.response = response
        throw err
      }
    },
    err => {
      var errMess = new Error(err.message)
      throw errMess
    })
    .then(response => response.json())
    .then(promotions => dispatch(addPromos(promotions)))
    .catch(err => dispatch(promosFailed(err)))
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errMess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMess
})

export const addPromos = (promotions) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions
})