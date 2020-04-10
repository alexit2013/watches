<template>
  <div class="watch-query-container">
    <!-- <h3>手表查询页面</h3> -->
    <div v-if="watchQuerySel.select == 0">
      <div class="watch-query-top">
        <div class="stockSearch">
          <!-- 型号：模糊查找    品牌：全匹配class="el-input__inner" -->
          <el-input placeholder="可输入手表品牌、系列、型号进行查询" class="input-search" prefix-icon="el-icon-search" v-model="keyword"
            @input="stockInSearch"></el-input>
        </div>
        <div class="addBtn" v-show="watchFlag == 1">
          <el-button style="width: 100%;" type="primary" @click="addWatch">增加</el-button>
        </div>
      </div>
      <div class="watch-query-center">
        <div class="watch-select">
          <p style="margin-top: 10px;">筛选：</p>
          <el-form class="el-form">
            <el-form-item label="品牌：" class="el-form-item">
              <el-select v-model="brand">
                <el-option v-for="item in brandList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="系列：" class="el-form-item">
              <el-select v-model="series">
                <el-option v-for="item in seriesList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <div v-show="list.length == 0" style="text-align: center;" ref="hello">
            <p>数据加载中...</p>
          </div>
          <div v-if="list.length !== 0">
            <table class="watch-table">
              <tr>
                <th>图片</th>
                <th>品牌</th>
                <th>型号</th>
                <th>操作</th>
              </tr>
              <tr v-for="(item,index) in list" :key="index">
                <td class="first-td">
                  <img v-image-preview class="img-style"
                    :src="item.pics == null || item.pics == '' ? '' :  img + '/img/watch/' +item.pics.split('|')[0]" />
                </td>
                <td>{{item.brand}}</td>
                <td>{{item.model}}</td>
                <td class="last-td">
                  <p style="color: #0aa1ed;cursor: pointer;" @click="watchDetails(item.id)">查看详情</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-if="watchQuerySel.select == 1">

    </div>
    <div v-if="watchQuerySel.select == 2" class="add-watch">
      <div>
        <el-form label-width="13%">
          <el-form-item label="手表图片：" required>
            <div style="display:flex;">
              <div class="upload-imgs">
                <div class="add">
                  <form enctype="multipart/form-data">
                    <input @change="inputChange($event)" type="file" name="img" accept="image/*" class="inputUpload"
                      multiple />
                    <i class="el-icon-plus addIcon"></i>
                  </form>
                </div>
                <div style="display:flex;position:relative;" id="delImg">
                  <div v-for="(imgurl,index) of imgurls" :key="index" style="margin-left:10px;position:relative;">
                    <span class="spanStyle" @click="delImage(index)">x</span>
                    <img :src="img + imgurl" width="100px" height="100px" style="border-radius:5px;object-fit:cover;" />
                  </div>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="品牌名称：" required>
            <el-autocomplete class="inline-input input-style" v-model="addBrand" :fetch-suggestions="querySearch"
              placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <el-form-item label="系列名称：">
            <el-select v-model="addSeries" class="input-style">
              <el-option label="1" value="1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="型号：" required>
            <el-input v-model="addModel" class="input-style" placeholder="请输入手表型号"></el-input>
          </el-form-item>
          <el-form-item label="公价：">
            <div>
              <el-select v-model="publicPriceArea" style="width: 40%;">
                <el-option v-for="item in countryList" :key="item.value" :label="item.CnName" :value="item.CnName">
                </el-option>
              </el-select>
              <el-input v-model="publicPrice" style="width: 40%;">
                <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">EUR</i>
              </el-input>
            </div>
          </el-form-item>

        </el-form>
      </div>
      <div>
        <h3>基本信息：</h3>
        <el-form label-width="13%">
          <el-form-item label="适用人群：">
            <el-select v-model="crowd" class="input-style">
              <el-option label="男士" value="男士"></el-option>
              <el-option label="女士" value="女士"></el-option>
              <el-option label="中性" value="中性"></el-option>
              <el-option label="情侣" value="情侣"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="风格：">
            <el-select v-model="style" class="input-style">
              <el-option value="运动"></el-option>
              <el-option value="商务"></el-option>
              <el-option value="时尚"></el-option>
              <el-option value="休闲"></el-option>
              <el-option value="正装"></el-option>
              <el-option value="珠宝"></el-option>
              <el-option value="简约"></el-option>
              <el-option value="古典"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否背透：">
            <el-radio-group v-model="transparent">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否限量：">
            <el-radio-group v-model="limited">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="限量版个数：">
            <el-input v-model="limitedNum" class="input-style" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="特别版：">
            <el-input v-model="special" class="input-style" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="是否防水：">
            <el-radio-group v-model="waterproofEn">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="防水深度：">
            <el-input v-model="waterproof" class="input-style">
              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">米</i>
            </el-input>
          </el-form-item>
          <el-form-item label="昵称简称：">
            <el-input v-model="watchNick" class="input-style"></el-input>
          </el-form-item>
          <el-form-item label="上市年份：">
            <el-input v-model="startYear" class="input-style"></el-input>
          </el-form-item>
          <el-form-item label="停产年份：">
            <el-input v-model="endYear" class="input-style"></el-input>
          </el-form-item>
          <el-form-item label="名人同款：">
            <el-input v-model="famous" class="input-style"></el-input>
          </el-form-item>
          <el-form-item label="功能：">
            <el-checkbox-group v-model="funcList">
              <el-checkbox v-for="(funcName,index) in funcLi" :key="index" :label="funcName"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="手表描述：">
            <el-input type="textarea" v-model="des" class="input-style"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <h3>表壳：</h3>
        <el-form label-width="13%">
          <el-form-item label="表壳直径：">
            <el-input v-model="watchShellSize" class="input-style">
              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
            </el-input>
          </el-form-item>
          <el-form-item label="表壳长度：">
            <el-input v-model="watchShellWidth" class="input-style">
              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
            </el-input>
          </el-form-item>
          <el-form-item label="表壳高度：">
            <el-input v-model="watchShellHeigh" class="input-style">
              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
            </el-input>
          </el-form-item>
          <el-form-item label="表壳厚度：">
            <el-input v-model="watchThickness" class="input-style">
              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
            </el-input>
          </el-form-item>
          <el-form-item label="表镜材质：">
            <el-select v-model="glassMaterial" class="input-style">
              <el-option value="蓝宝石水晶"></el-option>
              <el-option value="矿物玻璃"></el-option>
              <el-option value="玻璃"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表壳材质：">
            <el-checkbox-group v-model="shellMaterialList">
              <el-checkbox v-for="(shell,index) in shellList" :key="index" :label="shell"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="表圈材质：">
            <el-checkbox-group v-model="bezelMaterialList">
              <el-checkbox v-for="(baze,index) in bazeList" :key="index" :label="baze"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="表冠材质：">
            <el-checkbox-group v-model="crownMaterialList">
              <el-checkbox v-for="(crown,index) in crownList" :key="index" :label="crown"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <h3>表盘：</h3>
        <el-form label-width="13%">
          <el-form-item label="表盘形状：">
            <el-select v-model="dialShape" class="input-style">
              <el-option value="圆形"></el-option>
              <el-option value="方形"></el-option>
              <el-option value="椭圆形"></el-option>
              <el-option value="酒桶形"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表盘刻度：">
            <el-select v-model="dialMark" class="input-style">
              <el-option value="阿拉伯文"></el-option>
              <el-option value="罗马文"></el-option>
              <el-option value="条形"></el-option>
              <el-option value="钻石"></el-option>
              <el-option value="无刻度"></el-option>
              <el-option value="其它"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="表盘直径：">
            <el-input v-model="dialSize" class="input-style">
              <i slot="suffix" style="color: #000;margin-right:5%;font-style:normal;">mm</i>
            </el-input>
          </el-form-item>
          <el-form-item label="表盘昵称：">
            <el-input v-model="dialNick" class="input-style"></el-input>
          </el-form-item>
          <el-form-item label="表盘工艺：">
            <el-input v-model="dialCraff" class="input-style"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        watchFlag: 0,
        img: this.$store.state.baseUrl,
        keyword: '',
        watchList: [],
        list: [{
            id: 1,
            brand: "宇舶",
            model: "1915.BS10.1",
            pics: "W_Hublot-34D39C3B62A96422BA0460656587AB52/1.jpg|"
          },
          {
            id: 2,
            brand: "宇舶",
            model: "1915.NE10.1",
            pics: "W_Hublot-7CF7A6DA2D63A8AF9A31DBC3B15D55C1/1.jpg|"
          },
          {
            id: 3,
            brand: "宇舶",
            model: "341.px.130.rx.094",
            pics: "W_Hublot-D6AE962D02C58239C2A0DAA2C47DFC5C/1.jpg|"
          },
          {
            id: 4,
            brand: "卡地亚",
            model: "W1556213",
            pics: "Cartier_875584A910CE4557793CFE89CCD2D8D7_1.jpg|"
          },
          {
            id: 5,
            brand: "卡地亚",
            model: "猎豹手镯表",
            pics: "Cartier_76436671D1D07329BCB8A40A07B8BC3F_1.jpg|"
          },
          {
            id: 6,
            brand: "宇舶",
            model: "1915.BS10.1",
            pics: "W_Hublot-34D39C3B62A96422BA0460656587AB52/1.jpg|"
          },
          {
            id: 7,
            brand: "宇舶",
            model: "1915.NE10.1",
            pics: "W_Hublot-7CF7A6DA2D63A8AF9A31DBC3B15D55C1/1.jpg|"
          },
          {
            id: 8,
            brand: "宇舶",
            model: "341.px.130.rx.094",
            pics: "W_Hublot-D6AE962D02C58239C2A0DAA2C47DFC5C/1.jpg|"
          },
          {
            id: 9,
            brand: "卡地亚",
            model: "W1556213",
            pics: "Cartier_875584A910CE4557793CFE89CCD2D8D7_1.jpg|"
          },
          {
            id: 10,
            brand: "卡地亚",
            model: "猎豹手镯表",
            pics: "Cartier_76436671D1D07329BCB8A40A07B8BC3F_1.jpg|"
          },
          {
            id: 11,
            brand: "宇舶",
            model: "1915.BS10.1",
            pics: "W_Hublot-34D39C3B62A96422BA0460656587AB52/1.jpg|"
          },
          {
            id: 12,
            brand: "宇舶",
            model: "1915.NE10.1",
            pics: "W_Hublot-7CF7A6DA2D63A8AF9A31DBC3B15D55C1/1.jpg|"
          },
          {
            id: 13,
            brand: "宇舶",
            model: "341.px.130.rx.094",
            pics: "W_Hublot-D6AE962D02C58239C2A0DAA2C47DFC5C/1.jpg|"
          },
          {
            id: 14,
            brand: "卡地亚",
            model: "W1556213",
            pics: "Cartier_875584A910CE4557793CFE89CCD2D8D7_1.jpg|"
          },
          {
            id: 15,
            brand: "卡地亚",
            model: "猎豹手镯表",
            pics: "Cartier_76436671D1D07329BCB8A40A07B8BC3F_1.jpg|"
          }
        ],
        nums: 0,
        page: 1,
        pagenum: 10,
        brand: '',
        series: '',
        brandList: [],
        seriesList: [],
        detailsId: 0,
        countryList: [],
        imgurls: [],
        addBrand: '',
        restaurants: [],
        addSeries: '',
        addModel: '',
        publicPriceArea: '', // 公价地区
        publicPrice: '', // 公价价格
        crowd: '男士', // 适用人群
        style: '运动', // 风格
        transparent: '是', // 是否背透
        limited: '是', // 是否限量
        limitedNum: '', // 限量版个数
        special: '', // 特别版
        waterproofEn: '是', // 是否防水
        waterproof: '', // 防水深度
        watchNick: '', // 昵称简称
        startYear: '', // 上市年份
        endYear: '', // 停产年份
        famous: '', // 名人同款
        func: '', // 功能
        funcList: [],
        funcLi: ['日期', '星期', '日夜显示', '动储', '翻转', '月相', '万年历', '计时', '追针', '陀飞轮', '5分问', '两问', '三问', '自鸣', '闹铃', '飞返',
          '其它特殊'
        ],
        des: '', // 手表描述

        watchShellSize: '', // 表壳直径
        watchShellWidth: '', // 表壳长度
        watchShellHeigh: '', // 表壳高度
        watchThickness: '', // 表壳厚度
        glassMaterial: '蓝宝石水晶', // 表镜材质
        shellMaterial: '', // 表壳材质
        shellMaterialList: [],
        shellList: ['铜', '钢', '不锈钢', 'PVD镀金', '18K金', '白金', '黄金', '陶瓷', '玫瑰金', '钛', '铂金', '红金', '世纪蓝宝石', '镶钻', '混合',
          '其它'
        ],
        bezelMaterial: '', // 表圈材质
        bezelMaterialList: [],
        bazeList: ['铂金', '玫瑰金', '白金', '黄金', '铜', '钢', '陶瓷', 'TPT', '钻石', '绿宝石', '红宝石', '蓝宝石', '宝石', '其它'],
        crownMaterial: '', // 表冠材质
        crownMaterialList: [],
        crownList: ['铂金', '玫瑰金', '白金', '黄金', '铜', '钢', '陶瓷', 'TPT', '钻石', '绿宝石', '红宝石', '蓝宝石', '宝石', '其它'],

        dialShape: '圆形', // 表盘形状
        dialMark: '阿拉伯文', // 表盘刻度
        dialSize: '', // 表盘直径
        dialNick: '', // 表盘昵称
        dialCraff: '', // 表盘工艺
      }
    },
    props: ["watchQuerySel"],
    created() {
      console.log('手表查询');
      // this.watchFlag = sessionStorage.getItem('watchFlag');
      this.watchFlag = 1;
      // this.handleWatchStoreGet();
      this.handleCountryGet();
    },
    mounted() {
      this.restaurants = this.loadAll();
    },
    methods: {
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [{
            "value": "劳力士"
          },
          {
            "value": "雅典"
          },
          {
            "value": "爱彼"
          },
          {
            "value": "宇舶"
          },
          {
            "value": "万国表"
          },
        ];
      },
      handleSelect(item) {
        console.log(item.value);
      },
      // 增加手表
      addWatch() {
        this.watchQuerySel.select = 2;
      },
      // 模糊搜索手表
      stockInSearch() {
        console.log(this.keyword);
        if (this.keyword !== '') {
          this.list = [];
          this.$axios
            .post(this.$store.state.baseUrl + "/WatchSearchEx", {
              keyword: this.keyword
            }).then((res) => {
              console.log('模糊搜索手表');
              console.log(res);
              this.list = res.data;
              this.nums = this.list.length;
              console.log(this.list);
              if (this.list.length == 0) {
                this.$refs.hello.innerText = "啊哦~ 暂无数据";
              }
            }).catch((err) => {
              console.log(err);
            })
        } else if (this.keyword == '') {
          this.list = [];
          this.page = 1;
          // this.nums = this.storeList.length;
          // this.getList();
          this.handleWatchStoreGet();
        }
      },
      // 获取手表列表
      handleWatchStoreGet() {
        this.$axios.post(this.$store.state.baseUrl + '/WatchStoreGet').then((res) => {
          console.log('所有手表');
          console.log(res);
          this.watchList = res.data.watchlist;
          this.nums = this.watchList.length;
          if (this.watchList.length == 0) {
            this.$refs.hello.innerText = "啊哦~ 暂无数据";
          };
          this.getList();
        })
      },
      // 分页处理数据
      getList() {
        console.log('分页数据');
        this.total = this.watchList.length;
        // es6过滤得到满足搜索条件的展示数据list
        this.list = this.watchList.filter((item, index) =>
          index < this.page * this.pagenum && index >= this.pagenum * (this.page - 1)
        );
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
      // 查看手表详情
      watchDetails(id) {
        this.detailsId = id;
        this.watchQuerySel.select = 1;
        this.$axios.post(this.$store.state.baseUrl + '/WatchInfo', {
          id: this.detailsId
        }).then((res) => {
          console.log('手表详细信息');
          console.log(res);
        }).catch((err) => {
          console.log(err);
        })
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
      // 获取所有国家
      handleCountryGet() {
        this.$axios.post(this.$store.state.baseUrl + '/CountryGet').then((res) => {
          console.log(res);
          this.countryList = res.data;
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .watch-query-container {
    width: 100%;

    .watch-query-top {
      width: 85%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .stockSearch {
        width: 50%;
        margin: 30px 0;
      }

      .addBtn {
        width: 20%;
        margin: 30px 0;
      }
    }

    .watch-query-center {
      .watch-select {
        width: 85%;
        margin: 0 auto;
        display: flex;

        .el-form {
          width: 80%;
          display: flex;
          justify-content: space-around;

          .el-form-item {
            display: flex;
          }
        }
      }

      .watch-table {
        width: 90%;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 30px;

        td {
          padding: 20px;
          background-color: #f2f5f7;
        }

        .img-style {
          width: 100px;
          height: 100px;
          border-radius: 30px;
          object-fit: cover;
        }
      }
    }

    .add-watch {
      width: 80%;
      margin: 0 auto;
      padding: 20px;
      border-radius: 30px;
      background-color: #fff;

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