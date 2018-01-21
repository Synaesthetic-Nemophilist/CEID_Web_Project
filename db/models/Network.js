let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let NetworkSchema = Schema({
    Αλεξανδρούπολη: {
        Θεσσαλλονίκη: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Ηράκλειο: {
            cost: {type: Number, default: 15},
            time: {type: Number, default: 1}
        }
    },
    Θεσσαλλονίκη: {
        Αλεξανδρούπολη: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Ασπρόπυργος: {
            cost: {type: Number, default: 5},
            time: {type: Number, default: 1}
        },
        Λάρισα: {
            cost: {type: Number, default: 1},
            time: {type: Number, default: 1}
        },
        Ιωάννινα: {
            cost: {type: Number, default: 1},
            time: {type: Number, default: 1}
        }
    },
    Ιωάννινα: {
        Θεσσαλλονίκη: {
            cost: {type: Number, default: 1},
            time: {type: Number, default: 1}
        },
        Πάτρα: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        }
    },
    Λάρισα: {
        Θεσσαλλονίκη: {
            cost: {type: Number, default: 1},
            time: {type: Number, default: 1}
        },
        Ασπρόπυργος: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
    },
    Πάτρα: {
        Ιωάννινα: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Ασπρόπυργος: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
        Καλαμάτα: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
    },
    Καλαμάτα: {
        Πάτρα:  {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
        Ασπρόπυργος: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Ηράκλειο: {
            cost: {type: Number, default: 4},
            time: {type: Number, default: 2}
        },
    },
    Ασπρόπυργος: {
        Πάτρα: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
        Καλαμάτα: {
            cost: {type: Number, default: 3},
            time: {type: Number, default: 1}
        },
        Λάρισα: {
            cost: {type: Number, default: 2},
            time: {type: Number, default: 1}
        },
        Ηράκλειο: {
            cost: {type: Number, default: 10},
            time: {type: Number, default: 1}
        },
        Μυτιλήνη: {
            cost: {type: Number, default: 8},
            time: {type: Number, default: 1}
        },
        Θεσσαλλονίκη: {
            cost: {type: Number, default: 5},
            time: {type: Number, default: 1}
        },
    },
    Μυτιλήνη: {
        Ασπρόπυργος: {
            cost: {type: Number, default: 8},
            time: {type: Number, default: 1}
        },
    },
    Ηράκλειο: {
        Ασπρόπυργος: {
            cost: {type: Number, default: 10},
            time: {type: Number, default: 1}
        },
        Καλαμάτα: {
            cost: {type: Number, default: 4},
            time: {type: Number, default: 2}
        },
        Αλεξανδρούπολη: {
            cost: {type: Number, default: 15},
            time: {type: Number, default: 1}
        },
    }
});


module.exports = mongoose.model("Network", NetworkSchema);