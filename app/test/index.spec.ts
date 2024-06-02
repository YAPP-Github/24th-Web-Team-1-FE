function sam(props: { a: number; b: number }) {
  const { a, b } = props;
  return a + b;
}

it('test', () => {
  expect(sam({ a: 1, b: 2 })).toBe(3);
});
