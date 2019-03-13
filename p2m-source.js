/**
* Import LitElement base class, html helper function,
* and TypeScript decorators
**/
import {  LitElement, html,} from 'lit-element';

import  '/node_modules/evejs/dist/eve.custom.js';
import { SourceAgent } from './agents/SourceAgent.js'


/**
* Use the customElement decorator to define your class as
* a custom element. Registers <my-element> as an HTML tag.
*/

class P2mSource extends LitElement {

  /**
  * Create an observed property. Triggers update on change.
  */

  /**
  * Implement `render` to define a template for your element.
  */
  render(){
    /**
    * Use JavaScript expressions to include property values in
    * the element template.
    */
    return html`
Source
    `;
  }

  // properties getter
  static get properties() {
    return {
      foo: { type: String }
    };
  }

  constructor() {
    // Always call super() first
    super();
    this.foo = 'Hello World';
    this.agentSource = new SourceAgent("agentSource", this);
    console.log(this.agentSource);

  }

  firstUpdated() {
    //this.name = this.destinataire+"_Input"

  //  this.agentVisinput.send('agentSource', {type: 'dispo', name: 'agentSource' });
  this.params = this.recupParams();
  console.log(this.params)
  if (this.params.source!= undefined){
  //  this.agentData.send('agentSocket', {type: "connect", graph:graph, node:node, pseudo: "anonyme"});
    this.agentSource.send('agentDialog', {type: 'params', params: this.params });
  }

  }

  recupParams(){
    var params = (function(a) {
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i)
      {        var p=a[i].split('=', 2);
      if (p.length == 1)
      b[p[0]] = "";
      else
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split('&'));
  return params;
  }

  analyseUrl(){
    let url = window.location;
    url.protocol; //(http:)
    url.hostname; //(www.example.com)
    url.pathname; //(/some/path)
    url.search; // (?name=value)
    url.hash; //(#anchor)
    console.log("REST " +url.pathname);
    let pathname = url.pathname.split("/");
    console.log(pathname);
    if(pathname[1] == 'graph' || pathname[1] == 'graphe'){
      let graph = pathname[2];
      let node = pathname[3];
      console.log("on tente d'afficher les infos du graph "+graph+" sur le noeud "+node);
    //  this.agentData.send('agentSocket', "Hello agentHello! on tente d'afficher les infos du graph "+graph+" sur le noeud "+node);
    //  this.agentData.send('agentSocket', {type: "connect", graph:graph, node:node, pseudo: "anonyme"});

    }
  }


}

// Register the new element with the browser.
customElements.define('p2m-source', P2mSource);
