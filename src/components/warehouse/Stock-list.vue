<template>
  <div class="stock-pending-container">
    <!-- <h1>待入库手表</h1> -->
    <div v-if="stock1.num == 0">
      <div style="text-align: center;">
        <div class="stockSearch">
          <input placeholder="请输入机芯号进行搜索" class="el-input__inner" v-model="keyword" @input="stockInSearch" />
        </div>
      </div>
      <div v-show="stockList.length == 0" ref="hello" style="margin-top: 30px;text-align: center;">
        <p>数据加载中...</p>
      </div>
      <div v-if="stockList.length !== 0">
        <div style="width: 98%;margin: 0 auto;">
          <p style="font-size: 20px;">待入库手表数量： {{count}}</p>
        </div>
        <div class="stock-container">
          <div class="stock-list">
            <div v-if="keyword == ''">
              <div v-for="(item,index) in stockList" :key="index" style="margin-top: 10px;">
                <div class="purchase-row">
                  <span class="purchase-number">物流单号: {{" " + item.LOG_id}}</span>
                  <span class="purchase-date">发货时间: {{item.LOG_sendtime}}</span>
                </div>
                <table>
                  <tr>
                    <th>负责人</th>
                    <th>货物数量</th>
                    <th>预计到达时间</th>
                    <th>操作</th>
                  </tr>
                  <tr>
                    <td class="first-td">{{item.nick}}</td>
                    <td>{{item.LOG_watch.length}}</td>
                    <td>{{item.LOG_arrivetime}}</td>
                    <td class="last-td">
                      <el-button type="text" @click="stockListJump(item.LOG_watch)">查看手表详情</el-button>
                    </td>
                  </tr>
                </table>
              </div>
              <div style="width: 100%;height: 50px;">
                <div style="margin:15px 0;position:absolute;right:6%;">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="page" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
                </div>
              </div>
            </div>
            <div v-if="keyword !== ''">
              <div v-show="stockPending.length == 0" ref="keywordText" style="width: 100%; text-align: center;">
                <p>数据加载中...</p>
              </div>
              <table v-show="stockPending.length !== 0" class="stocktable">
                <tr>
                  <th>图片</th>
                  <th>品牌</th>
                  <th>型号</th>
                  <th>机芯号</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(items,index) in stockPending" :key="index">
                  <td class="first-td">
                    <img v-image-preview
                      :src="items.buy_watchpics == null || items.buy_watchpics == '' ? '' : img + '/img/watch/'+ (items.buy_watchpics || '').split('|')[0]"
                      style="width: 100px;height: 100px;object-fit: cover;border-radius: 30px;" />
                  </td>
                  <td>{{items.buy_watchbrand}}</td>
                  <td>{{items.buy_watchmodel}}</td>
                  <td>{{items.buy_watchsn}}</td>
                  <td class="last-td">
                    <el-button type="text" @click="stockPendingButton(items)">入库</el-button>
                    <el-dialog title="入库" :visible.sync="dialogVisible" :close-on-press-escape="false"
                      :close-on-click-modal="false">
                      <div style="text-align: left;">
                        <div>
                          <el-form label-width="120px" style="padding-top: 10px;">
                            <el-form-item label="手表状态：">
                              <div style="display: flex;">
                                <el-radio v-model="radioWatch" label="1">全新</el-radio>
                                <el-radio v-model="radioWatch" label="2">二手</el-radio>
                                <el-checkbox-group v-model="watchState">
                                  <el-checkbox label="有划痕" name="有划痕"></el-checkbox>
                                  <el-checkbox label="保卡" name="保卡"></el-checkbox>
                                </el-checkbox-group>
                              </div>
                            </el-form-item>
                            <el-form-item label="仓库货架号:">
                              <el-input v-model="stock_shelfNo_A" style="width: 60%;"></el-input>
                            </el-form-item>
                          </el-form>
                        </div>
                        <div style="margin: 30px;">
                          <div style="margin: 15px 0;">
                            <div>
                              <span>商品图片：（同保卡一起拍）</span>
                            </div>
                            <div style="display:flex;">
                              <div class="upload-imgs">
                                <div class="add">
                                  <form :id="items.buy_watchsn" enctype="multipart/form-data">
                                    <input @change="inputChange($event,items.buy_watchsn)" type="file" name="img"
                                      accept="image/*" class="inputUpload" multiple />
                                    <i class="el-icon-plus addIcon"></i>
                                  </form>
                                </div>
                                <div style="display:flex;position:relative;" id="delImg">
                                  <div v-for="(imgurl,index) of imgurls" :key="index"
                                    style="margin-left:10px;position:relative;">
                                    <span class="spanStyle" @click="delImage(index)">x</span>
                                    <img :src="img + imgurl" width="100px" height="100px"
                                      style="border-radius:5px;object-fit:cover;" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <el-button type="primary" @click="getQRCode" style="width: 40%;">打印二维码</el-button>
                          </div>
                        </div>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="sureStockProduct(items.id)">确 定</el-button>
                      </div>
                    </el-dialog>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="stock-body" v-if="stock1.num == 1">
      <Stock-pending :watchList="watchList" @gobackStockList="gobackStockList"></Stock-pending>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        dialogVisible: false,
        count: 0,
        page: 1,
        pagenum: 10,
        total: 0,
        stockList: [], // 待入库物流
        stockPending: [],
        keyword: "", // 模糊搜索关键词
        watchList: [], // 每个物流单号对应的手表列表
        QRCodeMsg: "", //生成二维码信息
        watchState: [], // 手表状态
        stock_instateA: "",
        stock_shelfNo_A: "", // 仓库货架号
        stock_inpic: "",
        imgurls: [],
        buy_watchbrand: "",
        buy_watchmodel: "",
        stock_No: "",
        stock_Nocrc: "",
        radioWatch: "1",
        radiowatchs: ""
      };
    },
    props: ["stock1"],
    created() {
      this.getCount();
      this.getStockInList();
    },
    methods: {
      gobackStockList(val) {
        this.stock1.num = val;
        this.getCount();
        this.getStockInList();
      },
      // 待入库手表数量
      getCount() {
        this.$axios
          .post(this.$store.state.baseUrl + "/StockInCount")
          .then(res => {
            console.log("待入库数量");
            console.log(res);
            this.count = res.data.count;
            this.$emit('getStockCount', this.count);
          });
      },
      // 获取待入库手表列表
      getStockInList() {
        this.$axios
          .post(this.$store.state.baseUrl + "/StockInList", {
            page: this.page,
            pagenum: this.pagenum
          })
          .then(res => {
            console.log("待入库手表列表");
            console.log(res);
            this.total = res.data.total;
            this.stockList = res.data.lst;
            if (this.stockList.length == 0) {
              this.$refs.hello.innerText = "啊哦~ 暂无数据";
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 模糊搜索
      stockInSearch() {
        this.stockPending = [];
        if (this.keyword !== "") {
          this.$axios
            .post(this.$store.state.baseUrl + "/StockInSearch", {
              keyword: this.keyword
            })
            .then(res => {
              console.log("模糊搜索获取待入库手表");
              console.log(res);
              this.stockPending = res.data;
              if ((this.stockPending.length == 0)) {
                this.$refs.keywordText.innerText =
                  "啊哦~没有符合条件的商品，请重新输入关键字";
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else if (this.keyword == "") {
          this.stockPending = [];
          this.stockList = [];
          this.page = 1;
          this.getStockInList();
        }
      },
      // 跳转本物流单号内手表展示页面
      stockListJump(watch) {
        console.log(watch);
        this.watchList = watch;
        this.stock1.num = 1;
        console.log("dscfdsvfc2222222222");
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
        this.getStockInList();
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 打开入库弹窗页面
      stockPendingButton(items) {
        console.log(items);
        this.buy_watchbrand = items.buy_watchbrand;
        this.buy_watchmodel = items.buy_watchmodel;
        this.stock_No = items.stock_No;
        this.stock_Nocrc = items.stock_Nocrc;
        this.imgurls = [];
        this.radioWatch = "1";
        this.watchState = [];
        this.stock_instateA = "";
        this.stock_shelfNo_A = "";
        this.dialogVisible = true;
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
        this.$axios
          .post(this.$store.state.baseUrl + "/imgrecv", formdata)
          .then(res => {
            if (res.status == 200) {
              this.$message.success({
                message: "图片上传成功",
                showClose: true,
                duration: 2000
              });
            }
            console.log(res);
            let imgurl = res.data.imgurl;
            if (this.imgurls.indexOf(imgurl) == -1) {
              this.imgurls.push(imgurl);
            }
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
      // 打印二维码
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
              message: "条码打印失败",
              showClose: true,
              duration: 2000
            });
          });
      },
      // 入库前数据的验证
      verification() {
        console.log(this.watchState);
        this.stock_instateA = "";
        if (this.watchState.length > 1) {
          this.stock_instateA = this.watchState.join('|');
        } else {
          this.stock_instateA = this.watchState[0];
        }
        console.log(this.stock_instateA);
      },
      // 模糊搜索指定的手表入库
      sureStockProduct(id) {
        console.log(id);
        if (this.verification() !== 1) {
          console.log("萝卜青菜");
          let storeImgUrl3 = this.imgurls.join('|');
          if (this.radioWatch == "1") {
            this.radiowatchs = "全新";
          } else if (this.radioWatch == "2") {
            this.radiowatchs = "二手";
          }
          console.log(this.radiowatchs);
          if (this.stock_instateA !== undefined) {
            this.stock_instateA = this.radiowatchs + "|" + this.stock_instateA;
          } else if (this.stock_instateA == undefined) {
            this.stock_instateA = this.radiowatchs;
          }
          this.$axios
            .post(this.$store.state.baseUrl + "/StockInDo", {
              id: id,
              stock_instateA: this.stock_instateA,
              stock_shelfNo_A: this.stock_shelfNo_A,
              stock_inpic: storeImgUrl3
            })
            .then(res => {
              console.log("是否入库成功");
              console.log(res);
              this.$message.success({
                message: "手表入库成功",
                showClose: true,
                duration: 2000
              });
              this.dialogVisible = false;
              this.keyword = "";
              this.getCount();
              this.getStockInList();
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
    }
  };
</script>
<style lang="scss" scoped>
  .stock-pending-container {
    width: 90%;
    margin: 0 auto;

    .stock-container {
      width: 100%;
      margin: 0 auto;
    }

    .stockSearch {
      // position: relative;

      .el-input__inner {
        width: 600px;
        height: 48px;
        // position: absolute;
        // top: -60px;
        // right: 450px;
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

    .stock-list {
      margin-top: 30px;

      .stocktable {
        border-radius: 30px;
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

      td {
        height: 60px;
        padding: 20px;
        margin: 10px 0;
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
        left: 45%;
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

    .previewImg {
      display: flex;
      z-index: 1;
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0 15px;
    padding: 30px;
    background-color: #fff;
    border-radius: 30px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;

    tr {

      th,
      td {
        width: 16%;
        text-align: center;
        border: 0;
      }
    }
  }

  .el-radio,
  .el-radio__input {
    line-height: 3;
  }
</style>
<style lang="scss">
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
</style>