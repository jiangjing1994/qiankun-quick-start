<template>
    <div class="flow__body-main"  :style="`background-color: ${backgroundColor};`" >
        <Flow height="100%" width="100%" ref="flow" :option="option" v-model="form"  >
            <div class="flow-content" :stsssyle="`border: 2px ${color} solid`" slot-scope="scope">
                <KemSvgIcon style="width: 100%;height: 100%" icon-class="hunan-013">{{scope}}</KemSvgIcon>
                <div  class="title" :style="`color: ${color};`">{{scope.node.name}}</div>
                <div  class="content" v-if="scope.node.list">
                    <span v-for="(item,key) in scope.node.list" :style="`border-left: 0px solid ${key===0?'transparent':'#7e7e7e'};display: inline-block;color: ${item.color};`" :key="key">
                       <a :href="item.link"><span style="color: rgba(140, 210, 251, 1);padding: 0 3px" v-if="key!==0"> /</span>{{itemValue(item.value)}} </a>
                    </span>
                </div>
            </div>
        </Flow>
    </div>

</template>

<script>
import Flow from '@/components/Flow/Flow'
import {get} from 'lodash'
export default {

    components:{
        Flow
    },
    data() {

        return {

            count: 0,
            form: '',
        }

    },
    props: {

        option: {
            type: Object,
            required: true
        },
        chartData: {
            type: Array,
            required: true
        },

    },
    methods: {
        itemValue(value) {
             const result =  get(this.chartData,value)
            return result===0 || result? result : value

        }
    },
    computed: {
        color() {
            return this.option?.color || 'red';
        },
        backgroundColor() {
            return this.option?.backgroundColor || 'rgba(255, 233, 27, 0)';
        }
    },
}
</script>

<style lang="scss">
.flow__body-main {
     width: 100%;
    height: 100%;
    overflow: hidden;
    .avue-grid{
        display: none;
    }
    .flow-content{
        height: 60px;
        width: 120px;
        position: relative;
        // background-color: red;


        .title{
            padding: 5px;
            text-align: center;
            color: #030303;
            font-weight: bold;
            position: absolute;
            width: 100%;
            top: 10px;

        }
        .content{
            position: absolute;
            width: 100%;
            top: 30px;
            padding:5px;
            text-align: center;
            font-weight: bold;
            font-size: 12px;

        }


    }

    .kem-node{
        /* width: auto!important;
         height: auto;*/
        min-width: 100px;
        border-radius:0px;
        .kem-node-header{
            display: none;
            background-color: transparent;
        }
    }
}
</style>
