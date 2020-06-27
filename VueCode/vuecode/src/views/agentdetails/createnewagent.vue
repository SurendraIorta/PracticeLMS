<template>
    <div class="inpage_container">
        <v-dialog 
            v-model="dialog" 
            :persistent=true
            :hide-overlay=true
            width="550px"

        >
            <v-card>
                <v-card-title> Please make sure you have all reqquired data to create an agent. </v-card-title>
                <div class="centerbtn" style="padding: 20px;">
                 <v-btn 
                    @click="dialog = false" 
                    class="centerbtn"
                    color="success"
                 >Done</v-btn>
                </div>
            </v-card>
        </v-dialog>
        <v-form ref="form" v-model="valid" >
            <v-tabs 
                v-model="tabnum" 
                @change="changeTab"
                :centered="true"
                
            >
                <v-tab 
                v-for="tabname in tabnames"
                :key="tabname"
                >
                    {{tabname}}
                </v-tab>
            </v-tabs>    
            <v-tabs-items v-model="tabnum" style="background-color:#04818f;"><!--#04818f/0ba7b7-->
              <v-tab-item>  
                <v-text-field
                    v-model="agentDetails.FirstName"
                    :rules="allListOptions.nameRules"
                    label="First Name"
                    required
                    class="whiteback"
                ></v-text-field>

                <v-text-field
                    v-model="agentDetails.MiddleName"
                    :rules="allListOptions.nameRules"
                    label="Middle Name"
                    required
                    class="whiteback"
                ></v-text-field>

                <v-text-field
                    v-model="agentDetails.LastName"
                    :rules="allListOptions.nameRules"
                    label="Last Name"
                    required
                    class="whiteback"
                ></v-text-field>

                
                <v-radio-group v-model="agentDetails.Gender" row  class="radioback" id="radiogrp" prepend-icon="mdi-human-male-female">
                    <v-radio v-for="opt in allListOptions.genderOptions" :key="opt" :label="`${opt}`" :value="opt" ></v-radio>
                </v-radio-group>

                <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                    
                    >
                    <template v-slot:activator="{ on }">
                        
                        <v-text-field
                        v-model="dateFormatted"
                        label="Date of Birth"
                        hint="MM/DD/YYYY"
                        persistent-hint
                        @blur="date = parseDate(dateFormatted)"                    
                        v-on="on"
                        class="whiteback"
                        @change="updateAge($event)"
                        prepend-icon="mdi-calendar"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="agentDetails.DateOfBirth" no-title @input="menu1 = false" @change="updateAge($event)"></v-date-picker>
                </v-menu>

                <v-text-field
                    v-model="agentDetails.Age"
                    :counter="2"
                    :rules="allListOptions.ageRules"
                    type="number"
                    :disabled="true"
                    label="Age"
                    required
                    class="whiteback"
                ></v-text-field>

                
                <v-select
                    label="Marital Status*"
                    :items="maritalStatusList"
                    v-model="agentDetails.MaritalStatus"
                    required
                    class="whiteback"
                ></v-select>

                <v-text-field 
                    v-model="agentDetails.PanNumber"    
                    label="PAN Number"    
                    class="whiteback">


                </v-text-field>

                <div class="foottab_btns">
                    <v-btn
                    @click="tabnum = 1"
                    class="foot_btn"
                    >Next
                    </v-btn>
                </div>
                </v-tab-item>

                <v-tab-item>
                    <v-text-field
                        v-model="agentDetails.ContactNumber"
                        :counter="10"
                        :rules="allListOptions.mobileRules"
                        type="mobile"
                        label="Mobile Number"
                        required
                        class="whiteback"
                    ></v-text-field>

                    <v-text-field
                        v-model="agentDetails.OtherContactNumber"
                        :counter="10"
                        :rules="allListOptions.mobileRules"
                        type="mobile"
                        label="Other Mobile Number"
                        required
                        class="whiteback"
                    ></v-text-field>

                    <v-text-field
                        v-model="agentDetails.Email"
                        :rules="allListOptions.emailRules"
                        label="E-mail"
                        required
                        class="whiteback"
                    ></v-text-field>


                    <v-text-field
                        v-model="agentDetails.Address1"
                        :counter="20"
                        label="Address 1"
                        required
                        class="whiteback"
                    ></v-text-field>

                    <v-text-field
                        v-model="agentDetails.Address2"
                        :counter="20"
                        label="Address 2"
                        class="whiteback"
                    ></v-text-field>

                    <v-text-field
                        v-model="agentDetails.Address3"
                        :counter="20"
                        label="Address 3"
                        class="whiteback"
                    ></v-text-field>

                    <v-select 
                        label="Country"
                        :items="countryList"
                        item-text="name"
                        item-value="code"
                        v-model="agentDetails.Country"
                        required
                        class="whiteback"
                    ></v-select>

                    <v-select
                    label="State"
                        :items="stateList"
                        item-text="name"
                        item-value="code"
                        v-model="agentDetails.State"
                        required
                        class="whiteback"
                    ></v-select>

                    <v-select
                    label="City"
                        :items="cityList"
                        item-text="name"
                        item-value="code"
                        v-model="agentDetails.City"
                        required
                        class="whiteback"
                    ></v-select>
                    <div class="foottab_btns">
                        <v-btn
                        @click="tabnum = 0"
                        class="foot_btn"
                        >Previous
                        </v-btn>
                        <v-btn
                        @click="tabnum = 2"
                        class="foot_btn"
                        >Next
                        </v-btn>
                    </div>
                </v-tab-item>

                <v-tab-item>

                    <v-select
                        label="Designation"
                        :items="designationList"
                        v-model="agentDetails.Designation"
                        required
                        class="whiteback"
                    ></v-select>

                     <v-select
                        label="Branch Name"
                        :items="branchList"
                        v-model="agentDetails.BranchName"
                        required
                        class="whiteback"
                    ></v-select>

                    <v-select
                        label="Department Name"
                        :items="departmentList"
                        v-model="agentDetails.Department"
                        required
                        class="whiteback"
                    ></v-select>

                    <v-select
                        label="Manager Name"
                        :items="managerList"
                        :item-text="agentDetailText"
                        item-value="AgentID"
                        v-model="agentDetails.ManagerID"
                        required
                        class="whiteback"
                    ></v-select>

                    <div class="photo_container">
                        <v-file-input
                            v-model="userPhoto"
                            :rules="allListOptions.userPhotoRules"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Pick an photo"
                            prepend-icon="mdi-camera"
                            label="Select User Photo"
                            @change="checkSelectedUserPhoto"
                            class="whiteback"
                        ></v-file-input>

                        <v-img 
                            :src="userPhotoImg" 
                            class="whiteback"
                            v-if="userPhotoImg"
                            style="width:100px;height:100px;"
                        ></v-img>
                    </div>
                    <div class="btn_container">
                        <v-btn
                            @click="tabnum = 1"
                            class="foot_btn"
                        >Previous
                        </v-btn>
                        <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4 foot_btn"
                            @click="createNewAgent"
                        >   Submit
                        </v-btn>

                    </div>
                </v-tab-item>
            </v-tabs-items>
        </v-form>
    </div>
