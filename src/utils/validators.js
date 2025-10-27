import { NAME_MAX_LEN } from "./constants";

export function parseAndValidateNames(input) {
    if (typeof input !== "string") {
        throw new Error("[ERROR] 이름 입력이 잘못되었습니다.");
    }
    const names = input.split(",").map((s) => s.trim());

    if (names.length === 0 || names.some((n) => n.length === 0)) {
        throw new Error("[ERROR] 빈 이름은 허용되지 않습니다.");
    }
    if (names.some((n) => n.length > NAME_MAX_LEN)) {
        throw new Error("[ERROR] 이름은 1~${NAEM_MAX_LEN}자 이내여야 합니다.");
    }
    const unique = new Set(names);
    if (unique.size !== names.length) {
        throw new Error("[ERROR] 중복된 이름이 존재합니다.");
    }
    return names;
}

export function parseAndValidateRounds(input) {
    const raw = String(input);
    if (!/^\d+$/.test(raw)) {
        throw new Error("[ERROR] 시도 횟수는 1 이상의 정수여야 합니다.");
    }
    const n = Number(raw);
    if (n <= 0) {
        throw new Error("[ERROR] 시도 횟수는 1 이상의 정수여야 합니다.");
    }
    return n;
}
