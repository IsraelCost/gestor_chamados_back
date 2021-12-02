const { Model, DataTypes } = require('sequelize');

const aws = require('aws-sdk');

const s3 = new aws.S3();

class Image extends Model {
    static init(sequelize) {
        super.init({
            user_id: DataTypes.NUMBER,
            name: DataTypes.STRING,
            size: DataTypes.DOUBLE,
            key: DataTypes.STRING,
            url: DataTypes.STRING
        }, {
            sequelize, 
            tableName: 'images',
            hooks: {
                async beforeUpdate(image) {
                  try {
                    if (process.env.STORAGE_TYPE === 's3') {
                      await s3.deleteObject({
                        Bucket: process.env.BUCKET_NAME,
                        Key: image.key,
                      });
                    }
                  } catch (error) {
                    console.error(error);
                  }
                },

                async beforeDestroy(image) {
                  try {
                    if (process.env.STORAGE_TYPE === 's3') {
                      await s3.deleteObject({
                        Bucket: process.env.BUCKET_NAME,
                        Key: image.key,
                      });
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }
            }
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'id', as: 'user' });
    }
}

module.exports = Image;