require('../setup/cleardb')
var AuthHelper = require("../helpers/auth")
describe('Points tests', function () {
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
        totalProgress: 123
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
            totalProgress: 49
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
        expect(result.levelScore).to.eq(8);
        expect(result.levelProgress).to.eq(8);
        expect(result.level.fromTotal).to.eq(level2.fromTotal);
        expect(result.level.toTotal).to.eq(level2.toTotal);
        expect(result.level.status).to.eq(level2.status);
        expect(result.level.description).to.eq(level2.description);
        expect(result.level.icon).to.eq(level2.icon);
    });

    it('should increase player points to several levels up', function* () {
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


        const level3 = {
            value: 3,
            fromTotal: 201,
            toTotal: 300,
            maximumPoints: 100,
            status: "Great",
            description: "You are great!",
            icon: "/great.png"
        };
        yield createLevel(user.token, level3);

        const player = {
            identifier: "player1",
            levelValue: 1,
            levelScore: 99,
            levelProgress: 99,
            totalScore: 99,
            totalProgress: 49
        };
        yield createPlayer(user.token, player);

        var opts = {
            method: "POST",
            url: "/players/" + player.identifier + "/points/actions/increase",
            payload: {
                points: 110
            },
            headers: {
                "Authorization": user.token
            }
        };
        var response = yield Server.inject(opts);
        var result = response.result;
        expect(result.totalScore).to.eq(player.totalScore + 110);
        const totalProgress = (player.totalScore + 110) * 100 / (level2.maximumPoints * 3);
        expect(result.totalProgress).to.eq(Math.round(totalProgress * 100) / 100);

        expect(result.level.value).to.eq(3);
        expect(result.levelScore).to.eq(8);
        expect(result.levelProgress).to.eq(8);
        expect(result.level.fromTotal).to.eq(level3.fromTotal);
        expect(result.level.toTotal).to.eq(level3.toTotal);
        expect(result.level.status).to.eq(level3.status);
        expect(result.level.description).to.eq(level3.description);
        expect(result.level.icon).to.eq(level3.icon);
    });

    function round(value, places) {
        var multiplier = Math.pow(10, places);

        return (Math.round(value * multiplier) / multiplier);
    }

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
            totalProgress: 39
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
            totalProgress: 99
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


    it('should set player points to max when total score increased with too many points', function* () {
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


        const level3 = {
            value: 3,
            fromTotal: 201,
            toTotal: 300,
            maximumPoints: 100,
            status: "Great",
            description: "You are great!",
            icon: "/great.png"
        };
        yield createLevel(user.token, level3);

        const player = {
            identifier: "player1",
            levelValue: 1,
            levelScore: 99,
            levelProgress: 99,
            totalScore: 99,
            totalProgress: 99
        };
        yield createPlayer(user.token, player);

        var opts = {
            method: "POST",
            url: "/players/" + player.identifier + "/points/actions/increase",
            payload: {
                points: 1000
            },
            headers: {
                "Authorization": user.token
            }
        };
        var response = yield Server.inject(opts);
        var result = response.result;
        expect(result.totalScore).to.eq(300);
        expect(result.totalProgress).to.eq(100);
        expect(result.level.value).to.eq(3);
        expect(result.levelScore).to.eq(100);
        expect(result.levelProgress).to.eq(100);
    });
});