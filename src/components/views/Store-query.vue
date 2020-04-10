<template>
  <div class="store-query-container">
    <!-- <h3>店铺查询页面</h3> -->
    <div>
      <div class="store-query-top">
        <div class="stockSearch">
          <!-- 型号：模糊查找    品牌：全匹配class="el-input__inner" -->
          <el-input placeholder="可输入店铺名称、地址、国家等信息进行查询" class="input-search" prefix-icon="el-icon-search"
            v-model="keyword" @input="stockInSearch"></el-input>
        </div>
        <div class="addBtn">
          <el-button style="width: 100%;" type="primary" @click="addStore">增加</el-button>
          <el-dialog title="增加店铺" :visible.sync="dialogStoreQueryVisible" center :close-on-press-escape="false"
            :close-on-click-modal="false">
            <div>
              <el-form label-width="180px">
                <el-form-item label="代理商名称：" required>
                  <el-input v-model="agent" class="input-style"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称：" required>
                  <el-input v-model="name" class="input-style"></el-input>
                </el-form-item>
                <el-form-item label="国家：" required>
                  <el-select v-model="country" placeholder="请选择" class="input-style">
                    <el-option v-for="(coun, index) in countryList" :key="index" :label="coun.CnName"
                      :value="coun.CnName"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="城市中文名称：" required>
                  <el-input v-model="cityCn" class="input-style"></el-input>
                </el-form-item>
                <el-form-item label="城市英文名称：" required>
                  <el-input v-model="cityEn" class="input-style"></el-input>
                </el-form-item>
                <el-form-item label="中文地址：">
                  <el-input type="textarea" v-model="addrCn" class="input-style"></el-input>
                </el-form-item>
                <el-form-item label="英文地址：">
                  <el-input type="textarea" v-model="addrEn" class="input-style"></el-input>
                </el-form-item>
                <el-form-item label="GPS坐标：">
                  <div style="display: flex;justify-content: space-between;">
                    <div class="input-style">
                      <el-input v-model="GPS"></el-input>
                      <div id="map" style="width:500px;height:380px;display: none;"></div>
                    </div>
                    <div style="display: flex;line-height: 45px;cursor: pointer;">
                      <div style="margin-right: 3px;line-height: 56px;">
                        <img src="../../assets/imgs/position.png" style="width: 25px;height: 25px;" />
                      </div>
                      <p @click="getLocation"
                        style="height: 35px;line-height: 35px;padding: 0 5px;margin: 0;border: 1px solid #ddd; border-radius: 10px;">
                        当前位置</p>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="主营品牌：" required>
                  <el-checkbox-group v-model="sellBrandList">
                    <el-checkbox :label="brand.name" v-for="(brand, index) of watchBrandList" :key="index">
                    </el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="联系人：">
                  <el-input v-model="contactName" placeholder="请输入联系人姓名" class="input-style"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：">
                  <el-input type="textarea" v-model="contanctNote" placeholder="请输入联系人联系方式" class="input-style">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer">
              <el-button @click="dialogStoreQueryVisible = false">取 消</el-button>
              <el-button type="primary" @click="addStoreSure">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <div style="width: 80%; margin: 0 auto;display: flex;justify-content: space-between;">
        <p>总共查询到{{nums}}个店铺</p>
        <div style="padding-top: 10px;cursor: pointer;" @click="modeSwitch">
          <img src="../../assets/imgs/cut.png" style="width: 50px;height: 30px;" />
        </div>
      </div>
      <div v-show="storeList.length == 0" ref="hello" style="text-align: center;">
        <p></p>
      </div>
      <div v-if="storeQuerySel.select == 0" class="store-query-map">
        <p>地图模式</p>
        <div id="googleMap" style="height: 500px;"></div>
      </div>
      <div class="store-query-center" v-if="storeQuerySel.select == 1">
        <div v-if="storeList.length !== 0">
          <table class="store-table">
            <tr>
              <th>店铺信息</th>
              <th>距离</th>
              <th>操作</th>
            </tr>
            <tr v-for="(item,index) in list" :key="index">
              <td class="first-td" style="text-align: left;">
                <p style="font-weight: bold;">{{item.name}}</p>
                <p style="color: #666; font-size: 14px;">{{item.AddrCn == '' ? item.AddrEn : item.AddrCn}}</p>
                <p style="color: #666; font-size: 14px;">经营品牌： {{item.brands}}</p>
              </td>
              <!-- <div v-for="(brand,index) in item.brands.split('|')" :key="index">
                <p>{{brand}}</p>
              </div> -->
              <td>{{getDistance(item.GPS) + ' km'}}</td>
              <td class="last-td">
                <p style="color: #0aa1ed;cursor: pointer;" @click="updateStore(item)">查看</p>
                <el-dialog title="修改店铺信息" :visible.sync="dialogStoreUpdateVisible" center :close-on-press-escape="false"
                  :close-on-click-modal="false">
                  <div>
                    <el-form label-width="180px">
                      <el-form-item label="代理商名称：" required>
                        <el-input v-model="agent" class="input-style" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="店铺名称：" required>
                        <el-input v-model="name" class="input-style" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="国家：" required>
                        <el-select v-model="country" placeholder="请选择" class="input-style" disabled>
                          <el-option v-for="(coun, index) in countryList" :key="index" :label="coun.CnName"
                            :value="coun.CnName"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="城市中文名称：" required>
                        <el-input v-model="cityCn" class="input-style" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="城市英文名称：" required>
                        <el-input v-model="cityEn" class="input-style" disabled></el-input>
                      </el-form-item>
                      <el-form-item label="中文地址：">
                        <el-input type="textarea" v-model="addrCn" class="input-style"></el-input>
                      </el-form-item>
                      <el-form-item label="英文地址：">
                        <el-input type="textarea" v-model="addrEn" class="input-style"></el-input>
                      </el-form-item>
                      <el-form-item label="GPS坐标：" v-if="storeFlag == 1">
                        <div style="display: flex;justify-content: space-between;">
                          <div class="input-style">
                            <el-input v-model="GPS"></el-input>
                            <!-- <el-amap vid="amap" class="amap-demo" style="display: none;"></el-amap> -->
                          </div>
                          <div style="display: flex;line-height: 45px;cursor: pointer;">
                            <div style="margin-right: 3px;line-height: 56px;">
                              <img src="../../assets/imgs/position.png" style="width: 25px;height: 25px;" />
                            </div>
                            <p @click="getLocation"
                              style="height: 35px;line-height: 35px;padding: 0 5px;margin: 0;border: 1px solid #ddd; border-radius: 10px;">
                              当前位置</p>
                          </div>
                        </div>
                      </el-form-item>
                      <el-form-item label="主营品牌：" required>
                        <el-checkbox-group v-model="sellBrandList" disabled>
                          <el-checkbox :label="brand.name" v-for="(brand, index) of watchBrandList" :key="index">
                          </el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                      <el-form-item label="联系人：">
                        <el-input v-model="contactName" placeholder="请输入联系人姓名" class="input-style"></el-input>
                      </el-form-item>
                      <el-form-item label="联系方式：">
                        <el-input type="textarea" v-model="contanctNote" placeholder="请输入联系人联系方式" class="input-style">
                        </el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogStoreUpdateVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateStoreSure">确定修改</el-button>
                  </div>
                </el-dialog>
                <!--  v-if="storeFlag == 1" -->
                <p style="color: #0aa1ed;cursor: pointer;" @click="deletStore(item.id)">删除</p>
                <el-dialog title="删除该店铺" :visible.sync="dialogStoreDeletVisible" center :close-on-press-escape="false"
                  :close-on-click-modal="false">
                  <div style="text-align: center;">
                    <p>确定删除该店铺信息？删除后不可恢复</p>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogStoreDeletVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deletStoreSure">确 定</el-button>
                  </div>
                </el-dialog>
                <p style="color: #0aa1ed;cursor: pointer;" @click="goHere(item.GPS)">到这里</p>
                <el-dialog title="路线规划" :visible.sync="dialogHereVisible">
                  <div style="height: 300px;">
                    <el-amap vid="amap" class="amap-demo" id="hereContainer"></el-amap>
                  </div>
                  <div slot="footer">
                    <el-button @click="dialogHereVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogHereVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
                <p style="color: #0aa1ed;cursor: pointer;" v-if="role == 2" @click="purchaseJump(item)">新建采购单</p>
              </td>
            </tr>
          </table>
          <div style="width: 100%;height: 50px;">
            <div style="margin:15px 0;position:absolute;right:6%;">
              <el-pagination @current-change="handleCurrentChange" :current-page="page"
                layout="total, prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  var map, marker;
  export default {
    data() {
      let self = this;
      return {
        myLng: '',
        myLat: '',
        storeFlag: 0,
        role: 0,
        storeList: [],
        list: [],
        page: 1,
        pagenum: 10,
        total: 0,
        keyword: '',
        dialogStoreQueryVisible: false,
        agent: '', // 代理商名称
        name: '', // 店铺名称
        country: '', // 国家
        countryList: [],
        cityCn: '', // 城市中文名称
        cityEn: '', // 城市英文名称
        addrCn: '', // 中文地址
        addrEn: '', // 英文地址
        GPS: '', // gps坐标
        watchBrandList: [],
        sellBrandList: [], // 所选择的主营品牌
        brands: '', // 主营品牌
        contactName: '', // 联系人
        contanctNote: '', // 联系方式
        positions: {
          lng: "",
          lat: "",
          address: "",
          loaded: false
        },
        center: [121.59996, 31.197646],
        nums: 0,
        dialogStoreUpdateVisible: false,
        updateId: 0,
        dialogStoreDeletVisible: false,
        deletId: 0,
        dialogHereVisible: false,


        map: null,
        Mymarker: null,
        Mylat: 0,
        Mylong: 0,


        show: false,
        center: {
          lng: 106,
          lat: 30.2
        },
        icon: '../../assets/imgs/error.png',
        position: {},
        websock: null,
      }
    },
    props: ["storeQuerySel"],
    created() {
      this.storeFlag = sessionStorage.getItem('storeFlag');
      // this.storeFlag = 1;
      this.role = sessionStorage.getItem("role");
      this.handleCountryGet();
      this.handleBrand();
      // this.getLocation();
    },
    mounted() {
      this.mapBuild();
    },
    methods: {

      //  地图实例
      mapBuild() {
        navigator.geolocation.getCurrentPosition(function (position) {
          this.Mylat = position.coords.latitude;
          this.Mylong = position.coords.longitude;
        });
        console.log('坐标');
        console.log(this.Mylat + '-----' + this.Mylong);
        // this.center.lng = this.Mylong;
        // this.center.lat = this.Mylat;
        //创建地图实例，zoom是缩放比例
        let map = new google.maps.Map(document.getElementById('googleMap'), {
          zoom: 3,
          center: this.center,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        let myCenter = null;
        console.log(this.list);
        let Mymarker = null;
        for (let i = 0; i < this.list.length; i++) {
          //创建一个标记
          console.log(this.list[i].GPS);
          myCenter = new google.maps.LatLng(this.list[i].GPS.split(',')[1], this.list[i].GPS.split(',')[0]);
          let str = this.list[i].name;
          Mymarker = new google.maps.Marker({
            position: myCenter,
          });
          Mymarker.setMap(map);

          let infowindow = new google.maps.InfoWindow({
            content: str,
            size: new google.maps.Size(50, 50)
          });

          google.maps.event.addListener(Mymarker, 'click', function () {
            infowindow.open(map, Mymarker);
          });
          map.panTo(Mymarker);
        }
        // var myCenter = new google.maps.LatLng(30, 100);
        // var Mymarker = new google.maps.Marker({
        //   position: myCenter,
        // });
        // Mymarker.setMap(map);

        // var infowindow = new google.maps.InfoWindow({
        //   content: "str<",
        //   size: new google.maps.Size(50, 50)
        // });
        // google.maps.event.addListener(Mymarker, 'click', function () {
        //   infowindow.open(map, Mymarker);
        // });
        // map.panTo(myCenter);

        //循环创建标记

        // this.list.map(item => {
        // console.log(item);
        // WithLabel
        // let marker = new google.maps.Marker({
        //   position: {
        //     // lng: Number(item.GPS.split(',')[0]),
        //     // lat: Number(item.GPS.split(',')[1]),
        //     lng: 30,
        //     lat: 100
        //   },
        //   icon: '../../assets/imgs/error.png', //标记自定义图标
        //   draggable: false, //不可拖动
        //   map: map, //地图实例 
        //   labelContent: "item.name", //label的内容
        //   labelAnchor: new google.maps.Point(22, 0), //label的位置，可以调
        //   labelClass: "labels", // the CSS class for the label
        //   labelStyle: {
        //     background: '#fff',
        //     padding: '5px'
        //   }
        // });

        // marker.setMap(map)



        // })

      },

      // 模糊搜索店铺
      stockInSearch() {
        console.log(this.keyword);
        this.page = 1;
        if (this.keyword !== '') {
          this.list = [];
          this.storeList = [];
          this.$refs.hello.innerText = "数据加载中...";
          this.$axios
            .post(this.$store.state.baseUrl + "/StoreSearch", {
              keyword: this.keyword
            }).then((res) => {
              console.log('模糊搜索店铺');
              console.log(res);
              this.storeList = res.data;
              this.nums = this.storeList.length;
              console.log(this.storeList);
              this.storeList = this.storeList.sort((a, b) => {
                return this.getDistance(a.GPS) - this.getDistance(b.GPS);
              });
              if (this.storeList.length == 0) {
                this.$refs.hello.innerText = "啊哦~ 暂无数据";
              }
              this.getList();
            }).catch((err) => {
              console.log(err);
            })
        } else {
          this.list = [];
          this.storeList = [];
          this.nums = 0;
          this.$refs.hello.innerText = "请输入查询内容";
        }
      },
      // 分页处理数据
      getList() {
        console.log('分页数据');
        this.total = this.storeList.length;
        console.log(this.storeList);
        // es6过滤得到满足搜索条件的展示数据list
        this.list = this.storeList.filter((item, index) =>
          index < this.page * this.pagenum && index >= this.pagenum * (this.page - 1)
        );
        console.log(this.list);
        this.mapBuild();
      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.getList();
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 计算距离
      getDistance(item) {
        // console.log(this.myLng + ',' + this.myLat);
        // console.log(item); // lat纬度  lng经度
        let lat1 = 0;
        let lng1 = 0;
        if (item !== null) {
          // console.log(item.split(','));
          lat1 = item.split(',')[0];
          lng1 = item.split(',')[1];
        } else {
          return 0;
        }
        // console.log(this.GPS);
        let lng2 = this.myLng;
        let lat2 = this.myLat;
        let EARTH_RADIUS = 6378.137;
        let radLat1 = this.rad(lat1);
        let radLat2 = this.rad(lat2);
        let a = radLat1 - radLat2;
        let b = this.rad(lng1) - this.rad(lng2);
        let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) *
          Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        s = (Math.round(s * 10000) / 10000).toFixed(1);
        return s;
      },
      rad(d) {
        return d * Math.PI / 180.0;
      },
      // 切换模式
      modeSwitch() {
        if (this.storeQuerySel.select == 1) {
          this.storeQuerySel.select = 0;
          this.mapBuild();
        } else if (this.storeQuerySel.select == 0) {
          this.storeQuerySel.select = 1;
        }
      },
      //获取地理位置
      getLocation() {
        if (navigator.geolocation) {
          console.log("h5 定位中");
          navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            console.log('h5定位成功；');
            console.log(latitude + ',' + longitude);
            this.myLat = latitude;
            this.myLng = longitude;
            this.GPS = latitude + ',' + longitude;
          }, function (error) {
            console.log('h5定位失败；');
          })
        }
      },
      // 新增店铺
      addStore() {
        this.agent = "";
        this.name = "";
        this.country = "";
        this.cityCn = "";
        this.cityEn = "";
        this.addrCn = "";
        this.addrEn = "";
        this.GPS = "";
        this.sellBrandList = [];
        this.brands = "";
        this.contactName = "";
        this.contanctNote = "";
        this.dialogStoreQueryVisible = true;
      },
      // 增加店铺前数据的验证
      verify() {
        if (this.agent == '' || this.name == "" || this.country == "" || this.cityCn == "" || this.cityEn == "" ||
          this
          .sellBrandList == [] || this.brands == "") {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          });
          return 1;
        }
        if (this.addrCn == "" && this.addrEn == "") {
          this.$message.error({
            message: '请输入英文地址或中文地址',
            showClose: true,
            duration: 2000
          });
          return 1;
        }
      },
      // 确定增加
      addStoreSure() {
        this.brands = this.sellBrandList.join("|");
        console.log(this.GPS);
        // if (this.verify() !== 1) {
        this.$axios.post(this.$store.state.baseUrl + '/StoreAdd', {
          brands: this.brands,
          agent: this.agent,
          name: this.name,
          countryCn: this.country,
          cityCn: this.cityCn,
          cityEn: this.cityEn,
          addrCn: this.addrCn,
          addrEn: this.addrEn,
          GPS: this.GPS,
          contactName: this.contactName,
          contanctNote: this.contanctNote
        }).then((res) => {
          console.log('增加店铺');
          console.log(res);
          this.$message.success({
            message: '新增店铺成功',
            showClose: true,
            duration: 2000
          });
          this.dialogStoreQueryVisible = false;
          this.handleWatchStoreGet();
        }).catch((err) => {
          console.log(err);
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          })
        })
        // }
      },
      // 修改店铺
      updateStore(item) {
        console.log(item);
        this.updateId = item.id;
        this.agent = item.agent;
        this.name = item.name;
        this.country = item.CountryCn;
        this.cityCn = item.CityCn;
        this.cityEn = item.CityEn;
        this.addrCn = item.AddrCn;
        this.addrEn = item.AddrEn;
        this.sellBrandList = [];
        if (item.brands.indexOf("|") == -1) {
          this.sellBrandList.push(item.brands);
        } else {
          this.sellBrandList = item.brands.split('|');
        }
        this.contactName = item.contactName;
        this.contanctNote = item.contanctNote;
        this.GPS = item.GPS;
        this.dialogStoreUpdateVisible = true;
      },
      // 确认修改
      updateStoreSure() {
        let params = {};
        if (this.storeFlag == 1) {
          params = {
            id: this.updateId,
            addrCn: this.addrCn,
            addrEn: this.addrEn,
            GPS: this.GPS,
            contactName: this.contactName,
            contanctNote: this.contanctNote
          }
        } else {
          params = {
            id: this.updateId,
            addrCn: this.addrCn,
            addrEn: this.addrEn,
            contactName: this.contactName,
            contanctNote: this.contanctNote
          }
        }
        this.$axios.post(this.$store.state.baseUrl + '/StoreModify', params).then((res) => {
          console.log('修改店铺');
          console.log(res);
          this.dialogStoreUpdateVisible = false;
          this.$message.success({
            message: '修改店铺信息成功',
            showClose: true,
            duration: 2000
          });
          this.handleWatchStoreGet();
        }).catch((err) => {
          console.log(err);
          this.dialogStoreUpdateVisible = false;
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          });
        })
      },
      // 删除店铺
      deletStore(id) {
        this.deletId = id;
        if (this.storeFlag == 1) {
          this.dialogStoreDeletVisible = true;
        } else {
          this.$message.error({
            message: '您没有该权限，无法删除',
            showClose: true,
            duration: 2000
          })
        }
      },
      // 确定删除
      deletStoreSure() {
        this.$axios.post(this.$store.state.baseUrl + '/StoreDel', {
          id: this.deletId
        }).then((res) => {
          console.log('删除店铺');
          console.log(res);
          this.dialogStoreDeletVisible = false;
          this.$message.success({
            message: '删除店铺成功',
            showClose: true,
            duration: 2000
          });
          this.handleWatchStoreGet();
        }).catch((err) => {
          console.log(err);
          this.dialogStoreDeletVisible = false;
          this.$message.success({
            message: err.data.message,
            showClose: true,
            duration: 2000
          })
        })
      },
      // 到这里
      goHere(gps) {
        this.dialogHereVisible = true;
        console.log(this.GPS);
        this.vehicle.Lng = this.myLng;
        this.vehicle.Lat = this.myLat;
        let lng = gps.split(',')[0];
        let lat = gps.split(',')[1];
        // this.getMap(lng, lat);
      },
      getMap(lng, lat) {
        const map = new AMap.Map("ordering", {
          resizeEnable: true,
          center: [(lng + this.vehicle.Lng) / 2, (lat + this.vehicle.Lat) / 2],
          zoom: 10
        });
        const marker = new AMap.Marker({
          icon: "../../assets/imgs/error.png",
          position: new AMap.LngLat(this.vehicle.Lng, this.vehicle.Lat),
          offset: new AMap.Pixel(-9.5, -19.5),
          title: "位置"
        });
        map.add(marker);
        AMap.plugin("AMap.Driving", () => {
          var driving = new AMap.Driving({
            map: map
          });
          driving.search(
            new AMap.LngLat(this.vehicle.Lng, this.vehicle.Lat),
            new AMap.LngLat(lng, lat),
            function (status, result) {
              if (status === "complete") {
                console.log("绘制路线完成");
                console.log(result);
              } else {
                console.log("获取数据失败：" + result);
              }
            }
          );
        });
      },
      // 跳转新建采购单
      purchaseJump(item) {
        console.log(item);
        let itmes = {
          name: item.name + "（地址：" + (item.AddrCn == '' ? item.AddrEn : item.AddrCn) + "）",
          id: item.id,
          country: item.CountryCn
        }
        console.log(itmes);
        this.$emit('storeJump', itmes);
      },
      // 获取所有国家
      handleCountryGet() {
        this.$axios.post(this.$store.state.baseUrl + '/CountryGet').then((res) => {
          console.log(res);
          this.countryList = res.data;
        })
      },
      // 获取所有品牌
      handleBrand() {
        this.$axios.post(this.$store.state.baseUrl + '/DataWatchBrandList').then((res) => {
          console.log('品牌列表');
          console.log(res);
          this.watchBrandList = res.data;
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .store-query-container {
    width: 100%;

    .store-query-top {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-around;

      .stockSearch {
        width: 50%;
        margin: 30px 0;
      }

      .addBtn {
        width: 20%;
        margin: 30px 0;
      }
    }

    .store-query-center {
      .store-table {
        width: 90%;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 30px;

        td {
          padding: 20px;
          background-color: #f2f5f7;
        }
      }
    }

    .store-query-map {
      width: 90%;
      margin: 0 auto;
    }
  }

  .input-style {
    width: 60%;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 15px;
  }

  tr {

    th,
    td {
      width: 20%;
      text-align: center;
    }
  }
</style>