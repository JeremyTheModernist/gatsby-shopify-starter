# Gatsby Shopify Template

This is a Gatsby Shopify Store template, complete with cart and checkout functionality, and styled with [Theme-UI](https://theme-ui.com/). It is available for configuration and use with any Shopify store.

## Intended Use

I built this template as an opportunity for others to learn and see how a Gatsby Shopify site can be created. I have supplied several comments throughout the code to help explain what the different parts are doing and how to use them.

## Readme Contents:

-   [Helpful Resources](#helpful-resources)
-   [Getting Started](#getting-started)

## Helpful Resources:

-   [Build a Gatsby ecommerce site with Shopify](https://www.gatsbyjs.org/docs/building-an-ecommerce-site-with-shopify/)
-   [Shopify Buy API](https://www.npmjs.com/package/shopify-buy#completing-a-checkout)
-   [Authenticate a private app with Shopify](https://shopify.dev/tutorials/create-a-checkout-with-storefront-api#completing-the-checkout)
-   [Set up Shopify Payments](https://help.shopify.com/en/manual/payments/shopify-payments)
-   [Set up Shopify Webhooks to trigger Netlify Builds](https://github.com/gatsbyjs/store.gatsbyjs.org/issues/4)

## Getting Started

#### Create a new Shopify store

-   If you haven't already, [create a new Shopify Account](https://www.shopify.com/) and store.
-   Personally, I recommend signing up for their [partner program](https://www.shopify.com/partners) where you can experiment with multiple different `Development Stores` for experimentation and transfer ownership to store owners when you are ready.
-   Login to your account and create a new store
-   Your URL should read `yourStoreName.myshopify.com/admin`, and you should see something akin to the following:
    ![Shopify Store Home Screen](./README_imgs/Shopify_01.jpg)

#### Create a Private App
