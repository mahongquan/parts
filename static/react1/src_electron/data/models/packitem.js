export default function(sequelize, DataTypes) {
  var PackItem = sequelize.define(
    'PackItem',
    {
      pack_id: DataTypes.INTEGER, // models.CharField(max_length=30,verbose_name="用户单位")#用户单位
      item_id: DataTypes.INTEGER,
      ct: DataTypes.INTEGER,
      quehuo: DataTypes.BOOLEAN,
    },
    {
      timestamps: false,
      tableName: 'parts_packitem',
    }
  );
  PackItem.associate = function(models) {
    PackItem.belongsTo(models.Item, {
      foreignKey: 'item_id',
    });
    PackItem.belongsTo(models.Pack, {
      foreignKey: 'item_id',
    });
  };
  return PackItem;
}
