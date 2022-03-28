<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(tag,index) in tabsList"
      :key="tag.name"
      :closable="tag.name!=='home'"
      :effect="$route.name===tag.name? 'dark':'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag,index)"
    >{{tag.label}}</el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'CommonTag',
  data() {
    return {}
  },
  computed: {
    ...mapState(['tabsList'])
  },
  methods: {
    ...mapMutations(['closeTag']),
    changeMenu(item) {
      this.$router.push({ name: item.name })
    },
    handleClose(tag, index) {
      const length = this.tabsList.length - 1
      this.closeTag(tag)
      if (tag.name !== this.$route.name) {
        //如果删掉的tag的路由与当前的路由不一致 则无需改变焦点
        return
      }
      if (index === length) {
        //如果删掉的是最右边的tag
        this.$router.push({
          name: this.tabsList[index - 1].name //焦点向左边的tag跳转
        })
      } else {
        //如果删掉的是中间的tag
        this.$router.push({
          name: this.tabsList[index].name //焦点向右边的tag跳转
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>