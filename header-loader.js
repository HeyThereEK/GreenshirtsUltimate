// window.addEventListener("DOMContentLoaded", () => {
//     fetch("header.html")
//     .then(response => {
//         if (!response.ok) throw new Error("HTTP ");
//         return response.text();
//     })
//     .then(html => {
//         document.getElementById("header").innerHTML = html;
//     })
//     .catch(error => {
//         console.error("Failed to load header.html:", error);
//         document.getElementById("header").innerHTML = "<!-- header load failed :( -->";
//     });
// });
// function highlightCurrentNav() {
// // current file (e.g. "About.html" or "index.html")
// const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
// // select nav links inside the injected header
// document.querySelectorAll('#header a.nav-link, #header .navbar-nav a, #header a').forEach(a => {
//     const href = a.getAttribute('href');
//     if (!href) return;
//     const hrefFile = href.split('/').pop().toLowerCase();
//     if (hrefFile === current) a.classList.add('current'); else a.classList.remove('current');
// });
// }

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // fetch header + footer in parallel
    const [hRes, fRes] = await Promise.all([fetch('./header.html'), fetch('./footer.html')]);
    if (!hRes.ok) throw new Error('header fetch ' + hRes.status);
    if (!fRes.ok) throw new Error('footer fetch ' + fRes.status);

    document.getElementById('header').innerHTML = await hRes.text();
    document.getElementById('footer').innerHTML = await fRes.text();

    // highlight current nav link
    const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('#header a[href]').forEach(a => {
      const hrefFile = a.getAttribute('href').split('/').pop().toLowerCase();
      a.classList.toggle('current', hrefFile === current);
    });

    const blurDivs = document.querySelectorAll('.blur-load');
    blurDivs.forEach(div => {
      const img = div.querySelector('img');

      function loaded() {
          div.classList.add('loaded');
      }

      if (img.complete) {
          loaded();
      } else {
          img.addEventListener('load', loaded);
      }
    });
    

    
  } catch (err) {
    console.error('header/footer load failed:', err);
    // optional minimal fallback
    if (!document.getElementById('header').innerHTML) document.getElementById('header').innerHTML = '<!-- header failed -->';
    if (!document.getElementById('footer').innerHTML) document.getElementById('footer').innerHTML = '<!-- footer failed -->';
  }
});
