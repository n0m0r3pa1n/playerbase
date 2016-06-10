export const LevelSchema = new Schema(
    {
        value: { type: Number, required: true },
        maximum_points: { type: Number, required: true },
        status: String,
        description: String,
        from_total: { type: Number, required: true },
        to_total: { type: Number, required: true },
        icon: String
    }
);

const Level = Mongoose.model("Level", LevelSchema);

export default Level;