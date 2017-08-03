<template>
  <tr v-bind:class='{ "grey lighten-2": completed }'>
    <td class='text-xs-left' v-for='player in players' v-if='player.dci != "draw"'>{{ getPlayerName(player.dci) }}</td>
    <td>
      <v-btn-toggle v-bind:items='reportingToggles' v-model='result'></v-btn-toggle>
    </td>
    <td class='text-xs-right pt-0'>
      <v-text-field
        class='text-xs-right'
        slot='input'
        label='Record'
        v-model='result'
        single-line
      ></v-text-field>
    </td>
  </tr>
</template>

<script>
import {MATCH_UPDATE as matchUpdate} from '../store/mutation-types';

export default {
  name: 'match',
  data () {
    return {
      reportingToggles: [
        {text: '2-0', value: '2-0-0'},
        {text: '2-1', value: '2-1-0'},
        {text: '1-2', value: '1-2-0'},
        {text: '0-2', value: '0-2-0'}
      ],
      headers: [
        {text: 'Player 1', value: 'player1', align: 'left'},
        {text: 'Player 2', value: 'player2', align: 'left'},
        {text: 'Record', value: 'record', sortable: false}
      ]
    }
  },
  computed: {
    result: {
      get () {
        let result = this.players.map(p => p.wins);
        if (result.length === 2) {
          result.push(0);
        }
        return result.join('-');
      },
      set (record) {
        console.log(record);
        this.$store.commit(matchUpdate, {
          record,
          mid: this.id
        });
      }
    }
  },
  props: ['id', 'completed', 'players', 'playerList'],
  methods: {
    getPlayerName (dci) {
      let player = this.playerList.find(p => p.dci === dci);
      return player ? `${player.first_name} ${player.last_name}` : 'No Player Found';
    }
  }
}
</script>
