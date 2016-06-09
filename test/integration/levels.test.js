describe('Levels tests', function() {
    it('should return the list of available levels', function* (){
        var opts = {
            method: "GET",
            url: "/levels/"
        };

        response = yield Server.inject(opts);
        expect(response.statusCode).to.eq(200)
    });
});