const dateTimeNow = new Date();
console.log(dateTimeNow.toLocaleDateString()); // 17/08/2020
console.log(dateTimeNow.toLocaleTimeString()); // 13:26:15

const message1 = "This is the best moment to have a look at this website !";

alert(addDateTime(message1));

function addDateTime(message) {
   console.log("onClickHandlerForBtn2::click");
   return `${dateTimeNow.toLocaleDateString()} ${dateTimeNow.toLocaleTimeString()} : ${message}`;;
 };




