// programm Stopwatch;
// works with multiply containers which contains class "stopwatch"
// if you'd like to have two Stopwatch-appplications on your screen => 
// just take of comments from "second container" and "stopwatch" divs in index.html
// enjoy your Flight@


const stopwatch = document.querySelectorAll('.stopwatch').forEach(el => {
    new Stopwatch(el);
});