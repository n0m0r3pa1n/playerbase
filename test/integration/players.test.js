var AuthHelper = require("../helpers/auth")
describe('Players tests', function () {
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

    var player = {
        identifier: "player1",
        levelValue: 5,
        levelScore: 99,
        levelProgress: 22,
        totalScore: 213,
        totalProgress: 123,
        prestigeLevel: 123
    };

    // it('should create player', function*() {
    //     var user = (yield AuthHelper.createUser("test", "test@test.com")).result
    //     var level = (yield createLevel(user.token)).result
    //
    //     var opts = {
    //         method: "POST",
    //         url: "/players",
    //         payload: player,
    //         headers: {
    //             "Authorization": user.token
    //         }
    //     };
    //
    //     var response = yield Server.inject(opts);
    //     var playerResp = response.result;
    //     expect(playerResp.identifier).to.eq(player.identifier);
    //     expect(playerResp.levelScore).to.eq(player.levelScore);
    //     expect(playerResp.levelProgress).to.eq(player.levelProgress);
    //     expect(playerResp.totalScore).to.eq(player.totalScore);
    //     expect(playerResp.totalProgress).to.eq(player.totalProgress);
    //     expect(playerResp.prestigeLevel).to.eq(player.prestigeLevel);
    //     expect(playerResp.level.value).to.eq(level.value);
    // });
    //
    // it('should get a list of players', function* () {
    //     var user = (yield AuthHelper.createUser("test", "test@test.com")).result
    //     var level = (yield createLevel(user.token)).result
    //
    //     var opts = {
    //         method: "POST",
    //         url: "/players",
    //         payload: player,
    //         headers: {
    //             "Authorization": user.token
    //         }
    //     };
    //
    //     yield Server.inject(opts);
    //
    //     player.identifier = "player2";
    //     yield Server.inject(opts);
    //
    //     player.identifier = "player3";
    //     yield Server.inject(opts);
    //
    //     var opts = {
    //         method: "GET",
    //         url: "/players?page=2&pageSize=1"
    //     };
    //     response = yield Server.inject(opts);
    //     var result = response.result;
    //     expect(result.items.length).to.eq(1);
    //     expect(result.pageCount).to.eq(3);
    //     expect(result.totalCount).to.eq(3);
    //     expect(result.page).to.eq(2);
    //     expect(result.pageSize).to.eq(1);
    // });
    //
    // it('should get a list of players', function* () {
    //     var user = (yield AuthHelper.createUser("test", "test@test.com")).result
    //     var level = (yield createLevel(user.token)).result
    //
    //     var opts = {
    //         method: "POST",
    //         url: "/players",
    //         payload: player,
    //         headers: {
    //             "Authorization": user.token
    //         }
    //     };
    //
    //     yield Server.inject(opts);
    //
    //     player.identifier = "player2";
    //     yield Server.inject(opts);
    //
    //     player.identifier = "player3";
    //     yield Server.inject(opts);
    //
    //     var opts = {
    //         method: "GET",
    //         url: "/players?page=2&pageSize=1"
    //     };
    //     response = yield Server.inject(opts);
    //     var result = response.result;
    //     expect(result.items.length).to.eq(1);
    //     expect(result.pageCount).to.eq(3);
    //     expect(result.totalCount).to.eq(3);
    //     expect(result.page).to.eq(2);
    //     expect(result.pageSize).to.eq(1);
    // });

    it('should increase player points', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        var level = (yield createLevel(user.token)).result

        var opts = {
            method: "POST",
            url: "/players",
            payload: player,
            headers: {
                "Authorization": user.token
            }
        };

        var response = yield Server.inject(opts);

        var opts = {
            method: "POST",
            url: "/players/" + player.identifier + "123/points/actions/increase",
            payload: {
                points: 10
            },
            headers: {
                "Authorization": user.token
            }
        };
        response = yield Server.inject(opts);
        var result = response.result;
        console.log(result);

    })

});