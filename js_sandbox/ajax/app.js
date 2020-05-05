document.getElementById('button').addEventListener('click', loadData);

function loadData(e) {
    // Create an XHR Object
    const xhr = new XMLHttpRequest();

    // Open
    xhr.open('GET', 'data.txt', true);

    // Optional - used for spinners/loaders
    xhr.onprogress = function(){
        console.log(this.readyState);
    }

    xhr.onload = function() {
        console.log('Readystate', xhr.readyState);
        if(this.status === 200) {
            document.getElementById('output').innerHTML = `<h1> ${this.responseText} </h1>`;
        } 
    }
    xhr.onerror = function() {
        console.log('Request Error');
    }

    xhr.send();
}