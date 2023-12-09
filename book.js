let loyaltyPoints = 0;

// constants for the room booking code
const singleRoomPrice = 25000;
const doubleRoomPrice = 35000;
const tripleRoomPrice = 40000;
const meals = 5000;
const extraBedPrice = 8000;

// variables
let roomBookingCost;

// get references to the interactive elements
const fullName = document.getElementById("namee");
const Email = document.getElementById("mail");
const telNum = document.getElementById("num");
const checkInDate = document.getElementById("indate");
const checkOutDate = document.getElementById("outdate");
const promoCode = document.getElementById("promoCode");
const adults = document.getElementById("Adults");
const NoOfextrabeds = document.getElementById("extrabeds");
const form = document.querySelectorAll('form');
const txtOutput = document.getElementById("currentcost");
const txtCost = document.getElementById("costroom");
const theForm = document.getElementById("form");
const singleRoom = document.getElementById("noOfsingle");
const doubleRoom = document.getElementById("noOfdouble");
const tripleRoom = document.getElementById("noOftriple");
const roomBook = document.querySelectorAll(".roomsBook"); 
const kidsAbv = document.getElementById("kids");
const theRoomInputs = document.querySelectorAll("#roomsBook input");

// query selectors
roomBook.forEach(input => input.addEventListener('input', calcRoomTot)); 
theRoomInputs.forEach(input => input.addEventListener('input', calcRoomTot));
checkInDate.addEventListener('input', validateDates);
checkOutDate.addEventListener('input', validateDates);

function calcRoomTot() {
    calculateRoomTotalCost();

    if (promoCode.value === "promo123") {
        let discountAmount = roomBookingCost * 0.05;
        roomBookingCost = roomBookingCost - discountAmount;
    }
    

    txtOutput.innerText =
        `Name: ${fullName.value}
    Contact: ${telNum.value}
    Email: ${Email.value}
    Check-in Date: ${checkInDate.value}
    Check-out Date: ${checkOutDate.value}
    Extra-for-the-Meals: ${kidsAbv.value}
    Total Cost: ${roomBookingCost}
    `;
    
}

function calculateRoomTotalCost() {
    let numSingle = parseInt(singleRoom.value);
    let numdouble = parseInt(doubleRoom.value);
    let numtripple = parseInt(tripleRoom.value);
    let kidsAbv5years = parseInt(kidsAbv.value);
    let extrabeds = parseInt(NoOfextrabeds.value);

    const totalRooms = numSingle + numdouble + numtripple;

    let daysForTheStay = (new Date(checkOutDate.value) - new Date(checkInDate.value)) / (24 * 60 * 60 * 1000);

    roomBookingCost = ((numSingle * singleRoomPrice * daysForTheStay) + (numdouble * doubleRoomPrice * daysForTheStay) + (numtripple * tripleRoomPrice * daysForTheStay)) + (kidsAbv5years * meals) + (extrabeds * extraBedPrice);

    // Apply promo code discount
    if (promoCode.value === "promo123") {
        let discountAmount = roomBookingCost * 0.05;
        roomBookingCost = roomBookingCost - discountAmount;
    }

    document.getElementById('costroom').innerHTML = roomBookingCost;

    // loyalty points
    loyaltyPoints = 0;

    if (totalRooms > 3) {
        loyaltyPoints = totalRooms * 20;
    }
}
//validing the days properly
function validateDates() {
  const today = new Date().setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  const checkInDateValue = new Date(checkInDate.value).setHours(0, 0, 0, 0);
  const checkOutDateValue = new Date(checkOutDate.value).setHours(0, 0, 0, 0);

  // Validate check-in date against today's date
  if (checkInDateValue < today) {
      alert("Check-in date cannot be in the past. Please select a valid date.");
      return false; // Prevent form submission if check-in date is invalid
  }

  // Validate check-out date against today's date
  if (checkOutDateValue <= today) {
      alert("Check-out date must be in the future. Please select a valid date.");
      return false; // Prevent form submission if check-out date is invalid
  }

  // Validate check-out date against check-in date
  if (checkOutDateValue <= checkInDateValue) {
      alert("Check-out date must be after the check-in date. Please select a valid date range.");
      return false; // Prevent form submission if check-out date is invalid
  }

  // All validations passed, return true
  return true;
}
checkInDate.addEventListener('input', validateDates);
checkOutDate.addEventListener('input', validateDates);
validateDates();


// event listener to the room button
const btnBookRoom = document.getElementById('bookroom');
const forms = document.getElementById('form');

btnBookRoom.addEventListener('click', (event) => {
    if (!validateDates()) {
        event.preventDefault(); // Prevent form submission and page refresh if date validation fails
    }
});

// event listener to the loyalty points
const btnLoyalPoints = document.getElementById('loyal');

btnLoyalPoints.addEventListener('click', displayLoyaltyPoints);


// getting selected extra requirements to a list
function displayLoyaltyPoints() {
    alert(`Loyalty Points: ${loyaltyPoints}`);
};
