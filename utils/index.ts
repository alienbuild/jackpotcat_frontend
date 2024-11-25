export const generateRandomDelay = () => {
    return (Math.random() * 2).toFixed(2) + "s";
};

export function generateRandomNumbers(count: number = 7): number[] {
    const numbers = new Set<number>();

    while (numbers.size < count) {
        const randomNum = Math.floor(Math.random() * 49) + 1;
        numbers.add(randomNum);
    }

    return Array.from(numbers);
}