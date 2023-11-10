import { clearAndType, click } from "../../utils";
import { homePage } from "../page-objects/homePage";

describe("Tests related to login page", () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(Cypress.env("loginCreds"));
    });

    it("validating if user can add product to the cart", () => {
        homePage.addProductToCartByName("Sauce Labs Backpack");
        cy.get('.shopping_cart_badge').should("be.visible").highLight().and("have.text", 2);
    });
});
