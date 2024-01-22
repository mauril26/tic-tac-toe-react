export type BoardLocation = {
  'x': 0 | 1 | 2,
  'y': 0 | 1 | 2
};

export function isLocation(value: unknown): value is BoardLocation {
  return (
    value != undefined
    && typeof value === 'object'
    && 'x' in value
    && 'y' in value
    && typeof value.x === 'number'
    && typeof value.y === 'number'
    && value.x in [0, 1, 2]
    && value.y in [0, 1, 2]
  );
}
