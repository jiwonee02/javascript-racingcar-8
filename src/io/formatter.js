export function formatCarLine(car) {
    return `${car.name} : ${"-".repeat(car.position)}`;
}

export function formatWinners(cars) {
    const max = Math.max(...cars.map((c) => c.position));
    const winners = cars.filter((c) => c.position === max).map((c) => c.name);
    return `최종 우승자 : ${winners.join(", ")}`;
}
