const button1 = document.getElementById('button1').addEventListener('click', getText);
const button2 = document.getElementById('button2').addEventListener('click', getJson);
const button3 = document.getElementById('button3').addEventListener('click', getExternal);

//Get local text file data
function getText() {
    fetch('test.txt')
    .then(res => res.text())
    .then(data => {
        document.getElementById('output').innerHTML = data;
    })
    .catch(err => console.log(err));
};

//Get local json file data
function getJson() {
    fetch('posts.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let output = '';
        data.forEach(post => {
            output += `<ul>
            <li>Title: ${post.title}</li>
            <li>Title: ${post.body}</li>
            </ul>
            `;
        });
        console.log(output);
        document.getElementById('output').innerHTML = output;

    })
    .catch(err => console.log(err));
}

// Get external
function getExternal() {
    fetch('https://api.github.com/users')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        let output = '';
        data.forEach(function(user){
            output += `<ul>
            <li>Login: ${user.login}</li>
            </ul>
            `;
        });
        console.log(output);
        document.getElementById('output').innerHTML = output;
    })
    .catch(err => console.log(err));
}
