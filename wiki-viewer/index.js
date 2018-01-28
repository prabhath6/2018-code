function onLoad() {
    var getArticles = document.getElementsByName("articles");
    getArticles.forEach(element => {

        // event handlers
        element.addEventListener("mouseenter", mouseIn); 
        element.addEventListener("mouseleave", mouseOut); 
        element.addEventListener("click", onClickOpenArticle);

        // get Content and add data to it.
    });
}

function mouseOut(event) {
    this.classList.remove("bg-primary");
    this.classList.remove("text-white");
}

function mouseIn(event) {
    this.classList.add("bg-primary");
    this.classList.add("text-white");
    this.style.cursor = "pointer";
}

function onClickOpenArticle(event){
    window.open(this.dataset.link);
}

/*
var page = 'https://en.wikipedia.org/?curid='; + pageid
*/