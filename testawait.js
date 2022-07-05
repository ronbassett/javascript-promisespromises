// @license
// SPDX-License-Identifier: Apache-2.0
// @title: Promises, promises
// @author: RonB
// @version 1.0.2
// @description: this javascript will help you to learn more about how javascript "promises" and async functions work
// @references: 
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
//   https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises


// Declarations
const textarea = document.getElementById('output');
const textarea2 = document.getElementById('output2');
var output; // keeping this so that you can explore return result from calling a non-blocking function

// Log output utility function
function logOutput(text) {
  //console.log(text);
  textarea.value += text+'\r\n';
}

// myTimer() function takes 2 parameters and returns a promise to complete the function (an object) 
//    timerNumber - any arbitrary ID number that you assign for timer tracking purposes
//    seconds - timer in seconds, converted to miliseconds within the function for use with the setTimeout() system function
// This function can be called concurrently and is non-blocking since it immediately returns a promise.
// When the long-running function that is under the control of the promise completes, the resolve() function below will be called
// The reject() function is not implemented below but left here for education purposes since if there is a failure as part of the promise processing, the reject() function can be called to resolve the promise as completed with error
function myTimer(timerNumber, seconds) {
  logOutput('myTimer() called with timerNumber = '+timerNumber+', duration = '+seconds+' seconds, timestamp = '+Date());
  seconds = seconds * 1000;
  return new Promise(function(resolve, reject) {
    // the internal resolve() fn below is called automatically when the setTimeout() fn completes returning a message to caller
    setTimeout(() => resolve(" ** Promise processing completed for myTimer() resolve() timerNumber "+timerNumber+" run duration "+seconds/1000+" completed at "+Date()), seconds);
})};

// Reads the javascript source file and displays it in the second text area
function readFile(filename) {
  fetch(filename)
  .then(response => response.text())
  .then(data => {
  	textarea2.value += data;
  })
}


// main app logic - first display the source code in the second text area on the page
readFile('testawait.js');

// You'll notice on the console message timestamps that the functions 1-4 called below are non-blocking
// Review the second reference noted at top of this file to explore the logic in depth
output = myTimer(1,22).then(
  result => logOutput(result),
  error => logOutput('There was an error...')
);

output = myTimer(2,15).then(
  result => logOutput(result),
  error => logOutput('There was an error...')
);

output = myTimer(3,4).then(
  result => logOutput(result),
  error => logOutput('There was an error...')
);

output = myTimer(4,10).then(
  result => logOutput(result),
  error => logOutput('There was an error...')
);

// Now try to 'await' one of these to complete -- compare the timestamps between 5 and 6 (5 blocks/waits to complete)
output = await myTimer(5,5).then(
  result => logOutput(result),
  error => logOutput('There was an error...')
);

output = myTimer(6,12).then(
  result => logOutput(result),
  error => logOutput('There was an error...')
);

// Calling from within an anonymous async block to see if there is an difference 
(async() => {
  logOutput('Inside of anonymous async fn...');
  output = await myTimer(7,17).then(
    result => logOutput(result),
    error => logOutput('There was an error...')
  );
  output = myTimer(8,28).then(
    result => logOutput(result),
    error => logOutput('There was an error...')
  );
})();

logOutput('Inside of Promise.all test block: 3 timers are set for different durations, the promise block will only complete when the last promise finishes.');
const promise1 = myTimer(9,17);
const promise2 = myTimer(10,37);
const promise3 = myTimer(11,27);
Promise.all([promise1, promise2, promise3])
  .then( responses => {
    for (const response of responses) {
      logOutput(response);
    }
  })
  .catch( error => {
    logOutput('There was an error...')
  });
