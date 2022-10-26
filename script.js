window.onload = function() {
    Crafty.init(400, 400, document.getElementById("stage"));
    // A blue block, controlled by arrow keys

    var assetsObj = {
        "sprites": {
            "Assets/DVD_logoSmall.png": {
                // This is the width of each image in pixels
                tile: 50,
                // The height of each image
                tileh: 25,
                // We give names to three individual images
                map: {
                    dvd_image: [0, 0],
                }
            }
        }
    };
    Crafty.load(assetsObj, () => {})

    var floor = Crafty.e("2D, Canvas, Color, platform")
        .attr({x: 0, y: 390, w: 400, h: 10})
        .color("gray")
    var wall1 = Crafty.e("2D, Canvas, Color, platform")
        .attr({x: 0, y: 0, w: 10, h: 400})
        .color("gray")
    var wall2 = Crafty.e("2D, Canvas, Color, platform")
        .attr({x: 390, y: 0, w: 10, h: 400})
        .color("gray")
    var ceiling = Crafty.e("2D, Canvas, Color, platform")
        .attr({x: 0, y: 0, w: 400, h: 10})
        .color("gray")

    document.getElementById("standard").addEventListener("click", function() {
        Crafty("square").destroy()

        var i = 0
        while (i < 1000) {
            window["square" + i] = Crafty.e("2D, Canvas, Color, Gravity, square")
                .attr({x: 200, y: 100, w: 5, h: 5, vy: 100})
                .color("blue")
                .bind("UpdateFrame", function() {
                    var neg = Math.floor(Math.random() * 2)
                    if (this.y >= floor.y - this.h) {
                        this.vy = -(Math.random() * 200)
                        if (Math.random() <= 0.5) {
                            this.vx = -(Math.random() * 200)
                        } else {
                            this.vx = Math.random() * 200
                        }
                    } if (this.y <= ceiling.y + this.h) {
                        this.vy = Math.random() * 200
                        if (Math.random() <= 0.5) {
                            this.vx = -(Math.random() * 200)
                        } else {
                            this.vx = Math.random() * 200
                        }
                    } if (this.x >= wall2.x - this.w) {
                        this.vx = -(Math.random() * 200)
                        if (Math.random() <= 0.5) {
                            this.vy = -(Math.random() * 200)
                        } else {
                            this.vy = Math.random() * 200
                        }
                    } if (this.x <= wall1.x + this.w) {
                        this.vx = Math.random() * 200
                        if (Math.random() <= 0.5) {
                            this.vy = -(Math.random() * 200)
                        } else {
                            this.vy = Math.random() * 200
                        }
                    }
                })
            i++
        }
    })

    document.getElementById("screensaver").addEventListener("click", function() {
        Crafty("square").destroy()
        var dvd_logo = Crafty.e("2D, Canvas, Gravity, square, dvd_image")
            .attr({x: 10, y: 10, w: 100, h: 50, vx: 70, vy: 30})
            .bind("UpdateFrame", function() {
                if (this.x >= wall2.x - this.w | this.x <= wall1.x + 10) {
                    this.vx = -(this.vx)
                } if (this.y >= floor.y - this.h | this.y <= ceiling.y + 10) {
                    this.vy = -(this.vy)
                }
            })
    })
};
