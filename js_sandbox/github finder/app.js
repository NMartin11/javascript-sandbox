// INIT Github
const github = new Github;
// INIT UI
const ui = new UI; 
// Search input
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
    // get input text
    const userText = e.target.value;
    if(userText !== '') {
        //Make http call
        github.getUser(userText)
        .then(data => {
            console.log(data);
            if(data.profile.message === 'Not Found') {
                // Show alert
                ui.showAlert('user not found', 'alert alert-danger');

            } else {
                // Show Profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        })
    } else {
        // Clear profile
        ui.clearProfile();
    }
});