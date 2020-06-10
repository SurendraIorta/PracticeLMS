<template>
    <div class="inpage_container">
        <v-form ref="form" v-model="valid">
            <div class="photo_container">
                <v-file-input
                    v-model="userPhoto"
                    :rules="userPhotoRules"
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
export default {
    data(){
        return {
            valid:false,
            userPhoto:null,
            userPhotoImg:null,
            userPhotoRules: [
                value => !value || value.size < 2000000 || 'UserPhoto size should be less than 2 MB!',
                v=> v && v.type.includes("image") || "Please select an image file!",
            ],
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
    }
}
</script>
<style scoped>
.inpage_container {
    /* background: #F9FE70; */
    margin-top: 50px;
    height: 500px;
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
