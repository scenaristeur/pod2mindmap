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
import { ExploreAgent } from '../agents/ExploreAgent.js'

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
/*<p ?hidden=${this.connected}>
Pour pouvoir utiliser Solid, vous devez dans un premier temps vous connecter à votre POD.</br>
To use Solid, you must first login to your POD.<br>
(<a href="https://solid.inrupt.com/get-a-solid-pod" target="_blank"> Get a POD / Obtenir un POD</a>)
</p>*/

class SolidExplore extends LitElement {
  render() {
    return html`
    CURRENT : ${this.current}
    <br>
    Connected ${this.connected}<br>
    Depth: ${this.depth}
    `;
  }

  static get properties() { return {
    connected: {type: Boolean},
    depth: {type: Number}
  }};

  constructor() {
    super();
    this.connected = false;
    this.depth = 2;
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

      }
      else{
        console.log(`The user is ${session.webId}`)
        this.connected = true;

      }
    })
  }

  firstUpdated() {
    //this.name = this.destinataire+"_Input"
    this.agentExplore = new ExploreAgent("agentExplore", this);
    console.log(this.agentExplore);
    //  this.agentLogin.send('agentApp', {type: 'dispo', name: 'agentLogin' });
    //  console.log("DESTINATAIRE2:",this.destinataire);
  }

  currentChanged(current){
    console.log("QUE FAIRE DE ",current)
    this.updateInput(current)
    this.listeFriends(current)
    this.liste_Folders(current)
    this.get_ttl(current)
  }
  updateInput(current){
    console.log("update input")
    this.agentExplore.send('agentInput', {type: 'currentChanged', current: current });
  }
  liste_Folders(current){
    console.log("send detail de "+current+"à folder")
  }
  get_ttl(current){
    console.log("send contenu de "+current+"à editeur et à graphe")
  }




}

window.customElements.define('solid-explore', SolidExplore);
