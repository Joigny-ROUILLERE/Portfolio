(() => {
const { projects, featured, stages, perso } = window.SITE;

const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  return e;
};
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* Emplacement vide : cadre pointillé avec le nom de l'image à ajouter */
const placeholder = (label) =>
  `<div class="ph" role="img" aria-label="${esc(label || "Image à ajouter")}"><span>${esc(label || "Image à ajouter")}</span></div>`;

/* ---------- 1. Carrousel des projets à la une ---------- */
const carousel = $("#carousel");
featured.forEach((f, i) => {
  const p = f.id ? projects[f.id] : null;
  const card = el("button", "card");
  card.type = "button";
  if (f.id) card.dataset.project = f.id; else card.dataset.scroll = `perso-${f.perso}`;
  const cover = f.cover || (p && p.cover);
  const title = f.title || p.title.split(" : ")[0];
  card.innerHTML = `
    <span class="card-media${p && p.fit === "contain" ? " fit-contain" : ""}">${cover ? `<img src="${cover}" alt="" loading="${i < 3 ? "eager" : "lazy"}">` : placeholder(p && p.coverLabel)}</span>
    <span class="card-tag">${esc(f.tag)}</span>
    <span class="card-title">${esc(title)}</span>
    <span class="card-sub">${esc(f.sub)}</span>`;
  carousel.appendChild(card);
});
carousel.addEventListener("click", (e) => {
  const c = e.target.closest("[data-scroll]");
  if (!c) return;
  const t = document.getElementById(c.dataset.scroll);
  if (t) t.scrollIntoView({ behavior: "smooth", block: "center" });
});

const nextBtn = $("#car-next");
const prevBtn = $("#car-prev");
const updateArrow = () => {
  const end = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8;
  nextBtn.classList.toggle("is-hidden", end);
  prevBtn.classList.toggle("is-hidden", carousel.scrollLeft <= 8);
};
nextBtn.addEventListener("click", () => carousel.scrollBy({ left: carousel.clientWidth * 0.7, behavior: "smooth" }));
prevBtn.addEventListener("click", () => carousel.scrollBy({ left: -carousel.clientWidth * 0.7, behavior: "smooth" }));
carousel.addEventListener("scroll", updateArrow, { passive: true });
window.addEventListener("resize", updateArrow);
updateArrow();

/* ---------- 2. Timeline ---------- */
const timeline = $("#timeline");
stages.forEach((s) => {
  const n = s.projects.length;
  const art = el("article", "stage reveal");
  art.id = `stage-${s.id}`;
  art.innerHTML = `
    <div class="stage-rail" aria-hidden="true"><span class="dot"></span></div>
    <div class="stage-body">
      <p class="period">${esc(s.period)}</p>
      <h3>${esc(s.title)}</h3>
      <p class="place">${esc(s.place)}</p>
      <p class="blurb">${esc(s.blurb)}</p>
      ${n ? `<button class="toggle" type="button" aria-expanded="false" aria-controls="sp-${s.id}">
              <span>${n} projet${n > 1 ? "s" : ""}</span><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div class="stage-projects" id="sp-${s.id}"><div class="stage-projects-inner"><div class="mini-grid"></div></div></div>`
          : `<p class="no-proj">Pas de projet à présenter pour cette étape.</p>`}
    </div>`;
  if (n) {
    const grid = $(".mini-grid", art);
    s.projects.forEach((id) => {
      const p = projects[id];
      const b = el("button", "mini");
      b.type = "button";
      b.dataset.project = id;
      b.innerHTML = `
        <span class="mini-media${p.fit === "contain" ? " fit-contain" : ""}">${p.cover ? `<img src="${p.cover}" alt="" loading="lazy">` : placeholder(p.coverLabel)}</span>
        <span class="mini-text"><span class="mini-kicker">${esc(p.kicker)}</span><span class="mini-title">${esc(p.title)}</span></span>`;
      grid.appendChild(b);
    });
    const tg = $(".toggle", art);
    tg.addEventListener("click", () => {
      const open = tg.getAttribute("aria-expanded") === "true";
      tg.setAttribute("aria-expanded", String(!open));
      art.classList.toggle("is-open", !open);
    });
  }
  timeline.appendChild(art);
});
// Étape finale : l'après
timeline.appendChild(el("article", "stage stage-end reveal", `
  <div class="stage-rail" aria-hidden="true"><span class="dot dot-end"></span></div>
  <div class="stage-body">
    <p class="period">Octobre 2027</p>
    <h3>La suite</h3>
    <p class="blurb">Diplôme d’ingénieur en conception mécanique. Je cherche un poste d’ingénieur conception ou de chef de projet.</p>
    <a class="btn btn-primary" href="#contact">Me contacter</a>
  </div>`));

// Ouvrir la première étape avec projets, pour montrer le principe
const firstToggle = $(".toggle", $("#stage-bts"));
if (firstToggle) firstToggle.click();

/* ---------- 3. Hors école ---------- */
const persoEl = $("#perso");
perso.forEach((p) => {
  const stats = p.stats.length
    ? `<ul class="stats">${p.stats.map(([v, l]) => `<li><strong>${esc(v)}</strong><span>${esc(l)}</span></li>`).join("")}</ul>` : "";
  const mediaHtml = p.media
    ? `<div class="perso-media has-slider${p.tall ? " is-tall" : ""}" data-slider>
         <div class="slides">${p.media.map((m, i) => m.type === "video"
            ? `<video class="slide${i === 0 ? " is-on" : ""}" src="${m.src}" poster="${m.poster || ""}" muted loop playsinline preload="none" aria-label="${esc(m.alt || "")}"></video>`
            : `<img class="slide${i === 0 ? " is-on" : ""}" src="${m.src}" alt="${esc(m.alt || "")}" loading="lazy">`).join("")}</div>
         <div class="slider-dots" role="tablist">${p.media.map((m, i) => `<button type="button" class="dot-btn${i === 0 ? " is-on" : ""}" data-i="${i}" role="tab" aria-label="${esc(m.alt || "Média " + (i + 1))}">${m.type === "video" ? "▶" : "●"}</button>`).join("")}</div>
       </div>`
    : `<div class="perso-media">${p.img ? `<img src="${p.img}" alt="${esc(p.imgAlt || "")}" loading="lazy">` : placeholder(p.imgLabel)}</div>`;
  const card = el("article", "perso-card reveal", `
    ${mediaHtml}
    <div class="perso-body">
      <p class="eyebrow">${esc(p.kicker)}</p>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.text)}</p>
      ${stats}
    </div>`);
  card.id = `perso-${p.id}`;
  persoEl.appendChild(card);
});

/* Diaporama photo + vidéos (section Hors école) */
document.querySelectorAll("[data-slider]").forEach((box) => {
  const slides = [...box.querySelectorAll(".slide")];
  const dots = [...box.querySelectorAll(".dot-btn")];
  const show = (i) => {
    slides.forEach((s, k) => {
      const on = k === i;
      s.classList.toggle("is-on", on);
      if (s.tagName === "VIDEO") { if (on) { s.currentTime = 0; s.play().catch(() => {}); } else s.pause(); }
    });
    dots.forEach((d, k) => d.classList.toggle("is-on", k === i));
  };
  dots.forEach((d) => d.addEventListener("click", () => show(+d.dataset.i)));
  slides.forEach((s, k) => {
    if (s.tagName === "VIDEO") s.addEventListener("click", () => (s.paused ? s.play() : s.pause()));
    if (s.tagName === "VIDEO") s.addEventListener("ended", () => {});
  });
});

/* ---------- Fiche projet (modale) ---------- */
const modal = $("#modal");
const mMedia = $("#m-media");
let lastFocus = null;
let viewerCleanup = null;

/* ---------- Plein écran (lightbox) ---------- */
const lightbox = $("#lightbox");
const lbImg = $("#lb-img");
const lbScroll = $("#lb-scroll");
let lbList = [];
let lbIndex = 0;
let lbZoom = false;

function lbRender() {
  lbZoom = false;
  lbImg.style.width = "";
  lbImg.classList.remove("is-zoomed");
  lbScroll.scrollTo(0, 0);
  lbImg.src = lbList[lbIndex];
  const multi = lbList.length > 1;
  $("#lb-prev").hidden = !multi;
  $("#lb-next").hidden = !multi;
  $("#lb-count").textContent = multi ? `${lbIndex + 1} / ${lbList.length}` : "";
  $("#lb-hint").textContent = "Clique sur l’image pour zoomer";
}
function lbOpen() {
  if (!lbList.length) return;
  lbRender();
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add("is-open"));
  $("#lb-close").focus();
}
function lbClose() {
  lightbox.classList.remove("is-open");
  setTimeout(() => { lightbox.hidden = true; lbImg.removeAttribute("src"); }, 150);
}
function lbStep(d) {
  if (lbList.length < 2) return;
  lbIndex = (lbIndex + d + lbList.length) % lbList.length;
  lbRender();
}
function lbToggleZoom() {
  lbZoom = !lbZoom;
  lbImg.classList.toggle("is-zoomed", lbZoom);
  // Zoom : l'image passe à au moins 1,7 fois la largeur de l'écran (défilement pour se déplacer)
  lbImg.style.width = lbZoom ? `${Math.max(lbImg.naturalWidth, innerWidth * 1.7)}px` : "";
  $("#lb-hint").textContent = lbZoom ? "Fais défiler pour te déplacer · clique pour revenir" : "Clique sur l’image pour zoomer";
}
lbImg.addEventListener("click", lbToggleZoom);
$("#lb-prev").addEventListener("click", () => lbStep(-1));
$("#lb-next").addEventListener("click", () => lbStep(1));
$("#lb-close").addEventListener("click", lbClose);
lbScroll.addEventListener("click", (e) => { if (e.target === lbScroll) lbClose(); });

