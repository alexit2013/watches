<template>
  <div class="peer-container">
    <!-- <h3>贸易商管理</h3> -->
    <div class="peer-top">
      <div class="stockSearch">
        <!-- 型号：模糊查找    品牌：全匹配class="el-input__inner" -->
        <el-input placeholder="可输入贸易商名称进行搜索" class="input-search" prefix-icon="el-icon-search" v-model="keyword"
          @input="stockInSearch"></el-input>
      </div>
      <div class="addBtn">
        <el-button style="width: 100%;" type="primary" @click="addPeer">增加</el-button>
        <el-dialog title="新增贸易商" :visible.sync="dialogAddPeerVisible" center :close-on-press-escape="false"
          :close-on-click-modal="false">
          <el-form label-width="120px">
            <el-form-item label="名称：" required>
              <el-input v-model="name" placeholder="请输入贸易商名称" class="input-style"></el-input>
            </el-form-item>
            <el-form-item label="类型：" required>
              <el-radio-group v-model="type">
                <el-radio :label="0">公司</el-radio>
                <el-radio :label="1">个人</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="国家：" required>
              <el-select v-model="country" placeholder="请选择" class="input-style">
                <el-option v-for="(coun,index) of countryList" :key="index" :label="coun.CnName" :value="coun.CnName">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="主营品牌：" required>
              <el-checkbox-group v-model="sellBrandList">
                <el-checkbox :label="brand.name" v-for="(brand, index) of watchBrandList" :key="index"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="联系人：">
              <el-input v-model="contactName" placeholder="请输入联系人姓名" class="input-style"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
              <el-input type="textarea" v-model="contactType" placeholder="请输入联系人联系方式" class="input-style"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer">
            <el-button @click="dialogAddPeerVisible = false">取 消</el-button>
            <el-button type="primary" @click="surePeerAdd">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <div class="peer-table">
      <div v-show="dataPeerList.length == 0" ref="listes" style="text-align: center;">
        <p>数据加载中...</p>
      </div>
      <div v-if="dataPeerList.length !== 0">
        <table>
          <tr>
            <th>贸易商名称</th>
            <th>类型</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) of dataPeerList" :key="index">
            <td class="first-td">{{item.name}}</td>
            <td>{{item.type == 0 ? '公司' : '个人'}}</td>
            <td class="last-td">
              <p type="text" style="color: #0aa1ed;cursor: pointer;" @click="updatePeer(item)">查看</p>
              <el-dialog title="修改贸易商" center :visible.sync="dialogUpdatePeerVisible">
                <el-form label-width="120px">
                  <el-form-item label="名称：" required>
                    <el-input v-model="name" placeholder="请输入贸易商名称" class="input-style"></el-input>
                  </el-form-item>
                  <el-form-item label="类型：" required>
                    <el-radio-group v-model="type">
                      <el-radio :label="0">公司</el-radio>
                      <el-radio :label="1">个人</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="国家：" required>
                    <el-select v-model="country" placeholder="请选择" class="input-style">
                      <el-option v-for="(coun,index) of countryList" :key="index" :label="coun.CnName"
                        :value="coun.CnName">
                      </el-option>
                    </el-select>
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
                    <el-input type="textarea" v-model="contactType" placeholder="请输入联系人联系方式" class="input-style">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer">
                  <el-button @click="dialogUpdatePeerVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updatePeerSure">确 定</el-button>
                </div>
              </el-dialog>
              <p type="text" style="color: #0aa1ed;cursor: pointer;" @click="deletPeer(item.id)">删除</p>
              <el-dialog title="删除贸易商" center :visible.sync="dialogDeletPeerVisible">
                <div style="text-align: center;">
                  <span style="font-size: 16px;">是否删除该贸易商，删除后不可恢复</span>
                </div>
                <div slot="footer">
                  <el-button @click="dialogDeletPeerVisible = false">取 消</el-button>
                  <el-button type="primary" @click="deletPeerSure">确 定</el-button>
                </div>
              </el-dialog>
              <p type="text" style="color: #0aa1ed;cursor: pointer;" v-if="role == 2" @click="addPurchase(item)">新建采购单
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        keyword: '',
        dataPeerList: [],
        dataPeerList2: [],
        dataPeerList3: [],
        role: 0,
        dialogAddPeerVisible: false,
        name: '', // 贸易商名称
        type: 0, // 类型
        country: '', // 国家
        countryList: [],
        contactName: '', // 联系人姓名
        contactType: '', // 联系方式
        watchBrandList: [],
        sellBrandList: [], // 所选择的主营品牌
        sellBrand: '', // 主营品牌
        deletId: 0,
        dialogDeletPeerVisible: false,
        updateId: 0,
        dialogUpdatePeerVisible: false,

      }
    },
    created() {
      this.handlePeerList();
      this.role = sessionStorage.getItem("role");
      console.log(this.role);
      this.handleCountry();
      this.handleBrand();
    },
    methods: {
      // 获取同行列表
      handlePeerList() {
        this.$axios
          .post(this.$store.state.baseUrl + "/DataPeerList")
          .then(res => {
            console.log("贸易商");
            console.log(res);
            this.dataPeerList3 = res.data.peers;
            this.dataPeerList = this.dataPeerList3;
            console.log(this.dataPeerList);
            if (this.dataPeerList.length == 0) {
              this.$refs.listes.innerText = '啊哦~暂无数据';
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error({
              message: '暂无贸易商信息',
              showClose: true,
              duration: 2000
            });
          });
      },
      // 模糊搜索
      stockInSearch() {
        console.log(this.keyword);
        console.log(this.dataPeerList);
        if (this.keyword !== '') {
          this.dataPeerList.map((item) => {
            console.log(item);
            if (item.name.indexOf(this.keyword) > -1) {
              return this.dataPeerList2.push(item);
            }
          });
          this.dataPeerList = [];
          this.dataPeerList = this.dataPeerList2;
          if (this.dataPeerList.length == 0) {
            this.$refs.listes.innerText = '啊哦~暂无数据';
          }
          this.dataPeerList2 = [];
          return this.dataPeerList;
        } else {
          this.dataPeerList = this.dataPeerList3;
        }
      },
      // 增加贸易商
      addPeer() {
        // this.peerSelect.select = 1;
        this.dialogAddPeerVisible = true;
        this.name = '';
        this.type = 0;
        this.country = ''; // 国家
        this.contactName = ''; // 联系人姓名
        this.contactType = ''; // 联系方式
        this.sellBrandList = []; // 所选择的主营品牌
        this.sellBrand = ''; // 主营品牌
      },
      // 获取所有国家
      handleCountry() {
        this.$axios.post(this.$store.state.baseUrl + '/CountryGet').then((res) => {
          console.log('所有国家');
          console.log(res);
          this.countryList = res.data;
        }).catch((err) => {
          console.log(err);
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
      // 提交前数据的验证
      sellBrandChange() {
        // 主营品牌
        console.log(this.sellBrandList);
        this.sellBrand = this.sellBrandList.join('|');
        console.log(this.sellBrand);
        if (this.name == '' || this.country == '' || this.sellBrand == '') {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          })
          return 1;
        }
      },
      // 确定增加贸易商
      surePeerAdd() {
        if (this.sellBrandChange() !== 1) {
          const loading = this.$loading({
            lock: true,
            text: '数据提交中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          this.$axios.post(this.$store.state.baseUrl + '/DataPeerSave', {
            name: this.name,
            type: this.type,
            country: this.country,
            contactName: this.contactName,
            contactType: this.contactType,
            sellBrand: this.sellBrand
          }).then((res) => {
            console.log('增加贸易商');
            console.log(res);
            this.$message.success({
              message: '新增贸易商成功',
              showClose: true,
              duration: 2000
            })
            this.dialogAddPeerVisible = false;
            loading.close();
            this.name = '';
            this.type = 0;
            this.country = ''; // 国家
            this.contactName = ''; // 联系人姓名
            this.contactType = ''; // 联系方式
            this.sellBrandList = []; // 所选择的主营品牌
            this.sellBrand = ''; // 主营品牌
            this.handlePeerList();
          }).catch((err) => {
            loading.close();
            this.$message.error({
              message: res.data.message,
              showClose: true,
              duration: 2000
            })
          })
        }
      },
      // 查看/修改贸易商
      updatePeer(item) {
        this.name = '';
        this.type = 0;
        this.country = ''; // 国家
        this.contactName = ''; // 联系人姓名
        this.contactType = ''; // 联系方式
        this.sellBrandList = []; // 所选择的主营品牌
        this.sellBrand = ''; // 主营品牌
        console.log(item);
        this.updateId = item.id;
        this.name = item.name;
        this.type = item.type;
        this.country = item.country;
        this.contactName = item.contactName;
        this.contactType = item.contactType;
        if (item.sellBrand !== '' || item.sellBrand !== null) {
          this.sellBrandList = item.sellBrand.split('|');
        } else {
          this.sellBrandList = [];
        }
        this.dialogUpdatePeerVisible = true;
      },
      // 确定
      updatePeerSure() {
        if (this.sellBrandChange() !== 1) {
          console.log(this.country);
          this.$axios.post(this.$store.state.baseUrl + '/DataPeerSave', {
            id: this.updateId,
            name: this.name,
            type: this.type,
            country: this.country,
            contactName: this.contactName,
            contactType: this.contactType,
            sellBrand: this.sellBrand
          }).then((res) => {
            console.log('修改贸易商');
            console.log(res);
            this.$message.success({
              message: '修改贸易商成功',
              showClose: true,
              duration: 2000
            })
            this.dialogUpdatePeerVisible = false;
            this.handlePeerList();
          }).catch((err) => {
            this.$message.error({
              message: res.data.message,
              showClose: true,
              duration: 2000
            })
          })
        }
      },
      // 删除贸易商
      deletPeer(id) {
        this.deletId = id;
        this.dialogDeletPeerVisible = true;
      },
      // 确定
      deletPeerSure() {
        this.$axios.post(this.$store.state.baseUrl + '/DataPeerDel', {
          id: this.deletId
        }).then((res) => {
          console.log('删除贸易商');
          console.log(res);
          this.$message.success({
            message: '删除该贸易商成功',
            showClose: true,
            duration: 2000
          });
          this.dialogDeletPeerVisible = false;
          this.handlePeerList();
        }).catch((err) => {
          this.$message.error({
            message: err.data.message,
            showClose: true,
            duration: 2000
          })
        })
      },
      // 新建采购单
      addPurchase(item) {
        sessionStorage.setItem('peerContainer', item.name);
        sessionStorage.setItem('peerId', item.id);
        sessionStorage.setItem('peerCountry', item.country);
        this.$emit('peerSel', 3);
      },
    },
  }
</script>
<style lang="scss" scoped>
  .peer-container {
    width: 100%;

    .peer-top {
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

    .peer-table {
      width: 80%;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 30px;

      td {
        background-color: #f2f5f7;
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
      width: 33%;
      text-align: center;
    }
  }
</style>