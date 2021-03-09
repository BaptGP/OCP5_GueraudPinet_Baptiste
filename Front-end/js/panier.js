var produitPanier = document.getElementById('produit_panier');
function clearPanier () {
    localStorage.clear();
    location.reload();
}
function verifPanier () {
    var panier = localStorage.getItem('panier');
    var total = localStorage.getItem('total');
    panier = JSON.parse(panier);
    if (panier == null){
        var panierVide = document.createElement('span');
        panierVide.setAttribute('class', 'panier_vide');
        panierVide.innerHTML = "Le panier est vide...";
        produitPanier.append(panierVide);
    }else {
        for(i = 0; i < panier.length; i++){ 
            var commande = panier[i];
            const get = async function() {
                let response = await fetch('http://localhost:3000/api/cameras/' + commande);
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
                    produitPanier.append(priceTotal);
                }else {
                    alert('Nous ne parvenons pas à trouver le serveur...');
                };
            };    
            get();
            
        }
        var priceTotal = document.createElement('span');
        priceTotal.setAttribute('class', 'price_total');
        priceTotal.innerHTML = 'Total : '+ total / 100 + " €"; 
        
        
        var viderPanier = document.createElement('div');
        viderPanier.setAttribute('class', 'vider__panier');
        viderPanier.setAttribute('onclick', 'clearPanier()'); 
        viderPanier.innerHTML = "Vider le panier";
        produitPanier.append(viderPanier);
    }
}
verifPanier();

document.getElementById('formulaire').addEventListener("submit", function(e){
    e.preventDefault();
    var erreur = null;
    var prenom = document.getElementById('firstname').value;
    var nom = document.getElementById('lastname').value;
    var adresse = document.getElementById('address').value;
    var mail = document.getElementById('email').value;
    var ville = document.getElementById('city').value;
    var regxEmail = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/

    if (prenom.length < 3) {
        erreur = "Le prénom doit comporter 3 caractères minimum";
    }
    if (nom.length < 3) {
        erreur = "Le nom doit comporter 3 caractères minimum";
    }
    if (adresse.length < 3) {
        erreur = "L'adresse renseignée est incorrecte"
    }
    if (ville.length < 3) {
        erreur = "La ville renseignée est incorrecte"
    }
    if(!regxEmail.test(mail)){
        erreur = "Le mail est incorrect"
    }
    
    if (erreur != null){
        document.getElementById("erreur").innerHTML = erreur;
        return false
    }
        
    var contact = {"firstName": prenom, "lastName": nom, "address": adresse, "city": ville, "email": mail};
    var products = JSON.parse(localStorage.getItem('panier'));
    
    var envoi = { contact: contact,  products: products};

    const envoiFetch = async function() {
        let responseEnvoiFetch = await fetch('http://localhost:3000/api/cameras/order', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(envoi)
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            localStorage.setItem("order", res.orderId)
            alert("formulaire envoyé")
            window.location = "confirmation.html"
        })
    }
    envoiFetch();
    
})
