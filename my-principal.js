// Use relative paths for peer dependencies
import {
  LitElement, html, customElement, property
} from 'lit-element';

import '@vaadin/vaadin-split-layout/vaadin-split-layout.js';
import  'solid-auth-client/dist-lib/solid-auth-client.bundle.js';
import  'rdflib/dist/rdflib.min.js';
import  'solid-file-client/dist/browser/solid-file-client.bundle.js';

import './my-nav.js';
import './my-element.js';
import './my-second.js';
import './p2m-source.js';
import './p2m-dialog.js';
import './solid/solid-explore.js';

class MyPrincipal extends LitElement{
  render(){
    return html`
    <my-nav></my-nav>
    <vaadin-split-layout style="height: 100%;">
    <!--<div style="width: 25%;min-width: 3%; max-width: 97%;">
    FOLDER<my-element></my-element>
    </div>
    <div style="width: 25%;min-width: 3%; max-width: 97%;">
    <my-element></my-element>
    </div>-->
    <vaadin-split-layout orientation="vertical">
    <div>Folder</div>
    <div>
    <my-element></my-element>
    </div>
    </vaadin-split-layout>

    <div style="width: 50%;">
    <my-second>Chargement du Graphe</my-second>
    </div>
    </vaadin-split-layout>

    <p2m-source></p2m-source>
    <p2m-dialog></p2m-dialog>
    <solid-explore></solid-explore>
    `;
  }
}
customElements.define('my-principal', MyPrincipal);
