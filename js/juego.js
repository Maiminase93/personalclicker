window.addEventListener('load', ()=>{

    // Declaracion de variables

    // Titulo web
    let LocTituloWeb = document.querySelector('title');

    // Modificadores manuales del precio
    invDeClic = 5; // ++ Multiplicador de valor alClicar ++ //
    invDeMod = 3; // ++ Multiplicador de valor del cultivo ++ //
    aumentoPrecioMOD = 25; // ++ Valor numerico de porcentaje % ++ //
    aumentoPrecioINV = 2; // ++ Valor numerico multiplicador ++ //

    // Cantidades totales y por segundo
    // Cantidad total de plantoros
    let quant = 0;
    // Monedas por segundo
    let monedasPorSegundo = 0;

    // Por click
    let alClicar = 1;


    // Precio mejora click
    let invClicPrecio = 10;
    // Cantidad mejora click
    let invClicCantidad = 0;

    // Generacion por cultivo
    let modProduccion = [1,4,16,64,256,1024,4096,16384,65536,262144];
    // Precio por cultivo
    let modPrecio = [];
    // Cantidad de cultivos
    let modCantidad = [];


    // Desbloqueo Investigacion 
    let desbloqueoInv = [];


    // Precio por investigacion
    let invModPrecio = [];
    // Cantidad de investigaciones por cultivo
    let invModCantidad = [];

    // Auxiliar para el recalculo de generacion por segundo
    let aux = [];


    // Zona izquierda, Primer tercio
    let LocCantidadMonedas = document.getElementById('cantidad');
    let LocCantidadPorSegundo = document.getElementById('cantPerSec');
    let LocZonaClic = document.getElementById('clica');
    let LocPlantita = document.querySelector('#planta');


    let LocDivMejoraClic = document.querySelector('#clicMod');
    let LocPrecioMejoraClic = document.querySelector('#clicMod>p');
    let LocCantidadMejoraClic = document.querySelector('#clicMod>p:nth-of-type(2)');

    let vPlantaImagenes = ["url(img/planta01.png)", "url(img/planta02.png)", "url(img/planta03.png)", "url(img/planta04.png)", "url(img/planta05.png)"];

    let vPlantaFondos = ["url(img/paisaje01.jpg)","url(img/paisaje02.jpg)","url(img/paisaje03.png)","url(img/paisaje04.png)","url(img/paisaje05.png)"]



    // Zona central, segundo tercio

    // Clic para mostrar info
    let LocInfo = document.querySelectorAll('.helper');

    // Modificador
    let LocDivModInv = document.querySelectorAll('.mods');
    let LocDivModificadores = document.querySelectorAll('.modificadores');
    let LocPrecioModifidacor = document.querySelectorAll('.precio');
    let LocCantidadCompradaModificador = document.querySelectorAll('.contadorModificador');

    // Investigaciones
    let LocDivInvestigaciones = document.querySelectorAll('.invest');
    let LocPrecioAInvestigar = document.querySelectorAll('.precioInvest');
    let LocCantidadInvestigaciones = document.querySelectorAll('.contadorInvestigacion');
    // Si clicamos en la zona de clic
        
    let vImagenes = ["url(img/lechuga.png)", "url(img/cebolla.png)", "url(img/tomate.png)", "url(img/espinaca.png)", "url(img/coliflor1.png)", "url(img/calabacin.png)", "url(img/oliva.png)" , "url(img/soja.png)", "url(img/girasol.png)", "url(img/aguacate.png)", "url(img/aloe.png)"];



    // INTRODUCCION DE VALORES BASE EN LAS ARRAYS
    for(let i = 0; i<modProduccion.length; i++ ){
        
        // Poniendo valores base

        // Se pone el precio de cada Objeto. La clase tipoModificador guarda un valor y se multiplica por X para darle el valor de compra tambien se multiplicara por el numero de posicion del modificador
        modPrecio[i] = modProduccion[i] * 100 * (modProduccion.indexOf(modProduccion[i])+1);
        LocPrecioModifidacor[i].textContent = lectorNumerico(modPrecio[i]);

        modCantidad[i]= 0;
        LocCantidadCompradaModificador[i] = lectorNumerico(modCantidad[i]);

        // Investigaciones se desbloquean al tener 10 cultivos iguales
        desbloqueoInv[i] = 10;


        // Introducimos valores base de las investigaciones
        invModPrecio[i] = modProduccion[i]*10000;
        invModCantidad[i] = 0;
        LocPrecioAInvestigar[i].textContent = lectorNumerico(invModPrecio[i]);

        // aux[i] = modProduccion[i] * (invModCantidad[i] * 2);

    };

    // console.log(`cantidad cultivo`, modCantidad);
    // console.log('precio cultivo',modPrecio);
    // console.log('precio investigacion cultivo',invModPrecio);
    // console.log(`Generacion por segundo: ${aux} = ${modProduccion} * ${(invModCantidad * 2)}`)
    // Comprobado


    // Escuchador zona de generacion de clicks plantoros 🌱
    LocZonaClic.addEventListener('click', function(event) {

        // Sumamos a nuestra cantidad de dinero la del clic
        quant += alClicar;
        // Actualizamos por clic el title de la web para que siempre se puedan ver la cantidad de dinero
        LocTituloWeb.textContent = `${lectorNumerico(quant)} PlantWorld`;
        // Actualizamos el apartado de monedas dentro del juego
        LocCantidadMonedas.textContent = lectorNumerico(quant);
        

        // =====================================================================
        // Movimiento planta
        LocPlantita.style.backgroundSize = "60%";
        setTimeout(() => {
        LocPlantita.style.backgroundSize = "50%";
        }, 100);

        // Generamos elemento al clic (monedas + cantidad)
        let clicker = document.createElement('div');
            lectorNumerico(monedasPorSegundo);
        clicker.innerHTML = `<img class="coin" src="img/coin.png"></img>${lectorNumerico(alClicar)}`;
        clicker.classList.add('simbolo', 'ascension');

        // Le damos una autodestruccion
        setTimeout(() => {
            LocZonaClic.removeChild(clicker);
        }, 999);

                // Actualizamos la posición del símbolo con las coordenadas del mouse
                clicker.style.left = `${event.pageX-10}px`;  // Suma un pequeño desplazamiento para que no se solape con el cursor
                clicker.style.top = `${event.pageY-40}px`;   // Suma un pequeño desplazamiento para que no se solape con el cursor
        
        // Lo añadimos a la area
        LocZonaClic.appendChild(clicker);
        // ====================================================================

    });



    // Funcion compra mejora del Clicker
    LocDivMejoraClic.addEventListener('click', (e)=>{

        // En caso de poder pagar
        if(quant>= invClicPrecio){
            // Restamos precio
            quant -= invClicPrecio;

            // Le sumamos 1 a la cantidad de modificadores
            invClicCantidad++;
            LocCantidadMejoraClic.textContent = invClicCantidad;

            // Cambiar imagen segun cantidad de modificadores
            if(invClicCantidad<6){
                LocPlantita.style.backgroundImage = vPlantaImagenes[invClicCantidad];
                document.getElementById('juego').style.backgroundImage = vPlantaFondos[invClicCantidad];

            }else if(invClicCantidad == 6){
                document.querySelector('#juego section').style.backgroundColor = "#33333350";
                document.querySelector('#juego section:nth-of-type(2)').style.backgroundColor = "#33333350";
                document.querySelector('#juego aside').style.backgroundColor = "#33333350";
                
            }

            // Aumentamos el precio por 10
            invClicPrecio = invClicPrecio * 10;
            LocPrecioMejoraClic.textContent = lectorNumerico(invClicPrecio);

            // Modificamos para que el nuevo clic sea 3 veces mayor
            alClicar = alClicar * invDeClic;
        }else{

            // Llamada funcion de falta dinero
            faltaDinero(e, invClicPrecio, quant, LocDivMejoraClic);
        }
    });

        // Muestra info de cada cultivo
        function mostrarInfo(e, index, lugar){
            let info = document.createElement('div');

            // Segun si se han hecho investigaciones o no.
            if(invModCantidad[index]  == 0){
                info.innerHTML = `<p>Cada planta genera: ${lectorNumerico(modProduccion[index]*10)} Plantoros por segundo.</p>
                <p>Este cultivo genera ${lectorNumerico(aux[index]*10)} P/s.
                </p>
                <p>Genera un ${((aux[index]*100)/monedasPorSegundo).toFixed(2)}% del total.</p>`;
            
            }else{

                info.innerHTML = `<p>Cada planta genera: ${lectorNumerico(modProduccion[index] * invModCantidad[index] * invDeMod * 10)} P/s</p>
                <p>Este cultivo genera ${lectorNumerico(aux[index]*10)} P/s.</p>
                <p>Genera un ${((aux[index]*100)/monedasPorSegundo).toFixed(2)}% del total.</p>`;

            }

            
    
            info.classList.add('impagable');
            // Actualizamos la posición del símbolo con las coordenadas del mouse
            info.style.left = `${e.pageX}`;  // Suma un pequeño desplazamiento para que no se solape con el cursor
            info.style.top = `50%`;   // Suma un pequeño desplazamiento para que no se solape con el cursor
            
            // console.log(e.pageX);
            // console.log(e.pageY);

            lugar.appendChild(info);
    
            setTimeout(() => {
                lugar.removeChild(info);
            }, 1000);
        }

    // Declaracion de funcion para llamar en caso de falta de dinero
    function faltaDinero(e, price, dinero, lugar){
        let clicker = document.createElement('div');
        let resultado = price-dinero;
        clicker.innerHTML = `<p>Te faltan ${lectorNumerico(resultado)} Plantoros!</p>`;
        clicker.classList.add('impagable');

        // Actualizamos la posición del símbolo con las coordenadas del mouse
        clicker.style.left = `40%`;  // Suma un pequeño desplazamiento para que no se solape con el cursor
        clicker.style.top = `20%`;   // Suma un pequeño desplazamiento para que no se solape con el cursor
        
        lugar.appendChild(clicker);

        setTimeout(() => {
            lugar.removeChild(clicker);
        }, 1000);
    }

    //Atributo background image
    LocDivModInv.forEach((divMI, indice) =>{
        divMI.style.backgroundImage = vImagenes[indice];
        divMI.style.display = "none";
            // Info de cultivos
            LocInfo[indice].addEventListener('click', (e)=>{
                mostrarInfo(e, indice, divMI);
            });
        // console.log(divMI);
        // console.log(vImagenes[indice]);
    });


    
    // Compra de modificadores
    LocDivModificadores.forEach((divMod, indice) =>{
    

        divMod.addEventListener('click', (e)=>{
            
            // let modQuant = modCantidad[indice];

            // Si tenemos mas dinero que el precio se puede comprar

            if(quant >= modPrecio[indice]){
                quant -= modPrecio[indice];

                modCantidad[indice]++;
                LocCantidadCompradaModificador[indice].textContent = modCantidad[indice];

                // El precio se aumenta un X% quitaremos decimales
                modPrecio[indice] += Math.floor(modPrecio[indice]*aumentoPrecioMOD/100);

                // console.log(modPrecio[indice]);

                LocPrecioModifidacor[indice].textContent = lectorNumerico(modPrecio[indice]); 

                if(modCantidad[indice]>= desbloqueoInv[indice]){
                    // console.log('INVESTIGACION ABIERTA');
                    LocDivInvestigaciones[indice].classList.add('reach');

                }
                // En caso contrario falta dinero, no podemos comprar
            }else{
                faltaDinero(e, modPrecio[indice], quant, divMod);

            };

        });
    });

    // Funcion investigaciones mejora Modificadores

    LocDivInvestigaciones.forEach((investigacion, indice) =>{

        investigacion.addEventListener('click', (e)=>{
            

            if(quant>= invModPrecio[indice]){

                quant -= invModPrecio[indice];

                // Precio de la nueva investigacion
                invModPrecio[indice] = invModPrecio[indice] * aumentoPrecioINV;
                LocPrecioAInvestigar[indice].textContent = lectorNumerico(invModPrecio[indice]);
                
                // Aumento cantidad investigaciones
                invModCantidad[indice]++;
                LocCantidadInvestigaciones[indice].textContent = invModCantidad[indice];

                // Aumentamos la cantidad de cultivos para la siguiente investigacion
                desbloqueoInv[indice] += 10; 

                investigacion.classList.remove('reach');
            }else{
                faltaDinero(e, invModPrecio[indice], quant, investigacion);
            };
        });
    });


    // Funcion que cuenta la cantidad generada por segundo
    function cuentaViejas(){
        monedasPorSegundo = 0;
        // Recuento de la cantidad y generacion de los modificadores
        for(let i = 0; i<modProduccion.length; i++){

            if(invModCantidad[i] == 0){
                aux[i] = modProduccion[i] * modCantidad[i];
            }else{
                aux[i] = modProduccion[i] * modCantidad[i] * (invModCantidad[i] * invDeMod);
            }

            // Comprobante de variables!!
            // console.log(aux[i], modCantidad[i] , modProduccion[i], invModCantidad[i], invModCantidad[i], invDeMod);

            monedasPorSegundo += aux[i];
        };

        // Impresion en texto de la cantidad generada
        LocCantidadPorSegundo.textContent = lectorNumerico(monedasPorSegundo*10);
        ;
        quant += parseInt(monedasPorSegundo);
        LocCantidadMonedas.textContent = lectorNumerico(quant);
        LocTituloWeb.textContent = `${lectorNumerico(quant)} PlantWorld`;
        mostrarNuevo();
    }

    function mostrarNuevo(){
        LocDivModInv.forEach((divMI, indice) =>{
            // Recogemos el precio de cada modificador
            if(modCantidad[indice] == 0){
                if(quant>modPrecio[indice] && divMI.style.opacity == 0){
                    divMI.style.display = "flex";

                    setTimeout(() => {
                        aparecerMod(divMI);
                    }, 100);
                }
            }
        });
    };

    function aparecerMod(mod){
        mod.style.opacity = "1" ,1000;
        mod.style.width = "100%" ,1000;
        mod.style.height = "100px" ,1000;

    }

    function lectorNumerico (valor){

        let resultado = (valor).toString();
        let escritor;
        // console.log(resultado);
    
    
        if(resultado.length > 18){
            escritor = `${resultado.slice((resultado.length-resultado.length),
                resultado.length-18)}Trillones`;
    
        }else if(resultado.length > 12){
            escritor = `${resultado.slice((resultado.length-resultado.length),
                resultado.length-12)},${resultado.slice(resultado.length-6,
                    resultado.length-4)} Billones`;
    
        }else if(resultado.length > 6){
            escritor = `${resultado.slice((resultado.length-resultado.length),
                resultado.length-6)},${resultado.slice(resultado.length-6,
                    resultado.length-4)} Millones`;
    
        }else{
            escritor = `${resultado}`;
        };

        return escritor;
    };

    // Llamada de la funcion
    setInterval(cuentaViejas, 100);
});

