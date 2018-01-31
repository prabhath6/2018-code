function getData() {
    var searchTerm = document.getElementById("searchTerm").value;
    if(searchTerm) {
        var searchTermContainer = document.getElementById("searchTermContainer");
        searchTermContainer.style.marginTop = "20px";
        getWikiData(searchTerm);
    }
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

function getWikiData(searchTerm){
    var url = `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=${searchTerm}`;

    $.ajax({
        method: "GET",
        url: url,
        async:true,
        dataType : 'jsonp'
        // crossDomain:true,
      })
    .done(function( msg ) {
        var articleDivs = document.getElementById("articles");
        var articleContent = '';
        for(var key in msg.query.pages){
            var page = msg.query.pages[key];
            console.log("thumbnail: " + JSON.stringify(page.thumbnail));
            console.log();
            var articlePage = `https://en.wikipedia.org/?curid=${page.pageid}`;
            var divContent = `<div name="articles" class="card" data-link="${articlePage}" >
                <div class="card-body">
                    <h5 class="card-title">${page.title}</h5>
                    <p class="card-text">${page.extract}</p>
                </div>
            </div>`;
            articleContent += divContent;
        }
        articleDivs.innerHTML = articleContent;

        var getArticles = document.getElementsByName("articles");
        getArticles.forEach(element => {
            element.addEventListener("mouseenter", mouseIn); 
            element.addEventListener("mouseleave", mouseOut); 
            element.addEventListener("click", onClickOpenArticle);
        });
    });
}