window.onload = function() {
    document.addEventListener("keydown", (e) => {
        keyName = e.key
        if (keyName === "Enter" && document.getElementById("num").value !== "") {
            e.preventDefault()
            if ($("#num").val() < 10001) {
                ball_count = $("#num").val()
                $("#num").val("")
                $("#num").removeClass("ballInputRed")
                $("#num").attr("placeholder", "Default: 1000")
            } else {
                $("#num").val("")
                $("#num").addClass("ballInputRed")
                $("#num").attr("placeholder", "Max: 10 000")
            }
        }
    })

    var ball_count = 1000
    var length = 5
    var color = "blue"

    // initialize the crafty canvas on the element with the id of "stage" and give it a width and height of 400px
    Crafty.init(400, 400, document.getElementById("stage"));

    // load a spritesheet (in this case just the one image of the dvd logo)
    var assetsObj = {
        "sprites": {
            // refer to the path of the image
            "Assets/DVD_logoSmall.png": {
                // the width of one tile (in this case the width of the whole image)
                tile: 50,
                // the height of one tile (in this case the height of the whole image)
                tileh: 25,
                // a map representing the top left corner of each sprite in the spritesheet (in this case just 0, 0 since it's just one image)
                map: {
                    dvd_image: [0, 0],
                }
            }
        }
    };
    // tell crafty to load the spritesheet
    Crafty.load(assetsObj, () => {})

    // make the border elements
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

    // clear the screen when the user presses the clear button
    document.getElementById("clear").addEventListener("click", () => { clear() })

    // update the number of balls to bounce when the input is submitted
    document.getElementById("ballsSubmit").addEventListener("click", function(e) {
        e.preventDefault()
        if ($("#num").val() < 10001) {
            ball_count = $("#num").val()
            $("#num").val("")
        } else {
            $("#num").val("")
            $("#num").addClass("ballInputRed")
            $("#num").attr("placeholder", "Max: 10 000")
        }
    })

    $("#verySmall").on("click", () => { length = 1 })
    $("#Small").on("click", () => { length = 5 })
    $("#Medium").on("click", () => { length = 10 })
    $("#Large").on("click", () => { length = 20 })
    $("#veryLarge").on("click", () => { length = 35 })

    $("#colorSubmit").on("click", () => { color = $("#color").val() })

    function clear() {
        // remove all elements on the screen with the "square" property
        Crafty("square").destroy()
    }

    // when the user clicks the "standard" button
    document.getElementById("standard").addEventListener("click", function() {
        clear()
        console.log(length)

        // loop 1000 times
        var i = 0
        while (i < ball_count) {
            // create a crafty element with the variable name square[i]
            window["square" + i] = Crafty.e("2D, Canvas, Color, Gravity, square")
                // define starting position and size, make it start with a downwards velocity of 100
                .attr({x: 200 - length / 2, y: 100, w: length, h: length, vy: 100})
                .color(color)
                // run this function every frame
                .bind("UpdateFrame", function() {
                    // if the ball hits the floor element's y position
                    if (this.y >= floor.y - this.h) {
                        // assign a random y velocity that must be moving the opposite direction
                        this.vy = -(Math.random() * 200)
                        // assign a random x velocity
                        if (Math.random() <= 0.5) {
                            this.vx = -(Math.random() * 200)
                        } else {
                            this.vx = Math.random() * 200
                        }
                    // repeat
                    } if (this.y <= ceiling.y + 10) {
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
                    } if (this.x <= wall1.x + 10) {
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

    // when the user clicks the "screensaver" button
    document.getElementById("screensaver").addEventListener("click", function() {
        clear()
        
        // create a crafty element that uses the "dvd_image" sprite map
        var dvd_logo = Crafty.e("2D, Canvas, Gravity, square, dvd_image")
            // set starting position, size, and velocity
            .attr({x: 10, y: 10, w: 100, h: 50, vx: 70, vy: 30})
            // every frame, if it goes out of bounds, reverse its x or y velocity
            .bind("UpdateFrame", function() {
                if (this.x >= wall2.x - this.w | this.x <= wall1.x + 10) {
                    this.vx = -(this.vx)
                } if (this.y >= floor.y - this.h | this.y <= ceiling.y + 10) {
                    this.vy = -(this.vy)
                }
            })
    })

    
    
};
