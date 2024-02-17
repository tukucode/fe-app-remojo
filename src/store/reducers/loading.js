const initialState = {
  isLoading: false,
};

export const reducerLoading = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: actions.value,
      };

    default:
      return state;
  }
};
