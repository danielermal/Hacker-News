import { getTime } from "./constants";

describe("Проверка функции перевода времени", () => {
  test("Тестирование нуля", () => {
    expect(getTime(0, true)).toBe("00:00  01.01.1970");
  });
  test("Тестирование 05.11.2022, 23:15", () => {
    const timeUTC =
      new Date(Date.UTC(2022, 11, 5, 23, 15, 0, 0)).getTime() / 1000;
    expect(getTime(timeUTC, true)).toBe("23:15  05.12.2022");
  });
});
