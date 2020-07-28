<template>
     <div id="map"></div>
</template>

<script>
export default {
    data(){
        return {
            map:''
        }
    },
   
    methods:{
        initMap() {
        //   this.map = new google.maps.Map(document.getElementById("map"), {
        //     center: {
        //       lat: -34.397,
        //       lng: 150.644
        //     },
        //     zoom: 8
        //   });
        }

    },
    mounted(){
        var mapScript = document.createElement('script');  
mapScript.setAttribute('src',"https://maps.googleapis.com/maps/api/js?key='AIzaSyAu_QF7EvSQpB-m5u5ATP2xgvSauommxLw'&libraries=&v=weekly");
document.head.appendChild(mapScript);
        // this.initMap();
    }

        
      
}
</script>

<style scoped>
/* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }

      /* Optional: Makes the sample page fill the window. */
      html,
      body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
</style>