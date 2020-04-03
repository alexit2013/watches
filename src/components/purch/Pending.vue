<template>
  <div class="mypurchase-container" id="pending-container">
    <div v-if="selectSearch.msg == 0">
      <div class="stockSearch">
        <!-- 型号：模糊查找    品牌：全匹配 -->
        <el-input placeholder="可输入品牌、型号、机芯号进行搜索" class="input-search" prefix-icon="el-icon-search" v-model="keyword"
          @input="stockInSearch" @focus="pageSel"></el-input>
      </div>
      <div>
        <div v-show="purchaseOrder.length == 0" ref="hello" style="text-align: center;">
          <span>数据加载中...</span>
        </div>
        <div v-if="purchaseOrder.length !== 0">
          <div style="margin-left: 20px;">
            <p style="font-size: 20px;">{{'商品数量:  ' + ' ' + totalNum}}</p>
          </div>
          <div v-for="(item,index) of purchaseOrder" :key="index" class="mypurchase-table">
            <div class="purchase-row">
              <span class="purchase-number">采购单号: {{" " + item.buy_id}}</span>
              <span class="purchase-date">采购日期: {{item.buy_date}}</span>
            </div>
            <div class="state-style">
              <div class="state-container">
                <div class="jump-div" @click="drawback1(item.buy_id)">
                  <img class="jump-img" :src="watchInfoSelect(item.watch) == 1 ? watchimg1 : watchimg2" />
                  <span type="text" class="button-mypurchase one">手表信息</span>
                </div>
                <div class="jump-div" @click="drawback2(item.buy_id)">
                  <img class="jump-img" :src="item.buy_payState == 1 ? watchimg1 : watchimg2" />
                  <span type="text" class="button-mypurchase two">付款</span>
                </div>
                <div class="jump-div" @click="drawback3(item.buy_id)">
                  <img class="jump-img"
                    :src="item.buy_taxState == 1 ? watchimg1 : (item.buy_taxState == 0 ? watchimg2 : watchimg3)" />
                  <span type="text" class="button-mypurchase three">退税</span>
                </div>
                <div class="jump-div" @click="drawback4(item.buy_id)">
                  <img class="jump-img"
                    :src="item.buy_feeState == 1 ? watchimg1 : (item.buy_feeState == 0 ? watchimg2 : watchimg3)" />
                  <span type="text" class="button-mypurchase four">小费</span>
                </div>
              </div>
            </div>
            <div class="div-table" v-for="(content,indexs) of item.watch" :key="indexs">
              <table>
                <tr class="table-tr">
                  <th class="table-th first-img">图片</th>
                  <th class="table-th">型号</th>
                  <th class="table-th">机芯号</th>
                  <th class="table-th">采购价</th>
                  <th class="table-th">销售价</th>
                  <th class="table-th">状态</th>
                </tr>
                <tr class="table-tr-container">
                  <td class="tr-td-first">
                    <img v-image-preview
                      :src="content.buy_watchpics == null || content.buy_watchpics == '' ? '' : img + '/img/watch/'+ content.buy_watchpics.split('|')[0]"
                      class="first-img" />
                  </td>
                  <td>
                    <p style="margin: 0;">{{content.buy_watchbrand}}</p>
                    <p style="margin: 0;">{{content.buy_watchmodel}}</p>
                  </td>
                  <td>{{content.buy_watchsn}}</td>
                  <td>{{content.buy_watchcurrency}} {{formatNumberRgx(content.buy_watchprice)}}</td>
                  <td>
                    {{content.sell_state == 0 ? '未销售' : content.sell_currency + ' ' + formatNumberRgx(content.sell_money)}}
                  </td>
                  <td class="tr-ta-last">
                    <div class="jump-div">
                      <div @click="shipped(content.LOG_id,content.LOG_state,index)">
                        <img class="jump-img" :src="content.LOG_state > 0 ? watchimgs1 : watchimgs2" />
                        <span type="text" class="button-mypurchase four">发货</span>
                      </div>
                      <el-dialog title="物流详细信息" :visible.sync="dialogShippedVisible">
                        <div style="text-align: left;">
                          <div class="details-container">
                            <el-form label-width="20%">
                              <el-form-item label="预计到达时间：" v-show="details.LOG_state == 1">
                                <el-date-picker v-model="details.LOG_arrivetime" type="date" placeholder="date"
                                  class="input-style" readonly>
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="到达仓库时间：" v-show="details.LOG_state == 2">
                                <el-date-picker v-model="details.LOG_arrivetime" type="date" placeholder="date"
                                  class="input-style" readonly>
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="到达仓库：">
                                <el-input v-model="details.LOG_warehouse" class="input-style"
                                  style="width: 60%;height: auto;line-height: 40px;" readonly>
                                </el-input>
                              </el-form-item>
                              <el-form-item label="总运费：">
                                <el-input v-model="details.LOG_money" style="width: 60%;height: auto;line-height: 40px;"
                                  readonly>
                                  <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                                </el-input>
                              </el-form-item>
                            </el-form>
                            <div>
                              <!-- <div style="margin: 15px 0;font-size: 20px;">
                              <span>共 {{nums}} 块手表</span>
                            </div> -->
                              <div class="every-details">
                                <div style="font-size: 18px;"><span>每块表详细信息：</span></div>
                                <table>
                                  <tr>
                                    <th class="table-th">图片</th>
                                    <th class="table-th">型号</th>
                                    <th class="table-th">机芯号</th>
                                    <th class="table-th">采购价</th>
                                    <th class="table-th">运费</th>
                                  </tr>
                                  <tr v-for="(items,index) in details.LOG_watch" :key="index">
                                    <td class="first-td">
                                      <img v-image-preview
                                        :src="items.buy_watchpics == null || items.buy_watchpics == '' ? '' : img + '/img/watch/'+ (items.buy_watchpics || '').split('|')[0]"
                                        style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
                                    </td>
                                    <td>
                                      <div>
                                        <span>{{items.buy_watchbrand}}</span>
                                      </div>
                                      <div>
                                        <span>{{items.buy_watchmodel}}</span>
                                      </div>
                                    </td>
                                    <!-- <td>{{items.buy_watchbrand +'-'+ items.buy_watchmodel}}</td> -->
                                    <td>{{items.buy_watchsn}}</td>
                                    <td>{{items.buy_watchcurrency}} {{formatNumberRgx(items.buy_watchprice)}}</td>
                                    <td class="last-td">
                                      <div
                                        style="width: 90%;margin: 0 auto;padding-left: 5px;border-bottom: 1px solid #2d4e65;display: flex;">
                                        <input type="text" v-model="items.LOG_moneyex" class="freight-input" readonly>
                                        <i slot="suffix"
                                          style="width: 50%;height: 40px;margin-right:5%;line-height: 40px;font-style:normal;color: #000;">HKD</i>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div slot="footer">
                          <el-button @click="dialogShippedVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogShippedVisible = false">确 定</el-button>
                        </div>
                      </el-dialog>
                    </div>
                    <div>
                      <div @click="comePurch(content.stock_intime)" class="jump-div">
                        <img class="jump-img" :src="content.LOG_state == 2 ? watchimgs1 : watchimgs2" />
                        <span type="text" class="button-mypurchase four">入库</span>
                      </div>
                      <el-dialog title="入库时间" :visible.sync="dialogPurchVisible">
                        <div style="text-align: left;">
                          <el-form label-width="120px">
                            <el-form-item label="入库时间：">
                              <el-input v-model="stock_intime" style="width: 50%;" readonly="readonly"></el-input>
                            </el-form-item>
                          </el-form>
                        </div>
                        <div slot="footer">
                          <el-button @click="dialogPurchVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogPurchVisible = false">确 定</el-button>
                        </div>
                      </el-dialog>
                    </div>
                    <div>
                      <div @click="saleCome(content.sell_money,content.sell_currency)" class="jump-div">
                        <img class="jump-img" :src="content.sell_state == 2 ? watchimgs1 : watchimgs2" />
                        <span type="text" class="button-mypurchase four">销售</span>
                      </div>
                      <el-dialog title="销售金额" :visible.sync="dialogSaleVisible">
                        <el-form label-width="120px" style="text-align: left;">
                          <el-form-item label="销售金额">
                            <el-input v-model="sell_money" style="width: 50%;" readonly="readonly">
                              <i slot="suffix"
                                style="color: #000;margin-right:5%;font-style:normal;">{{sell_currency}}</i>
                            </el-input>
                          </el-form-item>
                        </el-form>
                        <div slot="footer">
                          <el-button @click="dialogSaleVisible = false">取 消</el-button>
                          <el-button type="primary" @click="dialogSaleVisible = false">确 定</el-button>
                        </div>
                      </el-dialog>
                    </div>
                    <div class="jump-div">
                      <div @click="finalStatement(content.admin_settleOrderid,content.admin_settlestate)">
                        <img class="jump-img" :src="content.admin_settlestate == 2 ? watchimgs1 : watchimgs2" />
                        <span type="text" class="button-mypurchase four">结算</span>
                      </div>
                      <!-- <el-dialog title="结算单详细信息" :visible.sync="dialogFinalStatementVisible">
                      <div style="text-align: left;">
                        <div class="details-container">
                          <el-form label-width="15%">
                            <el-form-item label="结算单号：">
                              <span>{{finalStatementDetails.orderNo}}</span>
                            </el-form-item>
                          </el-form>
                          <div style="margin: 20px auto;">
                            <p style="margin-bottom: 30px;font-size: 30px;color: red;">应收:
                              {{formatNumberRgx(finalStatementDetails.money) +' '+ HKD}}</p>
                            <div>
                              <div>
                                <img :src="watchimg1" />
                                <span>{{finalStatementDetails.createTime + ' '}}生成结算单</span>
                              </div>
                              <div>
                                <img :src="finalStatementDetails.state == 1 ? watchimg1 : watchimg2" />
                                <span>{{finalStatementDetails.state == 1 ? finalStatementDetails.}}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div class="every-details">
                              <div style="font-size: 18px;"><span>结算手表：</span></div>
                              <div>
                                <table>
                                  <tr>
                                    <th class="table-th">图片</th>
                                    <th class="table-th">品牌</th>
                                    <th class="table-th">型号</th>
                                    <th class="table-th">销售</th>
                                    <th class="table-th">成本</th>
                                    <th class="table-th">售价</th>
                                    <th class="table-th">利润</th>
                                  </tr>
                                  <tr>
                                    
                                  </tr>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogFinalStatementVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFinalStatementVisible = false">确 定</el-button>
                      </div>
                    </el-dialog> -->
                    </div>
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
    <div>
      <Details v-if="selectSearch.msg == 1" @changeMsg="changeMsg" @goback="goback" :detailsSelect="detailsSelect">
      </Details>
    </div>
  </div>
