<template>
  <div style="padding:0px 10px 10px 10px">
      <!-- 顶部内容 -->
          <div style="background:#fff;padding:8px;">
            <n3-tooltip content="查看标签" placement="bottom" trigger="hover">
              <n3-button @click.native="openLeft"><n3-icon type="bars"></n3-icon></n3-button>
            </n3-tooltip>
            <n3-tooltip content="点击清空" placement="bottom" trigger="hover">
              <n3-button v-bind:badge="clipList.length" @click.native="clean" type="danger" style="float:right"><n3-icon type="trash-o"></n3-icon></n3-button>
            </n3-tooltip>
          </div>

      <!-- 侧栏 -->
      <n3-aside  placement="left" title="标签" width="150px" ref="asideLeft" :header="false"> 
          <div></div>
          <div></div>
      </n3-aside>
     <!-- 剪切板 -->
        <n3-modal  effect="zoom" width="300px" ref="customModal">
          <div slot="header">
          </div>
          <div slot="body" style="overflow:auto">
            {{contentShow}}
          </div>
          <div slot="footer">
          </div>
        </n3-modal>

     <n3-card style="height:50px;padding:10px 10px 20px 10px;margin:10px;text-align:center;" :hover="true"  v-if="clipList.length == 0">
            快去复制吧~
    </n3-card>
     <div style="height:450px;overflow:scroll;overflow-x:hidden;::-webkit-scrollbar" v-if="clipList.length != 0">
        <n3-card style="padding:10px 10px 20px 10px;margin:10px" :hover="true" v-for="(item, index)  in clipList">
            <p v-on:click="copyContent(item)" v-show="!item.showTotal">{{item.content | hideFliter}}</p> 
            
            <div style="">
              <p style="font-size:12px;float:left"  v-bind:style="index, clipList| colorFliter">{{item.date | date}}</p>
              <n3-icon type="trash-o" style="float:right;cursor:pointer;margin-left:10px" ></n3-icon>
              <n3-icon type="star-o" style="float:right;cursor:pointer" ></n3-icon>
              <p style="float:right;cursor:pointer;margin-right:10px;font-size:12px;color:blue" v-if="item.content.length>100" @click="showMore(item.content)">show more</p>
            </div>
        </n3-card> 
    </div>
    

  
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'


  export default {
    name: 'landing-page',
    components: { SystemInformation },
    data: function () {
            return {
                interval:{},
                clip:"",
                lastClip:{},
                clipList:[],
                contentShow:""
            };
        },
    mounted(){
      var self = this;
      this.qry();
      this.interval =  setInterval(function(){ 
            self.clipboard();
        },100)
    },
    methods: {
      insertTXT (str) {
        var self = this
                var obj = { 
                  content:str,
                  date:Date.parse(new Date()),
                  tag:"unsort",
                  type:"TXT"
               };
 
          this.$clipdb.insert(obj, function (err, result) {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
             self.clipList.unshift(result)
          });
      },
      qry () {
        var self = this
          // this.$clipdb.find({ tag:"unsort"}, function (err, docs) {
          //   self.clipList = docs
          // });
          this.$clipdb.find({ tag:"unsort"}).sort({ date: -1 }).exec(function (err, docs) {
        // docs is [doc1, doc3, doc2]
        self.clipList = docs
        });
      },
      clipboard(){

        var read = this.$electron.clipboard.readText()//文本类型

        if (read === null || read === undefined || read === '') { 
          return;
        } 

        if(read !="" &&  read != this.lastClip){//重复的话不进行存储
          this.clip  = read;
          this.insertTXT(this.clip) 
          this.lastClip = read; //记录上次复制的内容
        }
      },
      openLeft () {
      this.$refs.asideLeft.open()
      },
      clean () {
        var self = this
        // this.$clipdb.remove({  tag:"unsort" }, { multi: true }, function (err, numRemoved) {
        this.$clipdb.remove({ }, { multi: true }, function (err, numRemoved) {
          
        // numRemoved = 1
        self.clipList = []
        self.showToast("清除"+numRemoved+"条数据")

        });
      },
      showToast (txt) {
        this.n3Toast({
          text: txt,
          type: 'success',
          placement: 'bottom',
          closeOnClick : true,
          duration:1000
        })
      },
      copyContent (e){
       this.$electron.clipboard.writeText(e.content)
       this.showToast("复制成功")
      },
      showMore (e){

        this.contentShow = e;
        this.$refs.customModal.open()

      }
    },
    filters: {
      date:function (input) {
          var d = new Date(input);
          var year = d.getFullYear();
          var month = d.getMonth() + 1;
          var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
          var hour = d.getHours();
          var minutes = d.getMinutes();
          var seconds = d.getSeconds();
          return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
      },
      colorFliter : function(input,clipList){
              var color = (clipList.length - input)%5;
              
              if(color == 0){
                return {
                   color:"rgb(75,194,112)"
                };
              }else if (color == 1){
                return {
                   color:"rgb(218, 233, 37 )"
                };
              }else if(color == 2){
                return {
                   color:"rgb(20, 121 ,211)"
                };
              }else if(color == 3){
                return {
                   color:"rgb(255 ,128 ,128 )"
                };
              }else if(color == 4){
                return {
                   color:"rgb(21 ,159, 238)"
                };
              }
      },
      hideFliter:function(input , isShow){
        if(input.length >100 ){ //超出限制
            return input.substr(0,100) + "...";            
        }
        return input;
        

      }
    }
  }
  
</script>

<style>
 
</style>
