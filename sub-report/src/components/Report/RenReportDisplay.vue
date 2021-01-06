<template>
    <div class="ren-report-editor" style="background-color: #efefef;min-height: 100vh">


        <div class="ren-report-editor-header-display">
            <KemButton v-if="isFollow"  @click="openFollow">关注</KemButton>
            <KemButton v-if="!report.disableSendEmail"  @click="openEmailVisible">发送邮件</KemButton>
            <!--<el-button v-if="!report.disableSendEmail" @click="openEmailVisible" type="success" icon="el-icon-edit" size="medium" plain round
                       class="ren-report-editor-header-display-menu"
                       :class="{'isFixed':fixed}">发送邮件</el-button>-->
        </div>
        <div class="ren-report-editor-content">
            <div class="ren-report-editor-main ren-report-layout" style="height: auto;" v-if="reload">
                <grid-layout
                        :layout.sync="layout"
                        :col-num="12"
                        :row-height="30"
                        :is-draggable="false"
                        :is-resizable="false"
                        :is-mirrored="false"
                        :vertical-compact="true"
                        :margin="[10, 10]"
                        :use-css-transforms="false" id="Img"
                >
                    <grid-item v-for="item in layoutComputed"
                               :x="item.x"
                               :y="item.y"
                               :w="item.w"
                               :h="item.h"
                               :i="item.i"
                               :key="item.i"
                    >
                        <DisplayChartElement :item="item"/>

                    </grid-item>
                </grid-layout>
            </div>

        </div>
        <KemDialog :visible.sync="followVisible">
            <template slot="header">关注</template>
            <FollowList :followList="followList" @saveSuccess="saveSuccess"/>
        </KemDialog>
        <el-dialog title="发送邮件" :visible.sync="emailVisible" fullscreen>
            <el-form ref="form" :model="form" :rules="rules" label-width="120px">
                <el-form-item label="接收人邮箱：" prop="receivers">
                    <el-col class="email">
                        <span v-for="item of form.receivers" :key="item">{{item}}<i class="el-icon-close i" @click="deleteReceivers(item)"></i></span>
                        <el-button type="primary" icon="el-icon-plus" @click="addReceiversVisible = true" size="mini"></el-button>
                    </el-col>
                </el-form-item>
                <el-form-item label="邮件主题：" prop="title">
                    <el-input type="textarea" v-model="form.title" :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="报表截图：" v-show="form.img">
                    <img :src="form.img"/>
                </el-form-item>
            </el-form>
            <div slot="footer" style="display: flex; justify-content: center">
                <el-button @click="emailVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendEmail()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新增邮箱" :visible.sync="addReceiversVisible">
            <el-input type="text" v-model="addMail"></el-input>
            <div slot="footer" style="display: flex; justify-content: center">
                <el-button @click="addReceiversVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitAddMail()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import html2canvas from 'html2canvas'
import {GridLayout, GridItem} from 'vue-grid-layout';

import ChartTitleElement from '@/components/Report/element/ChartTitleElement'
import BetterScrollMixin from '@/components/better_scroll_mixin'
import DisplayChartElement from '@/components/Report/layout/DisplayChartElement'
import FollowList from './FollowList'

import {mapActions,mapState} from 'vuex'

