// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
//import '@polymer/paper-input/paper-textarea.js';

import  '/node_modules/evejs/dist/eve.custom.js';
import { MessageAgent } from './agents/MessageAgent.js'
import { SharedStyles } from './solid/shared-styles.js';
import { SolidStyles } from './solid/solid-styles.js';

// Extend the LitElement base class
class MyMessages extends LitElement {

  /**
  * Implement `render` to define a template for your element.
  *
  * You must provide an implementation of `render` for any element
  * that uses LitElement as a base class.
  */
  render(){
    /**
    * `render` must return a lit-html `TemplateResult`.
    *
    * To create a `TemplateResult`, tag a JavaScript template literal
    * with the `html` helper function:
    */
    return html`
    <!-- template content -->
    ${SharedStyles}
    ${SolidStyles}
    <paper-collapse-item header="Messages ${this.messages.length}">
    ${this.messages.map(i => html`
      <paper-item raised @click="${(e) =>  this.get(i)}"> ${i}</paper-item>
      `)}
    <!--  <paper-textarea is="iron-input"
      id="messages"
      label="Messages"
      value=""
      maxRows="4"
      rows=3
      ></paper-textarea>-->
        </paper-collapse-item>

    `;
  }

  static get properties() {
    return {
      messages: Array,
    }
  }
  constructor(){
    super();
    this.messages = []
    //  this.current.value.url = "https://smag0.solid.community/public/"
  }
  connectedCallback(){
    super.connectedCallback();
    var app = this;
    //console.log( 'id : ', this.id);
    this.agentMessage = new MessageAgent("agentMessage", this);
  //  console.log(this.agentMessage);

  }

  add(message){
    console.log(message)
    var messages = this.messages
    this.messages = []
    messages.push(message)
    this.messages = messages
    console.log(this.messages)
  //  this.shadowRoot.getElementById("messages").value = this.messages.join("\n");
  //  console.log(this.shadowRoot.getElementById("messages").value)
  }
}
// Register the new element with the browser.
customElements.define('my-messages', MyMessages);
