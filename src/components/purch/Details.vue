<template>
  <div class="details-container">
    <div class="details">
      <div class="details-bar">
        <div class="back-img" @click="goback">
          <img src="../../assets/imgs/goback.png" style="cursor: pointer;" @click="goback" />
          <span class="font">Record</span>
        </div>
        <ul class="menu">
          <li ref="msg" style="color:#000;">
            <div>
              <span @click="watchInfo">手表信息</span>
              <img class="jump-img" :src="watchstate == 1 ? watchimg1 : watchimg2" />
            </div>
            <div v-if="detailsSelect.num == 0" class="line"></div>
          </li>
          <li ref="pay">
            <div>
              <span @click="payPage">付款</span>
              <img class="jump-img" :src="paystate == 1 ? watchimg1 : watchimg2" />
            </div>
            <div v-if="detailsSelect.num == 1" class="line"></div>
          </li>
          <li ref="drawback">
            <div>
              <span @click="drawbackPage">退税</span>
              <img class="jump-img"
                :src="drawbackstate == 1 ? watchimg1 : (drawbackstate == 0 ? watchimg2 : watchimg3)" />
            </div>
            <div v-if="detailsSelect.num == 2" class="line"></div>
          </li>
          <li ref="tip">
            <div>
              <span @click="tipPage">小费</span>
              <img class="jump-img" :src="tipstate == 1 ? watchimg1 : (tipstate == 0 ? watchimg2 : watchimg3)" />
            </div>
            <div v-if="detailsSelect.num == 3" class="line"></div>
          </li>
        </ul>
      </div>
      <div class="main-info">
        <div class="info">
          <Watch-info v-if="detailsSelect.num == 0" @listenWatchInfo="listenWatch"></Watch-info>
          <Pay-page v-if="detailsSelect.num == 1" @listenPay="listenPay"></Pay-page>
          <Drawback-page v-if="detailsSelect.num == 2" @listenDrawback="listenDrawback"></Drawback-page>
          <Tip-page v-if="detailsSelect.num == 3" @listenTip="listenTip"></Tip-page>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        watches: [],
        watchstate: 0,
        paystate: 0,
        drawbackstate: 0,
        tipstate: 0,
        watchimg1: require("../../assets/imgs/sureImg.png"),
        watchimg2: require("../../assets/imgs/error.png"),
        watchimg3: require("../../assets/imgs/noContainer.png"),
      }
    },
    mounted() {
      console.log('传递个哦来的');
      console.log(this.detailsSelect.num);
      if (this.detailsSelect.num == 0) {
        this.watchInfo()
      } else if (this.detailsSelect.num == 1) {
        this.payPage();
      } else if (this.detailsSelect.num == 2) {
        this.drawbackPage();
      } else if (this.detailsSelect.num == 3) {
        this.tipPage();
      }
      this.detailState();
    },
    props: ["detailsSelect"],
    // watch: {
    //   watchstate() {
    //     this.$emit("changeMsg", this.watchstate);
    //   },
    //   paystate() {
    //     this.$emit("changeMsg", this.paystate);
    //   },
    //   drawbackstate() {
    //     this.$emit("changeMsg", this.drawbackstate);
    //   },
    //   tipstate() {
    //     this.$emit("changeMsg", this.tipstate);
    //   }
    // },
    methods: {
      // 返回我的采购商品列表页
      goback() {
        this.$emit("goback", 0);
        this.$emit('shippingState', 0);
      },
      listenWatch(watchstate) {
        console.log('详细信息填写页面');
        console.log(watchstate);
        this.$emit("watchstate", watchstate);
        // this.watchstate = watchstate;
        this.detailState();
      },
      listenPay(paystate) {
        console.log("详细信息付款");
        this.paystate = paystate;
      },
      listenDrawback(drawbackstate) {
        console.log('详细信息填写页面退税');
        console.log(drawbackstate);
        this.drawbackstate = drawbackstate;
      },
      listenTip(tipstate) {
        this.tipstate = tipstate;
      },
      // 获取采购单详细信息
      detailState() {
        console.log('获取采购单详细信息id');
        console.log(sessionStorage.getItem("buy_id"));
        this.$axios.post(this.$store.state.baseUrl + '/BuyOrderGet', {
          buy_id: sessionStorage.getItem("buy_id")
        }).then((res) => {
          console.log('采购单详细信息ggggggg');
          console.log(res.data);
          this.watches = res.data.watch;
          let ss = [];
          for (let state of this.watches) {
            console.log('woshiyige粉刷匠');
            console.log(state);
            ss.push(state.buy_watchState);
          }
          if (ss.indexOf(0) !== -1) {
            this.watchstate = 0;
          } else {
            this.watchstate = 1;
          }
          sessionStorage.setItem("watchstate", this.watchstate);
          console.log(this.watchstate);
          console.log('ffffffffffffffff');
          this.paystate = res.data.pay.buy_payState;
          this.drawbackstate = res.data.tax.buy_taxState;
          this.tipstate = res.data.fee.buy_feeState;
          console.log('详细信息填写页面ggggggg');
          console.log(res.data);
          console.log(this.watchstate + "--" + this.paystate + "--" + this.drawbackstate + "--" + this.tipstate);
        })
      },
      watchInfo() {
        this.detailsSelect.num = 0;
        this.$refs.msg.style.color = "#000";
        this.$refs.pay.style.color = "#999999";
        this.$refs.drawback.style.color = "#999999";
        this.$refs.tip.style.color = "#999999";
      },
      payPage() {
        this.detailsSelect.num = 1;
        this.$refs.msg.style.color = "#999999";
        this.$refs.pay.style.color = "#000";
        this.$refs.drawback.style.color = "#999999";
        this.$refs.tip.style.color = "#999999";
      },
      drawbackPage() {
        this.detailsSelect.num = 2;
        this.$refs.msg.style.color = "#999999";
        this.$refs.pay.style.color = "#999999";
        this.$refs.drawback.style.color = "#000";
        this.$refs.tip.style.color = "#999999";
      },
      tipPage() {
        this.detailsSelect.num = 3;
        this.$refs.msg.style.color = "#999999";
        this.$refs.pay.style.color = "#999999";
        this.$refs.drawback.style.color = "#999999";
        this.$refs.tip.style.color = "#000";
      }
    },
  }

