/**
* Custom agent prototype
* @param {String} id
* @constructor
* @extend eve.Agent
*/
export function FoldermenuAgent(id, app) {
  // execute super constructor
  eve.Agent.call(this, id);
  this.app = app; // connect to all transports configured by the system

  this.connect(eve.system.transports.getAll());
} // extend the eve.Agent prototype

FoldermenuAgent.prototype = Object.create(eve.Agent.prototype);
FoldermenuAgent.prototype.constructor = FoldermenuAgent;
/**
* Send a greeting to an agent
* @param {String} to
*/

FoldermenuAgent.prototype.sayHello = function (to) {
  this.send(to, 'Hello ' + to + '!');
};
/**
* Handle incoming greetings. This overloads the default receive,
* so we can't use FoldermenuAgent.on(pattern, listener) anymore
* @param {String} from     Id of the sender
* @param {*} message       Received message, a JSON object (often a string)
*/


FoldermenuAgent.prototype.receive = function (from, message) {
  if (typeof message == String && message.indexOf('Hello') === 0) {
    // reply to the greeting
    this.send(from, 'Hi ' + from + ', nice to meet you!');
    this.app.prop1 = message;
  }

  switch (message.type) {
    case 'folderChanged':
      this.app.folderChanged(message.folder);
      break;

    /*case 'currentChanged':
    this.app.currentChanged(message.current);
    break;*/

    default:
      console.log(message);
  }
};