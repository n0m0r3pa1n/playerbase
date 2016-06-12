var user = {
    name: "Georgi Mirchev",
    email: "gmirchev90@gmail.com"
};

module.exports = {
    user: user,
    createUser: function* (name, email) {
        var response = yield Server.inject({method: "POST", url: "/users", payload: user});
        return response;
    }
};
