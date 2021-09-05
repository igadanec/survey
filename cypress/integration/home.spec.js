/* eslint-disable no-undef */
describe("Survey form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.wait(1000);
  });
  it("should have question", () => {
    cy.get(
      ".container > .container__inner > .container__inner--right > .form > .form-survey > .form-survey__item > label"
    );
  });
  it("should have input", () => {
    cy.get(
      ".container > .container__inner > .container__inner--right > .form > .form-survey > .form-survey__item > input"
    );
  });
  it("should have notifications if fields are empty", () => {
    cy.get(
      ".container > .container__inner > .container__inner--right > .form > .button-container > button"
    ).click();
    cy.get(".toasted-container > .toasted");
  });
  it("submit survey form", () => {
    cy.get(
      ".container > .container__inner > .container__inner--right > .form > .form-survey > .form-survey__item:nth-child(1) > input"
    ).type("Rocky");
    cy.get(
      ".container > .container__inner > .container__inner--right > .form > .form-survey > .form-survey__item:nth-child(2) > input"
    ).type("5");
    cy.get(
      ".container > .container__inner > .container__inner--right > .form > .button-container > button"
    ).click();
  });
});

describe("Check submitted form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.wait(1000);
    cy.get(
      ".container > .container__inner > .container__inner--right > .form > .form-survey > .form-survey__item:nth-child(1) > input"
    ).type("Rocky");
    cy.get(
      ".container > .container__inner > .container__inner--right > .form > .form-survey > .form-survey__item:nth-child(2) > input"
    ).type("5");
    cy.get(
      ".container > .container__inner > .container__inner--right > .form > .button-container > button"
    ).click();
  });
  it("should have thank you message", () => {
    cy.get(".container > .container__inner > h1");
  });
  it("should have question", () => {
    cy.get(".container > .container__inner > .survey > .completed-survey > h3");
  });
  it("should have answer", () => {
    cy.get(".container > .container__inner > .survey > .completed-survey > p");
  });
  it("button should redirect to homepage", () => {
    cy.get(".container > .container__inner > .button-container > .btn").click();
  });
});
