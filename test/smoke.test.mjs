// Smoke test: imports the *built* dist (what actually gets published) and
// mounts each component in a jsdom document with minimal realistic props.
// Catches broken exports, malformed markup, and thrown exceptions - not
// full behavioral coverage.
import { test } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!doctype html><html><body><div id="app"></div></body></html>`, {
  runScripts: "outside-only",
});
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.customElements = dom.window.customElements;
globalThis.CustomEvent = dom.window.CustomEvent;

const { AboutMe, LinkinBio, ShareLink } = await import("../dist/index.js");

const context = { lang: "es", theme: "light" };

test("AboutMe renders the modal content", () => {
  document.body.innerHTML = "";
  const el = new AboutMe({
    context,
    title: { text: { es: "Sobre mi" } },
    content: { text: { es: "Contenido **markdown**" } },
  });
  document.body.appendChild(el);
  assert.ok(el.querySelector(".modal-card"), "expected a .modal-card inside about-me");
  assert.match(el.textContent, /Sobre mi/);
});

test("ShareLink renders a share menu once activated", () => {
  document.body.innerHTML = '<h1 id="post-title">Mi articulo</h1>';
  const el = new ShareLink({ context, title: { text: { es: "Compartir" } } });
  document.body.appendChild(el);
  el.setAttribute("source", "post-title");
  el.setAttribute("target", "https://example.test/post");
  el.setAttribute("active", "1");
  assert.ok(el.querySelector(".menu-list"), "expected the share menu to render");
  assert.ok(el.querySelectorAll(".menu-list li").length >= 5, "expected multiple share network entries");
});

test("LinkinBio renders avatar, links and social bar", () => {
  document.body.innerHTML = "";
  const el = new LinkinBio({
    context,
    avatar: { src: "https://example.test/avatar.png" },
    title: { text: { es: "Mi marca" }, verified: true },
    subtitle: { text: { es: "Bienvenido" } },
    socialBar: { networks: ["https://instagram.com/mimarca", "https://x.com/mimarca"] },
    links: {
      cards: [
        { id: "link-1", text: { es: "Mi sitio web" }, href: "https://example.test" },
      ],
    },
  });
  document.body.appendChild(el);
  assert.ok(el.querySelector("img"), "expected the avatar image to render");
  assert.ok(el.querySelector(".card"), "expected at least one link card to render");
  assert.match(el.textContent, /Mi sitio web/);
});
