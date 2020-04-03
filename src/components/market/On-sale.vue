<template>
  <div class="on-sale-container">
    <!-- <h1>进行中的销售</h1> -->
    <div class="onSale-container">
      <div class="stockSearch">
        <!-- 型号：模糊查找    品牌：全匹配 -->
        <el-input placeholder="可输入品牌、型号进行搜索" style="width: 100%;margin: 0 auto;" class="input-search"
          prefix-icon="el-icon-search" v-model="keyword" @input="stockInSearch" @focus="pageSel"></el-input>
      </div>
      <div class="onSale-top">
        <p style="font-size: 20px;">销售单数量：{{' ' + count}}</p>
      </div>
      <div v-show="sellPendOrderList.length == 0" ref="hello" class="container-null">
        <p>数据加载中...</p>
      </div>
      <div v-if="sellPendOrderList.length !== 0">
        <div v-for="(item,index) of sellPendOrderList" :key="index" class="onSale-center">
          <div class="purchase-row">
            <span class="purchase-number">销售单号: {{" " + item.sell_orderid}}</span>
            <span class="purchase-date">销售日期: {{item.sell_time}}</span>
          </div>
          <div class="purchase-row" style="padding-right: 50%;display: flex;justify-content: space-between;">
            <div style="text-align: center;">
              <p style="margin: 0;" v-if="item.buy_date !== null">{{item.buy_date}}</p>
              <p v-if="item.buy_date == null" style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.LOG_state > 0 || item.LOG_state == 0 ? img1 : img2" class="img-style" />
                <span>采购</span>
              </div>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0;" v-if="item.LOG_sendtime !== null">{{item.LOG_sendtime}}</p>
              <p v-if="item.LOG_sendtime == null" style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.LOG_state > 1 || item.LOG_state == 1 ? img1 : img2" class="img-style" />
                <span>运输</span>
              </div>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0;" v-if="item.stock_intime !== null">{{formatStringRgx(item.stock_intime)}}</p>
              <p v-if="item.stock_intime == null" style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.LOG_state > 2 || item.LOG_state == 2 ? img1 : img2" class="img-style" />
                <span>入库</span>
              </div>
            </div>
            <div style="text-align: center;">
              <p style="margin: 0;" v-if="item.stock_outtime !== null">{{item.stock_outtime}}</p>
              <p v-if="item.stock_outtime == null" style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.LOG_state == 3 ? img1 : img2" class="img-style" />
                <span>出库</span>
              </div>
            </div>
            <div style="text-align: center;">
              <p style="margin-top: 20px;"></p>
              <div style="height: 40px; line-height: 40px;">
                <img :src="item.sell_paystate == 2 ? img1 : img2" class="img-style" />
                <span>收款</span>
              </div>
            </div>
          </div>
          <div class="div-table">
            <table>
              <tr class="table-tr">
                <th class="table-th first-img">图片</th>
                <th class="table-th">品牌</th>
                <th class="table-th">型号</th>
                <th class="table-th">客户名称</th>
                <th class="table-th">销售金额</th>
                <th class="table-th">操作</th>
              </tr>
              <tr class="table-tr-container">
                <td class="tr-td-first">
                  <img v-image-preview
                    :src="item.buy_watchpics == null || item.buy_watchpics == '' ? '' : img + '/img/watch/'+ (item.buy_watchpics || '').split('|')[0]"
                    style="width: 100px;height: 100px;border-radius: 30px;object-fit: cover;" />
                </td>
                <td>{{item.buy_watchbrand}}</td>
                <td>{{item.buy_watchmodel}}</td>
                <td>{{item.sell_custom}}</td>
                <td>{{item.sell_currency + ' ' + formatNumberRgx(item.sell_money)}}</td>
                <td class="tr-td-last">
                  <el-button type="text" @click="details(item)">查看</el-button>
                  <el-dialog title="修改销售单信息" :visible.sync="updateDialogVisible" :append-to-body="true"
                    :close-on-press-escape="false" :close-on-click-modal="false" width="50%" center>
                    <div style="text-align: left;">
                      <div>
                        <el-form label-width="120px">
                          <el-form-item label="型号：">
                            <span>{{buy_watchbrand +' - '+ buy_watchmodel}}</span>
                          </el-form-item>
                          <el-form-item label="销售日期：">
                            <el-date-picker v-model="sell_time" type="date" class="input-style"></el-date-picker>
                          </el-form-item>
                          <el-form-item label="销售金额：">
                            <el-input type="text" v-model="sell_money" class="input-style">
                              <i slot="suffix"
                                style="color: #000;margin-right:5%;font-style:normal;">{{sell_currency}}</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="客户名称：">
                            <el-input v-model="sell_custom" class="input-style"></el-input>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div>
                        <div class="top-form">
                          <span class="top-span">是否全款：</span>
                          <el-switch v-model="sell_payfull" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                        </div>
                        <div v-if="sell_payfull == false">
                          <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
                            <p>定金：</p>
                            <el-form label-width="120px">
                              <el-form-item label="付款日期：">
                                <el-date-picker v-model="sell_paytime1" type="date" class="input-style">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="付款金额：">
                                <el-input type="text" v-model="sell_paymoney1" class="input-style">
                                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                                </el-input>
                              </el-form-item>
                            </el-form>
                          </div>
                          <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
                            <p>尾款：</p>
                            <el-form label-width="120px">
                              <el-form-item label="付款日期：">
                                <el-date-picker v-model="sell_paytime2" type="date" class="input-style">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="付款金额：">
                                <el-input type="text" v-model="sell_paymoney2" class="input-style">
                                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                                </el-input>
                              </el-form-item>
                            </el-form>
                          </div>
                        </div>
                        <div v-if="sell_payfull == true">
                          <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
                            <el-form label-width="120px">
                              <el-form-item label="付款日期：">
                                <el-date-picker v-model="sell_paytime1" type="date" class="input-style">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="付款金额：">
                                <el-input type="text" v-model="sell_paymoney1" class="input-style">
                                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                                </el-input>
                              </el-form-item>
                            </el-form>
                          </div>
                        </div>
                        <div style="margin: 30px;">
                          <p>备注：</p>
                          <el-input type="textarea" v-model="sell_note" placeholder="请输入备注信息"></el-input>
                        </div>
                        <!--  v-if="sell_stockouttoken !== ''" -->
                        <div v-if="logState == 2 || logState == 3">
                          <div style="text-align: center;" id="qrcode2">
                            <vue-qr :logoSrc="config.logo" :text="config.value" :size="200" :margin="0"></vue-qr>
                            <p>提货二维码</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="qu" style="margin-left: 35%;">取 消</el-button>
                      <el-button type="primary" @click="updateSure">确 定</el-button>
                    </span>
                  </el-dialog>
                  <el-button type="text" @click="delet(item.id)">删除</el-button>
                  <el-dialog title="取消销售单" :visible.sync="salesTicketDialogVisible" :append-to-body="true"
                    :close-on-press-escape="false" :close-on-click-modal="false" width="50%" center>
                    <div>
                      <p style="font-size: 18px;">确定删除该销售单？删除后不可恢复</p>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="salesTicketDialogVisible = false" style="margin-left: 35%;">取 消</el-button>
                      <el-button type="primary" @click="deletSure">确 定</el-button>
                    </span>
                  </el-dialog>
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
  </div>
