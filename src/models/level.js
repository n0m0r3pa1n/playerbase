export const LevelSchema = new Schema(
    {
        value: { type: Number, required: true },
        fromTotal: { type: Number, required: true },
        toTotal: { type: Number, required: true },
        maximumPoints: { type: Number, required: true },
        status: String,
        description: String,
        icon: String
    }
);

const Level = Mongoose.model("Level", LevelSchema);

export default Level;