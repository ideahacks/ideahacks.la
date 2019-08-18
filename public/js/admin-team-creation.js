$(() => {
    $('.create-new-team').submit(function() {
        let teamNumber = $('input[name="team-number"').val();
        let members = $('textarea[name="members"]').val().split(',');
        alert(members[0]);
    })
})