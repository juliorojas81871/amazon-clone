# Amazon Clone

## Description

This code is an amazon clone where you can buy items and see your past orders. The program will also 
save items in your cart until you place an order.

If anyone want see this code, [please click at this link](https://amazon-clone-bay-sigma.vercel.app/).
The Credit Card number to use is 4242 4242 4242 4242.
The expiration, CVC, name, and address can be anything you want.

## Technologies & Methods Used

NextJS, TailwindCSS, React, Webhooks, Stripe Checkout, Firestore, NextAuth, Cookies

## Steps to get code to run:
1. Open terminal
2. Type (You can also download the code):
```
git clone https://github.com/juliorojas81871/amazon-clone
```

3. Make sure that you are in the right folder, if not cd to it.

4. Type: 
```
npm i
```
5. Change the .env-example to .env.local and fill each values out
6. Got to https://stripe.com/docs/stripe-cli#install and download Stripe CLI and put in the folder
7. Type: 
```
npm run dev
```
8. Use this line in a new terminal
```
stripe listen --foward-to localhost:3000/api/webhook
```
9. Go to browser and type at the address bar: 
```
http://localhost:3000/
```

## Example Pic:
![Amazon Clone Example Pic](https://github.com/juliorojas81871/amazon-clone/blob/main/pics/main.jpg)

