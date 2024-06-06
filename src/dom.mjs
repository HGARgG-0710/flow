import { convert } from "./convert.mjs"

const _append = (element, children) => element.append(...children)

export const [appendparent, append] = Array(2)
	.fill(0)
	.map((_x, i) => convert(_append, i))
export const create = (document) => document.createElement.bind(document)
export const attribute = convert((element, name, value) =>
	element.setAttribute(name, value)
)
export const text = (document) => document.createTextNode.bind(document)
export const remove = convert((element, child) => element.removeChild(child))
export const clear = convert((element) =>
	Array.from(element).forEach((x) => element.removeChild(x))
)
export const query = (x) => (q) => x.querySelector(q)
export const mquery = (x) => (q) => x.querySelectorAll(q)
