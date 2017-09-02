let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let NetworkSchema = Schema({
    Alexandroupoli: {
        Thessaloniki: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Athina: {
            cost: {type: Number, default: 10},
            time: {type: Number, default: 1}
        },
        Irakleio: {
            cost: {type: Number, default: 15},
            time: {type: Number, default: 1}
        },
    },
    Thessaloniki: {
        Alexandroupoli: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Athina: {
            cost: {type: Number, default: 5},
            time: {type: Number, default: 1}
        },
        Larisa: {
            cost: {type: Number, default: 1},
            time: {type: Number, default: 1}
        },
        Ioannina: {
            cost: {type: Number, default: 1},
            time: {type: Number, default: 1}
        }
    },
    Ioannina: {
        Thessaloniki: {
            cost: {type: Number, default: 1},
            time: {type: Number, default: 1}
        },
        Patra: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        }
    },
    Larisa: {
        Thessaloniki: {
            cost: {type: Number, default: 1},
            time: {type: Number, default: 1}
        },
        Athina: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
    },
    Patra: {
        Ioannina: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Athina: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
        Kalamata: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
    },
    Kalamata: {
        Patra:  {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
        Athina: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Irakleio: {
            cost: {type: Number, default: 4},
            time: {type: Number, default: 2}
        },
    },
    Athina: {
        Patra: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
        Kalamata: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Larisa: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
        Irakleio: {
            cost: {type: Number, default: 10},
            time: {type: Number, default: 1}
        },
        Mitilini: {
            cost: {type: Number, default: 8},
            time: {type: Number, default: 1}
        },
        Thessaloniki: {
            cost: {type: Number, default: 5},
            time: {type: Number, default: 1}
        },
        Alexandroupoli: {
            cost: {type: Number, default: 10},
            time: {type: Number, default: 1}
        },
    },
    Mitilini: {
        Athina: {
            cost: {type: Number, default: 8},
            time: {type: Number, default: 1}
        },
    },
    Irakleio: {
        Athina: {
            cost: {type: Number, default: 10},
            time: {type: Number, default: 1}
        },
        Kalamata: {
            cost: {type: Number, default: 4},
            time: {type: Number, default: 2}
        },
        Alexandroupoli: {
            cost: {type: Number, default: 15},
            time: {type: Number, default: 1}
        },
    }
});


module.exports = mongoose.model("Network", NetworkSchema);