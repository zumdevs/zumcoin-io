
function Flight(a, b) {
    this.map = a,
    this.svg = b,
    this.curZoom = this.map.getZoom(),
    this.beginPoint = {
        lat: 0,
        lng: 0
    },
    this.endPoint = {
        lat: 0,
        lng: 0
    },
    this.bp_px = null,
    this.ep_px = null,
    this.group = null,
    this.bp_circle = null,
    this.ep_circle = null,
    this.radius = 6 * this.curZoom / 3,
    this.plane = null, this.pos_plane = {
        x: 0,
        y: 0
    },
    this.w_plane = 64, this.h_plane = 64, this.spos = 0, this.rot = 0, this.midPoint = {
        lat: 0,
        lng: 0
    },
    this.mp_px = null,
    this.road = null,
    this.road_points = null,
    this.group_road = null,
    this.clipPath = null,
    this.clipPath_rect = null,
    this.planeColor = "white",
    this.roadColor = "white",
    this.beginColor = "blue",
    this.endColor = "red",
    this.isCleaning = !1,

    this.init = function(a, b) {
        this.beginPoint.lat = a.lat,
        this.beginPoint.lng = a.lng,
        this.bp_px = this.map.latLngToLayerPoint([a.lat, a.lng]),
        this.endPoint.lat = b.lat,
        this.endPoint.lng = b.lng,
        this.ep_px = this.map.latLngToLayerPoint([b.lat, b.lng]),
        this.pos_plane.x = this.bp_px.x,
        this.pos_plane.y = this.bp_px.y;
        
        var c = Math.random() < .5 ? -1 : 1
        var d = (a.lat + b.lat) / 2
        var e = (a.lng + b.lng) / 2

        this.midPoint.lat = (a.lat + b.lat) / 2 + Math.random() * d * .25 * c,
        this.midPoint.lng = (a.lng + b.lng) / 2 + Math.random() * e * .25 * c,
        this.mp_px = this.map.latLngToLayerPoint([this.midPoint.lat, this.midPoint.lng]),
        this.group = this.svg.append("g"),

        this.road_points = [
            [this.bp_px.x, this.bp_px.y],
            [this.mp_px.x, this.mp_px.y],
            [this.ep_px.x, this.ep_px.y]
        ],

        this.clipPath = this.group.append("defs").append("clipPath").attr("id", "aaa").attr("clip-rule", "evenodd");
        
        var f = this.getClipRect(this.bp_px, this.mp_px, this.pos_plane);
        this.clipPath_rect = this.clipPath.append("rect").attr("x", f[0]).attr("y", f[1]).attr("width", f[2]).attr("height", f[3]),
        this.group_road = this.group.append("g")
        this.group_road.attr("clip-path", "url(#aaa)"),
        this.road = this.group_road.append("path").datum(this.road_points).attr("stroke", this.roadColor).attr("stroke-width", 1.5).attr("stroke-dasharray", "10 5").attr("fill", "none").attr("d", d3.line().curve(d3.curveBundle.beta(.5))),
        this.bp_circle = this.group.append("circle").attr("fill", this.beginColor),
        this.ep_circle = this.group.append("circle").attr("fill", this.endColor),
        this.load_plane()
    },
    this.getClipRect = function(a, b, c) {
        var d, e, f, g, h, i;
        return d = Math.min(a.x, c.x), e = Math.min(a.y, c.y), f = Math.max(a.x, c.x), g = Math.max(a.y, c.y), Math.abs(this.ep_px.x - this.bp_px.x) >= Math.abs(this.ep_px.y - this.bp_px.y) ? (h = 0, i = 800) : (h = 800, i = 0), [d - h, e - i, f - d + 2 * h, g - e + 2 * i]
    },
    this.load_plane = function() {
        var a = this.w_plane,
            b = this.h_plane,
            c = this.pos_plane.x,
            d = this.pos_plane.y,
            e = this.spos + .01,
            f = this.road.node().getTotalLength(),
            g = this.road.node().getPointAtLength(e * f),
            h = Victor(g.x - c.x, g.y - c.y).angleDeg();

        this.rot = h + 45;
        this.spos;
        this.plane = this.group.append("g").attr("transform", function() {

            var e = "translate(" + c + "," + d + ")",
                f = "rotate(" + h + ")",
                g = "scale(0)",
                i = "translate(" + a / -2 + "," + b / -2 + ")";
            return e + f + g + i
        }).attr("fill", this.planeColor), this.plane.append("path").attr("d", this.d_plane)
    },
    this.render = function() {
        var a = this.getClipRect(this.bp_px, this.mp_px, this.pos_plane);
        this.clipPath_rect.attr("x", a[0]).attr("y", a[1]).attr("width", a[2]).attr("height", a[3]), this.road_points = [
            [this.bp_px.x, this.bp_px.y],
            [this.mp_px.x, this.mp_px.y],
            [this.ep_px.x, this.ep_px.y]
        ],
        this.road.datum(this.road_points).attr("d", d3.line().curve(d3.curveBundle.beta(.5))),
        this.bp_circle.attr("cx", this.bp_px.x).attr("cy", this.bp_px.y).attr("r", this.radius),
        this.ep_circle.attr("cx", this.ep_px.x).attr("cy", this.ep_px.y).attr("r", this.radius);

            var b = this.w_plane,
                c = this.h_plane,
                d = this.pos_plane.x,
                e = this.pos_plane.y,
                f = this.rot,
                g = this.spos,
                h = d3.scaleLinear().domain([0, .9, 1]).range([.3, .5, 0]);
        this.plane.attr("transform", function() {
            var a = "translate(" + d + "," + e + ")",
                i = "rotate(" + f + ")",
                j = "scale(" + h(g) + ")",
                k = "translate(" + b / -2 + "," + c / -2 + ")";
            return a + i + j + k
        })
    },
    this.update = function() {
        this.curZoom = this.map.getZoom(),
        this.radius = 6 * this.curZoom / 3,
        this.bp_px = this.map.latLngToLayerPoint([this.beginPoint.lat, this.beginPoint.lng]),
        this.ep_px = this.map.latLngToLayerPoint([this.endPoint.lat, this.endPoint.lng]),
        this.mp_px = this.map.latLngToLayerPoint([this.midPoint.lat, this.midPoint.lng]),
        this.road_points = [
            [this.bp_px.x, this.bp_px.y],
            [this.mp_px.x, this.mp_px.y],
            [this.ep_px.x, this.ep_px.y]
        ],
        this.road.datum(this.road_points).attr("d", d3.line().curve(d3.curveBundle.beta(.5))), this.spos = this.spos <= 1 ? this.spos + .01 : this.spos;
            var a = this.road.node().getTotalLength(),
                b = this.road.node().getPointAtLength(this.spos * a);
            this.pos_plane.x = b.x, this.pos_plane.y = b.y;

            var c = this.spos <= 1 ? this.spos + .01 : this.spos,
                d = this.road.node().getPointAtLength(c * a),
                e = Victor(d.x - this.pos_plane.x, d.y - this.pos_plane.y).angleDeg();
            this.rot = e + 45
    },
    this.setPlaneColor = function(a) {
        this.planeColor = a, this.plane && this.plane.attr("fill", a)
    },
    this.setRoadColor = function(a) {
        this.roadColor = a, this.road && this.road.attr("stroke", a)
    },
    this.setBeginColor = function(a) {
        this.beginColor = a, this.bp_circle && this.bp_circle.attr("fill", a)
    },
    this.setEndColor = function(a) {
        this.endColor = a, this.ep_circle && this.ep_circle.attr("fill", this.endColor)
    },
    this.isEnd = function() {
        return Math.abs(this.spos - 1) < 1e-4
    },
    this.delete = function() {
        this.bp_circle.transition().duration(500).style("opacity", "0.0").attr("r", 0).remove(), this.road.transition().duration(1e3).style("opacity", "0.0").attr("stroke-width", 0).remove(), this.ep_circle.transition().duration(1500).style("opacity", "0.0").attr("r", 0).remove(), this.group.transition().delay(1500).style("opacity", "0.0").remove()
    },
    this.d_plane = "M0,5a5,5 0 1,0 10,0a5,5 0 1,0 -10,0"
}