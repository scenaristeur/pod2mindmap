import { LitElement, html } from 'lit-element';


import  '/node_modules/evejs/dist/eve.custom.js';
import { IdeAgent } from './agents/IdeAgent.js'
import "./solid-current.js";
import "./solid-foldermenu.js";
//import "./solid-filemanager.js";
//import "./solid-foldermanager.js";
// PB ACE.JS
import "./solid-fileeditor.js";

import 'paper-collapse-item/paper-collapse-item.js';
import { SharedStyles } from './shared-styles.js';

//import "./ide-current.js";
/*import "./ide-foldermenu.js";
import "./ide-filedisplay.js";
import "./ide-fileeditor.js";

import "./ide-commands.js";
import "./ide-filemanager.js";
import "./ide-foldermanager.js";
import "./ide-optionsmanager.js";
import "spoggy-graph/spoggy-graph.js";*/
//import {SolidTools} from "./solid-tools.js";

class SolidIde extends LitElement {
  render() {
    return html`
    ${SharedStyles}
    <paper-collapse-item header="Current" opened>
    <solid-current current=${this.current}></solid-current>
    </paper-collapse-item>
    <paper-collapse-item header="FolderMenu" opened>
    <solid-foldermenu current=${this.current}></solid-foldermenu>
    </paper-collapse-item>
    <paper-collapse-item header="Editor" opened>
    <solid-fileeditor current=${this.current}></solid-fileeditor>
    </paper-collapse-item>
    <!--  <solid-filemanager current={{current}}></solid-filemanager>
    <solid-foldermanager current={{current}}></solid-foldermanager>-->
    `;
  }

  static get properties() { return {
    connected: {type: Boolean},
    session: {type: Object},
    store: Object,
    fetcher: Object,
    context: {type: Object},
    webId: Object,
    //  public: {type: String, notify: true},
    current: {type: Object },
    thing: {type: Object}
  }};

  constructor() {
    super();
    this.connected = false;
    this.session = {};
    this.context = {};
    this.current = {value: {url: ""}};
    this.thing = {};

    // NAMESPACES : https://github.com/solid/solid-namespace/blob/master/index.js
    /*this.VCARD = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
    this.SPACE = $rdf.Namespace('http://www.w3.org/ns/pim/space#');
    this.SOLID = $rdf.Namespace('http://www.w3.org/ns/solid/terms#');
    this.LDP = $rdf.Namespace('http://www.w3.org/ns/ldp#');
    this.RDFS = $rdf .Namespace('http://www.w3.org/2000/01/rdf-schema#');
    this.OWL = $rdf .Namespace('http://www.w3.org/2002/07/owl#');*/
  }
  firstUpdated(){
    //super.connectedCallback();
    var app = this;
    this.agentIde = new IdeAgent("agentIde", this);

    this.fc = SolidFileClient;

    //this.st = new SolidTools();
    //  console.log(this.st)


  }

  currentChanged(current){
    console.log("currrentChanged",current)
    if(! current.type) {
      current.type = this.fc.guessFileType(current.url)
    }else {
      console.log("type connu", current)
    }
    if (current.type == "folder"){
      this.readFolder(current)
    }else{
      this.readFile(current)
    }
  }
  

  readFolder(current){
    var app = this;
    console.log("READFOLDER",current)
    this.fc.readFolder(current.url).then(folder => {
      app.folder = folder;
      console.log("Folder",folder)
      console.log(`Read ${folder.name}, it has ${folder.files.length} files.`);
      app.agentIde.send('agentFoldermenu', {type: 'folderChanged', folder: folder });
      this.agentIde.send('agentGraph', {type: 'currentChanged', current: folder });
      this.agentIde.send('agentMessage', {type: 'message', message: "folder name  :"+folder.name });
    }, err =>
    {
      console.log(err)
    }
  );
}

readFile(current){
  console.log("READFILE",current)
  var app = this;
  /*  var file= {};
  file.value = {};
  file.value.url = url;
  file.key = "file";*/
  this.agentIde.send('agentGraph', {type: 'currentChanged', current: current });
  this.fc.readFile(current.url).then(  body => {
    app.fileContent = body
    //  console.log(`File content is : ${body}.`);
    this.agentIde.send('agentFileeditor', {type: 'contentChanged', content: body });
  }, err => console.log(err) );
}


}

window.customElements.define('solid-ide', SolidIde);
