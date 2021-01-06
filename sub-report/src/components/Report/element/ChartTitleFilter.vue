<template>
    <div>
        <el-button-group  v-if="parameter.defaultType === 'button'">
            <el-button v-for="(option, index) in optionsComputed"
                       :key="index"
                       size="mini" type="default" @click="setValue(option.value)">
                {{option.label}}
            </el-button>
        </el-button-group>
        <el-radio-group size="mini" v-model="parameter.value" v-if="parameter.defaultType === 'radio'">
            <el-radio-button  v-for="(option, index) in optionsComputed" :key="index"
                              :label="option.value">{{option.label}}
            </el-radio-button>

        </el-radio-group>
        <el-select v-if="parameter.defaultType === 'select'" size="mini" v-model="parameter.value" style="width: 80px;">
            <el-option v-for="(option, index) in optionsComputed" :key="index" :label="option.label" :value="option.value"></el-option>
        </el-select>
    </div>
</template>
<script>
    export default {
        props:['parameter'],
        methods: {
            setValue(val){
                this.parameter.value = val
            }
        },
        computed: {
            optionsComputed() {
                try {
                    let options = this.parameter.options.split(',')
                    let optionsLabel = this.parameter.optionsLabel.split(',')

                    return options.map((item,index)=>{
                        return{
                            value:item,
                            label:optionsLabel[index]
                        }
                    })
                }catch (e) {
                    return []
                }

            }
        },
    }
</script>
