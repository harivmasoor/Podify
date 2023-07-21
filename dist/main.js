!function(){"use strict";!function(){let e=null;function t(t){let n;e=t,document.getElementById("searchInput").addEventListener("input",(t=>{clearTimeout(n),n=setTimeout((()=>{var n;(n=t.target.value)&&fetch(`https://api.spotify.com/v1/search?q=${n}&type=podcast,track&limit=5`,{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{const t=document.getElementById("searchResults");let n="";e.podcasts&&e.podcasts.items.length&&(n+="<h3>Podcasts</h3>",e.podcasts.items.forEach((e=>{n+=`<p>${e.name}</p>`}))),e.tracks&&e.tracks.items.length&&(n+="<h3>Songs</h3>",e.tracks.items.forEach((e=>{n+=`<p>${e.name} by ${e.artists.map((e=>e.name)).join(", ")}</p>`}))),t.innerHTML=n})).catch((e=>{console.error("Error fetching search results:",e)}))}),500)}))}document.getElementById("loginButton").addEventListener("click",(()=>{window.location.href="https://podify-backend.onrender.com/login"})),window.addEventListener("load",(()=>{const e=window.location.hash.substr(1),n=new URLSearchParams(e);if(n.has("access_token")){const e=n.get("access_token"),o=n.get("token_type"),s=n.get("expires_in");console.log({access_token:e,token_type:o,expires_in:s}),function(e){fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{var t;t=e.display_name,document.getElementById("username").textContent=t})).catch((e=>{console.error("Error fetching user profile:",e)}))}(e),t(e)}}))}()}();
//# sourceMappingURL=main.js.map