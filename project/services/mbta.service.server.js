var app = require("../../express");
var request = require('request');

var mbta_key = process.env.MBTA_KEY;
if (!mbta_key) {
    mbta_key = "wX9NwuHnZU2ToO7GmGR9uw";
}

app.get("/api/project/stops", allStops);
app.get("/api/project/predictions/:stopId", predictions);

function allStops(req, res) {
    request("http://realtime.mbta.com/developer/api/v2/routes?api_key=" + mbta_key + "&format=json", function (err, result, body) {
        var j = JSON.parse(body);
        var routes = [];
        for (m in j.mode) {
            var mode = j.mode[m];
            if (mode.mode_name == "Subway") {
                for (var r in mode.route) {
                    var route = mode.route[r];
                    routes.push(route.route_id);
                }
            }
        }

        stopsForAllRoutes([], routes, function (s) {
            res.send(s);
        })
    })
}

function stopsForAllRoutes(stops, routesRemaining, callback) {
    if (routesRemaining.length == 0) {
        callback(stops);
        return;
    }

    stopsForRoute(routesRemaining[0], stops, function () {
        stopsForAllRoutes(stops, routesRemaining.slice(1), callback);
    })
}

function stopsForRoute(routeId, stops, callback) {
    request("http://realtime.mbta.com/developer/api/v2/stopsbyroute?api_key=" + mbta_key + "&route=" + routeId + "&format=json", function (err, result, body) {
        var j = JSON.parse(body);
        for (var s in j.direction[0].stop) {
            var ss = j.direction[0].stop[s];
            stops.push({name: ss["parent_station_name"], code: ss["parent_station"]});
            // stops[ss["parent_station_name"]] = ss["parent_station"];
        }
        for (var s in j.direction[1].stop) {
            var ss = j.direction[1].stop[s];
            stops.push({name: ss["parent_station_name"], code: ss["parent_station"]});
            // stops[ss["parent_station_name"]] = ss["parent_station"];
        }

        callback(stops);
    })
}

function predictions(req, res) {
    var stopId = req.params.stopId;
    request("http://realtime.mbta.com/developer/api/v2/predictionsbystop?api_key=" + mbta_key + "&stop=" + stopId + "&format=json", function (err, result, body) {
        var trips = [];
        var j = JSON.parse(body);
        for (var m in j.mode) {
            var mode = j.mode[m];
            if (mode.mode_name == "Subway") {
                for (var r in mode.route) {
                    for (var d in mode.route[r].direction) {
                        var one = mode.route[r].direction[d].trip[0];
                        var one_obj = {
                            control: one.trip_headsign,
                            time: Math.floor(one.pre_away / 60),
                            line: mode.route[r].route_name
                        };
                        trips.push(one_obj);
                    }
                }
            }
        }

        res.send(trips);
    })
}