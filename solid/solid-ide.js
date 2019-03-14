import { LitElement, html } from 'lit-element';


import  '/node_modules/evejs/dist/eve.custom.js';
import { IdeAgent } from './agents/IdeAgent.js'
import "./solid-current.js";
import "./solid-foldermenu.js";
import "./solid-filemanager.js";
//import "./solid-foldermanager.js";
// PB ACE.JS import "./solid-fileeditor.js";
import "./solid-graph.js";
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

class SolidIde extends LitElement {
  render() {
    return html`
    ${SharedStyles}


    <section>
    <paper-collapse-item header="Current" opened>

    <solid-current current=${this.current}></solid-current>

    </paper-collapse-item>
    </section>

    <section>
    <paper-collapse-item header="FolderMenu" opened>

    <solid-foldermenu current=${this.current}></solid-foldermenu>

    </paper-collapse-item>
    </section>

    <section>
    <paper-collapse-item header="Graph" opened>

    <solid-graph id="spoggy-graph" current=${this.current}></solid-graph>

    </paper-collapse-item>
    </section>


    <section>
    <paper-collapse-item header="Editor" >

    <!--  <solid-fileeditor current=${this.current}></solid-fileeditor>-->

    </paper-collapse-item>
    </section>
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
  connectedCallback(){
    super.connectedCallback();
    var app = this;
    this.agentIde = new IdeAgent("agentIde", this);
    console.log(this.agentIde);
    this.fc = SolidFileClient;
    console.log(this.fc)
    console.log(solid)
    console.log($rdf)
    //this.status = "inconnu"

    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        this.connected = false;
        this.session = {};
        this.session.webId=null;
        app.context = null;
        //app.$.podInput.value = ""
        app.current.value.url = "https://smag0.solid.community/public/"
        app.thing = {}
        this.agentIde.send('agentMessage', {type: 'message', message: "deconnecté" });
      }
      else{
        console.log(`The user is ${session.webId}`)
        this.connected = true;
        this.session = session;
        app.context = {}
        app.context.wedId = session.webId;

        app.context.me = $rdf.sym(session.webId)
        app.store = $rdf.graph() // Make a Quad store
        app.fetcher = $rdf.fetcher(app.store) // Attach a web I/O module, store.fetcher
        app.store.updater = new $rdf.UpdateManager(app.store) // Add real-time live updates store.updater
        app.context.profileDocument = app.context.me.doc()
        console.log(app.context.me)
        console.log(app.fetcher)
        console.log(app.store)
        console.log("PROFILEDOC ",app.context.profileDocument)
        var wedIdSpilt = session.webId.split("/");
        this._webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
        console.log(this._webIdRoot);
        app.current.value.url = this._webIdRoot+"public/";

        //PROFILE
        /*
        var person = session.webId
        await app.fetcher.load(person);
        const fullName = app.store.any($rdf.sym(person), this.FOAF('name'));
        console.log(fullName)
        const friends = app.store.each($rdf.sym(person), this.FOAF('knows'));

        friends.forEach(async (friend) => {
        await app.fetcher.load(friend);
        const fullName = app.store.any(friend, FOAF('name'));
        console.log(fullName && fullName.value || friend.value);
      });*/


      this.agentIde.send('agentMessage', {type: 'message', message: "connection :"+session.wedId });
    }
    app.url = app.current.value.url;
    //app.go()
    console.log(app.context)
    this.thing.url = this.url;
    console.log(this.thing)
    var thing = this.thing;
    //  this.current = await this.st.get(this.thing);
//    console.log("RESULT : ",this.current)

    this.readFolder(this.url);
    this.readFile(this.url)

  })
}



readFolder(url){
  var app = this;
  this.fc.readFolder(url).then(folder => {
    app.folder = folder;
    console.log("Folder",folder)
    console.log(`Read ${folder.name}, it has ${folder.files.length} files.`);
    app.agentIde.send('agentFoldermenu', {type: 'folderChanged', folder: folder });
    this.agentIde.send('agentMessage', {type: 'message', message: "folder name  :"+folder.name });
  }, err =>
  {
    console.log(err)
  }

);
}

readFile(url){
  var app = this;
  this.fc.readFile(url).then(  body => {
    app.fileContent = body
    console.log(`File content is : ${body}.`);
  }, err => console.log(err) );
}


}

window.customElements.define('solid-ide', SolidIde);
