var queryStringUrlId = window.location.search;
console.log(queryStringUrlId)

var myID = queryStringUrlId.slice(1);
console.log(myID)

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);

        var produit = document.createElement('div');
        produit.setAttribute('class', 'produit');

        var produits = document.getElementById('produits');
        produits.append(produit);

        var images = document.createElement('img');
        images.setAttribute('class', 'produit__image');
        images.src = response.imageUrl;

        var name = document.createElement("h2");
        name.setAttribute("class", "produit__name");
        name.innerHTML = response.name;

        var description = document.createElement("p");
        description.setAttribute("class", "produit__description");
        description.innerHTML = response.description;

        var price = document.createElement('span');
        price.setAttribute('class', 'produit__price');
        price.innerHTML = response.price /100 + " €";

        var label = document.createElement('label');
        label.innerHTML = "Choisir une lentille :";

        var listeCamera = document.createElement('select');
        listeCamera.setAttribute('name', 'liste');
        listeCamera.setAttribute('id', 'lense-select')

        
        var lensesCamera = response.lenses

        for(i=0; i < lensesCamera.length; i++){
            var lenseCamera = lensesCamera[i];
            
            var optionListe = document.createElement('option');
            listeCamera.append(optionListe);
            optionListe.innerHTML = lenseCamera
            console.log(lenseCamera)
        }

        var command = document.createElement('div');
        command.setAttribute('class', 'produit__command');
        command.innerHTML = "Commander";

       

        
        produit.append(images);
        produit.append(name);
        produit.append(description);
        produit.append(label);
        produit.append(listeCamera);
        produit.append(price);
        produit.append(command);
        
      

  }else if (this.readyState == 4 && this.status == 404) {
    alert('Nous ne parvenons pas à trouver le serveur...')
  };
};

    
request.open("GET", "http://localhost:3000/api/cameras/" + myID);
request.send();