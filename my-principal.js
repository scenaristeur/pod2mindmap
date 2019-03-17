// Use relative paths for peer dependencies
import {
  LitElement, html, customElement, property
} from 'lit-element';

import '@vaadin/vaadin-split-layout/vaadin-split-layout.js';
import  'solid-auth-client/dist-lib/solid-auth-client.bundle.js';
import  'rdflib/dist/rdflib.min.js';
import  'solid-file-client/dist/browser/solid-file-client.bundle.js';

import './my-nav.js';
import './my-messages.js';
import './my-second.js';
/*import './p2m-source.js';
import './p2m-dialog.js';
import './solid/solid-explore.js';*/
import './solid/solid-ide.js';


class MyPrincipal extends LitElement{
  render(){
    return html`
    <my-nav></my-nav>
    <vaadin-split-layout style="height: 100%;">
    <vaadin-split-layout orientation="vertical">
    <div>
    <solid-ide></solid-ide>
    </div>
    </vaadin-split-layout>
    <div style="width: 50%;">
    <my-messages></my-messages>
    <my-second>Ici devrait apparaître un graphe</my-second>

    </div>
    </vaadin-split-layout>
  <!--  <p2m-source></p2m-source>
    <p2m-dialog></p2m-dialog>
    <solid-explore></solid-explore>-->
    `;
  }
}
customElements.define('my-principal', MyPrincipal);
