/**
* Import LitElement base class, html helper function,
* and TypeScript decorators
**/
import {  LitElement, html,} from 'lit-element';
import 'vis/dist/vis.js';
import  '/node_modules/evejs/dist/eve.custom.js';
import { VisAgent } from './agents/VisAgent.js'


/**
* Use the customElement decorator to define your class as
* a custom element. Registers <my-element> as an HTML tag.
*/

class MyGraph extends LitElement {

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
    <link rel="stylesheet" href="node_modules/vis/dist/vis.css">
    <style>
    #mynetwork {
      top: 0;
      left: 0;
      width: 99%;
      height: 85vh;
      bottom: 0px  !important;;
      border: 1px solid lightgray;
      background: linear-gradient(to bottom, rgba(55, 55, 255, 0.2), rgba(200, 200, 10, 0.2));
    }
    </style>

    <div id="mynetwork"></div>

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
    this.foo = 'Hello grapheeeeeee';

  }

  firstUpdated(){
  var app = this;

  //console.log( 'id : ', this.id);
  this.agentVis = new VisAgent("agentVis", this);
  console.log(this.agentVis);
  //this.agentVis.send('agentApp', {type: 'dispo', name: this.id });


  var container = this.shadowRoot.getElementById('mynetwork');
  //  console.log(container)

  // create an array with nodes
  var nodes = new vis.DataSet([
    {id: "node1", label: 'Node 1'},
    {id: "node2", label: 'Node 2'},
    {id: "node3", label: 'Node 3'},
    {id: "node4", label: 'Node 4'},
    {id: "node5", label: 'Node 5'}
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
    {from: "node1", to: "node3", arrows:'to', label: "type"},
    {from: "node1", to: "node2", arrows:'to', label: "subClassOf"},
    {from: "node2", to: "node4", arrows:'to', label: "partOf"},
    {from: "node2", to: "node5", arrows:'to', label: "first"},
    {from: "node3", to: "node3", arrows:'to', label: "mange"}
  ]);


  var data = {
    nodes: nodes,
    edges: edges
  };

  var seed = 2;
  var options = {
    layout: {randomSeed:seed}, // just to make sure the layout is the same when the locale is changed
    //  locale: this._root.querySelector('#locale').value,
    edges:{
      arrows: {
        to:     {enabled: true, scaleFactor:1, type:'arrow'},
        middle: {enabled: false, scaleFactor:1, type:'arrow'},
        from:   {enabled: false, scaleFactor:1, type:'arrow'}
      }},
      interaction:{
        navigationButtons: true,
        //  keyboard: true  //incompatible avec rappel de commande en cours d'implémentation
        multiselect: true,
      },
      manipulation: {
        addNode: function (data, callback) {
          // filling in the popup DOM elements
          //  app.shadowRoot.getElementById('node-operation').innerHTML = "Add Node";
          //  data.label =""
          //console.log(app.shadowRoot.getElementById('popup'));
          //  console.log(this.shadowRoot.getElementById('popup'));
          console.log("NETWORK ADD NODE ",data,callback)
          //app.editNode(data, app.clearNodePopUp, callback);
          app.agentVis.send('visPopup', {type: "addNode", data: data, callback: callback});

        },
        editNode: function (data, callback) {
          // filling in the popup DOM elements
          //app.shadowRoot.getElementById('node-operation').innerHTML = "Edit Node";
          console.log("NETWORK EDIT NODE ",data,callback)
          //  app.editNode(data, app.cancelNodeEdit, callback);
          app.agentVis.send('visPopup', {type: "editNode", data: data, callback: callback});
        },
        addEdge: function (data, callback) {
          console.log("NETWORK ADD EDGE ", data,callback)
          if (data.from == data.to) {
            var r = confirm("Souhaitez-vous connecter ce noeud sur lui-même?");
            if (r != true) {
              callback(null);
              return;
            }
          }
          //  app.shadowRoot.getElementById('edge-operation').innerHTML = "Add Edge";
          //app.editEdgeWithoutDrag(data, callback);
          app.agentVis.send('visPopup', {type: "addEdge", data: data, callback: callback});
        },
        editEdge: {
          //console.log("EDIT EDGE ", data,callback)
          editWithoutDrag: function(data, callback) {
            console.log("NETWORK EDIT WITHOUT DRAG ", data,callback)
            //  app.shadowRoot.getElementById('edge-operation').innerHTML = "Edit Edge";
            //  app.editEdgeWithoutDrag(data,callback);
            app.agentVis.send('visPopup', {type: "editEdgeWithoutDrag", data: data, callback: callback});
          }
        }
      }
    };

    app.network = new vis.Network(container, data, options);

    app.network.on("selectNode", async function (params) {
      console.log('selectNode Event: ', params);
      var existNode = app.network.body.data.nodes.get({
        filter: function(node){
          return (node.id == params.nodes[0] );
        }
      });
      console.log(existNode);
    })



    app.network.on("doubleClick", async function (params) {
      console.log('selectNode Event: ', params);
      var id = params.nodes[0];
      var existNode;
      try{
        existNode = app.network.body.data.nodes.get({
          filter: function(node){
            return (node.id == id );
          }
        });
        console.log(existNode);
        if (existNode.length != 0){
          console.log("existe")
          app.agentVis.send('agentGraph', {type: "nodeChanged", node: existNode[0]});
          //  app.agentVis.send('agentFileeditor', {type: "nodeChanged", node: existNode[0]});
          //  app.agentVis.send('agentFoldermenu', {type: "nodeChanged", node: existNode[0]});
          //  network.body.data.nodes.add(data);
          //  var thing = this.thing;

        }else{

          console.log("n'existe pas")
          //  delete data.x;
          //  delete data.y
          //  network.body.data.nodes.update(data);

        }
      }
      catch (err){
        console.log(err);
      }
      //  app.agentVis.send('agentCurrent', {type: "urlChanged", url: params.nodes[0]});
    });
    console.log(app.network)
  }



}

// Register the new element with the browser.
customElements.define('my-graph', MyGraph);
