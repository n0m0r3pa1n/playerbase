require('../setup/cleardb')
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

    function* createLevel(token, data = level) {
        var opts = {
            method: "POST",
            url: "/levels",
            payload: data,
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

    function* createPlayer(token, data = player) {
        var opts = {
            method: "POST",
            url: "/players",
            payload: data,
            headers: {
                "Authorization": token
            }
        };

        return yield Server.inject(opts);
    }

    it('should increase player points to next level', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        yield createLevel(user.token, {
            value: 1,
            fromTotal: 1,
            toTotal: 100,
            maximumPoints: 100,
            status: "Baby",
            description: "You are a newbie!",
            icon: "/baby.png"
        });

        const level2 = {
            value: 2,
            fromTotal: 101,
            toTotal: 200,
            maximumPoints: 100,
            status: "Rising",
            description: "You are rising!",
            icon: "/rising.png"
        };
        yield createLevel(user.token, level2);

        const player = {
            identifier: "player1",
            levelValue: 1,
            levelScore: 99,
            levelProgress: 99,
            totalScore: 99,
            totalProgress: 49,
            prestigeLevel: 0
        };
        yield createPlayer(user.token, player);

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
        expect(result.totalScore).to.eq(player.totalScore + 10);
        expect(result.totalProgress).to.eq((player.totalScore + 10) * 100 / 200);

        expect(result.level.value).to.eq(2);
        expect(result.levelScore).to.eq(9);
        expect(result.levelProgress).to.eq(9);
        expect(result.level.fromTotal).to.eq(level2.fromTotal);
        expect(result.level.toTotal).to.eq(level2.toTotal);
        expect(result.level.status).to.eq(level2.status);
        expect(result.level.description).to.eq(level2.description);
        expect(result.level.icon).to.eq(level2.icon);
    });

    it('should increase player points for the same level', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        yield createLevel(user.token, {
            value: 1,
            fromTotal: 1,
            toTotal: 100,
            maximumPoints: 100,
            status: "Baby",
            description: "You are a newbie!",
            icon: "/baby.png"
        });

        const player = {
            identifier: "player1",
            levelValue: 1,
            levelScore: 39,
            levelProgress: 39,
            totalScore: 39,
            totalProgress: 39,
            prestigeLevel: 0
        };
        yield createPlayer(user.token, player);

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
        expect(result.totalScore).to.eq(player.totalScore + 10);
        expect(result.totalProgress).to.eq(player.totalProgress + 10);
        expect(result.levelScore).to.eq(player.totalProgress + 10);
        expect(result.levelProgress).to.eq(player.totalProgress + 10);
    });

    it('should set player points to max when last level is reached', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        yield createLevel(user.token, {
            value: 1,
            fromTotal: 1,
            toTotal: 100,
            maximumPoints: 100,
            status: "Baby",
            description: "You are a newbie!",
            icon: "/baby.png"
        });

        const player = {
            identifier: "player1",
            levelValue: 1,
            levelScore: 99,
            levelProgress: 99,
            totalScore: 99,
            totalProgress: 99,
            prestigeLevel: 0
        };
        yield createPlayer(user.token, player);

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
        expect(result.totalScore).to.eq(100);
        expect(result.totalProgress).to.eq(100);
        expect(result.level.value).to.eq(1);
        expect(result.levelScore).to.eq(100);
        expect(result.levelProgress).to.eq(100);
    });
});