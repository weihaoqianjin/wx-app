Page({
  data:{
    title:"选择性别",
    items:[{key:1,value:"男"},{key:2,value:"女"}],
    selectSexFlag:false,
    initDate:['1985', '01', '01'],
    datePickerFlag:false,
    name:"Jack",
    mobile:"18345334251",
    perfectInfoFlag:false
  },
  onLoad:function(){
  
  },
  showSelectSex:function(){
    this.setData({"selectSexFlag":true});
  },
  selectSex:function(e){
    console.log(e.detail);
  },
  showDatePicker:function(e){
    this.setData({"datePickerFlag":true});
  },
  datePickerOnSureClick: function (e) {
    // console.log(e.detail);
    this.setData({ "datePickerFlag": false});
  },
  datePickerOnCancelClick: function (event) {
    this.setData({"datePickerFlag":false});
  },
  showPerfectInfo:function(){
    this.setData({perfectInfoFlag:true});
  },
  perfectInfoMsg:function(e){
    console.log(e.detail);
  }
})
