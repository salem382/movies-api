
/*start sidebar */

let animateLinks = Array.from(document.querySelectorAll('.links > li'));

function openSidebar () {
    $('.sideBar').css({
        left:0
    })
    $('.sideBar .open-sidebar .open-icon svg').remove();
    $('.sideBar .open-sidebar .open-icon').append('<i class="fa-solid fa-xmark"></i>');

        setTimeout(() => {
            $(`.sideBar .links li:nth-of-type(1)`).css({
                top: '50px',
                opacity: '1'
            })
        },10)
        setTimeout(() => {
            $(`.sideBar .links li:nth-of-type(2)`).css({
                top: '100px',
                opacity: '1'
            })
        },150)
        setTimeout(() => {
            $(`.sideBar .links li:nth-of-type(3)`).css({
                top: '150px',
                opacity: '1'
            })
        },300)
        setTimeout(() => {
            $(`.sideBar .links li:nth-of-type(4)`).css({
                top: '200px',
                opacity: '1'
            })
        },450)
        setTimeout(() => {
            $(`.sideBar .links li:nth-of-type(5)`).css({
                top: '250px',
                opacity: '1'
            })
        },600)
        setTimeout(() => {
            $(`.sideBar .links li:nth-of-type(6)`).css({
                top: '300px',
                opacity: '1'
            })
        },750)
       
}

function closeSidebar () {
    $('.sideBar').css({
        left:'-' + $('.sideBar .links').innerWidth() + 'px'
    })
    $('.sideBar .open-sidebar .open-icon svg').remove();
    $('.sideBar .open-sidebar .open-icon').append('<i class="fa-solid fa-bars"></i>');
    $('.links > li').css({
        top:'400px',
        opacity: '0'
    })
}

$('.sideBar .open-sidebar .open-icon').click(function () {

    if ($('.sideBar').css('left') == '0px') {
        closeSidebar();
    } else {
        openSidebar ();
    }
});

/*End sidebar */

/*start input */

$(' input').keyup(function () {

    if ($(this).val() == '') {
        $('#' + $(this).data('ipt')).css({
            opacity: '1'
        })
    } else {
        $('#' + $(this).data('ipt')).css({
            opacity: '0'
        })
    }
})

/*End input */

/*start Contact rgx*/


let nameRgx =(str) => /^([A-Za-z]|[0-9]){1,}$/.test(str);
let phoneRgx = (str) => /^(011|012|015|010){1}[0-9]{8}$/.test(str);
let containsNum = (str) => /[0-9]/.test(str);
let containsStr = (str) => /[A-Za-z]/.test(str);
let emailValid = (str) => /^[a-zA-Z]{1,}[0-9]{0,}@{1}[a-zA-Z]{1,}.{1}[a-zA-Z]{2,}$/.test(str);


$('#NameInput').blur (function () {

    if (nameRgx($('#NameInput').val()) == false) {
        $('#NameAlert').css({display:'block'})
    }
    else {
        $('#NameAlert').css({display:'none'})
    }
})
$('#NameInput').keyup (() => {

    if (nameRgx($('#NameInput').val()) == false) {
        $('#NameAlert').css({display:'block'})
    }
    else {
        $('#NameAlert').css({display:'none'})
    }
})

$('#phoneInput').blur (() => {

    if (phoneRgx($('#phoneInput').val()) == false) {
        $('#phoneAlert').css({display:'block'})
    }
    else {
        $('#phoneAlert').css({display:'none'})
    }
})
$('#phoneInput').keyup (() => {

    if (phoneRgx($('#phoneInput').val()) == false) {
        $('#phoneAlert').css({display:'block'})
    }
    else {
        $('#phoneAlert').css({display:'none'})
    }
})


$('#inputPassword').blur (() => {

    if ($('#inputPassword').val().length < 8) {
        $('#alertPassword').css({display:'block'})
    }
    else {
        if (containsNum($('#inputPassword').val())) {
           if (containsStr($('#inputPassword').val())) {
            $('#alertPassword').css({display:'none'})    
           }
        } else {
            $('#alertPassword').css({display:'block'})
        }
    }
})

