const dateFormat = function (timeStr) {
  if(timeStr==null){
    return null;
  }
  var date = new Date(timeStr);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDay();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

module.exports.dateFormat = dateFormat