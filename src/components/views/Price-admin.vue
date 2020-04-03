<template>
  <div>
    <!-- <h3>批发价管理页面</h3> -->
    <div v-if="priceAdmin.select == 0">
      <div class="stockSearch">
        <!-- 型号：模糊查找    品牌：全匹配 -->
        <el-input placeholder="可输入品牌、型号进行搜索" style="width: 100%;margin: 0 auto;" class="input-search"
          prefix-icon="el-icon-search" v-model="keyword" @input="stockInSearch" @focus="pageSel"></el-input>
      </div>
      <div style="width: 90%;margin: 0 auto;">
        <p style="color: red;">说明：在行情指导价变化时，应该及时更新系统</p>
        <p style="color: red;">系统会将未设置等级或超过30天未更新批发价的手表标注为红色。</p>
      </div>
      <div v-show="dataMaketPriceList.length == 0" ref="hello" style="text-align: center;">
        <p>数据加载中...</p>
      </div>
      <div v-if="dataMaketPriceList.length !== 0">
        <div class="price-admin-table">
          <table>
            <tr>
              <th>图片</th>
              <th>品牌</th>
              <th>型号</th>
              <th>手表等级</th>
              <th>批发价</th>
              <th>修改时间</th>
              <th>是否需要设置内容</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) of dataMaketPriceList" :key="index">
              <td class="first-td">
                <img v-image-preview
                  :src="item.buy_watchpics == null || item.buy_watchpics == '' ? '' : img + '/img/watch/' + item.buy_watchpics.split('|')[0]"
                  class="img-style" />
              </td>
              <td>{{item.buy_watchbrand}}</td>
              <td>{{item.buy_watchmodel}}</td>
              <td>
                <div style="display: flex;justify-content: center;">
                  <span>{{item.watchLevel}}</span>
                  <div>
                    <img src="../../assets/imgs/update.png"
                      style="width: 25px; height: 25px;margin-left: 10px;cursor: pointer;"
                      @click="updateWatchLevel(item.buy_watchid)" />
                  </div>
                  <el-dialog title="修改手表等级" :visible.sync="dialogWatchLevelVisible">
                    <div>
                      <el-radio-group v-model="watchLevel">
                        <el-radio label="1"></el-radio>
                        <el-radio label="2"></el-radio>
                        <el-radio label="3"></el-radio>
                        <el-radio label="4"></el-radio>
                      </el-radio-group>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogWatchLevelVisible = false">取 消</el-button>
                      <el-button type="primary" @click="updateWatchLevelSure">确 定</el-button>
                    </div>
                  </el-dialog>
                </div>
              </td>
              <td>{{item.prices.length !== 0 ?  'HKD ' + formatNumberRgx(item.prices[0].price) : ''}}</td>
              <td>{{item.prices.length !== 0 ? item.prices[0].time : ''}}</td>
              <td>
                <div style="display: flex;justify-content: center;">
                  <img :src="item.flag == 0 ? img1: img2" style="width: 22px;height: 22px;" />
                  <span>{{item.flag == 0 ? '需要' : '不需要'}}</span>
                </div>
              </td>
              <td class="last-td">
                <p class="font-style" @click="priceDetails(item)">查看详情</p>
              </td>
            </tr>
          </table>
        </div>
        <div style="width: 100%;height: 50px;">
          <div style="margin:15px 0;position:absolute;right:6%;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
              layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div v-if="priceAdmin.select == 1">
      <Price-admin-details :priceDetailsList="priceDetailsList" @gobackPriceAdmin="gobackPriceAdmin">
      </Price-admin-details>
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
        dataMaketPriceList: [],
        img: this.$store.state.baseUrl,
        priceDetailsList: {},
        img1: require('../../assets/imgs/error.png'),
        img2: require('../../assets/imgs/sureImg.png'),
        watchLevel: '1', // 手表等级
        dialogWatchLevelVisible: false,
        buy_watchid: 0, // 手表id

      }
    },
    props: ["priceAdmin"],
    created() {
      this.handleDataMaketPriceList();
    },
    methods: {
      gobackPriceAdmin(val) {
        this.priceAdmin.select = val;
        this.handleDataMaketPriceList();
        let count = sessionStorage.getItem('maketPriceCount');
        this.$emit('priceCount', count);
      },
      // 获取行情指导价列表
      handleDataMaketPriceList() {
        this.$axios.post(this.$store.state.baseUrl + '/DataMaketPriceList', {
          page: this.page,
          pagenum: this.pagenum
        }).then((res) => {
          console.log('行情指导价列表');
          console.log(res);
          this.total = res.data.total;
          this.dataMaketPriceList = res.data.watchs;
          if (this.dataMaketPriceList.length == 0) {
            this.$refs.hello.innerText = "啊哦~ 暂无数据";
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 模糊搜索
      pageSel() {
        this.page = 1;
      },
      stockInSearch() {
        console.log("关键字---" + this.keyword);
        if (this.keyword !== "") {
          console.log(this.page);
          this.dataMaketPriceList = [];
          this.$axios
            .post(this.$store.state.baseUrl + "/DataMaketPriceList", {
              page: this.page,
              pagenum: this.pagenum,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索待售商品");
              console.log(res);
              this.total = res.data.total;
              this.dataMaketPriceList = res.data.watchs;
              if (this.dataMaketPriceList.length == 0) {
                this.$refs.hello.innerText = "啊哦~ 暂无数据";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.keyword == "") {
          this.page = 1;
          this.dataMaketPriceList = [];
          this.handleDataMaketPriceList();
        }
      },
      // 查看详情
      priceDetails(item) {
        this.priceDetailsList = item;
        this.priceAdmin.select = 1;
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
      // 修改手表等级
      updateWatchLevel(watchid) {
        this.buy_watchid = watchid;
        console.log(this.buy_watchid);
        this.dialogWatchLevelVisible = true;
      },
      // 确定修改
      updateWatchLevelSure() {
        console.log(this.watchLevel);
        this.$axios.post(this.$store.state.baseUrl + '/DataWatchLevelModify', {
          id: this.buy_watchid,
          watchLevel: this.watchLevel
        }).then((res) => {
          console.log('修改手表等级');
          console.log(res);
          this.$message.success({
            message: '修改手表等级成功',
            showClose: true,
            duration: 2000
          });
          this.dialogWatchLevelVisible = false;
          this.stockInSearch();
        }).catch((err) => {
          console.log(err);
        })
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = 1;
        this.page = val;
        console.log(this.page);
        if (this.keyword !== "") {
          this.stockInSearch();
        } else if (this.keyword == "") {
          this.handleDataMaketPriceList();
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
  .stockSearch {
    width: 50%;
    margin: 30px auto;

    .input-search {
      font-size: 16px;
    }
  }

  .price-admin-table {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 30px;

    .img-style {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 30px;
    }

    td {
      height: 60px;
      margin: 10px 0;
      padding: 20px 0;
      background-color: #f2f5f7;
      font-size: 17px;
      text-align: center;
    }

    .first-td {
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
    }

    .last-td {
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;

      .font-style {
        margin: 0;
        margin-top: 10px;
        color: #0aa1ed;
        font-size: 15px;
        cursor: pointer;
      }
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
        width: 12.5%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>