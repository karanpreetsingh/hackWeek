$('.filter').width($('.result-content').width()-1);

$(window).resize(function(){
    $('.filter').width($('.result-content').width()-1);
});

$('.buy-filter').click(function(){
    $('.dropdown').toggleClass('visible');
});

$('.search').focus(function(){
    $('.fa-search').addClass('selected');
    $('.fa-search').animate({'transform':'translate(650, 0)'}, 500);
})

$('.search').blur(function(){
    $('.fa-search').removeClass('selected');
})

$('.bedroom-filter').click(function(){
    $('.dropdown-bedroom-filter').toggleClass('visible');
});

$('.sort').click(function(){
    $('.dropdown-sort-filter').toggleClass('visible');
});

$('.results').click(function(){
    $('.dropdown').addClass('visible');
    $('.dropdown-bedroom-filter').addClass('visible');
    $('.dropdown-sort-filter').addClass('visible');
})



let position = $('.bedroom-filter').position();
$('.dropdown-bedroom-filter').css('top', 49);
$('.dropdown-bedroom-filter').css('left', position.left);

position = $('.sort').position();
$('.dropdown-sort-filter').css('position', 'absolute');
$('.dropdown-sort-filter').css('top', 49);
$('.dropdown-sort-filter').css('left', position.left);
