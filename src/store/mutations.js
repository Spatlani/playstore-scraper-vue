export default {
  UPDATE_SNACKBAR(state, snackbarData) {
    state.snackbar = snackbarData;
  },
  CREATE_TEMP_SESSION(state, userData) {
    state.tempUser = userData;
  },
  CREATE_SESSION(state, userData) {
    state.user = userData;
  },
  UPDATE_USER_INFO(state, data) {
    if (state.userInfo) {
      state.userInfo = {
        ...state.userInfo,
        ...data,
      };
    } else {
      state.userInfo = data;
    }
  },
  UPDATE_SESSION_KEY(state, key, keyData) {
    state.user[key] = keyData;
  },
  UPDATE_TOP_APPS(state, appData) {
    state.appData = appData;
  },
  DELETE_SESSION(state) {
    state.user = null;
  },
  TOGGLE_SIDEBAR(state) {
    state.sidebarOpen = !state.sidebarOpen;
  },
};