</template>
<script>
var axios =   require('axios');
import allListOptions from './../../constants/listOptions';
import allUrl from './../../constants/allurls';
export default {
    data(){
        return {
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            menu2: false,

            tabnum:null,
            tabnames:["Personal Info","Contact Info","Manager Selection"],

            agentDetails:{
                "AgentID"           : "A309092",
                "FirstName"         : "Manager",
                "MiddleName"        : "",
                "LastName"          : "",
                "Gender"            : "Male",
                "ContactNumber"     : "9999999999",
                "OtherContactNumber": "9930293939",
                "Email"             : "adminpem@lmspractice.in",
                "MaritalStatus"     : "",
                "PanNumber"         : "",
                "Address1"          : "Head Office",
                "Address2"          : "2nd floor, D Block",
                "Address3"          : "Parsi road",
                "City"              : "Mumbai",
                "State"             : "Maharashtra",
                "Country"           : "India",
                "BranchName"        : "HO",
                "Department"        : "HO",
                "ManagerID"         : "A309090",
                "DateOfBirth"       : null,
                "Age"               : null,
                "Photo"             : "",
                "Designation"       : "",
            },
            branchList:["Mumbai","Hyderabad"],
            departmentList:["Field","Account"],
            countryList:[{"code":1,"name":"India"}],
            stateList:[{"code":1,"name":"Telangana"}],
            cityList:[{"code":1,"name":"Hyderabad"}],
            maritalStatusList:["Single","Married"],
            designationList:["Agent","Manager"],
            managerList:[],

            dialog:false,
            valid:false,
            validBranchDepartment:false,
            userPhoto:null,
            userPhotoImg:null,
            loggedInAgent:"admin",
            allListOptions,
        }
    },
    methods:{
        createNewAgent(){
            let newAgentDeatils     =   this.agentDetails
            newAgentDeatils.Photo =   this.userPhotoImg;
            newAgentDeatils.CreatedBy =  this.loggedInAgent;
            newAgentDeatils.DateOfBirth   =   this.dateFormatted;
            console.log(this.agentDetails);

            axios.post(allUrl.getURL("createAgent"),newAgentDeatils)
            .then((res)=>{
                console.log(res);
                if(res.data.data.AgentID){
                    alert("Agent created successfully.");
                }
                this.$refs.form.reset();
            })
            .catch((err)=>{
                console.log(err);
                alert(err);
            })
            
        },
        checkSelectedUserPhoto(selectedFile){
            console.log(selectedFile);
            if(selectedFile){
                const fr = new FileReader ()
            fr.readAsDataURL(selectedFile)
            fr.addEventListener('load', () => {
                this.userPhotoImg = fr.result
                // this.imageFile = files[0] // this is an image file that can be sent to server...
            })
            } else{
                this.userPhotoImg = null;
            }         
        },
        getDepartmentOnBranch(event){
            console.log(event);
        },
        changeTab(event){
            console.log(event);
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${month}/${day}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        updateAge(event){
            this.agentDetails.Age  =   this.calculateAge(event)
        },
        calculateAge(dob){
            var dateString = dob;
            var today = new Date();
            var birthDate = new Date(dateString);
            if(today.getFullYear() <= birthDate.getFullYear() && today.getMonth() <= birthDate.getMonth() && today.getDate() <= birthDate.getDate() ){
                alert("Please Enter valid date");
                this.date_of_birth  =   new Date();
                this.dateFormatted  =   this.formatDate(new Date().toISOString().substr(0, 10));
                this.age            =   0;
            }else{
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            }
      },
      agentDetailText(item){
          return item.FirstName + " " + item.LastName + " ("+ item.AgentID +")";
      },  
    },
    created(){
        this.dialog = false;
         if(!navigator.onLine){
            alert("You are not connected to internet.","Internet Issue")
        }else{
            axios.get(allUrl.getURL("getReportingAgentList")+'/'+this.loggedInAgent)
            .then((res)=>{
                console.log(res);
                
                if(Array.isArray(res.data.data) && res.data.data.length > 0){
                    console.log("Agent list found");
                    this.managerList               =   res.data.data;
                    if(this.loggedInAgent == "admin"){
                        this.managerList.unshift({"AgentID":"admin","FirstName":"Self","LastName":""});
                    }
                }
                // else if(res.data && res.data.data && res.data.data){
                //         this.agentList  = [res.data.data];
                // }
                else{
                    this.managerList  = [];
                }
            }).catch((err)=>{
                console.log(err.message);
                alert(err);
            });
        }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
      },
    },
}
</script>
<style scoped>
.inpage_container {
    /* background: #F9FE70; */
    margin-top: 50px;
    height: 500px;
}

.diaselectbox {
    display: inline-flex;
    margin :  10px;
    margin-top :  30px;
    width: 40%;
    background: #FFFFFF;
    text-align: center;
    vertical-align: middle;
    box-shadow: #000000 5px 5px 3px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
}

.whiteback {
    display: inline-flex;
    margin :  10px;
    margin-top :  30px;
    width: 30%;
    background: #FFFFFF;
    text-align: center;
    vertical-align: middle;
    box-shadow: #000000 5px 5px 3px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
}

.radioback {
    display: inline-flex;
    margin :  10px;
    margin-top :  30px;
    padding-top: 15px;
    width: 30%;
    background: #FFFFFF;
    color: #FFFFFF;
    text-align: center;
    vertical-align: middle;
    box-shadow: #000000 5px 5px 3px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: pointer;
}

.btn_container {
    margin: 20px;
    align-items: center;
    justify-items: center;
    
}

.centerbtn {
    align-items: center;
    justify-items: center;
}

.foot_btn {
    padding: 20px;
    margin: 10px;
    width: 20%;
}

.photo_container {
    display : inline;
}

@media screen and (max-width: 480px) {
    .whiteback {
         width: 80%;
         display: flex;
    }
}

</style>
