import { LevelSchema } from './level'
export const PlayerSchema = new Schema(
    {
        identifier: { type: String, unique: true, index: true },
        level: LevelSchema,
        level_score: Number,
        level_progress: Number,
        total_score: Number,
        total_progress: Number,
        prestige_level: Number
    }
);

const Player = Mongoose.model("Player", PlayerSchema);

export default Player;