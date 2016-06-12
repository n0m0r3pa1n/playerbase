'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPlayers = getPlayers;
exports.getPlayer = getPlayer;
exports.createPlayer = createPlayer;

var _player = require('../models/player');

var _player2 = _interopRequireDefault(_player);

var _level = require('../services/level');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPlayers() {
    var page = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    var pageSize = arguments.length <= 1 || arguments[1] === undefined ? 50 : arguments[1];
    var sort = arguments[2];

    var query = _player2.default.find({}).limit(pageSize).skip((page - 1) * pageSize);
    if (!_.isEmpty(sort)) {
        query.sort(sort);
    }

    return query;
}

function getPlayer(id) {
    return _player2.default.find({ identifier: id });
}

function* createPlayer(identifier, levelValue, levelScore, levelProgress, totalScore, totalProgress, prestigeLevel) {
    var level = yield (0, _level.findLevelByValue)(levelValue);
    if (level == null) {
        throw new ValidationError("Level is missing");
    }

    return yield _player2.default.create({
        identifier,
        level,
        levelScore,
        levelProgress,
        totalScore,
        totalProgress,
        prestigeLevel
    });
}