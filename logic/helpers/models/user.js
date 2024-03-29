const mail = {
    system: [],
    reports: [],
    players: [],
    alliance: [],
    newMail: false
}

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
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        xp: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        pic: {
            type: DataTypes.STRING
        },
        dark_energy: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        daily: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        spins: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        /* tecs */
        energy_tec: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        computation: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        spionage: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        expedition: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        efficients_solar_panels: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        faster_builders: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        combustion_engine: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        hidrolium_engine: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        interestelar_engine: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        advanced_weapons: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        advanced_shields: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        advanced_blindage: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        tec_ionic: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        tec_laser: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        tec_plasma: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        tec_particles: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        production_falodium: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        production_cristagen: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        production_badario: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        production_hidrolium: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        tec_queue: {
            type: DataTypes.STRING,
            defaultValue: "[]"
        },
        next_tec_complete: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        /* end tecs */
        planets: {
            type: DataTypes.STRING,
            defaultValue: "[]"
        },
        alliance: {
            type: DataTypes.STRING,
            defaultValue: "na"
        },
        mail: {
            type: DataTypes.STRING,
            defaultValue: JSON.stringify(mail)
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
