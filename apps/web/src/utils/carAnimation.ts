import p5 from 'p5';

type Command = 'forward' | 'backward' | 'turnLeft' | 'turnRight';

export class CarAnimation {
  private p: p5;
  private commands: Command[];
  private x: number;
  private y: number;
  private angle: number;
  private currentCommandIndex: number;
  private frameCounter: number;
  private moveSpeed: number;
  private turnSpeed: number;

  constructor(p: p5, commands: Command[]) {
    this.p = p;
    this.commands = commands;
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.currentCommandIndex = 0;
    this.frameCounter = 0;
    this.moveSpeed = 1;
    this.turnSpeed = 1;
  }

  update(isButtonPressed: boolean) {
    if (isButtonPressed && this.currentCommandIndex < this.commands.length) {
      const currentCommand = this.commands[this.currentCommandIndex];
      
      switch (currentCommand) {
        case 'forward':
          this.x += this.moveSpeed * this.p.cos(this.p.radians(this.angle));
          this.y += this.moveSpeed * this.p.sin(this.p.radians(this.angle));
          break;
        case 'backward':
          this.x -= this.moveSpeed * this.p.cos(this.p.radians(this.angle));
          this.y -= this.moveSpeed * this.p.sin(this.p.radians(this.angle));
          break;
        case 'turnLeft':
          this.angle -= this.turnSpeed;
          break;
        case 'turnRight':
          this.angle += this.turnSpeed;
          break;
      }

      this.frameCounter++;

      if (this.frameCounter >= 60) {
        this.currentCommandIndex++;
        this.frameCounter = 0;
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
    this.p.ellipse(15, 15, 10, 10);  // Wheel 2
    this.p.ellipse(-15, -15, 10, 10); // Wheel 3
    this.p.ellipse(15, -15, 10, 10);  // Wheel 4
    this.p.pop();
  }
}