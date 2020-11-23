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
 * @param {*depending upon the call type can be GET or POST or PUT or DELETE} methodType 
 * @param {*local host url on top of which our json server is hosting the database} url 
 * @param {*to be set true or false depending on whether call is synchronous or asynchronous} async 
 */
function makePromiseCall(methodType, url, async = true, data = null) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 201) {
          resolve(xhr.responseText);
        } else if (xhr.status >= 400) {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
          });
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
  });
}

const getURL = "http://localhost:3000/employees";
/// Initialise the AJAX promise call methd to get userDetails
makePromiseCall("GET", getURL, true)
  .then((responseText) => {
    console.log("Get User Data at: " + showTime() + " data: " + responseText);
  })
  .catch((error) => console.log("GET Error Status: " + JSON.stringify(error)));
console.log("Made GET AJAX Call to Server at " + showTime());

const deleteURL = "http://localhost:3000/employees/4";
/// Initialise the AJAX promise call methd to delete user details
makePromiseCall("DELETE", deleteURL, false)
  .then((responseText) => {
    console.log("User Deleted: " + responseText);
  })
  .catch((error) =>
    console.log("DELETE Error Status: " + JSON.stringify(error))
  );

const postURL = "http://localhost:3000/employees";
const emplData = { name: "Harry", salary: "5000" };
/// Initialise the AJAX promise call methd to post the user details to the json server database
makePromiseCall("POST", postURL, true, emplData)
  .then((responseText) => {
    console.log("User Added: " + responseText);
  })
  .catch((error) => console.log("POST Error Status: " + JSON.stringify(error)));
