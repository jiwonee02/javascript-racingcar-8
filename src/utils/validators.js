import { NAME_MAX_LEN, RANDOM_MIN, RANDOM_MAX } from "./constants.js";

function isBlank(str) {
    return typeof str !== "string" || str.trim().length === 0;
}

function hasInvalidCommaPlacement(raw) {
    const s = String(raw).replace(/\s+/g, "");
    return s.startsWith(",") || s.endsWith(",") || s.includes(",,");
}

export function parseAndValidateNames(input) {
    if (typeof input !== "string") {
        throw new Error("[ERROR] 이름은 비워둘 수 없습니다.");
    }

    if (hasInvalidCommaPlacement(input)) {
        throw new Error("[ERROR] 잘못된 구분자 배치입니다.");
    }

    const names = input.split(",").map((s) => s.trim());

    if (names.length === 0 || names.some((n) => n.length === 0)) {
        throw new Error("[ERROR] 이름은 비워둘 수 없습니다.");
    }

    if (names.some((n) => n.length > NAME_MAX_LEN)) {
        throw new Error("[ERROR] 이름은 1~5자 이내여야 합니다.");
    }

    const set = new Set(names);
    if (set.size !== names.length) {
        throw new Error("[ERROR] 중복된 이름이 존재합니다.");
    }

    return names;
}

export function parseAndValidateRounds(input) {
    const raw = String(input ?? "");

    if (isBlank(raw)) {
        throw new Error("[ERROR] 시도 횟수를 입력해야 합니다.");
    }

    if (!/^\d+$/.test(raw)) {
        throw new Error("[ERROR] 시도 횟수는 1 이상의 정수여야 합니다.");
    }

    const n = Number(raw);
    if (n <= 0) {
        throw new Error("[ERROR] 시도 횟수는 1 이상의 정수여야 합니다.");
    }

    return n;
}

export function assertNonEmptyCarList(cars) {
    if (!Array.isArray(cars) || cars.length === 0) {
        throw new Error("[ERROR] 경주할 자동차가 없습니다.");
    }
}

export function assertValidRandomValue(n) {
    if (typeof n !== "number" || Number.isNaN(n)) {
        throw new Error("[ERROR] 유효하지 않은 난수 값입니다.");
    }
    if (n < RANDOM_MIN || n > RANDOM_MAX) {
        throw new Error("[ERROR] 유효하지 않은 난수 값입니다.");
    }
}
