import p5 from 'p5';

export class TileConnectionGame {
  private p: p5;
  private commands: (TileCommands | ControlCommands)[];
  private connections: { start: string; end: string }[];
  private animatedConnections: { start: string; end: string; progress: number }[];
  private ghostConnections: { start: string; end: string }[]; // New property for ghost connections
  private currentAnimationIndex: number;

  constructor(p: p5, commands: TileCommands[], toDoCommands: TileCommands[]) {
    this.p = p;
    this.commands = commands;
    this.connections = [];
    this.animatedConnections = [];
    this.ghostConnections = []; // Initialize ghost connections
    this.currentAnimationIndex = 0;
    this.processCommands(toDoCommands); // Initialize ghost connections in the constructor
  }

  update() {
    this.updateAnimation();
  }

  display() {
    this.p.background(255);
    this.drawGrid();
    this.drawConnections();
    this.drawGhostConnections(); // Draw the ghost connections
  }

  resetAnimation() {
    this.connections = [];
    this.animatedConnections = this.commands
      .filter((command): command is TileCommands => command.type === 'connect')
      .map((command) => ({
        start: command.start,
        end: command.end,
        progress: 0
      }));
    this.currentAnimationIndex = 0;
  }

  private processCommands(commands: (TileCommands | ControlCommands)[]) {
    this.ghostConnections = commands
      .filter((command): command is TileCommands => command.type === 'connect')
      .map((command) => ({
        start: command.start,
        end: command.end
      }));
  }

  private updateAnimation() {
    if (this.currentAnimationIndex < this.animatedConnections.length) {
      const currentConnection = this.animatedConnections[this.currentAnimationIndex];
      if (currentConnection.progress < 1) {
        currentConnection.progress += 0.02;
        if (currentConnection.progress > 1) {
          currentConnection.progress = 1;
          this.connections.push({
            start: currentConnection.start,
            end: currentConnection.end
          });
          this.currentAnimationIndex++;
        }
      }
    }
  }

  private drawGrid() {
    const cols = 10;
    const rows = 10;
    const tileSize = 40;
    this.p.stroke(0);
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        this.p.rect(i * tileSize, j * tileSize, tileSize, tileSize);
      }
    }
  }

  private drawConnections() {
    this.p.stroke(255, 0, 0);
    this.p.strokeWeight(4);

    // Draw completed connections
    for (const connection of this.connections) {
      this.drawLine(connection.start, connection.end, 1);
    }

    // Draw current animated connection
    if (this.currentAnimationIndex < this.animatedConnections.length) {
      const currentConnection = this.animatedConnections[this.currentAnimationIndex];
      this.drawLine(currentConnection.start, currentConnection.end, currentConnection.progress);
    }
  }

  private drawGhostConnections() {
    this.p.strokeWeight(2);
    this.p.stroke(0, 0, 0, 50); // Light blue color with transparency
    this.p.strokeWeight(2);

    // Draw all ghost connections
    for (const connection of this.ghostConnections) {
      this.drawLine(connection.start, connection.end, 1);
    }
  }

  private drawLine(start: string, end: string, progress: number) {
    const tileSize = 40;
    const [startCol, startRow] = start.split('');
    const [endCol, endRow] = end.split('');
    const startX = (startCol.charCodeAt(0) - 'A'.charCodeAt(0)) * tileSize + tileSize / 2;
    const startY = (parseInt(startRow) - 1) * tileSize + tileSize / 2;
    const endX = (endCol.charCodeAt(0) - 'A'.charCodeAt(0)) * tileSize + tileSize / 2;
    const endY = (parseInt(endRow) - 1) * tileSize + tileSize / 2;
    const progressX = startX + (endX - startX) * progress;
    const progressY = startY + (endY - startY) * progress;
    this.p.line(startX, startY, progressX, progressY);
  }
}
