// Import p5 and the necessary hooks and components
import p5 from 'p5';

export class BotDrawingGame {
  private p: p5;
  private commands: DrawingBotCommands[];
  private x: number;
  private y: number;
  private angle: number;
  private penDown: boolean;
  private currentCommandIndex: number;
  private distanceMoved: number;
  private angleTurned: number;

  constructor(p: p5, commands: DrawingBotCommands[]) {
    this.p = p;
    this.commands = commands;
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.penDown = true;
    this.currentCommandIndex = 0;
    this.distanceMoved = 0;
    this.angleTurned = 0;
  }

  update() {
    if (this.currentCommandIndex < this.commands.length) {
      const currentCommand = this.commands[this.currentCommandIndex];

      switch (currentCommand.type) {
        case 'forward':
          this.moveBot(currentCommand.distance, 1);
          break;
        case 'backward':
          this.moveBot(currentCommand.distance, -1);
          break;
        case 'turnCounterClockwise':
          this.turnBot(currentCommand.degrees, -1);
          break;
        case 'turnClockwise':
          this.turnBot(currentCommand.degrees, 1);
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
    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.rotate(this.p.radians(this.angle));
    this.p.fill(0, 0, 255);
    this.p.ellipse(0, 0, 10, 10); // Bot representation
    this.p.pop();
  }

  resetAnimation() {
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.penDown = true;
    this.currentCommandIndex = 0;
    this.distanceMoved = 0;
    this.angleTurned = 0;
  }

  private moveBot(distance: number, direction: number) {
    if (this.distanceMoved < distance) {
      const dx = this.p.cos(this.p.radians(this.angle)) * direction;
      const dy = this.p.sin(this.p.radians(this.angle)) * direction;
      if (this.penDown) {
        this.p.line(this.x, this.y, this.x + dx, this.y + dy);
      }
      this.x += dx;
      this.y += dy;
      this.distanceMoved++;
    } else {
      this.distanceMoved = 0;
      this.currentCommandIndex++;
    }
  }

  private turnBot(degrees: number, direction: number) {
    if (this.angleTurned < degrees) {
      this.angle += direction;
      this.angleTurned++;
    } else {
      this.angleTurned = 0;
      this.currentCommandIndex++;
    }
  }
}
