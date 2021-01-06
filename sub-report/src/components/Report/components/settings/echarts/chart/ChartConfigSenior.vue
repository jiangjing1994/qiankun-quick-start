<template>

    <div class="tab-main-form">


        <el-form class="aside-form" label-position="left" label-width="80px" :model="chart.chart_settings" v-if="chart && chart.chart_senior">

            <el-form-item label="复制本图">
                <KemButton type="icon.edit" @click="copyChart"></KemButton>
            </el-form-item>
            <el-form-item label="是否开启下钻">
                <el-switch v-model="chart.chart_senior.open"></el-switch>
            </el-form-item>
            <el-form-item label="下钻图表类型" >
                <div style="margin-top: 10px">
                    <SelectTree v-model="a" :option="menuData"></SelectTree>
                    <kem-button type="success" icon="el-icon-plus" @click="appendSettingSenior" circle/>
                </div>

                <ChartSeniorList>

                </ChartSeniorList>
                <!--                <el-popover-->
                <!--                        v-if="!chart.chart_senior.chart_type"-->
                <!--                        placement="bottom"-->
                <!--                        width="250"-->
                <!--                        v-model="popovervisible"-->
                <!--                        trigger="click">-->
                <!--                    <SelectTree v-model="chart.chart_senior.chart_type" :option="menuData"></SelectTree>-->

                <!--                    <div style="text-align: center;margin-top: 10px">-->
                <!--                        <kem-button type="success" icon="el-icon-plus" @click="addChartSenior" circle/>-->
                <!--                    </div>-->

                <!--                    <kem-button slot="reference" style="margin-right: 10px">添加</kem-button>-->
                <!--                </el-popover>-->
<!--                <div style="margin-top: 10px">-->
<!--                    <SelectTree v-model="chart.chart_senior.chart_type" :option="menuData"></SelectTree>-->
<!--                </div>-->
<!--                <div style="margin-top: 10px">-->
<!--                    <kem-button type="success" icon="el-icon-plus" @click="addChartSenior" circle/>-->
<!--                    <kem-button @click="editChartSenior" icon="el-icon-edit" circle/>-->
<!--                    <kem-button @click="deleteChartSenior" icon="el-icon-delete" type="danger" circle/>-->
<!--                </div>-->




            </el-form-item>

        </el-form>
    </div>


</template>

<script>
 import {menuData} from '@/components/Report/menu/menuConfig'
import SelectTree from '@/components/SelectTree/index.vue'
import ChartSeniorList from './ChartSeniorList'
export default {
    name: "ChartConfigSenior",
    components:{
        ChartSeniorList,
         SelectTree
    },
    props: ['chart'],
    data() {
        return {
            a:'',
            //chart_type:'',
            visible: false,
            popovervisible: false,
            defaultProps: {
                children: 'children',
                label: 'label',
                id: 'value'
            },
            menuData
        }
    },


    methods: {
        //复制
        copyChart(){
            this.$store.dispatch('app/copyChart',{item:this.chart})
        },

        appendSettingSenior(){
            const chart_type = this.a

            this.$store.dispatch('element/appendSettingSenior',{chart_type}).then((state)=>{
                this.$store.commit('app/UPDATA_LAYOUT_ITEM',state)
            })
        },



    },
}
</script>

<style scoped>

</style>
