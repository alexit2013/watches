<template>
  <div id="have-account">
    <!-- <h3>已结算</h3> -->
    <div class="stockSearch">
      <!-- 型号：模糊查找    品牌：全匹配 -->
      <el-input placeholder="可输入品牌、型号、机芯号进行搜索" class="input-search" prefix-icon="el-icon-search" v-model="keyword"
        @input="stockInSearch" @focus="pageSel"></el-input>
    </div>
    <div v-show="haveAccountList.length == 0" ref="hello" style="text-align: center;">
      <p>数据加载中...</p>
    </div>
    <div v-if="haveAccountList.length !== 0">
      <div style="margin-left: 20px;">
        <p style="font-size: 20px;">{{'商品数量:  ' + ' ' + totalNum}}</p>
      </div>
      <div v-for="(item,index) of haveAccountList" :key="index">
        <table>
          <tr>
            <th>图片</th>
            <th>型号</th>
            <th>机芯号</th>
            <th>采购价</th>
            <th>销售价</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) of items.watch" :key="index">
            <td class="first-td">
              <img v-image-preview
                :src="item.buy_watchpics == null || item.buy_watchpics == '' ? '' : img + '/img/watch/'+ item.buy_watchpics.split('|')[0]"
                class="first-img" />
            </td>
            <td>{{item.buy_watchmodel}}</td>
            <td>{{item.buy_watchsn}}</td>
            <td>{{item.buy_watchcurrency + ' ' + formatNumberRgx(item.buy_watchprice)}}</td>
            <td>{{item.sell_state == 0 ? '未销售' : item.sell_currency + ' ' + formatNumberRgx(item.sell_money)}}</td>
            <td class="last-td">
              <el-button type="text">查看结算单详情</el-button>
            </td>
          </tr>
        </table>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        page: 1,
        pagenum: 10,
        keyword: '',
        total: 0,
        totalNum: 0,
        haveAccountList: [],

      }
    },
    created() {
      this.getHaveAccountList();
    },
    methods: {
      pageSel() {
        this.page = 1;
      },
      // 模糊搜索
      stockInSearch() {
        if (this.keyword !== '') {
          this.haveAccountList = [];
          this.total = 0;
          this.totalNum = 0;
          this.$axios
            .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
              page: this.page,
              pagenum: this.pagenum,
              type: 5,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取已结算商品列表");
              console.log(res);
              this.haveAccountList = res.data.orders;
              this.total = res.data.total;
              this.totalNum = res.data.watchtotal;
              if (this.haveAccountList.length == 0) {
                this.$refs.hello.innerText = '啊哦~暂无数据'
              }
            });
        }
        if (this.keyword == '') {
          this.page = 1;
          this.haveAccountList = [];
          this.total = 0;
          this.totalNum = 0;
          this.getHaveAccountList();
        }
      },
      // 获取待结算商品
      getHaveAccountList() {
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderListEx', {
          page: this.page,
          pagenum: this.pagenum,
          type: 5
        }).then((res) => {
          console.log('已结算商品列表');
          console.log(res);
          this.haveAccountList = res.data.orders;
          this.total = res.data.total;
          this.totalNum = res.data.watchtotal;
          if (this.haveAccountList.length == 0) {
            this.$refs.hello.innerText = '啊哦~暂无数据'
          }
        }).catch((err) => {
          console.log(err);
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .stockSearch {
    width: 50%;
    margin: 30px auto;

    .el-input__inner {
      width: 100%;
      height: 48px;
      margin: 0 auto;
      -webkit-appearance: none;
      background-color: #fff;
      background-image: url("../../assets/imgs/search2.png");
      background-size: 20px;
      background-repeat: no-repeat;
      background-position: 30px center;
      border-radius: 30px;
      border: 1px solid #dcdfe6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      line-height: 40px;
      outline: 0;
      padding: 0 65px;
      -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }

  .first-td {
    padding: 30px;
    padding-left: 0;
    padding-right: 0;
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;

    .first-img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 30px;
    }
  }

  .last-td {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0 20px;

    tr {

      th,
      td {
        width: 21%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  #have-account {
    .el-form-item__label {
      text-align: right;
    }

    .el-pagination__editor.el-input .el-input__inner {
      height: 28px;
    }
  }
</style>