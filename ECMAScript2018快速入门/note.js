function CarFn(name){
    this.name = name;
}

class CarClass {
    constructor(name){
        this.name = name;
    }
}

const car_fn = new CarFn('Jap-fn');
const car_class = new CarClass('Jap-class');

console.log(CarFn[Symbol.hasInstance](car_fn)); // ture
console.log(CarClass[Symbol.hasInstance](car_class)); // true

