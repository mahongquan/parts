export default function(sequelize, DataTypes) {
  var Contact = sequelize.define(
    'Contact',
    {
      yonghu: DataTypes.STRING, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
      addr: DataTypes.STRING, // = models.CharField(max_length=30,verbose_name="客户地址",null=True,blank=True)#用户单位
      channels: DataTypes.STRING, // = models.CharField(max_length=30,verbose_name="通道配置",null=True,blank=True)#用户单位
      yiqixinghao: DataTypes.STRING, //=models.CharField(max_length=30,verbose_name="仪器型号",choices=ACHOICE)#仪器型号
      yiqibh: DataTypes.STRING, //=models.CharField(max_length=30,verbose_name="仪器编号")#仪器编号
      baoxiang: DataTypes.STRING, // =  models.CharField(max_length=30,verbose_name="包箱")#包箱
      shenhe: DataTypes.STRING, // =  models.CharField(max_length=30,verbose_name="审核")#审核
      yujifahuo_date: DataTypes.DATEONLY, // = models.DateTimeField(verbose_name="预计发货时间")#预计发货时间
      hetongbh: DataTypes.STRING, //=models.CharField(max_length=30,verbose_name="合同编号")#合同编号
      tiaoshi_date: DataTypes.DATEONLY,
      // email: DataTypes.STRING,
      // is_staff: DataTypes.BOOLEAN,
      // is_active: DataTypes.BOOLEAN,
      // date_joined: DataTypes.DATE
    },
    {
      underscored: true,
      timestamps: false,
      tableName: 'parts_contact',
    }
  );

  return Contact;
}
