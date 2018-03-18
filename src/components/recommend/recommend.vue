<template>
  <div class="recommend" ref="recommend">
      <scroll class="recommend-content" :data="distList">
        <div>
           <div v-if="recommends.length" class="slider-wrapper">
              <slider :autoPlay='true'>
                <div v-for="item in recommends">
                  <a :href="item.linkUrl">
                    <img class="needsclick" :src="item.picUrl" alt="暂无图片">
                  </a>
                </div>
              </slider>
           </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li class="item" v-for="(item,index) in distList" :key="index">
                <div class="icon">
                  <img width="60" height="60" :src="item.imgurl" alt="">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
       
      </scroll>
  
  </div>
</template>

<script type="text/ecmascript-6">
import { getRecommond, getDistList } from "api/recommend.js";
import { ERR_OK } from "api/config.js";
import Slider from "base/slider/slider";
import Scroll from "base/scroll/scroll";
export default {
  data() {
    return {
      recommends: [],
      distList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDistList();
  },
  methods: {
    //获取轮播图数据
    _getRecommend() {
      getRecommond().then(res => {
        // console.log(res);
        if (res.code == ERR_OK) {
          this.recommends = res.data.slider;
        }
      });
    },
    //获取推荐歌单
    _getDistList() {
      getDistList().then(res => {
        this.distList = res.data.list;
      });
    }
  },
  components: {
    Slider,
    Scroll
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>