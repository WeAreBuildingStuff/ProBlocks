import parseCarCommands from '../../src/utils/parseCarCommands';

describe('parseCarCommands', () => {
  it('should parse forward command', () => {
    const input = 'forward(10)\n';
    const result = parseCarCommands(input);
    expect(result).toEqual([{ type: 'forward', distance: 10 }]);
  });

  it('should parse backward command', () => {
    const input = 'backward(5)\n';
    const result = parseCarCommands(input);
    expect(result).toEqual([{ type: 'backward', distance: 5 }]);
  });

  it('should parse turnClockwise command', () => {
    const input = 'turnClockwise(90)\n';
    const result = parseCarCommands(input);
    expect(result).toEqual([{ type: 'turnClockwise', degrees: 90 }]);
  });

  it('should parse turnCounterClockwise command', () => {
    const input = 'turnCounterClockwise(45)\n';
    const result = parseCarCommands(input);
    expect(result).toEqual([{ type: 'turnCounterClockwise', degrees: 45 }]);
  });

  it('should parse a sequence of commands', () => {
    const input = `
      forward(10)
      backward(5)
      turnClockwise(90)
      turnCounterClockwise(45)
    `;
    const result = parseCarCommands(input);
    expect(result).toEqual([
      { type: 'forward', distance: 10 },
      { type: 'backward', distance: 5 },
      { type: 'turnClockwise', degrees: 90 },
      { type: 'turnCounterClockwise', degrees: 45 }
    ]);
  });
});
