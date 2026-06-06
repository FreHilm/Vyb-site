// Vyb landing page — light progressive enhancement only.

// 1. Scroll-reveal: fade elements in as they enter the viewport.
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // small stagger for siblings in the same grid
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('in'), delay);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );
  revealEls.forEach((el, i) => {
    // stagger cards within a grid so they cascade in
    if (el.classList.contains('card')) el.dataset.delay = (i % 4) * 70;
    io.observe(el);
  });
} else {
  revealEls.forEach((el) => el.classList.add('in'));
}

// 2. Video fallback: if the demo file is missing, swap in the placeholder so
// the page never shows a dead black <video> with an empty scrubber.
const video = document.querySelector('video.demo-video');
if (video) {
  const fbTemplate = video.querySelector('.video-fallback');
  const fbHTML = fbTemplate ? fbTemplate.outerHTML : '';
  const showFallback = () => {
    if (video.dataset.fellBack) return;
    video.dataset.fellBack = '1';
    const holder = document.createElement('div');
    holder.className = 'demo-video';
    holder.innerHTML = fbHTML;
    video.replaceWith(holder);
  };
  const check = () => {
    // NETWORK_NO_SOURCE (3) = the browser tried every <source> and none
    // loaded; .error is set when a chosen source fails to decode/fetch.
    if (video.networkState === 3 || video.error) showFallback();
  };
  video.addEventListener('error', check, true);   // bubbles from <source>
  video.addEventListener('stalled', check);
  // Backstop: by now a real file would be at least metadata-loaded.
  setTimeout(check, 1500);
}

// 3. Timed captions: show a clarifying line below the video that changes as it
// plays. Each cue is { t: <seconds into the video>, text: '<what to show>' }.
// The active cue is the last one whose `t` is ≤ the current playback time.
//
// ┌─────────────────────────────────────────────────────────────────────┐
// │  EDIT THESE — set `t` to match the moments in your video (it's ~119s).│
// │  Times must be in ascending order. Add or remove lines freely.        │
// └─────────────────────────────────────────────────────────────────────┘
const CAPTIONS = [
  { t: 0,   text: 'Vyb — one window for every project and every agent.' },
  { t: 4,   text: 'Each profile runs its own AI agent: Claude, Codex, Gemini or OpenCode.' },
  { t: 8,  text: 'Launch several at once and watch them work in parallel.' },
  { t: 23,  text: 'Create new Projects, with its own agent, folder and icon' },
  { t: 42,  text: 'Live file diffs - see exactly what an agent changes, as it happens.' },
  { t: 48,  text: 'Full terminals per project, right beside the agents.' },
  { t: 56,  text: 'Easy to use browser, for your WEB or API projects' },
  { t: 64,  text: 'Need an extra terminal, just add one.' },
  { t: 68,  text: 'When you are ready, git is ready for you' },
  { t: 74,  text: 'Vyb show you all work you have done.' },
  { t: 85,  text: 'Navigate, open, edit and save files in the built-in editor.' },
  { t: 96,  text: 'Plan work on the built-in Kanban board.' },
  { t: 105,  text: 'Plan work on the built-in Kanban board and dispatch tasks to an agent.' },
  { t: 78,  text: 'Git status is always in view — branch, changes, ahead / behind.' },
  { t: 92,  text: 'Plan work on the built-in Kanban board and dispatch tasks to an agent.' },
  { t: 112, text: 'Split you screen to work with the agent and files at the same time.' },
  { t: 116, text: 'Everything in one window. That’s Vyb.' }
];

const captionEl = document.querySelector('.caption-text');
// Only run if we have both a playing <video> and the caption element (the
// fallback swap above removes the <video>, in which case we leave the static
// default line in place).
if (captionEl && video && !video.dataset.fellBack && CAPTIONS.length) {
  const DEFAULT_TEXT = captionEl.textContent.trim();
  let activeIndex = -1;

  const cueFor = (time) => {
    let idx = -1;
    for (let i = 0; i < CAPTIONS.length; i++) {
      if (time >= CAPTIONS[i].t) idx = i;
      else break;
    }
    return idx;
  };

  const setText = (text) => {
    if (captionEl.textContent === text) return;
    captionEl.classList.add('is-fading');
    setTimeout(() => {
      captionEl.textContent = text;
      captionEl.classList.remove('is-fading');
    }, 230);
  };

  const sync = () => {
    const idx = cueFor(video.currentTime);
    if (idx === activeIndex) return;
    activeIndex = idx;
    setText(idx === -1 ? DEFAULT_TEXT : CAPTIONS[idx].text);
  };

  video.addEventListener('timeupdate', sync);
  video.addEventListener('seeking', sync);
  video.addEventListener('loadedmetadata', sync);
}
