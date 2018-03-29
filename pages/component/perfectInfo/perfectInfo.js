Component({
  properties: {
    name: {
      type: String,
      value: ""
    },
    mobile: {
      type: String,
      value: ""
    },
    isShow: {
      type: Boolean,
      value: false
    },
    isFit: {
      type: Boolean,
      value: false
    },
    sexShow: {
      type: Boolean,
      value: false
    },
    sexText: {
      type: String,
      value: ''
    },
    sexKey: {
      type: Number,
      value: 0
    },
    birth: {
      type: String,
      value: ""
    },
    datePickerIsShow: {
      type: Boolean,
      value: false
    },
    isPerfect: {
      type: Boolean,
      value: false
    },
    temPatient: {
      type: Object,
      value: {}
    },
    curKey: {
      type: Object,
      value: {}
    }
  },
  methods: {
    'submit': function () {
      if (this.data.isFit) {
        this.triggerEvent('confirmevent', this.properties.temPatient);
        this.close();
      }
    },
    'idInput': function (e) {
      this.setData({ idCard: e.detail.value, isFit: true });
    },
    'close': function () {
      this.setData({
        'isShow': false,
        'isFit': false,
        'sexText': '',
        'sexKey': 0,
        'birth': '',
        'curKey': {}
      });
      this.triggerEvent('closeevent', this.data.isFit);
    },
    'sexShow': function () {
      this.setData({ 'sexShow': true });
    },
    'selectSex': function (e) {
      this.setData({
        'sexText': e.detail.value,
        'sexShow': false,
        'temPatient.patientSex': e.detail.key
      });
      this.setData({ 'isFit': this.checkStatus() });
    },
    'birthShow': function (e) {
      this.setData({
        datePickerIsShow: true,
      });
    },
    'datePickerOnSureClick': function (e) {
      var me = this;
      me.setData({
        'birth': e.detail.value[0] + '-' + e.detail.value[1] + '-' + e.detail.value[2],
        'datePickerValue': e.detail.value,
        'datePickerIsShow': false,
        'temPatient.birthday': e.detail.value[0] + '-' + e.detail.value[1] + '-' + e.detail.value[2]
      });
      this.setData({ 'isFit': this.checkStatus() });
    },
    'datePickerOnCancelClick': function () {
      this.setData({ 'datePickerIsShow': false });
    },
    'checkStatus': function () {
      if (this.data.sexText == '' || this.data.birth == '')
        return false;
      else
        return true;
    },
    //阻断事件向下传递
    'preventTouchMove': function () { }
  }
})