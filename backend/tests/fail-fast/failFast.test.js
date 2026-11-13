describe("Demonstração de Fail Fast", () => {
  test("deve falhar propositalmente para interromper a pipeline", () => {
    expect(true).toBe(false);
  });
});