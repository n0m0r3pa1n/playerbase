require('../setup/cleardb')
var AuthHelper = require("../helpers/auth")
describe('Points decrease tests', function () {
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
        levelValue: 1,
        levelScore: 99,
        levelProgress: 99,
        totalScore: 99,
        totalProgress: 99
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

    it('should decrease player points to the level below current', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        const level1 = {
            value: 1,
            fromTotal: 1,
            toTotal: 100,
            maximumPoints: 100,
            status: "Baby",
            description: "You are a newbie!",
            icon: "/baby.png"
        };
        yield createLevel(user.token, level1);

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
            levelValue: 2,
            levelScore: 51,
            levelProgress: 51,
            totalScore: 151,
            totalProgress: 75.5
        };
        yield createPlayer(user.token, player);

        var opts = {
            method: "POST",
            url: "/players/" + player.identifier + "/points/actions/decrease",
            payload: {
                points: 51
            },
            headers: {
                "Authorization": user.token
            }
        };
        var response = yield Server.inject(opts);
        var result = response.result;
        expect(result.totalScore).to.eq(player.totalScore - 51);
        expect(result.totalProgress).to.eq((player.totalScore - 51) * 100 / 200);

        expect(result.level.value).to.eq(1);
        expect(result.levelScore).to.eq(99);
        expect(result.levelProgress).to.eq(99);
        expect(result.level.fromTotal).to.eq(level1.fromTotal);
        expect(result.level.toTotal).to.eq(level1.toTotal);
        expect(result.level.status).to.eq(level1.status);
        expect(result.level.description).to.eq(level1.description);
        expect(result.level.icon).to.eq(level1.icon);
    });

    it('should decrease player points to the first level', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        const level1 = {
            value: 1,
            fromTotal: 1,
            toTotal: 100,
            maximumPoints: 100,
            status: "Baby",
            description: "You are a newbie!",
            icon: "/baby.png"
        };
        yield createLevel(user.token, level1);

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

        const level3 = {
            value: 3,
            fromTotal: 201,
            toTotal: 300,
            maximumPoints: 100,
            status: "Best",
            description: "You are the best!",
            icon: "/best.png"
        };
        yield createLevel(user.token, level3);

        const player = {
            identifier: "player1",
            levelValue: 3,
            levelScore: 51,
            levelProgress: 51,
            totalScore: 251,
            totalProgress: 75.5
        };
        yield createPlayer(user.token, player);

        var opts = {
            method: "POST",
            url: "/players/" + player.identifier + "/points/actions/decrease",
            payload: {
                points: 1000
            },
            headers: {
                "Authorization": user.token
            }
        };
        var response = yield Server.inject(opts);
        var result = response.result;
        expect(result.totalScore).to.eq(1);
        expect(result.totalProgress).to.eq(0.33);

        expect(result.level.value).to.eq(1);
        expect(result.levelScore).to.eq(1);
        expect(result.levelProgress).to.eq(1);
        expect(result.level.fromTotal).to.eq(level1.fromTotal);
        expect(result.level.toTotal).to.eq(level1.toTotal);
        expect(result.level.status).to.eq(level1.status);
        expect(result.level.description).to.eq(level1.description);
        expect(result.level.icon).to.eq(level1.icon);
    });


    it('should decrease player points for the same level', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result
        const level1 = {
            value: 1,
            fromTotal: 1,
            toTotal: 111,
            maximumPoints: 100,
            status: "Baby",
            description: "You are a newbie!",
            icon: "/baby.png"
        };
        yield createLevel(user.token, level1);

        const level2 = {
            value: 2,
            fromTotal: 112,
            toTotal: 200,
            maximumPoints: 100,
            status: "Rising",
            description: "You are rising!",
            icon: "/rising.png"
        };
        yield createLevel(user.token, level2);

        const player = {
            identifier: "player1",
            levelValue: 2,
            levelScore: 51,
            levelProgress: 51,
            totalScore: 151,
            totalProgress: 75.5
        };
        yield createPlayer(user.token, player);

        var opts = {
            method: "POST",
            url: "/players/" + player.identifier + "/points/actions/decrease",
            payload: {
                points: 10
            },
            headers: {
                "Authorization": user.token
            }
        };
        var response = yield Server.inject(opts);
        var result = response.result;
        expect(result.totalScore).to.eq(141);
        expect(result.totalProgress).to.eq(70.5);

        expect(result.level.value).to.eq(2);
        expect(result.levelScore).to.eq(player.totalScore - 10 - level2.fromTotal);
        expect(result.levelProgress).to.eq(player.totalScore - 10 - level2.fromTotal);
        expect(result.level.fromTotal).to.eq(level2.fromTotal);
        expect(result.level.toTotal).to.eq(level2.toTotal);
        expect(result.level.status).to.eq(level2.status);
        expect(result.level.description).to.eq(level2.description);
        expect(result.level.icon).to.eq(level2.icon);
    });
});