const BaseFunction  = require("../../common/baseFunction");

module.exports = class BlankFunction extends BaseFunction {

    constructor(event, context, callback) {
        super(event, context, callback);
        this.result = {};

        let self = this;

        this.context = {
            succeed : function() {
                self.logger.log("MOCK");
            },
            fail : function() {
                self.logger.log("MOCK");
            }
        }

        this.callback = function (error, success) {
            self.logger.log("MOCK " + error + success);
        }

    }

    run() {
        this.logger.log("function run initiated");
        this.finish(null, this.result);
    }

}