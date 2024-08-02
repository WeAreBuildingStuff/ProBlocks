type Command =
  | { type: 'forward'; distance: number }
  | { type: 'backward'; distance: number }
  | { type: 'turnLeft'; degrees: number }
  | { type: 'turnRight'; degrees: number };
