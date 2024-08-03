import parseTileCommands from '../../src/utils/parseTileCommands';

describe('parseTileCommands', () => {
  it('should parse connect command', () => {
    const input = 'connect(A, B)\n';
    const result = parseTileCommands(input);
    expect(result).toEqual([{ type: 'connect', start: 'A', end: 'B' }]);
  });

  it('should parse a sequence of connect commands', () => {
    const input = `
      connect(A, B)
      connect(B, C)
      connect(C, D)
    `;
    const result = parseTileCommands(input);
    expect(result).toEqual([
      { type: 'connect', start: 'A', end: 'B' },
      { type: 'connect', start: 'B', end: 'C' },
      { type: 'connect', start: 'C', end: 'D' }
    ]);
  });
});
