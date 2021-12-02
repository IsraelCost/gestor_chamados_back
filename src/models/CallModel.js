const { Model, DataTypes } = require('sequelize');

class Call extends Model {
    static init(sequelize) {
        super.init({
            caller_id: DataTypes.INTEGER,
            receiver_id: DataTypes.INTEGER,
            num_equip: DataTypes.INTEGER,
            description: DataTypes.STRING,
        }, {
            sequelize, 
            tableName: 'calls'
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'id', as: 'users' });
    }
}

module.exports = Call;