window.addEventListener('load', ()=>{

    // Declaracion de variables

    // Titulo web
    let titulo = document.querySelector('title');

    // Zona izquierda, Primer tercio
    let quantText = document.getElementById('cantidad');
    let quantPerSecText = document.getElementById('cantPerSec');
    let clicker = document.getElementById('clica');

    let divClicMod = document.querySelector('#clicMod');
    let priceClicText = document.querySelector('#clicMod>p');
    let quantClicText = document.querySelector('#clicMod>p:nth-of-type(2)');


    // Cantidades totales y por segundo
    let quant = 0;
    let quantPerSec = 0;
    let precio;
    let PorClic = 1;



    // Zona central, segundo tercio
    let divMods = document.querySelectorAll('.mods');
    let typeMod = document.querySelectorAll('.tipoModificador');
    let preu = document.querySelectorAll('.precio');
    let modQuantsText = document.querySelectorAll('.contadorModificador');


    divClicMod.addEventListener('click', ()=>{
        precio = priceClicText.textContent;
        console.log(precio);
        if(quant>= precio){
            quant -= precio;

            modQuant = parseFloat(quantClicText.textContent) + 1;
            quantClicText.textContent = modQuant;

            precio = precio * 10;
            priceClicText.textContent = precio; 

            PorClic = PorClic * 2;
        }else{
            console.log('Te falta dinero pal clic');
        }
    });


    divMods.forEach((divMod, indice) =>{

        divMod.addEventListener('click', ()=>{
            
            let modQuant = parseFloat(modQuantsText[indice].textContent);
            
            if(modQuant == 0){

            // Se pone el precio de cada Objeto. La clase tipoModificador guarda un valor y se multiplica por 100 para darle el valor de compra
            precio = parseFloat(typeMod[indice].textContent) * 100;

            }else{
                precio = parseFloat(preu[indice].textContent);
            }


            if(quant >= precio){
                quant -= precio;

                modQuant = parseFloat(modQuantsText[indice].textContent) + 1;
                modQuantsText[indice].textContent = modQuant;

                precio = Math.floor(precio + (precio*15/100));
                // console.log(precio);

                preu[indice].textContent = precio; 
                // console.log(precio);

            }else{
                console.log('Falta dinero!');
                console.log(precio);

            }

        });
    });

    clicker.addEventListener('click', ()=>{
        quant += PorClic;
        titulo.textContent = `Agri-Reborn ${quant}`;
        quantText.textContent = quant;

    });


    // Funcion que cuenta la cantidad generada por segundo
    function cuentaViejas(){
        quantPerSec = 0;

        for(let i = 0; i<divMods.length; i++){
            quantPerSec += parseFloat(typeMod[i].textContent) * parseFloat(modQuantsText[i].textContent);
        }

        quantPerSecText.textContent = quantPerSec;
        quant += quantPerSec;
        quantText.textContent = quant;
        titulo.textContent = `Agri-Reborn ${quant}`;

        // console.log(quantPerSec);
    }


    // Llamada por segundo de la funcion
    setInterval(cuentaViejas, 1000);

});
