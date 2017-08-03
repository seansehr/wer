<template>
  <v-layout row wrap>
    <v-flex xs9>
      <h1>Tournaments</h1>
    </v-flex>
    <v-flex xs3>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon='search'
        label='Search'
        single-line
        hide-details
        v-model='search'
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-data-table
          v-bind:headers='headers'
          v-bind:items='tournaments'
          v-bind:search='search'
        >
        <template slot='items' scope='props'>
          <td><router-link :to='props.item.id'>{{ props.item.name }}</router-link></td>
          <td class='text-xs-right'>{{ props.item.players.length }}</td>
          <td class='text-xs-right'>{{ props.item.rounds.length }}</td>
          <td class='text-xs-right'>{{ props.item.date }}</td>
        </template>
        <template slot='pageText' scope='{ pageStart, pageStop }'>
          From {{ pageStart }} to {{ pageStop }}
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Tournaments',
  data () {
    return {
      loading: false,
      tournaments: [],
      error: null,
      search: '',
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'left'
        },
        {
          text: 'Players',
          value: 'players'
        },
        {
          text: 'Rounds',
          value: 'rounds'
        },
        {
          text: 'Started',
          value: 'started'
        },
      ]
    }
  },
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
      // TODO: Pull from server.
      this.error = null;
      this.loading = true;
      this.tournaments = this.$store.state.tournaments;
    }
  }
}
</script>
