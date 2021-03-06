var AuthHelper = require("../helpers/auth")
describe('Players tests', function () {
    var level = {
        value: 5,
        fromTotal: 0,
        toTotal: 100,
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

    it('should create player', function*() {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result;
        var level = (yield createLevel(user.token)).result;


        var playerResp = (yield createPlayer(user.token)).result;
        expect(playerResp.identifier).to.eq(player.identifier);
        expect(playerResp.levelScore).to.eq(player.levelScore);
        expect(playerResp.levelProgress).to.eq(player.levelProgress);
        expect(playerResp.totalScore).to.eq(player.totalScore);
        expect(playerResp.totalProgress).to.eq(player.totalProgress);
        expect(playerResp.level.value).to.eq(level.value);
    });

    it('should not create player with levelScore more than allowed for level', function*() {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result;
        const player2 = {
            identifier: "player1",
            levelValue: 5,
            levelScore: 102,
            levelProgress: 99,
            totalScore: 200,
            totalProgress: 99
        };

        const level2 = {
            value: 5,
            fromTotal: 0,
            toTotal: 100,
            maximumPoints: 100,
            status: "Dinosaur",
            description: "You are a very old TRex!",
            icon: "/dinosaur.png"
        };

        yield createLevel(user.token, level2);
        var playerResp = (yield createPlayer(user.token, player2)).result;
        expect(playerResp.statusCode).to.eq(400);
    });

    it('should not create player with totalScore more than allowed for level', function*() {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result;
        const player2 = {
            identifier: "player1",
            levelValue: 5,
            levelScore: 99,
            levelProgress: 99,
            totalScore: 102,
            totalProgress: 99
        };

        const level2 = {
            value: 5,
            fromTotal: 0,
            toTotal: 100,
            maximumPoints: 100,
            status: "Dinosaur",
            description: "You are a very old TRex!",
            icon: "/dinosaur.png"
        };

        yield createLevel(user.token, level2);
        var playerResp = (yield createPlayer(user.token, player2)).result;
        expect(playerResp.statusCode).to.eq(400);
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
        var response = yield Server.inject(opts);
        var result = response.result;
        expect(result.items.length).to.eq(1);
        expect(result.pageCount).to.eq(3);
        expect(result.totalCount).to.eq(3);
        expect(result.page).to.eq(2);
        expect(result.pageSize).to.eq(1);
    });

    it('should get sorted list of players by level', function* () {
        var user = (yield AuthHelper.createUser("test", "test@test.com")).result;
        yield createLevel(user.token);
        level.value = 4;
        yield createLevel(user.token);
        level.value = 6;
        yield createLevel(user.token);

        player.identifier = "player1";
        yield createPlayer(user.token);
        player.identifier = "player2";
        player.levelValue = 6;
        yield createPlayer(user.token);

        player.levelValue = 4;
        player.identifier = "player3";
        yield createPlayer(user.token);

        var opts = {
            method: "GET",
            url: "/players?page=1&pageSize=10&sortBy=level.value"
        };
        var response = yield Server.inject(opts);
        var result = response.result;
        var items = result.items;
        expect(items.length).to.eq(3);
        expect(items[0].level.value).to.eq(4);
        expect(items[1].level.value).to.eq(5);
        expect(items[2].level.value).to.eq(6);

        expect(result.pageCount).to.eq(1);
        expect(result.totalCount).to.eq(3);
        expect(result.page).to.eq(1);
        expect(result.pageSize).to.eq(10);
    });
});