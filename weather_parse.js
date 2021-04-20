autowatch = 1;

var myDict = new Dict("weatherDataTemp");

function parseDict()
{
    var dataAsString = myDict.get("body");
    var parseDict = new Dict("parseDict");

    parseDict.parse(dataAsString);
    outlet(0, parseDict.name);
}