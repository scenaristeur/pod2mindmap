/**
* Import LitElement base class, html helper function,
* and TypeScript decorators
**/
import {  LitElement, html,} from 'lit-element';

import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js';
import '@polymer/paper-dialog-behavior/paper-dialog-behavior.js';
import '@polymer/neon-animation/animations/scale-up-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-slider/paper-slider.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import 'paper-collapse-item/paper-collapse-item.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-input/paper-textarea.js';
import '@fooloomanzoo/color-picker/color-picker.js';
import '@fooloomanzoo/color-picker/color-element.js';

import  '/node_modules/evejs/dist/eve.custom.js';
import { DialogAgent } from './agents/DialogAgent.js'

import "./solid/solid-login.js";



/**
* Use the customElement decorator to define your class as
* a custom element. Registers <my-element> as an HTML tag.
*/

class P2mDialog extends LitElement {

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
    <style>
    .mood { color: green; }
    #operation {
      font-size:28px;
    }
    .popup {
      /*position: absolute;
      z-index: 99;
      top: 10%;
      left: 1vw;
      width: 99vw;*/
      background-color: #f9f9f9;
      border-style:solid;
      border-width:3px;
      border-color: #5394ed;
      padding:1px;
    }
    .large {
      position: absolute;
      z-index: 99;
      top: 10%;
      left: 1vw;
      width: 99vw;

    }
    </style>

    <paper-dialog id="nodePopUp" class="popup" backdrop transition="core-transition-bottom"  >
    <!--  <div horizontal start-justified start layout > -->
    <!--  <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon> -->
    <div style="padding-left:20px" vertical start-justified start layout wrap>
    <h2 id="nodeOperation" style="margin: 0;color: #0D578B;">Ajouter ou modifier un noeud</h2>
    <paper-input id="nodeLabel" label="Nom du noeud" autofocus ></paper-input>



    <!--<paper-dialog-scrollable id="scrollNode">-->
    <paper-collapse-item header="Forme">
    <!--  <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Forme</h3>-->
    <!--  <div slot="collapse-content">-->
    <!--  <fieldset>
    <legend>Forme</legend> -->
    selected="${this.selectedShape}"


    <iron-selector
    id="shapeSelector"
    attr-for-selected="name"
    selected="${this.selectedShape}"

    selected-attribute="checked">
    <div>Label interne</div>

    <paper-checkbox name="ellipse"   @change="${() =>  this._shapeChanged("ellipse")}">Ellipse</paper-checkbox>
    <paper-checkbox name="circle"  @change="${() =>  this._shapeChanged("circle")}">Cercle</paper-checkbox>
    <paper-checkbox name="database"  @change="${() =>  this._shapeChanged("database")}">Database</paper-checkbox>
    <paper-checkbox name="box"  @change="${() =>  this._shapeChanged("box")}">Box</paper-checkbox>
    <paper-checkbox name="text"  @change="${() =>  this._shapeChanged("text")}">Texte</paper-checkbox>
    <hr>
    <div>Label externe</div>
    <paper-checkbox name="diamond">Diamant</paper-checkbox>
    <paper-checkbox name="star">Etoile</paper-checkbox>
    <paper-checkbox name="triangle">Triangle</paper-checkbox>
    <paper-checkbox name="triangleDown">Triangle inverse</paper-checkbox>
    <paper-checkbox name="square">Carré</paper-checkbox>
    <paper-checkbox name="image" >Image</paper-checkbox>
    <paper-checkbox name="circularImage" >Image Circulaire</paper-checkbox>
    </iron-selector>
    <!--<div hidden$="[[shapeIsImage(selectedShape)]]">
    <paper-input id="imgUrl" label="Url de l'image (http://...)"></paper-input>
    </div>-->
    <!--  </fieldset>-->
    <!--</div>-->
    </paper-collapse-item>
    <paper-collapse-item header="Couleur">
    <!--  <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Couleur</h3>-->
    <!--<div slot="collapse-content">-->
    <!--  <fieldset>
    <legend>Couleur</legend>-->
    <!--  <paper-swatch-picker color="#E91E63"></paper-swatch-picker>
    <paper-swatch-picker color="{{selectedColor}}"></paper-swatch-picker>-->
    color: ${this.colorValue}
    <color-picker
    id="colorpicker"
    native value="colorValue"
    colorValue="colorValue"
    position="right"
    ></color-picker>
    <!--  </fieldset> -->
    <!--</div>-->
    </paper-collapse-item>
    <!--  <paper-collapse-item>
    <h3 slot="collapse-trigger" style="margin: 0;color: #0D578B;">Type de noeud</h3>
    <div slot="collapse-content">
    nb : ces fonctionnalités sont en cours de developpement :
    <a href="https://github.com/scenaristeur/heroku-spoggy/projects/1#card-10985683" target="_blank">kanban</a>
    <iron-selector id="typeSelector" attr-for-selected="name" selected="{{selectedType}}" selected-attribute="checked">
    <div>Noeuds particuliers</div>
    <paper-checkbox name="normal">Normal</paper-checkbox>
    <paper-checkbox name="uri">Uri</paper-checkbox>
    <paper-checkbox name="database">Database</paper-checkbox>
    <paper-checkbox name="lien">Lien</paper-checkbox>
    <paper-checkbox name="video">Video</paper-checkbox>
    <paper-checkbox name="text">Texte</paper-checkbox>
    <hr>
    <div>Noeuds programmatiques</div>
    <paper-checkbox name="variable">Variable</paper-checkbox>
    <paper-checkbox name="boucle">Boucle</paper-checkbox>
    <paper-checkbox name="condition">Condition</paper-checkbox>
    <paper-checkbox name="fonction">Fonction</paper-checkbox>
    </iron-selector>
    </div>
    </paper-collapse-item>
    -->
    <!--</paper-dialog-scrollable>-->
    </br>
    <div style="padding-top:10px" horizontal end-justified layout self-stretch>
    <paper-button id="nodeSaveButton" dialog-confirm  raised >ok</paper-button>
    <paper-button id="nodeCancelButton"  dialog-dismiss raised>Annuler</paper-button>

    </div>
    </div>
    <!--</div>-->
    </paper-dialog>







    <paper-dialog id="edgePopUp" class="popup"> <!--  backdrop transition="core-transition-bottom" -->
    <!--  <div horizontal start-justified start layout > -->
    <!--  <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>-->
    <div style="padding-left:20px" vertical start-justified start layout wrap>
    <h2 id="edgeOperation" style="margin: 0;color: #0D578B;">Ajouter ou modifier un lien</h2>
    <paper-input id="edgeLabel" label="Nom du lien" autofocus></paper-input>
    <div style="padding-top:10px" horizontal end-justified layout self-stretch>
    <paper-button id="edgeSaveButton"  on-tap="saveEdgeData" dialog-confirm raised>ok</paper-button>
    <paper-button id="edgeCancelButton" dialog-dismiss raised>Annuler</paper-button>
    </div>
    </div>
    <!--  </div> -->
    </paper-dialog>



    <paper-dialog
    entry-animation="scale-up-animation"
    exit-animation="fade-out-animation"
    id="importPopUp"
    class="popup"
    backdrop
    transition="core-transition-bottom"><!--  on-iron-overlay-opened="_openImport"
    on-iron-overlay-closed="_closeImport"-->
    <div horizontal start-justified start layout >
    <core-icon icon="thumb-up" style="height: 150px; width:150px;color: #0D578B;"></core-icon>
    <div style="padding-left:20px" vertical start-justified start layout wrap>
    <h2 id="importOperation" style="margin: 0;color: #0D578B;">Import JSON (ou ttl) <paper-icon-button icon="clear" dialog-dismiss></paper-icon-button></h2>
    <p >
    <fieldset>
    <legend>Paramètres</legend>
    <paper-checkbox id="remplaceNetwork">Remplacer Network</paper-checkbox>
    <paper-checkbox id="partageImport" disabled >Partager Import</paper-checkbox>
    </fieldset>
    </p>
    <p>
    <fieldset>
    <legend>Fichier</legend>
    <input id="filepicker"
    type="file"
    multiple value="Importer"
    @change="${(e) =>  this.handleFileSelected(e)}"></input>
    </fieldset>
    </p>
    <div style="padding-top:10px" horizontal end-justified layout self-stretch>
    <paper-button id="importCancelButton" dialog-dismiss raised>Annuler</paper-button>
    <a href="https://github.com/scenaristeur/heroku-spoggy/tree/master/public/exemple_files" target="_blank"> exemples de fichiers spoggy </a>
    </div>
    </div>
    </div>
    </paper-dialog>

    <paper-dialog
    id="exportTtlPopup"
    entry-animation="scale-up-animation"
    exit-animation="fade-out-animation"
    class="popup"
    backdrop transition="core-transition-bottom"  iron-overlay-opened="fillTextToSave"><!-- on-iron-overlay-opened="_myOpenFunction"
    on-iron-overlay-closed="_myClosedFunction" -->
    <h2  style="margin: 0;color: #0D578B;"> Export au format turtle (RDF)
    <!--<paper-button ontap="_pageAide">?</paper-button>-->
    <!--  <paper-button dialog-dismiss raised>X</paper-button> -->
    <paper-icon-button icon="clear" dialog-dismiss></paper-icon-button></h2>

    <paper-dialog-scrollable>
    <paper-textarea id="inputTextToSave" rows="10" maxRows="15"></paper-textarea>
    </paper-dialog-scrollable>

    <div style="padding-top:10px" horizontal end-justified layout self-stretch>

    <!--<paper-button raised on-tap="creer" dialog-confirm>Créer</paper-button>
    <paper-button  dialog-dismiss raised>Fermer</paper-button>-->
    <paper-input id="inputFileNameToSaveAs" label="Nom du fichier à sauvegarder (.ttl)"></paper-input>
    <paper-button raised @click="${() =>  this.saveTextAsFile()}"  dialog-confirm>Exporter le fichier Ttl</paper-button>
    <br>
    </div>
    </paper-dialog>

    <paper-dialog
    id="accueilPopup"
    class="popup large"
    backdrop transition="core-transition-bottom"  iron-overlay-opened="fillTextToSave"><!-- on-iron-overlay-opened="_myOpenFunction"
    on-iron-overlay-closed="_myClosedFunction" -->
    <h2  style="margin: 0;color: #0D578B;"> POD to Mindmap
    <!--<paper-button ontap="_pageAide">?</paper-button>-->
    <!--  <paper-button dialog-dismiss raised>X</paper-button> -->
    <paper-icon-button icon="clear" dialog-dismiss></paper-icon-button></h2>

    <!--  <paper-dialog-scrollable>
    <paper-textarea id="inputTextToSave" rows="10" maxRows="15"></paper-textarea>
    </paper-dialog-scrollable>-->

    <div style="padding-top:10px" horizontal end-justified layout self-stretch>

    <!--<paper-button raised on-tap="creer" dialog-confirm>Créer</paper-button>
    <paper-button  dialog-dismiss raised>Fermer</paper-button>-->
    <paper-input id="inputSource" label="Source"></paper-input>

    <!--<paper-dialog-scrollable>-->


    <!--</paper-dialog-scrollable>-->

    ${this.isValidUrl?
      html`  <paper-button raised @click="${() =>  this.explore()}"  dialog-confirm>Explorer</paper-button>`:
      html`<p>Selectionnez un Provider</p>
      ${this.providers.map(i => html`
        <paper-item raised @click="${(e) =>  this.get(i)}"> <img src="./assets/folder.png" />${i.name}</paper-item>
        `)}
        `}

        <solid-login>Solid Login</solid-login>
        <br>
        </div>
        </paper-dialog>
        `;
      }

      // properties getter
      static get properties() {
        return {
          foo: { type: String },
          params: {type: Object},
          providers: {type: Array},
          isValidUrl: {type: Boolean}
        };
      }

      constructor() {
        // Always call super() first
        super();
        this.foo = 'Hello World';
        this.agentDialog = new DialogAgent("agentDialog", this);
        console.log(this.agentDialog);
        this.params = {};
        this.isValidUrl = false;
        this.providers = [{name:"solid community", suffix:"solid.community"}, {name:"Inrupt", suffix:"inrupt.net"}, {name:"Solid Test Space", suffix:"solidtest.space"}]
      }

      firstUpdated() {
        console.log("PARAMS FirstUpdate", this.params)
        this.shadowRoot.getElementById("inputSource").value = this.params.source;
        this.shadowRoot.getElementById("accueilPopup").toggle();
        try {
          new URL(this.params.source);
          this.isValidUrl = true;
        } catch (_) {
          this.isValidUrl = false;
          console.log("TODO recherche de this.params.source parmi this.providers")
        }
        console.log("VALID URL :",this.isValidUrl)

      }
      processParams(params){
        console.log("PARAMS Process", params)
        this.params = params
      }

      explore(){
        console.log("explore")
        this.agentDialog.send('agentExplore', {type: 'currentChanged', current: this.shadowRoot.getElementById("inputSource").value });
      }

    }

    // Register the new element with the browser.
    customElements.define('p2m-dialog', P2mDialog);
