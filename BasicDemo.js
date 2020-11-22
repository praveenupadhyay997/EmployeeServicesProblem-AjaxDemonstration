// Activity A
function showTime()
{
    const date = new Date();
    return "Hour:"+date.getHours()+"Minute:"+date.getMinutes()+"Second:"+date.getSeconds();
}
// Activity B
function showSessionExpirations() 
{
    console.log("Activity B- Your Session expired at "+ showTime());
}

console.log("Activity A- Triggering Activity-B at "+showTime());
// Since the operation is facing lag the control will move to the subsequent line of codes and then after the lag will execute this
setTimeout(showSessionExpirations, 5000);
console.log("Activity A- Triggering Activity-B at "+showTime()+" will execute after 5 seconds");