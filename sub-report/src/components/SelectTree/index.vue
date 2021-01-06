<template>
    <avue-input-tree v-bind="$attrs" v-on="evet" default-expand-all type="tree" :dic="computedOption" :placeholder="placeholder"/>
</template>

<script>



export default {
    name: 'SelectTreeServe',
    props: {
        defaultProps: {
            type: Object,
            default:()=>{
                return{
                    label: 'label',
                    value:'value'
                }
            }
        },
        clearable: {
            type: Boolean,
            default:true
        },
        // 默认参数
        defaultParams: {
            type: Object,
            default:()=>{
                return{

                }
            }
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        option:{
            type: Array,
            default:()=>{
                return []
            }
        },
    },
    data() {
        return {
            disabled: false,
            loading: false,
            list:[],
            object:{}
        }
    },
    computed:{
        evet(){
            if (this.$listeners.change) {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.$listeners.change =  (value)=>{
                    console.log(this.object)
                    this.$emit('change', value,{
                        value,
                        v:this.object[value]
                    });
                }
            }
            return this.$listeners;
        },
        computedOption(){
            const { label, value }= this.defaultProps

            let data = this.option






            let trans = (data)=> {



                data.forEach((item) => {
                    if(item.isShow === '0'){
                        item.disabled = true
                    }
                    item.label = item[label]
                    item.value =  item[value]

                    item.children && trans(item.children)
                })
            }


            trans(data)

            return data
        }
    },


}
</script>

<style scoped>

</style>
