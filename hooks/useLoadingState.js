import { useReducer } from 'react';

// TODO maybe this should just be a loading state reducer? 
// Right now it's just an abstraction to keep this giant mound of code out of an already large component

export const loadingStateActionTypes = {
  loading: 'LOADING',
  error: 'ERROR',
  success: 'SUCCESS'
}

const initialState = {
  loading: false,
  error: false,
  success: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING': return {
      ...state,
      loading: true,
      error: false,
      success: false
    }
    case 'ERROR': return {
      ...state,
      loading: false,
      error: true,
      success: false,
    }
    case 'SUCCESS': return {
      ...state,
      loading: false,
      error: false,
      success: true
    }


    default:
      break;
  }
}

export const useLoadingState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return [state, dispatch]
}