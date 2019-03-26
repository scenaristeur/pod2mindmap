import { LitElement, html } from 'lit-element';
import '@polymer/paper-button/paper-button.js';
import  '/node_modules/evejs/dist/eve.custom.js';
import { LoginAgent } from './agents/LoginAgent.js'


class SolidLogin extends LitElement {
  render() {
    return html`
    <paper-button
    id="loginBtn"
    ?hidden=${this.connected}
    @click="${this._popupLogin}"
    raised>Podin</paper-button>
    <a ?hidden=${this.connected} href="https://solid.inrupt.com/get-a-solid-pod" target="_blank">What is a POD ?</a>
    <paper-button
    id="logoutBtn"
    ?hidden=${!this.connected}
    @click="${this._logout}"
    raised>Podout</paper-button>
    `;
  }

  static get properties() { return {
    connected:  Boolean,
    session: Object,
    //current: String,
  }};

  constructor() {
    super();
    this.connected = false;
    this.session = null;
  //  this.current = "";

      this.agentLogin = new LoginAgent("agentLogin", this);
      console.log(this.agentLogin);
    }

  firstUpdated(){
    solid.auth.trackSession(session => {
      if (!session){
        console.log('The user is not logged in')
        this.connected = false;
        this.session = {};
        this.updateAll()
        //this.current = "https://smag0.solid.community/public/";
      //  this.current = "def";
      //  console.log(this.current)
      //  this.agentLogin.send('agentCurrent', {type: 'currentChanged', current: this.current });
        /*this.session.webId=null;
        this.context = null;
        //app.$.podInput.value = ""
        this.current.value.url = "https://smag0.solid.community/public/"
        this.agentIde.send('agentMessage', {type: 'message', message: "deconnecté" });*/
      }
      else{
        console.log(`The user is ${session.webId}`)
        this.connected = true;
        this.session = session;
        /*console.log("SESSION",this.session);
        var wedIdSpilt = this.session.webId.split("/");
        this._webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
        console.log(this._webIdRoot);
        this.current= this._webIdRoot+"public/";*/
        this.updateAll()


      /*  this.context = {}
        this.context.wedId = session.webId;

        this.context.me = $rdf.sym(session.webId)
        this.store = $rdf.graph() // Make a Quad store
        this.fetcher = $rdf.fetcher(app.store) // Attach a web I/O module, store.fetcher
        this.store.updater = new $rdf.UpdateManager(app.store) // Add real-time live updates store.updater
        this.context.profileDocument = app.context.me.doc()
        console.log(this.context.me)
        console.log(this.fetcher)
        console.log(// TEMP: his..store)
        console.log("PROFILEDOC ",this.context.profileDocument)
        var wedIdSpilt = this.session.webId.split("/");
        this._webIdRoot = wedIdSpilt[0]+"//"+wedIdSpilt[2]+"/";
        console.log(this._webIdRoot);
        this.current.value.url = this._webIdRoot+"public/";*/

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


    //  this.agentLogin.send('agentMessage', {type: 'message', message: "connection :"+this.session.wedId });
    }
    /*this.url = this.current.value.url;
    //app.go()
    console.log(this.context)
    this.readFolder(this.url);
    this.readFile(this.url)*/

  })
  }
  updateAll(){
  //  console.log(this.session)
    this.agentLogin.send('agentCurrent', {type: 'sessionChanged', session: this.session });
  }

  async _popupLogin() {
    let session = await solid.auth.currentSession();
    let popupUri = 'https://solid.community/common/popup.html';
    //  let popupUri = '/node_modules/solid-auth-client/dist-popup/popup.html';
    if (!session)
    session = await solid.auth.popupLogin({ popupUri });
    alert(`Logged in as ${session.webId}`);
  }

  _logout(){
    solid.auth.logout().then(() => alert('Goodbye!'));
  }

}

window.customElements.define('solid-login', SolidLogin);
