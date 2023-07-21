!function(){"use strict";!function(){let e=null;function t(t){let n;e=t,document.getElementById("searchInput").addEventListener("input",(t=>{clearTimeout(n),n=setTimeout((()=>{!async function(t){const n=`https://api.spotify.com/v1/search?q=${encodeURIComponent(t)}&type=show,episode,track&limit=5`,o={Authorization:`Bearer ${e}`,"Content-Type":"application/json"};try{let t=await fetch(n,{headers:o});401===t.status&&(await async function(){try{const t=await fetch(`https://podify-backend.onrender.com/refresh_token?refresh_token=${localStorage.getItem("refresh_token")}`),n=await t.json();e=n.access_token,localStorage.setItem("access_token",e)}catch(e){console.error("Error refreshing token:",e)}}(),t=await fetch(n,{headers:o}));const s=await t.json(),a=[];return s.shows&&s.shows.items&&a.push(...s.shows.items.map((e=>({type:"show",name:e.name})))),s.tracks&&s.tracks.items&&a.push(...s.tracks.items.map((e=>({type:"track",name:e.name})))),function(e){const t=document.getElementById("searchResults");t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");n.className="resultItem",n.innerHTML=`<strong>${e.type}:</strong> ${e.name}`,t.appendChild(n)}))}(a),a}catch(e){return console.error("Error searching Spotify:",e),[]}}(t.target.value)}),500)}))}const n=document.getElementById("loginButton");n.addEventListener("click",(()=>{window.location.href="https://podify-backend.onrender.com/login"})),window.addEventListener("load",(()=>{const e=window.location.hash.substring(1),o=new URLSearchParams(e);if(o.has("access_token")){n.style.display="none";const e=o.get("access_token"),s=o.get("token_type"),a=o.get("expires_in");document.getElementById("search-container").style.display="block",console.log({access_token:e,token_type:s,expires_in:a}),function(e){fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{var t;t=e.display_name,document.getElementById("username").textContent=t})).catch((e=>{console.error("Error fetching user profile:",e)}))}(e),t(e),document.getElementById("searchInput").style.display="block"}}))}()}();
//# sourceMappingURL=main.js.map