</script>
<style lang="scss" scoped>
  .details-container {
    margin: 0 auto;

    .details {
      width: 100%;
      margin: 0 auto;
    }

    .details-bar {
      margin-bottom: 50px;
      display: flex;
      justify-content: space-around;

      .back-img {
        height: 65px;
        line-height: 65px;
        display: flex;
        justify-content: space-around;
        cursor: pointer;

        .font {
          font-size: 30px;
          color: #2d4e65;
        }
      }

      .menu {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        padding-left: 0;
        margin: 0;

        li {
          height: 65px;
          line-height: 65px;
          display: inline-block;
          list-style: none;
          color: #fff;
          font-size: 28px;
          text-align: center;

          span {
            cursor: pointer;
          }
        }

        .jump-img {
          width: 24px;
          height: 24px;
          margin-left: 10px;
        }

        .line {
          width: 30px;
          height: 6px;
          margin: 0 auto;
          background-color: #f74a50;
        }
      }
    }

    .main-info {
      width: 100%;

      .info {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }

  @media screen and (min-width: 1501px) {
    .details-container {
      width: 90%;
    }
  }

  @media screen and (max-width: 1500px) {
    .details-container {
      width: 95%;
    }
  }

  @media screen and (min-width: 1651px) {
    .back-img {
      width: 12%;
    }
  }

  @media screen and (min-width: 1101px) and (max-width: 1650px) {
    .back-img {
      width: 15%;
    }
  }

  @media screen and (min-width: 986px) and (max-width: 1100px) {
    .back-img {
      width: 18%;
    }
  }

  @media screen and (max-width: 985px) {
    .back-img {
      width: 21%;
    }
  }

</style>
