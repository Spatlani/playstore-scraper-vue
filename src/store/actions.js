import Vue from 'vue';
// import router from '../router';
// import jwtDecode from 'jwt-decode';

export default {
  updateSnackbar({ commit }, snackbarData) {
    commit('UPDATE_SNACKBAR', snackbarData);
  },
  updateFormat({ commit }, formatData) {
    commit('UPDATE_FORMAT', formatData);
  },
  createTempSession({ commit }, userData) {
    commit('CREATE_TEMP_SESSION', userData);
  },
  createSession({ commit }, userData) {
    localStorage.setItem('PS11_USER', JSON.stringify(userData));
    commit('CREATE_SESSION', userData);
  },
  updateUserInfo({ commit }, data) {
    commit('UPDATE_USER_INFO', data);
  },
  deleteSession({ commit }) {
    localStorage.removeItem('PS11_USER');
    commit('DELETE_SESSION');
  },
  updateSessionKey({ commit }, key, keyData) {
    commit('UPDATE_SESSION_KEY', key, keyData);
  },
  updateTopApps({ commit }, appData) {
    commit('UPDATE_TOP_APPS', appData);
  },
  refreshToken({ commit }) {
    Vue.axios.post(`${process.env.VUE_APP_API_URL}refreshToken`, {
      token: this.state.user.access_token,
    }).then((response) => {
      if (response.data) {
        commit('UPDATE_SESSION_KEY', 'access_token', response.data.token);
      }
    }, () => {
      localStorage.removeItem('PS11_USER');
      commit('DELETE_SESSION');
    });
  },
  // inspectToken({ commit }) {
  //   const token = this.state.user.access_token;
  //   if (token) {
  //     const decoded = jwtDecode(token);
  //     const exp = decoded.exp;
  //     const origIat = decoded.orig_iat;
  //     if ((Date.now() / 1000) > exp) {
  //       localStorage.removeItem('PS11_USER');
  //       commit('DELETE_SESSION');
  //     } else if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - origIat < 628200) {
  //       this.dispatch('refreshToken');
  //     } else if (exp - (Date.now() / 1000) < 1800) {
  //       // DO NOTHING, DO NOT REFRESH
  //     } else {
  //       // localStorage.removeItem('PS11_USER');
  //       // commit('DELETE_SESSION');
  //     }
  //   }
  // },
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR');
  },
};
