var confirmation = document.getElementById('confirmation');
var total = localStorage.getItem('total');
var order = localStorage.getItem("order");
var panier = localStorage.getItem('panier');
function recupLocalStorage () {
    if(panier != null){
        var numeroCommande = document.createElement('span');
        numeroCommande.setAttribute('class', 'numero_commande');
        numeroCommande.innerHTML = JSON.parse(order).orderId;
        confirmation.append(numeroCommande);
        var prixTotal = document.createElement('span');
        prixTotal.setAttribute('class', 'prix_total');
        prixTotal.innerHTML = "Total : " + total / 100 + "€";
        confirmation.append(prixTotal);
        localStorage.clear();
    }else{
        window.location = "index.html";
    }
}
recupLocalStorage();
