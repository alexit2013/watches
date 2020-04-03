<template>
  <div class="drawback-container" id="drawback-container">
    <!-- <h1>退税</h1> -->
    <div class="drawback-top">
      <div class="top-form">
        <span class="top-span">是否退税</span>
        <el-switch v-model="buy_taxState" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
    <div class="drawback-center" v-if="buy_taxState == true">
      <el-form label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="退税方式：" class="input-style">
              <el-select v-model="buy_taxtype" @change="taxtypeChange">
                <el-option value="现金">现金</el-option>
                <el-option value="退到银行卡">退到银行卡</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="公司名称：">
              <el-input v-model="buy_taxcompany" placeholder="请输入退税公司名称" class="input-style"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="负责人：">
              <el-input v-model="buy_taxperson" placeholder="请输入退税负责人" class="input-style"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="应退金额：">
              <el-input v-model="buy_taxmoney" class="input-style">
                <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{buy_taxcurrency}}</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="13">
            <el-form-item label="退税日期：">
              <el-date-picker v-model="buy_taxrecvtime" type="date" class="input-style"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="实退金额：">
              <el-input v-model="buy_taxrecvmoney" class="input-style">
                <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">{{buy_taxrecvcurrency}}</i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="drawback-upload">
        <h1 style="margin-top: 0;font-weight: normal; font-size: 24px;">税单图片：</h1>
        <div style="display:flex;">
          <div class="upload-imgs">
            <div class="add">
              <div id="previewImg">
                <form enctype="multipart/form-data" style="width:100px;height:100px;">
                  <input @change="inputChange1($event)" type="file" name="upload-images" accept="image/*"
                    class="inputUpload" multiple />
                  <i class="el-icon-plus addIcon"></i>
                </form>
              </div>
              <div style="display:flex;position:relative;" id="delImg">
                <div v-for="(imgurl,index) of imgSrc" :key="index" style="margin-left:10px;position:relative;">
                  <span class="spanStyle" @click="delImage(index)">x</span>
                  <img :src="img + imgurl" width="100px" height="100px" style="border-radius:5px;object-fit:cover;" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="drawback-submit">
      <img src="../../assets/imgs/save.png" @click="submitDrawback" />
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        img: this.$store.state.baseUrl,
        buy_watchcurrency: '',
        buy_taxState: true, // 是否有退税
        buy_taxtype: "退到银行卡", // 退税方式
        buy_taxcompany: "", // 退税公司名称
        buy_taxperson: "", // 退税负责人
        buy_taxmoney: "", // 应退金额
        buy_taxcurrency: "", // 应退金额币种
        buy_taxrecvtime: new Date(), // 退税日期
        buy_taxrecvmoney: "", // 实退金额
        buy_taxrecvcurrency: "", //实退金额币种
        tax: {},
        imgSrc: [],
      };
    },
    created() {
      this.acquire();
    },
    methods: {
      // 获取退税信息
      acquire() {
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyOrderGet", {
            buy_id: sessionStorage.getItem("buy_id")
          })
          .then(res => {
            for (let item of res.data.watch) {
              this.buy_taxcurrency = item.buy_watchcurrency;
            }
            this.tax = res.data.tax;
            console.log("退款");
            console.log(this.tax);
            if (this.buy_taxtype == "退到银行卡") {
              this.buy_taxrecvcurrency = 'CNY';
            } else if (this.buy_taxtype == "现金") {
              this.buy_taxrecvcurrency = this.buy_taxcurrency;
            }
            if (this.tax.buy_taxState == -1) {
              this.buy_taxState = false;
            } else if (this.tax.buy_taxState == 0 || this.tax.buy_taxState == 1) {
              this.buy_taxState = true;
              if (this.tax.buy_taxtype == 0) {
                this.buy_taxtype = "退到银行卡";
                this.buy_taxrecvcurrency = 'CNY';
              } else if (this.tax.buy_taxtype == 1) {
                this.buy_taxtype = "现金";
                this.buy_taxrecvcurrency = this.buy_taxcurrency;
              }
              this.buy_taxcompany = this.tax.buy_taxcompany;
              this.buy_taxperson = this.tax.buy_taxperson;
              this.buy_taxmoney = this.tax.buy_taxmoney;
              this.buy_taxrecvtime = this.tax.buy_taxrecvtime;
              this.buy_taxrecvmoney = this.tax.buy_taxrecvmoney;
              console.log("mmmm");
              console.log(this.tax);
              if (this.tax.buy_taxpic !== null) {
                this.imgSrc = this.tax.buy_taxpic.split("|");
              } else {
                this.imgSrc = [];
              }
              console.log(this.imgSrc);
            }
          });
      },
      // 删除图片
      delImage(index) {
        this.imgSrc.splice(index, 1);
      },
      // 上传图片
      inputChange1(file) {
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
            console.log("赵钱孙李");
            let imgurl = res.data.imgurl;
            if (this.imgSrc.indexOf(imgurl) == -1) {
              this.imgSrc.push(imgurl);
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
      // 退税方式改变币种
      taxtypeChange() {
        console.log(this.buy_taxcurrency);
        if (this.buy_taxtype == "退到银行卡") {
          this.buy_taxrecvcurrency = 'CNY';
        } else if (this.buy_taxtype == "现金") {
          this.buy_taxrecvcurrency = this.buy_taxcurrency;
        }
      },
      // 提交退税信息
      submitDrawback() {
        console.log("萝卜青菜");
        let storeImgUrl1 = this.imgSrc.join('|');
        console.log(this.buy_taxState);
        console.log(storeImgUrl1);
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyTaxSave", {
            buy_id: sessionStorage.getItem("buy_id"),
            buy_taxState: this.buy_taxState == true ? 1 : -1,
            buy_taxtype: this.buy_taxState == true ?
              this.buy_taxtype == "现金" ?
              1 :
              0 : "",
            buy_taxcompany: this.buy_taxState == true ? this.buy_taxcompany : "",
            buy_taxperson: this.buy_taxState == true ? this.buy_taxperson : "",
            buy_taxmoney: this.buy_taxState == true ? this.buy_taxmoney : "",
            buy_taxcurrency: this.buy_taxState == true ? this.buy_taxcurrency : "",
            buy_taxrecvtime: this.buy_taxState == true ?
              this.shellDate(this.buy_taxrecvtime) : "",
            buy_taxrecvmoney: this.buy_taxState == true ? this.buy_taxrecvmoney : "",
            // this.buy_taxrecvcurrency
            buy_taxrecvcurrency: this.buy_taxtype == "现金" ? this.buy_taxcurrency : "CNY",
            buy_taxpic: this.buy_taxState == true ? storeImgUrl1 : ""
          })
          .then(res => {
            console.log("退税返回数据");
            console.log(res);
            this.$message.success({
              message: "退税信息保存成功",
              showClose: true,
              duration: 2000
            });
            this.$emit("listenDrawback", res.data.buy_taxState);
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
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          });
      }
    }
  };
