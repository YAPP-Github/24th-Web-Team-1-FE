import { compareDates } from "../compareDates";
describe("시간비교하기", () => {
  test("2024-01-12", () => {
    expect(compareDates("2024-01-12")).toEqual(true);
  });
});
