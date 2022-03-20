var mesos = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
var dies = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thersday',
    'Friday',
    'Saturday'
];
var dies_abr = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
];
Number.prototype.pad = function(num) {
    var str = '';
    for(var i = 0; i < (num-this.toString().length); i++)
        str += '0';
    return str += this.toString();
}
function calendari(widget, data)
{
    var original = widget.getElementsByClassName('actiu')[0];
    if(typeof original === 'undefined')
    {
        original = document.createElement('table');
        original.setAttribute('data-actual',
                  data.getFullYear() + '/' +
                  data.getMonth().pad(2) + '/' +
                  data.getDate().pad(2))
        widget.appendChild(original);
    }
    var diff = data - new Date(original.getAttribute('data-actual'));
    diff = new Date(diff).getMonth();
    var e = document.createElement('table');
    e.className = diff  === 0 ? 'amagat-esquerra' : 'amagat-dreta';
    e.innerHTML = '';
    widget.appendChild(e);
    e.setAttribute('data-actual',
                   data.getFullYear() + '/' +
                   data.getMonth().pad(2) + '/' +
                   data.getDate().pad(2))
    var fila = document.createElement('tr');
    var titol = document.createElement('th');
    titol.setAttribute('colspan', 7);
    var boto_prev = document.createElement('button');
    boto_prev.className = 'boto-prev';
    boto_prev.innerHTML = '&#9666;';
    var boto_next = document.createElement('button');
    boto_next.className = 'boto-next';
    boto_next.innerHTML = '&#9656;';
    titol.appendChild(boto_prev);
    titol.appendChild(document.createElement('span')).innerHTML = 
        mesos[data.getMonth()] + '<span class="any">' + data.getFullYear() + '</span>';
    titol.appendChild(boto_next);
    boto_prev.onclick = function() {
        data.setMonth(data.getMonth() - 1);
        calendari(widget, data);
    };
    boto_next.onclick = function() {
        data.setMonth(data.getMonth() + 1);
        calendari(widget, data);
    };
    fila.appendChild(titol);
    e.appendChild(fila);
    fila = document.createElement('tr');
    for(var i = 1; i < 7; i++)
    {
        fila.innerHTML += '<th>' + dies_abr[i] + '</th>';
    }
    fila.innerHTML += '<th>' + dies_abr[0] + '</th>';
    e.appendChild(fila);

    var inici_mes =
        new Date(data.getFullYear(), data.getMonth(), -1).getDay();
    var actual = new Date(data.getFullYear(),
              data.getMonth(),
              -inici_mes);
    
    for(var s = 0; s < 6; s++)
    {
        var fila = document.createElement('tr');
        for(var d = 1; d < 8; d++)
        {
        var cela = document.createElement('td');
        var span = document.createElement('span');
        cela.appendChild(span);
            span.innerHTML = actual.getDate();
            if(actual.getMonth() !== data.getMonth())
                cela.className = 'fora';
           
            if(data.getDate() == actual.getDate() &&
           data.getMonth() == actual.getMonth())
        cela.className = 'avui';
        actual.setDate(actual.getDate()+1);
            fila.appendChild(cela);
        }
        e.appendChild(fila);
    }
    setTimeout(function() {
        e.className = 'actiu';
        original.className +=
        diff === 0 ? ' amagat-dreta' : ' amagat-esquerra';
    }, 20);
    original.className = 'inactiu';
    setTimeout(function() {
        var inactius = document.getElementsByClassName('inactiu');
        for(var i = 0; i < inactius.length; i++)
            widget.removeChild(inactius[i]);
    }, 1000);
}
calendari(document.getElementById('calendari'), new Date());


/*date and time script*/
document.getElementById("para1").innerHTML = formatAMPM();

function formatAMPM() {
var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear();
}




document.getElementById("para2").innerHTML = formatAMPM();

function formatAMPM() {
var d = new Date(),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    ampm = d.getHours() >= 12 ? 'pm' : 'am',
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
return days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear();
}

/*stop watch*/
//Define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

//Define vars to hold "display" value
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

//Define var to hold setInterval() function
let interval = null;

//Define var to hold stopwatch status
let status = "stopped";

//Stopwatch function (logic to determine when to increment next value, etc.)
function stopWatch(){

    seconds++;

    //Logic to determine when to increment next value
    if(seconds / 60 === 1){
        seconds = 0;
        minutes++;

        if(minutes / 60 === 1){
            minutes = 0;
            hours++;
        }

    }

    //If seconds/minutes/hours are only one digit, add a leading 0 to the value
    if(seconds < 10){
        displaySeconds = "0" + seconds.toString();
    }
    else{
        displaySeconds = seconds;
    }

    if(minutes < 10){
        displayMinutes = "0" + minutes.toString();
    }
    else{
        displayMinutes = minutes;
    }

    if(hours < 10){
        displayHours = "0" + hours.toString();
    }
    else{
        displayHours = hours;
    }

    //Display updated time values to user
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}



function startStop(){

    if(status === "stopped"){

        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        status = "started";

    }
    else{

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        status = "stopped";

    }

}

//Function to reset the stopwatch
function reset(){

    window.clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("display").innerHTML = "00:00:00";
    document.getElementById("startStop").innerHTML = "Start";

}  
