<template>
  <div class="view-container" id="container">
    <!-- <h1>物流</h1> -->
    <div v-show="logisticsViewList.length == 0" ref="hello" style="margin-top: 100px;text-align: center;">
      <span>数据加载中...</span>
    </div>
    <div v-if="logisticsViewList.length !== 0">
      <div class="view" v-for="(item,index) in logisticsViewList" :key="index">
        <div class="purchase-row">
          <span class="purchase-number">物流单号: {{" " + item.LOG_id}}</span>
          <span class="purchase-date">发货时间: {{item.LOG_sendtime}}</span>
        </div>
        <table class="view-table">
          <tr>
            <th>抵达仓库名称</th>
            <th>总运费金额</th>
            <th>物流状态</th>
            <th>操作</th>
          </tr>
          <tr>
            <td class="first-td">{{item.LOG_warehouse}}</td>
            <td>{{'HKD '+formatNumberRgx(item.LOG_money)}}</td>
            <td>
              <div style="display: flex;justify-content:center;">
                <span>{{item.LOG_state == 1 ? "运输中" : "已到达仓库"}}</span>
                <div style="padding-top: 3px;margin-left: 5px;">
                  <img :src="item.LOG_state == 1 ? img1 : img2" style="width: 20px;height: 20px;" />
                </div>
              </div>
            </td>
            <td class="last-td">
              <el-button type="text" @click="viewDetails(item)">详细信息</el-button>
              <el-dialog title="详细物流信息" :visible.sync="dialogVisible">
                <div style="text-align: left;">
                  <div class="details-container">
                    <el-form label-width="20%">
                      <el-form-item label="预计到达时间：" v-if="details.LOG_state == 1">
                        <el-date-picker v-model="details.LOG_arrivetime" type="date" placeholder="date"
                          class="input-style" readonly></el-date-picker>
                      </el-form-item>
                      <el-form-item label="到达仓库时间：" v-if="details.LOG_state == 2">
                        <el-date-picker v-model="details.LOG_arrivetime" type="date" placeholder="date"
                          class="input-style" readonly></el-date-picker>
                      </el-form-item>
                      <el-form-item label="到达仓库：">
                        <el-input v-model="details.LOG_warehouse" class="input-style"
                          style="width: 60%;height: auto;line-height: 40px;" readonly></el-input>
                      </el-form-item>
                      <el-form-item label="总运费：">
                        <el-input v-model="details.LOG_money" style="width: 60%;height: auto;line-height: 40px;"
                          readonly>
                          <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                        </el-input>
                      </el-form-item>
                    </el-form>
                    <div>
                      <div style="margin: 15px 0;font-size: 20px;">
                        <span>共 {{nums}} 块手表</span>
                        <!-- <span></span> -->
                      </div>
                      <div class="every-details">
                        <div style="font-size: 18px;">
                          <span>每块表详细信息：</span>
                        </div>
                        <table>
                          <tr>
                            <th class="table-th">图片</th>
                            <th class="table-th">型号</th>
                            <th class="table-th">机芯号</th>
                            <th class="table-th">采购价</th>
                            <th class="table-th">物流状态</th>
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
                            <td>
                              <!-- <span>{{items.LOG_state == 1 ? "运输中" : "已到达仓库"}}</span> -->
                              <img :src="items.LOG_state == 2 || items.LOG_state > 2 ? img2 : img1" />
                            </td>
                            <td class="last-td">
                              <div style="width: 100%;margin: 0 auto;border-bottom: 1px solid #2d4e65;display: flex;">
                                <input type="text" v-model="items.LOG_moneyex" class="freight-input" readonly />
                                <i slot="suffix"
                                  style="width: 50%;height: 40px;line-height: 40px;font-style:normal;color: #000;">HKD</i>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div slot="footer">
                  <el-button @click="viewClick1">取 消</el-button>
                  <el-button type="primary" @click="viewClick2">确 定</el-button>
                </div>
              </el-dialog>
            </td>
          </tr>
        </table>
      </div>
      <div style="width: 100%;height: 50px;background-color: #f2f5f9;">
        <div style="margin:15px 0;position:absolute;right:10%;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
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
        total: 0,
        page: 1,
        pagenum: 10,
        dialogVisible: false,
        logisticsViewList: [],
        img1: require("../../assets/imgs/carImg.png"),
        img2: require("../../assets/imgs/sureImg.png"),
        details: {},
        nums: 0
      };
    },
    props: ["logisticsView"],
    mounted() {
      this.handleView();
      if (this.logisticsView.logisticsV == 1) {
        this.handleView();
      }
    },
    methods: {
      // 获取已发货的商品物流信息
      handleView() {
        this.$axios
          .post(this.$store.state.baseUrl + "/LOGList", {
            page: this.page,
            pagenum: this.pagenum
          })
          .then(res => {
            console.log("我是已发货商品");
            console.log(res);
            this.total = res.data.total;
            this.logisticsViewList = res.data.lst;
            if (this.logisticsViewList.length == 0) {
              this.$refs.hello.innerText = "啊哦~暂无数据";
            }
          })
          .catch(err => {
            console.log(err);
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
        this.handleView();
        // 换页回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 点击查看详情
      viewDetails(details) {
        console.log("要查看物流详情了哦");
        console.log(details);
        this.details = details;
        this.nums = this.details.LOG_watch.length;
        this.dialogVisible = true;
      },
      viewClick1() {
        this.handleView();
        this.dialogVisible = false;
      },
      viewClick2() {
        this.handleView();
        this.dialogVisible = false;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .view-container {
    width: 95%;
    margin: 0 auto;
    padding-bottom: 20px;

    .view {
      width: 100%;
      margin-top: 20px;
      background-color: #fff;
      border-radius: 30px;

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

      .view-table {
        width: 100%;
        padding: 20px;
        margin: 0 auto;

        td {
          background-color: #f2f5f7;
          font-size: 17px;
        }

        .first-td {
          padding: 30px;
          border-top-left-radius: 30px;
          border-bottom-left-radius: 30px;
        }

        .last-td {
          border-top-right-radius: 30px;
          border-bottom-right-radius: 30px;

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

    .freight-input {
      width: 90%;
      height: 40px;
      border: 0;
      outline: none;
      background-color: transparent;
      text-align: center;
    }
  }
  .input-style{
    width: 60% !important;
  }
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0 30px;

    tr {

      th,
      td {
        width: 16%; // 100/6
        text-align: center;
        border: 0;
      }
    }
  }
</style>
<style lang="scss">
  #container {

    .el-form-item::after,
    .el-form-item::before {
      display: none;
      content: "";
    }

    .el-form-item__content::after,
    .el-form-item__content::before {
      display: none;
      content: "";
    }

    .el-dialog__title {
      font-size: 20px;
    }

    @media screen and (min-width: 1801px) {
      .el-dialog {
        width: 55%;
      }
    }

    @media screen and (min-width: 1641px) and (max-width: 1800px) {
      .el-dialog {
        width: 60%;
      }
    }

    @media screen and (min-width: 1401px) and (max-width: 1640px) {
      .el-dialog {
        width: 70%;
      }
    }

    @media screen and (max-width: 1400px) {
      .el-dialog {
        width: 80%;
      }
    }

    .vue-directive-image-previewer {
      z-index: 10000;
    }
  }
</style>