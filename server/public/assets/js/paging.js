
var lastX = 0;
var currentX = 0;
var page = 1;

$(window).scroll(function () {
    if (typeof (maxPages) !== 'undefined' && page < maxPages) {
        currentX = $(window).scrollTop();
        if (currentX - lastX > 200 * page) {
            lastX = currentX;
            page++;
            $.post('/page', { page: page }, function (data, status) {
                $('#items').append(data);
            });
        }
    }
});

$("#load").click(function () {
    console.log("load");
    if (typeof (maxPages) !== 'undefined' && page < maxPages) {
        lastX = currentX;
        page++;
        $.post('/page', { page: page }, function (data, status) {
            $('#items').append(data);
        });
    }
});



$.post("/trend", { a: 1 }, function (data, status) {
    // console.log(data);
    $('#trend').append(data);
});

function mySearch(evt) {
    evt.preventDefault();
    console.log($(evt.target).serialize());
    return false;
}

$("form#formSearch").submit(function (e) {
    e.preventDefault(e);

    $.post("/search", $(e.target).serialize(), function (data, status) {
        // console.log(data);
        $('#search').append(data);
    });

});

function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}

var date = new Date($("#date").text());

if (date) {
    $("#date").text(moment(date).format('l'));
}


function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}


$("#subsribe").submit(function (e) {
    e.preventDefault();
    let mail = $("#mail").val();


    if (ValidateEmail(mail) == false) {
        alert("Invalid email format");
        return false
    } else {

        $.post("/subscribe", { mail: mail }, function (data, status) {
            // console.log(data);

            if (status == 'success') {
                alert(data.message);
            }
        });
    }


});

