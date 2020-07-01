<template>
  <div>
    <!-- 我的报销-未报销页面 -->
    <div v-if="unReimbursementSel.select == 0">
      <div v-if="unReimbursementList.length == 0" ref="unReim" style="text-align: center;">
        <p>{{hintMsg}}</p>
      </div>
      <div v-if="unReimbursementList.length !== 0">
        <table v-for="(reim,index) in unReimbursementList" :key="index">
          <tr>
            <th>选择消费单</th>
            <th></th>
            <th>{{reim.type == 0 ? '行程名称' : '类型'}}</th>
            <th>{{reim.type == 0 ? '行程描述' : '描述'}}</th>
            <th>{{reim.type == 0 ? '起止时间' : '时间'}}</th>
            <th v-show="reim.type == 1">金额</th>
            <th>操作</th>
          </tr>
          <tr>
            <td>
              <input class="selBtn" type="checkbox" v-model="hobby" :value="reim" @change="checkedChange($event,reim)">
            </td>
            <td>
              <img :src="reim.type == 0 ? img2 : img1" style="width: 25px;height: 25px;" />
            </td>
            <td>{{reim.type == 0 ? reim.data.name : (reim.type == 1 ? reim.data.type : '')}}</td>
            <td>{{reim.type == 0 ? reim.data.des : (reim.type == 1 ? reim.data.remark : '')}}</td>
            <td>
              <p v-if="reim.type == 0" style="margin: 0;">{{reim.data.startTime}}</p>
              <p v-if="reim.type == 0" style="margin: 0;">至</p>
              <p v-if="reim.type == 0" style="margin: 0;">{{reim.data.endTime}}</p>
              <p v-if="reim.type == 1">{{reim.data.time}}</p>
            </td>
            <td v-if="reim.type == 1">
              {{price(reim.data.estimateMoney) + ' ' + reim.data.currency}}
            </td>
            <td>
              <el-tooltip class="item" effect="light" content="查看详情" placement="top-end">
                <img src="../../assets/imgs/details.png" style="cursor:pointer;"
                  @click="updateReimburse(reim.type,reim.data.id)" />
              </el-tooltip>
              <el-dialog title="修改非行程消费" :visible.sync="dialogUpdateReimburseVisible" center
                :close-on-press-escape="false" :close-on-click-modal="false">
                <div>
                  <div class="not-type">
                    <p style="height: 20px;margin: 0;line-height: 20px;font-size: 17px;text-align: center;">类型</p>
                    <div>
                      <el-radio-group v-model="notType" style="display: flex;justify-content: space-around;">
                        <div style="text-align: left;">
                          <el-radio-button label="交通" style="display: block;margin-top: 10px;">
                            <img src="../../assets/imgs/car.png" style="width: 20px;height: 13px;margin-right: 5px;" />
                            <span style="font-size: 15px;">交通</span>
                          </el-radio-button>
                          <el-radio-button label="工资支出" style="display: block;margin-top: 10px;">
                            <img src="../../assets/imgs/money.png"
                              style="width: 20px;height: 13px;margin-right: 5px;" />
                            <span style="font-size: 15px;">工资支出</span>
                          </el-radio-button>
                          <el-radio-button label="接待购物" style="display: block;margin-top: 10px;">
                            <img src="../../assets/imgs/08-1.png" style="width: 20px;height: 13px;margin-right: 5px;" />
                            <span style="font-size: 15px;">接待购物</span>
                          </el-radio-button>
                        </div>
                        <div style="text-align: left;">
                          <el-radio-button label="住宿" style="display: block;margin-top: 10px;">
                            <img src="../../assets/imgs/hotel.png"
                              style="width: 20px;height: 13px;margin-right: 5px;" />
                            <span style="font-size: 15px;">住宿</span>
                          </el-radio-button>
                          <el-radio-button label="公司运营" style="display: block;margin-top: 10px;">
                            <img src="../../assets/imgs/money.png"
                              style="width: 20px;height: 13px;margin-right: 5px;" />
                            <span style="font-size: 15px;">公司运营</span>
                          </el-radio-button>
                          <el-radio-button label="其他" style="display: block;margin-top: 10px;">
                            <img src="../../assets/imgs/other.png"
                              style="width: 20px;height: 13px;margin-right: 5px;" />
                            <span style="font-size: 15px;">其他</span>
                          </el-radio-button>
                        </div>
                        <div style="text-align: left;">
                          <el-radio-button label="餐饮" style="display: block;margin-top: 10px;">
                            <img src="../../assets/imgs/eat.png" style="width: 20px;height: 13px;margin-right: 5px;" />
                            <span style="font-size: 15px;">餐饮</span>
                          </el-radio-button>
                          <el-radio-button label="经费拨款" style="display: block;margin-top: 10px;">
                            <img src="../../assets/imgs/money.png"
                              style="width: 20px;height: 13px;margin-right: 5px;" />
                            <span style="font-size: 15px;">经费拨款</span>
                          </el-radio-button>
                        </div>
                      </el-radio-group>
                    </div>
                  </div>
                  <el-form label-width="120px">
                    <el-form-item label="日期：" required>
                      <el-date-picker v-model="notTime" type="date" value-format="yyyy-MM-dd" class="input-style">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="金额：" required>
                      <el-input v-model="notEstimateMoney" type="text" class="input-style"></el-input>
                      <el-select v-model="notCurrency" placeholder="请选择">
                        <el-option v-for="(item,index) in currencyList" :key="index" :label="item" :value="item">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="账单图片：">
                      <div style="display:flex;">
                        <div class="upload-imgs">
                          <div class="add">
                            <form enctype="multipart/form-data">
                              <input @change="inputChange($event)" type="file" name="img" accept="image/*"
                                class="inputUpload" multiple />
                              <i class="el-icon-plus addIcon"></i>
                            </form>
                          </div>
                          <div style="display:flex;position:relative;" id="delImg">
                            <div v-for="(imgurl,index) of imgurls" :key="index"
                              style="margin-left:10px;position:relative;">
                              <span v-show="imgurl !== ''" class="spanStyle" @click="delImage(index)">x</span>
                              <img v-show="imgurl !== ''" :src="img + imgurl" width="100px" height="100px"
                                style="border-radius:5px;object-fit:cover;" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item label="备注：" required>
                      <el-input type="textarea" v-model="notRemark"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div slot="footer">
                  <el-button @click="dialogUpdateReimburseVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateReimburseSure">确 定</el-button>
                </div>
              </el-dialog>
            </td>
          </tr>
        </table>
        <div class="reimBtn">
          <el-button type="primary" style="width: 100%;" @click="createReimbursement">生成报销单</el-button>
        </div>
        <div style="width: 100%;height: 50px;margin-top: 30px;">
          <el-pagination @current-change="handleCurrentChange" :current-page="page"
            layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-if="unReimbursementSel.select == 1">
      <div class="back-img" @click="gobackList">
        <div>
          <img src="../../assets/imgs/goback.png" />
        </div>
        <span class="font">返回</span>
      </div>
      <div class="add-container">
        <el-form label-width="140px">
          <el-form-item label="行程名称：" required>
            <el-input v-model="name" class="input-style"></el-input>
          </el-form-item>
          <el-form-item label="预计起止时间：" required>
            <el-date-picker v-model="startTime2" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期" value-format="yyyy-MM-dd" class="input-style">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="行程描述：" required>
            <el-input v-model="des" type="textarea" class="input-style"></el-input>
          </el-form-item>
        </el-form>
        <div>
          <div style="margin-top: 15px;">
            <span>预估总费用：</span>
            <span>{{formatNumberRgx(sum) + ' ' + currency}}</span>
          </div>
          <p style="margin: 0;font-size: 14px;color: #bbb;">实际报销费用以财务核算为准</p>
          <div v-if="records.length !== 0">
            <table>
              <tr>
                <th>类型</th>
                <th>金额</th>
                <th>时间</th>
                <th>操作</th>
              </tr>
              <tr v-for="(record,index) in records" :key="index">
                <td>{{record.type}}</td>
                <td>{{formatNumberRgx(record.estimateMoney) + ' ' + record.currency}}</td>
                <td>{{record.time}}</td>
                <td>
                  <el-tooltip class="item" effect="light" content="修改信息" placement="top-end">
                    <img src="../../assets/imgs/update.png" style="cursor:pointer;"
                      @click="updateRecord(record,index)" />
                  </el-tooltip>
                  <el-dialog title="修改记录" :visible.sync="dialogUpdateRecordVisible" center
                    :close-on-press-escape="false" :close-on-click-modal="false">
                    <div>
                      <div class="not-type">
                        <p style="height: 20px;margin: 0;line-height: 20px;font-size: 17px;text-align: center;">类型</p>
                        <div>
                          <el-radio-group v-model="updateType" style="display: flex;justify-content: space-around;">
                            <div>
                              <el-radio-button label="交通" style="display: block;margin-top: 10px;">
                                <img src="../../assets/imgs/car.png"
                                  style="width: 20px;height: 13px;margin-right: 5px;" />
                                <span style="font-size: 15px;">交通</span>
                              </el-radio-button>
                              <el-radio-button label="人工" style="display: block;margin-top: 10px;">
                                <img src="../../assets/imgs/people.png"
                                  style="width: 20px;height: 13px;margin-right: 5px;" />
                                <span style="font-size: 15px;">人工</span>
                              </el-radio-button>
                            </div>
                            <div>
                              <el-radio-button label="住宿" style="display: block;margin-top: 10px;">
                                <img src="../../assets/imgs/hotel.png"
                                  style="width: 20px;height: 13px;margin-right: 5px;" />
                                <span style="font-size: 15px;">住宿</span>
                              </el-radio-button>
                              <el-radio-button label="小费" style="display: block;margin-top: 10px;">
                                <img src="../../assets/imgs/tip.png"
                                  style="width: 20px;height: 13px;margin-right: 5px;" />
                                <span style="font-size: 15px;">小费</span>
                              </el-radio-button>
                            </div>
                            <div>
                              <el-radio-button label="餐饮" style="display: block;margin-top: 10px;">
                                <img src="../../assets/imgs/eat.png"
                                  style="width: 20px;height: 13px;margin-right: 5px;" />
                                <span style="font-size: 15px;">餐饮</span>
                              </el-radio-button>
                              <el-radio-button label="其他" style="display: block;margin-top: 10px;">
                                <img src="../../assets/imgs/other.png"
                                  style="width: 20px;height: 13px;margin-right: 5px;" />
                                <span style="font-size: 15px;">其他</span>
                              </el-radio-button>
                            </div>
                          </el-radio-group>
                        </div>
                      </div>
                      <el-form label-width="120px">
                        <el-form-item label="日期：" required>
                          <el-date-picker v-model="time" type="date" value-format="yyyy-MM-dd" class="input-style"
                            placeholder="请选择日期">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item label="金额：" required>
                          <el-input v-model="estimateMoney" type="text" class="input-style"></el-input>
                          <el-select v-model="currency" placeholder="请选择">
                            <el-option v-for="(item,index) in currencyList" :key="index" :label="item" :value="item">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="账单图片：">
                          <div style="display:flex;">
                            <div class="upload-imgs">
                              <div class="add">
                                <form enctype="multipart/form-data">
                                  <input @change="inputChange($event)" type="file" name="img" accept="image/*"
                                    class="inputUpload" multiple />
                                  <i class="el-icon-plus addIcon"></i>
                                </form>
                              </div>
                              <div style="display:flex;position:relative;" id="delImg">
                                <div v-for="(imgurl,index) of imgurls" :key="index"
                                  style="margin-left:10px;position:relative;">
                                  <span v-show="imgurl !== ''" class="spanStyle" @click="delImage(index)">x</span>
                                  <img v-show="imgurl !== ''" :src="img + imgurl" width="100px" height="100px"
                                    style="border-radius:5px;object-fit:cover;" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </el-form-item>
                        <el-form-item label="备注：" required>
                          <el-input type="textarea" v-model="remark"></el-input>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div slot="footer">
                      <el-button @click="dialogUpdateRecordVisible = false">取 消</el-button>
                      <el-button type="primary" @click="updateRecordSure">保 存</el-button>
                    </div>
                  </el-dialog>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div>
          <el-button type="primary" @click="updateJourneySure"
            style="width: 15%;margin-top: 40px;margin-right: 2%;position: fixed;bottom: 35px;right: 10%;">保存
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        hintMsg: '数据加载中...',
        img: this.$store.state.baseUrl,
        img1: require('../../assets/imgs/reim.png'),
        img2: require('../../assets/imgs/notReim.png'),
        page: 1,
        pagenum: 10,
        total: 0,
        unReimbursementList: [],
        hobby: [],
        tripids: [],
        untripids: [],

        updateType: 0,
        updateId: 0,

        name: '', // 行程名称
        startTime2: [], // 行程开始时间
        des: '', // 行程描述
        type: '', // 记录详情类型
        records: [], // 记录列表

        time: '', // 记录日期
        estimateMoney: '', // 用户申报金额
        currencyList: [],
        currency: '', // 用户选择的币种
        imgurls: [],
        remark: '', // 账单备注
        sum: 0,
        dialogUpdateRecordVisible: false,
        updateIndex: 0,

        dialogNotJourneyVisible: false,
        notType: '', // 非行程消费类型
        notTime: '', // 非行程消费日期
        notEstimateMoney: '', // 金额
        notCurrency: '', // 币种
        notRemark: '', // 备注
        dialogUpdateReimburseVisible: false,
        dialogDeleteReimVisible: false,
        recordId: '',

      }
    },
    props: ['unReimbursementSel'],
    created() {
      this.handleUnReimbursementList();
    },
    methods: {
      // 获取未报销消费列表
      handleUnReimbursementList() {
        this.hintMsg = '数据加载中...';
        this.$axios.post(this.$store.state.baseUrl + '/UnReimburseList?java', {
          page: this.page,
          pagenum: this.pagenum
        }).then((res) => {
          console.log('可报销列表');
          console.log(res);
          this.unReimbursementList = res.data.lists;
          this.total = res.data.total;
          if (this.unReimbursementList.length == 0) {
            this.hintMsg = '啊哦~暂无数据';
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      gobackList() {
        this.unReimbursementSel.select = 0;
        this.handleUnReimbursementList();
      },
      // 修改查看我的消费单
      updateReimburse(type, id) {
        console.log('修改');
        this.updateType = type;
        this.updateId = id;
        console.log(this.updateType, this.updateId);
        this.notType = '';
        this.notTime = '';
        this.notEstimateMoney = '';
        this.notCurrency = '';
        this.notRemark = '';

        this.imgurls = [];

        this.name = '';
        this.startTime2 = [];
        this.des = '';
        this.type = '';
        this.records = [];
        this.sum = 0;
        this.currency = '';
        if (this.updateType == 0) {
          this.$axios.post(this.$store.state.baseUrl + '/TripInfo?java', {
            id: this.updateId
          }).then((res) => {
            console.log('行程详细信息');
            console.log(res);
            this.name = res.data.name;
            if (res.data.startTime !== null && res.data.endTime !== null) {
              this.startTime2.push(res.data.startTime);
              this.startTime2.push(res.data.endTime);
            } else {
              this.startTime2 = [];
            };
            this.des = res.data.des;
            this.records = res.data.recordList;
            for (let item of this.records) {
              console.log(item.estimateMoney);
              this.sum += Number(item.estimateMoney);
              console.log(this.sum);
              this.currency = item.currency;
            };
            this.unReimbursementSel.select = 1;
          })
        } else if (this.updateType == 1) {
          this.$axios.post(this.$store.state.baseUrl + '/RecordInfo?java', {
            id: this.updateId
          }).then((res) => {
            console.log('非行程消费记录详细信息');
            console.log(res);
            this.notType = res.data.type;
            this.notTime = res.data.time;
            this.notEstimateMoney = res.data.estimateMoney;
            this.notCurrency = res.data.currency;
            if (res.data.billpics !== '') {
              if (res.data.billpics.indexOf('|') !== -1) {
                this.imgurls = res.data.billpics.split('|');
              } else {
                this.imgurls.push(res.data.billpics);
              }
            } else {
              this.imgurls = [];
            }

            this.notRemark = res.data.remark;
            this.dialogUpdateReimburseVisible = true;
          })
        };
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
      },
      // 确定修改行程信息
      updateJourneySure() {
        console.log(this.startTime2);
        if (this.name == '' && this.startTime2 == '' && this.des == '' && this.records.length !== 0) {
          this.$axios.post(this.$store.state.baseUrl + '/TripSave?java', {
            id: this.updateId,
            name: this.name,
            startTime: this.startTime2[0],
            endTime: this.startTime2[1],
            des: this.des,
            records: this.records
          }).then((res) => {
            console.log('修改行程信息');
            console.log(res);
            this.$message.success({
              message: '修改行程消费成功',
              showClose: true,
              duration: 2000
            });
            this.unReimbursementSel.select = 0;
            this.handleUnReimbursementList();
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.message,
              showClose: true,
              duration: 2000
            });
            this.unReimbursementSel.select = 0;
            this.handleUnReimbursementList();
          })
        } else {
          this.$message.error({
            message: '请添加行程记录',
            showClose: true,
            duration: 2000
          });
        }
      },
      // 修改记录
      updateRecord(record, index) {
        this.dialogUpdateRecordVisible = true;
        this.updateIndex = index;
        this.updateType = '';
        this.time = '';
        this.estimateMoney = '';
        this.currency = '';
        this.imgurls = [];
        this.remark = '';
        console.log(record);
        this.recordId = record.id;
        this.updateType = record.type;
        this.time = record.time;
        this.estimateMoney = record.estimateMoney;
        this.currency = record.currency;
        if (record.billpics !== '') {
          if (record.billpics.indexOf('|') !== -1) {
            this.imgurls = record.billpics.split('|');
          } else {
            this.imgurls.push(record.billpics);
          }
        } else {
          this.imgurls = [];
        };
        this.remark = record.remark;
      },
      // 确定修改记录
      updateRecordSure() {
        console.log(this.type);
        if (this.time !== '' && this.estimateMoney !== '' && this.currency !== '' && this.remark !== '') {
          this.records.splice(this.updateIndex, 1, {
            id: this.recordId,
            type: this.updateType,
            time: this.time,
            estimateMoney: this.estimateMoney,
            currency: this.currency,
            billpics: this.imgurls.join("|"),
            remark: this.remark
          });
          console.log(this.records);
          this.dialogUpdateRecordVisible = false;
          this.sum = 0;
          for (let item of this.records) {
            this.sum += Number(item.estimateMoney);
          };
          this.$message.success({
            message: '修改记录成功',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          })
        }
      },
      // 确定修改非行程信息
      updateReimburseSure() {
        if (this.notType == '' || this.notTime == '' || this.notEstimateMoney == '' || this.notCurrency == '' || this
          .notRemark == '') {
          this.$message.error({
            message: '数据不能为空，请检查数据填写',
            showClose: true,
            duration: 2000
          })
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/RecordSave?java', {
            id: this.updateId,
            type: this.notType,
            time: this.notTime,
            estimateMoney: this.notEstimateMoney,
            currency: this.notCurrency,
            billpics: this.imgurls.join('|'),
            remark: this.notRemark
          }).then((res) => {
            console.log('修改非行程记录');
            console.log(res);
            this.$message.success({
              message: '修改非行程记录成功',
              showClose: true,
              duration: 2000
            });
            this.dialogUpdateReimburseVisible = false;
            this.handleUnReimbursementList();
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.message,
              showClose: true,
              duration: 2000
            });
            this.dialogUpdateReimburseVisible = false;
          })
        }
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
              message: err.message,
              showClose: true,
              duration: 2000
            });
          });
      },
      // 删除图片
      delImage(index) {
        this.imgurls.splice(index, 1);
      },
      // 选择报销单
      checkedChange(e, content) {
        if (e.target.checked == true) {
          if (content.type == 0) {
            this.tripids.push({
              id: content.data.id
            });
          } else if (content.type == 1) {
            this.untripids.push({
              id: content.data.id
            })
          }
        } else if (e.target.checked == false) {
          if (content.type == 0) {
            for (let index in this.tripids) {
              if (this.tripids[index].id == content.data.id) {
                this.tripids.splice(index, 1);
              }
            }
          } else if (content.type == 1) {
            for (let index in this.untripids) {
              if (this.untripids[index].id == content.data.id) {
                this.untripids.splice(index, 1);
              }
            }
          }
        }
        console.log('选择');
        console.log(this.tripids);
        console.log(this.untripids);
      },
      // 生成报销单
      createReimbursement() {
        if (this.tripids.length == 0 && this.untripids.length == 0) {
          this.$message.error({
            message: '请选择需要报销的消费单',
            showClose: true,
            duration: 2000
          });
        } else {
          this.$axios.post(this.$store.state.baseUrl + '/ClaimFormSave?java', {
            tripids: this.tripids,
            untripids: this.untripids
          }).then((res) => {
            console.log('生成报销单');
            console.log(res);
            this.$message.success({
              message: '报销单生成成功',
              showClose: true,
              duration: 2000
            });
            this.tripids = [];
            this.untripids = [];
            this.handleUnReimbursementList();
            (function smoothscroll() {
              var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          }).catch((err) => {
            console.log(err);
            this.$message.error({
              message: err.message,
              showClose: true,
              duration: 2000
            });
          })
        }

      },
      // 分页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.handleUnReimbursementList();
        (function smoothscroll() {
          var currentScroll =
            document.documentElement.scrollTop || document.body.scrollTop;
          if (currentScroll > 0) {
            window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, currentScroll - currentScroll / 5);
          }
        })();
        let selectedIs = document.getElementsByClassName("selBtn");
        for (let i = 0; i < selectedIs.length; i++) {
          selectedIs[i].checked = false;
        }
        console.log("hhhhhhhhh");
        console.log(selectedIs);
      },
      // 千分价格
      price(num) {
        // console.log(num);
        if (num !== null && num !== undefined) {
          let parts = num.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          return parts.join(".");
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .back-img {
    width: 75px;
    height: 45px;
    margin-left: 30px;
    margin-top: 20px;
    line-height: 45px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    div {
      margin-top: 5px;

      img {
        width: 30px;
        height: 25px;
      }
    }

    .font {
      font-size: 17px;
    }
  }

  .add-container {
    // width: 90%;
    // margin: 0 auto;
    background-color: #fff;
    border-radius: 30px;
    padding: 40px;

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

  .not-type {
    width: 75%;
    margin: 0 auto;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }

  .reimBtn {
    width: 15%;
    position: fixed;
    right: 10%;
    bottom: 40px;
  }

  input[type=checkbox] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    position: relative;
    width: 15px;
    height: 15px;
    font-size: 15px;
  }

  input[type=checkbox]::after {
    position: absolute;
    top: 0;
    background-color: #fff;
    color: #000;
    width: 15px;
    height: 15px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
    content: ' ';
    border: 1px solid #c8c8c8;
    border-radius: 3px
  }

  input[type=checkbox]:disabled::after {
    content: ' ';
    border: 1px solid #c8c8c8;
    border-radius: 3px;
    background-color: #ddd;
    cursor: not-allowed;
  }

  input[type=checkbox]:checked::after {
    content: "✓";
    font-size: 13px;
    font-weight: bolder;
  }

  td {
    height: 60px;
    margin: 10px 0;
    padding: 20px 0;
    background-color: #f3fbf9;
    text-align: center;
  }

  .input-style {
    width: 70% !important;
  }

  table {
    width: 100%;
    margin-bottom: 20px;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;

    tr {

      th,
      td {
        width: 25%;
        text-align: center;
        border: 0;
        font-size: 15px;
      }
    }
  }
</style>