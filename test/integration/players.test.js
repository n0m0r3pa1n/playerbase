var AuthHelper = require("../helpers/auth")
describe('Players tests', function () {
    var level = {
        value: 5,
        fromTotal: 0,
        toTotal: 0,
        maximumPoints: 100,
        status: "Dinosaur",
        description: "You are a very old TRex!",
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

    var player = {
        identifier: "player1",
        levelValue: 5,
        levelScore: 99,
        levelProgress: 22,
        totalScore: 213,
        totalProgress: 123,
        prestigeLevel: 123
    };

    function* createPlayer(token) {
        var opts = {
            method: "POST",
            url: "/players",
            payload: player,
            headers: {
                "Authorization": token
            }
        };

        return yield Server.inject(opts);
    }

    it('should create player', function*() {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        var level = (yield createLevel(user.token)).result


        var playerResp = (yield createPlayer(user.token)).result;
        expect(playerResp.identifier).to.eq(player.identifier);
        expect(playerResp.levelScore).to.eq(player.levelScore);
        expect(playerResp.levelProgress).to.eq(player.levelProgress);
        expect(playerResp.totalScore).to.eq(player.totalScore);
        expect(playerResp.totalProgress).to.eq(player.totalProgress);
        expect(playerResp.prestigeLevel).to.eq(player.prestigeLevel);
        expect(playerResp.level.value).to.eq(level.value);
    });

    it('should get a list of players', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        var level = (yield createLevel(user.token)).result
        yield createPlayer(user.token)

        player.identifier = "player2";
        yield createPlayer(user.token)

        player.identifier = "player3";
        yield createPlayer(user.token)

        var opts = {
            method: "GET",
            url: "/players?page=2&pageSize=1"
        };
        response = yield Server.inject(opts);
        var result = response.result;
        expect(result.items.length).to.eq(1);
        expect(result.pageCount).to.eq(3);
        expect(result.totalCount).to.eq(3);
        expect(result.page).to.eq(2);
        expect(result.pageSize).to.eq(1);
    });

    it('should get a list of players', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        var level = (yield createLevel(user.token)).result
        player.identifier = "player1";
        yield createPlayer(user.token)

        player.identifier = "player2";
        yield createPlayer(user.token)

        player.identifier = "player3";
        yield createPlayer(user.token)

        var opts = {
            method: "GET",
            url: "/players?page=2&pageSize=1"
        };
        response = yield Server.inject(opts);
        var result = response.result;
        expect(result.items.length).to.eq(1);
        expect(result.pageCount).to.eq(3);
        expect(result.totalCount).to.eq(3);
        expect(result.page).to.eq(2);
        expect(result.pageSize).to.eq(1);
    });

    it('should increase player points to next level', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        yield createLevel(user.token)

        level.value = 6;
        level.maximumPoints = 200;
        level.fromTotal = 101;
        level.toTotal = 201;
        yield createLevel(user.token);
        yield createPlayer(user.token);

        var opts = {
            method: "POST",
            url: "/players/" + player.identifier + "/points/actions/increase",
            payload: {
                points: 10
            },
            headers: {
                "Authorization": user.token
            }
        };
        var response = yield Server.inject(opts);
        var result = response.result;
        expect(result.totalScore).to.eq(player.totalScore + 10)
        expect(result.level.value).to.eq(6)
    })

    // TODO: Add tests to prove it is working correctly

});