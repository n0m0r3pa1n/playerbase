describe('Users tests', function() {
    var user = {
        name: "Georgi Mirchev",
        email: "gmirchev90@gmail.com"
    };

    it('should create user with valid params', function* () {
        var response = yield Server.inject({method: "POST", url: "/users", payload: user});
        expect(response.result.token).to.exist
        expect(response.result.email).to.eq(user.email);
    });

    it("should not access user details with missing token", function* () {
        var response = yield Server.inject({method: "POST", url: "/users", payload: user});
        response = yield Server.inject({method: "GET", url: "/users/" + response.result._id});
        expect(response.result.statusCode).to.eq(401)
    });

    it("should access user details with valid token", function* () {
        var response = yield Server.inject({method: "POST", url: "/users", payload: user});
        var opts = {
            method: "GET",
            url: "/users/" + response.result._id,
            headers: {
                "Authorization": response.result.token
            }
        };

        response = yield Server.inject(opts);
        expect(response.statusCode).to.eq(200)
        expect(response.result.name).to.eq(user.name)
        expect(response.result.email).to.eq(user.email)
        expect(response.result.loginType).to.eq(user.loginType)
    });

    it("should not create user with missing email", function* () {
        var user = {
            name: "Georgi Mirchev",
            email: "",
        };

        var response = yield Server.inject({ method: "POST", url: "/users", payload: user })
        expect(response.statusCode).to.eq(400)
    });

    it("should not create user twice with the same email", function* () {
        var user = {
            name: "Georgi Mirchev",
            email: "gmirchev90@gmail.com"
        };

        var response = yield Server.inject({ method: "POST", url: "/users", payload: user })
        expect(response.statusCode).to.eq(200)

        var response2 = yield Server.inject({ method: "POST", url: "/users", payload: user })
        expect(response2.statusCode).to.eq(200)

        expect(response2.result._id).to.eql(response.result._id)
    })
});
