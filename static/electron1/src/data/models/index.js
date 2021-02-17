// <<<<<<< HEAD:static/react1/src/data/models/index.js
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var config = {
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../../../..', 'data.sqlite'),
};
var sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
var funcs = {};
function DateStr(date) {
  console.log(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var s_month = '' + month;
  if (s_month.length < 2) s_month = '0' + s_month;
  var day = date.getDate();
  var s_day = '' + day;
  if (s_day.length < 2) s_day = '0' + s_day;
  return year + '-' + s_month + '-' + s_day;
}

class models {
  static sequelize = sequelize;
  static Sequelize = Sequelize;
  static on(url, cb) {
    funcs[url] = cb;
  }
  static init = (callback) => {
    models.on('/sql', async function (cmd, callback) {
      // console.log(cmd);
      var cursor = await models.sequelize.query(cmd);
      // console.log(cursor[0]);
      callback({
        success: true,
        data: cursor[0],
      });
    });
    models.on('/post/standard', function (data, callback) {
      console.log('/post/standard');
      console.log(data);
      callback({
        success: true,
        data: [],
        message: 'delete Contact ok',
      });
    });
    models.on('/get/showcontact', async function (data, callback) {
      console.log(data);
      var contact = await models.Contact.findById(data.id); //.then(function(packitem) {
      callback({
        success: true,
        contact: contact,
        items: [],
        items2: [],
        totalct: 0,
        totalid: 0,
        message: 'showcontact ok',
      });
    });
    models.on('/get/year12', async function (data, callback) {
      var baoxiang = data.baoxiang;
      var end_date = new Date();
      var start_date = new Date(); //datetime.datetime(end_date.year-1,1,1,0,0,0)
      start_date.setYear(start_date.getFullYear() - 10);
      start_date.setMonth(0);
      start_date.setDate(1);

      // cursor = connection.cursor()            #获得一个游标(cursor)对象
      // #更新操作
      var start_date_s = DateStr(start_date);
      var end_date_s = DateStr(end_date);
      let cmd;
      if (baoxiang == null)
        cmd =
          "select strftime('%Y',tiaoshi_date) as month,count(id) as ct  from parts_contact  where tiaoshi_date between '" +
          start_date_s +
          "' and '" +
          end_date_s +
          "' group by month";
      else
        cmd =
          "select strftime('%Y',tiaoshi_date) as month,count(id) as ct from parts_contact  where baoxiang like '" +
          baoxiang +
          "'  and tiaoshi_date between '" +
          start_date_s +
          "' and '" +
          end_date_s +
          "' group by month";
      console.log(cmd);
      var cursor = await models.sequelize.query(cmd);
      console.log(cursor[0]);
      // logging.info(cmd)
      // cursor.execute(cmd)    #执行sql语句
      // raw = cursor.fetchall()                 #返回结果行 或使用 #raw = cursor.fetchall()
      var lbls = [];
      var values = [];
      for (var i in cursor[0]) {
        lbls.push(cursor[0][i].month);
        values.push(cursor[0][i].ct);
      }
      callback({
        success: true,
        lbls: lbls,
        values: values,
      });
    });
    models.on('/get/month12', async function (data, callback) {
      var baoxiang = data.baoxiang;
      var end_date = new Date();
      var start_date = new Date(); //datetime.datetime(end_date.year-1,1,1,0,0,0)
      start_date.setYear(start_date.getFullYear() - 3);
      start_date.setMonth(0);
      start_date.setDate(1);

      // cursor = connection.cursor()            #获得一个游标(cursor)对象
      // #更新操作
      var start_date_s = DateStr(start_date);
      var end_date_s = DateStr(end_date);
      let cmd;
      if (baoxiang == null)
        cmd =
          "select strftime('%Y-%m',tiaoshi_date) as month,count(id) as ct  from parts_contact  where tiaoshi_date between '" +
          start_date_s +
          "' and '" +
          end_date_s +
          "' group by month";
      else
        cmd =
          "select strftime('%Y-%m',tiaoshi_date) as month,count(id) as ct from parts_contact  where baoxiang like '" +
          baoxiang +
          "'  and tiaoshi_date between '" +
          start_date_s +
          "' and '" +
          end_date_s +
          "' group by month";
      console.log(cmd);
      var cursor = await models.sequelize.query(cmd);
      console.log(cursor[0]);
      // logging.info(cmd)
      // cursor.execute(cmd)    #执行sql语句
      // raw = cursor.fetchall()                 #返回结果行 或使用 #raw = cursor.fetchall()
      var lbls = [];
      var values = [];
      for (var i in cursor[0]) {
        lbls.push(cursor[0][i].month);
        values.push(cursor[0][i].ct);
      }
      callback({
        success: true,
        lbls: lbls,
        values: values,
      });
    });
    models.on('/parts/showcontact', async function (data, callback) {
      var contact = await models.Contact.findById(data.id); //.then(function(packitem) {
      callback({
        data: contact,
        message: 'show  Contact ok',
      });
    }); //delete
    //route.delete('/rest/Contact/:contact_id', async function(ctx,next) {
    models.on('/delete/Contact', async function (data, callback) {
      var contact = await models.Contact.findById(data.contact_id); //.then(function(packitem) {
      contact.destroy();
      callback({
        data: [],
        message: 'delete Contact ok',
      });
    }); //delete
    //route.post('/rest/Contact', async function(ctx,next) {
    models.on('/post/Contact', async function (data, callback) {
      let contact;
      try {
        contact = await models.Contact.create(data);
        callback({
          success: true,
          data: contact,
          message: 'create Contact ok',
        });
      } catch (e) {
        console.log(e);
        for (var i in e) {
          console.log(i);
        }
        callback({
          success: false,
          message: e.message,
          error: e,
        });
      }
    });
    //route.put('/rest/Contact', async function(ctx,next) {
    models.on('/put/Contact', async function (data, callback) {
      var contact = await models.Contact.findById(data.id); //.then(function(packitem) {
      contact.update(data);
      contact.save();
      callback({
        success: true,
        data: contact,
        message: 'update  Contact ok',
      });
    });
    //route.get('/rest/Contact', async function(ctx,next) {
    models.on('/get/Contact', async function (data, callback) {
      var start = data.start;
      var limit = data.limit;
      let search = '',
        filter_danwei = '';
      if (data.filter_danwei) {
        filter_danwei = data.filter_danwei;
      }
      if (data.search) search = data.search;
      var baoxiang = '';
      if (data.baoxiang) {
        baoxiang = data.baoxiang;
      }
      var w = {};
      if (data.yiqibh && data.yiqibh != '') {
        w.yiqibh = {
          [Sequelize.Op.like]: '%' + data.yiqibh + '%',
        };
      }
      if (search != '') {
        w.hetongbh = {
          [Sequelize.Op.like]: '%' + search + '%',
        };
      }
      if (filter_danwei != '') {
        w.yonghu = {
          [Sequelize.Op.like]: '%' + filter_danwei + '%',
        };
      }
      if (baoxiang != '') {
        w.baoxiang = {
          [Sequelize.Op.like]: '%' + baoxiang + '%',
        };
      }
      console.log(w);
      var datas = await models.Contact.findAll({
        attributes: [
          [models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
        ],
        where: w,
      });
      //ctx.body=datas;
      var total = datas[0].dataValues.total;
      console.log('total=' + total);
      var contacts = await models.Contact.findAll({
        where: w,
        limit: limit,
        offset: start,
        order: [['yujifahuo_date', 'DESC']],
      });
      for (var i = 0; i < contacts.length; i++) {
        contacts[i] = contacts[i].dataValues;
      }
      callback({
        data: contacts,
        total: total,
      });
    });
    //UsePack//////////////////////////////////////////////////////////////////////
    //route.delete('/rest/UsePack/:contact_id', async function(ctx) {
    models.on('/delete/UsePack', async function (data, callback) {
      var contact = await models.UsePack.findByPk(data.id); //.then(function(packitem) {
      contact.destroy();
      callback({
        data: [],
        message: 'delete UsePack ok',
      });
    }); //delete
    //route.post('/rest/UsePack', async function(ctx,next) {
    models.on('/post/UsePack', async function (data, callback) {
      var data1 = {};
      data1.contact_id = data.contact;
      data1.pack_id = data.pack;
      var contact = await models.UsePack.create(data1);
      var pack = await contact.getPack();
      var res={}
      res.id =contact.id;
      res.name = pack.name;
      res.pack = pack.id;
      callback({
        data: res,
        message: 'create UsePack ok',
      });
    });
    //route.put('/rest/UsePack', async function(ctx,next) {
    models.on('/put/UsePack', async function (data, callback) {
      console.log(data);
      var contact = await models.UsePack.findById(data.id); //.then(function(packitem) {
      contact.update(data);
      contact.save();
      callback({
        data: contact,
        message: 'update  UsePack ok',
      });
    });
    models.on('/post/UsePackEx', async function (data, callback) {
      console.log(data);
      var rec1 = await models.Pack.create(data);
      var rec = await models.UsePack.create({
        contact_id: data.contact,
        pack_id: rec1.id,
      });
      rec.dataValues['Pack'] = rec1;
      rec.name = rec1.name;
      rec.pack = rec1.id;
      callback({
        data: rec,
        message: 'create UsePack ok',
      });
    });

    models.on('/put/BothPackItem', async function (data, callback) {
      console.log('BothPackItem');
      console.log(data);
      var item = await models.Item.findByPk(data.itemid); //.then(function(packitem) {
      item.update(data);
      item.save();
      var packitem = await models.PackItem.findByPk(data.id); //.then(function(packitem) {
      packitem.update(data);
      packitem.save();
      var packitem_r = packitem.dataValues;
      packitem_r.name = item.name;
      packitem_r.guige = item.guige;
      packitem_r.bh = item.bh;
      packitem_r.danwei = item.danwei;
      packitem_r.itemid = item.id;
      callback({
        data: packitem_r,
        message: 'create PackItem ok',
      });
    });

    models.on('/post/BothPackItem', async function (data, callback) {
      console.log(data);
      if (!data.ct) data.ct = 0;
      if (!data.danwei) data.danwei = '';
      var rec1 = await models.Item.create(data);
      var rec = await models.PackItem.create({
        pack_id: data.pack,
        item_id: rec1.id,
        ct: 1,
        quehuo: false,
      });
      rec.dataValues['Item'] = rec1;
      rec.name = rec1.name;
      rec.guige = rec1.guige;
      rec.bh = rec1.bh;
      rec.danwei = rec1.danwei;
      rec.itemid = rec1.id;
      callback({
        data: rec,
        message: 'create PackItem ok',
      });
    });
    models.on('/get/UsePack', async function (data, callback) {
      console.log(data);
      var start = data.start;
      var limit = data.limit;
      var search = data.search;
      var w = {
        contact_id: data.contact,
      };
      var datas = await models.UsePack.findAll({
        attributes: [
          [models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
        ],
        where: w,
      });
      var total = datas[0].dataValues.total;
      console.log('total=' + total);
      var contacts = await models.UsePack.findAll({
        where: w,
        limit: limit,
        offset: start,
        include: [
          {
            model: models.Pack,
          },
        ],
      });
      let res = [];
      for (var i = 0; i < contacts.length; i++) {
        res[i]={};
        res[i].id= contacts[i].id;//dataValues;
        res[i].name = contacts[i].Pack.name;
        res[i].pack = contacts[i].Pack.id;
      }
      callback({
        data: res,
        total: total,
      });
    });
    //PackItem//////////////////////////////////////////////////////////////////////
    //route.delete('/rest/PackItem/:contact_id',  async function(ctx,contact_id) {
    models.on('/delete/PackItem', async function (data, callback) {
      var contact = await models.PackItem.findByPk(data.id); //.then(function(packitem) {
      contact.destroy();
      callback({
        data: [],
        message: 'delete PackItem ok',
      });
    }); //delete
    //route.post('/rest/PackItem', async function(ctx,next) {
    models.on('/post/login', async function (data, callback) {
      var output = { success: true, message: 'User' };
      output['data'] = { name: '马红权' };
      callback(output);
    });
    models.on('/post/PackItem', async function (data, callback) {
      console.log(data); //pack itemid
      let data1 = {
        pack_id: data.pack,
        item_id: data.itemid,
        quehuo: false,
        ct: 1,
      };
      var pi = await models.PackItem.create(data1);
      var i = await pi.getItem();
      pi = pi.dataValues;
      pi.name = i.name;
      pi.guige = i.guige;
      pi.bh = i.bh;
      pi.danwei = i.danwei;
      pi.itemid = i.id;
      callback({
        data: pi,
        message: 'create UsePack ok',
      });
    });
    //route.put('/rest/PackItem/:id',async  function(ctx,next) {
    models.on('/put/PackItem', async function (data, callback) {
      console.log(data.id);
      var packitem = await models.PackItem.findById(data.id, {
        include: [
          {
            model: models.Item,
          },
        ],
      }); //.then(function(packitem) {
      console.log('==============================');
      console.log(packitem);
      packitem.update(data);
      packitem.Item.save();
      packitem.save();
      console.log(packitem);
      callback({
        data: packitem,
        message: 'update packitem ok',
      });
    }); //update
    // route.put('/rest/PackItem/:id', function*(id) {
    //  var contact = await models.PackItem.findById(id); //.then(function(packitem) {
    //  contact.update(data);
    //  contact.save();
    //  callback({
    //    data: contact,
    //    message: "update  PackItem ok"
    //  };
    // }));
    //route.get('/rest/PackItem', async function(ctx,next) {
    models.on('/get/PackItem', async function (data, callback) {
      console.log('/get/PackItem');
      console.log(data);
      var start = data.start;
      var limit = data.limit;
      let search = '';
      if (data.search) search = data.search;
      var w = {
        pack_id: data.pack,
      };
      var datas = await models.PackItem.findAll({
        attributes: [
          [models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
        ],
        where: w,
      });
      var total = datas[0].dataValues.total;
      console.log('total=' + total);
      var contacts = await models.PackItem.findAll({
        where: w,
        limit: limit,
        offset: start,
        include: [
          {
            model: models.Item,
          },
        ],
      });
      let res = [];
      for (var i = 0; i < contacts.length; i++) {
        res[i] = contacts[i].dataValues;
        res[i].name = contacts[i].Item.name;
        res[i].guige = contacts[i].Item.guige;
        res[i].bh = contacts[i].Item.bh;
        res[i].danwei = contacts[i].Item.danwei;
        res[i].itemid = contacts[i].Item.id;
        delete res[i].Item;
      }
      callback({
        data: res,
        total: total,
      });
    });
    //Pack
    //route.post('/rest/Pack', async function(ctx,next) {
    models.on('/post/Pack', async function (data, callback) {
      var data = await models.Pack.create(data);
      callback({
        data: data,
        message: 'create pack ok',
      });
    });
    //route.get('/rest/Pack', async function(ctx,next) {
    models.on('/get/Pack', async function (data, callback) {
      console.log(data);
      var start = data.start;
      var limit = data.limit;
      var search = data.search;
      var w = null;
      if (search && search != '') {
        w = {
          name: {
             [Sequelize.Op.like]: '%' + search + '%',
          },
        };
      } else {
        w = {};
      }
      console.log(w);
      var datas = await models.Pack.findAll({
        attributes: [
          [models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
        ],
        where: w,
      });
      var total = datas[0].dataValues.total;
      console.log('total=' + total);
      var contacts = await models.Pack.findAll({
        where: w,
        limit: limit,
        offset: start,
        order: [['id', 'DESC']],
      });
      let res = [];
      for (var i = 0; i < contacts.length; i++) {
        res[i] = contacts[i].dataValues;
      }
      callback({
          success:true,
          data: res,
          total: total,
      });
    });
    //Item
    //route.post('/rest/Item', async function(ctx,next) {
    models.on('/post/Item', async function (data, callback) {
      var data = await models.Item.create(data);
      callback({
        data: data,
        message: 'create item ok',
      });
    });
    models.on('/put/Item', async function (data, callback) {
      console.log(data);
      var item = await models.Item.findById(data.id);
      item.update(data);
      // item.dataValues=data.dataValues;
      item.save();
      callback({
        data: item.dataValues,
        message: 'update item ok',
      });
    });
    //route.get('/rest/Item', async function(ctx,next) {
    models.on('/get/Item', async function (data, callback) {
      console.log(data);
      var start = data.start;
      var limit = data.limit;
      var search = data.query;
      var w = null;
      if (search && search != '') {
        w = {
          name: {
             [Sequelize.Op.like]: '%' + search + '%',
          },
        };
      } else {
        w = {};
      }
      console.log(w);
      var datas = await models.Item.findAll({
        attributes: [
          [models.sequelize.fn('COUNT', models.sequelize.col('id')), 'total'],
        ],
        where: w,
      });
      var total = datas[0].dataValues.total;
      console.log('total=' + total);
      var contacts = await models.Item.findAll({
        where: w,
        limit: limit,
        offset: start,
        order: [['id', 'DESC']],
      });
      var r=[]
      for(var i=0;i<contacts.length;i++){
        r.push(contacts[i].dataValues);
      }
      callback({
        data: r,
        total: total,
      });
    });
    callback();
  };
  static emit(url, data, callback) {
    console.log(url);
    funcs[url](data, callback);
  }
  static get_Contact = async function (data, callback) {
    var start = data.start;
    var limit = data.limit;
    let search = '',
      filter_danwei = '';
    if (data.filter_danwei) {
      filter_danwei = data.filter_danwei;
    }
    if (data.search) search = data.search;
    var baoxiang = '';
    if (data.baoxiang) {
      baoxiang = data.baoxiang;
    }
    var w = {};
    if (data.yiqibh && data.yiqibh != '') {
      w.yiqibh = {
        [Sequelize.Op.like]: '%' + data.yiqibh + '%',
      };
    }
    if (search != '') {
      w.hetongbh = {
        [Sequelize.Op.like]: '%' + search + '%',
      };
    }
    if (filter_danwei != '') {
      w.yonghu = {
        [Sequelize.Op.like]: '%' + filter_danwei + '%',
      };
    }
    if (baoxiang != '') {
      w.baoxiang = {
        [Sequelize.Op.like]: '%' + baoxiang + '%',
      };
    }
    console.log(w);
    var result = await models.Contact.findAndCountAll({
      where: w,
      offset: start,
      limit: limit,
      order: [['yujifahuo_date', 'DESC']],
    });
    console.log(result);
    var total = result.count;
    var contacts = result.rows;
    callback({
      data: contacts,
      total: total,
    });
  };
}
models.Contact = sequelize.define(
  'Contact',
  {
    yonghu: Sequelize.STRING, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    addr: Sequelize.STRING, // = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
    channels: Sequelize.STRING, // = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
    yiqixinghao: Sequelize.STRING, //=models.CharField(max_length=30,verbose_name="仪器型号",choices=ACHOICE)#仪器型号
    method: Sequelize.STRING,
    yiqibh: Sequelize.STRING, //=models.CharField(max_length=30,verbose_name="仪器编号")#仪器编号
    baoxiang: Sequelize.STRING, // =  models.CharField(max_length=30,verbose_name="包箱")#包箱
    shenhe: Sequelize.STRING, // =  models.CharField(max_length=30,verbose_name="审核")#审核
    yujifahuo_date: Sequelize.DATEONLY, // = models.DateTimeField(verbose_name="预计发货时间")#预计发货时间
    hetongbh: Sequelize.STRING, //=models.CharField(max_length=30,verbose_name="合同编号")#合同编号
    tiaoshi_date: Sequelize.DATEONLY,
  },
  {
    underscored: true,
    timestamps: false,
    tableName: 'parts_contact',
  }
);
models.Item = sequelize.define(
  'Item',
  {
    bh: Sequelize.STRING, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    name: Sequelize.STRING, // = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
    guige: Sequelize.STRING, // = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
    ct: Sequelize.INTEGER, //=models.CharField(max_length=30,verbose_name="仪器型号",choices=ACHOICE)#仪器型号
    danwei: Sequelize.STRING, //=models.CharField(max_length=30,verbose_name="仪器编号")#仪器编号
    beizhu: Sequelize.STRING, // =  models.CharField(max_length=30,verbose_name="包箱")#包箱
    image: Sequelize.STRING,
  },
  {
    timestamps: false,
    tableName: 'parts_item',
  }
);
models.Pack = sequelize.define(
  'Pack',
  {
    name: Sequelize.STRING, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
  },
  {
    timestamps: false,
    tableName: 'parts_pack',
  }
);
models.UsePack = sequelize.define(
  'UsePack',
  {
    //name:Sequelize.STRING,// models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    pack_id: Sequelize.INTEGER, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    contact_id: Sequelize.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'parts_usepack',
  }
);
models.UsePack.belongsTo(models.Pack, {
  foreignKey: 'pack_id',
});
models.UsePack.belongsTo(models.Contact, {
  foreignKey: 'contact_id',
});
models.PackItem = sequelize.define(
  'PackItem',
  {
    pack_id: Sequelize.INTEGER, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
    item_id: Sequelize.INTEGER,
    ct: Sequelize.INTEGER,
    quehuo: Sequelize.BOOLEAN,
  },
  {
    timestamps: false,
    tableName: 'parts_packitem',
  }
);
models.PackItem.belongsTo(models.Item, {
  foreignKey: 'item_id',
});
models.PackItem.belongsTo(models.Pack, {
  foreignKey: 'pack_id',
});
models.init(() => {});
export default models;
