<template>
</template>
<script>


  export default {

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
      }
    }
  }
  
</script>


