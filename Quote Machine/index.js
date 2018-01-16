let quote, title;
function getRandomQuoteData() {
    var request = $.ajax({
        url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
        method: "get",
        dataType: "json",
        cache: false
    });
    
    request.done(function( msg ) {
        document.getElementById("quote-content").innerHTML = msg[0].content;
        document.getElementById("author").innerText = msg[0].title;
        quote = document.getElementById("quote-content").innerText;
        title = document.getElementById("author").innerText;
    });
}
function openURL(url){
    window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0');
}

function tweet() {
    openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +  encodeURIComponent('"' + quote + '"'));
}

function faceBook() {
}