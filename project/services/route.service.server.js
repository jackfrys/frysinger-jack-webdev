var app = require("../../express");
var request = require("request");

var routes = [
    {_id:1, owner:2, public:false, children: true, steps:[
        {_id:1, order:1, type:"BOARD", place:"place-nuniv"},
        {_id:1, order:2, type:"END", place:"place-heath"}
    ]}
];

app.get("/api/project/route/:rid", getRouteForId);
app.put("/api/project/route/:rid", updateRoute);
app.get("/api/project/user/:uid/routes", routesForUser);
app.get("/api/project/traveler/:uid/routes", routesForTraveler);

function getRouteForId(req, res) {
    var routeId = req.params.rid;
    var rs = [];
    for (var r in routes) {
        if (routes[r]._id == routeId) {
            rs.push(routes[r]);
        }
    }
    res.send(rs);
}

function updateRoute(req, res) {
    var rs = [];
    for (var r in routes) {
        if (routes[r]._id == req.params.rid) {
            rs.push(req.body);
        } else {
            rs.push(routes[r]);
        }
    }
    routes = rs;
    res.send(200);
}

function routesForUser(req, res) {
    var rs = [];
    for (var r in routes) {
        if (routes[r].owner == req.params.uid) {
            rs.push(routes[r]);
        }
    }
    res.send(rs);
}