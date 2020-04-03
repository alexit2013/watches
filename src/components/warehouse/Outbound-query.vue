<template>
  <div class="product-list-container">
    <!-- <h1>扫描查询</h1> -->
    <div v-show="outboundQuery.query == 0">
      <div style="width: 50%;margin: 0 auto;margin-top: 100px;text-align: center;">
        <p>扫描前，请确认您的输入状态是否为英文</p>
        <!--  @keyup.enter.native="payCode" -->
        <el-input id="testInput" ref="barCodeInput" v-model="barCode3" @keyup.enter.native="payCode()"
          autofocus="autofocus">
        </el-input>
      </div>
    </div>
    <div v-if="outboundQuery.query == 2" class="list-details">
      <div style="text-align: center;" class="style-margin">
        <img :src="imgs == null || imgs == '' ? '' : img + imgs[0]"
          style="width: 150px;height: 150px;object-fit: cover;border-radius: 30px;" class="first-img" />
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
          <div @click="updateStockShelfNoA(stockwatchinfo.id)" style="width: 80px;display: flex;cursor: pointer;">
            <img src="../../assets/imgs/update.png" style="width: 20px;height: 20px;margin-right: 0.5%;" />
            <span style="margin-left: 5px;color: #0aa1ed;font-size: 15px;">修改</span>
          </div>
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
          <el-form label-width="120px" style="margin: 20px 0; margin-top: 30px;">
            <el-row>
              <el-col :span="12">
                <el-button
                  style="width: 100%;background-color:#f2f5f7;border:1px solid #f2f5f7;font-size: 13px;color:#2c3e50;"
                  @click="checkWatch(stockwatchinfo.buy_watchid)">查看与此手表同型号的未出库的手表</el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="getQRCode"
                  style="width: 40%;margin-left: 10%;background-color:#f2f5f7;border:1px solid #f2f5f7;font-size: 13px;color:#2c3e50;">
                  打印二维码</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div style="margin-top: 100px;text-align: center;" v-if="barCode.length == 36">
          <el-button style="width: 50%;" type="primary" @click="stockRemoval">出库</el-button>
          <el-dialog title="出库" :visible.sync="dialogVisible" :close-on-press-escape="false"
            :close-on-click-modal="false">
            <div>
              <el-form label-width="100px">
                <el-form-item label="提货人：" style="text-align: left;">
                  <el-input v-model="sell_sendusernick" placeholder="请输入提货人昵称" style="width: 60%;"></el-input>
                </el-form-item>
                <div style="margin: 15px 0 15px 25px;">
                  <div style="text-align: left;">
                    <span style="font-size: 16px;">出库时商品图片：</span>
                  </div>
                  <div style="display:flex;">
                    <div class="upload-imgs">
                      <div class="add">
                        <form enctype="multipart/form-data">
                          <input @change="inputChange($event)" type="file" name="img" accept='image/*'
                            class="inputUpload" multiple />
                          <i class="el-icon-plus addIcon"></i>
                        </form>
                      </div>
                      <div style="display:flex;position:relative;" id="delImg">
                        <div v-for="(imgurl,index) of imgurls" :key="index" style="margin-left:10px;position:relative;">
                          <span class="spanStyle" @click="delImage(index)">x</span>
                          <img :src="img + imgurl" width="100px" height="100px"
                            style="border-radius:5px;object-fit:cover;" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <el-form-item label="销售：">
                  <p style="text-align: left;">{{sell_usernick}}</p>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="stockRemovalSure">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div v-show="outboundQuery.query == 1" class="product-container">
      <div class="back-img" @click="gobackOutbound">
        <img src="../../assets/imgs/goback.png" />
        <span class="font">返回</span>
      </div>
      <div v-for="(items,index) of productWatchList" :key="index" class="product-table">
        <table>
          <tr>
            <th>图片</th>
            <th>保卡日期</th>
            <th>手表状态</th>
            <th>
              {{items.sell_state == 1 ? '销售员' : (items.LOG_state == 0 ? '采购时间' : (items.LOG_state == 1 ? '预计到达时间' : ''))}}
            </th>
            <th>物流状态</th>
            <th>库存信息</th>
          </tr>
          <tr>
            <td class="first-td">
              <img
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
              {{items.sell_state == 1 ? items.sell_usernick : (items.LOG_state == 0 ? items.buy_date : (items.LOG_state == 1 ? items.LOG_arrivetime : ''))}}
            </td>
            <td>
              {{items.sell_state == 1 ? '已出售' : (items.LOG_state == 0 ? '采购中' : (items.LOG_state == 1 ? '运输中' : '已入库'))}}
            </td>
            <td class="last-td">
              <div v-show="items.LOG_state !== 2">
                <span style="font-size: 15px;">当前商品未入库，暂无库存信息</span>
              </div>
              <div v-show="items.LOG_state == 2" class="td-center">
                <el-button type="text" @click="inventoryInfo(items.id)">查看库存信息</el-button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  import CallApp from "callapp-lib";
  import {
    setTimeout
  } from "timers";
  export default {
    data() {
      return {
        qrcode: "",
        img: this.$store.state.baseUrl,
        productWatchList: [],
        dialogShelfNoAVisible: false,
        id: "", // 手表在进销存库中的id
        stock_shelfNo_A: "", // 新的手表仓库货架号
        pics: "",
        dialogVisible: false,
        stockwatchinfo: [], //手表库存信息
        watchState: [],
        imgs: [],
        watchid: 0, // 手表id
        stockWatchList: [], // 同型号手表
        sell_sendid: "", // 送货人/提货人id
        sell_sendusernick: "", // 送货人/提货人昵称
        sell_usernick: "", // 销售员昵称
        sell_state: 0, // 销售状态
        sell_stocktoken: "", // 出库验证码/提货码
        barCode: "",
        barCode3: "",
        stock_No: "", // 货号
        doing: false,
        buy_watchbrand: "",
        buy_watchmodel: "",
        stock_No: "",
        stock_Nocrc: "",
        imgurls: [],
      };
    },
    // 10000300000218|d9efc27c3918dfd6|7005
    props: ["outboundQuery"],
    created() {
      this.barCode3 = this.outboundQuery.msg;
    },
    methods: {
      // 扫描查询手表库存信息
      payCode() {
        console.log("扫描内容");
        console.log(this.barCode3);
        this.barCode = this.barCode3;
        console.log(this.barCode);
        if (this.barCode.length > 33) {
          if (this.barCode.length == 36) {
            this.$axios
              .post(this.$store.state.baseUrl + "/Stockwatchinfo", {
                qrcode: this.barCode
              })
              .then(res => {
                console.log("扫描查询内容");
                console.log(res);
                this.stockwatchinfo = res.data;
                if (this.stockwatchinfo.stock_inpic !== null) {
                  this.imgs = this.stockwatchinfo.stock_inpic.split("|");
                }
                if (this.stockwatchinfo.watchstate !== null) {
                  this.watchState = this.stockwatchinfo.watchstate.split("|");
                }
                this.sell_stocktoken = this.stockwatchinfo.sell_stocktoken;
                this.sell_state = this.stockwatchinfo.sell_state;
                this.sell_usernick = this.stockwatchinfo.sell_usernick;
                this.buy_watchbrand = this.stockwatchinfo.buy_watchbrand;
                this.buy_watchmodel = this.stockwatchinfo.buy_watchmodel;
                this.stock_No = this.stockwatchinfo.stock_No;
                this.stock_Nocrc = this.stockwatchinfo.stock_Nocrc;
                this.id = this.stockwatchinfo.id;
                console.log(this.stockwatchinfo);
                console.log(this.sell_usernick);
                console.log(this.stock_No);
                this.barCode3 = "";
                this.$message.success({
                  message: "扫描成功",
                  showClose: true,
                  duration: 2000
                });
                this.outboundQuery.query = 2;
              })
              .catch(err => {
                console.log(err);
                this.$message.error({
                  message: "获取信息失败，请重新扫描",
                  showClose: true,
                  duration: 2000
                });
              });
          }
        } else if (this.barCode.length < 36) {
          if (this.barCode.length == 33) {
            this.$axios
              .post(this.$store.state.baseUrl + "/Stockwatchinfo", {
                qrcode: this.barCode
              })
              .then(res => {
                console.log("扫描查询内容");
                console.log(res);
                this.stockwatchinfo = res.data;
                if (this.stockwatchinfo.stock_inpic !== null) {
                  this.imgs = this.stockwatchinfo.stock_inpic.split("|");
                }
                if (this.stockwatchinfo.watchstate !== null) {
                  this.watchState = this.stockwatchinfo.watchstate.split("|");
                }
                this.sell_stocktoken = this.stockwatchinfo.sell_stocktoken;
                this.sell_state = this.stockwatchinfo.sell_state;
                this.sell_usernick = this.stockwatchinfo.sell_usernick;
                this.buy_watchbrand = this.stockwatchinfo.buy_watchbrand;
                this.buy_watchmodel = this.stockwatchinfo.buy_watchmodel;
                this.stock_No = this.stockwatchinfo.stock_No;
                this.stock_Nocrc = this.stockwatchinfo.stock_Nocrc;
                this.id = this.stockwatchinfo.id;
                console.log(this.stockwatchinfo);
                console.log(this.sell_usernick);
                console.log(this.stock_No);
                this.barCode3 = "";
                this.$message.success({
                  message: "扫描成功",
                  showClose: true,
                  duration: 2000
                });
                this.outboundQuery.query = 2;
              })
              .catch(err => {
                console.log(err);
                this.$message.error({
                  message: "获取信息失败，请重新扫描",
                  showClose: true,
                  duration: 2000
                });
              });
          }
        }
      },
      // 查看手表库存信息
      inventoryInfo(id) {
        this.$axios
          .post(this.$store.state.baseUrl + "/Stockwatchinfo", {
            id: id
          })
          .then(res => {
            console.log("手表库存信息");
            console.log(res);
            this.stockwatchinfo = res.data;
            this.watchState = this.stockwatchinfo.watchstate.split("|");
            // 手表id  buy_watchid 用于获取同品牌未出库手表列表
            this.watchid = this.stockwatchinfo.buy_watchid;
            this.imgs = this.stockwatchinfo.stock_inpic.split("|");
            this.watchState = this.stockwatchinfo.watchstate.split("|");
            this.stock_No = this.stockwatchinfo.stock_No;
            this.sell_stocktoken = this.stockwatchinfo.sell_stocktoken;
            this.sell_state = this.stockwatchinfo.sell_state;
            this.sell_usernick = this.stockwatchinfo.sell_usernick;
            console.log(this.imgs);
            console.log("查询手表库存信息");
            console.log(this.stockwatchinfo);
            this.outboundQuery.query = 2;
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 修改货架号
      updateStockShelfNoA(id) {
        this.id = id;
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
            // this.inventoryInfo(this.id);
            this.dialogShelfNoAVisible = false;
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            })
          });
      },
      // 获取未出库的同型号手表的列表
      checkWatch(id) {
        this.watchid = id;
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
            if (this.productWatchList.length !== 0) {
              this.outboundQuery.query = 1;
              // 页面回到顶部
              (function smoothscroll() {
                var currentScroll =
                  document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                  window.requestAnimationFrame(smoothscroll);
                  window.scrollTo(0, currentScroll - currentScroll / 5);
                }
              })();
            } else {
              this.$message.error({
                message: '暂无与此手表同型号未出库的手表',
                showClose: true,
                duration: 2000
              })
            }

          })
          .catch(err => {
            console.log(err);
          });
      },
      //生成分享二维码
      getQRCode() {
        this.$axios
          .post("http://127.0.0.1:8079", {
            CMD: "1",
            CMDDATA: this.buy_watchbrand +
              "`" +
              this.buy_watchmodel +
              "`" +
              this.stock_No +
              "-A`" +
              this.stock_No +
              "-A|" +
              this.stock_Nocrc
          })
          .then(res => {
            console.log(res);
            this.$message.success({
              message: "条码打印成功",
              showClose: true,
              duration: 2000
            });
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
      // 删除图片
      delImage(index) {
        this.imgurls.splice(index, 1);
      },
      // 上传图片
      inputChange(file) {
        console.log(file);
        let imgFiles = file.target.files;
        console.log(imgFiles);
        this.uploadSectionFile(imgFiles);
      },
      // 上传前压缩的方法
      uploadSectionFile(f) { //	附件上传
        console.log(f);
        let self = this;
        let Orientation;
        let ndata;
        console.log('图片尺寸');
        console.log(f[0].size);
        // * 1024 * 1024
        if (f[0].size <= 1 * 1024 * 1024) {
          //判断图片是否大于1M,是就直接上传
          ndata = f[0];
          self.postImg(ndata);
        } else {
          //反之压缩图片
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(f[0]);
          console.log(reader)
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            img.onload = function () {
              let data = self.compress(img, Orientation);
              self.headerImage = data;
              ndata = self.compress(img, Orientation);
              console.log('ndata值');
              console.log(ndata);
              //BASE64转图片
              var arr = ndata.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
              while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
              }
              ndata = new File([u8arr], f[0].name, {
                type: mime
              })
              console.log('6weeeee');
              console.log(ndata);
              self.postImg(ndata);
            }
          }
        }
      },
      async postImg(ndata) {
        let formdata1 = new FormData(); //创建form对象
        console.log('9999999999');
        console.log(ndata.size);
        formdata1.append("img", ndata); //通过append向form对象添加数据
        // console.log(formUpload1);
        this.uploadImg(formdata1);
      },
      compress(img, Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        // 		铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
          //            计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.7);

        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log("ndata:" + ndata)

        console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;
      },
      uploadImg(formdata) {
        console.log(formdata);
        this.$axios.post(this.$store.state.baseUrl + '/imgrecv', formdata).then((res) => {
          if (res.status == 200) {
            this.$message.success({
              message: '图片上传成功',
              showClose: true,
              duration: 2000
            });
          }
          console.log('上传图片');
          console.log(res);
          let imgurl = res.data.imgurl;
          console.log(imgurl);
          if (this.imgurls.indexOf(imgurl) == -1) {
            this.imgurls.push(imgurl);
          }
          console.log(this.imgurls);
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        })
      },
      // 手表出库
      stockRemoval() {
        console.log("手表出库");
        console.log(this.sell_state);
        console.log(this.sell_stocktoken);
        this.imgurls = [];
        this.sell_sendusernick = "";
        this.dialogVisible = true;
      },
      // 确认出库
      stockRemovalSure() {
        if (this.sell_sendusernick == "") {
          this.$message.error({
            message: "提货人不能为空，请输入",
            showClose: true,
            duration: 2000
          });
        } else {
          console.log(this.id);
          let storeImgUrl5 = this.imgurls.join('|');
          this.$axios
            .post(this.$store.state.baseUrl + "/StockOutDo", {
              id: this.id,
              sell_sendusernick: this.sell_sendusernick,
              sell_stocktoken: this.barCode,
              stock_outpic: storeImgUrl5,
            })
            .then(res => {
              console.log(res);
              this.$message.success({
                message: "商品出库成功",
                showClose: true,
                duration: 2000
              });
              this.dialogVisible = false;
              this.barCode = '';
              this.outboundQuery.query = 0;
            })
            .catch(err => {
              console.log(err);
              this.$message.error({
                message: err.data.message,
                showClose: true,
                duration: 2000
              });
              this.dialogVisible = true;
            });
        }
      },
      gobackOutbound() {
        this.outboundQuery.query = 2;
      }
    }
  };

