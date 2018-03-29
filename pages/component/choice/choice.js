Component({
  properties:{
    dicSelectTitle:{
      type:String,
      value:'标题'
    },
    dicItems:{
      type:Array,
      value:[]
    },
    curKey:{
      type:Object,
      value:{}
    },
    dicShow:{
      type:Boolean,
      value:false
    }
  },
  methods:{
    select:function(){
      var arr = this.properties.dicItems,
        index = arguments[0].target.dataset.index;
      this.setData({ curKey: arr[index], dicShow: false});
      this.triggerEvent('selectevent', arr[index]);
    },
    close:function(){
      this.setData({dicShow: false });
    }
  }
})