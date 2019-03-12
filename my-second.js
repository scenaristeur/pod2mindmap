/**
* Import LitElement base class, html helper function,
* and TypeScript decorators
**/
import {  LitElement, html,} from 'lit-element';
import './my-graph.js';


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
    <my-graph></my-graph>
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
