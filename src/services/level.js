import Level from '../models/level'

export function createLevel(value, maximumPoints, status, description, fromTotal, toTotal, icon) {
    return Level.create({
        value, 
        maximumPoints,
        status, 
        description, 
        fromTotal,
        toTotal,
        icon
    })
}

export function getLevels() {
    return Level.find({});
}

export function getTotalScore() {
    return Level.aggregate([{$group: { _id: null, totalScore: { $sum: "$maximumPoints" } }}]).exec()
}

export function findLevelByValue(value) {
    return Level.findOne({ value })
}