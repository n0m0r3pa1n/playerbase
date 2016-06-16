var AuthHelper = require("../helpers/auth")
describe('End to end test', function () {
    function* createLevel(token, data) {
        var opts = {
            method: "POST",
            url: "/levels",
            payload: data,
            headers: {
                "Authorization": token
            }
        };

        return yield Server.inject(opts)
    }

    function* createPlayer(token, data) {
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

    it('should create a player ranking correctly', function*() {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result;
        const level1 = {
            value: 1,
            fromTotal: 0,
            toTotal: 100,
            maximumPoints: 100,
            status: "Baby",
            description: "You are a newborn!",
            icon: "/baby.png"
        };

        const level2 = {
            value: 2,
            fromTotal: 101,
            toTotal: 200,
            maximumPoints: 100,
            status: "Growing",
            description: "You are growing!",
            icon: "/growing.png"
        };

        const level3 = {
            value: 3,
            fromTotal: 201,
            toTotal: 300,
            maximumPoints: 100,
            status: "Dinosaur",
            description: "You are a very old TRex!",
            icon: "/dinosaur.png"
        };

        const token = user.token;
        yield createLevel(token, level1);
        yield createLevel(token, level2);
        yield createLevel(token, level3);

        const player1 = {
            identifier: "player1",
            levelValue: 1,
            levelScore: 55,
            levelProgress: 0,
            totalScore: 55,
            totalProgress: 0
        };

        const player2 = {
            identifier: "player2",
            levelValue: 2,
            levelScore: 1,
            levelProgress: 0,
            totalScore: 101,
            totalProgress: 0
        };

        const player3 = {
            identifier: "player3",
            levelValue: 3,
            levelScore: 1,
            levelProgress: 0,
            totalScore: 201,
            totalProgress: 0
        };

        yield createPlayer(token, player1);
        yield createPlayer(token, player2);
        yield createPlayer(token, player3);

        var opts = {
            method: "GET",
            url: "/players?page=1&pageSize=10&sortBy=level.value&sortDirection=desc"
        };
        var response = yield Server.inject(opts);
        expect(response.result.items.length).to.eq(3);
        expect(response.result.items[0].identifier).to.eq(player3.identifier);

        var increasePointsOpts = {
            method: "POST",
            url: "/players/" + player2.identifier + "/points/actions/increase",
            payload: {
                points: 101
            },
            headers: {
                "Authorization": user.token
            }
        };
        yield Server.inject(increasePointsOpts);
        var response = yield Server.inject(opts);
        expect(response.result.items.length).to.eq(3);

        expect(response.result.items[0].identifier).to.eq(player2.identifier);
        expect(response.result.items[0].level.value).to.eq(level3.value);
        expect(response.result.items[1].identifier).to.eq(player3.identifier);
        expect(response.result.items[1].level.value).to.eq(level3.value);


        var decreasePointsOpts = {
            method: "POST",
            url: "/players/" + player3.identifier + "/points/actions/decrease",
            payload: {
                points: 201
            },
            headers: {
                "Authorization": user.token
            }
        };
        yield Server.inject(decreasePointsOpts);
        var response = yield Server.inject(opts);
        expect(response.result.items.length).to.eq(3);

        expect(response.result.items[0].identifier).to.eq(player2.identifier);
        expect(response.result.items[0].level.value).to.eq(level3.value);
        expect(response.result.items[1].identifier).to.eq(player1.identifier);
        expect(response.result.items[1].level.value).to.eq(level1.value);
        expect(response.result.items[2].identifier).to.eq(player3.identifier);
        expect(response.result.items[2].level.value).to.eq(level1.value);
    });
});