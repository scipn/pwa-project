self.addEventListener("fetch", function(event) {
  if (event.request.url.includes("/images/usf.png")) {
    event.respondWith(
      fetch("/images/usf.png")
    );
  }
});