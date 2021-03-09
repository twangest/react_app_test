export const tokenSelector = (state) => localStorage.getItem("token") || null;
export const authUserNameSelector = (state) => state.auth.username;
export const authPasswordSelector = (state) => state.auth.password;
export const authLoadingSelector = (state) => state.auth.loading;
export const authErrorSelector = (state) => state.auth.error;
