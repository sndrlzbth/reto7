// Tipos de datos en TypeScript

// 1. Tipos de datos primitivos
let nombre: string = "Sandra";
let edad: number = 23; 
let estudiante: boolean = true;

// 2. Enumeraciones
enum Color {
    Rojo = "ROJO",
    Verde = "VERDE",
    Azul = "AZUL"
}

//Uso de enumeraciones
let colorFavorito: Color = Color.Rojo;

// 3. Tipos any y unknown
//Puede ser cualquier tipo
let variableAny: any = "Texto"; 
variableAny = 123; 

// Puede ser cualquier tipo, pero no se puede usar directamente
let variableUnknown: unknown;     
variableUnknown = "Texto";
// Debes verificar el tipo antes de usarlo
if (typeof variableUnknown === "string") {
    console.log(variableUnknown.length);
}

// 4. Tipos de unión e intersección
 // Unión de tipos
type ID = string | number;
// Puede ser un número
let id1: ID = 123;    
 // O puede ser un string     
let id2: ID = "ABC";      

type Persona = {
    nombre: string;
    edad: number;
};

type Trabajador = {
    salario: number;
};

// Intersección de tipos
type Empleado = Persona & Trabajador;

let empleado: Empleado = {
    nombre: "Carlos",
    edad: 28,
    salario: 3000
};

// 5. Tipos de colección
// Arrays
let numeros: number[] = [1, 2, 3, 4, 5];

// Tuplas
let tupla: [string, number] = ["Juan", 30];

// Sets
let conjunto: Set<number> = new Set([1, 2, 3, 1]);

// Maps
let mapa: Map<string, number> = new Map([
    ["uno", 1],
    ["dos", 2]
]);

// 6. Buenas prácticas para el uso de tipos
let descripcion: string = "Este es un proyecto en TypeScript";

interface Producto {
    id: number;
    nombre: string;
    precio: number;
}

const producto: Producto = {
    id: 1,
    nombre: "Laptop",
    precio: 1500
};

// Ejemplo de función con tipos
function calcularDescuento(precio: number, descuento: number): number {
    return precio - (precio * descuento / 100);
}

// Uso de la función
let precioFinal = calcularDescuento(producto.precio, 10);
console.log(`Precio final: ${precioFinal}`);


// Tipos de datos primitivos: Muestra cómo declarar variables de tipo string, number y boolean.

// Enumeraciones: Explica cómo crear y utilizar enumeraciones, que permiten tener un conjunto de constantes con nombre.

// Tipos any y unknown: Se presentan las diferencias entre estos dos tipos. any permite cualquier tipo sin chequeo de tipo, mientras que unknown requiere verificación de tipo antes de su uso.

// Tipos de unión e intersección: Se ejemplifica cómo usar tipos de unión (puede ser más de un tipo) y tipos de intersección (combinación de varios tipos).

// Tipos de colección: Se describen diferentes tipos de colección, como arrays, tuplas, sets y maps, mostrando cómo se declaran y utilizan.

// Buenas prácticas: Se enfatiza la importancia de usar tipos explícitos, definir interfaces para estructuras de datos y aprovechar las capacidades de TypeScript para mejorar la calidad del código.