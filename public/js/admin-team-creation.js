$(() => {
    $('.create-new-team').submit(function() {
        let teamNumber = $('input[name="team-number"').val();
        let memberEmails = $('textarea[name="members"]').val().split(',');
        memberEmails.forEach(email => {
            //Loop through members to see if each exists
            $.get('/api/users/' + email)
                .then(member => {
                    alert(member.email);
                    //Check if the member is already part of a team  
                    if (member.hasTeam) {
                        alert('here');
                        errorHandler('Email ' + member.email + ' is already associated with a team!');
                    }
                })
                .catch((err) => {
                    //Email doesn't exist
                    errorHandler(err);
                })
            //Loop through members to see if they already have a team
        });

        //Create the team
        //Check if team number is already taken
        $.get('/api/teams/' + teamNumber)
            //Team already exists
            .then(team => {
                errorHandler('Team number already exists!');
            })
            //Team doesn't exist yet
            .catch(() => {
                team = {
                    teamNumber: teamNumber
                }
                //Creates team
                $.ajax({ url: "/api/teams", type: "POST", data: team })
                    .then(() => {
                        //For each member of the team, add the team number to the database
                        memberEmails.forEach(email => {
                            $.get('/api/users/' + email)
                                .then(user => {
                                    user.hasTeam = true;
                                    user.teamNumber = teamNumber;
                                    $.ajax({url: '/api/users/' + email, type: 'PUT', data: user})
                                        .catch(err => {
                                            errorHandler(err);
                                        })

                                    successHandler();
                                })
                                .catch(err => {
                                    errorHandler(err);
                                })
                })
                    })
                    .catch((err) => {
                        alert('here');
                        errorHandler(err);
                    })
            })
            
        
    });
})()

// Attempts to log the given error as well as exits the script
function errorHandler(err) {
    $('.container').html('There was an error processing your request: ' + err);
	$(this).hide();

	setTimeout(location.reload.bind(location), 3000);

	// Exits script
	throw new Error(err.message);
}

// successHandler is the logic that runs when everything doesn't blow up
function successHandler() {
	$('.container').html('Success! Redirecting you in 3 seconds.')
    $(this).hide();
    
	setTimeout(location.reload.bind(location), 3000);
}
