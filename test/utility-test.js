"use strict";

require("dotenv").config();

const expect = require("chai").expect;
const mocha = require("mocha");
const utility = require("../helpers/utility");

mocha.describe("Utility Function tests", function () {
  mocha.it("Test Utility ParseInt", () => {
    expect(utility.parseInt(null)).to.be.equal(0);
    expect(utility.parseInt("")).to.be.equal(0);
    expect(utility.parseInt("err")).to.be.equal(0);
    expect(utility.parseInt("0")).to.be.equal(0);
    expect(utility.parseInt("1")).to.be.equal(1);
    expect(utility.parseInt(1)).to.be.equal(1);
  });

  mocha.it("Test Utility nowFormat", () => {
    expect(utility.now()).to.be.not.equal(null);
    expect(utility.nowFormat("YYYY")).to.be.equal(
      new Date().getFullYear() + ""
    );
  });

  mocha.it("Trim Test", () => {
    let s = utility.trim("  12 - Não recomendado para menores de 12 anos  ");
    expect(s).to.be.equal("12 - Não recomendado para menores de 12 anos");
  });

  mocha.it("Trim isNullOrEmpty", () => {
    expect(utility.isNullOrEmpty("")).to.be.equal(true);
    expect(utility.isNullOrEmpty(null)).to.be.equal(true);
    expect(utility.isNullOrEmpty("oi")).to.be.equal(false);
  });

  mocha.it("Test convert string to lower ", () => {
    expect(utility.lowerCaseRemoveAccents("TEST CONVERT String")).to.be.equal(
      "test convert string"
    );
  });

  mocha.it("Test sha1 not return null or empty", () => {
    expect(utility.sha1("TEST")).to.not.equal("");
    expect(utility.sha1("TEST")).to.not.equal(null);
  });

  mocha.it("Test dateDiff", () => {
    expect(
      utility.dateDiff(utility.nowAddDaysFormat(2), utility.nowAddDaysFormat())
    ).to.be.equal(172800);
  });

  mocha.it("Test encrypt", () => {
    expect(utility.encrypt("01550342355")).to.be.equal(
      "09821fbe65ceef44a00e80357ee53b0c"
    );
  });

  mocha.it("Test decrypt", () => {
    expect(utility.decrypt("09821fbe65ceef44a00e80357ee53b0c")).to.be.equal(
      "01550342355"
    );
  });

  mocha.it("Test stringFormatter", () => {
    expect(
      utility.stringFormatter("X-FRIEND %@ é isso %@", "teste", "testando")
    ).to.be.equal("X-FRIEND teste é isso testando");
  });

  mocha.it("Test stringFormatter", () => {
    expect(
      utility.stringFormatter("X-FRIEND %@ é isso %@", "teste", "testando")
    ).to.be.equal("X-FRIEND teste é isso testando");
  });

  mocha.it("Test getProperty", () => {
    const obj = { property: { propertyA: { propertyB: "value" } } };
    expect(
      utility.getProperty("property.propertyA.propertyB", obj)
    ).to.be.equal("value");
  });
});
