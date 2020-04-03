<template>
  <div class="for-account-container" id="for-account-container">
    <!-- <h3>待结算</h3> -->
    <div v-if="forAccountNum.num == 0">
      <div class="stockSearch">
        <!-- 型号：模糊查找    品牌：全匹配 -->
        <el-input placeholder="可输入品牌、型号、机芯号进行搜索" class="input-search" prefix-icon="el-icon-search" v-model="keyword"
          @input="stockInSearch" @focus="pageSel"></el-input>
      </div>
      <div v-show="forAccountList.length == 0" ref="hello" style="text-align: center;">
        <p>数据加载中...</p>
      </div>
      <div v-if="forAccountList.length !== 0">
        <div style="margin-left: 20px;">
          <p style="font-size: 20px;">{{'商品数量:  ' + ' ' + totalNum}}</p>
        </div>
        <div class="account-table">
          <table>
            <tr>
              <th>图片</th>
              <th>型号</th>
              <th>机芯号</th>
              <th>采购价</th>
              <th>销售价</th>
              <th>操作</th>
            </tr>
          </table>
          <div v-for="(items,index) of forAccountList" :key="index">
            <table>
              <tr v-for="(item,index) of items.watch" :key="index" style="background-color: #f2f5f7;">
                <td class="first-td">
                  <img v-image-preview
                    :src="item.buy_watchpics == null || item.buy_watchpics == '' ? '' : img + '/img/watch/'+ item.buy_watchpics.split('|')[0]"
                    class="first-img" />
                </td>
                <td>
                  <p>{{item.buy_watchbrand}}</p>
                  <p>{{item.buy_watchmodel}}</p>
                </td>
                <td>{{item.buy_watchsn}}</td>
                <td>{{item.buy_watchcurrency + ' ' + formatNumberRgx(item.buy_watchprice)}}</td>
                <td>{{item.sell_state == 0 ? '未销售' : item.sell_currency + ' ' + formatNumberRgx(item.sell_money)}}</td>
                <td class="last-td">
                  <el-button type="text" @click="jumpPurchaseMsg(items.buy_id)">采购单信息</el-button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div style="width: 100%;height: 63px;background-color: #f2f5f9;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
              layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="forAccountNum.num == 1">
      <Details @changeMsg="changeMsg" @goback="goback" :detailsSelect="detailsSelect"></Details>
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
        forAccountList: [],
        img: this.$store.state.baseUrl,
        dialogPurchaseVisible: false,
        purchaseOrder: [],
        detailsSelect: {
          id: 1,
          num: 0
        },
      }
    },
    props: ['forAccountNum'],
    created() {
      this.getForAccountList();
    },
    methods: {
      // 数据改变
      changeMsg(val) {
        // this.getForAccountList();
      },
      // 返回到此页
      goback(val) {
        this.getForAccountList();
        this.forAccountNum.num = 0;
        this.$emit('shippingState', 0);
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
      pageSel() {
        this.page = 1;
      },
      // 模糊搜索
      stockInSearch() {
        if (this.keyword !== '') {
          this.forAccountList = [];
          this.total = 0;
          this.totalNum = 0;
          this.$axios
            .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
              page: this.page,
              pagenum: this.pagenum,
              type: 4,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取待结算商品列表");
              console.log(res);
              this.forAccountList = res.data.orders;
              this.total = res.data.total;
              this.totalNum = res.data.watchtotal;
              if (this.forAccountList.length == 0) {
                this.$refs.hello.innerText = '啊哦~暂无数据'
              }
            });
        }
        if (this.keyword == '') {
          this.page = 1;
          this.forAccountList = [];
          this.total = 0;
          this.totalNum = 0;
          this.getForAccountList();
        }
      },
      // 获取待结算商品
      getForAccountList() {
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderListEx', {
          page: this.page,
          pagenum: this.pagenum,
          type: 4
        }).then((res) => {
          console.log('待结算商品列表');
          console.log(res);
          this.forAccountList = res.data.orders;
          this.total = res.data.total;
          this.totalNum = res.data.watchtotal;
          if (this.forAccountList.length == 0) {
            this.$refs.hello.innerText = '啊哦~暂无数据'
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 未结算，跳转到采购单信息
      jumpPurchaseMsg(buy_id) {
        console.log('采购单信息');
        console.log(buy_id);
        this.$emit('shippingState', 1);
        sessionStorage.setItem("buy_id", buy_id);
        console.log(sessionStorage.getItem("buy_id"));
        this.forAccountNum.num = 1;
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
          this.getForAccountList();
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
    },
  }
</script>
<style lang="scss" scoped>
  .for-account-container {
    width: 100%;
    margin: 0 auto;

    .account-table {
      padding: 20px;
      background-color: #fff;
      border-radius: 30px;
    }
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
  #for-account-container {
    .el-form-item__label {
      text-align: right;
    }

    .el-pagination__editor.el-input .el-input__inner {
      height: 28px;
    }
  }
</style>