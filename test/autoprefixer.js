var expect = require('./unexpected-with-plugins'),
    AssetGraph = require('../lib/AssetGraph');

describe('transforms.autoprefixer', function () {
    it('should handle an unprefixed test case', function (done) {
        new AssetGraph({root: __dirname + '/autoprefixer/'})
            .loadAssets('index.html')
            .populate()
            .queue(function (assetGraph) {
                 expect(assetGraph, 'to contain relations', 'HtmlStyle', 2);
                 expect(assetGraph, 'to contain relations', 'CssImage', 1);
            })
            .autoprefixer()
            .queue(function (assetGraph) {
                expect(assetGraph, 'to contain relations', 'HtmlStyle', 2);
                expect(assetGraph, 'to contain relations', 'CssImage', 3);
            })
            .run(done);
    });

    it('should remove prefixfree.js and prefixfree.min.js', function (done) {
        new AssetGraph({root: __dirname + '/autoprefixer/'})
            .loadAssets('prefixfree.html')
            .populate()
            .queue(function (assetGraph) {
                expect(assetGraph, 'to contain relations', 'HtmlScript', 2);
            })
            .autoprefixer()
            .queue(function (assetGraph) {
                expect(assetGraph, 'to contain relations', 'HtmlScript', 0);
            })
            .run(done);
    });
});
