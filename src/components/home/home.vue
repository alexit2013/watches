<template>
  <div class="container" id="container-home">
    <el-container class="container">
      <el-aside class="aside" style="width:11%;min-height:1560px;position: fixed;left: 0;">
        <div class="aside-container">
          <div style="padding-bottom: 10px;border-bottom:1px solid #ddd;">
            <img src="../../assets/imgs/logo.png" class="logoImg" />
          </div>
          <ul class="person-ul" v-if="role == 1">
            <li @click="admin1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 1 ? newProduct2 : newProduct1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="purchase icon" style="color:#2e4d65;margin-right: 0;" ref="statistics">统计</span>
                  <span v-show="adminLine == 1"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelectedselected == 2 ? my2 : my1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="settleAccounts" @click="admin2">结算</span>
                  <span v-show="adminLine == 2"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 3 ? my4 : my3" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="finalStament" @click="admin3">结算单</span>
                  <span v-show="adminLine == 3"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li v-show="peerFlag == 1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 4 ? peerImg2 : peerImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="peerAdmin3" @click="admin4">贸易商管理</span>
                  <span v-show="adminLine == 4"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
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
                  <span v-show="adminLine == 5"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li v-show="marketPriceFlag == 0">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 6 ? priceInquireImg2 : priceInquireImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="priceInquire3"
                    @click="admin6">批发价查询</span>
                  <span v-show="adminLine == 6"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="adminSelected == 7 ? priceInquireImg2 : priceInquireImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="storeQuery3" @click="admin7">店铺查询</span>
                  <span v-show="adminLine == 7"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
          </ul>
          <ul class="person-ul" v-if="role == 2">
            <li @click="selected1($event)">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected == 1 ? newProduct2 : newProduct1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="purchase icon" style="color:#2e4d65;margin-right: 0;" ref="purchase">代理商采购</span>
                  <span v-show="line == 1"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li @click="selected3">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected == 3 ? newProduct4 : newProduct3" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="purchase icon" style="margin-right: 0;" ref="trade">贸易商采购</span>
                  <span v-show="line == 5"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected == 2 ? my2 : my1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="myPur"
                    @click="closeAndOpen($event)">我的采购</span>
                  <span v-show="line == 2"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected ==4 ? product2 : product1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="logisticsView"
                    @click="selected4">物流</span>
                  <span v-show="line == 3"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected == 5 ? my4 : my3" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="statement" @click="selected5">结算单</span>
                  <span v-show="line == 4"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li v-show="peerFlag == 1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected == 6 ? peerImg2 : peerImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="peerAdmin"
                    @click="selected6">贸易商管理</span>
                  <span v-show="line == 6"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li v-show="marketPriceFlag == 1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected == 7 ? priceAdminImg2 : priceAdminImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="priceAdmin" @click="selected7">批发价管理</span>
                    <p v-if="dataMaketPriceCount > 0"
                      style="width: 10px; height: 10px;margin: 0;background-color: red;border-radius: 50%;"></p>
                  </div>
                  <span v-show="line == 7"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li v-show="marketPriceFlag == 0">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected == 8 ? priceInquireImg2 : priceInquireImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="priceInquire"
                    @click="selected8">批发价查询</span>
                  <span v-show="line == 8"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected == 9 ? priceInquireImg2 : priceInquireImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="storeQuery"
                    @click="selected9">店铺查询</span>
                  <span v-show="line == 9"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="selected == 10 ? priceInquireImg2 : priceInquireImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="watchQuery"
                    @click="selected10">手表查询</span>
                  <span v-show="line == 10"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
          </ul>
          <ul class="person-ul" v-if="role == 3">
            <li @click="select1($event)">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="warehouseSelect == 0 ? tabarImg2 : tabarImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;color:#2e4d65;" ref="stock">待入库</span>
                    <p v-if="stockInCount !== 0"
                      style="width: 10px; height: 10px;margin: 0;background-color: red;border-radius: 50%;"></p>
                  </div>
                  <span v-show="stockLine == 0"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div @click="select3($event)"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size"
                  :src="warehouseSelect == 2 || warehouseSelect == 3 ? tabarImg4 : tabarImg3" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="icon" style="margin-right: 0;" ref="inventory">库存</span>
                  <span v-show="stockLine == 2"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
              <ul id="haveAndNot" class="close">
                <li @click="select4" ref="notOutbound">未出库</li>
                <li @click="select5" ref="haveOutbound">已出库</li>
              </ul>
            </li>
            <li @click="select6">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="warehouseSelect == 4 ? tabarImg6 : tabarImg5" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="icon" style="margin-right: 0;" ref="delivery">出库/查询</span>
                  <span v-show="stockLine == 3"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li v-show="peerFlag == 1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="warehouseSelect == 5 ? peerImg2 : peerImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="peerAdmin2" @click="select7">贸易商管理</span>
                  <span v-show="stockLine == 4"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="warehouseSelect == 6 ? priceInquireImg2 : priceInquireImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="watchQuery2" @click="select8">手表查询</span>
                  <span v-show="stockLine == 5"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
          </ul>
          <ul class="person-ul" v-if="role == 4">
            <li>
              <div @click="marketSelect1"
                style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="marketSelect == 0 ? tabarImg4 : tabarImg3" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="icon" style="color:#2e4d65;margin-right: 0;" ref="marketInventory">库存</span>
                  <span v-show="marketLine == 0"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li @click="marketSelect4">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="marketSelect == 2 ? tabarImg7 : tabarImg8" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="saveInProgress">进行中销售</span>
                    <p v-if="sellPendOrderCount !== 0"
                      style="width: 10px; height: 10px;margin: 0;background-color: red;border-radius: 50%;"></p>
                  </div>
                  <span v-show="marketLine == 1"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li @click="marketSelect5">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="marketSelect == 3 ? tabarImg9 : tabarImg10" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="icon" style="margin-right: 0;" ref="completedSales">已完成销售</span>
                  <span v-show="marketLine == 2"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li v-show="peerFlag == 1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="marketSelect == 4 ? peerImg2 : peerImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="peerAdmin3"
                    @click="marketSelect6">贸易商管理</span>
                  <span v-show="marketLine == 3"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li v-show="marketPriceFlag == 1">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="marketSelect == 5 ? priceAdminImg2 : priceAdminImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <div style="display: flex;">
                    <span class="icon" style="margin-right: 0;" ref="priceAdmin2" @click="marketSelect7">批发价管理</span>
                    <p v-if="dataMaketPriceCount > 0"
                      style="width: 10px; height: 10px;margin: 0;background-color: red;border-radius: 50%;"></p>
                  </div>
                  <span v-show="marketLine == 4"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li v-show="marketPriceFlag == 0">
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="marketSelect == 6 ? priceInquireImg2 : priceInquireImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="priceInquire2"
                    @click="marketSelect8">批发价查询</span>
                  <span v-show="marketLine == 5"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
            <li>
              <div style="width: 100%;display: flex;justify-content: space-between;line-height:20px;">
                <img class="icon icon-size" :src="marketSelect == 7 ? priceInquireImg2 : priceInquireImg1" />
                <div style="width: 100%;display: flex;justify-content: space-between;">
                  <span class="my-purchase icon" style="margin-right: 0;" ref="watchQuery3"
                    @click="marketSelect9">手表查询</span>
                  <span v-show="marketLine == 6"
                    style="width: 5px;hieght: 15px;background-color: #2d4e65;border-radius: 10px;"></span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-aside>
      <el-main class="main" style="margin-left: 11%;">
        <el-backtop>
          <img src="../../assets/imgs/top.png" class="radius" />
        </el-backtop>
        <el-col :span="24" class="main-top">
          <el-row>
            <div class="main-top-right">
              <div style="display: flex;">
                <div class="right-div" @click="updateUserClick">
                  <span class="span1">Hi，{{this.$store.state.nick}}</span>
                  <div>
                    <img src="../../assets/imgs/down.png" style="margin-left: 20px;" />
                  </div>
                </div>
                <div @click="logOut"
                  style="display: flex;line-height: 120px;position: absolute;top: 0;right: 8%;cursor: pointer;">
                  <div style="margin-top: 3px;">
                    <img src="../../assets/imgs/logOut.png" style="width: 20px;height: 20px;" />
                  </div>
                  <span class="loginout">退出登录</span>
                </div>
              </div>
              <div class="downbtn" v-if="updateUser==0">
                <ul class="updateUl">
                  <li class="updateLi1">
                    <div class="updateP" @click="nickDialogVisible = true">
                      <div class="nick-img">
                        <div class="update-nick-img">
                          <img src="../../assets/imgs/update-nick.png" style="width: 25px;height: 30px;" />
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
                    <div class="updateP" @click="pswDialogVisible = true">
                      <div class="psw-img">
                        <div class="update-nick-img">
                          <img src="../../assets/imgs/update-psw.png" style="width: 25px;height: 30px;" />
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
                          type="text" v-model="oldpsw" placeholder="请输入旧密码" />
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
            <My-purchase v-if="selected == 2" :selectSearch="selectSearch" :numSelect="numSelect" :orders="orders">
            </My-purchase>
            <!-- 物流 -->
            <Logistics-view v-if="selected == 4" :logisticsView="logisticsView"></Logistics-view>
            <!-- 结算单 -->
            <Statement v-if="selected == 5"></Statement>
            <!-- 贸易商管理 -->
            <Peer-admin v-if="adminSelected == 4 || selected == 6 || warehouseSelect == 5 || marketSelect == 4"
              @peerSel="peerSel">
            </Peer-admin>
            <!-- 批发价管理 -->
            <Price-admin v-if="adminSelected == 5 || selected == 7 || marketSelect == 5" :priceAdmin="priceAdmin"
              @priceCount="priceCount">
            </Price-admin>
            <!-- 批发价查询 -->
            <Price-inquire v-if="adminSelected == 6 || selected == 8 || marketSelect == 6" :priceInquire="priceInquire">
            </Price-inquire>
            <!-- 店铺查询 -->
            <Store-query v-if="adminSelected == 7 || selected == 9" @storeJump="storeJump"
              :storeQuerySel="storeQuerySel"></Store-query>
            <!-- 手表查询 -->
            <Watch-query v-if="selected == 10 || warehouseSelect == 6 || marketSelect == 7"
              :watchQuerySel="watchQuerySel"></Watch-query>
            <!-- 待入库 -->
            <Stock-list v-if="warehouseSelect == 0" :stock1="stock1" @getStockCount="getStockCount"></Stock-list>
            <!-- 未出库 -->
            <Not-outbound v-if="warehouseSelect == 2" :notOutbound="notOutbound" :notOrders="notOrders"></Not-outbound>
            <!-- 已出库 -->
            <Have-outbound v-if="warehouseSelect == 3" :haveBound="haveBound"></Have-outbound>
            <!-- 出库/查询 -->
            <Outbound-query v-if="warehouseSelect == 4" :outboundQuery="outboundQuery"></Outbound-query>
            <!-- 待售 -->
            <For-sale v-if="marketSelect == 0" :forSale="forSale"></For-sale>
            <!-- 在售 -->
            <On-sale v-if="marketSelect == 2" @getSellPendOrderCount="getSellPendOrderCount"></On-sale>
            <!-- 已完成销售 -->
            <Completed-sale v-if="marketSelect == 3"></Completed-sale>
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
        peerFlag: '',
        marketPriceFlag: '',
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
        oldpsw: "",
        newPsw: "",
        role: 0,
        peerImg1: require("../../assets/imgs/11.png"),
        peerImg2: require("../../assets/imgs/11-1.png"),
        priceAdminImg1: require("../../assets/imgs/13.png"),
        priceAdminImg2: require("../../assets/imgs/13-1.png"),
        priceInquireImg1: require("../../assets/imgs/12.png"),
        priceInquireImg2: require("../../assets/imgs/12-1.png"),
        newProduct1: require("../../assets/imgs/01.png"),
        newProduct2: require("../../assets/imgs/01-1.png"),
        newProduct3: require("../../assets/imgs/10.png"),
        newProduct4: require("../../assets/imgs/10-1.png"),
        my1: require("../../assets/imgs/02.png"),
        my2: require("../../assets/imgs/02-1.png"),
        my3: require("../../assets/imgs/09.png"),
        my4: require("../../assets/imgs/09-1.png"),
        product1: require("../../assets/imgs/03.png"),
        product2: require("../../assets/imgs/03-1.png"),
        tabarImg1: require('../../assets/imgs/04.png'),
        tabarImg2: require('../../assets/imgs/04-1.png'),
        tabarImg3: require('../../assets/imgs/05.png'),
        tabarImg4: require('../../assets/imgs/05-1.png'),
        tabarImg5: require('../../assets/imgs/06.png'),
        tabarImg6: require('../../assets/imgs/06-1.png'),
        tabarImg7: require('../../assets/imgs/07-1.png'),
        tabarImg8: require('../../assets/imgs/07.png'),
        tabarImg9: require('../../assets/imgs/08-1.png'),
        tabarImg10: require('../../assets/imgs/08.png'),
        selectSearch: {
          id: 1,
          msg: 0
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

      };
    },
    created() {
      console.log(sessionStorage.getItem('peerFlag'));
      this.peerFlag = sessionStorage.getItem('peerFlag');
      // this.peerFlag = 1;
      this.marketPriceFlag = sessionStorage.getItem('marketPriceFlag');
      this.$store.state.nick = sessionStorage.getItem("nick");
      this.getBreadList();
      this.role = sessionStorage.getItem("role");
      if (this.role == 2) {
        this.selected = 1;
      } else if (this.role !== 2) {
        this.selected = 50;
      }
      if (this.role == 3) {
        this.warehouseSelect = 0;
      } else if (this.role !== 3) {
        this.warehouseSelect = 51;
      }
      if (this.role == 4) {
        this.marketSelect = 0;
      } else if (this.role !== 4) {
        this.marketSelect = 52;
      }
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
      })
    },
    methods: {
      getStockCount(val) {
        this.stockInCount = val;
      },
      getSellPendOrderCount(val) {
        this.sellPendOrderCount = val;
      },
      priceCount(val) {
        this.dataMaketPriceCount = val;
      },
      peerSel(val) {
        console.log(val);
        this.selected3();
      },
      storeJump(val) {
        console.log('店铺跳转');
        console.log(val);
        this.purchasePro = val;
        this.line = 1;
        this.selected = 1;
        this.$refs.purchase.style.color = "#2e4d65";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.myPur.style.color = '#c8c8c8';
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#c8c8c8";
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
      // 修改昵称
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
      updatePsw() {
        console.log(sessionStorage.getItem("token"));
        console.log(this.oldpsw, this.newPsw);
        this.$axios
          .post(this.$store.state.baseUrl + "/UserModify", {
            oldpsw: this.oldpsw,
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
              this.oldpsw = '';
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
      // 管理统计
      admin1() {
        this.adminLine = 1;
        this.adminSelected = 1;
        this.$refs.statistics.style.color = '#2d4e65';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
        location.reload();
      },
      // 结算
      admin2() {
        this.adminLine = 2;
        this.adminSelected = 2;
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#2d4e65';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
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
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#2d4e65';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
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
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#2d4e65';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
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
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#2d4e65';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
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
        })
      },
      // 管理批发价查询
      admin5() {
        this.adminLine = 6;
        this.adminSelected = 6;
        this.priceInquire.select = 0;
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#2d4e65';
        this.$refs.storeQuery3.style.color = '#c8c8c8';
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
        this.$refs.statistics.style.color = '#c8c8c8';
        this.$refs.settleAccounts.style.color = '#c8c8c8';
        this.$refs.finalStament.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin3.style.color = '#c8c8c8';
        this.$refs.priceInquire3.style.color = '#c8c8c8';
        this.$refs.storeQuery3.style.color = '#2d4e65';
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
        this.line = 1;
        this.selected = 1;
        // this.purchaseSelect.num = 0;
        this.$refs.purchase.style.color = "#2e4d65";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.myPur.style.color = '#c8c8c8';
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#c8c8c8";
        this.$refs.watchQuery.style.color = "#c8c8c8";
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        location.reload();
      },
      // 贸易商采购
      selected3() {
        this.line = 5;
        this.selected = 3;
        this.$refs.trade.style.color = "#2e4d65";
        this.$refs.purchase.style.color = "#c8c8c8";
        this.$refs.myPur.style.color = '#c8c8c8';
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#c8c8c8";
        this.$refs.watchQuery.style.color = "#c8c8c8";
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
        this.line = 2;
        this.selected = 2;
        this.selectSearch.msg = 0;
        this.numSelect.select = 2;
        e.target.style.color = "#2e4d65";
        this.$refs.purchase.style.color = "#c8c8c8";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#c8c8c8";
        this.$refs.watchQuery.style.color = "#c8c8c8";
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
      // 物流
      selected4() {
        this.selected = 4;
        this.line = 3;
        this.$refs.purchase.style.color = "#c8c8c8";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.logisticsView.style.color = "#2e4d65";
        this.$refs.myPur.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#c8c8c8";
        this.$refs.watchQuery.style.color = "#c8c8c8";
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
        this.line = 4;
        this.$refs.purchase.style.color = "#c8c8c8";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.myPur.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#2e4d65";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#c8c8c8";
        this.$refs.watchQuery.style.color = "#c8c8c8";
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
        this.line = 6;
        this.$refs.purchase.style.color = "#c8c8c8";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.myPur.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#2e4d65";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#c8c8c8";
        this.$refs.watchQuery.style.color = "#c8c8c8";
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
        this.line = 7;
        this.priceAdmin.select = 0;
        this.priceAdmin.keyword = '';
        this.priceAdmin.page = 1;
        this.$refs.purchase.style.color = "#c8c8c8";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.myPur.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#2e4d65";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#c8c8c8";
        this.$refs.watchQuery.style.color = "#c8c8c8";
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
        this.line = 8;
        this.priceInquire.select = 0;
        this.$refs.purchase.style.color = "#c8c8c8";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.myPur.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#2e4d65";
        this.$refs.storeQuery.style.color = "#c8c8c8";
        this.$refs.watchQuery.style.color = "#c8c8c8";
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
        this.line = 9;
        this.storeQuerySel.select = 0;
        this.$refs.purchase.style.color = "#c8c8c8";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.myPur.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#2e4d65";
        this.$refs.watchQuery.style.color = "#c8c8c8";
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
        this.line = 10;
        this.watchQuerySel.select = 0;
        this.$refs.purchase.style.color = "#c8c8c8";
        this.$refs.trade.style.color = "#c8c8c8";
        this.$refs.logisticsView.style.color = "#c8c8c8";
        this.$refs.myPur.style.color = "#c8c8c8";
        this.$refs.statement.style.color = "#c8c8c8";
        this.$refs.peerAdmin.style.color = "#c8c8c8";
        this.$refs.priceAdmin.style.color = "#c8c8c8";
        this.$refs.priceInquire.style.color = "#c8c8c8";
        this.$refs.storeQuery.style.color = "#c8c8c8";
        this.$refs.watchQuery.style.color = "#2e4d65";
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
      select1(e) {
        this.warehouseSelect = 0;
        this.stockLine = 0;
        this.$refs.stock.style.color = "#2d4e65";
        this.$refs.inventory.style.color = "#c8c8c8";
        this.$refs.notOutbound.style.color = "#c8c8c8";
        this.$refs.haveOutbound.style.color = "#c8c8c8";
        this.$refs.delivery.style.color = "#c8c8c8";
        this.$refs.peerAdmin2.style.color = '#c8c8c8';
        this.$refs.watchQuery2.style.color = "#c8c8c8";
        let haveAndNot = document.getElementById("haveAndNot");
        haveAndNot.className = "close";
        this.stock1.num = 0;
        // location.reload();
        location.reload();
      },
      // 库存
      select3(e) {
        console.log(e);
        this.warehouseSelect = 2;
        this.stockLine = 2;
        this.$refs.stock.style.color = "#c8c8c8";
        this.$refs.inventory.style.color = "#2d4e65";
        this.$refs.notOutbound.style.color = "#2d4e65";
        this.$refs.haveOutbound.style.color = "#c8c8c8";
        this.$refs.delivery.style.color = "#c8c8c8";
        this.$refs.peerAdmin2.style.color = '#c8c8c8';
        this.$refs.watchQuery2.style.color = "#c8c8c8";
        let haveAndNot = document.getElementById("haveAndNot");
        if (haveAndNot.className == "close") {
          haveAndNot.className = "open";
          this.warehouseSelect = 2;
        } else if (haveAndNot.className == "open") {
          haveAndNot.className = "close";
        }
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
        this.$refs.stock.style.color = "#c8c8c8";
        this.$refs.inventory.style.color = "#2d4e65";
        this.$refs.notOutbound.style.color = "#2d4e65";
        this.$refs.haveOutbound.style.color = "#c8c8c8";
        this.$refs.delivery.style.color = "#c8c8c8";
        this.$refs.peerAdmin2.style.color = '#c8c8c8';
        this.$refs.watchQuery2.style.color = "#c8c8c8";
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
        this.$refs.stock.style.color = "#c8c8c8";
        this.$refs.inventory.style.color = "#2d4e65";
        this.$refs.notOutbound.style.color = "#c8c8c8";
        this.$refs.haveOutbound.style.color = "#2d4e65";
        this.$refs.delivery.style.color = "#c8c8c8";
        this.$refs.peerAdmin2.style.color = '#c8c8c8';
        this.$refs.watchQuery2.style.color = "#c8c8c8";
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
        this.stockLine = 3;
        this.outboundQuery.query = 0;
        this.$refs.stock.style.color = "#c8c8c8";
        this.$refs.inventory.style.color = "#c8c8c8";
        this.$refs.delivery.style.color = "#2d4e65";
        this.$refs.peerAdmin2.style.color = '#c8c8c8';
        this.$refs.peerAdmin2.style.color = '#c8c8c8';
        this.$refs.watchQuery2.style.color = "#c8c8c8";
        let haveAndNot = document.getElementById("haveAndNot");
        haveAndNot.className = "close";
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
      // 仓库贸易商管理
      select7() {
        this.warehouseSelect = 5;
        this.stockLine = 4;
        this.$refs.stock.style.color = "#c8c8c8";
        this.$refs.inventory.style.color = "#c8c8c8";
        this.$refs.delivery.style.color = '#c8c8c8';
        this.$refs.peerAdmin2.style.color = '#c8c8c8';
        this.$refs.peerAdmin2.style.color = "#2d4e65";
        this.$refs.watchQuery2.style.color = "#c8c8c8";
        let haveAndNot = document.getElementById("haveAndNot");
        haveAndNot.className = "close";
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
        this.stockLine = 5;
        this.watchQuerySel.select = 0;
        this.$refs.stock.style.color = "#c8c8c8";
        this.$refs.inventory.style.color = "#c8c8c8";
        this.$refs.delivery.style.color = '#c8c8c8';
        this.$refs.peerAdmin2.style.color = '#c8c8c8';
        this.$refs.peerAdmin2.style.color = "#c8c8c8";
        this.$refs.watchQuery2.style.color = "#2d4e65";
        let haveAndNot = document.getElementById("haveAndNot");
        haveAndNot.className = "close";
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
        this.marketLine = 0;
        this.forSale.sale = 0;
        this.$refs.marketInventory.style.color = "#2d4e65";
        this.$refs.saveInProgress.style.color = "#c8c8c8";
        this.$refs.completedSales.style.color = "#c8c8c8";
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin2.style.color = "#c8c8c8";
        this.$refs.priceInquire2.style.color = "#c8c8c8";
        this.$refs.watchQuery3.style.color = "#c8c8c8";
        // 页面回到顶部
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        location.reload();
      },
      // 进行中的销售
      marketSelect4() {
        this.marketSelect = 2;
        this.marketLine = 1;
        this.$refs.marketInventory.style.color = "#c8c8c8";
        this.$refs.saveInProgress.style.color = "#2d4e65";
        this.$refs.completedSales.style.color = "#c8c8c8";
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin2.style.color = "#c8c8c8";
        this.$refs.priceInquire2.style.color = "#c8c8c8";
        this.$refs.watchQuery3.style.color = "#c8c8c8";
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
        this.marketLine = 2;
        this.$refs.marketInventory.style.color = "#c8c8c8";
        this.$refs.saveInProgress.style.color = "#c8c8c8";
        this.$refs.completedSales.style.color = "#2d4e65";
        this.$refs.peerAdmin3.style.color = '#c8c8c8';
        this.$refs.priceAdmin2.style.color = "#c8c8c8";
        this.$refs.priceInquire2.style.color = "#c8c8c8";
        this.$refs.watchQuery3.style.color = "#c8c8c8";
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
      // 销售贸易商管理
      marketSelect6() {
        this.marketSelect = 4;
        this.marketLine = 3;
        this.$refs.marketInventory.style.color = "#c8c8c8";
        this.$refs.saveInProgress.style.color = "#c8c8c8";
        this.$refs.completedSales.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = "#2d4e65";
        this.$refs.priceAdmin2.style.color = "#c8c8c8";
        this.$refs.priceInquire2.style.color = "#c8c8c8";
        this.$refs.watchQuery3.style.color = "#c8c8c8";
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
        this.marketLine = 4;
        this.priceAdmin.select = 0;
        this.$refs.marketInventory.style.color = "#c8c8c8";
        this.$refs.saveInProgress.style.color = "#c8c8c8";
        this.$refs.completedSales.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = "#c8c8c8";
        this.$refs.priceAdmin2.style.color = "#2d4e65";
        this.$refs.priceInquire2.style.color = "#c8c8c8";
        this.$refs.watchQuery3.style.color = "#c8c8c8";
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
        })
      },
      // 销售批发价查询
      marketSelect8() {
        this.marketSelect = 6;
        this.marketLine = 5;
        this.priceInquire.select = 0;
        this.$refs.marketInventory.style.color = "#c8c8c8";
        this.$refs.saveInProgress.style.color = "#c8c8c8";
        this.$refs.completedSales.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = "#c8c8c8";
        this.$refs.priceAdmin2.style.color = "#c8c8c8";
        this.$refs.priceInquire2.style.color = "#2d4e65";
        this.$refs.watchQuery3.style.color = "#c8c8c8";
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
        this.marketLine = 6;
        this.watchQuerySel.select = 0;
        this.$refs.marketInventory.style.color = "#c8c8c8";
        this.$refs.saveInProgress.style.color = "#c8c8c8";
        this.$refs.completedSales.style.color = '#c8c8c8';
        this.$refs.peerAdmin3.style.color = "#c8c8c8";
        this.$refs.priceAdmin2.style.color = "#c8c8c8";
        this.$refs.priceInquire2.style.color = "#c8c8c8";
        this.$refs.watchQuery3.style.color = "#2d4e65";
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
  ul,
  li,
  a {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
  }

  .aside {
    width: 13%;
    padding-top: 30px;
    background: #fff;

    ul li {
      margin-top: 40px;
      list-style: none;
      cursor: pointer;
      color: #c8c8c8;
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
        color: #c8c8c8;
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

        li {
          padding-left: 15px;
        }

        .icon {
          margin-right: 15px;
        }

        .icon-size {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  @media screen and (min-width: 1441px) {
    .icon {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 1440px) {
    .aside {
      ul li span {
        font-size: 15px;
      }
    }
  }

  @media screen and (min-width: 1121px) {
    .logoImg {
      width: 100px;
      height: 120px;
    }
  }

  @media screen and(max-width: 1120px) {
    .logoImg {
      width: 80px;
      height: 100px;
    }
  }

  .close {
    display: none;
  }

  .open {
    width: 75%;
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
    background-color: #f2f5f9;

    .main-top {
      width: 100%;
      height: 100px;
      padding-left: 40px;
      margin-bottom: 30px;
      line-height: 100px;
      // border-bottom: 1px solid #dedede;
      // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      // background-color: #f2f5f7;

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
          color: #2e4d65;
        }

        .right-div {
          width: 15%;
          position: absolute;
          top: 0;
          right: 20%;
          height: 60px;
          line-height: 60px;
          margin-top: 30px;
          padding: 0 15px;
          display: flex;
          justify-content: space-evenly;
          border: 1px solid #c8c8c8;
          border-radius: 10px;
          cursor: pointer;

          .span1 {
            display: inline-block;
            font-size: 16px;
            color: #2e4d65;
            overflow: hidden;
            word-break: keep-all;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .downbtn {
          width: 15%;
          padding: 10px 15px;
          position: absolute;
          top: 180%;
          right: 20%;
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
              color: #2e4d65;

              .update-nick-img {
                // width: 50px;
                height: 40px;
                margin: 0 auto;
                line-height: 40px;
                border-radius: 15px;
                display: flex;
                justify-content: space-around;
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
      min-height: 1000px;
      padding-bottom: 50px;
      // background-color: #f2f5f7;
      // margin: 2%;
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
      width: 20%;
      height: 50px;
      border-radius: 23px;
      font-size: 15px;
    }

    .el-button--primary {
      color: #fff;
      background-color: #2d4e65 !important;
      border-color: #2d4e65 !important;
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
      height: 45px;
      border-radius: 30px;
    }

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
  }
</style>