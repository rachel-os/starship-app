export const initialState = {
  loading: true,
  starships: [],
  errorMessage: null
}; 

export const starshipReducer = (state, action) => {
  switch(action.type) {
    case "SEARCH_STARSHIP_REQ":
      return{
        ...state,
        loading:true, 
        errorMessage: null
      };
    case "SEARCH_STARSHIP_SUCCESS":
      return {
        ...state,
        loading: false,
        starships: action.payload,
      }
    case "SEARCH_STARSHIP_FAIL":
      return {
        ...state,
        loading: false,
        errorMessage : action.error
      }
    default:
      return state
  }
};
