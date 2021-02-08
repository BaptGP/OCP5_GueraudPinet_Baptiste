const get = async function() {
  let response = await fetch('http://localhost:3000/api/cameras');
  if (response.ok) {
    let data = await response.json();
    console.log(data);

    data.forEach(function(produit){
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
        lien.setAttribute('href', 'produit.html?id=' + produit._id);

        article.append(titre);
        article.append(articleImage);
        article.append(price);
        articles.append(article);
        article.append(lien);
        lien.append(button);
        
    });
  }else {
    alert('Nous ne parvenons pas à trouver le serveur...');
  };
};

get();



















