const images = ["images/img1.jpg", "images/img2.jpg", "images/img3.jpg", "images/img4.jpg"]
const carouselSlide = document.querySelector(".carousel-slide")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")

for (let i = images.length - 1; i >= 0; i--) {
    const imageEl = document.createElement("img")
    imageEl.src = images[i]
    carouselSlide.appendChild(imageEl)
}

let position = 0

const DIR = {
    LEFT: -1,
    RIGHT: 1,
}

const POSITION = {
    LEFT: "-100%",
    CENTER: "0%",
    RIGHT: "100%",
}

function moveImages(dir, currentPosition, nextPosition) {
    const currentImage = document.querySelector(`[src="${images[currentPosition]}"]`)
    const nextImage = document.querySelector(`[src="${images[nextPosition]}"]`)

    // move images far somewhere at top so that they don't interfere
    for (var i = 0; i < images.length; i++) {
        const img = document.querySelector(`[src="${images[i]}"]`)
        img.style.top = "-1000%"
    }

    currentImage.style.top = "0%"
    nextImage.style.top = "0%"
    currentImage.style.transition = "0s"
    nextImage.style.transition = "0s"

    // before moving any image...
    // ensure that images are in the initial position
    if (dir == DIR.LEFT) {
        // if prev btn was clicked
        currentImage.style.left = POSITION.CENTER
        nextImage.style.left = POSITION.LEFT
    } else if (dir == DIR.RIGHT) {
        currentImage.style.left = POSITION.CENTER
        nextImage.style.left = POSITION.RIGHT
    }

    setTimeout(() => {
        currentImage.style.transition = "0.5s"
        nextImage.style.transition = "0.5s"
        // update the image positions to the desired direction
        // update to final positions
        if (dir == DIR.LEFT) {
            // move images towards right side so that the left image can be seen
            currentImage.style.left = POSITION.RIGHT
            nextImage.style.left = POSITION.CENTER
        } else if (dir == DIR.RIGHT) {
            // move images towards left side so that the right image can be seen
            currentImage.style.left = POSITION.LEFT
            nextImage.style.left = POSITION.CENTER
        }
    }, 100)
}

function updatePosition(dir) {
    const currentPosition = position
    position = position + dir

    if (position < 0) {
        position = images.length - 1
    } else if (position >= images.length) {
        position = 0
    }
    moveImages(dir, currentPosition, position)
}

prevBtn.addEventListener("click", function () {
    updatePosition(DIR.LEFT)
})
nextBtn.addEventListener("click", function () {
    updatePosition(DIR.RIGHT)
})
