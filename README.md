# flow

'flow' is a tiny library of (effectively) 2 functions that embodies a
very basic, but beautiful way of writing and organizing code involving
impure functions in a more "composite" fashion.

Ofttimes, one wants to alter the same state several different times:

```js
const object = {
	... // whatever
}

object.a = ... // whatever
object.b = ... // whatever
```

Define a 'flow', then, as a sequence of nested function calls
that allows primitives and two types of functions to be used:

1. Pure functions (return values dependent only on the arguments, without any side effects)
2. "Flow"-functions (may have side effects, but must return one of their initial arguments back)

The above code as a 'flow':

```js
const p = (x, p, v) => {
	x[p] => v
	return x
}
p(p({...}, "a", ...), "b", ...)
```

By utilizing the two, one is able to split one's code (however complex) into
multiple different flows, each of which works with a separate set of (possibly) related objects.

In certain applications (such as DOM-manipulation, or other OO APIs), usage of this style may come in very handy indeed,
and greatly reduce redundancies and decrease complexity.

The library contains two primary functions for conversion from a "regular" mutating function
into a 'flow'-one, as well as some few cases of application of these two functions...

## Installation

```
npm install @hgargg-0710/flow
```

## Documentation

### Functions

```js
function convert(f: Function, i?: number): Function
```

The function to be converted into a "flow" one.
The `i`'th argument is its return value.
(By default, `i = 0`)

NOTE: the function has a (minor) flaw - its produce takes 2 stack frames instead of 1 to complete.
May be solved in future releases/alternative provided.

```js
function flow(params: (Function | [Function, number])[]): Function[]
```

Uses 'convert' on all the values of `params`, returns array of converted functions.

### Submodules

#### `object`

```js
function prop(object: object, property: number | string | symbol, value: any): object
```

A flow-function that sets `property` on object
Returns the `object` argument.

#### `dom`

NOTE: the following functions are only available in a browser context.

```js
function appendparent(element: Element, children: (Node | string)[]): Element
```

Flow-version of `Element.append`. Returns `element`.

```js
function append(element: Element, children: (Node | string)[]): (Node | string)[]
```

Flow-version of `Element.append`. Returns `children`.

```js
function create(document: Document) => (tagName: string, options: object) => Element
```

Returns a functional version of `document.createElement` (the resulting function is bound to 'document').

```js
function attribute(element: Element, name: string, value: string) => Element
```

Flow-version of `Element.setAttribute`.
Returns the initial element.

```js
function text(document: Document) => (data: string) => Text
```

Returns a functional version of `Document.createTextNode` (bound to `document`).

```js
function remove(element: Node, child: Element) => Node
```

Flow-version of `Node.removeChild`. Returns `element`.

```js
function clear(element: Node) => Node
```

A flow function that removes all the children of `element`.

```js
function query(x: Element) => (q: string) => Element | null
```

Returns the first descendant of `x` satisfying the CSS selector `q`.
(Funcitonal analogue of `Element.querySelector`)

```js
function mquery(x: Element) => (q: string) => NodeList
```

Returns the first descendant of `x` satisfying the CSS selector `q`.
(Funcitonal analogue of `Element.querySelector`)