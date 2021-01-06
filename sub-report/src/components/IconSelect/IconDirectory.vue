<!-- @author zhengjie -->
<template>
  <div class="icon-body">
    <el-input
            v-model="name"
            style="position: relative;"
            clearable
            placeholder="请输入图标名称"
            @clear="filterIcons"
            @input.native="filterIcons"
    >
      <i
              slot="suffix"
              class="el-icon-search el-input__icon"
      />
    </el-input>
    <div class="icon-list">
      <div
              v-for="(item, index) in iconList"
              :key="index"
              @click="selectedIcon(item)"
      >
        <KemSvgIcon
                :icon-class="item"
                style="height: 80px;width:80px;"
        />
        <span style="margin-left: 5px"> {{ item }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import icons from '@/assets/svg-icons/requireIcons.js'
export default {
  name: 'IconSelect',
  data() {
    return {
      name: '',
      iconList: icons
    }
  },
  methods: {
    filterIcons() {
      this.iconList = icons
      if (this.name) {
        this.iconList = this.iconList.filter(item => item.includes(this.name))
      }
    },
    selectedIcon(name) {
      this.$emit('selected', name)
      document.body.click()
    },
    reset() {
      this.name = ''
      this.iconList = icons
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;
  .icon-list {
    height: 300px;
    overflow-y: scroll;
    div {
      height: 80px;
      line-height: 80px;
      margin-bottom: 10px;
      cursor: pointer;
      width: 100%;
      float: left;
      padding: 0px 30px;
      background-color: #DFF9F9;
    }
    span {
      display: inline-block;
      vertical-align: -0.15em;
      font-size: 14px;
      fill: currentColor;
      overflow: hidden;
      padding-left: 20px;
    }
  }
}
</style>
