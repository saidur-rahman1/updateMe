const UserReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_START":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "LOGIN_SUCCESS":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        return {
          user: null,
          isFetching: false,
          error: true,
        };
      case "UPDATE_PLATFORMS":
        return {
          ...state,
          user: action.payload
        };
      case "UPDATE_USER":
        return {
          ...state,
          user: action.payload
        };
      case "SEARCH":
        return {
          ...state,
          user: action.payload
        };
      default:
        return state;
    }
  };
  
  export default UserReducer;