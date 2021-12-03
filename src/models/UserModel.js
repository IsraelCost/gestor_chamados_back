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
                async beforeCreate(user) {
                    const salt = await bcrypt.genSaltSync();
                    const hash = await bcrypt.hashSync(user.password, salt);
                    user.password = hash;
                },

                async beforeBulkUpdate(user) {
                    const salt = await bcrypt.genSaltSync();
                    const hash = await bcrypt.hashSync(user.attributes.password, salt);
                    user.attributes.password = hash;
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