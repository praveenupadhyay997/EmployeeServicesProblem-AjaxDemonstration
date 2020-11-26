function makeServiceCall(methodType, url, async = true, data = null) {
  /// Making use of promise to ensure that the system can handle multiple callbacks efficiently
  /// Here teo callbacks are defined resolve-- In case the async is implemented successfully else reject
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    /// On load of the html file on the browser this will be triggered i.e. the htttp request is processed successfully
    xhr.onload = function () {
      console.log(
        methodType +
          " State Changed Called. Ready State: " +
          xhr.readyState +
          " Status:" +
          xhr.status
      );
      /// Regular expression to validate if the request is in success status
      if (xhr.status.toString().match("^[2][0-9]{2}$")) {
        resolve(xhr.responseText);
      } 
      /// Regular expression to validate if the request is in failure status
      else if (xhr.status.toString().match("^[4,5][0-9]{2}$")) {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        });
        console.log("XHR Failed");
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhttp.statusText,
      });
    };
    /// Opening the database connection for a particular method type
    xhr.open(methodType, url, async);
    if (data) {
      console.log(JSON.stringify(data));
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server");
  });
}
