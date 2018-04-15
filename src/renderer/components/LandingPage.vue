<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="right-side">
        <div class="doc">
          <button @click="clipboard()">{{clip}}</button>
          <button @click="qry()">qry</button>
          
        </div>
      </div>
    </main>
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
                lastClip:{}
            };
        },
    mounted(){
      var self = this;
     this.interval =  setInterval(function(){ 
            self.clipboard();
        },100)
    },
    methods: {
      insertTXT (str) {
                var obj = { 
                  content:str,
                  date:Date.parse(new Date()),
                  tag:"unsort",
                  type:"TXT"
               };
 
          this.$db.insert(obj, function (err, result) {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
            console.log("insert",err,result)
          });
      },
      qry () {
          this.$db.find({ tag:"unsort"}, function (err, docs) {
            // docs contains Omicron Persei 8, whose humans have more than 5 genders (7).
            console.log("qry",err,docs)
          });
      },
      clipboard(){
        // this.$electron.clipboard.writeText('String')

        var read = this.$electron.clipboard.readText()//文本类型

        if(read !="" &&  read != this.lastClip){//重复的话不进行存储
          this.clip  = read;
          this.insertTXT(this.clip) 
          this.lastClip = read; //记录上次复制的内容
          console.log(read)
        }
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
