const defaultState = {
    attempts: [],
    numberOfAllAttempts: 0,
    x: 0,
    y: 0,
    r: 2,
    errorY: true,
    errorMessage: ''
}

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i < a.length; ++i) {
        for(var j=i+1; j < a.length; ++j) {
            if(a[i].id === a[j].id)
                a.splice(j--, 1);
        }
    }
    return a;
}

export const attemptReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_ATTEMPTS':
        let prevLength = state.attempts.length;
        let newArr = arrayUnique(state.attempts.concat(action.payload))
        let differentLength = newArr.length - prevLength
        if (action.payload !== undefined) {
        return {
            ...state,
            attempts: newArr,
            numberOfAllAttempts: state.numberOfAllAttempts + differentLength,
            errorMessage: ''
        }
        } else {
            return state
        }
    case 'GET_ATTEMPTS':
        return {
            ...state,
            errorMessage: ''
        }
    case 'SET_ATTEMPTS':
        return {
            ...state,
            attempts: action.payload,
            errorMessage: ''
        }
    case 'SET_X':
        return {
            ...state,
            x: action.payload
        }
    case 'SET_Y':
        return {
            ...state,
            y: action.payload
        }
    case 'SET_R':
        return {
            ...state,
            r: action.payload
        }
    case 'SET_ERROR_Y':
        return {
            ...state,
            errorY: action.payload
        }
    case 'ADD_ERROR':
        return {
            ...state,
            errorMessage: action.payload
        }
    case 'DELETE_ATTEMPTS':
        return {
            ...state,
            attempts: [],
            numberOfAllAttempts: 0,
            errorMessage: ''
        }
    case 'SET_NUMBER_OF_ATTEMPTS':
        return {
            ...state,
            numberOfAllAttempts: action.payload
        }
    default:
        return state
  }
}
