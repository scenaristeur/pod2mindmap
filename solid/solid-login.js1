/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html, customElement, property, css } from 'lit-element';
import '@polymer/paper-button/paper-button.js';

import  '/node_modules/evejs/dist/eve.custom.js';
import { LoginAgent } from '../agents/LoginAgent.js'

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
/*<p ?hidden=${this.connected}>
Pour pouvoir utiliser Solid, vous devez dans un premier temps vous connecter à votre POD.</br>
To use Solid, you must first login to your POD.<br>
(<a href="https://solid.inrupt.com/get-a-solid-pod" target="_blank"> Get a POD / Obtenir un POD</a>)
</p>*/

class SolidLogin extends LitElement {
  render() {
    return html`
    <paper-button
    id="loginBtn"
    ?hidden=${this.connected}
    @click="${this._popupLogin}"
    raised>POD</paper-button>

    <paper-button
    id="logoutBtn"
    ?hidden=${!this.connected}
    @click="${this._logout}"
    raised>Logout</paper-button>
    `;
  }

  static get properties() { return {
    connected: {type: Boolean}
  }};

  constructor() {
    super();
    this.connected = false;
  }
  connectedCallback(){
    super.connectedCallback();
    console.log(solid)
    console.log($rdf)
    //this.status = "inconnu"

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        this.connected = false
        this.agentLogin.send("agentInput", {type: "solidSessionChanged", webId:""});
      }
      else{
        console.log(`The user is ${session.webId}`)
        this.connected = true;
        this.agentLogin.send("agentInput", {type: "solidSessionChanged", webId:session.webId});
      }
    })
  }

  firstUpdated() {
    //this.name = this.destinataire+"_Input"
    this.agentLogin = new LoginAgent("agentLogin", this);
    console.log(this.agentLogin);
    this.agentLogin.send('agentApp', {type: 'dispo', name: 'agentLogin' });
    //  console.log("DESTINATAIRE2:",this.destinataire);
  }

  async _popupLogin() {
    let session = await solid.auth.currentSession();
    //  let popupUri = 'https://solid.community/common/popup.html';
    let popupUri = '/node_modules/solid-auth-client/dist-popup/popup.html';
    if (!session)
    session = await solid.auth.popupLogin({ popupUri });
    //  alert(`Logged in as ${session.webId}`);
  }

  _logout(){
    solid.auth.logout()
    //  .then(() => alert('Goodbye!'));
  }

}

window.customElements.define('solid-login', SolidLogin);
