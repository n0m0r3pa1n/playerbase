'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPlayers = getPlayers;
exports.getPlayer = getPlayer;
exports.increasePoints = increasePoints;
exports.decreasePoints = decreasePoints;
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

    return Promise.props({
        totalCount: _player2.default.count({}),
        items: query
    }).then(function (_ref) {
        var totalCount = _ref.totalCount;
        var items = _ref.items;

        return {
            items,
            page,
            pageSize,
            totalCount,
            pageCount: getTotalPages(totalCount, pageSize)
        };
    });
}

function getTotalPages(totalRecordsCount, pageSize) {
    if (pageSize == 0 || totalRecordsCount == 0) {
        return 0;
    }

    return Math.ceil(totalRecordsCount / pageSize);
}

function getPlayer(id) {
    return _player2.default.findOne({ identifier: id });
}

function* increasePoints(id, points) {
    // TODO: Magic should happen here
    var player = yield getPlayer(id);
    if (player == null) {
        throw new Error("Player does not exist!");
    }

    return player;
}

function* decreasePoints(id, points) {
    // TODO: Magic should happen here
    var player = yield getPlayer(id);
    if (player == null) {
        throw new Error("Player does not exist!");
    }

    return player;
}

function* createPlayer(identifier, levelValue, levelScore, levelProgress, totalScore, totalProgress, prestigeLevel) {
    //TODO: Validate level points and player score are correct
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