</template>
<script>
  import VueQr from "vue-qr";
  export default {
    components: {
      VueQr
    },
    data() {
      return {
        img1: require("../../assets/imgs/sureImg.png"),
        img2: require("../../assets/imgs/error.png"),
        count: 0,
        page: 1,
        pagenum: 10,
        keyword: "",
        total: 0,
        sellPendOrderList: [], // 进行中的销售单
        img: this.$store.state.baseUrl,
        salesTicketDialogVisible: false,
        updateDialogVisible: false,
        buy_watchbrand: "",
        buy_watchmodel: "",
        updateId: 0,
        deletId: 0,
        sell_time: new Date(), // 销售日期
        sell_money: "", // 销售金额
        sell_currency: "", // 币种
        sell_custom: "", // 客户名称
        sell_payfull: false, // 是否全款   0:非全款 1:全款
        sell_paymoney1: "", // 第一次付款（定金）
        sell_paytime1: new Date(), // 第一次付款（定金）时间
        sell_paymoney2: "", // 第二次付款（尾款）（sell_payfull为1时，该内容不传）
        sell_paytime2: new Date(), // 第二次付款（尾款）时间（sell_payfull为1时，该内容不传）
        sell_note: "", // 备注
        sell_stockouttoken: "", // 用于生成二维码
        stock_outtime: "", // 出库时间
        sell_sendusernick: "", // 送货人
        config: {
          value: "",
          logo: ""
        },
        logState: ""
      };
    },
    created() {
      this.getSellPendOrderCount();
      this.handleSellPendOrderList();
    },
    methods: {
      pageSel() {
        this.page = 1;
      },
      // 进行中的销售单数量
      getSellPendOrderCount() {
        this.$axios
          .post(this.$store.state.baseUrl + "/SellPendOrderCount")
          .then(res => {
            console.log("进行中的销售单数量");
            console.log(res);
            this.count = res.data.count;
            this.$emit('getSellPendOrderCount', this.count);
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 进行中的销售单
      handleSellPendOrderList() {
        this.$axios
          .post(this.$store.state.baseUrl + "/SellPendOrderList", {
            page: this.page,
            pagenum: this.pagenum
          })
          .then(res => {
            console.log("进行中的销售单");
            console.log(res);
            this.total = res.data.total;
            this.sellPendOrderList = res.data.lst;
            if (this.sellPendOrderList.length == 0) {
              this.$refs.hello.innerText = "啊哦~ 暂无数据";
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 模糊搜索
      stockInSearch() {
        console.log(this.keyword);
        if (this.keyword !== "") {
          this.sellPendOrderList = [];
          this.count = 0;
          this.total = 0;
          this.$axios
            .post(this.$store.state.baseUrl + "/SellPendOrderList", {
              page: this.page,
              pagenum: this.pagenum,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索进行中的销售单");
              console.log(res);
              this.sellPendOrderList = res.data.lst;
              this.count = res.data.total;
              this.total = res.data.total;
              if (this.sellPendOrderList.length == 0) {
                this.$refs.hello.innerText = "啊哦~ 暂无数据";
              }
              console.log(this.sellPendOrderList);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.keyword == "") {
          this.page = 1;
          this.sellPendOrderList = [];
          this.count = 0;
          this.total = 0;
          this.getSellPendOrderCount();
          this.handleSellPendOrderList();
        }
      },
      // 修改销售单信息
      details(item) {
        console.log(item);
        console.log("修改销售单信息");
        console.log(document.getElementById("qrcode2"));
        this.logState = item.LOG_state;
        this.updateId = item.id;
        this.buy_watchbrand = item.buy_watchbrand;
        this.buy_watchmodel = item.buy_watchmodel;
        this.sell_time = item.sell_time;
        this.sell_money = item.sell_money;
        this.sell_currency = item.sell_currency;
        this.sell_custom = item.sell_custom;
        if (item.sell_payfull == 0) {
          this.sell_payfull = false;
          this.sell_paymoney1 = item.sell_paymoney1;
          this.sell_paytime1 = item.sell_paytime1;
          this.sell_paymoney2 = item.sell_paymoney2;
          if (item.sell_paytime2 == '0000-00-00') {
            this.sell_paytime2 = new Date();
          } else {
            this.sell_paytime2 = item.sell_paytime2;
          }
        } else if (item.sell_payfull == 1) {
          this.sell_payfull = true;
          this.sell_paymoney1 = item.sell_paymoney1;
          this.sell_paytime1 = item.sell_paytime1;
        }
        this.sell_note = item.sell_note;
        this.sell_stockouttoken = item.sell_stockouttoken;
        this.stock_outtime = item.stock_outtime;
        this.sell_sendusernick = item.sell_sendusernick;
        this.config.value = item.sell_stockouttoken;
        console.log(this.sell_stockouttoken);
        this.updateDialogVisible = true;
      },
      // 确认修改前数据的验证
      sellOrderSave1() {
        console.log("新增销售单");
        console.log(this.sell_payfull);
        if (this.sell_payfull == false) {
          this.paramsSave = {
            id: this.updateId,
            sell_time: this.shellDate(this.sell_time),
            sell_money: this.sell_money,
            sell_custom: this.sell_custom,
            sell_payfull: 0,
            sell_paymoney1: this.sell_paymoney1,
            sell_paytime1: this.shellDate(this.sell_paytime1),
            sell_paymoney2: this.sell_paymoney2,
            sell_paytime2: this.shellDate(this.sell_paytime2),
            sell_note: this.sell_note
          };
          if (this.sell_paymoney2 !== "") {
            let sum = Number(this.sell_paymoney1) + Number(this.sell_paymoney2);
            console.log(sum);
            if (sum == this.sell_money) {
              // this.sellOrderSave();
              return 1;
            } else {
              this.$message.error({
                message: "定金金额与尾款金额的和不等于销售金额，不能保存，请重新填写"
              });
              return 2;
            }
          } else {
            console.log("ddddddddddd");
            return 1;
            // this.sellOrderSave();
          }
        }
        if (this.sell_payfull == true) {
          this.paramsSave = {
            id: this.updateId,
            sell_time: this.shellDate(this.sell_time),
            sell_money: this.sell_money,
            sell_custom: this.sell_custom,
            sell_payfull: 1,
            sell_paymoney1: this.sell_paymoney1,
            sell_paytime1: this.shellDate(this.sell_paytime1),
            sell_note: this.sell_note
          };
          if (this.sell_paymoney1 !== "") {
            if (this.sell_paymoney1 == this.sell_money) {
              return 1;
              // this.sellOrderSave();
            } else if (this.sell_paymoney1 !== this.sell_money) {
              this.$message.error({
                message: "付款金额与销售金额不等，不能保存，请重新填写"
              });
              return 3;
            }
          } else {
            return 1;
            // this.sellOrderSave();
          }
        }
      },
      qu() {
        this.updateDialogVisible = false;
      },
      // 确认修改
      updateSure(id) {
        console.log("ffff");
        console.log(this.paramsSave);
        console.log(this.sellOrderSave1());
        if (this.sellOrderSave1() == 1) {
          this.$axios
            .post(this.$store.state.baseUrl + "/SellOrderSave", this.paramsSave)
            .then(res => {
              console.log("修改销售单成功了吗");
              console.log(res);
              this.$message.success({
                message: "修改销售单成功",
                showClose: true,
                duration: 2000
              });
              this.sell_stockouttoken = res.data.sell_stockouttoken;
              console.log(this.sell_stockouttoken);
              this.updateDialogVisible = false;
              this.keyword = "";
              // this.handleSellPendOrderList();
              this.stockInSearch();
            })
            .catch(err => {
              console.log(err);
              this.$message.error({
                message: err.data.message,
                showClose: true,
                duration: 2000
              });
            });
        }
      },
      // 删除销售单
      delet(id) {
        this.deletId = id;
        this.salesTicketDialogVisible = true;
      },
      // 确认删除销售单
      deletSure() {
        console.log(this.deletId);
        this.$axios
          .post(this.$store.state.baseUrl + "/SellOrderDel", {
            id: this.deletId
          })
          .then(res => {
            console.log("删除销售单");
            console.log(res);
            this.$message.success({
              message: "删除销售单成功",
              showClose: true,
              duration: 2000
            });
            this.keyword = "";
            this.salesTicketDialogVisible = false;
            this.stockInSearch();
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        console.log(this.page);
        if (this.keyword == '') {
          this.handleSellPendOrderList();
        } else if (this.keyword !== '') {
          this.stockInSearch();
        }
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      }
    }
  };
</script>
<style lang="scss" scoped>
  .on-sale-container {
    width: 100%;

    .container-null {
      margin-top: 100px;
      text-align: center;
    }

    .onSale-container {
      width: 95%;
      margin: 0 auto;

      .stockSearch {
        width: 50%;
        margin: 0 auto;

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

      .onSale-top {
        margin-top: 30px;
        padding-left: 20px;
        // display: flex;
      }

      .onSale-center {
        margin-top: 20px;
        background-color: #fff;
        border-radius: 30px;
      }
    }
  }

  .purchase-row {
    padding-top: 30px;
    padding-left: 30px;

    .purchase-number {
      font-size: 22px;
      font-weight: bold;
    }

    .purchase-date {
      margin-left: 30px;
      color: #c8c8c8;
    }
  }

  .img-style {
    width: 15px;
    height: 15px;
  }

  .div-table {
    padding: 0 30px;

    .table-tr {
      height: 40px;
      line-height: 40px;
      border-bottom: 0;

      .first-img {
        padding-left: 0;
      }

      .table-th {
        color: #2d4e65;
        font-size: 20px;
        font-weight: normal;
      }
    }

    .table-tr-container {
      background-color: #fff;

      td {
        background-color: #f2f5f7;
        font-size: 17px;
      }

      .tr-td-first {
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

      .tr-td-last {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
      }
    }
  }

  @media screen and (min-width: 1401px) {
    .top-form {
      width: 25%;
    }
  }

  @media screen and (min-width: 1101px) and (max-width: 1400px) {
    .top-form {
      width: 40%;
    }
  }

  @media screen and (min-width: 811px) and(max-width: 1100px) {
    .top-form {
      width: 50%;
    }
  }

  @media screen and (max-width: 810px) {
    .top-form {
      width: 60%;
    }
  }

  .top-form {
    height: 40px;
    padding-left: 30px;
    line-height: 40px;
    background-color: #fff;
    border-radius: 30px;

    .top-span {
      // margin-right: 20%;
      font-size: 23px;
    }
  }

  .input-style {
    width: 70% !important;
  }

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f2f5f7;
    font-size: 17px;
  }

  .first-td {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  .last-td {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0 30px;

    tr {

      th,
      td {
        width: 20%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  // #onsale-container {
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
    background-size: 16px;
    cursor: pointer;
    margin: 0;
    color: #303133;
  }

  .el-form-item__label {
    font-size: 16px;
    text-align: right !important;
  }

  .el-pagination__editor.el-input .el-input__inner {
    height: 28px;
  }

  .el-input__suffix {
    width: 30%;
  }

  .el-dialog {
    border-radius: 30px;
  }

  .el-input__inner {
    height: 45px;
    line-height: 45px;
    border-radius: 30px;
  }

  .el-button--primary {
    color: #fff;
    background-color: #2d4e65 !important;
    border-color: #2d4e65 !important;
  }

  .el-button {
    width: 20%;
    height: 50px;
    border-radius: 23px;
    font-size: 15px;
  }

  // }
</style>