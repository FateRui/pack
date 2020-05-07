<template>
    <div>
        <el-select v-model="value1">
            <el-option label="10" :value="10"></el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    data(){
        return {
            value1: ''
        }
    }
}
</script>