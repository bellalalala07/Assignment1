const readline = require("readline");

//Create list for login information
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

//Create list for flight details
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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Welcome to Singapore Airport!");

//Allow user to input the following option
let questions = "Choose an option:\n"+
"1. Login/Register your account\n"+
"2. Retrieve flight information\n"+
"3. Search flight information\n"+
"4. Get flight list\n"+
"5. Add flight information\n"+
"6. Edit flight status\n"+
"7. Exit\n"+
"==========================\n";

//Displays the result of user input from 1-6
let handleOption = function(option){
    switch(+option) {
        //Login & register username and password
        case 1:
            LoginRegister();
            break

        //Call specific flight details by flight number
        case 2:
            findFlightByNo();
            break;
        
        //Search function for flight details
        case 3:
            SearchInfo();
            break;

        //Displays all information in flight list
        case 4:
            getFlight();
            break;

        //Only accessible by administrator to call upon after admin login
        case 5:
            const isAdmin = loginInfo.find((login) => login.username == currentUsername && login.role == 'admin');
            if (isAdmin){
                AddFlight();
            } else{
                console.log("Permission denied, only administrator can add flight.");
            }
            break;
        
        //Admin can edit status of the flight
        case 6:
            const adminAccess = loginInfo.find((login) => login.username == currentUsername && login.role == 'admin');
            if (adminAccess){
                EditStatus();
            } else{
                console.log("Permission denied, only administrator can add flight.");
            }
            break;

        //Ends the code
        case 7: 
            rl.close();
            break;
    }
    setTimeout(()=>{rl.question(questions,handleOption);},1500);
}

rl.question(questions, handleOption);

rl.on("close", function() {
    console.log("\nHave a good day!");
    process.exit(0);
});

//Create variable to store current username
let currentUsername = '';

//Allows user to choose login or register
function LoginRegister(){
    let askUser = 
    "==========================\n"+
    "1. Login\n"+
    "2. Resgister\n"+
    "==========================\n";

    let choice = function(choice){
        switch(+choice) {
            case 1:
                Login();
                break
            case 2:
                Register();
                break;
        }
        setTimeout(()=>{rl.question(askUser,choice);},1500);
    }
    rl.question(askUser,choice);
}

//Allows user to input their username and password
function Login(){
    rl.question('Please enter your username: ', (enterUsername) => {
        rl.question('Please enter your password: ', (enterPassword) => {
            const login = loginInfo.find((user) => user.username == enterUsername && user.password == enterPassword);
            if(login){
                console.log('Hello ' + enterUsername + "!");
                currentUsername = enterUsername;
                rl.question(questions, handleOption);
            }
            else{
                console.log("Invalid username or password, please try again!");
                Login();
            }
        });
    });
}

//Waits for options to be called and completed before executing function
function UserInfo(question) {
    //Return promise which will then be resolve after user inputs an answer
    return new Promise((resolve) => {
        rl.question(question, (answers) => {
          resolve(answers);
        });
      });
}

//Prompt user to enter their username and password
async function Register(){
    try{
        const newUsername = await UserInfo('Create username: ');
        const newPassword = await UserInfo('Create password: ');
        loginInfo.push({ username: newUsername, password: newPassword });
        console.log('Registered Successfully!\n');

        rl.question(questions, handleOption);
    }
    catch(e){
        console.log(e.message);
        throw new Error("Invalid register.");
    }
}

//Waits for options to be called and completed before executing function
function askFlightNumber(question) {
    //Return promise which will then be resolve after user inputs an answer
    return new Promise((resolve) => {
        rl.question(question, (answers) => {
          resolve(answers);
        });
      });
}

//Prompts user to enter their flight number and execute the details of their flight
async function findFlightByNo(){
    try{
        const code = await askFlightNumber('Enter your flight number: ');
        const foundflight = flightList.find((flight) => flight.flightNo == code);
        if(foundflight){
            console.log(foundflight);
            rl.close();
        }
        else{
            console.log("The flight number you have entered is not valid.\n");
            //call input
            findFlightByNo();
        }
    }
    catch(e){
        console.log(e.message);
        throw new Error("Error entering flight information");
    }
}

