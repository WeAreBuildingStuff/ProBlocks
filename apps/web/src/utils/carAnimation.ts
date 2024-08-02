import p5 from 'p5';

export class CarAnimation {
  private p: p5;
  private commands: CarCommands[];
  private x: number;
  private y: number;
  private angle: number;
  private currentCommandIndex: number;
  private distanceMoved: number;
  private angleTurned: number;

  constructor(p: p5, commands: CarCommands[]) {
    this.p = p;
    this.commands = commands;
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.currentCommandIndex = 0;
    this.distanceMoved = 0;
    this.angleTurned = 0;
  }

  update() {
    if (this.currentCommandIndex < this.commands.length) {
      const currentCommand = this.commands[this.currentCommandIndex];

      switch (currentCommand.type) {
        case 'forward':
          if (this.distanceMoved < currentCommand.distance) {
            this.x += this.p.cos(this.p.radians(this.angle));
            this.y += this.p.sin(this.p.radians(this.angle));
            this.distanceMoved++;
          } else {
            this.distanceMoved = 0;
            this.currentCommandIndex++;
          }
          break;
        case 'backward':
          if (this.distanceMoved < currentCommand.distance) {
            this.x -= this.p.cos(this.p.radians(this.angle));
            this.y -= this.p.sin(this.p.radians(this.angle));
            this.distanceMoved++;
          } else {
            this.distanceMoved = 0;
            this.currentCommandIndex++;
          }
          break;
        case 'turnLeft':
          if (this.angleTurned < currentCommand.degrees) {
            this.angle -= 1;
            this.angleTurned++;
          } else {
            this.angleTurned = 0;
            this.currentCommandIndex++;
          }
          break;
        case 'turnRight':
          if (this.angleTurned < currentCommand.degrees) {
            this.angle += 1;
            this.angleTurned++;
          } else {
            this.angleTurned = 0;
            this.currentCommandIndex++;
          }
          break;
      }
    }
  }

  display() {
    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.rotate(this.p.radians(this.angle));
    this.p.rectMode(this.p.CENTER);
    this.p.fill(255, 0, 0);
    this.p.rect(0, 0, 50, 30); // Car body
    this.p.fill(0);
    this.p.ellipse(-15, 15, 10, 10); // Wheel 1
    this.p.ellipse(15, 15, 10, 10); // Wheel 2
    this.p.ellipse(-15, -15, 10, 10); // Wheel 3
    this.p.ellipse(15, -15, 10, 10); // Wheel 4
    this.p.pop();
    console.log(this.x, this.y);
  }

  resetAnimation() {
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.currentCommandIndex = 0;
    this.distanceMoved = 0;
    this.angleTurned = 0;
  }
}
