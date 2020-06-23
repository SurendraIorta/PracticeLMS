<template>
  <v-app>

    <v-content class="bg_img">
      <!-- <createnewlead/> -->
      <createagent/>
      <!-- <agentlist/> -->
        <!-- <tabview/> -->
    </v-content>
  </v-app>
</template>

<script>
// import createnewlead from './views/createnewlead';
import createagent from './views/agentdetails/createnewagent';
// import agentlist from './views/agentdetails/agentlist';
// import tabview from './samplecodes/tabview';
  
  

export default {
  name: 'App',

  components: {
    // createnewlead,
    createagent,
    // agentlist,
    // tabview,
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