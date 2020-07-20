<template>
    <div class="inpage_container">
        <v-data-table
            :headers="agentTableHeaders"
            :items="agentList"
            :items-per-page="5"
        >
            <template v-slot:item.Photo="{ item }">
                <v-img :src="item.Photo" style="width: 50px; height: 50px" />
            </template>
        </v-data-table>
    </div>
</template>

<script>
import axios from 'axios';
import allUrl from './../../constants/allurls';
export default {
    data(){
        return {
            loggedInUser:   "admin",
            agentTableHeaders   :   [
                {
                    text: 'Agent ID',
                    align: 'start',
                    sortable: true,
                    value: 'AgentID'
                },
                {
                    text: 'First Name',
                    align: 'start',
                    sortable: false,
                    value: 'FirstName'
                },
                {
                    text: 'Last Name',
                    align: 'start',
                    sortable: false,
                    value: 'LastName'
                },
                {
                    text: 'Department Name',
                    align: 'start',
                    sortable: false,
                    value: 'Department'
                },
                {
                    text: 'Branch Name',
                    align: 'start',
                    sortable: true,
                    value: 'BranchName'
                },
                {
                    text: 'Manager ID',
                    align: 'start',
                    sortable: true,
                    value: 'ManagerID'
                },
                {
                    text: 'ContactNumber',
                    align: 'start',
                    sortable: false,
                    value: 'ContactNumber'
                },
                 {
                    text: 'Email',
                    align: 'start',
                    sortable: false,
                    value: 'Email'
                },
                {
                    text: 'City',
                    align: 'start',
                    sortable: true,
                    value: 'City'
                },
                {
                    text: 'State',
                    align: 'start',
                    sortable: true,
                    value: 'State'
                },
                {
                    text:'Photo',
                    align: 'start',
                    sortable: false,
                    value: 'Photo'
                }
                
            ],
            agentList           :   []

        }
    },
    computed:{
        agentDetailText(item){
            console.log("item",item)
         return item.FirstName + " " + item.LastName;
      }
    },
     methods:{
        
    },
    created(){
       if(!navigator.onLine){
            
            alert("You are not connected to internet.","Internet Issue")
        }else{
            axios.get(allUrl.getURL("getReportingAgentList")+'/'+this.loggedInUser)
            .then((res)=>{
                console.log(res);
                
                if(Array.isArray(res.data.data) && res.data.data.length > 0){
                    console.log("Agent list found");
                    this.agentList               =   res.data.data;
                }
                // else if(res.data && res.data.data && res.data.data){
                //         this.agentList  = [res.data.data];
                // }
                else{
                    this.agentList  = [];
                }
            }).catch((err)=>{
                console.log(err.message);
                alert(err);
            });
        }
    },
}
</script>

<style scoped>

</style>