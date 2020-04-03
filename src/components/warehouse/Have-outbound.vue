<template>
  <div id="have-container">
    <div v-if="haveBound.have == 0">
      <div>
        <div class="stockSearch">
          <!-- 型号：模糊查找    品牌：全匹配 -->
          <el-input placeholder="可输入品牌、型号进行搜索" style="width: 100%;margin: 0 auto;" class="input-search"
            prefix-icon="el-icon-search" v-model="keyword" @input="stockInSearch" @focus="pageVel"></el-input>
        </div>
        <div v-show="stockOutList.length == 0" ref="hello" style="margin-top: 60px;text-align: center;">
          <p>数据加载中...</p>
        </div>
        <div v-if="stockOutList.length !== 0">
          <div style="width: 90%;margin: 0 auto;font-size: 20px;">
            <p>商品数量： {{total}}</p>
          </div>
          <div class="have-outbound-container">
            <table>
              <tr>
                <th>手表图片</th>
                <th>手表品牌</th>
                <th>手表型号</th>
                <th>手表数量</th>
                <th>操作</th>
              </tr>
              <tr v-for="(item,index) of stockOutList" :key="index">
                <td class="first-td">
                  <img v-image-preview
                    :src="item.buy_watchpics == null || item.buy_watchpics == '' ? '' : img + '/img/watch/'+ (item.buy_watchpics || '').split('|')[0]"
                    style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" class="first-img" />
                </td>
                <td>{{item.buy_watchbrand}}</td>
                <td>{{item.buy_watchmodel}}</td>
                <td>{{item.watch.length}}</td>
                <td class="last-td">
                  <el-button type="text" @click="haveOutboundDetails(item.watch)">查看详情</el-button>
                </td>
              </tr>
            </table>
            <div style="width: 100%;height: 63px;">
              <div style="margin:15px 0;position:absolute;right:6%;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                  :current-page="page" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="haveBound.have == 1">
      <div class="back-img" @click="gobackNotOutbound">
        <img src="../../assets/imgs/goback.png" />
        <span class="font">返回</span>
      </div>
      <table class="have-outbound-container">
        <tr>
          <th>图片</th>
          <th>出库时间</th>
          <th>货号</th>
          <th>机芯号</th>
          <th>提货人</th>
        </tr>
        <tr v-for="(items,index) of haveOutboundDetailsList" :key="index">
          <td class="first-td">
            <img v-image-preview
              :src="items.watchpics == null || items.watchpics == '' ? '' : img + '/img/watch/'+ (items.watchpics || '').split('|')[0]"
              style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" class="first-img" />
          </td>
          <td>{{items.stock_outtime}}</td>
          <td>{{items.stock_No}}</td>
          <td>{{items.buy_watchsn}}</td>
          <td class="last-td">{{items.sell_sendusernick}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keyword: '',
        page: 1,
        pagenum: 10,
        img: this.$store.state.baseUrl,
        total: 0,
        stockOutList: [], // 已出库库存列表
        haveOutboundDetailsList: [], // 详细信息
        buy_watchpics: '',

      }
    },
    props: ["haveBound"],
    created() {
      this.getStocOutkList();
    },
    methods: {
      pageVel(){
        this.page = 1;
      },
      // 模糊搜索
      stockInSearch() {
        if (this.keyword !== '') {
          this.stockOutList = [];
          this.total = 0;
          this.$axios
            .post(this.$store.state.baseUrl + "/StockOutList", {
              page: this.page,
              pagenum: this.pagenum,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取已出库商品");
              console.log(res);
              this.stockOutList = res.data.lst;
              this.total = res.data.total;
              if (this.stockOutList.length == 0) {
                this.$refs.hello.innerText = '啊哦~ 暂无数据'
              }
            });
        } else if (this.keyword == '') {
          this.stockOutList = [];
          this.total = 0;
          this.page = 1;
          this.getStocOutkList();
        }
      },
      // 获取已出库库存列表
      getStocOutkList() {
        this.stockOutList = [];
        this.total = 0;
        this.$axios.post(this.$store.state.baseUrl + '/StockOutList', {
          page: this.page,
          pagenum: this.pagenum
        }).then((res) => {
          console.log('已出库库存列表');
          console.log(res);
          this.total = res.data.total;
          this.stockOutList = res.data.lst;
          if (this.stockOutList.length == 0) {
            this.$refs.hello.innerText = '啊哦~ 暂无数据'
          }
          console.log(this.stockOutList);
        }).catch((err) => {
          console.log(err);
        })
      },
      // 查看该品牌下的手表
      haveOutboundDetails(details) {
        this.haveOutboundDetailsList = details;
        this.haveBound.have = 1;
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        if (this.keyword !== '') {
          this.stockInSearch();
        } else if (this.keyword == '') {
          this.getStocOutkList();
        }
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 返回
      gobackNotOutbound() {
        this.haveBound.have = 0;
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
    },

  }
</script>
<style lang="scss" scoped>
  .have-outbound-container {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 30px;
  }

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

  .back-img {
    height: 65px;
    margin-left: 5%;
    line-height: 65px;
    display: flex;
    justify-content: space-around;
    cursor: pointer;

    .font {
      font-size: 30px;
      color: #2d4e65;
    }
  }

  @media screen and (min-width: 1651px) {
    .back-img {
      width: 12%;
    }
  }

  @media screen and (min-width: 1101px) and (max-width: 1650px) {
    .back-img {
      width: 15%;
    }
  }

  @media screen and (min-width: 986px) and (max-width: 1100px) {
    .back-img {
      width: 18%;
    }
  }

  @media screen and (max-width: 985px) {
    .back-img {
      width: 21%;
    }
  }

  .back-img {
    width: 15%;
    height: 65px;
    margin-bottom: 20px;
    line-height: 65px;
    display: flex;
    cursor: pointer;

    .font {
      font-size: 30px;
      color: #2d4e65;
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0 30px;

    tr {

      th,
      td {
        width: 25%;
        text-align: center;
        border: 0;
      }

      td {
        height: 60px;
        padding: 10px 0;
        background-color: #f2f5f7;
        font-size: 17px;
      }
    }
  }
</style>
<style lang="scss">
  #have-container {
    .el-pagination button:disabled {
      color: #c0c4cc;
      background-color: transparent;
      cursor: not-allowed;
    }

    div .el-pager li {
      background-color: transparent !important;
    }

    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background: center center no-repeat transparent;
    }
  }
</style>