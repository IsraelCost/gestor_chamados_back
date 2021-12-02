const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            dept: DataTypes.STRING,
            email: DataTypes.STRING,
            tel: DataTypes.STRING,
            name: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize, 
            tableName: 'users',
            hooks: {
                async beforeSave(user) {
                    const hash = await bcrypt.hash(user.password, 10);
                    user.password = hash;
                }
            }
        });
    }

    static associate(models) {
        this.hasMany(models.Call, { foreignKey: 'caller_id', as: 'calls' });
        this.hasOne(models.Image, { foreignKey: 'user_id', as: 'image' });
    }
}

module.exports = User;