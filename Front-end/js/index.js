var request = new XMLHttpRequest();

request.onreadystatechange = function() {
  if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);

    response.forEach(function(produit){
        var article = document.createElement("div");
        article.setAttribute("class", "article");

        var titre = document.createElement("h2");
        titre.setAttribute("class", "titre_article");
        titre.innerHTML = produit.name;
        
        var articleImage = document.createElement('img');
        articleImage.setAttribute('class', 'article__image');
        articleImage.src = produit.imageUrl;
        
        var button = document.createElement('div');
        button.setAttribute('class', 'button');
        button.innerHTML = "Voir le produit";

        var price = document.createElement('span');
        price.setAttribute('class', 'price');
        price.innerHTML = produit.price /100 + " €";

        var articles = document.getElementById('articles');

        var lien = document.createElement("a");
        lien.setAttribute('href', 'produit.html?' + produit._id);

        article.append(titre);
        article.append(articleImage);
        article.append(price);
        articles.append(article);
        article.append(lien);
        lien.append(button);
        }
    );
  }else if (this.readyState == 4 && this.status == 404) {
      alert('Nous ne parvenons pas à trouver le serveur...')
  }
};
  
request.open("GET", "http://localhost:3000/api/cameras");
request.send();

