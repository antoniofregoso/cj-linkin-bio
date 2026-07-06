import { render } from "preact";
import { AppElement } from "@customerjourney/cj-core";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope, faCircleCheck, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import {
    faSquareXTwitter, faSquareFacebook, faSquareThreads, faSquareInstagram, faYoutube, faLinkedin, faVk,
    faDiscord, faTwitch, faTiktok, faSquareWhatsapp, faSquareGithub, faSquareGitlab
} from '@fortawesome/free-brands-svg-icons';

const SOCIAL_ICON_MAP = [
    ['x.com', faSquareXTwitter],
    ['threads', faSquareThreads],
    ['instagram', faSquareInstagram],
    ['facebook', faSquareFacebook],
    ['youtube', faYoutube],
    ['linkedin', faLinkedin],
    ['vk', faVk],
    ['discord', faDiscord],
    ['twitch', faTwitch],
    ['tiktok', faTiktok],
    ['whatsapp', faSquareWhatsapp],
    ['github', faSquareGithub],
    ['gitlab', faSquareGitlab],
    ['mailto:', faEnvelope],
];

export class LinkinBio extends AppElement {
    #default = {
        cardsWidth: 4,
        buttons: []
    };

    /**
     *
     * @param {Object} state - {props:{...}, context:{...}}
     */
    constructor(state = {}) {
        super();
        this.eventName = "user:click-linkin-bio";
        this.state = this.initState(this.#default, state);
        this.getAttribute("id") || this.setAttribute("id", this.state.id || `component-${Math.floor(Math.random() * 100)}`);
    }

    #ok = icon(faCircleCheck, { classes: ['fa-1x', 'has-text-link'] }).html[0];

    handleEvent(event) {
        if (this.state?.eventName != undefined) {
            this.eventName = this.state.eventName
        }
        if (event.type === "click") {
            if (event.target.tagName === 'path' || event.target.tagName === 'svg' || event.target.tagName === 'P' && event.target.classList.contains('option')) {
                const bjClick = new CustomEvent(this.eventName, {
                    detail: { link: event.target.closest('p').dataset.share, type: 'share', source: event.target.closest('p').dataset.source },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(bjClick);
            } else if (event.target.tagName === 'IMG' || event.target.tagName === 'P' && event.target.classList.contains('action')) {
                const bjClick = new CustomEvent(this.eventName, {
                    detail: { source: event.target.closest('BUTTON').dataset.source, type: 'action' },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(bjClick);
            } else if (event.target.classList.contains('lang')) {
                const bjClick = new CustomEvent(this.eventName, {
                    detail: { source: event.target.id.slice(4), type: 'lang' },
                    bubbles: true,
                    composed: true
                });
                this.dispatchEvent(bjClick);
            }
        }
    }

    addEvents() {
        let buttons = this.querySelectorAll("button");
        if (buttons.length > 0) {
            buttons.forEach((item) => {
                item.addEventListener("click", this)
            });
        };
        let actions = this.querySelectorAll(".option");
        if (actions.length > 0) {
            actions.forEach((item) => {
                item.addEventListener("click", this)
            });
        };
        if (this.state.i18n?.lang != undefined) {
            Object.entries(this.state.i18n.lang).forEach(([key, value]) => {
                this.querySelector(`#btn-${key}`).addEventListener("click", this)
            });
        }
    }

    #getSocialBarJSX() {
        let iconClasses = { classes: ['fa-2x', this.state.socialBar?.iconsColor != undefined ? this.state.socialBar.iconsColor : 'has-text-white'] };
        const networks = this.state.socialBar?.networks?.length > 0 ? this.state.socialBar.networks : [];

        return (
            <div class="card" style="box-shadow: none; background-color:transparent;">
                <div class="card-content p-1">
                    <div class="media">
                        <div class="media-content pt-3" style="height:48px">
                            {networks.map((el, i) => {
                                const match = SOCIAL_ICON_MAP.find(([needle]) => el.includes(needle));
                                if (!match) return null;
                                return (
                                    <a class="p-1" href={el} key={i} dangerouslySetInnerHTML={{ __html: icon(match[1], iconClasses).html[0] }} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    #getLangJSX() {
        if (this.state.i18n?.lang == undefined) return [];
        return Object.entries(this.state.i18n.lang).map(([key, value]) => {
            let focus = ['button', 'lang'];
            if (key === this.state.context.lang) {
                if (this.state.i18n?.selectedClassList != undefined) {
                    return <button id={`btn-${key}`} key={key} class={this.getClassNames(focus, this.state.i18n?.selectedClassList)}>{value}</button>;
                }
                focus.push('is-focused');
            }
            return <button id={`btn-${key}`} key={key} class={this.getClassNames(focus, this.state.i18n?.classList)}>{value}</button>;
        });
    }

    #geti18nJSX() {
        return (
            <div class="buttons buttons are-small is-centered">
                {this.#getLangJSX()}
            </div>
        );
    }

    #getLinksJSX() {
        if (!(this.state.links?.cards.length > 0)) {
            console.error('No links to render');
            return [];
        }
        return this.state.links.cards.map((el, i) => {
            if (typeof el.id !== 'undefined') {
                this.state.buttons.push(el.id);
            }
            return (
                <div
                    key={i}
                    id={el.id}
                    style={el.id !== undefined ? 'cursor: pointer;' : undefined}
                    class={this.getClassNames(["card", "mt-5"], this.state.links.classList)}
                    {...this.getAnimationProps(this.state.links.animation)}
                >
                    <div class="card-content p-2">
                        <div class="media">
                            {el.imgSrc != undefined &&
                                <figure class="media-left">
                                    {el.href === undefined ? (
                                        <button style="width:100%" data-source={el.id}>
                                            <p class="image is-48x48 action">
                                                <img class="action" src={el.imgSrc} />
                                            </p>
                                        </button>
                                    ) : (
                                        <a href={el.href}>
                                            <p class="image is-48x48 action">
                                                <img class="action" src={el.imgSrc} />
                                            </p>
                                        </a>
                                    )}
                                </figure>
                            }
                            <div class="media-content pt-3" style="min-height:48px">
                                {el.href === undefined ? (
                                    <button style="width:100%" data-source={el.id}>
                                        <p id={`content-${el.id}`} class="is-6 action">{el.text[this.state.context.lang]}</p>
                                    </button>
                                ) : (
                                    <a href={el.href} style="color: inherit; text-decoration: none;">
                                        <p id={`content-${el.id}`} class="is-6 action">{el.text[this.state.context.lang]}</p>
                                    </a>
                                )}
                            </div>
                            <figure class="media-right pt-1">
                                <p
                                    class="icon is-48x48 pt-3 option"
                                    data-source={`content-${el.id}`}
                                    data-share={el.href === undefined ? '/' : el.href}
                                    dangerouslySetInnerHTML={{ __html: icon(faEllipsisVertical).html[0] }}
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        render(
            <div class="columns is-centered">
                <div class="column is-5 has-text-centered px-5">
                    <figure class="image is-96x96 is-inline-block mt-6" {...this.getAnimationProps(this.state.avatar?.animation)}>
                        <img class={this.getClassNames([], this.state.avatar?.classList)} src={this.state.avatar?.src} />
                    </figure>
                    <div class="card" style="box-shadow: none; background-color:transparent;">
                        <div class="card-content p-1">
                            <div class="media">
                                <div class="media-content pt-3" style="min-height:44px">
                                    <p class={this.getClassNames(["title", "is-5", "mb-0"], this.state.title?.classList)} {...this.getAnimationProps(this.state.title?.animation)}>
                                        {this.state.title?.text[this.state.context.lang]}
                                        {this.state.title?.verified === true && <span class="ml-1" dangerouslySetInnerHTML={{ __html: this.#ok }} />}
                                    </p>
                                    <p class={this.getClassNames([], this.state.subtitle?.classList)} {...this.getAnimationProps(this.state.subtitle?.animation)}>
                                        {this.state.subtitle?.text[this.state.context.lang]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.i18n?.up === true && this.#geti18nJSX()}
                    {this.state.socialBar?.up === true && this.#getSocialBarJSX()}
                    {this.#getLinksJSX()}
                    {this.state.socialBar?.up != true && this.#getSocialBarJSX()}
                    {this.state.i18n?.up != true && this.#geti18nJSX()}
                    {this.state.footer?.src !== undefined &&
                        <div class="card mt-1" style="box-shadow: none; background-color:transparent;">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content has-text-centered">
                                        <figure class="image is-inline-block" style="width:100px">
                                            <span class={this.getClassNames([], this.state.footer?.message?.classList)}>{this.state.footer?.message?.text[this.state.context.lang]}</span>
                                            {this.state.footer?.url === undefined ? (
                                                <img src={this.state.footer.src} alt={this.state.footer?.alt[this.state.context.lang]} />
                                            ) : (
                                                <a href={this.state.footer.url}>
                                                    <img src={this.state.footer.src} alt={this.state.footer?.alt[this.state.context.lang]} />
                                                </a>
                                            )}
                                        </figure>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>,
            this
        );
        this.addEvents();
    }
}

customElements.define("linkin-bio", LinkinBio)
