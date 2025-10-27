import { Random } from "@woowacourse/mission-utils";
import { RANDOM_MIN, RANDOM_MAX, MOVE_THRESHOLD } from "../utils/constants";

export default class RacingGame {
    #cars;
    #rounds;
    #pick;

    constructor(
        cars,
        rounds,
        numberPicker = () => Random.pickNumberInRange(RANDOM_MIN, RANDOM_MAX)
    ) {
        this.#cars = cars;
        this.#rounds = rounds;
        this.#pick = numberPicker;
    }

    *roundGenerator() {
        for (let r = 0; r < this.#rounds; r += 1) {
            for (const car of this.#cars) {
                const n = this.#pick();
                if (n >= MOVE_THRESHOLD) car.move();
            }
            yield this.#cars;
        }
    }
}
