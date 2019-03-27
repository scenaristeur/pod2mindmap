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
import   '/node_modules/rdflib/dist/rdflib.min.js';
import { FriendsAgent } from './agents/FriendsAgent.js'

import { SharedStyles } from './shared-styles.js';
import { SolidStyles } from './solid-styles.js';
import { SolidTools } from './solid-tools.js'; // pour import rdflib

// This is a reusable element. It is not connected to the store. You can
// imagine that it could just as well be a third-party element that you
// got from someone else.
class SolidFriends extends LitElement {
  render() {
    return html`
    ${SharedStyles}
    ${SolidStyles}
    fullName : ${this.fullName.value}<br>
    Role : ${this.role.value}<br>
    Organization : ${this.organization.value}<br>
    <paper-collapse-item header="Friends ${this.friends.length}">
    ${this.friends.map(i => html`
      <paper-item raised @click="${(e) =>  this.get(i)}"> <img src="./assets/folder.png" />${i.value}</paper-item>
      `)}
      </paper-collapse-item>
      `;
    }

    static get properties() {
      return {
        friends: Array,
        fullName: Object,
        organization: Object,
        role: Object
      }
    }

    constructor(){
      super();

      this.friends = [{value:"bob"}, {value:"emmer"}, {value:"flok"}]
      this.fullName = {}
      this.organization = {}
      this.role = {}
    }

    get(item){
      console.log(item)

      //  var current = {}
      //  current.url = this.url;
      /*  this.agentCurrent.send('agentFoldermenu', {type: 'currentChanged', current: this.current });
      this.agentCurrent.send('agentFileeditor', {type: 'currentChanged', current: this.current });
      this.agentCurrent.send('agentGraph', {type: 'currentChanged', current: this.current });*/
      //  console.log("CURRENT",current)
      this.agentFriends.send('agentCurrent', {type: 'webIdChanged', webId: item.value });

    }

    connectedCallback(){
      super.connectedCallback();
      var app = this;
      //console.log( 'id : ', this.id);
      this.agentFriends = new FriendsAgent("agentFriends", this);
      console.log(this.agentFriends);
    }
    async   webIdChanged(webId){
      //https://linkeddata.github.io/rdflib.js/Documentation/webapp-intro.html
      console.log("webIdChanged",webId)
      console.log("rdf: ",$rdf)
      const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
      const VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
      const store = $rdf.graph();
      const fetcher = new $rdf.Fetcher(store);
      console.log("STORE",store)
      console.log("FETCHER",fetcher)
      const me = store.sym(webId);
      const profile = me.doc();
      console.log("ME :",me)
      console.log("PROFILE :",profile)
      await fetcher.load(webId);
      console.log("STORE 2",store)
      this.fullName = store.any(me, FOAF('name'));
      //  let name = store.any(me, VCARD('name'), null, profile);
      console.log(this.fullName)
      const friends = store.each(me, FOAF('knows'));
      
      store.statements.forEach(function(s){
        console.log(s)
      })


      console.log("Friends ",friends)
      this.friends = friends
    }



  }

  window.customElements.define('solid-friends', SolidFriends);
