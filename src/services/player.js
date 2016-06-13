import Player from '../models/player'
import { findLevelByValue } from  '../services/level'

export function getPlayers(page = 1, pageSize = 50, sort) {
    var query = Player.find({}).limit(pageSize).skip((page - 1) * pageSize)
    if(!_.isEmpty(sort)) {
        query.sort(sort)
    }

    return Promise.props({
        totalCount: Player.count({}),
        items: query
    }).then(function ({ totalCount, items }) {
        return {
            items,
            page,
            pageSize,
            totalCount,
            pageCount: getTotalPages(totalCount, pageSize)
        }
    });
}

function getTotalPages(totalRecordsCount, pageSize) {
    if(pageSize == 0 || totalRecordsCount == 0) {
        return 0;
    }

    return Math.ceil(totalRecordsCount / pageSize)
}

export function getPlayer(id) {
    return Player.findOne({ identifier: id });
}

export function* increasePoints(id, points) {
    // TODO: Magic should happen here
    let player = yield getPlayer(id);
    if(player == null) {
        throw new Error("Player does not exist!");
    }

    return player;
}

export function* decreasePoints(id, points) {
    // TODO: Magic should happen here
    let player = yield getPlayer(id);
    if(player == null) {
        throw new Error("Player does not exist!");
    }

    return player;
}

export function* createPlayer(identifier, levelValue, levelScore, levelProgress, totalScore, totalProgress, prestigeLevel) {
    //TODO: Validate level points and player score are correct
    const level = yield findLevelByValue(levelValue);
    if(level == null) {
        throw new ValidationError("Level is missing");
    }


    return yield Player.create({
        identifier,
        level,
        levelScore,
        levelProgress,
        totalScore,
        totalProgress,
        prestigeLevel
    })
}