<template>
  <v-layout row wrap>
    <v-flex xs12>
      <h1>{{ title }}</h1>
    </v-flex>
    <v-flex xs9>
      <v-tabs dark v-model='active'>
        <v-tabs-bar slot='activators' class='cyan'>
          <v-tabs-slider class='yellow'></v-tabs-slider>
          <v-tabs-item
            v-for='round in rounds'
            :key='round.id'
            :href='"#tab-" + round.id'
          >
            Round {{ round.id }}
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content
          v-for='round in rounds'
          :key='round.id'
          :id='"tab-" + round.id'
        >
          <round v-bind:matches='round.matches' v-bind:players='players'>
          </round>
        </v-tabs-content>
      </v-tabs>
    </v-flex>
    <v-flex xs3>
      <player-list v-bind:players='players'>
      </player-list>
    </v-flex>
  </v-layout>
</template>

<script>
import PlayerList from './PlayerList.vue';
import Round from './Round.vue';

export default {
  name: 'Tournament',
  data () {
    return {
      active: null,
      loading: false,
      title: 'Loading',
      players: [],
      rounds: [],
      error: null,
    }
  },
  components: {Round, PlayerList},
  props: ['id'],
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = null;
      this.players = [];
      this.loading = true;

      this.$store.dispatch('getTournament', this.id).then(tournament => {
        let players = tournament.players;
        let playerIds = players.map(p => p.dci);
        this.$store.dispatch('getPlayers', playerIds).then(playerData => {
          this.players = players.map(p => {
            return Object.assign({}, p, playerData.find(i => i.dci === p.dci));
          }).sort((a, b) => {
            let la = a.last_name.toUpperCase();
            let lb = b.last_name.toUpperCase();
            if (la < lb) return -1;
            if (la > lb) return 1;

            let fa = a.first_name.toUpperCase();
            let fb = b.first_name.toUpperCase();
            if (fa < fb) return -1;
            if (fa > fb) return 1;
            return 0;
          });
          this.rounds = tournament.rounds.sort((a, b) => b.id - a.id);
          this.title = tournament.name;
          this.load = false;
        }).catch(e => {
          this.error = e;
        });
      });
    }
  }
}
</script>
