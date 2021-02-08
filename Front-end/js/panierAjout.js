function ajouterAuPanier(id)
{
    var panier = localStorage.getItem('panier'); // Récupérer le localstorage

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

    alert('Le produit a été ajouté au panier !');
    console.log(localStorage.getItem('panier'));
}