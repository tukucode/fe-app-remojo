const initialState = {
  value: 0,
  name: "",
};

export const reducerCounter = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_INCREMENT":
      return {
        ...state,
        value: actions.value,
      };

    case "SET_DECREMENT":
      return {
        ...state,
        value: state.value - 2,
      };

    default:
      return state;
  }
};
