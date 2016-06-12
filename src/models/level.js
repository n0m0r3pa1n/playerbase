export const LevelSchema = new Schema(
    {
        value: { type: Number, required: true , unique: true},
        maximumPoints: { type: Number, required: true },
        status: String,
        description: String,
        fromTotal: { type: Number, required: true },
        toTotal: { type: Number, required: true },
        icon: String
    }
);

const Level = Mongoose.model("Level", LevelSchema);

export default Level;