</script>
<style lang="scss" scoped>
  .product-list-container {
    width: 100%;

    .list-details {
      width: 80%;
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

    .product-container {
      .product-table {
        width: 90%;
        margin: 10px auto;
        padding: 10px;
        background-color: #fff;
        border-radius: 30px;
      }

      td {
        height: 60px;
        margin: 10px 0;
        padding-top: 10px;
        padding-bottom: 10px;
        padding-left: 10px;
        background-color: #f2f5f7;
        font-size: 17px;
      }

      .first-img {
        width: 100px;
        height: 100px;
        border-radius: 30px;
        object-fit: cover;
      }
    }
  }

  .upload-imgs {
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    display: flex;

    .add {
      width: 100px;
      height: 100px;
      position: relative;
      border: 1px solid #ddd;
      border-radius: 5px;
      display: flex;

      .addIcon {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 45%;
        left: 25%;
        z-index: 1;
      }

      .inputUpload {
        position: absolute;
        display: block;
        width: 100px;
        height: 100px;
        opacity: 0;
        cursor: pointer;
        z-index: 999;
      }
    }

    .previewImg {
      display: flex;
      z-index: 1;
    }
  }

  .spanStyle {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 1px;
    right: 1px;
    text-align: center;
    line-height: 0.7;
    background-color: rgb(221, 221, 221);
    color: rgb(255, 255, 255);
    border: 1px solid rgb(221, 221, 221);
    border-radius: 50%;
    z-index: 999;
    cursor: pointer;
  }

  .previewImg2 {
    display: flex;
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

    .td-center {
      padding-right: 5%;
    }
  }

  @media screen and (min-width: 1251px) and (max-width: 1650px) {
    .back-img {
      width: 15%;
    }

    .td-center {
      padding-right: 20%;
    }
  }

  @media screen and (min-width: 986px) and (max-width: 1250px) {
    .back-img {
      width: 18%;
    }

    .td-center {
      padding-right: 28%;
    }
  }

  @media screen and (max-width: 985px) {
    .back-img {
      width: 21%;
    }

    .td-center {
      padding-right: 35%;
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
        width: 32%;
        text-align: center;
        border: 0;
      }
    }
  }

</style>
