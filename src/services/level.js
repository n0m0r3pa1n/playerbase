import Level from '../models/level'

export function createLevel(value, maximum_points, status, description, from_total, to_total, icon) {
    return Level.create({
        value, 
        maximum_points, 
        status, 
        description, 
        from_total, 
        to_total, 
        icon
    })
}

export function getLevels() {
    return Level.find({});
}