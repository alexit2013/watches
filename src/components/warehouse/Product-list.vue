<template>
  <div class="product-list-container">
    <div class="product-container">
      <div v-if="deliveryList.delivery == 0">
        <div class="back-img" @click="gobackNotOutbound">
          <img src="../../assets/imgs/goback.png" />
          <span class="font">返回</span>
        </div>
        <div v-if="productWatchList">
          <div v-for="(items,index) of productWatchList" :key="index" class="product-table">
            <table>
              <tr>
                <th>图片</th>
                <th>保卡日期</th>
                <th>状态</th>
                <th>物流状态</th>
                <th>销售状态</th>
                <th>
                  {{items.sell_state == 1 ? '销售员' : (items.LOG_state == 0 ? '采购时间' : (items.LOG_state == 1 ? '预计到达时间' : ''))}}
                </th>
                <th>库存信息</th>
              </tr>
              <tr>
                <td class="first-td">
                  <img v-image-preview
                    :src="items.watchpics == null || items.watchpics == '' ? '' : img + '/img/watch/'+ (items.watchpics || '').split('|')[0]"
                    class="first-img" />
                </td>
                <td>{{items.buy_watchcard}}</td>
                <td>
                  <div v-for="(stateCon,index) of items.watchstate.split('|')" :key="index">
                    <p>{{stateCon}}</p>
                  </div>
                </td>
                <td>
                  {{items.LOG_state == 0 ? '采购中' : (items.LOG_state == 1 ? '运输中' : '已入库')}}
                </td>
                <td>
                  {{items.sell_state == 1 ? '已出售' : '未出售'}}
                </td>
                <td>
                  {{items.sell_state == 1 ? items.sell_usernick : (items.LOG_state == 0 ? items.buy_date : (items.LOG_state == 1 ? items.LOG_arrivetime : ''))}}
                </td>
                <td class="last-td">
                  <div v-show="items.LOG_state !== 2">
                    <span style="font-size: 15px;">当前商品未入库，暂无库存信息</span>
                  </div>
                  <div v-show="items.LOG_state == 2">
                    <span @click="inventoryInfo(items.id)" style="font-size: 15px;color: #0aa1ed;cursor: pointer;">查看库存信息</span>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div v-if="deliveryList.delivery == 1" class="list-details">
        <!-- 手表库存信息页 -->
        <div class="back-img" @click="gobackDeliveryOne">
          <img src="../../assets/imgs/goback.png" />
          <span class="font">返回</span>
        </div>
        <div style="text-align: center;" class="style-margin">
          <img :src="imgs == null || imgs == '' ? '' : img +  imgs[0]"
            style="width: 150px;height: 150px;object-fit: cover;" class="first-img" />
        </div>
        <div class="list-top">
          <div class="style-margin">
            <span>
              货号：
              <span>{{stockwatchinfo.stock_No}}</span>
            </span>
          </div>
          <div class="style-margin" style="display: flex;">
            <span>仓库货架号：</span>
            <span style="margin: 0 30px 0 10px;">{{stockwatchinfo.stock_shelfNo_A}}</span>
            <img src="../../assets/imgs/update.png" style="width: 20px;height: 20px;margin-right: 0.5%;" />
            <span @click="updateStockShelfNoA" style="cursor: pointer;color: #0aa1ed;font-size: 15px;">修改</span>
            <el-dialog title="修改货架号" :visible.sync="dialogShelfNoAVisible" center>
              <div>
                <el-form label-width="120px">
                  <el-form-item label="新的货架号：">
                    <el-input v-model="stock_shelfNo_A"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div slot="footer">
                <el-button @click="dialogShelfNoAVisible = false">取 消</el-button>
                <el-button type="primary" @click="ShelfNoASure">确 定</el-button>
              </div>
            </el-dialog>
          </div>
          <div class="style-margin" v-if="stockwatchinfo == 1">
            <span>
              出售状态：
              <span>已被 {{stockwatchinfo.sell_usernick}} 出售</span>
            </span>
          </div>
        </div>
        <div class="list-center">
          <div>
            <div style="margin: 30px 0;display: flex;justify-content: space-between;">
              <div style="width: 33%;display: flex;">
                <span>品牌：</span>
                <span>{{stockwatchinfo.buy_watchbrand}}</span>
              </div>
              <div style="width: 33%;display: flex;">
                <span>型号：</span>
                <span>{{stockwatchinfo.buy_watchmodel}}</span>
              </div>
              <div style="width: 33%;display: flex;">
                <span>库存：</span>
                <span>{{stockwatchinfo.watch_Num}}</span>
              </div>
            </div>
            <div style="display: flex;justify-content: space-between;">
              <div style="width: 33%;display: flex;">
                <span>机芯号：</span>
                <span>{{stockwatchinfo.buy_watchsn}}</span>
              </div>
              <div style="width: 33%;display: flex;">
                <span>保卡日期：</span>
                <span>{{stockwatchinfo.buy_watchcard}}</span>
              </div>
              <div style="width: 33%;display: flex;">
                <span>状态：</span>
                <div style="display: flex;">
                  <div v-for="(con,index) of watchState" :key="index">
                    <div class="state" v-if="con !== ''">
                      <span style="font-size: 13px;">{{con}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-form label-width="120px" style="margin: 20px 0; text-align: center;">
              <el-row>
                <el-col :span="12">
                  <el-button
                    style="width: 100%;margin-top: 30px;background-color:#f2f5f7;border:1px solid #f2f5f7;font-size: 15px;color:#2c3e50;"
                    @click="checkWatch">查看与此手表同型号的未出库的手表</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" @click="getQRCode" style="width: 40%;margin-top: 30px;">打印二维码</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        productWatchList: this.watchList,
        dialogShelfNoAVisible: false,
        id: "", // 手表在进销存库中的id
        stock_shelfNo_A: "", // 新的手表仓库货架号
        dialogVisible: false,
        stockwatchinfo: {}, //手表库存信息
        watchState: [],
        imgs: [],
        watchid: 0, // 手表id
        stockWatchList: [], // 同型号手表
        buy_watchbrand: '',
        buy_watchmodel: '',
        stock_No: '',
        stock_Nocrc: '',

      };
    },
    props: ["deliveryList", "watchList"],
    methods: {
      // 返回上一层
      gobackNotOutbound() {
        this.$emit("gobackNotOutbound", 0);
      },
      // 获取手表库存信息
      inventoryInfo(id) {
        console.log("55555");
        console.log(id);
        this.id = id;
        this.$axios
          .post(this.$store.state.baseUrl + "/Stockwatchinfo", {
            id: this.id
          })
          .then(res => {
            console.log("手表库存信息");
            console.log(res);
            this.stockwatchinfo = res.data;
            this.watchState = this.stockwatchinfo.watchstate.split("|");
            // 手表id  buy_watchid 用于获取同品牌未出库手表列表
            this.watchid = this.stockwatchinfo.buy_watchid;
            this.imgs = this.stockwatchinfo.stock_inpic.split("|");
            console.log(this.imgs);
            this.buy_watchbrand = this.stockwatchinfo.buy_watchbrand;
            this.buy_watchmodel = this.stockwatchinfo.buy_watchmodel;
            this.stock_No = this.stockwatchinfo.stock_No;
            this.stock_Nocrc = this.stockwatchinfo.stock_Nocrc;
            this.deliveryList.delivery = 1;
            // 页面回到顶部
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 返回手表列表
      gobackDeliveryOne() {
        this.deliveryList.delivery = 0;
      },
      // 修改货架号
      updateStockShelfNoA() {
        this.stock_shelfNo_A = '';
        this.dialogShelfNoAVisible = true;
      },
      // 确认修改货架号
      ShelfNoASure() {
        this.$axios
          .post(this.$store.state.baseUrl + "/StockShelfNoModify", {
            id: this.id,
            stock_shelfNo_A: this.stock_shelfNo_A
          })
          .then(res => {
            console.log("修改货架号");
            console.log(res);
            this.$message.success({
              message: "货架号修改成功",
              showClose: true,
              duration: 2000
            });
            this.stockwatchinfo.stock_shelfNo_A = this.stock_shelfNo_A;
            this.dialogShelfNoAVisible = false;
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取未出库的同型号手表的列表
      checkWatch() {
        console.log(this.watchid);
        this.$axios
          .post(this.$store.state.baseUrl + "/StockWatchList", {
            buy_watchid: this.watchid
          })
          .then(res => {
            console.log(res);
            this.stockWatchList = res.data;
            this.productWatchList = this.stockWatchList;
            console.log(this.productWatchList);
            this.deliveryList.delivery = 0;
            // sessionStorage.setItem('watchList', JSON.stringify(this.stockWatchList));
            // 页面回到顶部
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          })
          .catch(err => {
            console.log(err);
          });
      },
      //生成分享二维码
      getQRCode() {
        this.$axios.post('http://127.0.0.1:8079', {
          CMD: "1",
          CMDDATA: this.buy_watchbrand + '`' + this.buy_watchmodel + '`' + this.stock_No + '-A`' + this.stock_No +
            '-A|' + this.stock_Nocrc
        }).then((res) => {
          console.log(res);
          this.$message.success({
            message: '条码打印成功',
            showClose: true,
            duration: 2000
          })
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          })
        })
      },
    }
  };

</script>
<style lang="scss" scoped>
  .product-list-container {
    width: 100%;

    .product-container {
      width: 90%;
      margin: 0 auto;

      .back-img {
        height: 65px;
        // margin-right: 10%;
        margin-bottom: 20px;
        line-height: 65px;
        display: flex;
        justify-content: space-around;
        cursor: pointer;

        .font {
          // margin-left: 30px;
          font-size: 30px;
          color: #2d4e65;
        }
      }

      .product-table {
        width: 100%;
        margin: 10px auto;
        padding: 10px;
        background-color: #fff;
        border-radius: 30px;
      }

      td {
        height: 60px;
        margin: 10px 0;
        padding: 10px;
        background-color: #f2f5f7;
        font-size: 17px;
      }

      .first-img {
        width: 100px;
        height: 100px;
        border-radius: 30px;
        object-fit: cover;
      }

      .list-details {
        width: 90%;
        margin: 0 auto;
        padding: 40px;
        background-color: #fff;
        border-radius: 30px;

        .style-margin {
          margin: 15px 0;
        }

        .list-top {
          border-bottom: 2px solid #000;
        }

        .list-center {
          .state {
            width: 40px;
            height: 20px;
            margin: 0 5px;
            line-height: 16.5px;
            text-align: center;
            background-color: #0aa1ed;
            border: 1px solid #0aa1ed;
            border-radius: 5px;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1651px) {
    .back-img {
      width: 12%;
    }
  }

  @media screen and (min-width: 1251px) and (max-width: 1650px) {
    .back-img {
      width: 15%;
    }
  }

  @media screen and (min-width: 986px) and (max-width: 1250px) {
    .back-img {
      width: 18%;
    }
  }

  @media screen and (max-width: 985px) {
    .back-img {
      width: 21%;
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
        width: 21%;
        text-align: center;
        border: 0;
      }
    }
  }

</style>
<style lang="scss">
  .el-form-item__label {
    text-align: left;
  }

</style>
