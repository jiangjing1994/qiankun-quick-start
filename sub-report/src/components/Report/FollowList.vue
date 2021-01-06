<template>
    <div>
        <div style="text-align: right;margin-bottom: 15px">
            <KemButton @click="save">保存</KemButton>
        </div>
        <KemCheckboxGroup :options="options" v-model="value"></KemCheckboxGroup>

    </div>

</template>
<script>
import {mapState} from 'vuex'

export default {
    props:['followList'],
    computed: {
        ...mapState({
            layout: state => state.app.layout,
            id: state => state.app.id,

        }),
        options() {
            return this.layout.map(item => {
                return {
                    label: item?.chart_settings?.title?.text || item.i,
                    value: item.i + ''
                }
            })
        }
    },
    data() {
        return {
            checkAll: false,
            value: [],
            /* options: [
                 {label:'北京', value:'beijing'},
                 {label:'北京2', value:'beijing2'},
             ],*/
        };
    },
    created(){

        this.value = this.followList

    },

    methods: {
        save(){
            const {userId} = this.$store.state.report.postMessageData

            this.$api.SAVE_USERFOLLOW({
                userId:userId || '123',
                userPage:this.id + '' || 'userPage',
                userFollow:this.value + ''
            }).then((res) => {
                this.$emit('saveSuccess')
            })
        }

    }
};
</script>
