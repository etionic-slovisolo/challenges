class Trago {
  constructor(trago) {
    this.name = trago.name || null;
    this.alcohol = trago.alcohol || null;
    this.precio = trago.precio || null;
    this.stock = trago.stock || null;
  }

  get name() {
    return this._name;
  }

  get alcohol() {
    return this._alcohol;
  }

  get precio() {
    return this._precio;
  }

  get stock() {
    return this._stock;
  }

  set name(value) {
    this._name = value;
  }

  set alcohol(value) {
    this._alcohol = value;
  }

  set precio(value) {
    this._precio = value;
  }

  set stock(value) {
    this._stock = value;
  }

  substractStock() {
    if (this._stock > 0) {
      this._stock--;
    }
  }
  getAlcoholPrecio() {
    return this._alcohol / this._precio;
  }
}

const vino = new Trago({
  precio: 200,
  alcohol: 0.12,
  stock: 30,
  name: "vino",
});

const cerveza = new Trago({
  precio: 100,
  alcohol: 0.05,
  stock: 50,
  name: "cerveza",
});

const fernetcola = new Trago({
  precio: 300,
  alcohol: 0.13,
  stock: 40,
  name: "fernetcola",
});

const CANTIDAD_DE_PERSONAS = 15;
const TRAGOS = [vino, cerveza, fernetcola];

class Person {
  cantidad = 5;
  tragos = {
    vino: 0,
    cerveza: 0,
    fernetcola: 0,
  };
  constructor() {}

  checkCantidad() {
    if (this.cantidad <= 0) {
      return false;
    }

    return true;
  }

  agregarVino() {
    if (this.checkCantidad) {
      this.cantidad--;
      this.tragos.vino++;
    }
  }

  agregarCerveza() {
    if (this.checkCantidad) {
      this.cantidad--;
      this.tragos.cerveza++;
    }
  }

  agregarFernetcola() {
    if (this.cantidad) {
      this.cantidad--;
      this.tragos.fernetcola++;
    }
  }
}

const PERSONAS = [];
let resultado = null;

function setInitialValues() {
  for (let i = 0; i < CANTIDAD_DE_PERSONAS; i++) {
    let person = new Person();

    if (vino.stock > 0) {
      person.agregarVino();
      vino.substractStock();
    }

    if (cerveza.stock > 0) {
      person.agregarCerveza();
      cerveza.substractStock();
    }

    if (fernetcola.stock > 0) {
      person.agregarFernetcola();
      fernetcola.substractStock();
    }

    PERSONAS.push(person);
  }
}

function setTragos() {
  PERSONAS.forEach((persona) => {
    while (persona.cantidad > 0) {
      let promedio = 0;
      let trago_seleccionado = null;

      for (trago of TRAGOS) {
        if (trago.stock > 0 && trago.getAlcoholPrecio() > promedio) {
          promedio = trago.getAlcoholPrecio();
          trago_seleccionado = trago;
        }
      }

      switch (trago_seleccionado.name) {
        case "vino":
          persona.agregarVino();
          vino.substractStock();
          break;
        case "cerveza":
          persona.agregarCerveza();
          cerveza.substractStock();
          break;
        case "fernetcola":
          persona.agregarFernetcola();
          fernetcola.substractStock();
          break;
      }
    }
  });
}

function setResultado() {
  resultado = PERSONAS.reduce((initValue, currentValue) => {
    initValue.tragos.vino += currentValue.tragos.vino;
    initValue.tragos.cerveza += currentValue.tragos.cerveza;
    initValue.tragos.fernetcola += currentValue.tragos.fernetcola;

    return initValue;
  });
}

setInitialValues();
setTragos();
setResultado();

console.log(resultado)
