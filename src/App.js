import { Console } from "@woowacourse/mission-utils";
import Car from "./models/Car";
import RacingGame from "./services/RacingGame";
import {
    parseAndValidateNames,
    parseAndValidateRounds,
} from "./utils/validators";
import { formatCarLine, formatWinners } from "./io/formatter";

async function ask(q) {
    return Console.readLineAsync(q);
}

class App {
    async run() {
        try {
            const namesRaw = await ask(
                "경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n"
            );
            const names = parseAndValidateNames(namesRaw);

            const roundsRaw = await ask("시도할 횟수는 몇 회인가요?\n");
            const rounds = parseAndValidateRounds(roundsRaw);

            Console.print("\n실행 결과");
            const cars = names.map((n) => new Car(n));
            const game = new RacingGame(cars, rounds);

            for (const _ of game.roundGenerator()) {
                for (const car of cars) Console.print(formatCarLine(car));
                Console.print("");
            }

            Console.print(formatWinners(cars));
        } catch (e) {
            const raw = String(e?.message ?? e);
            const msg = raw.startsWith("[ERROR]") ? raw : `[ERROR] ${raw}`;
            Console.print(msg);

            throw new Error(msg);
        }
    }
}

export default App;

export const run = async () => {
    const app = new App();
    return app.run();
};
