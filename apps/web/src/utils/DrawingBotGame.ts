import p5 from 'p5';

//TODO: Fix does not draw line - Arrow Indication of where its facing
export class DrawingBotGame {
  private p: p5;
  private commands: DrawingBotCommands[];
  private x: number;
  private y: number;
  private angle: number;
  private penDown: boolean;
  private currentCommandIndex: number;
  private distanceRemaining: number;
  private turnDegreesRemaining: number;

  // Array to store lines drawn
  private lines: { x1: number; y1: number; x2: number; y2: number }[] = [];

  constructor(p: p5, commands: DrawingBotCommands[]) {
    this.p = p;
    this.commands = commands;
    this.x = 200;
    this.y = 300;
    this.angle = 0;
    this.penDown = true;
    this.currentCommandIndex = 0;
    this.distanceRemaining = 0;
    this.turnDegreesRemaining = 0;
  }

  update() {
    if (this.currentCommandIndex < this.commands.length) {
      const currentCommand = this.commands[this.currentCommandIndex];
      console.log(this.distanceRemaining);

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
          this.distanceRemaining = currentCommand.distance;
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

    // Redraw all stored lines
    this.p.stroke(0); // Set line color to black
    this.lines.forEach((line) => {
      this.p.line(line.x1, line.y1, line.x2, line.y2);
    });

    // Draw the bot
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
  }

  private moveBot(backward: boolean = false) {
    if (this.distanceRemaining > 0) {
      // Calculate the step size based on the remaining distance
      const maxStep = Math.min(1, this.distanceRemaining);
      const direction = backward ? -1 : 1;
      const dx = this.p.cos(this.p.radians(this.angle)) * maxStep * direction;
      const dy = this.p.sin(this.p.radians(this.angle)) * maxStep * direction;

      // Calculate the new position
      const newX = this.x + dx;
      const newY = this.y + dy;

      if (this.penDown) {
        // Store the line to be redrawn in the display method
        this.lines.push({ x1: this.x, y1: this.y, x2: newX, y2: newY });
      }

      // Update the bot's position
      this.x = newX;
      this.y = newY;
      this.distanceRemaining -= Math.abs(maxStep);

      // Move to the next command if distance is fully covered
      if (this.distanceRemaining <= 0) {
        this.distanceRemaining = 0; // Ensure it's zero
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
}
