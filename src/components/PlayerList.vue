<template>
  <v-card>
    <v-card-title primary-title class='pb-0'><h5 class='mb-0'>Player List</h5></v-card-title>
    <v-card-text class='pt-0'>
      <v-list>
        <v-list-tile avatar v-for='player in players' v-bind:key='player.dci' v-bind:class='{ "grey lighten-2": !player.status }'>
          <v-list-tile-content>
            <v-list-tile-title v-text='`${player.first_name} ${player.last_name}`'></v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn small error v-bind:disabled='!player.status'>Drop</v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'PlayerList',
  props: ['players']
}
</script>
