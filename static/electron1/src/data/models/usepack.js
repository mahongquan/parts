export default function(sequelize, DataTypes) {
  var UsePack = sequelize.define(
    'UsePack',
    {
      //name:DataTypes.STRING,// models.CharField(max_length=30,verbose_name="用户单位")#用户单位
      pack_id: DataTypes.INTEGER, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
      contact_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      tableName: 'parts_usepack',
    }
  );
  UsePack.associate = function(models) {
    UsePack.belongsTo(models.Pack, {
      foreignKey: 'pack_id',
    });
    UsePack.belongsTo(models.Contact, {
      foreignKey: 'pack_id',
    });
  };
  return UsePack;
}
