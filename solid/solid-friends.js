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
import { FriendsAgent } from './agents/FriendsAgent.js'

import { SharedStyles } from './shared-styles.js';
import { SolidStyles } from './solid-styles.js';

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SolidFriends extends LitElement {
  render() {
    return html`
    ${SharedStyles}
    ${SolidStyles}
    <paper-collapse-item header="Friends ${this.friends.length}">
    ${this.friends.map(i => html`
      <paper-item raised @click="${(e) =>  this.get(i)}"> <img src="./assets/folder.png" />${i.name}</paper-item>
      `)}
      </paper-collapse-item>
      `;
    }

    static get properties() {
      return {
        friends: Array
      }
    }

    constructor(){
      super();

      this.friends = [{name:"bob"}, {name:"emmer"}]
    }

    get(item){
      console.log(item)
    }

    connectedCallback(){
      super.connectedCallback();
      var app = this;
      //console.log( 'id : ', this.id);
      this.agentFriends = new FriendsAgent("agentFriends", this);
      console.log(this.agentFriends);
    }



  }

  window.customElements.define('solid-friends', SolidFriends);
