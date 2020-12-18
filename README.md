# HelpingHands

### People are always up to support a good cause, but most are put off by the hassle it entails. Today, most people are caught up with their own lives and need a better way of helping the less fortunate. Like all other activities, a more efficient platform might even stimulate more frequent donations to the needy

### Often, people that don't have enough money to donate want to contribute by giving out goods, but there are very limited avenues for easily donating goods in a manner that ensures

### 1. The donations reach the people that most need it

### 2. Minimization of wastage

### Our application hopes to efficiently solve these problems. This app will act as a middleman between the Donors(the generous) and the Recipients(the needy)

### Donors will sign up on our platform and register as donors. Once they are validated and login, they will be given accessibility to create “donation(s)”

### Recipients will be the needy; they will log on to the website to view the listed items and contact the donors for receiving the listed donation

## Installation Guide:

Create a file with the exact name `variables.env` and copy the contents from `variables.sample.env` in the newly created file or just rename the `variables.sample.env` file to `variable.env`

Make sure you have MongoDB installed on your system and it's running.

#### Setting up the installation
1. `yarn install` or `npm install`

### Creating dummy data on the app
1. `yarn seed` or `npm run seed`
Checkout dump.js file for login credentials

#### Running the app on local
1. `yarn start` or `npm start`

app will start running on localhost:3000

### Login credentials for dummy users in the system: 

#### Admin Credentials
###### email: admin@gmail.com
###### password: elementarymydearwatson

#### Donor Credentials
###### email: donor@gmail.com
###### password: damnyoujackdonaghy

#### Recipient Credentials
###### email: recipient@gmail.com
###### password: quidditch

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
