import p5 from 'p5';

export class DrawingBotGame {
  private p: p5;
  private commands: DrawingBotCommands[];
  private ghostCommands: DrawingBotCommands[];
  private x: number;
  private y: number;
  private angle: number;
  private penDown: boolean;
  private currentCommandIndex: number;
  private distanceRemaining: number;
  private turnDegreesRemaining: number;
  private lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  private ghostLines: { x1: number; y1: number; x2: number; y2: number }[] = [];

  constructor(p: p5, commands: DrawingBotCommands[], ghostCommands: DrawingBotCommands[] = []) {
    this.p = p;
    this.commands = commands;
    this.ghostCommands = ghostCommands;
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.penDown = true;
    this.currentCommandIndex = 0;
    this.distanceRemaining = 0;
    this.turnDegreesRemaining = 0;
    this.calculateGhostPath(); // Initialize ghost path calculations
  }

  update() {
    if (this.currentCommandIndex < this.commands.length) {
      const currentCommand = this.commands[this.currentCommandIndex];

      switch (currentCommand.type) {
        case 'forward':
          if (this.distanceRemaining <= 0) {
            this.distanceRemaining = currentCommand.distance;
          }
          this.moveBot();
          break;
        case 'backward':
          if (this.distanceRemaining <= 0) {
            this.distanceRemaining = currentCommand.distance;
          }
          this.moveBot(true); // True for backward direction
          break;
        case 'turnCounterClockwise':
          if (this.turnDegreesRemaining <= 0) {
            this.turnDegreesRemaining = currentCommand.degrees;
          }
          this.turnBot(true); // True for counter-clockwise
          break;
        case 'turnClockwise':
          if (this.turnDegreesRemaining <= 0) {
            this.turnDegreesRemaining = currentCommand.degrees;
          }
          this.turnBot(); // Default to clockwise
          break;
        case 'penUp':
          this.penDown = false;
          this.currentCommandIndex++;
          break;
        case 'penDown':
          this.penDown = true;
          this.currentCommandIndex++;
          break;
      }
    }
  }

  display() {
    this.p.clear(); // Clear the canvas each frame

    // Draw ghost lines
    this.p.strokeWeight(3);
    this.p.stroke(0, 0, 0, 20); // Light red color with transparency
    this.ghostLines.forEach((line) => {
      this.p.line(line.x1, line.y1, line.x2, line.y2);
    });

    this.p.strokeWeight(5);

    // Redraw all stored lines
    this.p.stroke(0); // Set line color to black
    this.lines.forEach((line) => {
      this.p.line(line.x1, line.y1, line.x2, line.y2);
    });

    // Draw the bot
    this.p.strokeWeight(2);
    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.rotate(this.p.radians(this.angle));
    this.p.fill(0, 0, 255);
    this.p.ellipse(0, 0, 20, 20); // Bot representation (larger)

    // Draw the arrow indicating direction
    this.p.fill(255, 0, 0); // Red color for the arrow
    this.p.noStroke();
    this.p.triangle(30, 0, 15, 7.5, 15, -7.5); // Arrow representation (ahead of the bot)
    this.p.pop();
  }

  resetAnimation() {
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.penDown = true;
    this.currentCommandIndex = 0;
    this.distanceRemaining = 0;
    this.turnDegreesRemaining = 0;
    this.lines = []; // Clear the stored lines
    this.calculateGhostPath(); // Recalculate ghost lines
  }

  private moveBot(backward: boolean = false) {
    if (this.distanceRemaining > 0) {
      const maxStep = Math.min(1, this.distanceRemaining);
      const direction = backward ? -1 : 1;
      const dx = this.p.cos(this.p.radians(this.angle)) * maxStep * direction;
      const dy = this.p.sin(this.p.radians(this.angle)) * maxStep * direction;

      const newX = this.x + dx;
      const newY = this.y + dy;

      if (this.penDown) {
        this.lines.push({ x1: this.x, y1: this.y, x2: newX, y2: newY });
      }

      this.x = newX;
      this.y = newY;
      this.distanceRemaining -= Math.abs(maxStep);

      if (this.distanceRemaining <= 0) {
        this.distanceRemaining = 0;
        this.currentCommandIndex++;
      }
    }
  }

  private turnBot(counterClockwise: boolean = false) {
    if (this.turnDegreesRemaining > 0) {
      const step = 1;
      const direction = counterClockwise ? -1 : 1;

      this.angle += step * direction;
      this.turnDegreesRemaining -= Math.abs(step);

      if (this.turnDegreesRemaining <= 0) {
        this.currentCommandIndex++;
      }
    }
  }

  private calculateGhostPath() {
    this.ghostLines = [];
    let ghostX = 200;
    let ghostY = 300;
    let ghostAngle = 0;
    let penDown = true;

    this.ghostCommands.forEach((command) => {
      switch (command.type) {
        case 'forward':
        case 'backward': {
          const distance = command.distance;
          const direction = command.type === 'backward' ? -1 : 1;
          const dx = this.p.cos(this.p.radians(ghostAngle)) * distance * direction;
          const dy = this.p.sin(this.p.radians(ghostAngle)) * distance * direction;

          const newX = ghostX + dx;
          const newY = ghostY + dy;

          if (penDown) {
            this.ghostLines.push({ x1: ghostX, y1: ghostY, x2: newX, y2: newY });
          }

          ghostX = newX;
          ghostY = newY;
          break;
        }
        case 'turnCounterClockwise':
          ghostAngle -= command.degrees;
          break;
        case 'turnClockwise':
          ghostAngle += command.degrees;
          break;
        case 'penUp':
          penDown = false;
          break;
        case 'penDown':
          penDown = true;
          break;
      }
    });
  }
}
