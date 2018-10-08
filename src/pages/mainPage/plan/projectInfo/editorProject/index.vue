<template>
  <div id = "editorProject">

    <!-------------------项目概要部分-------------------->
    <div class="projectEssentials messageBox">

      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">项目概要</h4>
        <div class="headRight">
          <!--<el-button size = "mini" class = "complateBtn Essentials"  @click="handleCommitProcejtMsg">{{pageMsg.projectEssentials.btn.completeBtn}}</el-button>-->
          <!--<el-button size = "mini" class = "Essentials"  @click = "handleCallBackBtnClick">{{pageMsg.projectEssentials.btn.callBackBtn}}</el-button>-->
        </div>
      </div>

      <div class = "boxBody">
        <el-form :model="EssentialsMsg" class = "demo-ruleForm" label-width="100px" :rules="projectEssentialsRules" ref="Essentials" >
          <!------------------第一行------------------------>
          <div class = "formLine">
            <el-form-item label="项目名称:" class = "essentialsItem line_height28"  label-width="90px"
                          prop="projectName">{{EssentialsMsg.projectName}}
              <!-- <el-input :maxlength=50 type="text" v-model="EssentialsMsg.projectName" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input> -->
            </el-form-item>

            <el-form-item label="归属公司:" class = "essentialsItem line_height28"
                          prop="projectCityId">{{projectCityCompanyMsg.projectCityName}}
              <!-- <el-select readonly v-model="EssentialsMsg.projectCityId"  placeholder="请选择归属公司" @change="projectCityCompanyChange">
                <el-option
                  v-for="item in projectCityCompany"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id+','+item.name+','+item.code"
                >
                </el-option>
              </el-select> -->
            </el-form-item>

            <!--<el-form-item label="所属项目公司:" class = "essentialsItem line_height28" >-->
              <!--<el-input type="text" v-model="EssentialsMsg.projectCompanyIds" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item label="管控方式:"  class = "essentialsItem line_height28"  prop="escrowType" >
              <el-select v-model="EssentialsMsg.escrowType" clearable size = "mini" class="EssentialsInputItem">
                <el-option label="投资" value=0></el-option>
                <el-option label="代建" value=1></el-option>
              </el-select>
            </el-form-item>
          </div>

            <!------------------第二行------------------------>
            <div class = "formLine">

              <el-form-item label="项目等级:"  class = "essentialsItem line_height28" label-width="90px">
                <el-select v-model="EssentialsMsg.projectGrade" clearable size = "mini" class="EssentialsInputItem">
                  <el-option label="A" value="A"></el-option>
                  <el-option label="B" value="B"></el-option>
                  <el-option label="C" value="C"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="项目负责人:" class = "essentialsItem line_height28" >
                <div @click="choiceProjectMgr">
                  <v-input  :maxlength=50 :val="EssentialsMsg.projectMgrName" @changeName="handleChangeName('projectMgrName')"  class="EssentialsInputItem"></v-input>
                </div>
                <!--<el-input type="text" v-model="EssentialsMsg.projectMgr" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>-->
              </el-form-item>

              <el-form-item label="营销负责人:" class = "essentialsItem line_height28" >
                <div  @click="choiceMarketMgr">
                  <v-input  :maxlength=50 :val="EssentialsMsg.marketMgrName" @changeName="handleChangeName('marketMgrName')"  class="EssentialsInputItem"></v-input>
                </div>
              <!--<el-input type="text" v-model="EssentialsMsg.marketMgr" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>-->
              </el-form-item>
            </div>
            <!------------------第三行------------------------>
            <div class = "formLine">
              <el-form-item label="项目地址:" class = "essentialsItem line_height28"
                            prop="cityName" label-width="90px">
                <el-cascader
                expand-trigger="hover"
                clearable :options="EssentialsMsgProjectOption"
                v-model="EssentialsMsg.cityName"
                :placeholder="placeholderText"
                @active-item-change="handleCityChange"
                @change="celectCityChange" size = "mini"
                class = "EssentialsInputItem" >
                </el-cascader>
              </el-form-item>

                <el-form-item label="启动会日期:" class = "essentialsItem line_height28" >
                  <el-date-picker v-model="EssentialsMsg.kickOffDate" type="date" placeholder="选择日期" format="yyyy-MM-dd"  size = "mini" class="EssentialsInputItem"></el-date-picker>
                </el-form-item>

              <el-form-item label="邮政编码:" prop="postCode" class = "essentialsItem line_height28" >
                <el-input :maxlength=12 type="text" v-model="EssentialsMsg.postCode" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
              </el-form-item>
            </div>

          <!------------------第四行------------------------>
          <div class = "formLine">
            <el-form-item label="备注:" class = "essentialsItem line_height28" label-width="90px" style="width: 100%">
              <el-input :maxlength=255 type="textarea" v-model="EssentialsMsg.remark" auto-complete="off" size = "mini" style="min-height:33px;font-size: 12px; color: #666"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>

    <!-------------------项目信息部分-------------------->
    <div class="projectInformation messageBox">

      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">项目基本信息</h4>
      </div>

      <div class = "boxBody">
        <el-form :model="projectInformationMsg" :rules="projectInformationRules" label-width="100px">
          <!---------------------第一行-------------------->
          <div class = "formLine">

            <el-form-item label="占地面积(m²):" prop="landArea" class = "essentialsItem line_height28" >
              <el-input type="text" v-model="projectInformationMsg.landArea" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="总建筑面积(m²):" prop="buildingAreaAmount" class = "essentialsItem line_height28">
              <el-input type="text" v-model="projectInformationMsg.buildingAreaAmount" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="容积率(%):" prop="floorAreaRate" class = "essentialsItem line_height28" >
              <el-input type="text" v-model="projectInformationMsg.floorAreaRate" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

          </div>
          <!---------------------第二行-------------------->
          <div class = "formLine">

            <el-form-item label="地上面积(m²):" prop="overgroundArea" class = "essentialsItem line_height28" >
              <el-input type="text" v-model="projectInformationMsg.overgroundArea" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="地下面积(m²):" prop="undergroundArea" class = "essentialsItem line_height28" >
              <el-input type="text" v-model="projectInformationMsg.undergroundArea" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="绿化面积(m²):" prop="greenArea" class = "essentialsItem line_height28">
              <el-input type="text" v-model="projectInformationMsg.greenArea" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

          </div>
          <!---------------------第三行-------------------->
          <div class = "formLine">

            <el-form-item label="绿化率(%):" prop="greenRate" class = "essentialsItem line_height28" >
              <el-input type="text" v-model="projectInformationMsg.greenRate" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="自用面积(m²):" prop="ownUseArea" class = "essentialsItem line_height28" >
              <el-input type="text" v-model="projectInformationMsg.ownUseArea" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="可出租面积(m²):" prop="canRentArea" class = "essentialsItem line_height28" >
              <el-input type="text" v-model="projectInformationMsg.canRentArea" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

          </div>
          <!---------------------第四行-------------------->
          <div class = "formLine ">

            <el-form-item label="总户数:" prop="totalHouseHolder" class = "essentialsItem line_height28" >
              <el-input type="text" :maxlength=10 v-model="projectInformationMsg.totalHouseHolder" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="车位数:"  class = "essentialsItem line_height28" >
              <el-input type="text" v-model="projectInformationMsg.carNum" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="车位比:" prop="carRate" class = "essentialsItem line_height28" >
              <el-input type="text" v-model="projectInformationMsg.carRate" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

          </div>
        </el-form>
        <el-form :model="otherMsgList" label-width="100px">

          <div class = "formLine ">

            <el-form-item label="售楼地址:" class = "essentialsItem line_height28">
              <el-input :maxlength=255 type="text" v-model="otherMsgList.salsAddress"  auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="销售热线:" class = "essentialsItem line_height28">
              <el-input :maxlength=100 type="text" v-model="otherMsgList.salesTelePhone" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

            <el-form-item label="物业公司:" class = "essentialsItem line_height28">
              <el-input :maxlength=255 type="text" v-model="otherMsgList.propertyCompany" auto-complete="off" size = "mini" class="EssentialsInputItem"></el-input>
            </el-form-item>

          </div>
        </el-form>
      </div>
    </div>

    <!------------------业态信息------------------>
    <div class = "messageBox">
      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">业态信息</h4>
        <div class="headRight">
          <el-button  size = "mini"  type="primary" class = "mainBtn saveBtn" @click="addPrjFormatList">新增业态</el-button>
        </div>
      </div>

      <div class = "boxBody">
        <el-table :data="prjFormatList" border tooltip-effect="dark"   >

          <el-table-column prop="formatName" label="业态" align ="center" >
            <template slot-scope="scope" >
                <el-select v-model="scope.row.formatName" @change ="sclectFormatName(scope.$index, scope.row)" clearable size = "mini" placeholder="请选择业态" class="EssentialsInputItem">
                  <el-option v-for="(item, index) in formatOption" :key="index" :label="item.formatName" :value="item.formatName"></el-option>
                </el-select>
              </template>
          </el-table-column>

          <el-table-column prop="coveredArea" label="建筑面积(m²)" align ="center" >
            <template slot-scope="scope" >
              <el-input :maxlength=10  size="mini" @change ="handleEditBuiltArea(scope.$index, scope.row)" v-model.number="scope.row.coveredArea" placeholder="只能输入数字" ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="num" label="套数" align ="center" >
            <template slot-scope="scope">
              <el-input :maxlength=10 size="mini" @change ="handleEditNumber(scope.$index, scope.row)" v-model.number="scope.row.num" placeholder="只能输入数字" ></el-input>
            </template>
          </el-table-column>

          <el-table-column prop="propertyYearNum" label="产权年限(年)" align ="center">
            <template slot-scope="scope">
              <el-input :maxlength=10 size="mini"  @change ="handleEditPropertyRightsYear(scope.$index, scope.row)" v-model.number="scope.row.propertyYearNum" placeholder="只能输入数字" ></el-input>
            </template>
          </el-table-column>

          <el-table-column  label="操作" align ="center"  >
            <template slot-scope="scope" >
              <a class="itemBtn" @click.stop ="removeFormatItem(scope.$index, scope.row)">移除</a>
            </template>
          </el-table-column>
        </el-table>

      </div>
    </div>

    <!-------------------效果图部分-------------------->
    <div class="messageBox">
      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">图片</h4>
      </div>
      <div class = "boxBody carouselFigureBox">

        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">区位图</h4>
            <h4 class= "carouselFigureItemHeadRight">{{surroundingEnvironmentPicture.length+"张"}}</h4>
          </div>
          <div class="imageBox">
           <img :src="surroundingEnvironmentPicture[0]"  @click="handleShowCarouselFigure(index = 0)">
            <!-- <el-carousel @change = "carouselFigureChange" height="140px">
              <el-carousel-item v-for="item in pictureList" :key="item" >
                <img :src="item"  class="pictureItem">
              </el-carousel-item>
            </el-carousel> -->
          </div>
          <el-upload
            class="upload-demo"
            action="/zuul/api/storage/files/multipart/file"
            accept="image/*"
            name="files"
            :data="uploadPicture"
            :limit="surroundingEnvironmentPictureLimt"
            :on-success = "handleSuccessUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemoveSurroundingEnvironmentPicture"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            :on-exceed="handleExceed"
            :show-file-list="false"
            :file-list="surroundingEnvironmentPicture">
            <el-button size="mini" type="primary"  @click="handleUpdateBtnClick(index = 0)">选择上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </div>

        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">鸟瞰图</h4>
            <h4 class= "carouselFigureItemHeadRight">{{trafficMap.length+"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="trafficMap[0]"  @click="handleShowCarouselFigure(index = 2)">
          </div>
          <el-upload
            class="upload-demo"
            action="/zuul/api/storage/files/multipart/file"
            accept="image/*"
            name="files"
            :data="uploadPicture"
            :on-success = "handleSuccessUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemoveTrafficMap"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :limit="trafficMapLimt"
            :on-exceed="handleExceed"
            :file-list="trafficMap">
            <el-button size="mini" type="primary" @click="handleUpdateBtnClick(index = 2)">选择上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </div>

        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">效果图</h4>
            <h4 class= "carouselFigureItemHeadRight">{{effectPicture.length+"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="effectPicture[0]"  @click="handleShowCarouselFigure(index = 1)" >
          </div>
          <el-upload
            class="upload-demo"
            action="/zuul/api/storage/files/multipart/file"
            accept="image/*"
            name="files"
            :data="uploadPicture"
            :on-success = "handleSuccessUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemoveEffectPicture"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :limit="effectPictureLimt"
            :on-exceed="handleExceed"
            :file-list="effectPicture">
            <el-button size="mini" type="primary" @click="handleUpdateBtnClick(index = 1)">选择上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </div>

      </div>
      <div class = "boxBody carouselFigureBox">
        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">实景图</h4>
            <h4 class= "carouselFigureItemHeadRight">{{RealPicture.length+"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="RealPicture[0]"  @click="handleShowCarouselFigure(index = 3)">
          </div>
          <el-upload
            class="upload-demo"
            action="/zuul/api/storage/files/multipart/file"
            accept="image/*"
            name="files"
            :data="uploadPicture"
            :on-success = "handleSuccessUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemoveRealPicture"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :limit="RealPictureLimt"
            :on-exceed="handleExceed"
            :file-list="RealPicture">
            <el-button size="mini" type="primary" @click="handleUpdateBtnClick(index = 3)">选择上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </div>

        <div class= "carouselFigureItem">
        <div class= "carouselFigureItemHead">
          <h4 class= "carouselFigureItemHeadLeft">样板间</h4>
          <h4 class= "carouselFigureItemHeadRight">{{ModelPicture.length+"张"}}</h4>
        </div>
        <div class="imageBox">
          <img :src="ModelPicture[0]"  @click="handleShowCarouselFigure(index = 4)">
        </div>
        <el-upload
          class="upload-demo"
          action="/zuul/api/storage/files/multipart/file"
          accept="image/*"
          name="files"
          :data="uploadPicture"
          :on-success="handleSuccessUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemoveModelPicture"
          :before-remove="beforeRemove"
          :before-upload="beforeAvatarUpload"
          :show-file-list="false"
          :limit="ModelPictureLimt"
          :on-exceed="handleExceed"
          :file-list="ModelPicture">
          <el-button size="mini" type="primary" @click="handleUpdateBtnClick(index = 4)">选择上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </div>

        <div class= "carouselFigureItem">
          <div class= "carouselFigureItemHead">
            <h4 class= "carouselFigureItemHeadLeft">小区配套</h4>
            <h4 class= "carouselFigureItemHeadRight">{{MatchingPicture.length+"张"}}</h4>
          </div>
          <div class="imageBox">
            <img :src="MatchingPicture[0]"  @click="handleShowCarouselFigure(index = 5)">
          </div>
          <el-upload
            class="upload-demo"
            action="/zuul/api/storage/files/multipart/file"
            accept="image/*"
            name="files"
            :data="uploadPicture"
            :on-success="handleSuccessUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemoveMatchingPicture"
            :before-remove="beforeRemove"
            :before-upload="beforeAvatarUpload"
            :show-file-list="false"
            :limit="MatchingPictureLimt"
            :on-exceed="handleExceed"
            :file-list="MatchingPicture">
            <el-button size="mini" type="primary" @click="handleUpdateBtnClick(index = 5)">选择上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
          </el-upload>
        </div>
      </div>
      <div class = "btnLine" style="padding:30px;border-top:solid thin rgb(220, 223, 230);">
        <el-button size = "mini" class = "mainBtn_"  @click="cancelEditor">取消</el-button>
        <el-button size = "mini"  type="primary" class = "mainBtn_ saveBtn"  @click="saveEditor('Essentials')"  v-has="'prj:project:edit'">保存</el-button>
      </div>
    </div>

    <!-----------------其他信息------------------------>
    <!--<div class="messageBox">

      <div class="messageBoxHeader">
        <h4 class="messageBoxTitle standardTitle">其他信息</h4>
      </div>

      <div class = "boxBody">
        <el-form :model="otherMsgList" label-width="70px">
          <div class = "formLine ">
            <el-form-item label="销售热线:" class = "otherMsgItem line_height28">
              <el-input :maxlength=100 type="text" v-model="otherMsgList.salesTelePhone" auto-complete="off" size = "mini" class="otherMsgInputItem"></el-input>
            </el-form-item>

            <el-form-item label="售楼地址:" class = "otherMsgItem line_height28">
              <el-input :maxlength=255 type="text" v-model="otherMsgList.salsAddress"  auto-complete="off" size = "mini"
                        class="otherMsgInputItem"></el-input>
            </el-form-item>

            <el-form-item label="销售状况:" class = "otherMsgItem line_height28">
              <el-select v-model="otherMsgList.salesStatus" clearable size = "mini" class="otherMsgInputItem" width="174">
                <el-option label="在售" value=1></el-option>
                <el-option label="已售" value=2></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="物业公司:" class = "otherMsgItem line_height28">
              <el-input :maxlength=255 type="text" v-model="otherMsgList.propertyCompany" auto-complete="off" size = "mini" class="otherMsgInputItem"></el-input>
            </el-form-item>
          </div>

          <div class = "btnLine">
            <el-button size = "mini" class = "mainBtn_"  @click="cancelEditor">取消</el-button>
            <el-button size = "mini"  type="primary" class = "mainBtn_ saveBtn"  @click="saveEditor('Essentials')"  v-has="'prj:project:edit'">保存</el-button>
          </div>
        </el-form>

      </div>
    </div>-->

    <!-----------------周边配套图展示---------------->
    <el-dialog :title= pictureTitle :visible.sync="carouselFigureShow" width="680px">
      <el-carousel @change = "carouselFigureChange" height="480px">
        <el-carousel-item v-for="item in pictureList" :key="item" >
          <img :src="item"  class="pictureItem">
        </el-carousel-item>
      </el-carousel>

      <div slot="footer" class="dialog-footer">
        <el-button @click="deletecarouselFig()" type="primary">删除此图</el-button>
        <el-button @click="carouselFigureShow = false" type="primary">关闭</el-button>
      </div>
    </el-dialog>

    <!---------------------取消编辑提示---------------------------->
    <el-dialog
      title="提示"
      :visible.sync="consoleEditorSign"
      width="30%">
      <span>确定取消编辑吗？</span>
      <span slot="footer" class="dialog-footer">
          <el-button @click="consoleEditorSign = false">取 消</el-button>
          <el-button type="primary" class="btn" @click="confirmCancelEditor">确 定</el-button>
        </span>
    </el-dialog>

    <!------------组织架构树对话框---------------->
    <el-dialog title="人员选择" :visible.sync="showOrgTree" v-if="showOrgTree">
      <v-orgTree ref="orgTree" :isRadio="true"></v-orgTree>
      <div class="dialogBtnBox">
        <el-button @click="showOrgTree = false" class="dialogBtn">取 消</el-button>
        <el-button type="primary" class="btn dialogBtn" @click="trueChoiceMember" >确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  //import axios from "@/axios/api.js";
  import regular from "@/assets/regular/regular.js";
  import {deleteCarouselFig,projectInfoUpdate ,getCityCompanyList,getProjectInfoById,getCityListForCascader, getLevel2} from "@/api/pages/mainPage/plan/projectInfo/index.js"
  import dialogInput from "@/components/dialogInput"
  import OrganizationTree from "@/components/OrganizationTree"
  export default {
    name: "new-project",
    components: {
      'v-input': dialogInput,
      'v-orgTree':OrganizationTree
    },
    data(){
      return{
        formatOption: [],// 二级业态下拉列表数据
        /**************项目概要*******************/
        //表单信息
        EssentialsMsg:{
          projectName: "",
          projectCityId: "",
          projectCompanyIds: "",
          escrowType: "",
          projectGrade: "",
          projectMgrName:"",
          marketMgrName:"",
          cityName:[],
          cityId:"",
          postCode:"",
          kickOffDate:"",
          remark:"",
          userName:''
        },
        //地址选择三级联动菜单
        EssentialsMsgProjectOption:[],
        postCityName:[],//发送地址信息过度数组
        placeholderText:"",//三级联动菜单提示文字
        /***********项目基本信息**************/
        //表单构建信息
        projectInformationMsg:{
          buildingAreaAmount:"",
          landArea:"",
          overgroundArea:"",
          greenArea:"",
          undergroundArea:"",
          greenRate:"",
          canRentArea:"",
          floorAreaRate:"",
          ownUseArea:"",
          carRate:"",
          totalHouseHolder:""
        },
        //业态表的构建信息
        prjFormatList:[
          {
            formatName:"别墅",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"公寓",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"酒店式公寓",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"写字楼",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"商铺",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"车位",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          },
          {
            formatName:"储藏室",
            coveredArea: "",
            num:"",
            propertyYearNum:""
          }
        ],
        //接收业态编辑莫泰窗口信息的表单
        yeTypeEditorForm:{
          coveredArea: "",
          num:"",
          propertyYearNum:""
        },
        yeTypeEditor: false,//业态编辑窗口状态
        currentEditorIndex: undefined,//当前被编辑的业态项
        formLabelWidth:'200',//模态窗口label宽
        scletedYeTypeList:[],//记录被选择的业态选项最终传给后端

        /****************图片上传及莫泰轮播图********************/
        carouselFigureShow: false,//显示轮播图莫泰窗口标志位
        //轮播图暂时图片库
        pictureList:[],
        deletpictureliet:'',
        surroundingEnvironmentPicture:[],//周边配套图列表
        surroundingEnvironmentPictureMsg:[],//周边配套图信息表
        surroundingEnvironmentPictureIndex:0,//周边配套图索引值
        surroundingEnvironmentPictureLimt:100,//上传最大值
        surroundingEnvironmentPictureTitle:"周边配套图", //周边配套图标题
        effectPicture:[],//效果图
        effectPictureMsg:[],//效果图信息
        effectPictureIndex:0, //效果图索引值
        effectPictureLimt:100,//上传最大值
        effectPictureTitle:"效果图", //效果图标题
        trafficMap:[],//交通图列表
        trafficMapMsg:[],//交通图信息
        trafficMapIndex:0,//交通图索引值
        trafficMapLimt:100,//上传最大值
        trafficMapTitle:"交通图",//交通图标题
        RealPicture:[],//实景图列表
        RealPictureMsg:[],//实景图信息
        RealPictureIndex:0,//实景图索引值
        RealPictureLimt:100,//上传最大值
        RealPictureTitle:"实景图",//实景图标题
        ModelPicture:[], // 样板图
        ModelPictureMsg:[],//样板图信息
        ModelPictureIndex:0,//样板图索引值
        ModelPictureLimt:100,
        ModelPictureTitle:"样板图",//样板图标题
        MatchingPicture:[],//小区配套
        MatchingPictureMsg:[],
        MatchingPictureIndex:0,
        MatchingPictureTitle:"小区配套",
        MatchingPictureLimt:100,
        currentPictureListIndex: undefined,//当前被点击图片的索引
        currentUpdataBtnIndex:undefined, //上传按钮的索引
        currentPictureIndex: 0, //轮播图中当前图片的索引值
        pictureTitle:"", //接收后端传来的录播图标题
        uploadPicture:{
          bussinessType:"project"
        },
        /****************其他信息部分*****************/
        otherMsgList:{
          salesTelePhone:"",
          salsAddress:"",
          salesStatus:"",
          propertyCompany:""
        },
        /***********页面基本信息************/
        //pageMsg:{},
        /**********保存/取消编辑*************/
        consoleEditorSign:false,

        /*****************项目概要正则*************************/
        projectEssentialsRules:{
          projectName: [
            { required: true , message: '请输入项目名称',trigger: 'change'}
          ],
          projectCityId: [
            { required: true , message: '请输入归属公司',trigger: 'change'}
          ],
          escrowType:[
            { required: true , message: '请输入管控控制',trigger: 'change'}
          ],
          cityName: [
            { required: true , message: '请输选择项目地址',trigger: 'blur'}
          ],
          postCode:[
            {validator: regular.postCode,trigger:'change'}
          ]
        },
        /***************项目信息正则规则*****************/
        projectInformationRules:{
          buildingAreaAmount:[
            {validator: regular.threeDecimalPlaces,trigger:'change' }
          ],
          landArea:[
            {validator: regular.threeDecimalPlaces,trigger:'change' }
          ],
          overgroundArea:[
            {validator: regular.threeDecimalPlaces,trigger:'change' }
          ],
          greenArea:[
            {validator: regular.threeDecimalPlaces,trigger:'change' }
          ],
          undergroundArea:[
            {validator: regular.threeDecimalPlaces,trigger:'change' }
          ],
          greenRate:[
            {validator: regular.threeDecimalPlaces,trigger:'change' }
          ],
          canRentArea:[
            {validator: regular.threeDecimalPlaces,trigger:'change' }
          ],
          floorAreaRate:[
            {validator: regular.threeDecimalPlaces,trigger:'change' }
          ],
          ownUseArea:[
            {validator: regular.threeDecimalPlaces,trigger:'change' }
          ],
          carRate:[
            {validator: regular.numberThanNumber,trigger:'change' }
          ],
          // totalHouseHolder:[
          //   {validator: regular.number,trigger:'change' }
          // ],
        },
        /*****************其他信息的正则************************/
        otherMsgRules:{
          salesTelePhone:[
            {validator: regular.phoneNumber,trigger:'change' }
          ]
        },
        /*****************当前要编辑页面的id********************/
        currentProjectId:0,
        /*******获取城市公司表*********/
        projectCityCompany:[],
        /***************用于存贮被选择城市公司name和code******************/
        projectCityCompanyMsg:{
          projectCityId:"",
          projectCityName:"",
          projectCityCode:""
        },
        /**************组织架构树*******************/
        showOrgTree:false,
        currentChioceMember:"",

      }
    },

    created(){
      this.handleGetLevel2();
      this.currentProjectId = this.$route.params.id;
      let that = this;
      //获取项目信息填充表格
      let params = new URLSearchParams();
      params.append("id",this.currentProjectId);

      getProjectInfoById(params)
        .then(data=>{
          console.log("获取编辑信息",data.data);
          if(data.status=="200"){
            //项目概要
            that.EssentialsMsg.projectName = data.data.projectName;//项目名称
            that.EssentialsMsg.projectCityId = data.data.projectCityName;//归属公司名字
            //that.EssentialsMsg.projectCompanyIds = data.data.projectCompanyIds; //这里需要公司ID
            that.projectCityCompanyMsg.projectCityId =  data.data.projectCityId;
            that.projectCityCompanyMsg.projectCityName =  data.data.projectCityName;
            that.projectCityCompanyMsg.projectCityCode =  data.data.projectCityCode;
            //管控控制编号
            if( data.data.escrowType == 0 ){
              that.EssentialsMsg.escrowType = "投资";
            }else if( data.data.escrowType == 1 ){
              that.EssentialsMsg.escrowType = "代建";
            }

            //that.EssentialsMsg.escrowType = data.data.escrowType;
            that.EssentialsMsg.projectGrade = data.data.projectGrade;//项目等级
            that.EssentialsMsg.projectMgrName = data.data.projectMgrName;//项目负责人
            that.EssentialsMsg.marketMgrName = data.data.marketMgrName;//项目营销负责人
            if( data.data.cityName.indexOf('->') != -1 ){
              that.EssentialsMsg.cityName = data.data.cityName.split('->');//项目地址用来显示
              console.log('项目地址',that.EssentialsMsg.cityName)
              that.postCityName = data.data.cityName.split('->'); //项目地址用来保存
              that.placeholderText = that.postCityName[0] + "/" +that.postCityName[1]+ "/" +that.postCityName[2];
            }else{
              that.EssentialsMsg.cityName = [];//项目地址用来显示
              console.log('项目地址',that.EssentialsMsg.cityName)
              that.postCityName = []; //项目地址用来保存
              that.placeholderText = '';
            }
            
            //console.log("城市名字:",that.placeholderText);
            //console.log("项目地址",that.EssentialsMsg.cityName);
            that.EssentialsMsg.cityId = data.data.cityId; //项目地址id值以->分隔
            //console.log("项目地址id",that.EssentialsMsg.cityId);
            that.EssentialsMsg.postCode = data.data.postCode;//邮编
            that.EssentialsMsg.kickOffDate = data.data.kickOffDate;//启动会日期
            //console.log(data.data.kickOffDate);
            that.EssentialsMsg.remark = data.data.remark;//备注
            //项目信息
            that.projectInformationMsg.buildingAreaAmount = data.data.buildingAreaAmount;//总建筑面积
            that.projectInformationMsg.landArea = data.data.landArea;//占地面积
            that.projectInformationMsg.undergroundArea = data.data.undergroundArea;//地下面积
            that.projectInformationMsg.overgroundArea = data.data.overgroundArea;//地上面积
            that.projectInformationMsg.greenArea = data.data.greenArea;//绿化面积
            that.projectInformationMsg.greenRate = data.data.greenRate;//绿化率
            that.projectInformationMsg.canRentArea = data.data.canRentArea;//可出租面积
            that.projectInformationMsg.floorAreaRate = data.data.floorAreaRate;//容积率
            that.projectInformationMsg.ownUseArea = data.data.ownUseArea;//自用面积
            that.projectInformationMsg.carNum = data.data.carNum;//车位数
            that.projectInformationMsg.carRate = data.data.carRate;//车位配比
            that.projectInformationMsg.totalHouseHolder = data.data.totalHouseHolder;//总户数
            //业态信息
            // console.log(data.data.prjFormatList);
            that.prjFormatList = data.data.prjFormatList;
            //其他信息
            that.otherMsgList.salesTelePhone = data.data.salesTelePhone;//销售热线
            that.otherMsgList.salsAddress = data.data.salsAddress;//销售地址
            //销售状态
            if( data.data.salesStatus ==1 ){
              that.otherMsgList.salesStatus = "在售";
            }else if( data.data.salesStatus ==2 ){
              that.otherMsgList.salesStatus = "已售";
            }
            that.otherMsgList.propertyCompany = data.data.propertyCompany;//物业公司
            /*************图片获取***************/
            if(data.data.resourcesMap){
              if( data.data.resourcesMap.re_location ){
                data.data.resourcesMap.re_location.map((item,index)=>{
                    if(item !== null){
                        this.surroundingEnvironmentPicture.push(item.fileUrl);
                        this.surroundingEnvironmentPictureMsg.push({
                          resourceId: item.id
                         });
                    }
                });

                this.surroundingEnvironmentPictureIndex = data.data.resourcesMap.re_location.length-1;//获取当前索引值
              }

              if( data.data.resourcesMap.re_effect ){
                data.data.resourcesMap.re_effect.map((item,index)=>{
                  if(item !== null){
                    this.effectPicture.push(item.fileUrl);
                    this.effectPictureMsg.push({
                      resourceId: item.id

                    });
                  }
                });

                this.effectPictureIndex = data.data.resourcesMap.re_effect.length-1;//获取当前索引值
              }

              if( data.data.resourcesMap.re_airscape ){
               data.data.resourcesMap.re_airscape.map((item,index)=>{

                  if(item !== null){
                    this.trafficMap.push(item.fileUrl);
                    this.trafficMapMsg.push({
                      resourceId: item.id
                    })
                    console.log(item.id);
                  }
                });

                this.trafficMapIndex = data.data.resourcesMap.re_airscape.length-1;//获取当前索引值
              }

              if(data.data.resourcesMap.re_real){
                data.data.resourcesMap.re_real.map((item,index)=>{
                  if(item !== null){
                    this.RealPicture.push(item.fileUrl);
                    this.RealPictureMsg.push({
                      resourceId:item.id
                    })
                  }
                });

                this.RealPictureIndex = data.data.resourcesMap.re_real.length-1;//获取当前索引值
              }

              if(data.data.resourcesMap.re_template){
                data.data.resourcesMap.re_template.map((item,index)=>{
                  if(item !== null){
                    this.ModelPicture.push(item.fileUrl);
                    this.ModelPictureMsg.push({
                      resourceId:item.id
                    })
                  }
                });
                this.ModelPictureIndex = data.data.resourcesMap.re_template.length-1;//获取当前索引值
              }

              if(data.data.resourcesMap.re_support){
                data.data.resourcesMap.re_support.map((item,index)=>{
                  if(item !== null){
                    this.MatchingPicture.push(item.fileUrl);
                    this.MatchingPictureMsg.push({
                      resourceId:item.id
                    })
                  }
                });
                this.MatchingPictureIndex = data.data.resourcesMap.re_support.length-1;//获取当前索引值
              }
              //
            }
          }
        });


      let userInfo = JSON.parse(sessionStorage.getItem('user-info'));
        if( userInfo.cityId ){
          this.projectCityCompany.push({
            id: userInfo.cityId,
            name: userInfo.cityName,
            code: userInfo.cityCode
          })
        }else{
          //获取城市公司列表
          getCityCompanyList().then(res=>{
            if(res.status === 200)
              this.projectCityCompany = res.data;
          });
        }

      //获取地区三级联动菜单
      getCityListForCascader()
        .then(res=>{
           ;
          if(res.status === 200){
            that.EssentialsMsgProjectOption = res.data;
          }
        })
    },

    methods:{
      handleChangeName(type) {
          if( type === 'projectMgrName' ){
            this.EssentialsMsg.projectMgrName = ''; 
            this.EssentialsMsg.userName = '';
          }else{
            this.EssentialsMsg.marketMgrName = '';
          }
      }, 
      handleGetLevel2() {// 获取二级业态
          getLevel2().then(res=>{
             ;
            if( res.status === 200 ){
              this.formatOption = res.data
            }
          })
        },
      // beforeAvatarUpload (file) {
      //   const extension = file.name.split('.')[1] === 'jpg'
      //   const extension2 = file.name.split('.')[1] === 'png'
      //   const isLt2M = file.size / 1024 / 1024 < 10
      //   if (!extension && !extension2 ) {
      //     console.log('上传模板只能是 jpg或者 格式!')
      //   }
      //   if (!isLt2M) {
      //     console.log('上传模板大小不能超过 10MB!')
      //   }
      //   return extension || extension2  && isLt2M
      // },

      /***************页面方法****************/

      projectCityCompanyChange(value){
        let cityComponyValue = value.split(','); //里面综合了 ID coed name 要后两个把code 和 name 拆出来
        this.projectCityCompanyMsg.projectCityId =  cityComponyValue[0];
        this.projectCityCompanyMsg.projectCityName =  cityComponyValue[1];
        this.projectCityCompanyMsg.projectCityCode =  cityComponyValue[2];
      },
      /*********三级联动的菜单***********/
      //地址选择三级联动菜单
      handleCityChange(val){
        let length = this.EssentialsMsgProjectOption.length;
        let index = 0;

        //let cityIndex = 0;
        for(let i = 0; i < length; i++){
          if(this.EssentialsMsgProjectOption[i].value == val[0]){
            index = i;
            break;
          }
        }

        if(val.length === 1){
          //发送请求加载
          if (!this.EssentialsMsgProjectOption[index].children.length) {
            let provinceCode = {
              parentCode:val[0]
            };
            getCityListForCascader(provinceCode)
              .then(res=>{
                if(res.status === 200){
                  this.EssentialsMsgProjectOption[index].children = res.data;
                }
              });
          }
        } else if(val.length === 2) {

          let cityValue = val[1];
          let city = this.EssentialsMsgProjectOption[index].children;
          let cityIndex = 0;
          for (let j = 0; j < city.length; j++) {
            if (city[j].value == cityValue) {
              cityIndex = j;
              break;
            }
          }
          //发送请求加载
          if (!city[cityIndex].children.length) {
            let cityCode = {
              parentCode: cityValue
            };
            getCityListForCascader(cityCode)
              .then(res => {
                if (res.status === 200) {
                  city[cityIndex].children = res.data;
                }
              });
          }
        }
      },

      celectCityChange(val){
        let length = this.EssentialsMsgProjectOption.length;
        let index = 0;

        for( let i = 0; i < length; i++ ){
          if( this.EssentialsMsgProjectOption[i].value === val[0] ){
            index = i;

            this.postCityName[0] = this.EssentialsMsgProjectOption[i].label; //赋值省份
            let city = this.EssentialsMsgProjectOption[i].children;

            for(let j = 0; j < city.length; j++ ){
              if( city[j].value === val[1] ){

                this.postCityName[1] = city[j].label; //赋值城市
                let ear = city[j].children;
                for(let k =0; k < ear.length ; k++ ){
                  if(ear[k].value === val[2] ){
                    this.postCityName[2] = ear[k].label;//赋值区县
                    console.log("选择完毕",this.postCityName);
                  }
                }
              }
            }
          }
        }
      },
      /**************业态****************/
      //添加业态
        addPrjFormatList(){
           if(this.prjFormatList.length < 7){
            this.prjFormatList.push({
              formatName:"",
              formatCode:"",
              coveredArea: "",
              num:"",
              propertyYearNum:""
            });
         }
        },

      //移除业态
      removeFormatItem(index,row){

        this.$confirm('此操作将移除该业态信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.prjFormatList.splice(index,1);

          this.$message({
            type: 'success',
            message: '移除成功!'
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消移除'
          // });
        });
      },

      //选择业态
        sclectFormatName(index, row){
          this.prjFormatList[index].formatName = row.formatName;
          this.formatOption.map(item=>{
            if( row.formatName === item.formatName ){
              this.prjFormatList[index].formatCode = item.formatCode;
            }
          })
          console.log(this.prjFormatList);
        },

      /*************项目基本信息****************/
      //编辑模式下业态的checkbox被选中时触发
      handleSelectionChange(list){
        this.scletedYeTypeList = list;
      },

      handleEditBuiltArea(index, row){
        if(/^[\d]+\.?\d*$/.test(row.coveredArea)){
          this.prjFormatList[index].coveredArea = row.coveredArea;
        }else{
          this.prjFormatList[index].coveredArea = "";
        }
      },

      handleEditNumber(index, row){
        if(/^[\d]+\.?\d*$/.test(row.num)){
          this.prjFormatList[index].num = row.num;
        }else{
          this.prjFormatList[index].num = "";
        }
      },

      handleEditPropertyRightsYear(index, row){
        if(/^[\d]+\.?\d*$/.test(row.propertyYearNum)){
          this.prjFormatList[index].propertyYearNum = row.propertyYearNum;
        }else{
          this.prjFormatList[index].propertyYearNum = "";
        }
      },

      /**********************图片展示部分的方法**************************/
      //点击图片显示轮播图 index当前被点击的图片窗口的索引
      handleShowCarouselFigure(index){
        this.currentPictureListIndex = index;

        if(index ===0){
          this.pictureList = this.surroundingEnvironmentPicture;
          this.pictureTitle = this.surroundingEnvironmentPictureTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }else if( index === 1){
          this.pictureList = this.effectPicture;
          this.pictureTitle = this.effectPictureTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }else if(index === 2){
          this.pictureList = this.trafficMap;
          this.pictureTitle = this.trafficMapTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }else if(index === 3){
          this.pictureList = this.RealPicture;
          this.pictureTitle = this.RealPictureTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }else if(index === 4){
          this.pictureList = this.ModelPicture;
          this.pictureTitle = this.ModelPictureTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }else if(index === 5){
          this.pictureList = this.MatchingPicture;
          this.pictureTitle = this.MatchingPictureTitle + " "+ (this.pictureList.length!==0? 1:0) +"/"+this.pictureList.length;
        }
        this.carouselFigureShow = true;
      },
      carouselFigureChange(index){
        this.pictureTitle = "";
        this.deletpictureliet = index;
        if(this.currentPictureListIndex === 0){
          this.pictureTitle = this.surroundingEnvironmentPictureTitle +" "+( index + 1 )+"/"+this.pictureList.length;
        }else if( this.currentPictureListIndex === 1 ){
          this.pictureTitle = this.effectPictureTitle +" "+( index + 1 )+"/"+this.pictureList.length;
        }else if(this.currentPictureListIndex === 2){
          this.pictureTitle = this.trafficMapTitle +" "+( index + 1 )+"/"+this.pictureList.length;
        }else if( this.currentPictureListIndex === 3 ){
          this.pictureTitle = this.RealPictureTitle+" "+( index + 1 )+"/"+this.pictureList.length;
        }else if( this.currentPictureListIndex === 4 ){
          this.pictureTitle = this.ModelPictureTitle+" "+( index + 1 )+"/"+this.pictureList.length;
        }else if(this.currentPictureListIndex === 5){
          this.pictureTitle = this.MatchingPictureTitle+" "+( index + 1 )+"/"+this.pictureList.length;
        }
      },
      //删除照片
      deletecarouselFig(file,fileList){
        let index = this.deletpictureliet;
        //周边图
        if( this.currentPictureListIndex === 0){
          if(this.surroundingEnvironmentPictureMsg[index].resourceId){
            let params={
              id:this.surroundingEnvironmentPictureMsg[index].resourceId
            }
            deleteCarouselFig(params).then(res =>{});
          }

          this.surroundingEnvironmentPicture.splice(index,1);
          this.surroundingEnvironmentPictureMsg.splice(index,1);
          //重新排序
          for(let i = 0; i< this.surroundingEnvironmentPictureMsg.length ; i++){
            this.surroundingEnvironmentPictureMsg[i].orderVal = i;
          }

          this.surroundingEnvironmentPictureIndex--;
        }
        //效果图
        if( this.currentPictureListIndex === 1){
          if(this.effectPictureMsg[index].resourceId){
            let params={
              id:this.effectPictureMsg[index].resourceId
            }
            deleteCarouselFig(params).then(res =>{});
          }

           this.effectPicture.splice(index,1);
          this.effectPictureMsg.splice(index,1);
          //重新排序
          for(let i = 0; i< this.effectPictureMsg.length ; i++){
            this.effectPictureMsg[i].orderVal = i;
          }
          this.effectPictureIndex--;
        }
        //交通图
        if( this.currentPictureListIndex === 2){
          if(this.trafficMapMsg[index].resourceId){
            let params={
              id:this.trafficMapMsg[index].resourceId
            }
            deleteCarouselFig(params).then(res =>{});
          }

          this.trafficMap.splice(index,1);
          this.trafficMapMsg.splice(index,1);
          //重新排序
          for(let i = 0; i< this.trafficMapMsg.length ; i++){
            this.trafficMapMsg[i].orderVal = i;
          }
          this.trafficMapIndex--;
      }
      //实景图
      if( this.currentPictureListIndex === 3){
          if(this.RealPictureMsg[index].resourceId){
            let params={
              id:this.RealPictureMsg[index].resourceId
            }
            deleteCarouselFig(params).then(res =>{});
          }

          this.RealPicture.splice(index,1);
          this.RealPictureMsg.splice(index,1);
          //重新排序
          for(let i = 0; i< this.RealPictureMsg.length ; i++){
            this.RealPictureMsg[i].orderVal = i;
          }
          this.RealPictureIndex--;
      }
      //样板图
      if( this.currentPictureListIndex === 4){
          if(this.ModelPictureMsg[index].resourceId){
            let params={
              id:this.ModelPictureMsg[index].resourceId
            }
            deleteCarouselFig(params).then(res =>{});
          }

          this.ModelPicture.splice(index,1);
          this.ModelPictureMsg.splice(index,1);
          //重新排序
          for(let i = 0; i< this.ModelPictureMsg.length ; i++){
            this.ModelPictureMsg[i].orderVal = i;
          }
          this.ModelPictureIndex--;
        }

        if( this.currentPictureListIndex === 5){
          if(this.MatchingPictureMsg[index].resourceId){
            let params={
              id:this.MatchingPictureMsg[index].resourceId
            }
            deleteCarouselFig(params).then(res =>{});
          }

          this.MatchingPicture.splice(index,1);
          this.MatchingPictureMsg.splice(index,1);
          //重新排序
          for(let i = 0; i< this.MatchingPictureMsg.length ; i++){
            this.MatchingPictureMsg[i].orderVal = i;
          }
          this.MatchingPictureIndex--;
        }



      },
      /**********上传图片部分**************/
      beforeAvatarUpload(file) {// 限定上传文件格式
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或PNG 格式!');
        }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        return isJPG;
      },
      //周边配套图删除
      handleRemoveSurroundingEnvironmentPicture(file,fileList){
        let index = this.surroundingEnvironmentPicture.indexOf(file.url);
        this.surroundingEnvironmentPicture.splice(index,1);
        this.surroundingEnvironmentPictureMsg.splice(index,1);
        //重新排序
        for(let i = 0; i< this.surroundingEnvironmentPictureMsg.length ; i++){
          this.surroundingEnvironmentPictureMsg[i].orderVal = i;
        }

        this.surroundingEnvironmentPictureIndex--;
      },

      //效果图删除
      handleRemoveEffectPicture(file,fileList){
        let index = this.effectPicture.indexOf(file.url);
        this.effectPicture.splice(index,1);
        this.effectPictureMsg.splice(index,1);
        //重新排序
        for(let i = 0; i< this.effectPictureMsg.length ; i++){
          this.effectPictureMsg[i].orderVal = i;
        }
        this.effectPictureIndex--;
      },

      //交通图删除图片
      handleRemoveTrafficMap(file,fileList){
        let index = this.trafficMap.indexOf(file.url);
        this.trafficMap.splice(index,1);
        this.trafficMapMsg.splice(index,1);
        //重新排序
        for(let i = 0; i< this.trafficMapMsg.length ; i++){
          this.trafficMapMsg[i].orderVal = i;
        }
        this.trafficMapIndex--;
      },

      //实景图
      handleRemoveRealPicture(file,fileList){
        let index = this.RealPicture.indexOf(file.url);
        this.RealPicture.splice(index,1);
        this.RealPictureMsg.splice(index,1);
        //重新排序
        for(let i = 0; i< this.RealPictureMsg.length ; i++){
          this.RealPictureMsg[i].orderVal = i;
        }
        this.RealPictureIndex--;
      },

      //样板图
      handleRemoveModelPicture(file,fileList){
        let index = this.ModelPicture.indexOf(file.url);
        this.ModelPicture.splice(index,1);
        this.ModelPictureMsg.splice(index,1);
        //重新排序
        for(let i = 0; i< this.ModelPictureMsg.length ; i++){
          this.ModelPictureMsg[i].orderVal = i;
        }
        this.ModelPictureIndex--;
      },
      handleRemoveMatchingPicture(){
        let index = this.MatchingPicture.indexOf(file.url);
        this.MatchingPicture.splice(index,1);
        this.MatchingPictureMsg.splice(index,1);
        //重新排序
        for(let i = 0; i< this.MatchingPictureMsg.length ; i++){
          this.MatchingPictureMsg[i].orderVal = i;
        }
        this.MatchingPictureIndex--;
      },


      handlePreview(file) {

        console.log(file);
        // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';

        // if (!isJPG) {
        //   this.$message.error('上传图片只能是 JPG或png 格式!');
        // }
        // return isJPG;
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        // return this.$confirm(`确定移除 ${ file.name }？`);
      },

      handleUpdateBtnClick(index){
        this.currentUpdataBtnIndex = index;
      },

      //上传成功的回调函数
      handleSuccessUpload(response, file, fileList){
        //debugger
        console.log(response)
        console.log(file)
        console.log(fileList)
        if(response.status === 200){
          //console.log(this.currentUpdataBtnIndex);
          if(this.currentUpdataBtnIndex ===0 ){

            this.surroundingEnvironmentPicture.push(fileList[fileList.length-1].url);

            this.surroundingEnvironmentPictureMsg.push({ //如果是周边配套图
              //id:response.data[0].id,
              resourceScope:response.data[0].resourceScope,
              orderVal: this.surroundingEnvironmentPictureIndex,
              resourceId:response.data[0].id,
              typeCode:"re_location"
            });
            this.surroundingEnvironmentPictureIndex++;
            //console.log(this.surroundingEnvironmentPictureMsg);
          }else if(this.currentUpdataBtnIndex === 1){ //如果是效果图
            console.log(fileList[fileList.length-1].url);
            this.effectPicture.push(fileList[fileList.length-1].url);
            this.effectPictureMsg.push({
              //id:response.data[0].id,
              resourceScope:response.data[0].resourceScope,
              orderVal:this.effectPictureIndex,
              resourceId:response.data[0].id,
              typeCode:"re_effect"
            });
            this.effectPictureIndex++;

          }else if(this.currentUpdataBtnIndex === 2){ //如果是交通图

            this.trafficMap.push(fileList[fileList.length-1].url);
            this.trafficMapMsg.push({
              //id:response.data[0].id,
              resourceScope:response.data[0].resourceScope,
              orderVal:this.trafficMapIndex,
              resourceId:response.data[0].id,
              typeCode:"re_airscape"
            });
            this.trafficMapIndex++;
          }else if(this.currentUpdataBtnIndex === 3){ //如果是实景图

            this.RealPicture.push(fileList[fileList.length-1].url);
            this.RealPictureMsg.push({
              //id:response.data[0].id,
              resourceScope:response.data[0].resourceScope,
              orderVal:this.RealPictureIndex,
              resourceId:response.data[0].id,
              typeCode:"re_real"
            });
            this.RealPictureIndex++;

          }else if(this.currentUpdataBtnIndex === 4){ //如果是样板图

            this.ModelPicture.push(fileList[fileList.length-1].url);
            this.ModelPictureMsg.push({
              //id:response.data[0].id,
              resourceScope:response.data[0].resourceScope,
              orderVal:this.ModelPictureIndex,
              resourceId:response.data[0].id,
              typeCode:"re_template"
            });
            this.ModelPictureIndex++;
          }else if(this.currentUpdataBtnIndex === 5){
            this.MatchingPicture.push(fileList[fileList.length-1].url);
            this.MatchingPictureMsg.push({
              //id:response.data[0].id,
              resourceScope:response.data[0].resourceScope,
              orderVal:this.MatchingPictureIndex,
              resourceId:response.data[0].id,
              typeCode:"re_support"
            });
            this.MatchingPictureIndex++;
          }
        }

      },
      /*******************保存操作************************/
      cancelEditor(){
        //this.consoleEditorSign = true;
        //this.$route.push('projectInfo');
        this.$alert('确定取消编辑此项目吗？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/mainPage/plan/projectInfo');
          }
        });
      },

      confirmCancelEditor(){
        //this.consoleEditorSign = false;
        this.$router.push('/mainPage/plan/projectInfo');//放弃编辑反项目信息
        //this.$router.go(-1);
      },
      saveEditor(Essentials){
        this.$refs[Essentials].validate((valid) => {
          if (valid) {
           let newArr = [];
           console.log(this.prjFormatList)
              if(this.prjFormatList.length > 0){
                  for(let i = 0;i<this.prjFormatList.length;i++){
                    if(newArr.indexOf(this.prjFormatList[i].formatName) == -1){
                  　　  newArr.push(this.prjFormatList[i].formatName);
                          //编辑图片信息
                        if(i == this.prjFormatList.length-1){
                            let that = this;
                            let prjResourceList = this.surroundingEnvironmentPictureMsg.concat(this.effectPictureMsg,this.trafficMapMsg,this.RealPictureMsg,this.ModelPictureMsg,this.MatchingPictureMsg);

                            let data_ = Object.assign({id:this.currentProjectId},{prjFormatList:this.prjFormatList},this.EssentialsMsg, this.projectInformationMsg, this.otherMsgList,{prjResourceList:prjResourceList});
                            let newData = JSON.parse(JSON.stringify(data_));
                            newData.cityId = this.EssentialsMsg.cityName[0]+"->"+this.EssentialsMsg.cityName[1]+"->"+this.EssentialsMsg.cityName[2]; //cityName存的是地区id
                            newData.cityName = this.postCityName[0]+"->"+this.postCityName[1]+"->"+this.postCityName[2];
                            newData.projectCityId = this.projectCityCompanyMsg.projectCityId;
                            newData.projectCityCode = this.projectCityCompanyMsg.projectCityCode;
                            newData.projectCityName = this.projectCityCompanyMsg.projectCityName;
                            newData.projectMgr = this.EssentialsMsg.userName;
                            newData.projectMgrName =  this.EssentialsMsg.projectMgrName;
                            if(newData.escrowType == "投资"){
                              newData.escrowType = 0;
                            }else if(newData.escrowType == "代建" ){
                              newData.escrowType = 1;
                            }

                            if( newData.salesStatus == "在售" ){
                              newData.salesStatus = 1;
                            }else if( newData.salesStatus == "已售" ){
                              newData.salesStatus = 2;
                            }
                            //当前项目id
                            //params.append('id',this.currentProjectId);
                            projectInfoUpdate(newData).then(res=>{
                                if(res.status === 200){
                                  that.$message({
                                    message: '此项目操作成功!',
                                    type: 'success',
                                    showClose: true
                                  });
                                  setTimeout(()=>{
                                    that.$router.push('/mainPage/plan/projectInfo');
                                  },1000);
                                }else{
                                  this.$message.error(res.message)
                                }
                              });
                          }
            　　    }else{
                      this.$notify({
                        title: '提示',
                        message: '业态添加不能重复',
                        type: 'warning'
                      });
                      break;
                    }
                  }
              }else{
                  let that = this;
                let prjResourceList = this.surroundingEnvironmentPictureMsg.concat(this.effectPictureMsg,this.trafficMapMsg,this.RealPictureMsg,this.ModelPictureMsg,this.MatchingPictureMsg);

                let data_ = Object.assign({id:this.currentProjectId},{prjFormatList:this.prjFormatList},this.EssentialsMsg, this.projectInformationMsg, this.otherMsgList,{prjResourceList:prjResourceList});
                let newData = JSON.parse(JSON.stringify(data_));
                newData.cityId = this.EssentialsMsg.cityName[0]+"->"+this.EssentialsMsg.cityName[1]+"->"+this.EssentialsMsg.cityName[2]; //cityName存的是地区id
                newData.cityName = this.postCityName[0]+"->"+this.postCityName[1]+"->"+this.postCityName[2];
                newData.projectCityId = this.projectCityCompanyMsg.projectCityId;
                newData.projectCityCode = this.projectCityCompanyMsg.projectCityCode;
                newData.projectCityName = this.projectCityCompanyMsg.projectCityName;
                newData.projectMgr = this.EssentialsMsg.userName;
                newData.projectMgrName = this.EssentialsMsg.projectMgrName;
                if(newData.escrowType == "投资"){
                  newData.escrowType = 0;
                }else if(newData.escrowType == "代建" ){
                  newData.escrowType = 1;
                }

                if( newData.salesStatus == "在售" ){
                  newData.salesStatus = 1;
                }else if( newData.salesStatus == "已售" ){
                  newData.salesStatus = 2;
                }
                //当前项目id
                //params.append('id',this.currentProjectId);
                projectInfoUpdate(newData)
                  .then(res=>{
                    if(res.status === 200){
                      that.$message({
                        message: '此项目操作成功!',
                        type: 'success',
                        showClose: true
                      });
                      setTimeout(()=>{
                        that.$router.push('/mainPage/plan/projectInfo');
                      },1000);
                    }else{
                        this.$message.error(res.message)
                      }
                  });
              }
            } else {
              this.$notify({
                title: '提示',
                message: '还有必填项为空',
                type: 'warning'
              });
              //return false;
            }
        });
      },

      /**************组织树选择****************/
      //点击选择成员
      choiceProjectMgr(){
        this.showOrgTree=true;
        this.currentChioceMember = "ProjectMgr";
      },
      choiceMarketMgr(){
        this.showOrgTree=true;
        this.currentChioceMember = "MarketMgr";
      },
      //确定选择项目负责人
      trueChoiceMember(){
        if(this.currentChioceMember === "ProjectMgr"){

          this.EssentialsMsg.projectMgrName = this.$refs.orgTree.currentRow.realName || '';
          this.EssentialsMsg.userName = this.$refs.orgTree.currentRow.userName || '';

          // console.log( this.EssentialsMsg.projectMgrName);
          // console.log( this.EssentialsMsg.userName);
          // console.log( this.$refs.orgTree.currentRow);
        }else if(this.currentChioceMember === "MarketMgr"){

          this.EssentialsMsg.marketMgrName = this.$refs.orgTree.currentRow.realName || ''

        }

        this.showOrgTree=false;
      },
    }
  }
</script>

<style scoped>
  .messageBox{
    border: 1px solid #E5E5E5;
    border-radius: 5px;
    margin-bottom: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 2px #e5e5e5;
  }

  .messageBoxHeader{
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    padding: 5px 25px;
    text-align: center;
    border-bottom: 1px solid #E5E5E5;
  }

  .messageBoxTitle{
    float: left;
    color: #007440;
  }
  .headRight{
    float: right;
    line-height: 30px;
    line-height: 30px;
  }

  .boxBody{
    padding: 20px 25px 17px 25px;
  }

  .EssentialsInputItem{
    width: 174px;
    height: 29px;
    overflow: hidden;
    line-height: 29px;
  }

  .essentialsItem{
    display: inline-block;
    /*margin-left: 60px;*/
    margin-bottom: 19px;
  }

  .carouselFigureItem{
    width: 200px;
    padding: 10px;
  }

  .carouselFigureItemHead{
    width: 100%;
    overflow: hidden;
    margin-bottom: 5px;
    font-size: 12px;
    color: #666;
  }

  .carouselFigureItemHeadLeft{
    float: left;
    font-size: 12px;
    font-weight: 100;
  }
  .carouselFigureItemHeadRight{
    float: right;
    font-size: 12px;
    font-weight: 100;
  }
  .imageBox{
    width: 100%;
    height: 140px;
    margin-bottom: 5px;
    background-color: #99a9bf;
  }

  .imageBox>img{
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .pictureItem{
    height: 100%;
    width: 100%;
  }

  .otherMsgItem{
    display: inline-block;
    margin-bottom: 15px;
  }

  .otherMsgInputItem{
    width: 174px;
    height: 28px;
  }
  .formLine{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .carouselFigureBox{
    display: flex;
    justify-content: space-between;
  }

  .hideItem{
    visibility: hidden;
  }

  .btnLine{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
 #editorProject .mainBtn_
  {
    width: 95px!important;
    height: 32px;
    text-align: center;
    margin-left: 30px;
  }

  .saveBtn{
    color: white;
    background-color: #4dbe61 ;
    border-color: #4dbe61;
  }
  .btn{
    color: white;
    background-color: #4dbe61 ;
    border-color: #4dbe61;
  }
  .itemBtn{
    color:#4dbe61;
    cursor: pointer;
  }

  .dialogBtnBox{
    margin-top: 10px;
    overflow: hidden;
  }
  .dialogBtn{
    float: right;
    margin-left: 10px;
  }

  /***********可抽离部分************/
  .standardTitle{
    font-size: 14px;
    color: #404040;
  }

</style>
