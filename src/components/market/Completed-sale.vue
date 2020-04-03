<template>
  <div id="completed-container">
    <!-- <h1>已完成销售</h1> -->
    <div class="for-sale-list-container">
      <div>
        <div class="stockSearch">
          <!-- 型号：模糊查找    品牌：全匹配 -->
          <el-input placeholder="可输入品牌、型号进行搜索" style="width: 100%;margin: 0 auto;" class="input-search"
            prefix-icon="el-icon-search" v-model="keyword" @input="stockInSearch" @focus="pageSel"></el-input>
        </div>
        <div v-show="forSaleWatchList.length == 0" ref="hello" style="margin-top: 100px; text-align: center;">
          <p>数据加载中...</p>
        </div>
        <div v-if="forSaleWatchList.length !== 0">
          <div v-for="(item,index) of forSaleWatchList" :key="index">
            <div class="purchase-row">
              <span class="purchase-number">销售单号: {{" " + item.sell_orderid}}</span>
              <span class="purchase-date">销售日期: {{item.sell_time}}</span>
            </div>
            <table class="list-table">
              <tr>
                <th>图片</th>
                <th>品牌</th>
                <th>型号</th>
                <th>客户名称</th>
                <th>销售金额</th>
                <th>操作</th>
              </tr>
              <tr>
                <td class="first-td">
                  <img v-image-preview
                    :src="item.buy_watchpics == null || item.buy_watchpics == '' ? '' : img + '/img/watch/'+ (item.buy_watchpics || '').split('|')[0]"
                    style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
                </td>
                <td>
                  <p>{{item.buy_watchbrand}}</p>
                </td>
                <td>
                  <p>{{item.buy_watchmodel}}</p>
                </td>
                <td>{{item.sell_custom}}</td>
                <td>{{item.sell_currency +" "+ formatNumberRgx(item.sell_money)}}</td>
                <td class="last-td">
                  <el-button type="text" @click="sellWatch(item)">详细信息</el-button>
                  <el-dialog title="详细信息" :visible.sync="dialogSaleListVisible" left>
                    <div style="text-align: left;">
                      <div>
                        <el-form label-width="120px">
                          <el-form-item label="型号：">
                            <span>{{detailsInfo.buy_watchbrand +' - '+ detailsInfo.buy_watchmodel}}</span>
                          </el-form-item>
                          <el-form-item label="销售日期：">
                            <el-date-picker v-model="sell_time" type="date" class="input-style" readonly>
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="销售金额：">
                            <el-input type="text" v-model="sell_money" class="input-style" readonly>
                              <i slot="suffix"
                                style="color: #000;margin-right:5%;font-style:normal;">{{sell_currency}}</i>
                            </el-input>
                          </el-form-item>
                          <el-form-item label="客户名称：">
                            <el-input v-model="sell_custom" class="input-style" readonly></el-input>
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
                                <el-date-picker v-model="sell_paytime1" type="date" class="input-style" readonly>
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="付款金额：">
                                <el-input type="text" v-model="sell_paymoney1" class="input-style" readonly>
                                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                                </el-input>
                              </el-form-item>
                            </el-form>
                          </div>
                          <div style="margin: 20px;padding: 20px;border: 1px solid #000;border-radius: 30px;">
                            <p>尾款：</p>
                            <el-form label-width="120px">
                              <el-form-item label="付款日期：">
                                <el-date-picker v-model="sell_paytime2" type="date" class="input-style" readonly>
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="付款金额：">
                                <el-input type="text" v-model="sell_paymoney2" class="input-style" readonly>
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
                                <el-date-picker v-model="sell_paytime1" type="date" class="input-style" readonly>
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="付款金额：">
                                <el-input type="text" v-model="sell_paymoney1" class="input-style" readonly>
                                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                                </el-input>
                              </el-form-item>
                            </el-form>
                          </div>
                        </div>
                        <div style="margin: 30px;">
                          <p>备注：</p>
                          <el-input type="textarea" v-model="sell_note" placeholder="请输入备注信息" readonly></el-input>
                        </div>
                      </div>
                      <div style="margin-bottom: 40px;">
                        <el-form label-width="120px">
                          <el-form-item label="出库日期：">
                            <el-date-picker v-model="stock_outtime" class="input-style" readonly></el-date-picker>
                          </el-form-item>
                          <el-form-item label="送货人：">
                            <span>{{sell_sendusernick}}</span>
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogSaleListVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogSaleListVisible = false">确 定</el-button>
                    </div>
                  </el-dialog>
                </td>
              </tr>
            </table>
          </div>
          <div style="width: 100%;height: 50px;padding-bottom: 30px;">
            <div style="margin:15px 0;position:absolute;right:6%;">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
                layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
            </div>
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
        keyword: "",
        img: this.$store.state.baseUrl,
        page: 1,
        pagenum: 10,
        forSaleWatchList: [],
        total: 0,
        detailsInfo: {},
        dialogSaleListVisible: false,
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
        stock_outtime: "", // 出库时间
        sell_sendusernick: "" // 送货人
      };
    },
    created() {
      this.getSellOrderList();
    },
    methods: {
      pageSel() {
        this.page = 1;
      },
      // 已完成销售列表
      getSellOrderList() {
        this.forSaleWatchList = [];
        this.total = 0;
        this.$axios
          .post(this.$store.state.baseUrl + "/SellOrderList", {
            page: this.page,
            pagenum: this.pagenum
          })
          .then(res => {
            console.log("已完成销售");
            console.log(res);
            this.forSaleWatchList = res.data.lst;
            this.total = res.data.total;
            if (this.forSaleWatchList.length == 0) {
              this.$refs.hello.innerText = "啊哦~ 暂无数据";
            }
          });
      },
      // 模糊搜索
      stockInSearch() {
        if (this.keyword !== "") {
          this.forSaleWatchList = [];
          this.$axios
            .post(this.$store.state.baseUrl + "/SellOrderList", {
              page: this.page,
              pagenum: this.pagenum,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索已售商品");
              console.log(res);
              this.forSaleWatchList = res.data.lst;
              this.total = res.data.total;
              console.log(this.forSaleWatchList);
              if (this.forSaleWatchList.length == 0) {
                this.$refs.hello.innerText = "啊哦~ 暂无数据";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.keyword == "") {
          this.page = 1;
          this.forSaleWatchList = [];
          this.getSellOrderList();
        }
      },
      // 详细信息
      sellWatch(item) {
        console.log("详细信息");
        console.log(item);
        this.detailsInfo = item;
        this.sell_time = item.sell_time;
        this.sell_money = item.sell_money;
        this.sell_currency = item.sell_currency;
        this.sell_custom = item.sell_custom;
        if (item.sell_payfull == 0) {
          this.sell_payfull = false;
          this.sell_paymoney1 = item.sell_paymoney1;
          this.sell_paytime1 = item.sell_paytime1;
          this.sell_paymoney2 = item.sell_paymoney2;
          this.sell_paytime2 = item.sell_paytime2;
        } else if (item.sell_payfull == 1) {
          this.sell_payfull = true;
          this.sell_paymoney1 = item.sell_paymoney1;
          this.sell_paytime1 = item.sell_paytime1;
        }
        this.sell_note = item.sell_note;
        this.stock_outtime = item.stock_outtime;
        this.sell_sendusernick = item.sell_sendusernick;
        this.dialogSaleListVisible = true;
        // this.forSaleListSelect.list = 1;
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
          this.getSellOrderList();
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
  .for-sale-list-container {
    width: 90%;
    margin: 0 auto;

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

    .purchase-row {
      margin-top: 20px;
      padding-top: 30px;
      padding-left: 30px;
      background-color: #fff;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;

      .purchase-number {
        font-size: 22px;
        font-weight: bold;
      }

      .purchase-date {
        margin-left: 30px;
        color: #c8c8c8;
      }
    }

    .list-table {
      background-color: #fff;
      border-radius: 30px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      padding: 0 30px;

      .first-td {
        border-top-left-radius: 30px;
        border-bottom-left-radius: 30px;
      }

      .last-td {
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
      }

      .input-style {
        width: 70% !important;
      }
    }
  }

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f2f5f7;
    font-size: 17px;
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
    height: 60px;
    padding-left: 30px;
    line-height: 60px;
    background-color: #fff;
    border-radius: 30px;

    .top-span {
      // margin-right: 20%;
      font-size: 23px;
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
        width: 12%;
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  #completed-container {
    .el-pagination button:disabled {
      color: #c0c4cc;
      background-color: transparent;
      cursor: not-allowed;
    }

    .el-form-item__label {
      text-align: right;
    }

    .el-pagination__editor.el-input .el-input__inner {
      height: 28px;
    }
  }
</style>