window.addEventListener('load', ()=>{

    // Declaracion de variables

    // Titulo web
    let tituloWeb = document.querySelector('title');

    // Zona izquierda, Primer tercio
    let cantidadMonedas = document.getElementById('cantidad');
    let cantidadPorSegundo = document.getElementById('cantPerSec');
    let zonaClic = document.getElementById('clica');
    // let cantidadClic = document.querySelector('.simbolo');


    let divMejoraClic = document.querySelector('#clicMod');
    let precioMejoraClic = document.querySelector('#clicMod>p');
    let cantidadMejoraClic = document.querySelector('#clicMod>p:nth-of-type(2)');


    // Cantidades totales y por segundo
    let quant = 11000;
    let monedasPorSegundo = 0;
    let precio;
    let alClicar = 1;

    // Zona central, segundo tercio
    // Modificador
    let divModificadores = document.querySelectorAll('.modificadores');
    let generacionModificador = document.querySelectorAll('.tipoModificador');
    let precioModifidacor = document.querySelectorAll('.precio');
    let cantidadCompradaModificador = document.querySelectorAll('.contadorModificador');

    // Investigaciones
    let divInvestigaciones = document.querySelectorAll('.invest');
    let precioAInvestigar = document.querySelectorAll('.precioInvest');
    let cantidadInvestigaciones = document.querySelectorAll('.contadorInvestigacion');
    // Si clicamos en la zona de clic
        
    zonaClic.addEventListener('click', function(event) {

                // Sumamos a nuestra cantidad de dinero la del clic
                quant += alClicar;
                // Actualizamos por clic el title de la web para que siempre se puedan ver la cantidad de dinero
                tituloWeb.textContent = `Agri-Reborn ${quant}`;
                // Actualizamos el apartado de monedas dentro del juego
                cantidadMonedas.textContent = quant;
        

        // Generamos elemento al clic
        let clicker = document.createElement('div');
        clicker.innerHTML = `<img class="coin" src="img/coin.png"></img>${alClicar}`;
        clicker.classList.add('simbolo', 'ascension');

        // Le damos una autodestruccion
        setTimeout(() => {
            zonaClic.removeChild(clicker);
        }, 999);

                // Actualizamos la posición del símbolo con las coordenadas del mouse
                clicker.style.left = `${event.pageX-10}px`;  // Suma un pequeño desplazamiento para que no se solape con el cursor
                clicker.style.top = `${event.pageY-40}px`;   // Suma un pequeño desplazamiento para que no se solape con el cursor
        
        // Lo añadimos a la area
        zonaClic.appendChild(clicker);

    });



    // Funcion compra mejora del Clicker
    divMejoraClic.addEventListener('click', (e)=>{
        precio = precioMejoraClic.textContent;

        // Declaramos variable auxiliar
        // let aux;

        // En caso de poder pagar
        if(quant>= precio){
            // Restamos precio
            quant -= precio;

            // Le sumamos 1 a la cantidad de modificadores
            modQuant = parseFloat(cantidadMejoraClic.textContent) + 1;
            cantidadMejoraClic.textContent = modQuant;

            // Aumentamos el precio por 10
            precio = precio * 10;
            precioMejoraClic.textContent = precio;

            // Modificamos para que el nuevo clic sea 3 veces mayor
            alClicar = alClicar * 3;
        }else{

            // console.log(e.target);
            faltaDinero(e, precio, quant);
        }
    });

    // Declaracion de funcion para llamar en caso de falta de dinero

    function faltaDinero(e, price, dinero){
        let clicker = document.createElement('div');
        clicker.innerHTML = `<p>Te faltan ${price-dinero} Plantoros!</p>`;
        clicker.classList.add('impagable');

        // Actualizamos la posición del símbolo con las coordenadas del mouse
        clicker.style.left = `${e.pageX}px`;  // Suma un pequeño desplazamiento para que no se solape con el cursor
        clicker.style.top = `${e.pageY}px`;   // Suma un pequeño desplazamiento para que no se solape con el cursor
        
        divMejoraClic.appendChild(clicker);

        setTimeout(() => {
            divMejoraClic.removeChild(clicker);
        }, 1000);
    }

    // Compra de modificadores

    divModificadores.forEach((divMod, indice) =>{

        divMod.addEventListener('click', (e)=>{
            
            let modQuant = parseFloat(cantidadCompradaModificador[indice].textContent);
            
            if(modQuant == 0){

            // Se pone el precio de cada Objeto. La clase tipoModificador guarda un valor y se multiplica por X para darle el valor de compra
            precio = parseFloat(generacionModificador[indice].textContent) * 1000;

            }else{
                precio = parseFloat(precioModifidacor[indice].textContent);
            }

            // Si tenemos mas dinero que el precio se puede comprar

            if(quant >= precio){
                quant -= precio;

                modQuant = parseFloat(cantidadCompradaModificador[indice].textContent) + 1;
                cantidadCompradaModificador[indice].textContent = modQuant;

                // El precio se aumenta un 15% quitaremos decimales
                precio = Math.floor(precio + (precio*15/100));

                precioModifidacor[indice].textContent = precio; 

                // En caso contrario falta dinero, no podemos comprar
            }else{
                faltaDinero(e, precio, quant);

            }

        });
    });

    // Funcion investigaciones mejora Modificadores

    divInvestigaciones.forEach((investigacion, indice) =>{
        investigacion.addEventListener('click', ()=>{
            let aux;

            if(quant>= parseInt(precioAInvestigar[indice].textContent)){

                quant -= parseInt(precioAInvestigar[indice].textContent);

                aux = parseInt(precioAInvestigar[indice].textContent);

                aux = aux*1.5;
                precioAInvestigar[indice].textContent = aux;
                
                aux = parseInt(cantidadInvestigaciones[indice].textContent)+1;
                cantidadInvestigaciones[indice].textContent = aux;
                aux = generacionModificador[indice].textContent;
                generacionModificador[indice].textContent = parseInt(aux*2);
            };
        });
    });


    // Funcion que cuenta la cantidad generada por segundo
    function cuentaViejas(){
        monedasPorSegundo = 0;

        // Recuento de la cantidad y generacion de los modificadores
        for(let i = 0; i<divModificadores.length; i++){
            monedasPorSegundo += parseInt(generacionModificador[i].textContent) * parseInt(cantidadCompradaModificador[i].textContent);
        }

        // Impresion en texto de la cantidad generada
        cantidadPorSegundo.textContent = monedasPorSegundo*10;
        quant += parseInt(monedasPorSegundo);
        cantidadMonedas.textContent = quant;
        tituloWeb.textContent = `Agri-Reborn ${quant}`;

    }


    // Llamada por segundo de la funcion
    setInterval(cuentaViejas, 100);
    // setInterval(mostracion, 1000);

});

