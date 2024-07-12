"use client"

import DrawingCanvas from "../../components/drawingCanvas";
import { Button } from "@repo/ui/src/components/button";
import { useState } from "react";

export default function Page(): JSX.Element {
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);

  return (
    <main className="w-screen flex-1 flex flex-col items-center bg-neutral-100 p-24">
      <Button onClick={() => setIsButtonPressed(true)}>Send</Button>
      <DrawingCanvas commands={['forward', 'turnLeft', 'forward', 'turnRight', 'backward']} isButtonPressed={isButtonPressed} />
    </main>
  );
}
