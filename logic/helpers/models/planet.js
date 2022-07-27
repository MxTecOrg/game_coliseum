const PlanetModel = (DataTypes) => {
    return {
        planet_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        solar_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        habitated: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
        size: {
            type: DataTypes.INTEGER,
            defaultValue: 50
        },
        slots: {
            type: DataTypes.INTEGER,
            defaultValue: 200
        },
        temp: {
            type: DataTypes.INTEGER,
            defaultValue: 30
        },
        color: {
            type: DataTypes.STRING
        },
        falodium: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        cristagen: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        badario: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        hidrolium: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        energy: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        falodium_mine: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        falodium_storage: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        cristagen_mine: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        cristagen_storage: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        badario_mine: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        badario_storage: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        hidrolium_mine: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        hidrolium_storage: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        solar_panels: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        build_factory: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        nanobot_factory: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        hangar: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        lab: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        defense_center: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        fleet_coordinator_center: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        build_queue: {
            type: DataTypes.STRING,
            defaultValue: "[]"
        },
        next_build_complete: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        fleet_queue: {
            type: DataTypes.STRING,
            defaultValue: "[]"
        },
        next_fleet_complete: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        defense_queue: {
            type: DataTypes.STRING,
            defaultValue: "[]"
        },
        next_defense_complete: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        fleet: {
            type: DataTypes.STRING,
            defaultValue: "[]"
        },
        defenses: {
            type: DataTypes.STRING,
            defaultValue: "[]"
        },
        fleet_move: {
            type: DataTypes.STRING,
            defaultValue: "[]"
        }
    }
}

module.exports = PlanetModel;
