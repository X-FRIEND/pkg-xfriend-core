const BaseHttpFunction  = require("../../common/baseHttpFunction");

module.exports = class BlankHttpFunction extends BaseHttpFunction {

    constructor(event, context, callback, coldStart) {
        super(event, context, callback, coldStart);
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

    runHttp() {
        this.logger.log("function run initiated");
        this.finishFunction(this.result);
    }
}