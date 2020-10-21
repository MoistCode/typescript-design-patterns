/**
 * Resource: https://refactoring.guru/design-patterns/factory-method/typescript/example#lang-features
 * 
 * Summary:
 *      Definition of a method used for creating objects instead of a direct
 *      constructor call.
 * 
 * Identification:
 *      Creation methods that creates objects from concrete classes but returns
 *      them as objects of abstract types of interface.
 */

/**
 * Declares operations that all concrete products must implement.
 */
interface Product {
    operation(): string;
}

/**
 * Concrete Products providing various implements of the Product interface
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return 'ConcreteProduct1';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return 'ConcreteProduct2'
    }
}

 /**
  * Creator class declares factory method that returns an object of a Product
  * class. Subclasses usually provide the implementation of this method.
  * 
  * Despite the name, the primary responsibility is not creating products.
  * Usually contains business logic that relies on Product objects. Product
  * objects can override the factory method and return a different type of
  * product from it.
  */
abstract class Creator {
     public abstract factoryMethod(): Product;

     public someOperation(): string {
        const product = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
     }
 }

/**
 * Concrete creators overriding factory method to change resulting product type.
 */
class ConcreteCreator1 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

function clientCode(creator: Creator) {
    console.log('Client: Creator class still works');
    console.log(creator.someOperation());
}

console.log('ConcreteCreator1');
clientCode(new ConcreteCreator1());

console.log('ConcreteCreator2');
clientCode(new ConcreteCreator2());