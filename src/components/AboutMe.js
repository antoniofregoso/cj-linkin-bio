import { AppElement } from "@customerjourney/cj-core";
import { Remarkable } from "remarkable";


export class AboutMe extends AppElement {

    #default = {
        context:{
          lang:"en"
      }
        };


    constructor(props={}){
        super();
        this.eventName = "user:click-modal-box";
        this.state =this.initState(this.#default,props);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
        this.md = new Remarkable();
    }

    static get observedAttributes() {
        return ["active"];
      }
      
    attributeChangedCallback(name, old, now) {
        console.log(name, old, now)
        if (name=='active'&&now==='1'){
            this.querySelector('.modal').classList.add('is-active')
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
                <section class="modal-card-body content">
                ${this.md.render(this.state.content?.text[this.state.context.lang])}
                </section>
            </div>
        `;
    }


    render(){this.innerHTML =  /* html */`
        <div class="modal">
            <div class="modal-background"></div>
                ${this.#getContent()}
        </div>
        `;
    	this.addEvents();
    }

}

customElements.define("about-me", AboutMe)