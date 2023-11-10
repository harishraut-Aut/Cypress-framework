describe("Tests related to login page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("validating if user can log into the application", () => {
        cy.login(Cypress.env("loginCreds"));
        cy.url().should("contain", "/inventory.html")
    });
});
