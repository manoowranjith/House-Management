module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define("housedetails", {
        houseId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      houseNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
    return model;
  };
