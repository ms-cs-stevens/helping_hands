# HelpingHands

People are always up to support a good cause, but most are put off by the hassle it entails. Today, most people are caught up with their own lives and need a better way of helping the less fortunate. Like all other activities, a more efficient platform might even stimulate more frequent donations to the needy

Often, people that don't have enough money to donate want to contribute by giving out goods, but there are very limited avenues for easily donating goods in a manner that ensures

## Section 1 - some screenshots

<img width="1440" alt="Screen Shot 2021-07-06 at 12 10 00 PM" src="https://user-images.githubusercontent.com/26408955/124633995-d90b9980-de53-11eb-952d-a6d8607379b3.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 10 07 PM" src="https://user-images.githubusercontent.com/26408955/124633997-d9a43000-de53-11eb-86e7-9d94540a9795.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 10 25 PM" src="https://user-images.githubusercontent.com/26408955/124633998-d9a43000-de53-11eb-9284-80b0badddf39.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 10 42 PM" src="https://user-images.githubusercontent.com/26408955/124634003-da3cc680-de53-11eb-907a-f85686080d2f.png">
<img width="1437" alt="Screen Shot 2021-07-06 at 12 10 49 PM" src="https://user-images.githubusercontent.com/26408955/124634004-da3cc680-de53-11eb-869a-856240ffc6a9.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 10 59 PM" src="https://user-images.githubusercontent.com/26408955/124634006-dad55d00-de53-11eb-97b2-86d931c53ca2.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 11 42 PM" src="https://user-images.githubusercontent.com/26408955/124634008-dad55d00-de53-11eb-87f2-e7f104025e65.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 13 07 PM" src="https://user-images.githubusercontent.com/26408955/124634009-dad55d00-de53-11eb-8411-bddabc6c736b.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 13 14 PM" src="https://user-images.githubusercontent.com/26408955/124634010-dad55d00-de53-11eb-8c48-7986bcef8f3f.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 13 26 PM" src="https://user-images.githubusercontent.com/26408955/124634012-db6df380-de53-11eb-95b0-f65eca501722.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 13 44 PM" src="https://user-images.githubusercontent.com/26408955/124634014-db6df380-de53-11eb-8c2e-651edacb52e3.png">
<img width="1440" alt="Screen Shot 2021-07-06 at 12 13 51 PM" src="https://user-images.githubusercontent.com/26408955/124634015-db6df380-de53-11eb-81bb-bb39fef0d6f9.png">


## Section 2 - Installation Guide:

Create a file with the exact name `variables.env` and copy the contents from `variables.sample.env` in the newly created file or just rename the `variables.sample.env` file to `variable.env`

Make sure you have MongoDB installed on your system and it's running.

#### Setting up the installation

1. `yarn install` or `npm install`


### Creating starter data on the application

1. `yarn seed` or `npm run seed`
   We need to add admin user from the backend (Will be done automatically when we run the seed file).
   We must have roles(donor, admin and recipient) set up in our application before running it. So `yarn seed` is very important.

#### Running the app on local

1. `yarn start` or `npm start`

app will start running on localhost:3000

### Login credentials for dummy users in the system:

#### Admin Credentials

###### email: admin@gmail.com

###### password: HelpingHand@2020

#### Donor Credentials

###### email: donor@gmail.com

###### password: HelpingHand@2020

#### Recipient Credentials

###### email: recipient@gmail.com

###### password: HelpingHand@2020

### Default Features

1. Authentication and Authorization
2. XSS attack prevention
3. Landing page

### Core Features in the application

1. Donations CRUD
2. Order and Cart feature
3. Adding more than 1 images for donation
4. Search and Filter features for donations
5. Admin Portal with admin features
6. Donor Portal with donor features
7. Recipient Portal with recipient features

### Additional Features

1. Send email(s) to the about Donation Status and any update made in the donation - Not Implemented
2. Carousel of items floating from right to left.
3. Ajax Recent Donations
4. Enable Disable Users
5. Review Orders
6. Render default image if no image in the database