export default{
    props: ['renreport'],
    mixins: [BetterScrollMixin],

    data() {
        return {
            reload: false,
            emailVisible: false,
            followVisible: false,
            addReceiversVisible: false,
            addMail: '',
            followList:[],
            form: {
                receivers: [], // 接收人邮箱
                title: '', // 邮件主题
                img: '', // 图片
            },
            rules: {
                receivers: [
                    { required: true, message: '请填写接收人邮箱', trigger: 'blur'}
                ],
                title: [
                    { required: true, message: '请填写邮件主题', trigger: 'blur' },
                ],
            },
            offsetTop: 0,
            fixed: false,
        }
    },

    computed: {
        ...mapState({
            layout: state => state.app.layout,
            report: state => state.app.report,
            id: state => state.app.id,
        }),
        layoutComputed(){


            if(!this.isFollow){
                return  this.layout
            }

            let arr = []
            this.layout.forEach(item => {
                let a = this.followList.find((l) => item.i == l)

                if (a) {
                    arr.push(item)
                }

            })
            return arr
        },
        isFollow(){

            return this.report?.isFollow
        }
    },
    components: {
        GridLayout,
        GridItem,
        ChartTitleElement,
        DisplayChartElement,
        FollowList,
    },
    methods: {
        saveSuccess(){
            this.followVisible = false;
            this.getFllowData()
        },
        openFollow() {
            this.followVisible = true;


        },

        openEmailVisible() {
            this.getImg();
            this.emailVisible = true;
        },
        submitAddMail() {
            if (this.$PBULICFUNC.validaEmails(this.addMail)) {
                this.form.receivers.push(this.addMail);
                this.addReceiversVisible = false;
                this.addMail = '';
            } else {
                this.$message({
                    message: '请正确填写邮箱地址',
                    type: 'warning'
                });
            }
        },
        deleteReceivers(item) {
            this.form.receivers = this.form.receivers.filter(cur => cur!==item);
        },
        sendEmail() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.$api.SEND_MAIL(this.form).then((res)=>{
                        if (res) {
                            this.$message({
                                message: '发送成功',
                                type: 'success'
                            });
                            this.emailVisible = false
                        }
                    })
                } else {
                    this.$message({
                        message: '请完善邮件内容',
                        type: 'warning'
                    });
                }
            });
        },
        getImg(){
            window.pageYoffset = 0;
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            html2canvas(
                document.getElementById('Img'),
                {
                    backgroundColor:null,
                    useCORS: true,
                    scale: 0.8,
                    scrollY: 0,
                    scrollX: 0
                }
            ).then(canvas => {
                this.form.img = canvas.toDataURL("image/png");
            })
        },
        initHeight(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.fixed = scrollTop > this.offsetTop;
        },
        getFllowData(){
            const {userId} = this.$store.state.report.postMessageData
            this.$api.GET_USERFOLLOW(userId,this.id).then((v) => {
                this.followList = v.userFollow.split(",");
            })
        }

    },
    created() {
        const reportId = this.$route.params.id

        this.$store.dispatch('app/getReport', { reportId }).then(()=>{

            this.$store.commit('report/SET_REPORT_IS_EDIT', false);

            this.reload=true
        })


        const clickHandler = (e)=>{
            this.$store.commit('report/SET_POST_MESSAGE_DATA', e.data);



            //this.getFllowData()

            window.removeEventListener('message', clickHandler);

        }
        window.addEventListener('message', clickHandler);
    },
    watch: {
        id(val) {
            if(val){
                this.getFllowData()
            }

        }
    },
    mounted() {
        window.addEventListener('scroll',this.initHeight);
        this.$nextTick(()=>{
            let height = document.getElementsByClassName("ren-report-editor-header-display-menu");
            this.offsetTop = height[0].offsetTop + 10;
        })
    },
    beforeDestroy() {
        window.removeEventListener('message', () => {});
        window.removeEventListener('scroll',this.initHeight);
    },
}
</script>
<style scoped>
.ren-report-editor-header-display{
    /* display: flex;
     flex-direction: row-reverse;*/
    padding: 5px;
    text-align: right;
}
.ren-report-editor-header-display-menu{
    display: flex;
    justify-content: center;
    margin-top: 10px;
    margin-right: 2px;
    border: 0.5px solid #b1aca4;
    border-radius: 20px;
    box-shadow: 5px 5px 2px #99aac36e;
}
.email{
    display: flex;
    align-items: center;
}
.i{
    cursor: pointer;
    margin-right: 10px;
}
.isFixed{
    position: fixed;
    right: 2px;
    z-index: 999;
}
</style>
