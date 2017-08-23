var main = function(){
    $('form').submit(function(event) {
        let $input = $(event.target).find('input');
        let team = $input.val();
        let members = [];
        
        $('.member-email').each(function(){
            console.log("hello")
            members.push($(this).val)
        })
        members.reverse();
        
        $.ajax({
            url: '/admin/team',
            type: 'POST',
            dataType: 'json',
            data: json
        });
$(document).ready(() => {
  $('form').submit(e => {
    e.preventDefault()

    let teamMembers = []
    $('.member-email').each(function(i, el) {
      teamMembers.push(el.value)
    })

    let teamData = {
      teamName: $('.team-name').val(),
      teamNumber: $('.team-number').val(),
      members: teamMembers,
      parts: []
    }

    $.ajax({ url: '/admin/teams', type: 'POST', data: teamData }).done()
  })
})
