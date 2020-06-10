<template>
  <v-app>

    <v-content>
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
