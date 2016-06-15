import { LevelSchema } from './level'
export const PlayerSchema = new Schema(
    {
        identifier: { type: String, unique: true, index: true },
        level: LevelSchema,
        levelScore: Number,
        levelProgress: Number,
        totalScore: Number,
        totalProgress: Number
    }
);

const Player = Mongoose.model("Player", PlayerSchema);

export default Player;