$('#inputPassword').keyup (() => {

    if ($('#inputPassword').val().length < 8) {
        $('#alertPassword').css({display:'block'})
    }
    else {
        if (containsNum($('#inputPassword').val())) {
           if (containsStr($('#inputPassword').val())) {
            $('#alertPassword').css({display:'none'})    
           }
        } else {
            $('#alertPassword').css({display:'block'})
        }
    }
})

$('#emailInput').blur (() => {

    if (emailValid($('#emailInput').val()) == false) {
        $('#emailAlert').css({display:'block'})
    }
    else {
        $('#emailAlert').css({display:'none'})
    }
})


$('#emailInput').keyup (() => {

    if (emailValid($('#emailInput').val()) == false) {
        $('#emailAlert').css({display:'block'})
    }
    else {
        $('#emailAlert').css({display:'none'})
    }
})

/*End Contact rgx*/

/* start fetch data */

let mvsArray = [];
let key = 'db1fc41949e531723662d766a8409954';

//fetch data by links

async function fetchData (word) {
    if (word == 'trending') {
        var url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`
    } else {
        var url = `https://api.themoviedb.org/3/movie/${word}?api_key=${key}&language=en-US&page=1`
    }
    let items = ``;

    let res = await fetch(url);
    let data = await res.json ();

    myIt = data.results;
    mvsArray = [...myIt];

    myIt.forEach((_, ind) => {
        items += `
        
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="mv-content">
                <h3>${myIt[ind].original_title}</h3>
                <div class="overlay">
                    <p class="desc">
                        ${myIt[ind].overview}
                    </p>
                    <p class="rate">
                        Rate : <span>${myIt[ind].vote_average}</span>
                    </p>
                    <p class="year">${myIt[ind].release_date}</p>
                </div>
            </div>
        </div>
        
        `
    });

    $('.mvs .basic-mv').html(items)

}

fetchData ('now_playing');

const allLinks = Array.from(document.querySelectorAll('.links li > a'));

allLinks.forEach((ele) => {

    ele.addEventListener('click',(e) => {

        fetchData(e.target.getAttribute('id'));
    })
})


// search in data

function search () {
    $('#searchInput').keyup(function () {
        let newArr = [];

        let searchedWord = $(this).val();
        mvsArray.forEach((ele) => {
            if (ele.original_title.toLowerCase().includes(searchedWord) && searchedWord != '') {
                newArr.push(ele)
            }
        })
        console.log (newArr)
        showItems(newArr);
    })
}
search ();

function showItems (arr) {

    let items = '';

    arr.forEach((ele) => {
        items += `
        
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="mv-content">
                <h3>${ele.original_title}</h3>
                <div class="overlay">
                    <p class="desc">
                        ${ele.overview}
                    </p>
                    <p class="rate">
                        Rate : <span>${ele.vote_average}</span>
                    </p>
                    <p class="year">${ele.release_date}</p>
                </div>
            </div>
        </div>
        
        `
    });
    $('.mvs .searched-mv').html(items)
}



//search by movie

async function get (searchedLetter) {

    let res = await fetch (`http://api.tmdb.org/3/search/movie?api_key=${key}&query=${searchedLetter}&year=2008&language=en`);
    let data = await res.json ();

    myIt = data.results;
    let items = '';
    mvsArray = [...myIt];
    myIt.forEach((_, ind) => {
        items += `
        
        <div class="col-lg-4 col-md-6 col-sm-12">
            <div class="mv-content">
                <h3>${myIt[ind].original_title}</h3>
                <div class="overlay">
                    <p class="desc">
                        ${myIt[ind].overview}
                    </p>
                    <p class="rate">
                        Rate : <span>${myIt[ind].vote_average}</span>
                    </p>
                    <p class="year">${myIt[ind].release_date}</p>
                </div>
            </div>
        </div>
        
        `
    });

    $('.mvs .basic-mv').html(items)
}

$('#getMovieInput').keyup(function () {

    let ltr = $(this).val();

    get(ltr);
})
