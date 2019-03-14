import { LitElement, html, customElement, property, css } from 'lit-element';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import 'heavy-navbar/dist/heavynavbar.js';
import './solid/solid-login.js';
import './vis-inputtop.js';

export class MyNav extends LitElement {

  render() {
    return html`


    <heavy-navbar item-count="5">
<!--<vis-input  id="agentInput" destinataire="agentVis"></vis-input>-->
  <!--<div>
    <paper-input always-float-label label="Document Name / POD / location" value="https://smag0.solid.community/public"></paper-input>
    </div>-->
<!--    <paper-button raised>File</paper-button>
    <paper-button raised>Mindmap</paper-button>
      <paper-button raised>Connect</paper-button>
    <a href="#" slot="item-1">Home</a>
    <a href="#about" slot="item-2">POD</a>
    <a href="#blog" slot="item-3">Blog</a>-->
  <!--  <a href="#contact" slot="item-4">Contact</a>-->
    </heavy-navbar>
      <solid-login> Solid Login</solid-login>
    `;
  }

  static get styles() {
    return [
      css`
      :host {
        display: block;
        --heavy-navbar-background: #ffffff;
        --heavy-navbar-color: #000000;
        --heavy-navbar-hover-color: #333333;
      }`
    ]
  }

}
customElements.define('my-nav', MyNav);
