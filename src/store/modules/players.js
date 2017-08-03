import * as types from '../mutation-types';
import players from '../../data/players';

// initial state
// shape: [{ id, quantity }]
const state = players;

// actions
const actions = {
  getPlayer({commit, state}, dci) {
    return new Promise((resolve, reject) => {
      let player = state.find(p => p.dci === dci);
      if (player) {
        resolve(player);
      }
      else {
        reject('No player found.');
      }
    });
  },
  getPlayers({dispatch, state}, ids) {
    let promises = ids.map(id => dispatch('getPlayer', id));
    return Promise.all(promises);
  }
};

// mutations
const mutations = {
  [types.PLAYER_ADD](state, player) {
    let index = state.findIndex(p => p.id === player.id);
    if (index >= 0) {
      state[index] = player;
    }
    else {
      state.push(player);
    }
  }
};

export default {
  actions,
  state,
  mutations
};
