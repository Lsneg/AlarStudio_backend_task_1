export const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, ...action };
    default:
      return state;
  }
};
