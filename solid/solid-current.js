/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import  '/node_modules/evejs/dist/eve.custom.js';
import { CurrentAgent } from './agents/CurrentAgent.js'
//import  '/node_modules/solid-file-client/solid-file-client.js';
import { SolidTools } from "./solid-tools.js"

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SolidCurrent extends LitElement {
  render() {
    return html`
    <paper-input id="webIdInput" label="WebId" value="${this.webId}"></paper-input>
    <paper-input id="currentInput" label="Current Folder / Dossier Courant" value="${this.current}"></paper-input>
    <paper-button id="profileBtn" raised  disabled @click="${this.go}">Profile</paper-button>
    <paper-button id="goBtn" raised  @click="${this.go}">/public</paper-button>
    <paper-button id="friendsBtn" raised  disabled @click="${this.go}">Friends</paper-button>
    <paper-button id="privateBtn" raised  disabled @click="${this.go}">/private</paper-button>
    `;
  }

  static get properties() {
    return {
      current: String,
    }
  }

  constructor(){
    super();
    this.current = "init"
  }

  connectedCallback(){
    super.connectedCallback();
    var app = this;
    //console.log( 'id : ', this.id);
    this.agentCurrent = new CurrentAgent("agentCurrent", this);
    //    console.log(this.agentCurrent);
  }

  go(){
    this.current = this.shadowRoot.getElementById("currentInput").value;
    this.agentCurrent.send('agentFoldermenu', {type: 'currentChanged', current: this.current });
    this.agentCurrent.send('agentFileeditor', {type: 'currentChanged', current: this.current });
    this.agentCurrent.send('agentGraph', {type: 'currentChanged', current: this.current });

  }

  currentChanged(current){
    console.log(current)
    this.current = current;
  }

  sessionChanged(session){
    console.log("SESSION in CURRENT",session)
    if(Object.keys(session).length == 0){
      this.current= "https://smag0.solid.community/public/DEFO";
      this.webId = "https://smag0.solid.community/profile/card#me/DEFO";
    }else{
      this.webId = session.webId;
      var wedIdSpilt = session.webId.split("/");
      var webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
      //console.log(this._webIdRoot);
      this.current = webIdRoot+"public/";
    }
  }

}

window.customElements.define('solid-current', SolidCurrent);
