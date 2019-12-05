var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PixelatePipeline = /** @class */ (function (_super) {
    __extends(PixelatePipeline, _super);
    function PixelatePipeline(game) {
        var _this = _super.call(this, game) || this;
        // ...
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(_this, {
            game: game,
            renderer: game.renderer,
            fragShader: "\n            precision mediump float;\n\n            uniform sampler2D uMainSampler;\n            uniform vec2 uResolution;\n            uniform float uTime;\n\n            varying vec2 outTexCoord;\n            varying vec4 outTint;\n\n            vec4 plasma()\n            {\n                vec2 pixelPos = gl_FragCoord.xy / uResolution * 20.0;\n                float freq = 0.8;\n                float value =\n                    sin(uTime + pixelPos.x * freq) +\n                    sin(uTime + pixelPos.y * freq) +\n                    sin(uTime + (pixelPos.x + pixelPos.y) * freq) +\n                    cos(uTime + sqrt(length(pixelPos - 0.5)) * freq * 2.0);\n\n                return vec4(\n                    cos(value),\n                    sin(value),\n                    sin(value * 3.14 * 2.0),\n                    cos(value)\n                );\n            }\n\n            void main()\n            {\n                vec4 texel = texture2D(uMainSampler, outTexCoord);\n                texel *= vec4(outTint.rgb * outTint.a, outTint.a);\n                gl_FragColor = texel * plasma();\n            }\n\n            "
        });
        return _this;
    }
    return PixelatePipeline;
}(Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline));
export default PixelatePipeline;
//# sourceMappingURL=PixelatePipeline.js.map