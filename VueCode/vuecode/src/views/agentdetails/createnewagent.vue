<template>
    <div class="inpage_container">
        <v-dialog 
            v-model="dialog" 
            :persistent=true
            :hide-overlay=true
            width="550px"

        >
            <v-card>
                <v-card-title> Select the Branch and Department to create an Agent. </v-card-title>
                
                <v-form v-model="validBranchDepartment" style="align-items: center;justify-items: center;">
                <v-select 
                    v-model="agentDetails.BranchName"
                    :items="branchList"
                    @change="getDepartmentOnBranch"
                    label="Branch Name"
                    class="diaselectbox"
                    required
                ></v-select>
                <v-select 
                    v-model="agentDetails.Department"
                    :items="branchList"
                    @change="getDepartmentOnBranch"
                    label="Department Name"
                    class="diaselectbox"
                    required
                ></v-select>
                
                <div class="centerbtn" style="padding: 20px;">
                 <v-btn 
                    @click="dialog = false" 
                    class="centerbtn"
                    color="success"
                    :disabled="!validBranchDepartment"
                 >Done</v-btn>
                </div>
                </v-form>
            </v-card>
        </v-dialog>
        <v-form ref="form" v-model="valid">
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

            <v-radio-group v-model="agentDetails.Gender" row  class="radioback" id="radiogrp">
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
                    ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title @input="menu1 = false" @change="updateAge($event)"></v-date-picker>
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
                ></v-img>
            </div>
            <div class="btn_container">
                <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4 centerbtn"
                    @click="createNewAgent"
                >   Submit
                </v-btn>

            </div>
        </v-form>
    </div>
</template>
<script>
var axios =   require('axios');
import allListOptions from './../../constants/listOptions';
export default {
    data(){
        return {
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            menu2: false,


            agentDetails:{
                "AgentID"           : "A309092",
                "FirstName"         : "Admin",
                "MiddleName"        : "",
                "LastName"          : "",
                "Gender"            : "",
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
            departmentList:[],
            dialog:false,
            valid:false,
            validBranchDepartment:false,
            userPhoto:null,
            userPhotoImg:null,
            
            allListOptions,
        }
    },
    methods:{
        createNewAgent(){
            var req     =   new FormData();

            req.append("name","testformdata");
            req.append("price","300");
            req.append("productImage",this.userPhoto);

            axios.post("http://localhost:3003/testcode/uploadfile",req)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
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
          this.age  =   this.calculateAge(event)
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
      }
    },
    created(){
        this.dialog = false;
    },computed: {
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

</style>
