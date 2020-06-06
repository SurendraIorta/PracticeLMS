<template>
  <v-app>

    <v-content>
      <createnewlead/>
    </v-content>
  </v-app>
</template>

<script>
import createnewlead from './views/createnewlead';

export default {
  name: 'App',

  components: {
    createnewlead,
  },

  data: () => ({
    //
  }),
};
</script>
