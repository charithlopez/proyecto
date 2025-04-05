class objeto_material {
    constructor({ nombre, medida, precio } = {}) {
        this.nombre = nombre;
        this.medida = medida;
        this.precio = precio;
    }
}

class objeto_material_especifico extends objeto_material {
    constructor({ nombre, precio } = {}) {
        super({ nombre, precio });
    }
}

const materiales = [];
const materiales_especificos = [];
const materiales_cotizados = [];

function menu() {
    console.log("1. Agregar material");
    console.log("2. Mostrar materiales");
    console.log("3. Realizar cotización");
    console.log("4. Salir");
}

function agregarMaterial() {
    let opcion = prompt("1. Material general\n2. Material específico\nSeleccione una opción:");
    if (opcion == 1) {
        let nombre = prompt("Nombre del material:");
        let medida = prompt("Medida del material en m2:");
        let precio = parseFloat(prompt("Precio del material:"));
        if (isNaN(precio)) {
            console.log("El precio debe ser un número válido.");
            return;
        }
        const material = new objeto_material({ nombre, medida, precio });
        materiales.push(material);
        console.log("Material general agregado:", material);
    } else if (opcion == 2) {
        let nombre = prompt("Nombre del material:");
        let precio = parseFloat(prompt("Precio del material:"));
        if (isNaN(precio)) {
            console.log("El precio debe ser un número válido.");
            return;
        }
        const material = new objeto_material_especifico({ nombre, precio });
        materiales_especificos.push(material);
        console.log("Material específico agregado:", material);
    } else {
        console.log("Opción no válida.");
    }
}

function realizarCotizacion() {
    while (true) {
        console.log("Materiales generales:");
        materiales.forEach((material, index) => {
            console.log(`${index + 1}. Nombre: ${material.nombre}, Medida: ${material.medida}, Precio: ${material.precio}`);
        });

        console.log("Materiales específicos:");
        materiales_especificos.forEach((material, index) => {
            console.log(`${index + 1}. Nombre: ${material.nombre}, Precio: ${material.precio}`);
        });

        let nombreMaterial = prompt("Ingrese el nombre del material que necesita:");
        let materialSeleccionado =
            materiales.find((material) => material.nombre === nombreMaterial) ||
            materiales_especificos.find((material) => material.nombre === nombreMaterial);

        if (!materialSeleccionado) {
            console.log("El material ingresado no existe. Intente nuevamente.");
            continue;
        }

        let cantidad = parseFloat(prompt("Ingrese la cantidad que necesita:"));
        if (isNaN(cantidad)) {
            console.log("La cantidad debe ser un número válido.");
            continue;
        }

        let total = materialSeleccionado.precio * cantidad;
        console.log(`Material seleccionado: ${materialSeleccionado.nombre}`);
        console.log(`Precio unitario: ${materialSeleccionado.precio}`);
        console.log(`Cantidad: ${cantidad}`);
        console.log(`Total: ${total}`);

        materiales_cotizados.push({
            nombre: materialSeleccionado.nombre,
            cantidad,
            precioUnitario: materialSeleccionado.precio,
            total,
        });

        let continuar = prompt("¿Desea añadir otro material a la cotización? (si/no):").toLowerCase();
        if (continuar !== "si") {
            break;
        }
    }

    // Imprimir resumen de la cotización
    console.log("\nResumen de la cotización:");
    let precioTotal = 0;
    materiales_cotizados.forEach((material, index) => {
        console.log(
            `${index + 1}. Nombre: ${material.nombre}, Precio unitario: ${material.precioUnitario}, Cantidad: ${material.cantidad}, Total: ${material.total}`
        );
        precioTotal += material.total;
    });
    console.log(`\nPrecio total de todos los materiales: ${precioTotal}`);
}

while (true) {
    menu();
    let opcion = prompt("Seleccione una opción:");
    if (opcion == 1) {
        agregarMaterial();
    } else if (opcion == 2) {
        console.log("Materiales generales:", materiales);
        console.log("Materiales específicos:", materiales_especificos);
    } else if (opcion == 3) {
        realizarCotizacion();
    } else if (opcion == 4) {
        console.log("Saliendo...");
        break;
    } else {
        console.log("Opción inválida. Intente de nuevo.");
    }
}