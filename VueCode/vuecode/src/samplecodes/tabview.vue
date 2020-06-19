<template>
    <div >
        <v-tabs
            v-model="tab"

        >
            <v-tab
                v-for="item in items"
                :key="item"
            >
                {{ item }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item
               
            >
                <v-card
                color="basil"
                flat
                >
                <v-card-text>One</v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item
              
            >
                <v-card
                color="basil"
                flat
                >
                <v-card-text>Two</v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item
              
            >
                <v-card
                color="basil"
                flat
                >
                <v-card-text>Three</v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
        

    </div>
</template>

<script>
export default {
    data () {
      return {
        tab: null,
        items: [
          'Appetizers', 'Entrees', 'Deserts', 'Cocktails',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
}
</script>