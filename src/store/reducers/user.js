const initialState = {
  token: localStorage.getItem("token") || null,
};

export const reducerUser = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: actions.value,
      };

    default:
      return state;
  }
};
