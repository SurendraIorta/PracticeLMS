<template>
  <v-app>

    <v-content class="bg_img">
      <!-- <createnewlead/> -->
      <createagent/>
        <!-- <tabview/> -->
    </v-content>
  </v-app>
</template>

<script>
// import createnewlead from './views/createnewlead';
import createagent from './views/agentdetails/createnewagent';
// import tabview from './samplecodes/tabview';
  
  

export default {
  name: 'App',

  components: {
    // createnewlead,
    createagent,
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