</template>
<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        // numSelect: 0,
        page: 1,
        pagenum: 10,
        total: 0,
        keyword: '',
        dialogPayment: false,
        dialogDrawback: false,
        purchaseOrder: [], //采购单列表
        watchimg1: require("../../assets/imgs/sureImg.png"),
        watchimg2: require("../../assets/imgs/error.png"),
        watchimg3: require("../../assets/imgs/noContainer.png"),
        watchimgs1: require('../../assets/imgs/myYes.png'),
        watchimgs2: require('../../assets/imgs/myNot.png'),
        watches: [],
        fee: {},
        pay: {},
        tax: {},
        select: 0,
        selectSum: 0,
        img: this.$store.state.baseUrl,
        watchstate: 0,
        detailsSelect: {
          id: 1,
          num: 0
        },
        dialogShippedVisible: false,
        details: {},
        dialogFinalStatementVisible: false,
        finalStatementDetails: {},
        shipping: {
          id: 1,
          msg: 0,
          filtrate: '0'
        },
        watchType: 0,
        totalNum: 0,
        forAccountNum: {
          id: 1,
          num: 0
        },
        stock_intime: '', // 入库时间
        dialogPurchVisible: false,
        sell_money: 0,
        sell_currency: '',
        dialogSaleVisible: false,

      };
    },
    created() {
      this.getBuyOrderAllList();
    },
    watch: {
      watchstate: "handleList"
    },
    props: ["selectSearch"],
    methods: {
      pageSel() {
        this.page = 1;
      },
      // 模糊搜索
      stockInSearch() {
        console.log(this.keyword);
        if (this.keyword !== '') {
          console.log('类型' + this.filtrate);
          this.purchaseOrder = [];
          this.total = 0;
          this.totalNum = 0;
          this.$axios
            .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
              page: this.page,
              pagenum: this.pagenum,
              type: 1,
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取订单");
              console.log(res);
              this.purchaseOrder = res.data.orders;
              this.total = res.data.total;
              this.totalNum = res.data.watchtotal;
              if (this.purchaseOrder.length == 0) {
                this.$refs.hello.innerText = '啊哦~暂无数据'
              }
            });
        } else if (this.keyword == '') {
          this.page = 1;
          this.purchaseOrder = [];
          this.total = 0;
          this.totalNum = 0;
          this.getBuyOrderAllList();
        }
      },
      // 全部订单
      getBuyOrderAllList() {
        console.log(this.filtrate);
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
            page: this.page,
            pagenum: this.pagenum,
            type: 1
          })
          .then(res => {
            console.log("获取订单");
            console.log(res);
            this.purchaseOrder = res.data.orders;
            this.total = res.data.total;
            this.totalNum = res.data.watchtotal;
            console.log(this.purchaseOrder);
            if (this.purchaseOrder.length == 0) {
              this.$refs.hello.innerText = '啊哦~暂无数据'
            }
            // this.page = 1;
          });
      },
      getBuyOrderAllList1() {
        this.selectSearch.msg = 0;

        console.log('待处理' + this.filtrate);
        this.page = 1;
        this.keyword = '';
        this.stockInSearch();
      },
      // 数据改变
      changeMsg(val) {
        // this.getBuyOrderAllList();
      },
      // 返回到此页
      goback(val) {
        this.getBuyOrderAllList();
        this.selectSearch.msg = 0;
        this.$emit('pendingNum', 0);
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
      // 商品信息状态判断
      watchInfoSelect(watch) {
        // console.log('商品信息状态判断');
        // console.log(watch);
        let state = watch.some(item => item.buy_watchState == 0)
        // console.log(state);
        if (state) {
          return 0;
        } else {
          return 1;
        }
      },
      drawback1(id) {
        sessionStorage.setItem("buy_id", id);
        console.log(sessionStorage.getItem("buy_id"));
        console.log("tongfeng");
        this.detailsSelect.num = 0;
        this.selectSearch.msg = 1;
        this.$emit('pendingNum', 1);
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
      drawback2(id) {
        sessionStorage.setItem("buy_id", id);
        console.log(sessionStorage.getItem("buy_id"));
        console.log("tongfeng");
        this.detailsSelect.num = 1;
        this.selectSearch.msg = 1;
        this.$emit('pendingNum', 1);
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
      drawback3(id) {
        sessionStorage.setItem("buy_id", id);
        console.log(sessionStorage.getItem("buy_id"));
        console.log("tongfeng");
        this.detailsSelect.num = 2;
        this.selectSearch.msg = 1;
        this.$emit('pendingNum', 1);
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
      drawback4(id) {
        sessionStorage.setItem("buy_id", id);
        console.log(sessionStorage.getItem("buy_id"));
        console.log("tongfeng");
        this.detailsSelect.num = 3;
        this.selectSearch.msg = 1;
        this.$emit('pendingNum', 1);
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
      // 是否已发货
      shipped(log_id, shippedState, index) {
        console.log(log_id + '--' + shippedState);
        if (shippedState !== 0) {
          this.$axios.post(this.$store.state.baseUrl + '/LOGInfo', {
            LOG_id: log_id
          }).then((res) => {
            console.log('根据物流单获取物流信息');
            console.log(res);
            this.details = res.data;
            this.dialogShippedVisible = true;
          })
        } else if (shippedState == 0) {
          this.$message.error({
            message: '商品未发货，暂无物流信息',
            showClose: true,
            duration: 2000
          })
        }
      },
      // 是否已入库
      comePurch(stock_intime) {
        this.stock_intime = stock_intime;
        if (this.stock_intime == '' || this.stock_intime == null) {
          this.$message.error({
            message: '商品未入库',
            showClose: true,
            duration: 2000
          })
        } else if (this.stock_intime !== '') {
          this.dialogPurchVisible = true;
        }
      },
      // 是否已销售
      saleCome(sell_money, sell_currency) {
        this.sell_money = sell_money;
        this.sell_currency = sell_currency;
        if (this.sell_money == null || this.sell_currency == null) {
          this.$message.error({
            message: '商品未销售',
            showClose: true,
            duration: 2000
          })
        } else {
          this.dialogSaleVisible = true;
        }
      },
      // 是否已结算
      //                 结算单id             结算状态
      finalStatement(admin_settleOrderid, admin_settlestate) {
        if (admin_settlestate !== 0) {
          this.$axios.post(this.$store.state.baseUrl + '/BuySettleOrderInfo', {
            id: admin_settleOrderid
          }).then((res) => {
            console.log('结算单信息');
            console.log(res);
            this.finalStatementDetails = res.data;
            this.dialogFinalStatementVisible = true;
          })
        } else if (admin_settlestate == 0) {
          this.$message.error({
            message: '该商品未结算，暂无结算单信息',
            showClose: true,
            duration: 2000
          })
        }
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
          this.getBuyOrderAllList();
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
    }
  };
</script>
<style lang="scss" scoped>
  .mypurchase-container {
    width: 95%;
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

    .freight-input {
      width: 90%;
      height: 40px;
      border: 0;
      outline: none;
      background-color: transparent;
      text-align: center;
    }

    .mypurchase-table {
      width: 100%;
      margin-bottom: 30px;
      background-color: #fff;
      border-radius: 20px;

      .purchase-row {
        padding-top: 50px;
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

      .div-table {
        // padding: 0 30px;
        padding: 30px;
        padding-top: 0;
        padding-bottom: 0;

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

          .tr-ta-last {
            border-top-right-radius: 30px;
            border-bottom-right-radius: 30px;

            .jump-div {
              margin-top: 10px;
              cursor: pointer;

              .jump-img {
                width: 15px;
                height: 15px;
              }

              .button-mypurchase {
                border: 0;
                outline: none;
                color: #2d4e65;
              }
            }

            .details-container {
              .every-details {
                padding: 20px;
                padding-bottom: 0;
                border-radius: 30px;
                border: 1px solid #ddd;

                .table-th {
                  font-size: 16px;
                }
              }
            }
          }
        }


      }
    }
  }

  .state-style {
    width: 100%;
    padding: 20px 0;
    // background-color: #f2f5f7;
    // border-bottom-left-radius: 30px;
    // border-bottom-right-radius: 30px;

    .state-container {
      width: 50%;
      display: flex;
      justify-content: space-around;

      .jump-div {
        display: flex;
        cursor: pointer;

        .jump-img {
          width: 20px;
          height: 20px;
        }

        .button-mypurchase {
          border: 0;
          outline: none;
          color: #2d4e65;
        }
      }
    }

  }
  .input-style{
    width: 60% !important;
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

  .color1 {
    color: #23c75e;
  }

  .color2 {
    color: #f22b1a;
  }
</style>
<style lang="scss">
  #pending-container {
    .el-pagination button:disabled {
      color: #c0c4cc;
      background-color: #f2f5f9;
      cursor: not-allowed;
    }

    div .el-pager li {
      background-color: #f2f5f9 !important;
    }

    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background: center center no-repeat #f2f5f9;
      background-size: 16px;
      cursor: pointer;
      margin: 0;
      color: #303133;
    }

    .el-input {
      width: 100%;
    }

    .el-radio.is-bordered {
      padding: 12px 30px 0 20px;
      border-radius: 30px;
      border: 1px solid #DCDFE6;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      height: 40px;
    }

    .el-dialog {
      width: 60%;
    }

    .vue-directive-image-previewer {
      z-index: 10000;
    }
  }
</style>