<template>
  <div class="container" id="container-home">
    <el-container class="container">
      <!-- min-height:1560px; -->
      <el-aside class="aside" style="width:324px;height: 100%;position: fixed;left: 0;">
        <div class="aside-container">
          <div style="width: 180px;margin: 0 auto;padding-bottom: 10px;border-bottom:1px solid #f1f1f1;">
            <img src="../../assets/imgs/logo.png" class="logoImg" />
          </div>
          <!-- 管理 -->
          <ul class="person-ul" v-if="role == 1">
            <li @click="admin1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 1 ? newProduct2 : newProduct1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="purchase icon" style="color:#2e4d65;margin-right: 0;" ref="statistics">统计</span>
                  <span v-show="adminLine == 1" class="span-line-style"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 2 ? my2 : my1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="settleAccounts" @click="admin2">结算</span>
                  <span v-show="adminLine == 2" class="span-line-style"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 3 ? my4 : my3" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="finalStament" @click="admin3">结算单</span>
                  <span v-show="adminLine == 3" class="span-line-style"></span>
                </div>
              </div>
            </li>
            <li v-show="peerFlag == 1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 4 ? peerImg2 : peerImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="peerAdmin3" @click="admin4">贸易商管理</span>
                  <span v-show="adminLine == 4" class="span-line-style"></span>
                </div>
              </div>
            </li>
            <li v-show="marketPriceFlag == 1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 5 ? priceAdminImg2 : priceAdminImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="priceAdmin3" @click="admin5">批发价管理</span>
                    <p v-if="dataMaketPriceCount > 0"
                      style="width: 10px; height: 10px;margin: 0;background-color: red;border-radius: 50%;"></p>
                  </div>
                  <span v-show="adminLine == 5" class="span-line-style"></span>
                </div>
              </div>
            </li>
            <li v-show="marketPriceFlag == 0">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 6 ? priceInquireImg2 : priceInquireImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="priceInquire3"
                    @click="admin6">批发价查询</span>
                  <span v-show="adminLine == 6" class="span-line-style"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 7 ? storeImg1 : storeImg2" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="storeQuery3" @click="admin7">店铺查询</span>
                  <span v-show="adminLine == 7" class="span-line-style"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 8 ? rateImg1 : rateImg2" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="rateQuery2" @click="admin8">汇率查询</span>
                  <span v-show="adminLine== 8" class="span-line-style"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 9 ? myReimImg1 : myReimImg2" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="reimbursement4"
                    @click="admin9">我的报销</span>
                  <span v-show="adminLine== 9" class="span-line-style"></span>
                </div>
              </div>
            </li>
          </ul>
          <!-- 采购 -->
          <ul class="person-ul" v-if="role == 2">
            <li class="first-li">
              <div @click="closeAndOpen1"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/msg-search.png" />
                  <p class="icon" style="color:#fff;margin: 0;">实用信息查询</p>
                </div>
                <i id="arrows" class="el-icon-arrow-up"></i>
              </div>
              <ul id="openOrClose" class="open">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 10 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;color: #0c7063;" ref="watchQuery"
                    @click="selected10">
                    手表查询</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 9 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="storeQuery" @click="selected9">
                    店铺查询</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 6 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="peerAdmin" @click="selected6">
                    贸易商管理</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 11 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="rateQuery" @click="selected11">
                    汇率查询</p>
                </li>
                <li v-show="marketPriceFlag == 1" class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 7 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="priceAdmin" @click="selected7">批发价管理</span>
                    <p v-show="dataMaketPriceCount > 0" class="selected-circle-style">
                    </p>
                  </div>
                </li>
                <li v-show="marketPriceFlag == 0" class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 8 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="priceInquire" @click="selected8">
                    批发价查询</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 5 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="statement" @click="selected5">结算单
                  </p>
                </li>
              </ul>
            </li>
            <li class="first-li">
              <div @click="closeAndOpen2"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/cargo.png" />
                  <p class="icon" style="color:#fff;margin: 0;">采购货物管理</p>
                </div>
                <i id="arrows2" class="el-icon-arrow-down"></i>
              </div>
              <ul id="openOrClose2" class="close">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 1 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="purchase icon" style="margin: 0;text-align: left;" ref="purchase"
                    @click="selected1($event)">代理商采购</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 3 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="purchase icon" style="margin: 0;text-align: left;" ref="trade" @click="selected3">贸易商采购</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 2 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="myPur"
                    @click="closeAndOpen($event)">我的采购</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 4 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="logisticsView"
                    @click="selected4">物流查询</p>
                </li>
              </ul>
            </li>
            <li class="first-li">
              <div @click="closeAndOpen3"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/capital.png" />
                  <p class="icon" style="color:#fff;margin: 0;">采购资金管理</p>
                </div>
                <i id="arrows3" class="el-icon-arrow-down"></i>
              </div>
              <ul id="openOrClose3" class="close">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 14 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="taxes" @click="selected14">税金管理
                  </p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 15 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="commission" @click="selected15">
                    佣金管理</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 16 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="tipAdmin" @click="selected16">
                    小费管理</p>
                </li>
              </ul>
            </li>
            <li class="first-li">
              <div @click="closeAndOpen4"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/work.png" />
                  <p class="icon" style="color:#fff;margin: 0;">企业在线办公</p>
                </div>
                <i id="arrows4" class="el-icon-arrow-down"></i>
              </div>
              <ul id="openOrClose4" class="close">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 12 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="reimbursement"
                    @click="selected12">我的报销</p>
                </li>
                <li v-show="financeFlag == 1" class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (selected == 13 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="reimbursementAdmin" @click="selected13">报销管理</span>
                    <p v-if="reimData == 1" class="selected-circle-style"></p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <!-- 仓库 -->
          <ul class="person-ul" v-if="role == 3">
            <li class="first-li">
              <div @click="warehouseCloseAndOpen"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/msg-search.png" />
                  <p class="icon" style="color:#fff;margin: 0;">实用信息查询</p>
                </div>
                <i id="warehouseArrows" class="el-icon-arrow-down"></i>
              </div>
              <ul id="warehouseOpenOrClose" class="open">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (warehouseSelect == 6 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;color: #0c7063;" ref="watchQuery2"
                    @click="select8">手表查询</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (warehouseSelect == 7 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="rateQuery3" @click="select9">汇率查询
                  </p>
                </li>
              </ul>
            </li>
            <li class="first-li">
              <div @click="warehouseCloseAndOpen2"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/cargo.png" />
                  <p class="icon" style="color:#fff;margin: 0;">仓库货物管理</p>
                </div>
                <i id="warehouseArrows2" class="el-icon-arrow-down"></i>
              </div>
              <ul id="warehouseOpenOrClose2" class="close">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (warehouseSelect == 0 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <div style="display: flex;" @click="select1($event)">
                    <span class="icon" style="margin-right: 0;color:#2e4d65;" ref="stock">待入库</span>
                    <p v-show="stockInCount !== 0" class="selected-circle-style"></p>
                  </div>
                </li>
                <!-- <li>
                  <div @click="select3($event)"
                    style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                    <img class="icon icon-size"
                      :src="warehouseSelect == 2 || warehouseSelect == 3 ? tabarImg4 : tabarImg3" />
                    <div style="width: 100%;display: flex;justify-content: space-between;">
                      <span class="icon" style="margin-right: 0;" ref="inventory">库存</span>
                      <span v-show="stockLine == 2" class="span-line-style"></span>
                    </div>
                  </div>
                  <ul id="haveAndNot" class="close">
                    <li @click="select4" ref="notOutbound">未出库</li>
                    <li @click="select5" ref="haveOutbound">已出库</li>
                  </ul>
                </li> -->
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (warehouseSelect == 2 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" @click="select4" ref="notOutbound">未出库
                  </p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (warehouseSelect == 3 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" @click="select5" ref="haveOutbound">
                    已出库
                  </p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (warehouseSelect == 4 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="icon" style="margin: 0;text-align: left;" ref="delivery" @click="select6">出库/查询</p>
                </li>
              </ul>
            </li>
            <li class="first-li">
              <div @click="warehouseCloseAndOpen3"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/work.png" />
                  <p class="icon" style="color:#fff;margin: 0;">企业在线办公</p>
                </div>
                <i id="warehouseArrows3" class="el-icon-arrow-down"></i>
              </div>
              <ul id="warehouseOpenOrClose3" class="close">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (warehouseSelect == 8 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="reimbursement2"
                    @click="select10">我的报销</p>
                </li>
                <li v-show="financeFlag == 1" class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (warehouseSelect == 9 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="reimbursementAdmin2" @click="select11">报销管理</span>
                    <p v-if="reimData == 1" class="selected-circle-style"></p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <!-- 销售 -->
          <ul class="person-ul" v-if="role == 4">
            <li class="first-li">
              <div @click="marketCloseAndOpen"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/msg-search.png" />
                  <p class="icon" style="color:#fff;margin: 0;">实用信息查询</p>
                </div>
                <i id="marketArrows" class="el-icon-arrow-down"></i>
              </div>
              <ul id="marketOpenOrClose" class="open">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 7 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;color: #0c8563;" ref="watchQuery3"
                    @click="marketSelect9">手表查询</p>
                </li>

                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 4 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="peerAdmin3"
                    @click="marketSelect6">客户管理</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 8 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="rateQuery4"
                    @click="marketSelect10">汇率查询</p>
                </li>
                <li v-show="marketPriceFlag == 1" class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 5 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="priceAdmin2" @click="marketSelect7">批发价管理</span>
                    <p v-show="dataMaketPriceCount > 0" class="selected-circle-style"></p>
                  </div>
                </li>
                <li v-show="marketPriceFlag == 0" class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 6 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="priceInquire2"
                    @click="marketSelect8">批发价查询</p>
                </li>

              </ul>
            </li>
            <li class="first-li">
              <div @click="marketCloseAndOpen2"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/cargo.png" />
                  <p class="icon" style="color:#fff;margin: 0;">销售货物管理</p>
                </div>
                <i id="marketArrows2" class="el-icon-arrow-down"></i>
              </div>
              <ul id="marketOpenOrClose2" class="close">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 0 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="icon" style="margin: 0;text-align: left;" ref="marketInventory" @click="marketSelect1">库存
                  </p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 2 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <div style="display: flex;" @click="marketSelect4">
                    <span class="icon" style="margin-right: 0;" ref="saveInProgress">进行中销售</span>
                    <p v-show="sellPendOrderCount !== 0" class="selected-circle-style"></p>
                  </div>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 3 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="icon" style="margin: 0;text-align: left;" ref="completedSales" @click="marketSelect5">已完成销售
                  </p>
                </li>

              </ul>
            </li>
            <li class="first-li">
              <div @click="marketCloseAndOpen3"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/work.png" />
                  <p class="icon" style="color:#fff;margin: 0;">企业在线办公</p>
                </div>
                <i id="marketArrows3" class="el-icon-arrow-down"></i>
              </div>
              <ul id="marketOpenOrClose3" class="close">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 9 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="reimbursement3"
                    @click="marketSelect11">我的报销</p>
                </li>
                <li v-show="financeFlag == 1" class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (marketSelect == 10 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="reimbursementAdmin3"
                      @click="marketSelect12">报销管理</span>
                    <!--   v-show="marketLine == 9" -->
                    <p v-show="reimData == 1" class="selected-circle-style"></p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
          <!-- 财务 -->
          <ul class="person-ul" v-if="role == 5">
            <li class="first-li">
              <div @click="financeCloseAndOpen1"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/msg-search.png" />
                  <p class="icon" style="color:#fff;margin: 0;">实用信息查询</p>
                </div>
                <i id="financeArrows" class="el-icon-arrow-up"></i>
              </div>
              <ul id="financeOpenOrClose" class="open">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (financeSelect == 0 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;color: #0c7063;" ref="financeWatchQuery"
                    @click="financeSelected1">
                    手表查询</p>
                </li>
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (financeSelect == 1 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="financeStoreQuery"
                    @click="financeSelected2">
                    店铺查询</p>
                </li>

                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (financeSelect == 2 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="financeRateQuery"
                    @click="financeSelected3">
                    汇率查询</p>
                </li>

                <li v-show="marketPriceFlag == 0" class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (financeSelect == 3 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="financePriceInquire"
                    @click="financeSelected4">
                    批发价查询</p>
                </li>

              </ul>
            </li>

            <li class="first-li">
              <div @click="financeCloseAndOpen2"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <div style="display: flex;">
                  <img class="icon icon-size" src="../../assets/imgs/work.png" />
                  <p class="icon" style="color:#fff;margin: 0;">企业在线办公</p>
                </div>
                <i id="financeArrows2" class="el-icon-arrow-down"></i>
              </div>
              <ul id="financeOpenOrClose2" class="close">
                <li class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (financeSelect == 4 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <p class="my-purchase icon" style="margin: 0;text-align: left;" ref="financeReimbursement"
                    @click="financeSelected5">我的报销</p>
                </li>
                <li v-show="financeFlag == 1" class="li-selected-background"
                  :style="{backgroundImage: 'url(' + (financeSelect == 5 ? coverImgUrl : baseImg) + ')', backgroundSize:'contain'}">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="financeReimbursementAdmin"
                      @click="financeSelected6">报销管理</span>
                    <p v-if="reimData == 1" class="selected-circle-style"></p>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-main class="main" style="margin-left:324px;">
        <el-backtop>
          <img src="../../assets/imgs/top.png" class="radius" />
        </el-backtop>
        <el-col :span="24" class="main-top">
          <el-row>
            <div class="main-top-right">
              <div style="display: flex;">
                <div style="display: flex;" v-show="isSearch == 0">
                  <!-- <div style="margin-top: 10px;" v-show="selected == 12 || warehouseSelect == 8 || marketSelect == 9">
                    <img src="../../assets/imgs/filtrate.png" class="filtrate" @click="filtrateMsg" />
                    <el-dialog :visible.sync="dialogFiltrateVisible" center>
                      <div>
                        <div style="margin-bottom: 30px;text-align: center;">
                          <el-checkbox-group v-model="typeList">
                            <el-checkbox label="行程报销"></el-checkbox>
                            <el-checkbox label="非行程报销"></el-checkbox>
                          </el-checkbox-group>
                        </div>
                        <el-form label-width="120px">
                          <el-form-item label="开始时间：">
                            <el-date-picker v-model="startTime" type="date" placeholder="请选择开始时间"
                              value-format="yyyy-MM-dd" class="input-style" style="width: 70%;">
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item label="结束时间：">
                            <el-date-picker v-model="endTime" type="date" placeholder="请选择结束时间"
                              value-format="yyyy-MM-dd" class="input-style" style="width: 70%;"></el-date-picker>
                          </el-form-item>
                        </el-form>
                      </div>
                      <div slot="footer">
                        <el-button @click="dialogFiltrateVisible = false">取 消</el-button>
                        <el-button type="primary" @click="filtrateMsgSure">确 定</el-button>
                      </div>
                    </el-dialog>
                  </div> -->
                  <el-input :placeholder="promptMessage" prefix-icon="el-icon-search"
                    style="width: 400px;margin-right: 20px;" v-model="fuzzyKeyword" @focus="pageSel"
                    @blur="keywordSure"></el-input>
                  <button type="primary" class="top-search-button" @click="fuzzySearch">查
                    询</button>
                </div>
                <div class="right-div" @click="updateUserClick">
                  <span class="span1">Hi，{{this.$store.state.nick}}</span>
                  <div>
                    <img src="../../assets/imgs/down.png" style="width: 15px;margin-left: 20px;" />
                  </div>
                </div>
                <div class="cut-off-rule"></div>
                <div @click="logOut" class="loginoutDiv">
                  <div style="margin-top: 3px;">
                    <img src="../../assets/imgs/logOut.png" style="width: 20px;height: 20px;" />
                  </div>
                  <span class="loginout">退出登录</span>
                </div>
              </div>
              <div class="downbtn" v-if="updateUser==0">
                <ul class="updateUl">
                  <li class="updateLi1">
                    <div class="updateP" @click="nickUpdate">
                      <div class="nick-img">
                        <div class="update-nick-img" style="display: flex;">
                          <div style="margin-top: 3px;">
                            <img src="../../assets/imgs/update-nick.png" style="width: 17px;height: 20px;" />
                          </div>
                          <span>修改昵称</span>
                        </div>
                      </div>
                    </div>
                    <el-dialog title="修改昵称" :visible.sync="nickDialogVisible" :append-to-body="true"
                      :close-on-press-escape="false" :close-on-click-modal="false" width="40%" center>
                      <div style="width:100%;padding-left:5%;display:flex;">
                        <p style="margin-right:15px;">新昵称：</p>
                        <input class="update-nick"
                          style="width: 70%;padding-left: 20px;border-radius: 30px;border: 1px solid #ddd;outline: none;"
                          type="text" v-model="newNick" placeholder="请输入新昵称" />
                      </div>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="nickDialogVisible = false" style="margin-left: 35%;">取 消</el-button>
                        <el-button type="primary" @click="updateNick">确 定</el-button>
                      </span>
                    </el-dialog>
                  </li>
                  <li class="updateLi1">
                    <div class="updateP" @click="pswUpdate">
                      <div class="psw-img">
                        <div class="update-nick-img" style="display: flex;">
                          <div style="margin-top: 3px;">
                            <img src="../../assets/imgs/update-psw.png" style="width: 17px;height: 20px;" />
                          </div>
                          <span>修改密码</span>
                        </div>
                      </div>
                    </div>
                    <el-dialog title="修改密码" :visible.sync="pswDialogVisible" :append-to-body="true"
                      :close-on-press-escape="false" :close-on-click-modal="false" width="40%" center>
                      <div style="width:100%;padding-left:5%;display:flex;">
                        <p style="margin-right:15px;">旧密码：</p>
                        <input class="update-nick"
                          style="width: 70%;padding-left: 20px;border-radius: 30px;border: 1px solid #ddd;outline: none;"
                          type="text" v-model="oldPsw" placeholder="请输入旧密码" />
                      </div>
                      <div style="width:100%;padding-left:5%;margin-top:15px;display:flex;">
                        <p style="margin-right:15px;">新密码：</p>
                        <input class="update-nick"
                          style="width: 70%;padding-left: 20px;border-radius: 30px;border: 1px solid #ddd;outline: none;"
                          type="text" v-model="newPsw" placeholder="请输入新密码" />
                      </div>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="pswDialogVisible = false" style="margin-left: 35%;">取 消</el-button>
                        <el-button type="primary" @click="updatePsw">确 定</el-button>
                      </span>
                    </el-dialog>
                  </li>
                </ul>
              </div>
            </div>
          </el-row>
        </el-col>
        <el-col :span="24" class="main-container">
          <div>
            <!-- 代理商采购 -->
            <Purchase v-if="selected == 1" :purchaseSelect="purchaseSelect" :purchasePro="purchasePro"></Purchase>
            <!-- 贸易商采购 -->
            <Peer v-if="selected == 3" :purchaseSelect="purchaseSelect"></Peer>
            <!-- 我的采购 -->
            <My-purchase ref="myPurchase" v-if="selected == 2" :selectSearch="selectSearch" :numSelect="numSelect"
              :orders="orders" @radioSel="radioSel">
            </My-purchase>
            <!-- 物流 -->
            <Logistics-view v-if="selected == 4" :logisticsView="logisticsView"></Logistics-view>
            <!-- 结算单 -->
            <Statement v-if="selected == 5"></Statement>
            <!-- 税金管理 -->
            <Taxes-admin v-if="selected == 14" :taxesSel="taxesSel"></Taxes-admin>
            <!-- 佣金管理 -->
            <Commission-admin v-if="selected == 15" :commissionSel="commissionSel"></Commission-admin>
            <!-- 小费管理 -->
            <Tip-admin v-if="selected == 16" :tipSel="tipSel" @rateCalcJump="rateCalcJump"></Tip-admin>
            <!-- 贸易商/客户管理 -->
            <Peer-admin ref="peerAdminMain" v-if="adminSelected == 4 || selected == 6 || marketSelect == 4"
              @peerSel="peerSel">
            </Peer-admin>
            <!-- 批发价管理 -->
            <Price-admin ref="priceAdminMain" v-if="adminSelected == 5 || selected == 7 || marketSelect == 5"
              :priceAdmin="priceAdmin" @priceCount="priceCount">
            </Price-admin>
            <!-- 批发价查询 -->
            <Price-inquire ref="priceInquireMain"
              v-if="financeSelect == 3 || adminSelected == 6 || selected == 8 || marketSelect == 6"
              :priceInquire="priceInquire">
            </Price-inquire>
            <!-- 店铺查询 -->
            <Store-query ref="storeQueryMain" v-if="financeSelect == 1 || adminSelected == 7 || selected == 9"
              @storeJump="storeJump" :storeQuerySel="storeQuerySel"></Store-query>
            <!-- 手表查询 -->
            <Watch-query ref="watchQueryMain"
              v-if="financeSelect == 0 || selected == 10 || warehouseSelect == 6 || marketSelect == 7"
              :watchQuerySel="watchQuerySel"></Watch-query>
            <!-- 汇率查询 -->
            <Rate-query
              v-if="financeSelect == 2 || adminSelected == 8 || selected == 11 || warehouseSelect == 7 || marketSelect == 8"
              :rateQuerySel="rateQuerySel">
            </Rate-query>
            <!-- 我的报销 -->
            <Reimbursement ref="reimbursementMain"
              v-if="financeSelect == 4 || selected == 12 || warehouseSelect == 8 || marketSelect == 9"
              :reimbursementSel="reimbursementSel" @jumpRate="jumpRate" @reimListen="reimListen" @tabSelect="tabSelect">
            </Reimbursement>
            <!-- 报销管理 -->
            <Reimbursement-admin ref="reimburseAdmin"
              v-if="financeSelect == 5 || selected == 13 || warehouseSelect == 9 || marketSelect ==10 "
              :reimbursementAdminSel="reimbursementAdminSel" @rateCalcJump="rateCalcJump" @reimListen="reimListen"
              @reimbursementKeyword="reimbursementKeyword">
            </Reimbursement-admin>
            <!-- 待入库 -->
            <Stock-list ref="stockListMain" v-if="warehouseSelect == 0" :stock1="stock1" @getStockCount="getStockCount">
            </Stock-list>
            <!-- 未出库 -->
            <Not-outbound ref="notOutboundMain" v-if="warehouseSelect == 2" :notOutbound="notOutbound"
              :notOrders="notOrders" @notKeywordChan="notKeywordChan"></Not-outbound>
            <!-- 已出库 -->
            <Have-outbound ref="haveOutboundMain" v-if="warehouseSelect == 3" :haveBound="haveBound"></Have-outbound>
            <!-- 出库/查询 -->
            <Outbound-query v-if="warehouseSelect == 4" :outboundQuery="outboundQuery"></Outbound-query>
            <!-- 待售 -->
            <For-sale ref="forsaleMain" v-if="marketSelect == 0" :forSale="forSale"></For-sale>
            <!-- 在售 -->
            <On-sale ref="onsaleMain" v-if="marketSelect == 2" :onSaleSel="onSaleSel"
              @getSellPendOrderCount="getSellPendOrderCount">
            </On-sale>
            <!-- 已完成销售 -->
            <Completed-sale ref="completedSaleMain" v-if="marketSelect == 3"></Completed-sale>
          </div>
        </el-col>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  export default {
    inject: ['reload'],
    data() {
      return {
        coverImgUrl: require('../../assets/imgs/selected.png'),
        baseImg: '',
        peerFlag: '',
        marketPriceFlag: '',
        financeFlag: '',
        stockInCount: 0,
        sellPendOrderCount: 0,
        isRouterAlive: true,
        msg: "我是home组件",
        selected: 1,
        breadList: [],
        actives: "1-1",
        updateUser: 1,
        nickDialogVisible: false,
        dialogVisible: false,
        newNick: "",
        pswDialogVisible: false,
        oldPsw: "",
        newPsw: "",
        role: 0,
        selectSearch: {
          id: 1,
          msg: 0,
          keyword: ''
        },
        logisticsView: {
          id: 1,
          logisticsV: 0
        },
        line: 1,
        stockLine: 0,
        warehouseSelect: 0,
        stock1: {
          id: 1,
          num: 0
        },
        purchaseSelect: {
          id: 1,
          nums: 0
        },
        notOutbound: {
          id: 1,
          nots: 0,
          select: 0,
        },
        notOrders: {
          notOutboundList1: [],
          total1: 0,
          totalNum1: 0
        },
        haveBound: {
          id: 1,
          have: 0
        },
        marketSelect: 0,
        marketLine: 0,
        forSale: {
          id: 1,
          sale: 0
        },
        outboundQuery: {
          id: 1,
          query: 0,
          msg: '',
        },
        adminSelected: 1,
        adminLine: 1,
        numSelect: {
          id: 0,
          select: 0
        },
        orders: {
          purchaseOrder: [],
          total: 0,
          totalNum: 0,
        },
        priceAdmin: {
          id: 0,
          select: 0,
          page: 1,
          total: 0,
          dataMaketPriceList: [],
          keyword: ''
        },
        priceInquire: {
          id: 0,
          select: 0
        },
        dataMaketPriceCount: 0,
        isFirst: false,
        purchasePro: {},
        storeQuerySel: {
          id: 0,
          select: 0
        },
        watchQuerySel: {
          id: 0,
          select: 0
        },
        rateQuerySel: {
          id: 0,
          select: 0
        },
        reimbursementSel: {
          id: 0,
          select: 0
        },
        reimbursementAdminSel: {
          id: 0,
          select: 0
        },
        commissionSel: {
          select: 0
        },
        taxesSel: {
          select: 0
        },
        tipSel: {
          select: 0
        },
        reimData: 0,
        onSaleSel: {
          select: 0
        },

        promptMessage: '',
        fuzzyKeyword: '',
        dialogFiltrateVisible: false,
        typeList: ['行程报销', '非行程报销'],
        startTime: '',
        endTime: '',
        isSearch: 0,
        financeSelect: 0,

      };
    },
    created() {
      console.log(sessionStorage.getItem('peerFlag'));
      this.peerFlag = sessionStorage.getItem('peerFlag');
      // this.peerFlag = 1;
      this.marketPriceFlag = sessionStorage.getItem('marketPriceFlag');
      this.financeFlag = sessionStorage.getItem('financeFlag');
      this.$store.state.nick = sessionStorage.getItem("nick");
      this.getBreadList();
      this.role = sessionStorage.getItem("role");
      if (this.role == 2) {
        this.selected = 10;
        this.promptMessage = '可输入手表品牌、系列、型号进行查询';
      } else if (this.role !== 2) {
        this.selected = 50;
      }
      if (this.role == 3) {
        this.warehouseSelect = 6;
        this.promptMessage = '可输入手表品牌、系列、型号进行查询';
      } else if (this.role !== 3) {
        this.warehouseSelect = 51;
      }
      if (this.role == 4) {
        this.marketSelect = 7;
        this.promptMessage = '可输入手表品牌、系列、型号进行查询';
      } else if (this.role !== 4) {
        this.marketSelect = 52;
      };
      if (this.role == 5) {
        this.financeSelect = 0;
        this.promptMessage = '可输入手表品牌、系列、型号进行查询';
      } else if (this.role !== 5) {
        this.financeSelect = 52;
      };
    },
    mounted() {
      //防止页面后退
      this.keydown();
      this.$axios.post(this.$store.state.baseUrl + '/StockInCount').then((res) => {
        this.stockInCount = res.data.count;
      });
      this.$axios.post(this.$store.state.baseUrl + '/SellPendOrderCount').then((res) => {
        this.sellPendOrderCount = res.data.count;
      });
      this.$axios.post(this.$store.state.baseUrl + "/DataMaketPriceCount").then((res) => {
        console.log(res.data.total);
        this.dataMaketPriceCount = res.data.total;
      });
      this.handleSureReimbursement();
    },
    methods: {
      closeAndOpen1() {
        let openOrClose = document.getElementById('openOrClose');
        let arrows = document.getElementById('arrows');;
        console.log(arrows);
        if (openOrClose.className == 'close') {
          openOrClose.className = 'open';
          arrows.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.selected10();
        } else if (openOrClose.className == 'open') {
          openOrClose.className = 'close';
          arrows.className = 'el-icon-arrow-down';
        };
        let openOrClose2 = document.getElementById('openOrClose2');
        let arrows2 = document.getElementById('arrows2');
        openOrClose2.className = 'close';
        arrows2.className = 'el-icon-arrow-down';
        let openOrClose3 = document.getElementById('openOrClose3');
        let arrows3 = document.getElementById('arrows3');
        openOrClose3.className = 'close';
        arrows3.className = 'el-icon-arrow-down';
        let openOrClose4 = document.getElementById('openOrClose4');
        let arrows4 = document.getElementById('arrows4');
        openOrClose4.className = 'close';
        arrows4.className = 'el-icon-arrow-down';
      },
      closeAndOpen2() {
        let openOrClose2 = document.getElementById('openOrClose2');
        let arrows2 = document.getElementById('arrows2');;
        console.log(arrows2);
        if (openOrClose2.className == 'close') {
          openOrClose2.className = 'open';
          arrows2.className = 'el-icon-arrow-up';
          this.isSearch = 1;
          this.selected1();
        } else if (openOrClose2.className == 'open') {
          openOrClose2.className = 'close';
          arrows2.className = 'el-icon-arrow-down';
        };
        let openOrClose = document.getElementById('openOrClose');
        let arrows = document.getElementById('arrows');
        openOrClose.className = 'close';
        arrows.className = 'el-icon-arrow-down';
        let openOrClose3 = document.getElementById('openOrClose3');
        let arrows3 = document.getElementById('arrows3');
        openOrClose3.className = 'close';
        arrows3.className = 'el-icon-arrow-down';
        let openOrClose4 = document.getElementById('openOrClose4');
        let arrows4 = document.getElementById('arrows4');
        openOrClose4.className = 'close';
        arrows4.className = 'el-icon-arrow-down';
      },
      closeAndOpen3() {
        let openOrClose3 = document.getElementById('openOrClose3');
        let arrows3 = document.getElementById('arrows3');
        console.log(arrows3);
        if (openOrClose3.className == 'close') {
          openOrClose3.className = 'open';
          arrows3.className = 'el-icon-arrow-up';
          this.isSearch = 1;
          this.selected14();
        } else if (openOrClose3.className == 'open') {
          openOrClose3.className = 'close';
          arrows3.className = 'el-icon-arrow-down';
        };
        let openOrClose = document.getElementById('openOrClose');
        let arrows = document.getElementById('arrows');
        openOrClose.className = 'close';
        arrows.className = 'el-icon-arrow-down';
        let openOrClose2 = document.getElementById('openOrClose2');
        let arrows2 = document.getElementById('arrows2');
        openOrClose2.className = 'close';
        arrows2.className = 'el-icon-arrow-down';
        let openOrClose4 = document.getElementById('openOrClose4');
        let arrows4 = document.getElementById('arrows4');
        openOrClose4.className = 'close';
        arrows4.className = 'el-icon-arrow-down';
      },
      closeAndOpen4() {
        let openOrClose4 = document.getElementById('openOrClose4');
        let arrows4 = document.getElementById('arrows4');
        console.log(arrows4);
        if (openOrClose4.className == 'close') {
          openOrClose4.className = 'open';
          arrows4.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.selected12();
        } else if (openOrClose4.className == 'open') {
          openOrClose4.className = 'close';
          arrows4.className = 'el-icon-arrow-down';
        };
        let openOrClose = document.getElementById('openOrClose');
        let arrows = document.getElementById('arrows');
        openOrClose.className = 'close';
        arrows.className = 'el-icon-arrow-down';
        let openOrClose2 = document.getElementById('openOrClose2');
        let arrows2 = document.getElementById('arrows2');
        openOrClose2.className = 'close';
        arrows2.className = 'el-icon-arrow-down';
        let openOrClose3 = document.getElementById('openOrClose3');
        let arrows3 = document.getElementById('arrows3');
        openOrClose3.className = 'close';
        arrows3.className = 'el-icon-arrow-down';
      },
      warehouseCloseAndOpen() {
        let warehouseArrows = document.getElementById('warehouseArrows');
        let warehouseOpenOrClose = document.getElementById('warehouseOpenOrClose');
        if (warehouseOpenOrClose.className == 'close') {
          warehouseOpenOrClose.className = 'open';
          warehouseArrows.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.select8();
        } else if (warehouseOpenOrClose.className == 'open') {
          warehouseOpenOrClose.className = 'close';
          warehouseArrows.className = 'el-icon-arrow-down';
        };
        let warehouseArrows2 = document.getElementById('warehouseArrows2');
        let warehouseOpenOrClose2 = document.getElementById('warehouseOpenOrClose2');
        warehouseOpenOrClose2.className = 'close';
        warehouseArrows2.className = 'el-icon-arrow-down';

        let warehouseArrows3 = document.getElementById('warehouseArrows3');
        let warehouseOpenOrClose3 = document.getElementById('warehouseOpenOrClose3');
        warehouseOpenOrClose3.className = 'close';
        warehouseArrows3.className = 'el-icon-arrow-down';
      },
      warehouseCloseAndOpen2() {
        let warehouseArrows2 = document.getElementById('warehouseArrows2');
        let warehouseOpenOrClose2 = document.getElementById('warehouseOpenOrClose2');
        if (warehouseOpenOrClose2.className == 'close') {
          warehouseOpenOrClose2.className = 'open';
          warehouseArrows2.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.select1();
        } else if (warehouseOpenOrClose2.className == 'open') {
          warehouseOpenOrClose2.className = 'close';
          warehouseArrows2.className = 'el-icon-arrow-down';
        };

        let warehouseArrows = document.getElementById('warehouseArrows');
        let warehouseOpenOrClose = document.getElementById('warehouseOpenOrClose');
        warehouseOpenOrClose.className = 'close';
        warehouseArrows.className = 'el-icon-arrow-down';

        let warehouseArrows3 = document.getElementById('warehouseArrows3');
        let warehouseOpenOrClose3 = document.getElementById('warehouseOpenOrClose3');
        warehouseOpenOrClose3.className = 'close';
        warehouseArrows3.className = 'el-icon-arrow-down';
      },
      warehouseCloseAndOpen3() {
        let warehouseArrows3 = document.getElementById('warehouseArrows3');
        let warehouseOpenOrClose3 = document.getElementById('warehouseOpenOrClose3');
        if (warehouseOpenOrClose3.className == 'close') {
          warehouseOpenOrClose3.className = 'open';
          warehouseArrows3.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.select10();
        } else if (warehouseOpenOrClose3.className == 'open') {
          warehouseOpenOrClose3.className = 'close';
          warehouseArrows3.className = 'el-icon-arrow-down';
        };
        let warehouseArrows2 = document.getElementById('warehouseArrows2');
        let warehouseOpenOrClose2 = document.getElementById('warehouseOpenOrClose2');
        warehouseOpenOrClose2.className = 'close';
        warehouseArrows2.className = 'el-icon-arrow-down';

        let warehouseArrows = document.getElementById('warehouseArrows');
        let warehouseOpenOrClose = document.getElementById('warehouseOpenOrClose');
        warehouseOpenOrClose.className = 'close';
        warehouseArrows.className = 'el-icon-arrow-down';
      },

      marketCloseAndOpen() {
        let marketArrows = document.getElementById('marketArrows');
        let marketOpenOrClose = document.getElementById('marketOpenOrClose');
        if (marketOpenOrClose.className == 'open') {
          marketOpenOrClose.className = 'close';
          marketArrows.className = 'el-icon-arrow-down';
        } else if (marketOpenOrClose.className == 'close') {
          marketOpenOrClose.className = 'open';
          marketArrows.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.marketSelect9();
        };

        let marketArrows2 = document.getElementById('marketArrows2');
        let marketOpenOrClose2 = document.getElementById('marketOpenOrClose2');
        marketOpenOrClose2.className = 'close';
        marketArrows2.className = 'el-icon-arrow-down';

        let marketArrows3 = document.getElementById('marketArrows3');
        let marketOpenOrClose3 = document.getElementById('marketOpenOrClose3');
        marketOpenOrClose3.className = 'close';
        marketArrows3.className = 'el-icon-arrow-down';
      },

      marketCloseAndOpen2() {

        let marketArrows2 = document.getElementById('marketArrows2');
        let marketOpenOrClose2 = document.getElementById('marketOpenOrClose2');
        if (marketOpenOrClose2.className == 'open') {
          marketOpenOrClose2.className = 'close';
          marketArrows2.className = 'el-icon-arrow-down';
        } else if (marketOpenOrClose2.className == 'close') {
          marketOpenOrClose2.className = 'open';
          marketArrows2.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.marketSelect1();
        };

        let marketArrows = document.getElementById('marketArrows');
        let marketOpenOrClose = document.getElementById('marketOpenOrClose');
        marketOpenOrClose.className = 'close';
        marketArrows.className = 'el-icon-arrow-down';

        let marketArrows3 = document.getElementById('marketArrows3');
        let marketOpenOrClose3 = document.getElementById('marketOpenOrClose3');
        marketOpenOrClose3.className = 'close';
        marketArrows3.className = 'el-icon-arrow-down';
      },

      marketCloseAndOpen3() {
        let marketArrows3 = document.getElementById('marketArrows3');
        let marketOpenOrClose3 = document.getElementById('marketOpenOrClose3');
        if (marketOpenOrClose3.className == 'open') {
          marketOpenOrClose3.className = 'close';
          marketArrows3.className = 'el-icon-arrow-down';
        } else if (marketOpenOrClose3.className == 'close') {
          marketOpenOrClose3.className = 'open';
          marketArrows3.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.marketSelect11();
        };

        let marketArrows = document.getElementById('marketArrows');
        let marketOpenOrClose = document.getElementById('marketOpenOrClose');
        marketOpenOrClose.className = 'close';
        marketArrows.className = 'el-icon-arrow-down';

        let marketArrows2 = document.getElementById('marketArrows2');
        let marketOpenOrClose2 = document.getElementById('marketOpenOrClose2');
        marketOpenOrClose2.className = 'close';
        marketArrows2.className = 'el-icon-arrow-down';
      },

      financeCloseAndOpen1() {
        let financeArrows = document.getElementById('financeArrows');
        let financeOpenOrClose = document.getElementById('financeOpenOrClose');
        if (financeOpenOrClose.className == 'close') {
          financeOpenOrClose.className = 'open';
          financeArrows.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.financeSelected1();
        };
        let financeArrows2 = document.getElementById('financeArrows2');
        let financeOpenOrClose2 = document.getElementById('financeOpenOrClose2');
        financeOpenOrClose2.className = 'close';
        financeArrows2.className = 'el-icon-arrow-down';
      },

      financeCloseAndOpen2() {
        let financeArrows2 = document.getElementById('financeArrows2');
        let financeOpenOrClose2 = document.getElementById('financeOpenOrClose2');
        if (financeOpenOrClose2.className == 'close') {
          financeOpenOrClose2.className = 'open';
          financeArrows2.className = 'el-icon-arrow-up';
          this.isSearch = 0;
          this.financeSelected5();
        };
        let financeArrows = document.getElementById('financeArrows');
        let financeOpenOrClose = document.getElementById('financeOpenOrClose');
        financeOpenOrClose.className = 'close';
        financeArrows.className = 'el-icon-arrow-down';
      },

      radioSel() {
        this.fuzzyKeyword = '';
      },
      // 模糊搜索
      pageSel() {
        if (this.selected == 2) {
          this.$refs.myPurchase.page = 1;
        };
        if (this.adminSelected == 5 || this.selected == 7 || this.marketSelect == 5) {
          this.$refs.priceAdmin.page = 1;
          this.priceAdmin.page = 1;
        };
        if (this.financeSelect == 3 || this.adminSelected == 6 || this.selected == 8 || this.marketSelect == 6) {
          this.$refs.priceInquireMain.page = 1;
        };
        if (this.financeSelect == 0 || this.selected == 10 || this.warehouseSelect == 6 || this.marketSelect == 7) {
          this.$refs.watchQueryMain.page = 1;
        };
        if (this.financeSelect == 4 || this.selected == 12 || this.warehouseSelect == 8 || this.marketSelect == 9) {
          this.$refs.reimbursementMain.page = 1;
        };
        if (this.warehouseSelect == 0) {
          this.$refs.stockListMain.stockPending = [];
          this.$refs.stockListMain.hintMsg = '';
        };
        if (this.warehouseSelect == 2) {
          this.$refs.notOutboundMain.page = 1;
        };
        if (this.warehouseSelect == 3) {
          this.$refs.haveOutboundMain.page = 1;
        };
        if (this.marketSelect == 0) {
          this.$refs.forsaleMain.page = 1;
        };
        if (this.marketSelect == 2) {
          this.$refs.onsaleMain.page = 1;
        };
        if (this.marketSelect == 3) {
          this.$refs.completedSaleMain.page = 1;
        };
        if (this.financeSelect == 5 || this.selected == 13 || this.warehouseSelect == 9 || this.marketSelect == 10) {
          this.$refs.reimburseAdmin.page = 1;
        }
      },
      keywordSure() {
        if (this.selected == 2) {
          console.log(this.$refs.myPurchase);
          this.$refs.myPurchase.keyword = this.fuzzyKeyword;
          this.selectSearch.keyword = this.fuzzyKeyword;
        };
        if (this.adminSelected == 4 || this.selected == 6 || this.marketSelect == 4) {
          this.$refs.peerAdminMain.keyword = this.fuzzyKeyword;
        }
        if (this.adminSelected == 5 || this.selected == 7 || this.marketSelect == 5) {
          this.$refs.priceAdminMain.keyword = this.fuzzyKeyword;
          this.priceAdmin.keyword = this.fuzzyKeyword;
        };
        if (this.financeSelect == 3 || this.adminSelected == 6 || this.selected == 8 || this.marketSelect == 6) {
          this.$refs.priceInquireMain.keyword = this.fuzzyKeyword;
        };
        if (this.financeSelect == 1 || this.adminSelected == 7 || this.selected == 9) {
          this.$refs.storeQueryMain.keyword = this.fuzzyKeyword;
        };
        if (this.financeSelect == 0 || this.selected == 10 || this.warehouseSelect == 6 || this.marketSelect == 7) {
          console.log(this.fuzzyKeyword);
          this.$refs.watchQueryMain.keyword = this.fuzzyKeyword;
        };
        if (this.financeSelect == 4 || this.selected == 12 || this.warehouseSelect == 8 || this.marketSelect == 9) {
          this.$refs.reimbursementMain.keyword = this.fuzzyKeyword;
        };
        if (this.warehouseSelect == 0) {
          this.$refs.stockListMain.keyword = this.fuzzyKeyword;
        };
        if (this.warehouseSelect == 2) {
          this.$refs.notOutboundMain.keyword = this.fuzzyKeyword;
        };
        if (this.warehouseSelect == 3) {
          this.$refs.haveOutboundMain.keyword = this.fuzzyKeyword;
        };
        if (this.marketSelect == 0) {
          this.$refs.forsaleMain.keyword = this.fuzzyKeyword;
        };
        if (this.marketSelect == 2) {
          this.$refs.onsaleMain.keyword = this.fuzzyKeyword;
        };
        if (this.marketSelect == 3) {
          this.$refs.completedSaleMain.keyword = this.fuzzyKeyword;
        };
        if (this.financeSelect == 5 || this.selected == 13 || this.warehouseSelect == 9 || this.marketSelect == 10) {
          this.$refs.reimburseAdmin.keyword = this.fuzzyKeyword;
        }
      },
      fuzzySearch() {
        if (this.selected == 2) {
          console.log(this.$refs.myPurchase);
          this.$refs.myPurchase.keyword = this.fuzzyKeyword;
          this.selectSearch.keyword = this.fuzzyKeyword;
          this.$refs.myPurchase.radioChange();
        };
        if (this.adminSelected == 4 || this.selected == 6 || this.marketSelect == 4) {
          this.$refs.peerAdminMain.keyword = this.fuzzyKeyword;
          this.$refs.peerAdminMain.stockInSearch();
        }
        if (this.adminSelected == 5 || this.selected == 7 || this.marketSelect == 5) {
          this.$refs.priceAdminMain.keyword = this.fuzzyKeyword;
          this.priceAdmin.keyword = this.fuzzyKeyword;
          this.$refs.priceAdminMain.stockInSearch();
        };
        if (this.financeSelect == 3 || this.adminSelected == 6 || this.selected == 8 || this.marketSelect == 6) {
          this.$refs.priceInquireMain.keyword = this.fuzzyKeyword;
          this.$refs.priceInquireMain.stockInSearch();
        };
        if (this.financeSelect == 1 || this.adminSelected == 7 || this.selected == 9) {
          this.$refs.storeQueryMain.keyword = this.fuzzyKeyword;
          this.$refs.storeQueryMain.stockInSearch();
        };
        if (this.financeSelect == 0 || this.selected == 10 || this.warehouseSelect == 6 || this.marketSelect == 7) {
          console.log(this.fuzzyKeyword);
          this.$refs.watchQueryMain.keyword = this.fuzzyKeyword;
          this.$refs.watchQueryMain.stockInSearch();
        };
        if (this.financeSelect == 4 || this.selected == 12 || this.warehouseSelect == 8 || this.marketSelect == 9) {
          this.$refs.reimbursementMain.keyword = this.fuzzyKeyword;
          this.$refs.reimbursementMain.stockInSearch();
        };
        if (this.warehouseSelect == 0) {
          this.$refs.stockListMain.keyword = this.fuzzyKeyword;
          this.$refs.stockListMain.stockInSearch();
        };
        if (this.warehouseSelect == 2) {
          this.$refs.notOutboundMain.keyword = this.fuzzyKeyword;
          this.$refs.notOutboundMain.stockInSearch();
        };
        if (this.warehouseSelect == 3) {
          this.$refs.haveOutboundMain.keyword = this.fuzzyKeyword;
          this.$refs.haveOutboundMain.stockInSearch();
        };
        if (this.marketSelect == 0) {
          this.$refs.forsaleMain.keyword = this.fuzzyKeyword;
          this.$refs.forsaleMain.stockInSearch();
        };
        if (this.marketSelect == 2) {
          this.$refs.onsaleMain.keyword = this.fuzzyKeyword;
          this.$refs.onsaleMain.stockInSearch();
        };
        if (this.marketSelect == 3) {
          this.$refs.completedSaleMain.keyword = this.fuzzyKeyword;
          this.$refs.completedSaleMain.stockInSearch();
        };
        if (this.financeSelect == 5 || this.selected == 13 || this.warehouseSelect == 9 || this.marketSelect == 10) {
          this.$refs.reimburseAdmin.keyword = this.fuzzyKeyword;
          this.$refs.reimburseAdmin.stockInSearch();
        }
      },
      notKeywordChan() {
        this.fuzzyKeyword = '';
      },
      getStockCount(val) {
        this.stockInCount = val;
        this.fuzzyKeyword = '';
      },
      getSellPendOrderCount(val) {
        this.sellPendOrderCount = val;
      },
      priceCount(val) {
        this.dataMaketPriceCount = val;
      },
      peerSel(val) {
        console.log(val);
        let openOrClose2 = document.getElementById('openOrClose2');
        let arrows2 = document.getElementById('arrows2');;
        console.log(arrows2);
        openOrClose2.className = 'open';
        arrows2.className = 'el-icon-arrow-up';
        let openOrClose = document.getElementById('openOrClose');
        let arrows = document.getElementById('arrows');
        openOrClose.className = 'close';
        arrows.className = 'el-icon-arrow-down';
        this.selected3();
      },
      storeJump(val) {
        console.log('店铺跳转');
        console.log(val);
        this.purchasePro = val;
        this.closeAndOpen2();
      },
      reimbursementKeyword() {
        this.fuzzyKeyword = '';
      },
      reimListen(val) {
        console.log(val);
        this.handleSureReimbursement();
      },
      // 跳转汇率查询
      rateCalcJump(val) {
        this.jumpRate();
      },
      jumpRate(val) {
        if (this.role == 2) {
          let openOrClose = document.getElementById('openOrClose');
          let arrows = document.getElementById('arrows');;
          console.log(arrows);
          if (openOrClose.className == 'close') {
            openOrClose.className = 'open';
            arrows.className = 'el-icon-arrow-up';
            this.selected11();
          } else if (openOrClose.className == 'open') {
            openOrClose.className = 'close';
            arrows.className = 'el-icon-arrow-down';
          };
          let openOrClose2 = document.getElementById('openOrClose2');
          let arrows2 = document.getElementById('arrows2');
          openOrClose2.className = 'close';
          arrows2.className = 'el-icon-arrow-down';
          let openOrClose3 = document.getElementById('openOrClose3');
          let arrows3 = document.getElementById('arrows3');
          openOrClose3.className = 'close';
          arrows3.className = 'el-icon-arrow-down';
          let openOrClose4 = document.getElementById('openOrClose4');
          let arrows4 = document.getElementById('arrows4');
          openOrClose4.className = 'close';
          arrows4.className = 'el-icon-arrow-down';
        } else if (this.role == 3) {
          let warehouseArrows = document.getElementById('warehouseArrows');
          let warehouseOpenOrClose = document.getElementById('warehouseOpenOrClose');
          if (warehouseOpenOrClose.className == 'close') {
            warehouseOpenOrClose.className = 'open';
            warehouseArrows.className = 'el-icon-arrow-up';
            this.select9();
          } else if (warehouseOpenOrClose.className == 'open') {
            warehouseOpenOrClose.className = 'close';
            warehouseArrows.className = 'el-icon-arrow-down';
          };
          let warehouseArrows2 = document.getElementById('warehouseArrows2');
          let warehouseOpenOrClose2 = document.getElementById('warehouseOpenOrClose2');
          warehouseOpenOrClose2.className = 'close';
          warehouseArrows2.className = 'el-icon-arrow-down';

          let warehouseArrows3 = document.getElementById('warehouseArrows3');
          let warehouseOpenOrClose3 = document.getElementById('warehouseOpenOrClose3');
          warehouseOpenOrClose3.className = 'close';
          warehouseArrows3.className = 'el-icon-arrow-down';
        } else if (this.role == 4) {
          let marketArrows = document.getElementById('marketArrows');
          let marketOpenOrClose = document.getElementById('marketOpenOrClose');
          if (marketOpenOrClose.className == 'open') {
            marketOpenOrClose.className = 'close';
            marketArrows.className = 'el-icon-arrow-down';
          } else if (marketOpenOrClose.className == 'close') {
            marketOpenOrClose.className = 'open';
            marketArrows.className = 'el-icon-arrow-up';
            this.marketSelect10();
          };

          let marketArrows2 = document.getElementById('marketArrows2');
          let marketOpenOrClose2 = document.getElementById('marketOpenOrClose2');
          marketOpenOrClose2.className = 'close';
          marketArrows2.className = 'el-icon-arrow-down';

          let marketArrows3 = document.getElementById('marketArrows3');
          let marketOpenOrClose3 = document.getElementById('marketOpenOrClose3');
          marketOpenOrClose3.className = 'close';
          marketArrows3.className = 'el-icon-arrow-down';
        } else if (this.role == 5) {
          let financeArrows = document.getElementById('financeArrows');
          let financeOpenOrClose = document.getElementById('financeOpenOrClose');
          if (financeOpenOrClose.className == 'close') {
            financeOpenOrClose.className = 'open';
            financeArrows.className = 'el-icon-arrow-up';
            this.isSearch = 0;
            this.financeSelected3();
          };
          let financeArrows2 = document.getElementById('financeArrows2');
          let financeOpenOrClose2 = document.getElementById('financeOpenOrClose2');
          financeOpenOrClose2.className = 'close';
          financeArrows2.className = 'el-icon-arrow-down';
        }
      },
      // 阻止页面后退
      keydown() {
        console.log("ggggggggggggggggggggggggggggg");
        console.log(window);
        window.document.onkeydown = function () {
          if (
            window.event.altKey &&
            (window.event.keyCode == 37 || window.event.keyCode == 39)
          ) {
            // alert("不准你使用ALT+方向键前进或后退网页！");
            event.returnValue = false;
          }
        };
      },
      listSelectSum(val) {
        console.log("gggg");
        console.log(val);
      },
      getBreadList() {
        for (let routeInfo of this.$route.matched) {
          console.log(routeInfo);
          if (typeof routeInfo.name === "string" && routeInfo.name !== "home") {
            this.breadList.push(routeInfo.name);
          }
        }
      },
      updateUserClick() {
        if (this.updateUser == 1) {
          this.updateUser = 0;
        } else if (this.updateUser == 0) {
          this.updateUser = 1;
        }
      },
      tabSelect(val) {
        this.isSearch = val;
      },
      // 修改昵称
      nickUpdate() {
        this.newNick = '';
        this.nickDialogVisible = true;
      },
      // 确定修改
      updateNick() {
        console.log(this.newNick);
        this.$axios
          .post(this.$store.state.baseUrl + "/UserModify", {
            nick: this.newNick
          })
          .then(res => {
            console.log("11111");
            console.log(res);
            if (res.status == 200) {
              this.$message.success({
                message: "昵称修改成功",
                showClose: true,
                duration: 2000
              });
              sessionStorage.setItem("nick", res.data.nick);
              this.$store.state.nick = sessionStorage.getItem("nick");
              this.nickDialogVisible = false;
              this.updateUser = 1;
              this.newNick = '';
            }
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          })
      },
      // 修改密码
      pswUpdate() {
        this.oldPsw = '';
        this.newPsw = '';
        this.pswDialogVisible = true;
      },
      // 确定修改
      updatePsw() {
        console.log(sessionStorage.getItem("token"));
        console.log(this.oldPsw, this.newPsw);
        this.$axios
          .post(this.$store.state.baseUrl + "/UserModify", {
            oldpsw: this.oldPsw,
            psw: this.newPsw
          })
          .then(res => {
            console.log(res);
            if (res.data.token !== "") {
              this.$message.success({
                message: "密码修改成功",
                showClose: true,
                duration: 2000
              });
              sessionStorage.setItem("token", res.data.token);
              this.pswDialogVisible = false;
              this.updateUser = 1;
              this.oldPsw = '';
              this.newPsw = '';
            }
            console.log(sessionStorage.getItem("token"));
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.data.message,
              showClose: true,
              duration: 2000
            });
          })
      },
      // 退出登录
      logOut() {
        this.$router.push('/login');
        this.$store.dispatch('setRole', null);
      },
      // 获取是否有需要确认的报销单 ReimburseList?java
      handleSureReimbursement() {
        this.$axios.post(this.$store.state.baseUrl + '/ClaimFormList?java', {
          page: 1,
          pagenum: 10,
          flag: 1
        }).then((res) => {
          console.log('是否有需要确认的报销单');
          console.log(res);
          if (res.data.lists.length !== 0) {
            this.reimData = 1;
          } else {
            this.reimData = 0;
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      // 管理统计
      admin1() {
        this.adminLine = 1;
        this.adminSelected = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.statistics.style.color = '#2d4e65';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
        this.$refs.rateQuery2.style.color = '#c8c8c8';
        this.$refs.reimbursement4.style.color = '#c8c8c8';
        // location.reload();
        this.reload();
      },
      // 结算
      admin2() {
        this.adminLine = 2;
        this.adminSelected = 2;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#2d4e65';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
        this.$refs.rateQuery2.style.color = '#c8c8c8';
        this.$refs.reimbursement4.style.color = '#c8c8c8';
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
      // 管理结算单
      admin3() {
        this.adminLine = 3;
        this.adminSelected = 3;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#2d4e65';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
        this.$refs.rateQuery2.style.color = '#c8c8c8';
        this.$refs.reimbursement4.style.color = '#c8c8c8';
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
      // 管理贸易商管理
      admin6() {
        this.adminLine = 4;
        this.adminSelected = 4;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#2d4e65';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
        this.$refs.rateQuery2.style.color = '#c8c8c8';
        this.$refs.reimbursement4.style.color = '#c8c8c8';
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
      // 管理批发价管理
      admin4() {
        this.adminLine = 5;
        this.adminSelected = 5;
        this.priceAdmin.select = 0;
        this.priceAdmin.keyword = '';
        this.priceAdmin.page = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#2d4e65';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
        this.$refs.rateQuery2.style.color = '#c8c8c8';
        this.$refs.reimbursement4.style.color = '#c8c8c8';
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        this.$axios.post(this.$store.state.baseUrl + "/DataMaketPriceCount").then((res) => {
          this.dataMaketPriceCount = res.data.total;
        });
        if (this.isFirst == false) {
          this.isFirst = true;
        } else if (this.isFirst == true) {
          this.$axios.post(this.$store.state.baseUrl + '/DataMaketPriceList', {
            page: this.priceAdmin.page,
            pagenum: 10
          }).then((res) => {
            this.priceAdmin.total = res.data.total;
            this.priceAdmin.dataMaketPriceList = res.data.watchs;
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      // 管理批发价查询
      admin5() {
        this.adminLine = 6;
        this.adminSelected = 6;
        this.priceInquire.select = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#2d4e65';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
        this.$refs.rateQuery2.style.color = '#c8c8c8';
        this.$refs.reimbursement4.style.color = '#c8c8c8';
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
      // 管理店铺查询
      admin7() {
        this.adminLine = 7;
        this.adminSelected = 7;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入店铺名称、地址、国家等信息进行查询';
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#2d4e65';
        this.$refs.rateQuery2.style.color = '#c8c8c8';
        this.$refs.reimbursement4.style.color = '#c8c8c8';
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
      // 管理汇率查询
      admin8() {
        this.adminLine = 8;
        this.adminSelected = 8;
        this.rateQuerySel.select = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
        this.$refs.rateQuery2.style.color = '#2d4e65';
        this.$refs.reimbursement4.style.color = '#c8c8c8';
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
      // 管理我的报销
      admin9() {
        this.adminLine = 9;
        this.adminSelected = 9;
        this.reimbursementSel.select = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入行程名称或行程描述进行搜索';
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
        this.$refs.rateQuery2.style.color = '#c8c8c8';
        this.$refs.reimbursement4.style.color = '#2d4e65';
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
      // 财务手表查询
      financeSelected1() {
        this.financeSelect = 0;
        this.watchQuerySel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入手表品牌、系列、型号进行查询';
        this.$refs.financeWatchQuery.style.color = '#0c7063';
        this.$refs.financeStoreQuery.style.color = '#fff';
        this.$refs.financeRateQuery.style.color = '#fff';
        this.$refs.financePriceInquire.style.color = '#fff';
        this.$refs.financeReimbursement.style.color = '#fff';
        this.$refs.financeReimbursementAdmin.style.color = '#fff';
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        this.reload();
      },

      // 财务店铺查询
      financeSelected2() {
        this.financeSelect = 1;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入店铺名称、地址、国家等信息进行查询';
        this.storeQuerySel.select = 0;
        this.$refs.financeWatchQuery.style.color = '#fff';
        this.$refs.financeStoreQuery.style.color = '#0c7063';
        this.$refs.financeRateQuery.style.color = '#fff';
        this.$refs.financePriceInquire.style.color = '#fff';
        this.$refs.financeReimbursement.style.color = '#fff';
        this.$refs.financeReimbursementAdmin.style.color = '#fff';
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
      // 财务汇率查询
      financeSelected3() {
        this.financeSelect = 2;
        this.rateQuerySel.select = 0;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.financeWatchQuery.style.color = '#fff';
        this.$refs.financeStoreQuery.style.color = '#fff';
        this.$refs.financeRateQuery.style.color = '#0c7063';
        this.$refs.financePriceInquire.style.color = '#fff';
        this.$refs.financeReimbursement.style.color = '#fff';
        this.$refs.financeReimbursementAdmin.style.color = '#fff';
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
      // 财务批发价查询
      financeSelected4() {
        this.financeSelect = 3;
        this.priceInquire.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.$refs.financeWatchQuery.style.color = '#fff';
        this.$refs.financeStoreQuery.style.color = '#fff';
        this.$refs.financeRateQuery.style.color = '#fff';
        this.$refs.financePriceInquire.style.color = '#0c7063';
        this.$refs.financeReimbursement.style.color = '#fff';
        this.$refs.financeReimbursementAdmin.style.color = '#fff';
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
      // 财务我的报销
      financeSelected5() {
        this.financeSelect = 4;
        this.reimbursementSel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入行程名称或行程描述进行搜索';
        this.$refs.financeWatchQuery.style.color = '#fff';
        this.$refs.financeStoreQuery.style.color = '#fff';
        this.$refs.financeRateQuery.style.color = '#fff';
        this.$refs.financePriceInquire.style.color = '#fff';
        this.$refs.financeReimbursement.style.color = '#0c7063';
        this.$refs.financeReimbursementAdmin.style.color = '#fff';
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
      // 财务报销管理
      financeSelected6() {
        this.financeSelect = 5;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入用户名、昵称进行查询';
        this.reimbursementAdminSel.select = 0;
        this.$refs.financeWatchQuery.style.color = '#fff';
        this.$refs.financeStoreQuery.style.color = '#fff';
        this.$refs.financeRateQuery.style.color = '#fff';
        this.$refs.financePriceInquire.style.color = '#fff';
        this.$refs.financeReimbursement.style.color = '#fff';
        this.$refs.financeReimbursementAdmin.style.color = '#0c7063';
        this.handleSureReimbursement();
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
      // 代理商采购
      selected1() {
        this.selected = 1;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        // this.purchaseSelect.num = 0;
        this.$refs.purchase.style.color = "#0c7063";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
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
      // 贸易商采购
      selected3() {
        this.selected = 3;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#0c7063";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
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
      // 我的采购
      closeAndOpen(e) {
        console.log("5555");
        this.selected = 2;
        this.isSearch = 0;
        this.selectSearch.msg = 0;
        this.numSelect.select = 2;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号、机芯号进行搜索';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#0c7063";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
        console.log('选择');
        console.log(this.numSelect.select);
        this.$axios
          .post(this.$store.state.baseUrl + "/BuyOrderListEx", {
            page: 1,
            pagenum: 10,
            type: 0
          })
          .then(res => {
            console.log("获取订单");
            console.log(res);
            this.orders.purchaseOrder = res.data.orders;
            this.orders.total = res.data.total;
            this.orders.totalNum = res.data.watchtotal;
            console.log(this.orders.purchaseOrder);
            // this.page = 1;
          });

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
      // 物流查询
      selected4() {
        this.selected = 4;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#0c7063";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
        this.logisticsView.logisticsV = 1;
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
      // 采购结算单
      selected5() {
        this.selected = 5;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#0c7063";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
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
      // 采购税金管理
      selected14() {
        this.selected = 14;
        this.taxesSel.select = 0;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#0c7063";
        this.$refs.commission.style.color = "#fff";
        this.$refs.tipAdmin.style.color = "#fff";
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
      // 采购佣金管理
      selected15() {
        this.selected = 15;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.commissionSel.select = 0;
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#0c7063";
        this.$refs.tipAdmin.style.color = "#fff";
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
      // 采购小费管理
      selected16() {
        this.selected = 16;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.tipSel.select = 0;
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
        this.$refs.tipAdmin.style.color = "#0c7063";
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
      // 采购贸易商管理
      selected6() {
        this.selected = 6;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入贸易商名称进行搜索';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#0c7063";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
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
      // 采购批发价管理
      selected7() {
        this.selected = 7;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.priceAdmin.select = 0;
        this.priceAdmin.keyword = '';
        this.priceAdmin.page = 1;
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#0c7063";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        this.$axios.post(this.$store.state.baseUrl + "/DataMaketPriceCount").then((res) => {
          this.dataMaketPriceCount = res.data.total;
        });
        if (this.isFirst == false) {
          this.isFirst = true;
        } else if (this.isFirst == true) {
          this.$axios.post(this.$store.state.baseUrl + '/DataMaketPriceList', {
            page: this.priceAdmin.page,
            pagenum: 10
          }).then((res) => {
            this.priceAdmin.total = res.data.total;
            this.priceAdmin.dataMaketPriceList = res.data.watchs;
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      // 采购批发价查询
      selected8() {
        this.selected = 8;
        this.priceInquire.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#0c7063";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
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
      // 采购店铺查询
      selected9() {
        this.selected = 9;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入店铺名称、地址、国家等信息进行查询';
        this.storeQuerySel.select = 0;
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#0c7063";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
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
      // 采购手表查询
      selected10() {
        this.selected = 10;
        this.watchQuerySel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入手表品牌、系列、型号进行查询';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#0c7063";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        this.reload();
      },
      // 采购汇率查询
      selected11() {
        this.selected = 11;
        this.rateQuerySel.select = 0;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#0c7063";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
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
      // 采购我的报销
      selected12() {
        this.selected = 12;
        this.reimbursementSel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入行程名称或行程描述进行搜索';
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#0c7063";
        this.$refs.reimbursementAdmin.style.color = "#fff";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
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
      // 采购报销管理
      selected13() {
        this.selected = 13;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入用户名、昵称进行查询';
        this.reimbursementAdminSel.select = 0;
        this.$refs.purchase.style.color = "#fff";
        this.$refs.trade.style.color = "#fff";
        this.$refs.logisticsView.style.color = "#fff";
        this.$refs.myPur.style.color = "#fff";
        this.$refs.statement.style.color = "#fff";
        this.$refs.peerAdmin.style.color = "#fff";
        this.$refs.priceAdmin.style.color = "#fff";
        this.$refs.priceInquire.style.color = "#fff";
        this.$refs.storeQuery.style.color = "#fff";
        this.$refs.watchQuery.style.color = "#fff";
        this.$refs.rateQuery.style.color = "#fff";
        this.$refs.reimbursement.style.color = "#fff";
        this.$refs.reimbursementAdmin.style.color = "#0c7063";
        this.$refs.taxes.style.color = "#fff";
        this.$refs.commission.style.color = "#fff";
        this.handleSureReimbursement();
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
      // 仓库
      // 待入库
      select1() {
        this.warehouseSelect = 0;
        this.stock1.num = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入机芯号进行搜索';
        this.$refs.stock.style.color = "#0c8563";
        // this.$refs.inventory.style.color = "#fff";
        this.$refs.notOutbound.style.color = "#fff";
        this.$refs.haveOutbound.style.color = "#fff";
        this.$refs.delivery.style.color = "#fff";
        this.$refs.watchQuery2.style.color = "#fff";
        this.$refs.rateQuery3.style.color = "#fff";
        this.$refs.reimbursement2.style.color = "#fff";
        this.$refs.reimbursementAdmin2.style.color = "#fff";
        // let haveAndNot = document.getElementById("haveAndNot");
        // haveAndNot.className = "close";
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        // this.reload();
      },
      // 库存
      select3(e) {
        console.log(e);
        this.warehouseSelect = 2;
        this.stockLine = 2;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌型号进行搜索';
        this.$refs.stock.style.color = "#fff";
        // this.$refs.inventory.style.color = "#0c8563";
        this.$refs.notOutbound.style.color = "#fff";
        this.$refs.haveOutbound.style.color = "#fff";
        this.$refs.delivery.style.color = "#fff";
        this.$refs.watchQuery2.style.color = "#fff";
        this.$refs.rateQuery3.style.color = "#fff";
        this.$refs.reimbursement2.style.color = "#fff";
        this.$refs.reimbursementAdmin2.style.color = "#fff";
        // let haveAndNot = document.getElementById("haveAndNot");
        // if (haveAndNot.className == "close") {
        //   haveAndNot.className = "open";
        //   this.warehouseSelect = 2;
        // } else if (haveAndNot.className == "open") {
        //   haveAndNot.className = "close";
        // }
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
      // 未出库
      select4() {
        this.warehouseSelect = 2;
        this.notOutbound.nots = 0;
        this.notOutbound.select = 2;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌型号进行搜索';
        this.$refs.stock.style.color = "#fff";
        // this.$refs.inventory.style.color = "#fff";
        this.$refs.notOutbound.style.color = "#0c7063";
        this.$refs.haveOutbound.style.color = "#fff";
        this.$refs.delivery.style.color = '#fff';
        this.$refs.watchQuery2.style.color = "#fff";
        this.$refs.rateQuery3.style.color = "#fff";
        this.$refs.reimbursement2.style.color = "#fff";
        this.$refs.reimbursementAdmin2.style.color = "#fff";
        this.$axios
          .post(this.$store.state.baseUrl + "/StockList", {
            page: 1,
            pagenum: 10,
            type: '0',
          })
          .then(res => {
            console.log("未出库商品列表");
            console.log(res);
            this.notOrders.notOutboundList1 = res.data.lst;
            this.notOrders.total1 = res.data.total;
            this.notOrders.totalNum1 = res.data.watchtotal;
            console.log(this.notOrders.notOutboundList1);
          })
          .catch(err => {
            console.log(err);
          });
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
      // 已出库
      select5() {
        this.warehouseSelect = 3;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌型号进行搜索';
        this.$refs.stock.style.color = "#fff";
        // this.$refs.inventory.style.color = "#fff";
        this.$refs.notOutbound.style.color = "#fff";
        this.$refs.haveOutbound.style.color = "#0c7063";
        this.$refs.delivery.style.color = '#fff';
        this.$refs.watchQuery2.style.color = "#fff";
        this.$refs.rateQuery3.style.color = "#fff";
        this.$refs.reimbursement2.style.color = "#fff";
        this.$refs.reimbursementAdmin2.style.color = "#fff";
        this.haveBound.have = 0;
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
      // 出库/查询
      select6() {
        this.warehouseSelect = 4;
        this.outboundQuery.query = 0;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.stock.style.color = "#fff";
        // this.$refs.inventory.style.color = "#fff";
        this.$refs.notOutbound.style.color = "#fff";
        this.$refs.haveOutbound.style.color = "#fff";
        this.$refs.delivery.style.color = '#0c7063';
        this.$refs.watchQuery2.style.color = "#fff";
        this.$refs.rateQuery3.style.color = "#fff";
        this.$refs.reimbursement2.style.color = "#fff";
        this.$refs.reimbursementAdmin2.style.color = "#fff";
        // let haveAndNot = document.getElementById("haveAndNot");
        // haveAndNot.className = "close";
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
      // 仓库手表查询
      select8() {
        this.warehouseSelect = 6;
        this.watchQuerySel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入手表品牌、系列、型号进行查询';
        this.$refs.stock.style.color = "#fff";
        // this.$refs.inventory.style.color = "#fff";
        this.$refs.notOutbound.style.color = "#fff";
        this.$refs.haveOutbound.style.color = "#fff";
        this.$refs.delivery.style.color = '#fff';
        this.$refs.watchQuery2.style.color = "#0c7063";
        this.$refs.rateQuery3.style.color = "#fff";
        this.$refs.reimbursement2.style.color = "#fff";
        this.$refs.reimbursementAdmin2.style.color = "#fff";
        // let haveAndNot = document.getElementById("haveAndNot");
        // haveAndNot.className = "close";
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
      // 仓库汇率查询
      select9() {
        this.warehouseSelect = 7;
        this.rateQuerySel.select = 0;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.stock.style.color = "#fff";
        // this.$refs.inventory.style.color = "#fff";
        this.$refs.notOutbound.style.color = "#fff";
        this.$refs.haveOutbound.style.color = "#fff";
        this.$refs.delivery.style.color = '#fff';
        this.$refs.watchQuery2.style.color = "#fff";
        this.$refs.rateQuery3.style.color = "#0c7063";
        this.$refs.reimbursement2.style.color = "#fff";
        this.$refs.reimbursementAdmin2.style.color = "#fff";
        // let haveAndNot = document.getElementById("haveAndNot");
        // haveAndNot.className = "close";
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
      // 仓库我的报销
      select10() {
        this.warehouseSelect = 8;
        this.reimbursementSel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入行程名称或行程描述进行搜索';
        this.$refs.stock.style.color = "#fff";
        // this.$refs.inventory.style.color = "#fff";
        this.$refs.notOutbound.style.color = "#fff";
        this.$refs.haveOutbound.style.color = "#fff";
        this.$refs.delivery.style.color = '#fff';
        this.$refs.watchQuery2.style.color = "#fff";
        this.$refs.rateQuery3.style.color = "#fff";
        this.$refs.reimbursement2.style.color = "#0c7063";
        this.$refs.reimbursementAdmin2.style.color = "#fff";
        // let haveAndNot = document.getElementById("haveAndNot");
        // haveAndNot.className = "close";
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
      // 仓库报销管理
      select11() {
        this.warehouseSelect = 9;
        this.reimbursementAdminSel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入用户名、昵称进行查询';
        this.$refs.stock.style.color = "#fff";
        // this.$refs.inventory.style.color = "#fff";
        this.$refs.notOutbound.style.color = "#fff";
        this.$refs.haveOutbound.style.color = "#fff";
        this.$refs.delivery.style.color = '#fff';
        this.$refs.watchQuery2.style.color = "#fff";
        this.$refs.rateQuery3.style.color = "#fff";
        this.$refs.reimbursement2.style.color = "#fff";
        this.$refs.reimbursementAdmin2.style.color = "#0c7063";
        // let haveAndNot = document.getElementById("haveAndNot");
        // haveAndNot.className = "close";
        this.handleSureReimbursement();
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
      // 销售页面的库存
      marketSelect1() {
        this.marketSelect = 0;
        this.forSale.sale = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.$refs.marketInventory.style.color = "#0c8563";
        this.$refs.saveInProgress.style.color = "#fff";
        this.$refs.completedSales.style.color = "#fff";
        this.$refs.peerAdmin3.style.color = '#fff';
        this.$refs.priceAdmin2.style.color = "#fff";
        this.$refs.priceInquire2.style.color = "#fff";
        this.$refs.watchQuery3.style.color = "#fff";
        this.$refs.rateQuery4.style.color = "#fff";
        this.$refs.reimbursement3.style.color = "#fff";
        this.$refs.reimbursementAdmin3.style.color = "#fff";
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        // this.reload();
      },
      // 进行中的销售
      marketSelect4() {
        this.marketSelect = 2;
        this.onSaleSel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.$refs.marketInventory.style.color = "#fff";
        this.$refs.saveInProgress.style.color = "#0c8563";
        this.$refs.completedSales.style.color = "#fff";
        this.$refs.peerAdmin3.style.color = '#fff';
        this.$refs.priceAdmin2.style.color = "#fff";
        this.$refs.priceInquire2.style.color = "#fff";
        this.$refs.watchQuery3.style.color = "#fff";
        this.$refs.rateQuery4.style.color = "#fff";
        this.$refs.reimbursement3.style.color = "#fff";
        this.$refs.reimbursementAdmin3.style.color = "#fff";
        // this.$axios.post(this.$store.state.baseUrl + '/SellPendOrderCount').then((res) => {
        //   this.sellPendOrderCount = res.data.count;
        // });
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
      // 已完成销售
      marketSelect5() {
        this.marketSelect = 3;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.$refs.marketInventory.style.color = "#fff";
        this.$refs.saveInProgress.style.color = "#fff";
        this.$refs.completedSales.style.color = "#0c8563";
        this.$refs.peerAdmin3.style.color = '#fff';
        this.$refs.priceAdmin2.style.color = "#fff";
        this.$refs.priceInquire2.style.color = "#fff";
        this.$refs.watchQuery3.style.color = "#fff";
        this.$refs.rateQuery4.style.color = "#fff";
        this.$refs.reimbursement3.style.color = "#fff";
        this.$refs.reimbursementAdmin3.style.color = "#fff";
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
      // 销售客户管理
      marketSelect6() {
        this.marketSelect = 4;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入客户名称进行搜索';
        this.$refs.marketInventory.style.color = "#fff";
        this.$refs.saveInProgress.style.color = "#fff";
        this.$refs.completedSales.style.color = "#fff";
        this.$refs.peerAdmin3.style.color = '#0c8563';
        this.$refs.priceAdmin2.style.color = "#fff";
        this.$refs.priceInquire2.style.color = "#fff";
        this.$refs.watchQuery3.style.color = "#fff";
        this.$refs.rateQuery4.style.color = "#fff";
        this.$refs.reimbursement3.style.color = "#fff";
        this.$refs.reimbursementAdmin3.style.color = "#fff";
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
      // 销售批发价管理
      marketSelect7() {
        this.marketSelect = 5;
        this.priceAdmin.select = 0;
        this.priceAdmin.keyword = '';
        this.priceAdmin.page = 1;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.$refs.marketInventory.style.color = "#fff";
        this.$refs.saveInProgress.style.color = "#fff";
        this.$refs.completedSales.style.color = "#fff";
        this.$refs.peerAdmin3.style.color = '#fff';
        this.$refs.priceAdmin2.style.color = "#0c8563";
        this.$refs.priceInquire2.style.color = "#fff";
        this.$refs.watchQuery3.style.color = "#fff";
        this.$refs.rateQuery4.style.color = "#fff";
        this.$refs.reimbursement3.style.color = "#fff";
        this.$refs.reimbursementAdmin3.style.color = "#fff";
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        this.$axios.post(this.$store.state.baseUrl + "/DataMaketPriceCount").then((res) => {
          this.dataMaketPriceCount = res.data.total;
        });
        if (this.isFirst == false) {
          this.isFirst = true;
        } else if (this.isFirst == true) {
          this.$axios.post(this.$store.state.baseUrl + '/DataMaketPriceList', {
            page: this.priceAdmin.page,
            pagenum: 10
          }).then((res) => {
            this.priceAdmin.total = res.data.total;
            this.priceAdmin.dataMaketPriceList = res.data.watchs;
          }).catch((err) => {
            console.log(err);
          })
        }
      },
      // 销售批发价查询
      marketSelect8() {
        this.marketSelect = 6;
        this.priceInquire.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入品牌、型号进行搜索';
        this.$refs.marketInventory.style.color = "#fff";
        this.$refs.saveInProgress.style.color = "#fff";
        this.$refs.completedSales.style.color = "#fff";
        this.$refs.peerAdmin3.style.color = '#fff';
        this.$refs.priceAdmin2.style.color = "#fff";
        this.$refs.priceInquire2.style.color = "#0c8563";
        this.$refs.watchQuery3.style.color = "#fff";
        this.$refs.rateQuery4.style.color = "#fff";
        this.$refs.reimbursement3.style.color = "#fff";
        this.$refs.reimbursementAdmin3.style.color = "#fff";
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
      // 销售手表查询
      marketSelect9() {
        this.marketSelect = 7;
        this.watchQuerySel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入手表品牌、系列、型号进行查询';
        this.$refs.marketInventory.style.color = "#fff";
        this.$refs.saveInProgress.style.color = "#fff";
        this.$refs.completedSales.style.color = '#fff';
        this.$refs.peerAdmin3.style.color = "#fff";
        this.$refs.priceAdmin2.style.color = "#fff";
        this.$refs.priceInquire2.style.color = "#fff";
        this.$refs.watchQuery3.style.color = "#0c8563";
        this.$refs.rateQuery4.style.color = "#fff";
        this.$refs.reimbursement3.style.color = "#fff";
        this.$refs.reimbursementAdmin3.style.color = "#fff";
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
      // 销售汇率查询
      marketSelect10() {
        this.marketSelect = 8;
        this.rateQuerySel.select = 0;
        this.isSearch = 1;
        this.fuzzyKeyword = '';
        this.promptMessage = '';
        this.$refs.marketInventory.style.color = "#fff";
        this.$refs.saveInProgress.style.color = "#fff";
        this.$refs.completedSales.style.color = "#fff";
        this.$refs.peerAdmin3.style.color = '#fff';
        this.$refs.priceAdmin2.style.color = "#fff";
        this.$refs.priceInquire2.style.color = "#fff";
        this.$refs.watchQuery3.style.color = "#fff";
        this.$refs.rateQuery4.style.color = "#0c8563";
        this.$refs.reimbursement3.style.color = "#fff";
        this.$refs.reimbursementAdmin3.style.color = "#fff";
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
      // 销售我的报销
      marketSelect11() {
        this.marketSelect = 9;
        this.reimbursementSel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入行程名称或行程描述进行搜索';
        this.$refs.marketInventory.style.color = "#fff";
        this.$refs.saveInProgress.style.color = "#fff";
        this.$refs.completedSales.style.color = "#fff";
        this.$refs.peerAdmin3.style.color = '#fff';
        this.$refs.priceAdmin2.style.color = "#fff";
        this.$refs.priceInquire2.style.color = "#fff";
        this.$refs.watchQuery3.style.color = "#fff";
        this.$refs.rateQuery4.style.color = "#fff";
        this.$refs.reimbursement3.style.color = "#0c8563";
        this.$refs.reimbursementAdmin3.style.color = "#fff";
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
      // 销售报销管理
      marketSelect12() {
        this.marketSelect = 10;
        this.reimbursementAdminSel.select = 0;
        this.isSearch = 0;
        this.fuzzyKeyword = '';
        this.promptMessage = '可输入用户名、昵称进行查询';
        this.$refs.marketInventory.style.color = "#fff";
        this.$refs.saveInProgress.style.color = "#fff";
        this.$refs.completedSales.style.color = "#fff";
        this.$refs.peerAdmin3.style.color = '#fff';
        this.$refs.priceAdmin2.style.color = "#fff";
        this.$refs.priceInquire2.style.color = "#fff";
        this.$refs.watchQuery3.style.color = "#fff";
        this.$refs.rateQuery4.style.color = "#fff";
        this.$refs.reimbursement3.style.color = "#fff";
        this.$refs.reimbursementAdmin3.style.color = "#0c8563";
        this.handleSureReimbursement();
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
    }
  };
</script>
<style lang="scss" scoped>
  .selected-circle-style {
    width: 10px;
    height: 10px;
    margin: 0;
    margin-top: 25px;
    margin-left: 3px;
    background-color: red;
    border-radius: 50%;
  }

  .filtrate {
    width: 35px;
    height: 35px;
    margin-right: 15px;
    cursor: pointer;
  }

  .top-search-button {
    width: 80px;
    height: 40px;
    margin-top: 20px;
    background-color: #0c7063;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 30px;
    cursor: pointer;
  }

  ul,
  li,
  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
  }

  .aside {
    width: 324px;
    padding-top: 30px;
    background: #0c7063;

    ul li {
      margin-top: 40px;
      list-style: none;
      cursor: pointer;
      color: #fff;
    }

    .aside-container {
      width: 100%;
      position: absolute;
      // padding-left: 10px;
      z-index: 999;
      text-align: center;

      .aside-top,
      .aside-top-admin {
        font-size: 28px;
        color: #fff;
        text-align: center;
        line-height: 36px;
      }

      .aside-top {
        padding: 0 60px;
      }

      .aside-top-admin {
        padding: 0 50px;
      }

      .person-ul {
        width: 100%;

        .first-li {
          padding-left: 30px;
          padding-right: 30px;

          .li-selected-background {
            width: 100%;
            height: 76px;
            margin-top: 10px;
            padding-left: 30px;
            line-height: 76px;
            background: url('../../assets/imgs/selected.png');
          }

          .icon {
            margin-right: 10px;
            font-size: 16px;
          }


        }

        .icon-size {
          width: 21px;
          height: 20px;
        }

      }
    }
  }

  .logoImg {
    width: 100px;
    height: 120px;
  }

  .close {
    display: none;
  }

  .open {
    width: 100%;
    display: block;
  }

  .up {
    color: #2e4d65;
  }

  .down {
    color: #f1f1f1;
  }

  .main {
    width: 89%;
    padding: 0;
    margin: 0;
    position: relative;

    .main-top {
      // width: 89%;
      height: 80px;
      padding-left: 50px;
      margin-bottom: 30px;
      position: fixed;
      top: 0;
      left: 324px;
      line-height: 80px;
      // border-bottom: 1px solid #dedede;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      background-color: #fff;
      z-index: 1;

      .main-top-left {
        position: absolute;
        top: 30px;
        left: 0;
        display: flex;
        line-height: 2;

        .first-fint-size {
          font-size: 18px;
        }

        .fint-size {
          font-size: 16px;
          color: #aaa;
        }
      }

      .main-top-right {
        width: 100%;
        height: 60px;
        position: relative;

        .loginout {
          margin-left: 5px;
          color: #000;
          font-size: 15px;
        }

        .right-div {
          width: 200px;
          position: absolute;
          top: 0;
          right: 570px;
          height: 45px;
          line-height: 45px;
          margin-top: 15px;
          padding: 0;
          display: flex;
          justify-content: space-evenly;
          cursor: pointer;

          .span1 {
            display: inline-block;
            font-size: 16px;
            color: #000;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .cut-off-rule {
          width: 2px;
          height: 26px;
          position: absolute;
          top: 27px;
          right: 530px;
          background-color: #f1f1f1;
        }

        .loginoutDiv {
          display: flex;
          line-height: 80px;
          position: absolute;
          top: 0;
          right: 390px;
          cursor: pointer;
        }

        .downbtn {
          width: 170px;
          padding: 10px 15px;
          position: absolute;
          top: 130%;
          right: 570px;
          background-color: #fff;
          border: 1px solid #ddd;
          border-radius: 20px;
          // box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 999;

          .updateUl,
          .updateLi1 {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .updateLi1 {
            .updateP {
              text-align: center;
              color: #000;

              .update-nick-img {
                // width: 50px;
                height: 40px;
                margin: 0 auto;
                line-height: 40px;
                border-radius: 15px;
                display: flex;
                justify-content: space-around;

                span {
                  font-size: 15px;
                }
              }

              .nick-img {
                width: 70%;
                margin: 10px auto;
                border-bottom: 1px solid #c8c8c8;
              }

              .psw-img {
                width: 70%;
                margin: 2px auto;
              }
            }

            .update-nick {
              width: 70%;
              padding-left: 20px;
              border-radius: 5px;
              border: 1px solid #ddd;
              outline: none;
            }

            .updateP:hover {
              cursor: pointer;
            }
          }

          .update-nick {
            width: 70%;
            padding-left: 20px;
            border-radius: 5px;
            border: 1px solid #ddd;
            outline: none;
          }

          li {
            line-height: 30px;
            text-align: left;
            padding-left: 5px;
          }

          a:hover {
            text-decoration: underline;
            color: #f00;
          }

          a {
            display: block;
            color: black;
            width: 100%;
          }
        }
      }
    }

    .main-container {
      width: 100%;
      // 1000px
      min-height: 900px;
      padding-bottom: 50px;
      margin-top: 80px;
      padding-top: 20px;
      background-color: #f1f9f7;
      z-index: 0;
    }

    .radius {
      width: 50px;
      height: 50px;
    }
  }
</style>
<style lang="scss">
  #container-home {
    .upload-imgs {
      margin: 20px 0;
    }

    .el-dialog {
      border-radius: 30px;
    }

    .el-button {
      height: 48px;
      border-radius: 6px;
      font-size: 16px;
    }

    .el-button--primary {
      color: #fff;
      background-color: #0c7063 !important;
      border-color: #0c7063 !important;
    }

    .el-dialog--center .el-dialog__footer {
      text-align: right;
    }

    .el-button+.el-button {
      margin-left: 10%;
    }


    .first-td {
      border-top-left-radius: 30px;
      border-bottom-left-radius: 30px;
    }

    .last-td {
      border-top-right-radius: 30px;
      border-bottom-right-radius: 30px;
    }

    table tr:hover>td {
      background-color: #d7ebe7 !important;
    }

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

    .el-input__suffix {
      width: 30%;
    }

    // .el-input {
    //   width: 60%;
    // }

    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 50%;
    }

    .el-input__inner {
      height: 40px;
      border-radius: 30px;
    }

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

    .input-search {
      font-size: 16px;
    }

    .el-form-item__label {
      font-size: 16px;
      text-align: right;
    }

    .el-pagination__editor.el-input .el-input__inner {
      height: 28px;
    }

    input[type=checkbox]:after {
      width: 20px;
      height: 20px;
    }

    .el-dialog__footer {
      padding: 10px 60px 30px;
    }

    .el-checkbox__label {
      font-size: 14px;
    }

    table>tr:hover>td {
      background-color: #d7ebe7 !important;
    }

    table>tr>th {
      height: 50px;
      line-height: 50px;
      background-color: #d7ebe7;
    }

    table>tr>td {
      background-color: #f3fbf9;
      border-bottom: 1px solid #d7ebe7;
    }
  }
</style>