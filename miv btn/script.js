$(function() {
    
    save = $('tr:contains("Скан-копия ТТН")').children('td').eq(3).children('a');
    save.addClass('go-to-top');
    
})

function log (msg) {
    console.log(msg);
}