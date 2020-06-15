<template>
  <v-app>

    <v-content class="bg_img">
      <!-- <createnewlead/> -->
      <createagent/>
    </v-content>
  </v-app>
</template>

<script>
// import createnewlead from './views/createnewlead';
import createagent from './views/agentdetails/createnewagent';
  

export default {
  name: 'App',

  components: {
    // createnewlead,
    createagent,
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
.bg_img {
  background-image: url('./assets/BG_Insurance.png');
}
</style>