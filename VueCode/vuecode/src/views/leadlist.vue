<template>
    <div class="inpage_container">
        <div class="btn_group">
            <div class="in_btn">Status</div>
            <div class="in_btn">Open</div>
            <div class="in_btn">Converted</div>
        </div>
        <v-card
        class="mx-auto"
        max-width="400"
        tile
        >
            <v-list>
                <v-list-item-group v-model="leadList" color="primary">
                    <v-list-item
                        v-for="(item, i) in leadList"
                        :key="i"
                    >
                        <div > {{item.LeadID}} </div>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-card>
    </div>
</template>

<script>
var axios       =   require('axios');
export default {
    data(){
        return {
            leadList : []
        }
    }, 
    created(){
        axios.post('http://localhost:3003/leaddetails/getleadlist',{
            "agentCode":"A309090"
        }).then((leadList)=>{
            console.log(leadList);
            if(leadList.data.data.length > 0){
                this.leadList   =   leadList.data.data;
            }else{
                alert(leadList.data.message);
            }
        })
    }
}
</script>

<style scoped>
.inpage_container {
    /* background: #F9FE70; */
    
    height: 500px;
}

.btn_group {
    margin: 30px;
    padding: 30px;
    display: flex;
}
.in_btn {
    margin :  10px;
    margin-top :  30px;
    padding: 20px;
    width: 90px;
    height: 90px; 
    background: #FFFFFF;
    text-align: center;
    vertical-align: middle;
    box-shadow: #000000 5px 5px 3px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
}

</style>

