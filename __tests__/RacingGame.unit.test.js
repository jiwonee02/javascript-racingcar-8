import Car from "../src/models/Car.js";
import RacingGame from "../src/services/RacingGame.js";

describe("RacingGame - 전진 규칙 및 라운드 진행", () => {
    test("난수가 4 이상일 때만 전진한다", () => {
        const cars = [new Car("a"), new Car("b")];
        const picks = [4, 3];
        let i = 0;
        const picker = () => picks[i++];

        const game = new RacingGame(cars, 1, picker);
        for (const _ of game.roundGenerator()) {
        }

        expect(cars.map((c) => c.position)).toEqual([1, 0]);
    });

    test("여러 라운드 누적 이동이 정상 동작한다", () => {
        const cars = [new Car("x")];
        const picks = [5, 1, 9];
        let i = 0;
        const picker = () => picks[i++];

        const game = new RacingGame(cars, 3, picker);
        for (const _ of game.roundGenerator()) {
        }

        expect(cars[0].position).toBe(2);
    });
});
