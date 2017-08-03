<template>
  <div>
  <v-data-table
      v-bind:items='matches'
      v-bind:headers='headers'
    >
    <template slot='items' scope='props'>
      <match
        v-bind:id='props.item.id'
        v-bind:completed='props.item.completed'
        v-bind:players='props.item.players'
        v-bind:playerList='players'>
      </match>
    </template>
    <template slot='pageText' scope='{ pageStart, pageStop }'>
      From {{ pageStart }} to {{ pageStop }}
    </template>
  </v-data-table>
</div>
</template>

<script>
import Match from './Match.vue';

export default {
  name: 'round',
  data () {
    return {
      headers: [
        {text: 'Player 1', value: 'player1', align: 'left'},
        {text: 'Player 2', value: 'player2', align: 'left'},
        {text: 'Record', value: 'record', sortable: false}
      ]
    }
  },
  props: ['matches', 'players'],
  components: {Match},
}
</script>
