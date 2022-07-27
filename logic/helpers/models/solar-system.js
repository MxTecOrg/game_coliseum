const SolarSystemModel = (DataTypes) => {
    return {
        solar_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            unique: false
        },
        x: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        y: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        planets: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sunType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sunSize: {
            type: DataTypes.INTEGER,
            defaultValue: 50
        },
        sunColor: {
            type: DataTypes.STRING,
            defaultValue: "#000"
        },
        sunTemp: {
            type: DataTypes.INTEGER,
            defaultValue: 5000
        }
    }
}

module.exports = SolarSystemModel;
