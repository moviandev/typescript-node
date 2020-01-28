export class Messenger {
  constructor(public port: number) {}

  messagePrint() {
    return `Node and express is running on port ${this.port}`;
  }
}

// namespace Messengespace {
//   export class Messenger {
//     constructor(public port: number) {}

//     messagePrint() {
//       return `Node and express is running on port ${this.port}`;
//     }
//   }
// }
