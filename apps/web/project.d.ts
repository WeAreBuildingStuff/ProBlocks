/* eslint-disable @typescript-eslint/no-explicit-any */

type CarCommands =
  | { type: 'forward'; distance: number }
  | { type: 'backward'; distance: number }
  | { type: 'turnClockwise'; degrees: number }
  | { type: 'turnCounterClockwise'; degrees: number };

type TileCommands = { type: 'connect'; start: string; end: string };

type DrawingBotCommands =
  | { type: 'forward'; distance: number }
  | { type: 'backward'; distance: number }
  | { type: 'turnClockwise'; degrees: number }
  | { type: 'turnCounterClockwise'; degrees: number }
  | { type: 'penDown' }
  | { type: 'penUp' };

type GameCommands = {
  car: CarCommands[];
  tile: TileCommands[];
  bot: DrawingBotCommands[];
};

type ControlCommands = { type: 'start' } | { type: 'stop' } | { type: 'reset' };

type Command = CarCommands | TileCommands | ControlCommands | DrawingBotCommands;

declare interface SpeechRecognition extends EventTarget {
  grammars: SpeechGrammarList;
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  serviceURI: string;

  start(): void;
  stop(): void;
  abort(): void;

  onaudiostart: (this: SpeechRecognition, ev: Event) => any;
  onsoundstart: (this: SpeechRecognition, ev: Event) => any;
  onspeechstart: (this: SpeechRecognition, ev: Event) => any;
  onspeechend: (this: SpeechRecognition, ev: Event) => any;
  onsoundend: (this: SpeechRecognition, ev: Event) => any;
  onaudioend: (this: SpeechRecognition, ev: Event) => any;
  onresult: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
  onnomatch: (this: SpeechRecognition, ev: SpeechRecognitionEvent) => any;
  onerror: (this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any;
  onstart: (this: SpeechRecognition, ev: Event) => any;
  onend: (this: SpeechRecognition, ev: Event) => any;
}

declare let SpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};

declare interface SpeechRecognitionErrorEvent extends Event {
  error:
    | 'no-speech'
    | 'aborted'
    | 'audio-capture'
    | 'network'
    | 'not-allowed'
    | 'service-not-allowed'
    | 'bad-grammar'
    | 'language-not-supported';
  message: string;
}

declare interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

declare interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

declare interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

declare interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare interface SpeechGrammarList {
  length: number;
  item(index: number): SpeechGrammar;
  addFromURI(src: string, weight?: number): void;
  addFromString(string: string, weight?: number): void;
}

declare interface SpeechGrammar {
  src: string;
  weight: number;
}

declare let webkitSpeechRecognition: {
  prototype: SpeechRecognition;
  new (): SpeechRecognition;
};
