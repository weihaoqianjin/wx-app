Component({
  properties: {
    value: {
      type: Array,
      value: [],
      observer: "onValue"
    },
    isShow: {
      type: Boolean,
      value: false,
      observer: "onShow"
    }
  },
  data: {
    years: [],
    months: [],
    days: [],
    tempYearPos: [0],
    tempMonthPos: [0],
    tempDayPos: [0],
    showPicker: false,
    monthsBake: []
  },

  attached: function () {
    /**
     * 初始化年月日
     */
    var date = new Date();
    var years = [];
    var months = [];
    var days = [];

    for (var i = 1900; i <= date.getFullYear(); i++) {
      years.push(i);
    }

    for (var i = 1; i <= 12; i++) {
      var month = 0;
      month = i < 10 ? '0' + i : i;
      months.push(month);
    }

    days = this.getDays(date.getFullYear(), date.getMonth() + 1);

    this.setData({
      years: years,
      months: months,
      days: days,
      monthsBake: months
    });

  },

  methods: {
    onTouchmask: function (event) {
    },
    onCacnelClick: function (e) {
      this.setData({ "months": this.data.monthsBake });
      this.triggerEvent('cancelclick', {});
    },
    onSureClick: function (e) {
      var curYear = this.data.years[this.data.tempYearPos];
      var curMonth = this.data.months[this.data.tempMonthPos];
      var curDay = this.data.days[this.data.tempDayPos];
      var date = new Date();
      if (curYear == date.getFullYear()) {
        curMonth = curMonth > date.getMonth() + 1 ? date.getMonth() + 1 : curMonth;
        if (curMonth == date.getMonth() + 1) {
          curDay = curDay >= date.getDate() ? date.getDate() : curDay;
        }
      }
      var value = [curYear, curMonth, curDay];
      this.setData({ "months": this.data.monthsBake,"value":value});
      this.triggerEvent('sureclick', {
        value: value,
      });
    },
    year_onChange: function (e) {
      //年改变，月要滑到一月，天要重新计算该年该月多少天
      var days = [];
      var curYear = this.data.years[e.detail.value];
      days = this.getDays(curYear, 1);
      var date = new Date();
      if (curYear == date.getFullYear()) {
        var months = [];
        var maxMonth = date.getMonth() + 1;
        for (var i = 1; i <= maxMonth; i++) {
          var month = 0;
          month = i < 10 ? '0' + i : i;
          months.push(month);
        }
        this.setData({ "months": months });
      } else {
        this.setData({ "months": this.data.monthsBake });
      }
      this.setData({
        days: days,
        tempYearPos: e.detail.value,
        tempMonthPos: [0],
        tempDayPos: [0],
      });
    },
    month_onChange: function (e) {
      var days = [];
      var curYear = this.data.years[this.data.tempYearPos];
      var curMonth = this.data.months[e.detail.value];
      days = this.getDays(curYear, curMonth);
      this.setData({
        days: days,
        tempMonthPos: e.detail.value,
        tempDayPos: [0],
      });
    },
    day_onChange: function (e) {
      this.setData({
        tempDayPos: e.detail.value
      });
    },
    onValue: function () {
      //通过传进来的年月日,计算对应的index
      var data = this.getRefreshData();
      this.setData(data)
    },
    onShow: function () {
      var data = this.getRefreshData();
      data.showPicker = this.data.isShow;
      this.setData(data)
    },
    getDays: function (year, month) {
      var days = [];
      month = parseInt(month, 10);
      var date = new Date(year, month, 0);
      var maxDay;
      var temDate = new Date();
      if (year == temDate.getFullYear() && month == (temDate.getMonth() + 1)) {
        maxDay = temDate.getDate();
      } else {
        maxDay = date.getDate();
      }
      for (var i = 1; i <= maxDay; i++) {
        var day = 0;
        day = i < 10 ? '0' + i : i;
        days.push(day);
      }
      return days;
    },
    getRefreshData: function () {
      //通过传进来的年月日,计算对应的index
      if (this.data.years == null || this.data.years.length == 0) {
        return {};
      }

      var date = new Date();

      var tempYearPos = this.data.years.length - 1;
      var tempMonthPos = date.getMonth();
      var tempDayPos = date.getDate() - 1;

      for (var i = 0; i < this.data.years.length; i++) {
        var item = this.data.years[i];
        if (item == this.data.value[0]) {
          tempYearPos = i;
          break;
        }
      }

      for (var i = 0; i < this.data.months.length; i++) {
        var item = this.data.months[i];
        if (item == this.data.value[1]) {
          tempMonthPos = i;
          break;
        }
      }

      var days = [];
      var curYear = this.data.years[tempYearPos];
      days = this.getDays(curYear, this.data.months[tempMonthPos]);

      for (var i = 0; i < days.length; i++) {
        var item = days[i];
        if (item == this.data.value[2]) {
          tempDayPos = i;
          break;
        }
      }

      var data = {
        days: days,
        tempYearPos: [tempYearPos],
        tempMonthPos: [tempMonthPos],
        tempDayPos: [tempDayPos],
      }
      return data;
    },
    //阻断事件向下传递
    'preventTouchMove': function () { }
  }
});