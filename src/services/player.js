import Player from '../models/player'
import { findLevelByValue } from  '../services/level'
export function getPlayers(page = 1, pageSize = 50, sort) {
    var query = Player.find({}).limit(pageSize).skip((page - 1) * pageSize)
    if(!_.isEmpty(sort)) {
        query.sort(sort)
    }

    return query;
}

export function getPlayer(id) {
    return Player.find({ identifier: id });
}

export function* createPlayer(identifier, levelValue, levelScore, levelProgress, totalScore, totalProgress, prestigeLevel) {
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