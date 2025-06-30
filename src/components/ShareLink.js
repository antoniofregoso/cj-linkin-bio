import { AppElement, slugify } from "@customerjourney/cj-core";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faShare } from '@fortawesome/free-solid-svg-icons';
import {faSquareXTwitter, faSquareFacebook, faSquareThreads, faLinkedin, faSquareWhatsapp, faTelegram} from '@fortawesome/free-brands-svg-icons';

export class ShareLink extends AppElement {

    #default = {
        context:{
          lang:"en"
      },
      share:{
        en:"Share on",
        es:"Compartir en",
        fr:"Partager sur"
      }
        };


    constructor(props={}){
        super();
        this.eventName = "user:click-modal-box";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
    }

    static get observedAttributes() {
        return ["active"];
      }
      
    attributeChangedCallback(name, old, now) {
        if (name=='active'&&now==='1'){
            this.target = this.getAttribute("target");
            this.title = slugify(document.querySelector(`#${this.getAttribute("source")}`).textContent);
            this.render();
            this.querySelector('.modal').classList.add('is-active');
        }
      }

    handleEvent(event){
        if (event.type === "click") {
            if (event.target.ariaLabel==='close'){
                this.querySelector(".modal").classList.remove("is-active");
                this.removeAttribute('active');
            }
        }

    }

    #getContent(){
        return /*HTML*/`
            <div class="modal-card">
                <header class="modal-card-head">
                <p class="modal-card-title">${this.state.title?.text[this.state.context.lang]}</p>
                <button class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                <aside class="menu">
                 <ul  class="menu-list is-size-5">
                    <li ><a href="https://www.linkedin.com/shareArticle?mini=true&url=${this.target}&title=${this.title}">${icon(faLinkedin).html[0]}  ${this.state.share[this.state.context.lang]} Linkedin <span class="is-pulled-right">${icon(faShare).html[0]}</span></a></li>
                    <li><a href="https://x.com/intent/tweet?text=${this.title}&url=${this.target}">${icon(faSquareXTwitter).html[0]}  ${this.state.share[this.state.context.lang]} X <span class="is-pulled-right">${icon(faShare).html[0]}</span></a></li>
                    <li><a href="https://www.facebook.com/sharer/sharer.php?u=${this.target}">${icon(faSquareFacebook).html[0]}  ${this.state.share[this.state.context.lang]} Facebook <span class="is-pulled-right">${icon(faShare).html[0]}</span></a></li>
                    <li><a href="https://api.whatsapp.com/send?text=${this.title}%20${this.target}">${icon(faSquareWhatsapp).html[0]}  ${this.state.share[this.state.context.lang]} Whatsapp <span class="is-pulled-right">${icon(faShare).html[0]}</span></a></li>
                    <li><a href="https://t.me/share/url?url=${this.target}&text=${this.title}">${icon(faTelegram).html[0]}  ${this.state.share[this.state.context.lang]} Telegram <span class="is-pulled-right">${icon(faShare).html[0]}</span></a></li>
                    <li><a href="mailto:?subject=${this.title}&body=${this.target}">${icon(faEnvelope).html[0]}  ${this.state.share[this.state.context.lang]} eMail <span class="is-pulled-right">${icon(faShare).html[0]}</span></a></li>
                </ul>
                </aside>
                </section>
            </div>
        `;
    }


    render(){
    	this.innerHTML =  /* html */`
        <div class="modal">
            <div class="modal-background"></div>
                ${this.#getContent()}
        </div>
        `;
    	this.addEvents();

    }

}

customElements.define("share-link", ShareLink)