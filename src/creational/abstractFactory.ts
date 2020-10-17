/**
 * Resource: https://refactoring.guru/design-patterns/abstract-factory
 * 
 * Summary
 *      Allows production of families of related objects without specifying
 *      their concrete classes.
 * 
 * Applicability
 *      - Working with various families of related products and do not want
 *          it to depend on the concrete classes of those products; they may be
 *          unknown or you simply want to allow for future extensibility.
 * 
 * How to implement
 *      1. Map out matrix of distinct product types
 *      2. Declare abstract interfaces for all product types. Make concrete
 *          classes implement these interfaces
 *      3. Declare abstract factory interface with a set of creation methods for
 *          abstract products
 *      4. Implement a set of concrete factory classes, one for each variant
 *      5. Create factory initialization code. Should instantiate one of the
 *          concrete factory classes and pass this factory object to all classes
 *          that construct products
 *      6. Replace all direct calls to product constructors with calls to
 *          appropriate creation method on the factory object
 * 
 * Pros
 *      - Product compatibilities
 *      - Avoid tight coupling between concrete products and client code
 *      - Single Responsibility Principle via extracting product creation code
 *      - Open/Closed Principle via introduction of new variants without
 *          breaking existing code\
 * 
 * Cons
 *      - May get complicated due to lots of new interfaces and classes
 */

 /**
  * The Abstract Factory interface declares a set of methods that return
  * different abstract products. These products are called a family and are
  * related by a high-level theme or concept. Products of one family are usually
  * able to collaborate among themselves. A family of products may have several
  * variants, but the products of one variant are incompatible with products of
  * another.
  */
interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
}

/**
 * Each distinct product of a product family should have a base interface. All
 * variants of the product must implement this interface.
 */
interface AbstractProductA {
    usefulFunctionA(): string;
}

/**
 * Here's the base interface of another product. All products can interact with
 * each other, but proper interaction is possible only between products of the
 * same concrete variant.
 */
interface AbstractProductB {
    /**
     * Product B is able to do its own thing.
     */
    usefulFunctionB(): string;

    /**
     * Can also collaborate with ProductA.
     * 
     * The Abstract Factory makes sure that all products it creates are of the
     * same variant and thus, compatible.
     */
    anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'Product A1';
    }
}

class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'Product A2';
    }
}

class ConcreteProductB1 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'Product B1';
    }

    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `Another useful product B1 collaborating with ${result}`;
    }
}

class ConcreteProductB2 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'Product B2';
    }

    public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `Another useful product B2 collaborating with ${result}`;
    }
}

/**
 * Concrete Factories produce a family of products that belong to a single
 * variant. The factory guarantees that resulting products are compatible. Note
 * that signatures of the COncrete Factory's methods return an abstract product,
 * while inside the method a concrete product is instantiated.
 */

class ConcreteFactory1 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA1;
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB1;
    }
}

class ConcreteFactory2 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA2;
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB2;
    }
}

/**
 * The client code works with factories and products only through abstract
 * types: AbstractFactory and AbstractProduct. This lets you pass any factory
 * or product subclass to the client code without breaking it.
 */
function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFunctionB(productA));
}

console.log('Client: Testing with first factory type...');
clientCode(new ConcreteFactory1());

console.log('');

console.log('Client: Testing with second factory type....');
clientCode(new ConcreteFactory2());