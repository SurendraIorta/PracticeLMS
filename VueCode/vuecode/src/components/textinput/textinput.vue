<template>
    <div class="container">
        <input type="text" name="tname" v-model="tdata" class="form-control" @keyup="updateParent" @change="tchanged">
    </div>
</template>
<script>
export default {
    props : ["tname","tid","tvalue","tchanged"],
    data(){
        return {
          tdata : this.tvalue
        }
    },
    methods:{
        updateParent(changedValue){
            console.log("Value changed to - "+changedValue.target.value);
            this.$emit("tupdate",changedValue.target.value);
        }
    }
}
</script>
<style scoped>

.form-control {
    border: none;
    border-bottom : solid black 2px;
    padding: 10px;
    width: 30%;
}
</style>