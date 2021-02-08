var panier = localStorage.getItem('panier');
panier = JSON.parse(panier);
for(i = 0; i < panier.length; i++){ 
    var commande = panier[i];
    const get = async function() {
        let response = await fetch('http://localhost:3000/api/cameras/' + commande);
        console.log(response)
        if (response.ok) {
            let data = await response.json();
            
            var commandes = document.createElement('div');
            commandes.setAttribute('class', 'commandes');

            var titre = document.createElement("h2");
            titre.setAttribute("class", "panier__titre");
            titre.innerHTML = data.name;
                        
            var panierImage = document.createElement('img');
            panierImage.setAttribute('class', 'panier__image');
            panierImage.src = data.imageUrl;

            var price = document.createElement('span');
            price.setAttribute('class', 'panier__price');
            price.innerHTML = data.price /100 + " €";
                        
            produitPanier.append(commandes);
            commandes.append(panierImage);
            commandes.append(titre);
            commandes.append(price);
        }else {
            alert('Nous ne parvenons pas à trouver le serveur...');
          };
        };    
        get();
}

var produitPanier = document.getElementById('produit_panier');
var viderPanier = document.createElement('div');
viderPanier.setAttribute('class', 'vider__panier');
viderPanier.setAttribute('onclick', 'localStorage.clear()'); 
viderPanier.innerHTML = "Vider le panier";
produitPanier.append(viderPanier);
