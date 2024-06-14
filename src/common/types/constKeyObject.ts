export type ConstKeyObject<Key extends string | number | symbol, Value> = {
  [key in Key]: Value;
};
