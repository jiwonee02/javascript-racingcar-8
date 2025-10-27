import { Console, Random } from "@woowacourse/mission-utils";
import { run } from "../src/App.js";

describe("App 통합 테스트", () => {
    afterEach(() => jest.restoreAllMocks());

    test("정상 입력 시 최종 우승자 출력", async () => {
        jest.spyOn(Console, "readLineAsync")
            .mockResolvedValueOnce("pobi,woni,jun")
            .mockResolvedValueOnce("2");
        jest.spyOn(Random, "pickNumberInRange").mockReturnValue(5);

        const printed = [];
        jest.spyOn(Console, "print").mockImplementation((msg) =>
            printed.push(String(msg))
        );

        await run();

        const out = printed.join("\n");
        expect(out).toContain("실행 결과");
        expect(out).toMatch(/pobi\s:\s--/);
        expect(out).toMatch(/woni\s:\s--/);
        expect(out).toMatch(/jun\s:\s--/);
        expect(out).toMatch(/^최종 우승자\s:\s.+$/m);
    });

    test("이름 6자 이상 입력 시 [ERROR]", async () => {
        jest.spyOn(Console, "readLineAsync")
            .mockResolvedValueOnce("toolongname,woni")
            .mockResolvedValueOnce("1");

        const printed = [];
        jest.spyOn(Console, "print").mockImplementation((msg) =>
            printed.push(String(msg))
        );

        await run();

        expect(printed.join("\n")).toMatch(/^\[ERROR]/m);
    });

    test("시도 횟수 0 입력 시 [ERROR]", async () => {
        jest.spyOn(Console, "readLineAsync")
            .mockResolvedValueOnce("pobi,woni")
            .mockResolvedValueOnce("0");

        const printed = [];
        jest.spyOn(Console, "print").mockImplementation((msg) =>
            printed.push(String(msg))
        );

        await run();

        expect(printed.join("\n")).toMatch(/^\[ERROR]/m);
    });
});
