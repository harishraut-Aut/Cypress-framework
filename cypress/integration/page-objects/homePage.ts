import { click } from "../../utils";

export const homePage = {
    addProductToCartByName: function (name: string) {
        cy.log("adding procuct to cart named --> " + name)
        cy.get('.inventory_item_name').contains(name).highLight().click({ force: true });
        click(".btn_inventory");
        cy.log(`procuct ${name} added to the cart succesfully`);
    }
}