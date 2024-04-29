import { AppElement } from "@buyerjourney/bj-core";

import { icon } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faSquareXTwitter, faSquareFacebook, faSquareThreads, faSquareInstagram, faYoutube,  faLinkedin, faVk,
        faDiscord, faTwitch, faTiktok, faSquareWhatsapp, faSquareGithub, faSquareGitlab} from '@fortawesome/free-brands-svg-icons';

export class LinkinBio extends AppElement {
    #default = {
        cardsWidth:4,
        buttons:[]
    };

    /**
     * 
     * @param {Object} state - {props:{...}, context:{...}}
     */
    constructor(state={}){
        super();
        this.state =this.initState(this.#default,state);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
    }

    #ok =  icon(faCircleCheck, {classes: ['fa-1x', 'has-text-link']}).html[0];
    
    handleEvent(event) {
        if (event.type === "click") {
              let eventName;
              if(this.state.buttons.eventName===undefined){
                eventName = "bj-click"
              }else {
                eventName = this.state.buttons.eventName
              }
              const bjClick = new CustomEvent(eventName,{
              detail:{source:event.target.id},
              bubbles: true,
              composed: true
              });
              this.dispatchEvent(bjClick);
        }
    }
    
    #getSocialBar(){
        let iconClasses = {classes: ['fa-2x', this.state.socialBar?.iconsColor!=undefined?this.state.socialBar.iconsColor:'has-text-white']};
        let icons = ''
        if(this.state.socialBar?.networks.length>0){
            this.state.socialBar?.networks.forEach(el=>{
                if (el.includes('twitter')){
                    icons += `<a class="p-1"  href="${el}">${icon(faSquareXTwitter, iconClasses).html[0]}</a>`
                }else if (el.includes('threads')){
                    icons += `<a class="p-1"  href="${el}">${icon(faSquareThreads, iconClasses).html[0]}</a>`
                }else if (el.includes('instagram')){
                    icons += `<a class="p-1"  href="${el}">${icon(faSquareInstagram, iconClasses).html[0]}</a>`
                }else if (el.includes('facebook')){
                    icons += `<a class="p-1"  href="${el}">${icon(faSquareFacebook, iconClasses).html[0]}</a>`
                }else if (el.includes('youtube')){
                    icons += `<a class="p-1"  href="${el}">${icon(faYoutube, iconClasses).html[0]}</a>`
                }else if (el.includes('linkedin')){
                    icons += `<a class="p-1"  href="${el}">${icon(faLinkedin, iconClasses).html[0]}</a>`
                }else if (el.includes('vk')){
                    icons += `<a class="p-1"  href="${el}">${icon(faVk, iconClasses).html[0]}</a>`
                }else if (el.includes('discord')){
                    icons += `<a class="p-1"  href="${el}">${icon(faDiscord, iconClasses).html[0]}</a>`
                }else if (el.includes('twitch')){
                    icons += `<a class="p-1"  href="${el}">${icon(faTwitch, iconClasses).html[0]}</a>`
                }else if (el.includes('tiktok')){
                    icons += `<a class="p-1"  href="${el}">${icon(faTiktok, iconClasses).html[0]}</a>`
                }else if (el.includes('whatsapp')){
                    icons += `<a class="p-1"  href="${el}">${icon(faSquareWhatsapp, iconClasses).html[0]}</a>`
                }else if (el.includes('github')){
                    icons += `<a class="p-1"  href="${el}">${icon(faSquareGithub, iconClasses).html[0]}</a>`
                }else if (el.includes('gitlab')){
                    icons += `<a class="p-1"  href="${el}">${icon(faSquareGitlab, iconClasses).html[0]}</a>`
                }else if (el.includes('mailto:')){
                    icons += `<a class="p-1"  href="${el}">${icon(faEnvelope, iconClasses).html[0]}</a>`
                }
            });
        }
    
    return  /* html */`  
    <div class="card" style="box-shadow: none; background-color:transparent;">
        <div class="card-content p-1">
            <div class="media">
                <div class="media-content pt-3" style="height:48px">
                   ${icons}
                </div>
            </div>
        </div>
    </div>
    `
    }

    #getLinks(){
        let links = ``;
        if(this.state.links?.cards.length>0){
            this.state.links.cards.forEach(el=>{
                let link = /* html */ `
                ${el.href===undefined?`<button style="width:100%">`:`
                <a href="${el.href}">`}
                    <div ${typeof el.id === 'undefined'?``:`id="${el.id}" style="cursor: pointer;" `}  ${this.getClasses(["card","mt-5"], this.state.links.classList)} ${this.setAnimation(this.state.links.animation)}>
                        <div class="card-content p-1">
                            <div class="media">
                                ${el.imgSrc!=undefined?/* html */`
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <img src="${el.imgSrc}" alt="${el.text[this.state.context.lang]}">
                                    </figure>   
                                </div>                         
                                `:``}
                            <div class="media-content pt-3" style="min-height:48px">
                                <p class="is-6">${el.text[this.state.context.lang]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ${el.href===undefined?`</button>`:`</a>`}
                `
                links += link;
                if (typeof el.id != 'undefined'){
                    this.state.buttons.push(el.id)
                }
            })

        }else{
            console.error('No links to render');
        }
        return links;
    }

    render(){
        this.innerHTML =  /* html */`
        <div class="columns is-centered">
            <div class="column is-two-fifths has-text-centered px-5">
                <figure class="image is-96x96 is-inline-block mt-6 " ${this.setAnimation(this.state.avatar?.animation)}>
                    <img ${this.getClasses([], this.state.avatar?.classList)} src="${this.state.avatar?.src}">
                </figure>
                <div class="card" style="box-shadow: none; background-color:transparent;">
                    <div class="card-content p-1">
                        <div class="media">
                            <div class="media-content pt-3" style="min-height:44px">
                                <p ${this.getClasses(["title","is-5","mb-0"], this.state.title?.classList)} ${this.setAnimation(this.state.title?.animation)}>${this.state.title?.text[this.state.context.lang]}${this.state.verified===true?`<sup style="fill:#4FB6EC;">${this.#ok}</sup>`:``}</p>
                                <p ${this.getClasses([], this.state.subtitle?.classList)} ${this.setAnimation(this.state.subtitle?.animation)} >${this.state.subtitle?.text[this.state.context.lang]}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ${this.state.socialBar?.up===true?this.#getSocialBar():``}
                ${this.#getLinks()}
                ${this.state.socialBar?.up!=true?this.#getSocialBar():``}
                ${this.state.footer?.src===undefined?``:`
               <div class="card mt-1" style="box-shadow: none; background-color:transparent;">
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content has-text-centered " >
                                <figure class="image is-inline-block" style="width:100px">
                                <span ${this.getClasses([], this.state.footer?.message?.classList)}>${this.state.footer?.message?.text[this.state.context.lang]}</span>
                                ${this.state.footer?.url===undefined?``:`<a href="${this.state.footer.url}">`}<img src="${this.state.footer.src}" alt="${this.state.footer?.alt[this.state.context.lang]}">${this.state.footer?.url===undefined?``:`</a>`}
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>`}
            </div>
        </div>  
        `;
        this.addEvents();       
    }
}

customElements.define("linkin-bio", LinkinBio)