$(function() {
    
    save = $('tr:contains("Скан-копия ТТН")').children('td').eq(3).children('a');
    save.addClass('go-to-top');

    run = $('button[name=register]');
    run.addClass('go-to-top-next');
    
})

function log (msg) {
    console.log(msg);
}