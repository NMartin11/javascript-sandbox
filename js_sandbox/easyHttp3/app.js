const http = new EasyHttp;


// Get users
http.get('https://jsonplaceholder.typicode.com/users').then(data => console.log(data))
.catch(err => console.log(err));

const data = {
    name: 'Nathan',
    username: 'doe',
    email: 'something@something.com'
}
//Send Post
http.post('https://jsonplaceholder.typicode.com/users', data)
.then(data => console.log(data))
.catch(err => console.log(err));

// Update post http put
http.put('https://jsonplaceholder.typicode.com/users/2', data)
.then(data => console.log(data))
.catch(err => console.log(err));

http.delete('https://jsonplaceholder.typicode.com/users/2')
.then(data => console.log(data))
.catch(err => console.log(err));