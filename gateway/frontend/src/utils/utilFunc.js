
export function indexList(b) {
        const range = (b) =>
            Array.from({ length: Math.abs(b - 1) + 1 }, (_, i) => Math.min(1, b) + i);
        return range(b)
    }