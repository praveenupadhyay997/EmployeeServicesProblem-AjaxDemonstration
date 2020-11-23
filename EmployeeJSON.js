/// Calling for the xml hhtps request extension package and then to utilise it to work with the current json server
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
/// Show system time while the server call or program is running
function showTime() {
  const date = new Date();
  return (
    date.getHours() +
    "Hrs:" +
    date.getMinutes() +
    "Mins:" +
    date.getSeconds() +
    "Secs"
  );
}
/**
 * Function to follow the three steps of the AJAX call method
 * @param {*deoending upon the call type can be GET or POST or PUT or DELETE} methodType 
 * @param {*local host url on top of which our json server is hosting the database} url 
 * @param {*to be set true or false depending on whether call is synchronous or asynchronous} async 
 */
function makeAJAXCall(methodType, url, callback, async = true, data = null) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 201) {
        callback(xhr.responseText);
      } else if (xhr.status >= 400) {
        console.log(
          "Handle 400 Client Error or 500 Server Error at: " + showTime()
        );
      }
    }
  };
  /// Opening the database connection for a particular method type
  xhr.open(methodType, url, async);
  if (data) {
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
  } 
  /// Send the http request to the server
  else xhr.send();
  console.log(methodType + " request sent to the server at: " + showTime());
}

const getURL = "http://localhost:3000/employees";
function getUserDetails(data) {
  console.log("Get User Data at: " + showTime() + " data: " + data);
}
/// Initialise the AJAX call methd to get userDetails
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX Call to Server at " + showTime());

const deleteURL = "http://localhost:3000/employees/5";
function userDeleted(data) {
  console.log("User Deleted at: " + showTime() + " data: " + data);
}
/// Initialise the AJAX call methd to delete user details
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE AJAX Call to Server at " + showTime());

const postURL = "http://localhost:3000/employees";
const emplData = { name: "Kavya", salary: "3000" };
function userAdded(data) {
  console.log("User Added at: " + showTime() + " data: " + data);
}
/// Initialise the AJAX call methd to post the user details to the json server database
makeAJAXCall("POST", postURL, userAdded, true, emplData);
console.log("Made POST AJAX Call to Server at " + showTime());