# Bella's Flight System
The module provides details of flight information for the users.

# Getting started
Ensure readline is required:
const readline = require("readline");

Install dependencies:
npm init
npm install express
npm install

Run nodemon in terminal:
node BellaLuYiTian_FlightSystem.js

## Created list for flight list and login details

```js
const loginInfo = [
    {
        username: 'bella07',
        password: 'Password123',
    },

    {
        username: 'admin',
        password: 'Password123',
        //identification of admin
        role: 'admin',
    }
]
```

```js
const flightList = [
    {
        airline: 'Emirates',
        flightNo: 'EK856',
        gate: 'A4',
        departureCity: 'Singapore',
        destination: 'New Zealand',
        date: '2023-11-20',
        time: '13:40',
        status: 'Scheduled',
    },
    {
        airline: 'Scoot',
        flightNo: 'TR899',
        gate: 'B3',
        departureCity: 'Singapore',
        destination: 'London',
        date: '2023-11-19',
        time: '19:00',
        status: 'On Time',
    },
    {
        airline: 'Singapore Airlines',
        flightNo: 'SQ621',
        gate: 'C2',
        departureCity: 'Singapore',
        destination: 'Greece',
        date: '2023-11-18',
        time: '10:30',
        status: 'Delayed',
    },
]
```
## User Input:
Output shown under terminal:

```js
Choose an option:
1. Login/Register your account
2. Retrieve flight information
3. Search flight information
4. Get flight list
5. Add flight information
6. Edit flight status
7. Exit
==========================
(Enter number)
```
Note: 5 & 6 is only accessible after logging in as admin which can be found under 1

#### Option 1:

```js
==========================
1. Login
2. Resgister
==========================
(Enter number)
```

#### User input for login:

Please enter your username: (Enter username)

Please enter your password: (Enter password)

#### User input for register:

Create username: (Enter new username)

Create password: (Enter new password)

Option 2:

Enter your flight number: (Enter flight number from flight list)

Option 3:

Search for flight, city...: (Enter valid input from flight list)

Option 4:

All information from flight list would be displayed.

Option 5:

Enter Airline: (Enter new airline)

Enter Flight Number: (Enter new flight no)

Enter Gate Number: (Enter new gate no)

Enter Departure City: (Enter new depature city)

Enter Destination: (Enter new destination)

Enter Date (YYYY-MM-DD): (Enter new date)

Enter Time: (Enter new time)

Enter Status: (Enter new status)

Option 6:

Enter the flight number to edit status: (Enter flight number from flight list)

Enter the new status: (Enter new status)

## Functions
### Login/Register account
Functions used:
```js
LoginRegister()
Login()
Register()
```
Summary: LoginRegister() prompts user to choose whether they would like to login or register their accounts. Login() allows user to login to their accounts and subsequently choose to retrieve/search/get flight details.

### Retrieve flight information by flight number
Functions used:
```js
flightInfo()
```
Summary: Prompts user to enter flight number and executes the information of their flight details from the flight list.

### Search for flight information
Functions used:
```js
SearchInfo()
```
Summary: Serves as a search function for user to search for any flight details that are available in the flight list.

### Get flight list
Functions used:
```js
getFlight()
```
Summary: All information in flight details would be displayed.

### Add flight information
Functions used:
```js
AddFlight()
```
Summary: Administration would be able to add new airline, flight number, gate, depature city, destination, date, time, status to the existing flight list.

### Edit flight status
Functions used:
```js
EditStatus()
```
Summary: Administration would be able to edit the status in flight list by entering flight number to find the section they would like to edit.