function openProject(id, pushHash = true) {
  const p = projects[id];
  if (!p) return;
  lastFocus = document.activeElement;
  $("#m-kicker").textContent = p.kicker;
  $("#m-title").textContent = p.title;
  $("#m-lead").textContent = p.lead;

  // Média principal + vignettes
  const gallery = p.gallery && p.gallery.length ? p.gallery : [];
  mMedia.innerHTML = "";
  const stage = el("div", "m-stage");
  const showImg = (src, list = gallery) => {
    stage.innerHTML = `<img src="${src}" alt="" title="Agrandir"><button class="m-expand" type="button" aria-label="Afficher en plein écran">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></button>`;
    lbList = list.length ? list : [src];
    lbIndex = Math.max(0, lbList.indexOf(src));
  };
  if (gallery.length) showImg(gallery[0]); else stage.innerHTML = placeholder(p.coverLabel);
  mMedia.appendChild(stage);
  if (gallery.length > 1) {
    const thumbs = el("div", "m-thumbs");
    gallery.forEach((g, i) => {
      const t = el("button", "m-thumb" + (i === 0 ? " is-on" : ""), `<img src="${g}" alt="Image ${i + 1}">`);
      t.type = "button";
      t.addEventListener("click", () => {
        cleanupViewer();
        showImg(g);
        thumbs.querySelectorAll(".m-thumb").forEach((x) => x.classList.remove("is-on"));
        t.classList.add("is-on");
      });
      thumbs.appendChild(t);
    });
    mMedia.appendChild(thumbs);
  }

  // Faits
  const facts = $("#m-facts");
  facts.innerHTML = (p.facts || []).map(([k, v, flag]) =>
    `<div class="${flag ? "fact fact-" + flag : "fact"}"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");

  // Actions : 3D et animations
  const actions = $("#m-actions");
  actions.innerHTML = "";
  const models = p.models || (p.model ? [p.model] : []);
  models.forEach((m) => {
    const b = el("button", "btn btn-primary", `${esc(m.label)} <span aria-hidden="true">⟲</span>`);
    b.type = "button";
    b.addEventListener("click", async () => {
      cleanupViewer();
      stage.innerHTML = `<div class="viewer" id="viewer"><p class="viewer-msg">Chargement du modèle 3D…</p></div>`;
      try {
        const { mountViewer } = await import("./viewer.js");
        viewerCleanup = await mountViewer($("#viewer"), m.src);
      } catch (e) {
        console.error(e);
        $("#viewer").innerHTML = `<p class="viewer-msg">La 3D nécessite une connexion et le site en ligne (ou un serveur local).</p>`;
      }
    });
    actions.appendChild(b);
  });
  (p.anims || []).forEach((a) => {
    const b = el("button", "btn", `▶ ${esc(a.label)}`);
    b.type = "button";
    b.addEventListener("click", () => {
      cleanupViewer();
      showImg(a.src, [a.src]);
      mMedia.querySelectorAll(".m-thumb").forEach((x) => x.classList.remove("is-on"));
    });
    actions.appendChild(b);
  });

  modal.hidden = false;
  document.body.classList.add("no-scroll");
  requestAnimationFrame(() => modal.classList.add("is-open"));
  $(".modal-close", modal).focus();
  if (pushHash) history.replaceState(null, "", `#projet-${id}`);
}

function cleanupViewer() {
  if (viewerCleanup) { try { viewerCleanup(); } catch (_) {} viewerCleanup = null; }
}

function closeProject() {
  cleanupViewer();
  modal.classList.remove("is-open");
  setTimeout(() => { modal.hidden = true; mMedia.innerHTML = ""; }, 180);
  document.body.classList.remove("no-scroll");
  if (location.hash.startsWith("#projet-")) history.replaceState(null, "", location.pathname + location.search);
  if (lastFocus) lastFocus.focus();
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-project]");
  if (trigger) { openProject(trigger.dataset.project); return; }
  if (e.target.closest("[data-close]")) closeProject();
});
mMedia.addEventListener("click", (e) => {
  if (e.target.closest(".m-expand") || e.target.closest(".m-stage img")) lbOpen();
});
document.addEventListener("keydown", (e) => {
  if (!lightbox.hidden) {
    if (e.key === "Escape") { e.stopPropagation(); lbClose(); }
    else if (e.key === "ArrowLeft") lbStep(-1);
    else if (e.key === "ArrowRight") lbStep(1);
    return;
  }
  if (e.key === "Escape" && !modal.hidden) closeProject();
});
if (location.hash.startsWith("#projet-")) openProject(location.hash.slice(8), false);

/* ---------- Navigation flottante : section active ---------- */
const links = [...document.querySelectorAll(".pill a")];
const secs = links.map((a) => document.getElementById(a.dataset.target));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      links.forEach((a) => a.classList.toggle("is-active", a.dataset.target === en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
secs.forEach((s) => s && spy.observe(s));

/* ---------- Apparition au scroll ---------- */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduce || !("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach((n) => n.classList.add("in"));
} else {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((n) => io.observe(n));
}

$("#year").textContent = new Date().getFullYear();
})();
