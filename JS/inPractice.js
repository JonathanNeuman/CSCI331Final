getButton.addEventListener("click", getUser); // id is getBtn
let url = "https://randomuser.me/api"
const loader = document.getElementById("loader");

getUser(); // hoisting will ensure that functions are defined before this call


function getUser() {
    showLoader();
        // fetch returns a promise: pending until it resolves to a response object                    
    fetch(url)
        // now the promise is settled and we we have a response object
        // next: send the settled response as an argument to the next callback 
    .then(decodeData)
        // we now have a result: the json from a successful response, or we threw an error
        // next: first callback is called in the case of success, second if rejected 
    .then(success, fail);
        // if only one argument, catch handles rejected promise
    //.then(success)                                          
    //.catch(fail)
}

function decodeData(response) {     // take the response object as a parameter
    // return (response.json())
    if (response.ok) {              // 200 - 299 is true (200 is success)
        apiData.innerHTML = "response is " + response.status;
        return (response.json())    // returns promise that resolves to result of parsing as JSON
      }
      else
        throw response.status      // throw an error: the response code
}

function success(userData) {
    hideLoader();
    // A template literal is of the form `three plus four is ${ 3 + 4 }`
  apiData.innerHTML = 
    `<div class="flip-container">
    <div class="flip-inner">
        <div class="flip-front">
            <img  class="user" src=${userData.results[0].picture.large} alt="rando user">
            <h2 class="user">Meet ${userData.results[0].name.first}</h2>
        </div>
        <div class="flip-back">
            <h2 class="back">Name: ${userData.results[0].name.first} ${userData.results[0].name.last}</h2>
            <h2 class="back">Age: ${userData.results[0].dob.age}</h2>
            <h2 class="back">City: ${userData.results[0].location.city}</h2> 
        </div>
    </div>
    </div>

    `;

  const apiFirst = userData.results[0].name.first;
  const apiLast = userData.results[0].name.last;
  const apiAge = userData.results[0].dob.age;
  //this is a test
  apiform = document.querySelector("form")
  apiform.innerHTML = `<input type="hidden" name="first" value="${apiFirst}"/><br>
  <input type="hidden" name="last" value="${apiLast}"/>
  <input type="hidden" name="age" value="${apiAge}"/>
  <input type="submit" id="addBtn" class="btn" value="Add This One"></button>`
}

function fail(error) {
    apiData.innerHTML = "Something went wrong with parsing JSON."
    mdnCodes = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status"
    apiData.innerHTML+= `<br>The problem: <a href=${mdnCodes}>${error} Error</a>`
}

function showLoader(){
    loader.style.display = 'block';
}

function hideLoader(){
    loader.style.display = 'none';
}