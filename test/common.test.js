"use strict";

require("dotenv").config();

const expect = require("chai").expect;
const mocha = require("mocha");
const common = require("../lib").common;

mocha.describe("Common Function tests", function () {
  mocha.it("Test getProperty", () => {
    const obj = { property: { propertyA: { propertyB: "value" } } };
    expect(common.getProperty("property.propertyA.propertyB", {})).to.null;
    expect(common.getProperty("property.propertyA.propertyB", obj)).to.be.equal(
      "value"
    );
  });
  mocha.it("Test normalizeProperties", () => {
    const obj = {
      HEADERS: "value",
      BODY: "value",
    };
    expect(common.normalizeProperties(obj, ["body"])).to.be.deep.equal({
      headers: "value",
    });
  });
});
