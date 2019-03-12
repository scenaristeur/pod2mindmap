// Import the LitElement base class and html helper function
import { LitElement, html } from 'lit-element';
import '@polymer/paper-input/paper-textarea.js';

// Extend the LitElement base class
class MyElement extends LitElement {

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
    <p>Write your ttl</p>
    <paper-textarea is="iron-input"
    label="Textarea label"
    value=":Dav a :Man.\n:Dav a :Blop."
    keyEventTarget="keyInArea"
    maxRows=4
    rows=3
    ></paper-textarea>
    `;
  }
}
// Register the new element with the browser.
customElements.define('my-element', MyElement);
