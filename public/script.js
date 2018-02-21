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
    let position = $('.bedroom-filter').position();
$('.dropdown-bedroom-filter').css('top', 49);
$('.dropdown-bedroom-filter').css('left', position.left);

    $('.dropdown-bedroom-filter').toggleClass('visible');
});

$('.sort').click(function(){
    position = $('.sort').position();
    $('.dropdown-sort-filter').css('position', 'absolute');
    $('.dropdown-sort-filter').css('top', 49);
    $('.dropdown-sort-filter').css('left', position.left);

    $('.dropdown-sort-filter').toggleClass('visible');
});

$('.budget').click(function(){
    position = $('.budget').position();
    $('.dropdown-budget-filter').css('position', 'absolute');
    $('.dropdown-budget-filter').css('top', 49);
    $('.dropdown-budget-filter').css('left', position.left);

    $('.dropdown-budget-filter').toggleClass('visible');
});

$('.results').click(function(){
    $('.dropdown').addClass('visible');
    $('.dropdown-bedroom-filter').addClass('visible');
    $('.dropdown-sort-filter').addClass('visible');
})



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var sortCat = document.getElementById('sort-cat');
if(getParameterByName('sorted') == "ASC"){
    sortCat.innerHTML = "Price: Low to High";
}else if(getParameterByName('sorted') == "DESC"){
    sortCat.innerHTML = "Price: High to Low";
}else if(getParameterByName('sorted') == "POP"){
    sortCat.innerHTML = "Popularity";
}else if(getParameterByName('sorted') == "RAT"){
    sortCat.innerHTML = "Seller Rating";
}else{
    sortCat.innerHTML = "Relevance";
}

if(getParameterByName('rental')){
    document.getElementsByClassName('content')[0].innerHTML = "Rent";
    $('.buy').removeClass('selected');
    $('.rent').addClass('selected');
}else{
    document.getElementsByClassName('content')[0].innerHTML = "Buy";
    $('.buy').addClass('selected');
    $('.rent').removeClass('selected');
}

body = '';
    
    if(getParameterByName('city')){
        id = {
            11: "Gurgaon",
            18: "Mumbai",
            16: "Kolkata"
        }
        body += '<span class = "filter-item">' + 'City' + ': '+ id[getParameterByName('city')] + '</span>';
    }

    if(getParameterByName('bhk')){
        body += '<span class = "filter-item">' + 'BHKs' + ': '+ getParameterByName('bhk') + '<a href = "/filter?remove=bhks"><i class="fa fa-times" aria-hidden="true"></i></a></span>';    
    }

    if(getParameterByName('toPrice')){
        body += '<span class = "filter-item">' + 'Budget: Maximum' + ': '+ getParameterByName('toPrice') + '<a href = "/filter?remove=toPrice"><i class="fa fa-times" aria-hidden="true"></i></a></span>';    
    }

    if(getParameterByName('fromPrice')){
        body += '<span class = "filter-item">' + 'Budget: Minimum' + ': '+ getParameterByName('fromPrice') + '<a href = "/filter?remove=fromPrice"><i class="fa fa-times" aria-hidden="true"></i></a></span>';    
    }

    document.getElementById('main').innerHTML = body;

    

// Get the button that opens the modal


function openModal(id){
    document.getElementById('modal'+id).style.display = 'block';
}

function closeModal(id){
    document.getElementById('modal'+id).style.display = 'none';
}

let modal = document.getElementsByClassName('modal')[0];

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 

function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(28.4595, 77.0266),
        zoom: 10,
        mapTypeId: 'roadmap'
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
} 
