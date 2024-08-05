const carGameLevels: CarCommands[][] = [
  // Level 1: Very easy
  [
    { type: 'forward', distance: 50 },
    { type: 'turnClockwise', degrees: 90 }
  ],
  // Level 2: Easy
  [
    { type: 'forward', distance: 100 },
    { type: 'turnClockwise', degrees: 90 },
    { type: 'forward', distance: 50 }
  ],
  // Level 3: Easy-medium
  [
    { type: 'forward', distance: 100 },
    { type: 'turnClockwise', degrees: 90 },
    { type: 'forward', distance: 50 },
    { type: 'turnCounterClockwise', degrees: 90 },
    { type: 'backward', distance: 30 }
  ],
  // Level 4: Medium
  [
    { type: 'forward', distance: 150 },
    { type: 'turnClockwise', degrees: 180 },
    { type: 'forward', distance: 75 },
    { type: 'turnCounterClockwise', degrees: 90 },
    { type: 'backward', distance: 50 }
  ],
  // Level 5: Medium-hard
  [
    { type: 'forward', distance: 200 },
    { type: 'turnClockwise', degrees: 90 },
    { type: 'backward', distance: 100 },
    { type: 'turnCounterClockwise', degrees: 45 },
    { type: 'forward', distance: 50 },
    { type: 'turnClockwise', degrees: 45 }
  ],
  // Level 6: Hard
  [
    { type: 'forward', distance: 300 },
    { type: 'turnClockwise', degrees: 90 },
    { type: 'forward', distance: 100 },
    { type: 'turnCounterClockwise', degrees: 90 },
    { type: 'backward', distance: 150 },
    { type: 'turnClockwise', degrees: 180 },
    { type: 'forward', distance: 50 }
  ],
  // Level 7: Very hard
  [
    { type: 'forward', distance: 400 },
    { type: 'turnClockwise', degrees: 45 },
    { type: 'forward', distance: 200 },
    { type: 'turnCounterClockwise', degrees: 135 },
    { type: 'backward', distance: 300 },
    { type: 'turnClockwise', degrees: 90 },
    { type: 'forward', distance: 100 },
    { type: 'turnCounterClockwise', degrees: 45 },
    { type: 'backward', distance: 50 }
  ]
];

export default carGameLevels;
