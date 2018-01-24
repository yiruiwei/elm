// pages/index/index.js
let Data = require('../../data/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    curNav: 0,
    curIndex: 0,
    total: 0,
    result: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var dataList = Data.dataPost.goods;
    Array.prototype.removeRepeat = function (curr) {
      var tmp = {}, b = [], a = this;
      for (var i = a.length-1; i > 0 ; i--) {
        if (!tmp[a[i][curr]]) { //记录查询 result[0]['name'] = '皮蛋瘦肉粥' 
          b.push(a[i]);  //如果没有查询到记录 将这个单元push到新数组中
          tmp[a[i][curr]] = true; //记录表中添加 对应属性 值为true
        }
      }
      return b;
    }
    dataList.forEach((item, index) => {
      item.foods.forEach((item) => {
        item.num = 0; //初始化每一个菜品的数量为0
      })
    });

    this.setData(
      {
        dataList: dataList
      }
    )
    console.log(dataList)

  },
  selectNav: function (e) {
    //把公共的curNav 设置为 被点击的组件的 index 自定义属性 通过e.target.dataset
    this.setData({
      curNav: e.target.dataset.index
    })
  },
  curAdd: function (e) {
    this.numCount(e, true)
  },
  curSub: function (e) {
    this.numCount(e, false)
  },
  numCount: function (e, toggle) {
    var childIndex = e.target.dataset.index; // 栏目下菜品下标
    var parentIndex = this.data.curNav; // 商品栏目下标
    var dataList = this.data.dataList;// 所有商品数据
    var item = dataList[parentIndex].foods[childIndex]; //具体商品
    var price = item.price * 1; //获取价格
    var num = this.data.dataList[parentIndex].foods[childIndex].num;// 获取数量
    var total = this.data.total; // 总价
     var result = [];
    if (toggle) {
      num++;
      total += price;
    } else {
      if (num <= 0) return;
      num--;
      total -= price;
    }

    this.data.dataList[parentIndex].foods[childIndex].num = num;

    dataList.forEach((item) => {
      item.foods.forEach((item) => {
        if (item.num > 0) {
        result.push(item);
        }
      })
    })


    this.setData({
      total: total,
      dataList: dataList,
      result:result
    })
  
  },
  goAcc: function () {

    var dataPost = this.data.result;
    console.log(dataPost);
    

  }

})
/*
  goods:[
        {
          foods:[
            { //具体的菜
              name:'皮蛋瘦肉粥',
              price:100000

            },
            {

            }
          ],
          name:'热销菜' //品类名称
        },
        {
          foods: [
            { //具体的菜
              name: '皮蛋瘦肉粥',
              price: 100000

            },
            {

            }
          ],
          name: '凉菜' //品类名称
        }

    ]

 */
