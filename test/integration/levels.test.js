var AuthHelper = require("../helpers/auth")
describe('Levels tests', function () {

    var level = {
        value: 5,
        maximumPoints: 100,
        status: "Dinosaur",
        description: "You are a very old TRex!",
        fromTotal: 0,
        toTotal: 100,
        icon: "/dinosaur.png"
    };

    function* createLevel(token) {
        var opts = {
            method: "POST",
            url: "/levels",
            payload: level,
            headers: {
                "Authorization": token
            }
        };

        var response = yield Server.inject(opts);
        return response
    }


    it('should create level', function*() {
        var user = (yield AuthHelper.createUser("etst", "test@ttest.com")).result;
        var response = yield createLevel(user.token);
        var levelResp = response.result;
        expect(levelResp.value).to.eq(level.value);
        expect(levelResp.maximumPoints).to.eq(level.maximumPoints);
        expect(levelResp.status).to.eq(level.status);
        expect(levelResp.toTotal).to.eq(level.toTotal);
        expect(levelResp.fromTotal).to.eq(level.fromTotal);
        expect(levelResp.icon).to.eq(level.icon);
        expect(levelResp.description).to.eq(level.description);
    });

    it('should return the list of available levels', function*() {
        var user = (yield AuthHelper.createUser("etst", "test@ttest.com")).result
        yield createLevel(user.token)
        var opts = {
            method: "GET",
            url: "/levels"
        };

        var response = yield Server.inject(opts);
        expect(response.statusCode).to.eq(200)
        expect(response.result.length).to.eq(1)
        expect(response.result[0].value).to.eq(level.value)
    });
});