Mongoose.plugin(function(schema) {

    schema.statics.findOneOrCreate = function findOneOrCreate(condition, doc) {
        var wrapper = co.wrap(function* (self, condition, doc) {
            var foundDoc = yield self.findOne(condition).exec();
            try {
                if (foundDoc) {
                    return foundDoc
                } else {
                    return yield self.create(doc)
                }
            } catch(e) {
                console.log(e)
            }
        })

        var self = this
        return wrapper(self, condition, doc)
    };
});

export const UserSchema = new Schema(
    {
        name: String,
        email: {type: String, index:true, unique: true}
    }
);

const User = Mongoose.model("User", UserSchema);

export default User;