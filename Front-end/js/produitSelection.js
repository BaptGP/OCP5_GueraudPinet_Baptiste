const queryStringUrlId = window.location.search;

const myID = queryStringUrlId.slice(4);
if(queryStringUrlId.length <= 4){
  window.location = "index.html";
}
var myPrice;

const get = async function() {
    let response = await fetch('http://localhost:3000/api/cameras/' + myID);
    if (response.ok) {
        let data = await response.json();
    
        var produit = document.createElement('div');
            produit.setAttribute('class', 'produit');

            var produits = document.getElementById('produits');
            produits.append(produit);

            var images = document.createElement('img');
            images.setAttribute('class', 'produit__image');
            images.src = data.imageUrl;

            var name = document.createElement("h2");
            name.setAttribute("class", "produit__name");
            name.innerHTML = data.name;

            var description = document.createElement("p");
            description.setAttribute("class", "produit__description");
            description.innerHTML = data.description;

            var price = document.createElement('span');
            price.setAttribute('class', 'produit__price');
            myPrice = parseInt(data.price);
            price.innerHTML = myPrice /100 + " €";

            var label = document.createElement('label');
            label.innerHTML = "Choisir une lentille :";

            var listeCamera = document.createElement('select');
            listeCamera.setAttribute('name', 'liste');
            listeCamera.setAttribute('id', 'lense-select')

            
            var lensesCamera = data.lenses

            for(i=0; i < lensesCamera.length; i++){
                var lenseCamera = lensesCamera[i];
                
                var optionListe = document.createElement('option');
                listeCamera.append(optionListe);
                optionListe.innerHTML = lenseCamera
            }

            var command = document.createElement('div');
            command.setAttribute('class', 'produit__command');
            command.setAttribute('onclick', 'ajouterAuPanier(myID, myPrice)'); //Déclarer la fonction ajouterAuPanier au click du bouton command
            command.innerHTML = "Commander";

        

            
            produit.append(images);
            produit.append(name);
            produit.append(description);
            produit.append(label);
            produit.append(listeCamera);
            produit.append(price);
            produit.append(command);
    }else {
      alert('Nous ne parvenons pas à trouver le serveur...');
    };
  };
  
  get();


