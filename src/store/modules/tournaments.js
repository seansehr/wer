import * as types from '../mutation-types';
import tournaments from '../../data/tournaments';

// initial state
// shape: [{ id, quantity }]
const state = tournaments;

// actions
const actions = {
  getTournament({commit, state}, id) {
    return new Promise((resolve, reject) => {
      let tournament = state.filter(t => t.id === id)[0];
      if (tournament) {
        resolve(tournament);
      }
      else {
        reject('No tournament found.');
      }
    });
  }
};

// mutations
const mutations = {
  [types.TOURNAMENT_ADD](state, tournament) {
    let index = state.findIndex(t => t.id === tournament.id);
    if (index >= 0) {
      state[index] = tournament;
    }
    else {
      state.push(tournament);
    }
  },
  [types.MATCH_UPDATE](state, payload) {
    let rIndex;
    let mIndex;
    let tIndex = state.findIndex(t => {
      rIndex = t.rounds.findIndex(r => {
        mIndex = r.matches.findIndex(m => m.id === payload.mid);
        return mIndex >= 0;
      });

      return rIndex >= 0;
    });
    if (tIndex >= 0) {
      // TODO: Figure out a better way of searching. Most likely it's best
      // to make matches their own entity and have a reference.
      let match = state[tIndex].rounds[rIndex].matches[mIndex];
      let recordArr = payload.record.split('-');
      recordArr.forEach((val, i) => {
        if (!match.players[i]) {
          match.players.push({
            dci: 'draw',
            wins: val
          });
        }
        else {
          match.players[i].wins = val;
        }
        match.completed = true;
      });
    }
    else {
      throw 'No match found.';
    }
  }
};

export default {
  actions,
  state,
  mutations
};
