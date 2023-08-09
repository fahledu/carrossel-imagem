//lista das imagens
const imgList = [
    "https://files.tecnoblog.net/wp-content/uploads/2021/07/7-jogos-de-Star-Wars-para-baixar-no-PC-e-consoles-tommy-van-kessel-unsplash.jpg",
    "https://disneyplusbrasil.com.br/wp-content/uploads/2022/02/Rey-Skywalker.jpg",
    "https://vejasp.abril.com.br/wp-content/uploads/2021/07/mandalorian.jpg?quality=70&strip=info&w=1280&h=720&crop=1",
    "https://upload.wikimedia.org/wikipedia/pt/0/0e/Star_Wars_The_Last_Jedi.png",
    "https://sm.ign.com/ign_br/news/s/star-wars-/star-wars-celebration-2023-everything-announced-at-lucasfilm_y99h.jpg",
    "https://img.freepik.com/fotos-premium/cachorro-golden-retriever-fazendo-truque-de-patinha-no-cinza_143092-1673.jpg?w=900",
    "https://img.freepik.com/fotos-gratis/colagem-de-animal-de-estimacao-bonito-isolada_23-2150007407.jpg?w=826&t=st=1683309195~exp=1683309795~hmac=c46ffb18700a3927a6110ddecbe67287699829c6b49b928550e2aee4f1240ffd",
    "https://img.freepik.com/fotos-gratis/isolado-feliz-sorridente-cao-fundo-branco-retrato-4_1562-693.jpg?w=900&t=st=1683309164~exp=1683309764~hmac=dc461720d01367824920d65a1b8923c6ab1de7ca76c303e8426020d52f0415f7",
    "https://img.freepik.com/fotos-gratis/cao-pug-isolado-em-um-fundo-branco_2829-11416.jpg?w=826&t=st=1683309193~exp=1683309793~hmac=43c07318d4231e94a0ce33a4c4d82759232ba0157331c0a7a36756d046b0dd16"
]

let scrollWidthDiff;


document.addEventListener('DOMContentLoaded', () => {

    

    const carousel = document.querySelector(".carousel");
    const fragment = document.createDocumentFragment();
    const images = [];
    imgList.forEach(item => {
        const img = document.createElement("img");
        img.src = item;
        img.alt = `imgagem${item}`;
        images.push(img)
        fragment.appendChild(img)
    });
    carousel.append(...images);

    scrollWidthDiff = carousel.scrollWidth - carousel.clientWidth;

    const fstImg = images[0];
    const arrowIcons = document.querySelectorAll(".container i")
    let isDragStart = false;
    let isDragging = false;
    let prevPageX;
    let prevScrollLeft;
    let positionDiff;

    fstImg.addEventListener('load', () => {

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display = carousel.scrollLeft === 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft - scrollWidth > -1 ? "none" : "block";
}

arrowIcons.forEach(icon => {
    let firstImgWidth = fstImg.clientWidth + 14;
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id === "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});
    });

    
    const autoSlide = () => {
        if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

        positionDiff = Math.abs(positionDiff);
        let firstImgWidth = fstImg.clientWidth + 14;
        let valDifference = firstImgWidth - positionDiff;

        if (carousel.scrollLeft > prevScrollLeft) {
            return carousel.scrollLeft += positionDiff > firstImgWidth / 4 ? valDifference : - positionDiff;
        }
        carousel.scrollLeft -= positionDiff > firstImgWidth / 4 ? valDifference : - positionDiff;
    };

    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragStart) return;
        isDragStart = true;
        carousel.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0]) - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    };

    const dragStop = () => {
        isDragStart = false;
        carousel.classList.remove("dragging");

        if (!isDragging) return;
        isDragging = false;
        autoSlide();
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);

    document.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);

    document.addEventListener("mouseup", dragStop);
    document.addEventListener("mouseleave", dragStop);
    carousel.addEventListener("touchend", dragStop);

});

