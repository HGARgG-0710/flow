export function convert(f, i = 0) {
	return function (...args) {
		f.call(this, ...args)
		return args[i]
	}
}

export const flow = (...fs) => fs.map((x) => convert(...(x instanceof Array ? x : [x])))
