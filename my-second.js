/**
* Import LitElement base class, html helper function,
* and TypeScript decorators
**/
import {  LitElement, html,} from 'lit-element';
//import './my-graph.js';
import 'paper-collapse-item/paper-collapse-item.js';
import { SharedStyles } from './solid/shared-styles.js';
import "./solid/solid-graph.js";
import "./solid/solid-friends.js";


/**
* Use the customElement decorator to define your class as
* a custom element. Registers <my-element> as an HTML tag.
*/

class MySecond extends LitElement {

  /**
  * Create an observed property. Triggers update on change.
  */

  /**
  * Implement `render` to define a template for your element.
  */
  render(){
    /**
    * Use JavaScript expressions to include property values in
    * the element template.
    */
    return html`
        ${SharedStyles}

        <section>
        <paper-collapse-item header="Friends" opened>

        <solid-friends id="spoggy-graph" current=${this.current}></solid-friends>

        </paper-collapse-item>
        </section>
        <section>
        <paper-collapse-item header="Graph" opened>

        <solid-graph id="spoggy-graph" current=${this.current}></solid-graph>

        </paper-collapse-item>
        </section>

    `;
  }

  // properties getter
  static get properties() {
    return {
      foo: { type: String }
    };
  }

  constructor() {
    // Always call super() first
    super();
    this.foo = 'Hello World';
  }



}

// Register the new element with the browser.
customElements.define('my-second', MySecond);
