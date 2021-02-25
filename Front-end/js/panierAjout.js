function ajouterAuPanier(id, price)
{
    var panier = localStorage.getItem('panier'); // Récupérer le localstorage
    var total = localStorage.getItem('total'); // Récupérer le localstorage

    if(panier == null)
    {
        localStorage.setItem('panier', JSON.stringify([id])); // Si localstorage vide, alors lui ajouter dans un tableau l'id du produit demandé
    }
    else
    {
        panier = JSON.parse(panier); //Convertir JSON en Javascript
        panier.push(id); // Ajout de l'id dans le panier
        localStorage.setItem('panier', JSON.stringify(panier)); 
    }

    if(total == null)
    {
        localStorage.setItem('total', price);
    }
    else
    {
        localStorage.setItem('total', parseInt(total) + parseInt(price));
    }

    alert('Le produit a été ajouté au panier !');
}