var jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com/users';

// simple get request
function fetchData() {
    fetch(jsonPlaceHolderUrl)
        .then(checkStatus)
        .then(response => response.json()) // gets json promise
        .then(data => console.log(data)) // prints json
        .catch(error => console.log("This is error: ", error)); // checks status and throws error
}

function checkStatus(response) {
    if (response.ok) {
        return response;
    }
    let error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

function postData() {

    // url 
    let url = 'https://jsonplaceholder.typicode.com/posts';
    let data = {
        title: 'foo',
        body: 'bar',
        userId: 1
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(checkStatus)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log("This is a error: " + error));
}