<template>
  <div class="flow__body"  :style="`background-color: ${backgroundColor};`" >
    <Flow :height="600" :width="1200" ref="flow" :option="option" v-model="form"  >
      <div class="flow-content" :style="`border: 2px ${color} solid`" slot-scope="scope">
        <div  class="title" :style="`background-color: ${color};`">{{scope.node.name}}</div>
        <div  class="content" v-if="scope.node.list">
          <span v-for="(item,key) in scope.node.list" :style="`border-left: 2px solid ${key===0?'#fff':'#7e7e7e'};display: inline-block;padding: 0 5px;color: ${item.color};`" :key="key">{{item.value}}</span>
        </div>
      </div>
    </Flow>
  </div>

</template>

<script>
import Flow from '@/components/Flow/Flow'

export default {

  components:{
    Flow
  },
  data() {

    return {

      count: 0,
      form: '',
      option: {
        "name":"流程",
        "nodeList":[
          {
            "id":"nodeA",
            "name":"节点A",
            "left":10,
            "top":10,
            "list":[
              {
                "value":"234",
                "color":"red"
              },
              {
                "value":"232",
                "color":"blue"
              }
            ]
          },
          {
            "id":"nodeB",
            "name":"节点B",
            "left":180,
            "top":10,
            "list":[
              {
                "value":"上一版本",
                "color":"red"
              },
              {
                "value":"下一版本",
                "color":"blue"
              }
            ]
          },
          {
            "id":"nodeC",
            "name":"节点C",
            "left":391,
            "top":10,
            "list":[
              {
                "value":"上一版本",
                "color":"red"
              },
              {
                "value":"下一版本",
                "color":"blue"
              }
            ]
          },
          {
            "id":"nodeD",
            "name":"节点D",
            "left":603,
            "top":10,
            "list":[
              {
                "value":"需求上架"
              }
            ]
          }
        ],
        "lineList":[
          {
            "from":"nodeA",
            "to":"nodeB"
          },
          {
            "from":"nodeB",
            "to":"nodeC"
          },
          {
            "from":"nodeC",
            "to":"nodeD"
          }
        ]
      }
    }

  },
  props: {
    color: {
      type: String,
      default: 'red'
    },
    backgroundColor: {
      type: String,
      default: 'rgba(255, 233, 27, 0)'
    },
  },
}
</script>

<style lang="scss">
.flow__body {
  background-color: rgba(255, 233, 27, 0.26);
  width: 100%;
  height: 100%;
  overflow: hidden;
  .avue-grid{
    display: none;
  }
  .flow-content{
    height: 100%;
    width: 100%;


    .title{
      padding: 5px;
      text-align: center;
      color: #030303;
      font-weight: bold;

    }
    .content{
      padding:5px;
      text-align: center;
      font-weight: bold;

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
