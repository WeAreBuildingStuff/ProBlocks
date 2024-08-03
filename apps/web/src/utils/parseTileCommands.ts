export default function parseTileCommands(input: string): TileCommands[] {
  const commands: TileCommands[] = [];

  const lines = input.split('\n');
  for (const line of lines) {
    const matchConnect = line.match(/connect\(([^,]+),\s*([^)]+)\)/);
    if (matchConnect) {
      commands.push({ type: 'connect', start: matchConnect[1], end: matchConnect[2] });
    }
  }

  return commands;
}