</script>
<style lang="scss" scoped>
  .drawback-container {
    width: 100%;

    .drawback-top {
      width: 100%;

      @media screen and (min-width: 1401px) {
        .top-form {
          width: 25%;
        }
      }

      @media screen and (max-width: 1400px) {
        .top-form {
          width: 40%;
        }
      }

      .top-form {
        height: 80px;
        padding-left: 40px;
        line-height: 80px;
        background-color: #fff;
        border-radius: 30px;

        .top-span {
          margin-right: 30%;
          font-size: 23px;
        }
      }
    }

    .drawback-center {
      width: 100%;
      margin: 40px 0;
      padding: 40px 20px;
      padding-left: 0;
      background-color: #fff;
      border-radius: 30px;

      .drawback-upload {
        padding: 40px;
        padding-top: 20px;
        padding-bottom: 0;
      }
    }

    .drawback-submit {
      width: 100%;
      margin-top: 30px;
      text-align: right;

      img {
        cursor: pointer;
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
      display: flex;

      .addIcon {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 44.5%;
        left: 44%;
        z-index: 1;
      }

      .inputUpload {
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        opacity: 0;
        cursor: pointer;
        z-index: 999;
      }
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

  #previewImg {
    width: 100px;
    height: 100px;
    position: relative;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  .previewImg,
  .previewImg2 {
    display: flex;
  }

  .previewImg2 {
    z-index: 9999;
  }

  .input-style {
    width: 100% !important;
  }
</style>
<style lang="scss">
  #drawback-container {
    .el-input__inner {
      height: 45px;
      border-radius: 30px;
    }

    .el-input__prefix,
    .el-input__suffix {
      top: 2px;
    }

    .el-switch {
      height: 80px;
      line-height: 80px;
    }

    .el-switch__core {
      width: 60px !important;
      height: 30px;
      border-radius: 30px;
    }

    .el-switch__core:after {
      top: 6px;
    }

    .el-form-item__label {
      font-size: 16px;
      text-align: right;
    }
  }
</style>