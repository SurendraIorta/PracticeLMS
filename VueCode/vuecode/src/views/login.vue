<template>
    <div class="inpage_container">
        <div class="page_title">
            <div class="title">Agent Login</div>
        </div>
        <div class="row">
            <v-text-field v-model="username" label="Username"></v-text-field>
        </div>
        <div class="row">
            <v-text-field  v-model="password"  label="Password"   type="password"></v-text-field>
        </div>
        <div class="btn_row">  
            <v-btn color="primary"  class="mybtn"  :width="200" :x-large="true"  @click="checkLogin($event)">Login</v-btn>
            <v-btn color="secondary" class="mybtn"  :x-large="true"  @click="forgotPassword($event)">Forgot Password</v-btn>
        </div>
    </div>
</template>

<script>
const axios     = require('axios').default;
const allUrls   = require('../constants/allurls');
export default {
    data(){
        return {
            username   :   "",
            password    :   ""
        }
    },
    methods : {
        checkLogin(event){
            console.log(this.username + this.password);
            console.log(event);
            axios.post(allUrls.getURL('agentLogin'),{
                "AgentID"  : this.username,
                "Password" : this.password
            }).then((res)=>{
                console.log(res);
            }).catch((err)=>{
                console.log(err);
            })
        },
        forgotPassword(event){
            console.log(event);
        }
    }
}
</script>

<style scoped>
.inpage_container {
    margin: 25%;
    margin-top     :   200px;
    width: 50%;
    padding: 15px;
    border: 2px solid #FFFFFF;
    border-radius: 5px;
    background: #FFFFFF;
    }

.row  {
    
    padding: 15px;
    background: #FFFFFF;
}
.v-application .title {
    font-size: xx-large !important;
    text-align: center;
    
    padding: 5px;
    color: cadetblue;
}
.btn_row {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.mybtn {
    margin  :10px;
}
</style>