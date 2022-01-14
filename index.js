var newCar = document.getElementById("new");
var NewCarInput = document.getElementById("New");
var content = document.getElementsByClassName("content")[0];
var contentCount = 0;
var dashboard = document.getElementsByClassName("dashboard")[0];

function showNewCarInput() {
    hideContent();
    NewCarInput.style.display = "flex";
    document.body.style.overflowY = "hidden";
}

function closeNewCarInput() {
    hideContent();
    NewCarInput.style.display = "none";
    document.body.style.overflowY = "scroll";
}

function showContent() {
    contentCount++;
    if (contentCount % 2 == 1) {
        content.style.display = "block";
    } else {
        hideContent();
    }
}

function hideContent() {
    content.style.display = "none";
}
closeNewCarInput();

// TODO db connection
var baseUri = "http://localhost:3000";
var baseUrl = "/api/v0/cars/";

// get all cars
const getAllCars = () => {
    axios.get(baseUri + baseUrl)
        .then(response => {
            const carList = response.data.data;
            // console.log('GET cars', carList);
            parseCarsList(carList);
        })
        .catch(error => console.error(error));
};
getAllCars();

// save a new car
const saveCar = (car) => {
    axios.post(baseUri + baseUrl, car)
        .then(response => {
            const addedcar = response.data;
            console.log('POST: user is added', addedcar);
            location.href = "./result.html?text=Car added successfully&isSuccess=true";
        })
        .catch(error => {
            location.href = "./result.html?text=Car addition failed&isSuccess=false";
        });
};

function parseCarsList(carList) {
    var total = 100;
    var inCount = 0;
    var outCount = 0;
    for (var i = 0; i < carList.length; i++) {
        var exitDate = carList[i]["exitDate"];
        if (exitDate != null & exitDate != undefined) {
            exitDate = carList[i]["exitDate"].substr(0, 10);
        } else {
            exitDate = '-';
        }
        var entryDate = carList[i]["entryDate"];
        if (entryDate != null & entryDate != undefined) {
            entryDate = carList[i]["entryDate"].substr(0, 10);
        } else {
            entryDate = '-';
        }
        if (carList[i]["status"] === 'IN') {
            inCount++;
            var outText = '<div class="row"> <div class="cel"> <h3>S No</h3> <p>' + (i + 1) + '</p> </div> <div class="cel"> <h3>Name</h3> <p>' + carList[i]["name"] + '</p> </div> <div class="cel"> <h3>Vehicle Name</h3> <p>' + carList[i]["vehicleName"] + '</p> </div> <div class="cel"> <h3>Vehicle Number</h3> <p>' + carList[i]["vehicleNumber"] + '</p> </div> <div class="cel"> <h3>Entry Date</h3> <p>' + entryDate + '</p> </div> <div class="cel"> <h3>Exit Date</h3> <p>' + exitDate + '</p> </div> <div class="cel"> <h3>Status</h3> <p>' + carList[i]["status"] + '</p> </div> <div class="cel"> <h3>Action</h3> <div class="inline-buttons"> <div class="button disabled"> <button onclick="updateCar(\'' + carList[i]["_id"] + '\',\'IN\')">IN</button> </div> <div class="button"> <button onclick="updateCar(\'' + carList[i]["_id"] + '\',\'OUT\')">OUT</button> </div> </div> </div> </div>';
            dashboard.innerHTML += outText;
        } else if (carList[i]["status"] === 'OUT') {
            outCount++;
            var outText = '<div class="row"> <div class="cel"> <h3>S No</h3> <p>' + (i + 1) + '</p> </div> <div class="cel"> <h3>Name</h3> <p>' + carList[i]["name"] + '</p> </div> <div class="cel"> <h3>Vehicle Name</h3> <p>' + carList[i]["vehicleName"] + '</p> </div> <div class="cel"> <h3>Vehicle Number</h3> <p>' + carList[i]["vehicleNumber"] + '</p> </div> <div class="cel"> <h3>Entry Date</h3> <p>' + entryDate + '</p> </div> <div class="cel"> <h3>Exit Date</h3> <p>' + exitDate + '</p> </div> <div class="cel"> <h3>Status</h3> <p>' + carList[i]["status"] + '</p> </div> <div class="cel"> <h3>Action</h3> <div class="inline-buttons"> <div class="button"> <button onclick="updateCar(\'' + carList[i]["_id"] + '\',\'IN\')">IN</button> </div> <div class="button disabled"> <button onclick="updateCar(\'' + carList[i]["_id"] + '\',\'OUT\')">OUT</button> </div> </div> </div> </div>';
            dashboard.innerHTML += outText;
        } else {
            var outText = '<div class="row"> <div class="cel"> <h3>S No</h3> <p>' + (i + 1) + '</p> </div> <div class="cel"> <h3>Name</h3> <p>' + carList[i]["name"] + '</p> </div> <div class="cel"> <h3>Vehicle Name</h3> <p>' + carList[i]["vehicleName"] + '</p> </div> <div class="cel"> <h3>Vehicle Number</h3> <p>' + carList[i]["vehicleNumber"] + '</p> </div> <div class="cel"> <h3>Entry Date</h3> <p>' + entryDate + '</p> </div> <div class="cel"> <h3>Exit Date</h3> <p>' + exitDate + '</p> </div> <div class="cel"> <h3>Status</h3> <p>' + carList[i]["status"] + '</p> </div> <div class="cel"> <h3>Action</h3> <div class="inline-buttons"> <div class="button"> <button onclick="updateCar(\'' + carList[i]["_id"] + '\',\'IN\')">IN</button> </div> <div class="button"> <button onclick="updateCar(\'' + carList[i]["_id"] + '\',\'OUT\')">OUT</button> </div> </div> </div> </div>';
            dashboard.innerHTML += outText;
        }
    }
    const date1 = new Date('1/14/2022');
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById("Capacity").innerHTML = total;
    document.getElementById("Available").innerHTML = total - inCount;
    document.getElementById("Occupied").innerHTML = inCount;
    document.getElementById("Daily").innerHTML = '' + (inCount + outCount) / (diffDays) + '%';
}
document.getElementsByTagName("form")[0].addEventListener("submit", function(event) {
    event.preventDefault()
});

function validateAndAddCars() {
    var name = document.getElementById("name").value;
    var vehicleName = document.getElementById("vehicleName").value;
    var vehicleNumber = document.getElementById("vehicleNumber").value;
    var entryDate = document.getElementById("entryDate").value;
    var exitDate = document.getElementById("exitDate").value;
    var carObj = {
        name: name,
        vehicleName: vehicleName,
        vehicleNumber: vehicleNumber,
        entryDate: entryDate,
        exitDate: exitDate
    }
    saveCar(carObj);
}

// update car
const updateCar = (Id, Status) => {
    var car = { status: Status };
    const d = new Date();
    if (Status == 'IN') {
        car["entryDate"] = d.toISOString();
    } else {
        car["exitDate"] = d.toISOString();
    }
    axios.patch(baseUri + baseUrl + Id, car)
        .then(response => {
            const addedcar = response.data;
            console.log('PATCH: car is updated', addedcar);
            location.href = "./result.html?text=Status updated successfully&isSuccess=true";
        })
        .catch(error => {
            location.href = "./result.html?text=Status updation failed&isSuccess=false";
        });
};