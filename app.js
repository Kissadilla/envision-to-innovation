// Progressive enhancement only: every page works without this file.
(function () {
  document.documentElement.classList.add("js");

  // Mobile menu disclosure
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var mq = window.matchMedia("(max-width: 47.99em)");
    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.setAttribute("data-open", String(open));
    }
    function sync() { setOpen(!mq.matches); }
    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync);
    else if (mq.addListener) mq.addListener(sync);

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mq.matches && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  // Copy email address
  var copyBtn = document.querySelector("[data-copy]");
  var status = document.querySelector(".copy-status");
  if (copyBtn) {
    copyBtn.hidden = false;
    copyBtn.addEventListener("click", function () {
      var text = copyBtn.getAttribute("data-copy");
      function done(msg) { if (status) status.textContent = msg; }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(
          function () { done("Copied. Paste it into your email app."); },
          function () { done("Couldn't copy automatically. Select the address above and copy it."); }
        );
      } else {
        done("Couldn't copy automatically. Select the address above and copy it.");
      }
    });
  }
})();
