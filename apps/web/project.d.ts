type CarCommands =
  | { type: 'forward'; distance: number }
  | { type: 'backward'; distance: number }
  | { type: 'turnLeft'; degrees: number }
  | { type: 'turnRight'; degrees: number };

// Command types for TileConnectionGame
type TileCommands = { type: 'connect'; start: string; end: string };

type DrawingBotCommands =
  | { type: 'forward'; distance: number }
  | { type: 'backward'; distance: number }
  | { type: 'turnLeft'; degrees: number }
  | { type: 'turnRight'; degrees: number }
  | { type: 'penDown' }
  | { type: 'penUp' };

// Control commands that are common to all games
type ControlCommands = { type: 'start' } | { type: 'stop' } | { type: 'reset' };

type Command = CarCommands | TileCommands | ControlCommands | DrawingBotCommands;
