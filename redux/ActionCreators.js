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
      throw err
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(err => dispatch(commentsFailed(err)))
}

export const commentsFailed = (err) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: err.message
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
      throw err
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(err => dispatch(dishesFailed(err)))
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (err) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: err.message
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
      throw err
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(err => dispatch(leadersFailed(err)))
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (err) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: err.message
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
      throw err
    })
    .then(response => response.json())
    .then(promotions => dispatch(addPromos(promotions)))
    .catch(err => dispatch(promosFailed(err)))
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (err) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: err.message
})

export const addPromos = (promotions) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions
})

export const postFavorite = (dishId) => (dispatch) => {
  dispatch(addFavorite(dishId))
}

export const addFavorite = (dishId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId
})

export const deleteFavorite = (dishId) => (dispatch) => {
  dispatch(removeFavorite(dishId))  
}

export const removeFavorite = (dishId) => ({
  type: ActionTypes.REMOVE_FAVORITE,
  payload: dishId
})

export const postComment = (dishId, author, rating, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    author: author,
    rating: rating,
    comment: comment,
    date: Date.now()
  }
  dispatch(addComment(newComment))
}

export const addComment = (newComment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: newComment
})