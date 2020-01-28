function messagePrint(target) {
  Object.defineProperty(target, 'server', {
    value: () => 'Node server is running',
  });
}
@messagePrint
export class Message {
  constructor(public name: string) {}
}
