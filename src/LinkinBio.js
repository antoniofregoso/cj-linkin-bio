import { AppElement } from "@buyerjourney/bj-core";

import { icon } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faCircleCheck, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
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
        this.eventName = "user:click-linkin-bio";
        this.state =this.initState(this.#default,state);
        this.getAttribute("id")||this.setAttribute("id",this.state.id||`component-${Math.floor(Math.random() * 100)}`);
    }

    #ok =  icon(faCircleCheck, {classes: ['fa-1x', 'has-text-link']}).html[0];
    
    handleEvent(event) {
        if(this.state?.eventName!=undefined){
            this.eventName = this.state.eventName             
          }
        if (event.type === "click") { 
            if (event.target.tagName==='path'||event.target.tagName==='svg'||event.target.tagName==='P'&&event.target.classList.contains( 'option' )){
                const bjClick = new CustomEvent(this.eventName,{
                detail:{link:event.target.closest('p').dataset.source, type:'share'},
                bubbles: true,
                composed: true
                });
                this.dispatchEvent(bjClick);
            }else if (event.target.tagName==='IMG'||event.target.tagName==='P'&&event.target.classList.contains( 'action' )){
               const bjClick = new CustomEvent(this.eventName,{
                detail:{source:event.target.closest('BUTTON').dataset.source, type:'action'},
                bubbles: true,
                composed: true
                });
                this.dispatchEvent(bjClick);
            }else if(event.target.classList.contains( 'lang' )){
                const bjClick = new CustomEvent(this.eventName,{
                    detail:{source:event.target.id.slice(4), type:'lang'},
                    bubbles: true,
                    composed: true
                    });
                    this.dispatchEvent(bjClick);
            }
        }
    }

    addEvents(){
        let buttons = this.querySelectorAll("button");
        if (buttons.length>0){
          buttons.forEach((item)=>{
            item.addEventListener("click",this)
          });    
        };
        let actions =  this.querySelectorAll(".option");
        if (actions.length>0){
            actions.forEach((item)=>{
                item.addEventListener("click",this)
              });    
        };
        if (this.state.i18n?.lang!=undefined){
            Object.entries(this.state.i18n.lang).forEach(([key, value])=>{  
                this.querySelector(`#btn-${key}`).addEventListener("click",this)
            });            
        }
      }
    
    #getSocialBar(){
        let iconClasses = {classes: ['fa-2x', this.state.socialBar?.iconsColor!=undefined?this.state.socialBar.iconsColor:'has-text-white']};
        let icons = ''
        if(this.state.socialBar?.networks.length>0){
            this.state.socialBar?.networks.forEach(el=>{
                if (el.includes('x.com')){
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

    #getLang(){
        let lngButtons = ``;
        Object.entries(this.state.i18n.lang).forEach(([key, value])=>{
            let focus = ['button', 'lang'];
            if (key === this.state.context.lang ){focus.push('is-focused')}
            lngButtons += `<button id="btn-${key}" ${this.getClasses(focus, this.state.i18n?.classList)}>${value}</button>`
        });
        return lngButtons;
    }

    #geti18n(){
       return /* html */`
        <div class="buttons buttons are-small is-centered">
            ${this.#getLang()}
        </div>
       `
    }

    #getLinks(){
        let links = ``;
        if(this.state.links?.cards.length>0){
            this.state.links.cards.forEach(el=>{
                let link = /* html */ `
                    <div ${typeof el.id === 'undefined'?``:`id="${el.id}" style="cursor: pointer;" `}  ${this.getClasses(["card","mt-5"], this.state.links.classList)} ${this.setAnimation(this.state.links.animation)}>
                        <div class="card-content p-2">
                            <div class="media">
                                ${el.imgSrc!=undefined?`                                     
                                    <figure class="media-left">
                                        ${el.href===undefined?`<button style="width:100%" data-source="${el.id}">`:`<a href="${el.href}">`}
                                        <p class="image is-48x48 action">
                                        <img class="action" src="${el.imgSrc}" />
                                        </p>${el.href===undefined?`</button>`:`</a>`}
                                    `:''}     
                                    </figure>                           
                                <div class="media-content pt-3" style="min-height:48px">
                                     ${el.href===undefined?`<button style="width:100%" data-source="${el.id}">`:`<a href="${el.href}" style="color: inherit; text-decoration: none;">`}
                                    <p class="is-6 action">${el.text[this.state.context.lang]}</p>
                                    ${el.href===undefined?`</button>`:`</a>`}
                                </div>
                                <figure class="media-right pt-1">
                                    <p class="icon is-48x48 pt-3 option" data-source="${el.href===undefined?'/':el.href}">
                                    ${icon(faEllipsisVertical).html[0]}
                                    </p>
                                </figure>
                            </div>
                        </div>
                    </div>
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
            <div class="column is-5 has-text-centered px-5" >
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
                ${this.state.i18n?.up===true?this.#geti18n():``}
                ${this.state.socialBar?.up===true?this.#getSocialBar():``}
                ${this.#getLinks()}
                ${this.state.socialBar?.up!=true?this.#getSocialBar():``}
                ${this.state.i18n?.up!=true?this.#geti18n():``}
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