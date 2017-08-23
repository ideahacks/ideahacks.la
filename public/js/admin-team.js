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
    })
}
$(document).ready(main); 