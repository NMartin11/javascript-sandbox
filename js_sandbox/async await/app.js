async function getUsers() {
    // await response of the fetch call
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    // only proceed once its resolved
    const data = await response.json();
    // only proceed once second promise is resolved
    return data;
}

getUsers().then(users => console.log(users));