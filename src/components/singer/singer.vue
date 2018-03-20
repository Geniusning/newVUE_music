<template>
  <div class="singer" ref="singer">
    <listview :data="singers"></listview>
  </div>
</template>

<script>
import { getSingerList } from "api/singer.js";
import { ERR_OK } from "api/config.js";
import Singer from "common/js/singer.js";
import Listview from "base/listview/listview";
const HOT_NAME = "热门";
const HOT_SINGER_LENGTH = 10;
export default {
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList().then(res => {
        // console.log(res);
        if (res.code == ERR_OK) {
          console.log(this._normalizeSinger(res.data.list));
        }
      });
    },
    //处理后台返回数据
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          item: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LENGTH) {
          map.hot.item.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          );
        }
        let key = item.Findex;
        if (!map[key]) {
          map[key] = {};
          map[key].title = key;
          map[key].item = [];
        }
        map[key].item.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        );
      });
      //为了得到有序列表，需要对返回的数据进行处理
      let hot = [];
      let ret = [];
      for (let k in map) {
        let val = map[k];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title == HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });

      return hot.concat(ret);
    }
  },
  components: {
    Listview
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
