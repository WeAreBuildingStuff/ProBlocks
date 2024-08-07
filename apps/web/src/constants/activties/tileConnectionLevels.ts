const tileGameLevels: TileCommands[][] = [
  // Level 1: Very easy
  [{ type: 'connect', start: 'A1', end: 'A2' }],
  // Level 2: Easy
  [
    { type: 'connect', start: 'A1', end: 'A2' },
    { type: 'connect', start: 'A2', end: 'A3' }
  ],
  // Level 3: Easy-medium
  [
    { type: 'connect', start: 'A1', end: 'B2' },
    { type: 'connect', start: 'B2', end: 'C3' },
    { type: 'connect', start: 'C3', end: 'D4' }
  ],
  // Level 4: Medium
  [
    { type: 'connect', start: 'A1', end: 'B2' },
    { type: 'connect', start: 'B2', end: 'C3' },
    { type: 'connect', start: 'C3', end: 'D4' },
    { type: 'connect', start: 'D4', end: 'E5' }
  ],
  // Level 5: Medium-hard
  [
    { type: 'connect', start: 'A1', end: 'C3' },
    { type: 'connect', start: 'C3', end: 'E5' },
    { type: 'connect', start: 'E5', end: 'G7' },
    { type: 'connect', start: 'G7', end: 'I9' }
  ],
  // Level 6: Hard
  [
    { type: 'connect', start: 'A1', end: 'C3' },
    { type: 'connect', start: 'C3', end: 'E5' },
    { type: 'connect', start: 'E5', end: 'G7' },
    { type: 'connect', start: 'G7', end: 'I9' },
    { type: 'connect', start: 'I9', end: 'J10' }
  ],
  // Level 7: Very hard
  [
    { type: 'connect', start: 'A1', end: 'D4' },
    { type: 'connect', start: 'D4', end: 'G7' },
    { type: 'connect', start: 'G7', end: 'J10' },
    { type: 'connect', start: 'A10', end: 'D7' },
    { type: 'connect', start: 'D7', end: 'G4' },
    { type: 'connect', start: 'G4', end: 'J1' }
  ]
];

export default tileGameLevels;
