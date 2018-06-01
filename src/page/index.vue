<template>
    <transition name="move">
        <div class="ui-index page-animate">
            <v-header></v-header>
            <vue-better-scroll class="wrapper" ref="scroll"
                :scrollbar="scrollbarObj"
                :pullDownRefresh="pullDownRefreshObj"
                :pullUpLoad="pullUpLoadObj"
                :startY="parseInt(startY)"
                @pullingDown="onPullingDown"
                @pullingUp="onPullingUp">
                <ul ref="list" class="list-content">
                    <li class="list-item" v-for="item in items" v-tap="{ methods : gotoDetail}">{{item}}</li>
                </ul>
            </vue-better-scroll>
            <router-view />
        </div>
    </transition>
</template>
<script>
    import VueBetterScroll from 'vue2-better-scroll' 
    import VHeader from '@/components/header'
    export default {
        name: 'index',
        components: { VueBetterScroll,VHeader },
        data () {
            return { 
                count : 0,
                // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
                scrollbarObj: {
                  fade: true
                },
                // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
                pullDownRefreshObj: {
                  threshold: 90,
                  stop: 40
                },
                // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
                pullUpLoadObj: {
                  threshold: 0,
                  txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                  }
                },
                startY: 0,  // 纵轴方向初始化位置
                scrollToX: 0,
                scrollToY: 0,
                scrollToTime: 700,
                items: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]
            }
        },
        mounted(){
            this.onPullingDown();
        },
        methods : {
            // 滚动到页面顶部
            scrollTo () {
                this.$refs.scroll.scrollTo(this.scrollToX, this.scrollToY, this.scrollToTime)
            },
            // 模拟数据请求
            getData () {
                var _this = this;
                return new Promise(resolve => {
                  setTimeout(() => {
                    const arr = []
                    for (let i = 0; i < 20; i++) {
                      arr.push(_this.count++)
                    }
                    resolve(arr)
                  }, 1000)
                })
            },
            onPullingDown () {
                var _this = this;
                // 模拟下拉刷新
                console.log('下拉刷新')
                _this.count = 0
                this.getData().then(res => {
                  this.items = res
                  this.$refs.scroll.forceUpdate(true)
                })
            },
            onPullingUp () {
                var _this = this;
                // 模拟上拉 加载更多数据
                console.log('上拉加载')
                this.getData().then(res => {
                  this.items = this.items.concat(res)
                  if(_this.count<50){
                    this.$refs.scroll.forceUpdate(true)
                  }else{
                    this.$refs.scroll.forceUpdate(false)
                  }
                })
            },
            gotoDetail(){
                this.$router.push("/market/detail");
            }
        }
    }
</script>
<style lang="scss"></style>
