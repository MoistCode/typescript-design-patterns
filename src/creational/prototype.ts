class ComponentWithBackReference {
    public prototype;

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

/**
 * This example class that has cloning ability. We'll see how the values of
 * field with different types will be cloned.
 */
class Prototype {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    public clone(): this {
        const clone = Object.create(this);

        clone.component = Object.create(this.component);

        /**
         * Cloning an object that has a nested object with back reference
         * requires special treatment. After the cloning is completed, the
         * nested object should point to the cloned object, instead of the
         * original object. Spread operator can be handy for this case.
         */
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }
}

function clientCode() {
    const p1 = new Prototype();
    p1.primitive = 245;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();

    if (p1.primitive === p2.primitive) {
        console.log('Primitive fields have been carried over to clone.');
    } else {
        console.log('Primitive values have _not_ been carried over.');
    }

    if (p1.component === p2.component) {
        console.log('Simgple component has not been cloned.');
    } else {
        console.log('Simgple component have been cloned.');
    }

    if (p1.circularReference === p2.circularReference) {
        console.log('Component with back ref is linked to original object.');
    } else {
        console.log('Component with back ref is linked to clone.');
    }
}