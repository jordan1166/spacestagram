const { expect, test } = require("@jest/globals");

const app = require("./app");

test("add 1 + 2 to equal 3", () => {
  expect(app.sum(1, 2)).toBe(3);
});
