let ingresos = [
    new Ingreso('Salario', 20000),
    new Ingreso('Venta auto', 50000),
];

let egresos = [
    new Egreso('Renta', 4000),
    new Egreso('Ropa', 800)
];


let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    let _presupuesto = document.getElementById("presupuesto");
    _presupuesto.innerHTML = formatoMoneda(presupuesto);

    let _porcentaje = document.getElementById("porcentaje");
    _porcentaje.innerHTML = formatoPorcentaje(porcentajeEgreso);

    let _ingresos = document.getElementById("ingresos");
    _ingresos.innerHTML = formatoMoneda(totalIngresos()) + " MXN";

    let _egresos = document.getElementById("egresos");
    _egresos.innerHTML = formatoMoneda(totalEgresos()) + " MXN";
};


let totalIngresos = () => {
    let total = 0;
    for (const ingreso of ingresos) {
        total += ingreso.valor;
    }
    return total;
}

let totalEgresos = () => {
    let total = 0;
    for (const egreso of egresos) {
        total += egreso.valor;
    }
    return total;
}


let formatoMoneda = (numero) => {
    const opciones = {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    }
    return numero.toLocaleString('es-MX', opciones);
};


let formatoPorcentaje = (numero) => {
    const opciones = {
        style: 'percent',
        minimumFractionDigits: 2
    }  
    return numero.toLocaleString('es-MX', opciones);
};


let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}


let cargarIngresos = () => {
    let ingresosHTML = "";
    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso)
    }
    document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
}

let crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `<div class="elemento limpiarEstilos">
                            <div class="elemento_descripcion">${ingreso.descripcion}</div>
                            <div class="derecha limpiarEstilos">
                                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                                <div class="elemento_eliminar">
                                    <button class="elemento_eliminar_btn">
                                        <i class="ion-ios-close-circle-outline" onclick="eliminarIngreso(${ingreso.id})"> X </i>
                                    </button>
                                </div>
                            </div>
                        </div>`
    return ingresoHTML;
}

let eliminarIngreso = (_id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id == _id)
    if(indiceEliminar !== -1)
    {
        ingresos.splice(indiceEliminar, 1)
        cargarCabecero();
        cargarIngresos();
    }
}

let cargarEgresos = () => {
    let egresosHTML = "";
    for (const egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso)
    }
    document.getElementById("lista-egresos").innerHTML = egresosHTML;
}

let crearEgresoHTML = (egreso) => {
    let porcentajeEgreso = egreso.valor / totalEgresos()
        let egresoHTML = `<div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${egreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(porcentajeEgreso)}</div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar_btn" onclick="eliminarEgreso(${egreso.id})">
                    <i class="ion-ios-close-circle-outline"> X</i>
                </button>
            </div>
        </div>
    </div>`
    return egresoHTML;
}


let eliminarEgreso = (_id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id == _id)
    if(indiceEliminar !== -1)
    {
        egresos.splice(indiceEliminar, 1)
        cargarCabecero();
        cargarEgresos();
    }
}


let agregarDato = () => {
    let forma = document.getElementById("forma")
    let select = forma.querySelectorAll('select');
    let inputDescripcion = forma.querySelectorAll('input[type="text"]')
    let inputValor = forma.querySelectorAll('input[type="number"]')
    let tipo = select[0].value
    let descripcion = inputDescripcion[0].value
    let value = inputValor[0].value
    if(descripcion !== "" && value !== "")
    {
        console.log(tipo)
        if(tipo == "ingreso")
        {
            // let ingreso = new Ingreso(descripcion, parseInt(value))
            // console.log(ingreso)
            ingresos.push(new Ingreso(descripcion, parseFloat(value)))
            cargarCabecero()
            cargarIngresos()
            defaultForm()
        }
        else
        {
            egresos.push(new Egreso(descripcion, parseFloat(value)))
            cargarCabecero()
            cargarEgresos()
            defaultForm()
        }
    }
    else
    {
        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "error",
            title: "Descripción y valor son requeridos"
          });
    }
}

let defaultForm = () => {
    const formulario = document.getElementById('forma');
    const elementos = formulario.elements;
    for (let i = 0; i < elementos.length; i++) {
        let elemento = elementos[i];
        if (elemento.tagName === 'INPUT') {
            elemento.value = '';
        } else if (elemento.tagName === 'SELECT') {
            elemento.selectedIndex = 0;
        } else if (elemento.tagName === 'TEXTAREA') {
            elemento.value = '';
        }
    }
}