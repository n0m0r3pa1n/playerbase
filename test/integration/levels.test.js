var AuthHelper = require("../helpers/auth")
describe('Levels tests', function() {

    var level = {
        value: 5,
        maximum_points: 100,
        status: "Dinosaur",
        description: "You are a very old TRex!",
        from_total: 0,
        to_total: 100,
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

        var response = yield Server.inject(opts)
        return response
    }


    it('should create level', function* (){
        var user = (yield AuthHelper.createUser("etst", "test@ttest.com")).result
        var response = yield createLevel(user.token);
        var levelResp = response.result;
        expect(levelResp.value).to.eq(level.value);
        expect(levelResp.maximum_points).to.eq(level.maximum_points);
        expect(levelResp.status).to.eq(level.status);
        expect(levelResp.to_total).to.eq(level.to_total);
        expect(levelResp.from_total).to.eq(level.from_total);
        expect(levelResp.icon).to.eq(level.icon);
        expect(levelResp.description).to.eq(level.description);
    });

    it('should return the list of available levels', function* (){
        var user = (yield AuthHelper.createUser("etst", "test@ttest.com")).result
        yield createLevel(user.token)
        var opts = {
            method: "GET",
            url: "/levels"
        };

        response = yield Server.inject(opts);
        expect(response.statusCode).to.eq(200)
        expect(response.result.length).to.eq(1)
        expect(response.result[0].value).to.eq(level.value)
    });
});