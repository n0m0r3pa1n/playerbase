"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Mongoose.plugin(function (schema) {

    schema.statics.findOneOrCreate = function findOneOrCreate(condition, doc) {
        var wrapper = co.wrap(function* (self, condition, doc) {
            var foundDoc = yield self.findOne(condition).exec();
            try {
                if (foundDoc) {
                    return foundDoc;
                } else {
                    return yield self.create(doc);
                }
            } catch (e) {
                console.log(e);
            }
        });

        var self = this;
        return wrapper(self, condition, doc);
    };
});

var UserSchema = exports.UserSchema = new Schema({
    name: String,
    email: { type: String, index: true, unique: true }
});

var User = Mongoose.model("User", UserSchema);

exports.default = User;