import {addAttempt, getAttempts, deleteAttempts, getNumberOfAllAttempts} from "../services/api";

export const fetchAddAttempts = (attempt) => {
    return function (dispatch) {
        addAttempt(attempt)
        .then((attempt) => {
            return attempt})
        .catch((error) => {
            dispatch({
                type: 'ADD_ERROR',
                payload: error.message
            })
        })
        .then(data => {
            if (data.status === 200) {
                dispatch({
                    type: 'ADD_ATTEMPTS',
                    payload: data.data
                })
            } else {
                dispatch({
                    type: 'ADD_ERROR',
                    payload: data.message
                })
            }
        })
        .catch((error) => {console.log(error)})
    }
}

export const fetchGetAttempts = (page, size) => {
    return function (dispatch) {
        getAttempts(page, size)
        .then((attempts) => {
            return attempts})
        .catch((error) => {
            dispatch({
                type: 'ADD_ERROR',
                payload: error.message
            })
        })
        .then(data => {
            if (data.status === 200) {
                dispatch({
                    type: 'SET_ATTEMPTS',
                    payload: data.data
                })
            } else {
                dispatch({
                    type: 'ADD_ERROR',
                    payload: data.message
                })
            }
        })
    }
}

export const fetchDeleteAttempts = () => {
    return function (dispatch) {
        deleteAttempts()
        .then((attempts) => {
            return attempts})
        .catch((error) => {
            dispatch({
                type: 'ADD_ERROR',
                payload: error.message
            })
        })
        .then(data => {
            if (data.status === 200) {
                dispatch({
                    type: 'DELETE_ATTEMPTS',
                })
            } else {
                dispatch({
                    type: 'ADD_ERROR',
                    payload: data.message
                })
            }
        })
    }
}


export const setX = (x) => {
    return {
        type: 'SET_X',
        payload: x,
    }
}

export const setY = (y) => {
    return {
        type: 'SET_Y',
        payload: y,
    }
}

export const setR = (r) => {
    return {
        type: 'SET_R',
        payload: r,
    }
}

export const setErrorY = (errorY) => {
    return {
        type: 'SET_ERROR_Y',
        payload: errorY,
    }
}

export const fetchGetNumberOfAllAttempts = () => {
    return function (dispatch) {
        const tokenString = localStorage.getItem('token');
        getNumberOfAllAttempts(tokenString)
        .then((number) => {
            return number})
        .catch((error) => {
            dispatch({
                type: 'ADD_ERROR',
                payload: error.message
            })
        })
        .then(data => {
            if (data.status === 200) {
                dispatch({
                    type: 'SET_NUMBER_OF_ATTEMPTS',
                    payload: data.data
                })
            } else {
                dispatch({
                    type: 'ADD_ERROR',
                    payload: data.message
                })
            }
        })
    }
}