//Waits for options to be called and completed before executing function
function search(question) {
    //Return promise which will then be resolve after user inputs an answer
    return new Promise((resolve) => {
        rl.question(question, (answers) => {
          resolve(answers);
        });
      });
}

//Allows user to search for information based on the flight list
async function SearchInfo(){
    try{
        const searchInfo = await search('Search for flight, city...: ');
        //Filter flight list based on search
        const matchFlights = flightList.filter(flight=>{

            //Assign information from flight list to a variable
            const airline = flight.airline;
            const flightNo = flight.flightNo;
            const gate = flight.gate;
            const departureCity = flight.departureCity;
            const destination = flight.destination;
            const date = flight.date;
            const time = flight.time;
            const status = flight.status;
            
            //Check for any matches in the search result with the flight list
            return(
                airline.includes(searchInfo) ||
                flightNo.includes(searchInfo) ||
                gate.includes(searchInfo) ||
                departureCity.includes(searchInfo) ||
                destination.includes(searchInfo) ||
                date.includes(searchInfo) ||
                time.includes(searchInfo) ||
                status.includes(searchInfo)
            );
            
        })

        //If no matches, prompt error message, else, display matched result and end the process
        if (matchFlights.length === 0) {
            console.log('Invalid search.');
            SearchInfo();
        } else {
            console.log(matchFlights);
            rl.close()
        }
                
    }
    catch(e){
        console.log(e.message);
        throw new Error("Error entering search information");
    }
    
}

//Waits for options to be called and completed before executing function
function addDetails(question) {
    //Return promise which will then be resolve after user inputs an answer
    return new Promise((resolve) => {
        rl.question(question, (answers) => {
          resolve(answers);
        });
      });
}

//Displays all information in flight list
function getFlight(){
    console.log(flightList);
}

//Allows admin to add flight information
async function AddFlight() {
    try{
        //Prompt admin for information to add to flight list
        //Create variables that stores the admin's input
        const airline = await addDetails('Enter Airline: ');
        const flightNo = await addDetails('Enter Flight Number: ');
        const gate = await addDetails('Enter Gate Number: ');
        const departureCity = await addDetails('Enter Departure City: ');
        const destination = await addDetails('Enter Destination: ');
        const date = await addDetails('Enter Date (YYYY-MM-DD): ');
        const time = await addDetails('Enter Time: ');
        const status = await addDetails('Enter Status: ');

        //Add admin's input into the flight list
        flightList.push({
            airline: airline,
            flightNo: flightNo,
            gate: gate,
            departureCity: departureCity,
            destination: destination,
            date: date,
            time: time,
            status: status
        });

        console.log("Successfully added flight into the list!\n");
        rl.question(questions, handleOption);
        
    }
    catch(e){
        console.log(e.message);
        throw new Error("Error adding flight information");
    }
}

//Waits for options to be called and completed before executing function
function edit(question) {
    //Return promise which will then be resolve after user inputs an answer
    return new Promise((resolve) => {
        rl.question(question, (answers) => {
          resolve(answers);
        });
      });
}

//Allow admin to edit status after prompting the flight number
async function EditStatus(){
    try {
        const fnumber = await edit('Enter flight number to edit status: ');
        //find index in array
        const index = flightList.findIndex((flight) => flight.flightNo == fnumber);

        //Check if flight number exists
        if (index !== -1) {
            const newStatus = await edit('Enter updated status: ');

            // Update flight status
            flightList[index].status = newStatus;
            console.log('Updated flight status successfully!\n');
        } else {
            console.log('Invalid flight number.\n');
            EditStatus()
        }

        rl.question(questions, handleOption);
    } catch (e) {
        console.log(e.message);
        throw new Error('Invalid flight status.');
    }
}