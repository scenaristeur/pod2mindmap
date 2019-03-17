import { LitElement, html, customElement, property, css } from 'lit-element';
import '/node_modules/web-animations-js/web-animations-next.min.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-menu-button/paper-menu-button.js';

import './solid/solid-login.js';
//import './vis-inputtop.js';

export class MyNav extends LitElement {

  render() {
    return html`
    <paper-menu-button>
    <paper-icon-button icon="menu" slot="dropdown-trigger"></paper-icon-button>
    <!--  <paper-button slot="dropdown-trigger" raised>

    <span slot="dropdown-trigger">File</span>
    </paper-button>-->
    <paper-listbox slot="dropdown-content">
    <paper-item>New (/n)</paper-item>
    <paper-item>Import (/i)</paper-item>
    <paper-item>Export (/e or /t for turtle Export)</paper-item>
    <paper-item>Help (/h)</paper-item>
    </paper-listbox>
    </paper-menu-button>
    <solid-login>Solid Login</solid-login>
    `;
  }

}
customElements.define('my-nav', MyNav);
