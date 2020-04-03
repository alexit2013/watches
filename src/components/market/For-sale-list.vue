<template>
  <div>
    <!-- <h1>待售品牌手表</h1> -->
    <div class="for-sale-list-container">
      <div class="back-img">
        <img src="../../assets/imgs/goback.png" @click="gobackForSale" />
        <span class="font">返回</span>
      </div>
      <table v-for="(item,index) of forSaleWatchList.watch" :key="index" class="list-table">
        <tr>
          <th>图片</th>
          <th>货号</th>
          <th v-if="item.LOG_state == 1 || item.LOG_state == 2">仓库</th>
          <th>保卡日期</th>
          <th>商品状态</th>
          <th v-if="item.LOG_state == 0 || item.LOG_state == 1">{{item.LOG_state == 0 ? '采购时间' : '预计到库时间'}}</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
        <tr>
          <td class="first-td">
            <img v-image-preview
              :src="item.watchpics == null || item.watchpics == '' ? '' : img + '/img/watch/'+ (item.watchpics || '').split('|')[0]"
              style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
          </td>
          <td>{{item.stock_No}}</td>
          <td v-if="item.LOG_state == 1 || item.LOG_state == 2">{{item.LOG_warehouse}}</td>
          <td>{{item.buy_watchcard}}</td>
          <td>
            <div v-for="(states,index) of item.watchstate.split('|')" :key="index">
              <p>{{states}}</p>
            </div>
          </td>
          <td v-if="item.LOG_state == 0 || item.LOG_state == 1">
            {{item.LOG_state == 0 ? item.buy_date : (item.LOG_state == 1 ? item.LOG_arrivetime: '')}}</td>
          <td>{{item.LOG_state == 0 ? '采购中' : (item.LOG_state == 1 ? '运输中' : '已入库')}}</td>
          <td class="last-td">
            <el-button type="text" @click="sellWatch(item.id,index,item.LOG_state)">出售</el-button>
            <el-dialog title="出售" :visible.sync="dialogSaleListVisible" left>
              <div style="text-align: left;">
                <div>
                  <el-form label-width="120px">
                    <el-form-item label="型号：">
                      <span>{{forSaleWatchList.buy_watchbrand +'-'+ forSaleWatchList.buy_watchmodel}}</span>
                    </el-form-item>
                    <el-form-item label="销售日期：">
                      <el-date-picker v-model="sell_time" type="date" class="input-style"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="销售金额：">
                      <el-input type="text" v-model="sell_money" class="input-style">
                        <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="客户名称：">
                      <el-input v-model="sell_custom" placeholder="请输入客户名称" class="input-style"></el-input>
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
                          <el-date-picker v-model="sell_paytime1" type="date" class="input-style"></el-date-picker>
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
                          <el-date-picker v-model="sell_paytime2" type="date" class="input-style"></el-date-picker>
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
                    <div style="padding: 20px;border: 1px solid #000;border-radius: 30px;">
                      <el-form label-width="120px">
                        <el-form-item label="付款日期：">
                          <el-date-picker v-model="sell_paytime1" type="date" class="input-style"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="付款金额：">
                          <el-input type="text" v-model="sell_paymoney1" class="input-style">
                            <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">HKD</i>
                          </el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                  <div style="margin: 20px;">
                    <p>备注：</p>
                    <el-input type="textarea" v-model="sell_note" placeholder="请输入备注信息"></el-input>
                  </div>
                </div>
                <!-- <div v-if="logState == 2"> -->
                <div v-if="logState == 2 && options.text !== ''" style="text-align: center;">
                  <div v-qr="options" v-if="options"></div>
                  <p>提货二维码</p>
                </div>
                <!-- </div> -->
                <div style="margin-top: 20px;text-align: center;">
                  <el-button type="primary" @click="sellOrderSave" style="width: 40%; margin: 0 auto;">保存</el-button>
                </div>
              </div>
              <div slot="footer">
                <el-button @click="dialogSaleListVisible = false">取 消</el-button>
                <el-button type="primary" @click="sellOrderSaveSure">确 定</el-button>
              </div>
            </el-dialog>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        forSaleWatchList: this.forSaleWatch,
        id: 0,
        dialogSaleListVisible: false,
        sell_time: new Date(), // 销售日期
        sell_money: "", // 销售金额
        sell_custom: "", // 客户名称
        sell_payfull: false, // 是否全款   0:非全款 1:全款
        sell_paymoney1: "", // 第一次付款（定金）
        sell_paytime1: new Date(), // 第一次付款（定金）时间
        sell_paymoney2: "", // 第二次付款（尾款）（sell_payfull为1时，该内容不传）
        sell_paytime2: new Date(), // 第二次付款（尾款）时间（sell_payfull为1时，该内容不传）
        sell_note: "", // 备注
        paramsSave: {},
        sell_stockouttoken: "", // 出库验证码(该值用于生成出库二维码)
        options: {
          text: "",
          render: "canvas",
          width: 200,
          height: 200,
          typeNumber: -1,
          correctLevel: 2,
          background: "#ffffff",
          foreground: "#000000"
        },
        watchIndex: 0,
        logState: 0
      };
    },
    props: ["forSaleWatch"],
    methods: {
      // 返回库存页
      gobackForSale() {
        this.$emit("gobackForSale", 0);
      },
      // 出售商品
      sellWatch(id, index, logState) {
        this.id = id;
        this.logState = logState;
        console.log(this.logState);
        this.watchIndex = index;
        
        this.sell_time = new Date();
        this.sell_money = "";
        this.sell_custom = "";
        this.sell_payfull = true;
        this.sell_paymoney1 = "";
        this.sell_paytime1 = new Date();
        this.sell_paymoney2 = "";
        this.sell_paytime2 = new Date();
        this.sell_note = "";
        this.dialogSaleListVisible = true;
      },
      // 新增销售单前数据的验证
      sellOrderSave1() {
        console.log("新增销售单");
        console.log(this.sell_payfull);
        if (this.sell_payfull == false) {
          this.paramsSave = {
            id: this.id,
            sell_time: this.shellDate(this.sell_time),
            sell_money: this.sell_money,
            sell_custom: this.sell_custom,
            sell_payfull: 0,
            sell_paymoney1: this.sell_paymoney1,
            sell_paytime1: this.sell_paytime1 == "" ? "" : this.shellDate(this.sell_paytime1),
            sell_paymoney2: this.sell_paymoney2,
            sell_paytime2: this.sell_paymoney2 == "" ? "" : this.shellDate(this.sell_paytime2),
            sell_note: this.sell_note
          };
          return 1;
        }
        if (this.sell_payfull == true) {
          this.paramsSave = {
            id: this.id,
            sell_time: this.shellDate(this.sell_time),
            sell_money: this.sell_money,
            sell_custom: this.sell_custom,
            sell_payfull: 1,
            sell_paymoney1: this.sell_paymoney1,
            sell_paytime1: this.sell_paytime1 == "" ? "" : this.shellDate(this.sell_paytime1),
            sell_note: this.sell_note
          };
          if (this.sell_paymoney1 !== "") {
            if (this.sell_paymoney1 == this.sell_money) {
              return 1;
            } else if (this.sell_paymoney1 !== this.sell_money) {
              this.$message.error({
                message: "付款金额与销售金额不等，不能保存，请重新填写"
              });
              return 3;
            }
          } else {
            return 1;
          }
        }
      },
      // 新增销售单
      sellOrderSave() {
        console.log("ffff");
        console.log(this.paramsSave);
        console.log(this.sellOrderSave1());
        if (this.sellOrderSave1() == 1) {
          this.$axios
            .post(this.$store.state.baseUrl + "/SellOrderSave", this.paramsSave)
            .then(res => {
              console.log("新增销售单成功了吗");
              this.$message.success({
                message: "新增销售单成功",
                showClose: true,
                duration: 2000
              });
              console.log(res);
              if (res.data !== "") {
                this.sell_stockouttoken = res.data.sell_stockouttoken;
                console.log(this.sell_stockouttoken);
                if (this.logState == 2) {
                  this.options.text = this.sell_stockouttoken;
                } else {
                  this.options.text = "";
                }
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error({
                message: err.data.message + "，请检查填写数据是否正确",
                showClose: true,
                duration: 2000
              });
            });
        }
      },
      // 确定
      sellOrderSaveSure() {
        this.forSaleWatchList.watch.splice(this.watchIndex, 1);
        this.dialogSaleListVisible = false;
        this.keyword = "";
        console.log(this.forSaleWatchList.watch);
        if (this.forSaleWatchList.watch.length == 0) {
          this.$emit("gobackForSale", 0);
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  .for-sale-list-container {
    width: 90%;
    margin: 0 auto;

    .back-img {
      height: 65px;
      // margin-right: 10%;
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

    .list-table {
      background-color: #fff;
      border-radius: 30px;
      margin: 40px 0;
      padding: 0 30px;
    }
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

  @media screen and (min-width: 1651px) {
    .top-form {
      width: 26%;
    }

    .back-img {
      width: 12%;
    }
  }

  @media screen and (min-width: 1101px) and (max-width: 1650px) {
    .top-form {
      width: 40%;
    }

    .back-img {
      width: 15%;
    }
  }

  @media screen and (min-width: 986px) and (max-width: 1100px) {
    .top-form {
      width: 45%;
    }

    .back-img {
      width: 18%;
    }
  }

  @media screen and (max-width: 985px) {
    .top-form {
      width: 50%;
    }

    .back-img {
      width: 21%;
    }
  }

  .top-form {
    height: 80px;
    padding-left: 30px;
    line-height: 80px;
    background-color: #fff;
    border-radius: 30px;

    .top-span {
      margin-right: 20%;
      font-size: 22px;
    }
  }
  .input-style{
    width: 70% !important;
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
