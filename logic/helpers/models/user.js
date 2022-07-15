const stats = {
    win: 0,
    lose: 0,
    draw: 0
};
const UserModel = (DataTypes) => {
    return {
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
        },
        stats: {
            type: DataTypes.STRING,
            defaultValue: JSON.stringify(stats)
        },
        pic: {
            type: DataTypes.STRING
        },
        coins: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        avatar : {
            type: DataTypes.STRING,
            defaultValue: "{}"
        },
        daily: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        isOnline: {
            type: DataTypes.BOOLEAN,
            defaultStatus: false
        },
        lastTimeOnline: {
            type: DataTypes.INTEGER,
            defaultValue: new Date().getTime()
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        vip: {
            type: DataTypes.STRING,
            defaultValue: "basic"
        },
        acclevel: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }
}

module.exports = UserModel;
