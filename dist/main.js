!function(){"use strict";!function(){let e=null;async function t(t,a){const n={Authorization:`Bearer ${e}`,"Content-Type":"application/json"},o={context_uri:`spotify:${a}:${t}`};try{console.log("Attempting to play",o.context_uri);const e=await fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:n,body:JSON.stringify(o)});if(!e.ok){const t=await e.json();throw console.error("Play response:",t),new Error(`Unable to play ${a}: ${e.statusText}`)}console.log(`Successfully started playing ${a} with ID: ${t}`)}catch(e){console.error("Error in web player:",e),function(e){console.error("Web Playback SDK error:",e),e.message.includes("Playback cannot be started from this context")?alert("Cannot play this item. Please choose another."):alert("Playback error. Please try again later.")}(e)}const s=Array.from(document.getElementById("searchResults").children).find((e=>e.dataset.id===t));s&&(document.getElementById("currentImage").src=s.dataset.image,document.getElementById("currentTitle").textContent=s.dataset.name)}let a,n,o=new Promise((e=>{window.onSpotifyWebPlaybackSDKReady=()=>{e()}})),s=null;async function i(){try{const e=await fetch(`https://podify-backend.onrender.com/refresh_token?refresh_token=${localStorage.getItem("refresh_token")}`),t=await e.json();s=t.access_token,localStorage.setItem("access_token",s)}catch(e){console.error("Error refreshing token:",e)}}function r(e){const t=document.getElementById("searchResults");t.innerHTML="";const a=e.filter((e=>"episode"===e.type)),n=e.filter((e=>"track"===e.type)),o=e.filter((e=>"artist"===e.type)),s=e.filter((e=>"show"===e.type));if(o.length>0){const e=document.createElement("h2");e.textContent="Geniuses",t.appendChild(e),o.forEach((e=>c(e,t)))}if(s.length>0){const e=document.createElement("h2");e.textContent="Moguls",t.appendChild(e),s.forEach((e=>c(e,t)))}if(a.length>0){const e=document.createElement("h2");e.textContent="Pods",t.appendChild(e),a.forEach((e=>c(e,t)))}if(n.length>0){const e=document.createElement("h2");e.textContent="Bangers",t.appendChild(e),n.forEach((e=>c(e,t)))}}function c(e,t){const a=document.createElement("div");a.className="resultItem",a.dataset.id=e.id,a.dataset.type=e.type,a.dataset.name=e.name,a.dataset.image=e.image,a.innerHTML=`<img src="${e.image}" alt="${e.name}"/> ${e.name}`,a.addEventListener("click",l),t.appendChild(a)}async function l(e){const a=e.currentTarget.dataset.type,n=e.currentTarget.dataset.id;"artist"===a?await async function(e){const t=`https://api.spotify.com/v1/artists/${e}/top-tracks?market=US`,a={Authorization:`Bearer ${s}`,"Content-Type":"application/json"};try{let e=await fetch(t,{headers:a});401===e.status&&(await i(),e=await fetch(t,{headers:a}));r((await e.json()).tracks.map((e=>({type:"track",id:e.id,name:e.name,image:e.album.images[0].url}))))}catch(e){console.error("Error getting artist top tracks:",e)}}(n):"show"===a?await async function(e){const t=`https://api.spotify.com/v1/shows/${e}/episodes?market=US&limit=10`,a={Authorization:`Bearer ${s}`,"Content-Type":"application/json"};try{let e=await fetch(t,{headers:a});401===e.status&&(await i(),e=await fetch(t,{headers:a}));r((await e.json()).items.map((e=>({type:"episode",id:e.id,name:e.name,image:e.images[0].url}))))}catch(e){console.error("Error getting show episodes:",e)}}(n):"track"!==a&&"episode"!==a||t(n,a)}let d=!1;function p(){d?n.pause().then((()=>{console.log("Paused Playback"),d=!1,document.getElementById("playPause").textContent="▶️"})):n.resume().then((()=>{console.log("Resumed Playback"),d=!0,document.getElementById("playPause").textContent="⏸️"}))}function m(){n.seek(n.getCurrentState().position-15e3)}function u(){n.seek(n.getCurrentState().position+15e3)}window.addEventListener("load",(()=>{const n=window.location.hash.substring(1),c=new URLSearchParams(n);if(c.has("access_token")){document.getElementById("loginButton").style.display="none",a=c.get("access_token");const n=c.get("token_type"),l=c.get("expires_in");document.getElementById("search-container").style.display="block",console.log({access_token:a,token_type:n,expires_in:l}),fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{var t;t=e.display_name,document.getElementById("username").textContent=t})).catch((e=>{console.error("Error fetching user profile:",e)})),function(e){s=e;const t=document.getElementById("searchInput"),a=document.getElementById("searchResults");let n;t.addEventListener("input",(e=>{e.target.value?a.style.border="1px solid #ccc":a.style.border="none",clearTimeout(n),n=setTimeout((()=>{!async function(e){const t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e)}&type=artist,show,episode,track&limit=5`,a={Authorization:`Bearer ${s}`,"Content-Type":"application/json"};try{let e=await fetch(t,{headers:a});401===e.status&&(await i(),e=await fetch(t,{headers:a}));const n=await e.json();let o=[],s=[],c=[],l=[];n.tracks&&n.tracks.items&&(o=n.tracks.items.map((e=>({type:"track",id:e.id,name:e.name,image:e.album.images[0].url,popularity:e.popularity})))),n.artists&&n.artists.items&&(s=n.artists.items.map((e=>({type:"artist",id:e.id,name:e.name,image:e.images[0]?e.images[0].url:null,popularity:e.popularity})))),n.episodes&&n.episodes.items&&(c=n.episodes.items.map((e=>({type:"episode",id:e.id,name:e.name,image:e.images[0].url})))),n.shows&&n.shows.items&&l.push(...n.shows.items.map((e=>({type:"show",id:e.id,name:e.name,image:e.images[0]?.url||""})))),n.artists&&n.artists.items&&s.push(...n.artists.items.map((e=>({type:"artist",id:e.id,name:e.name,image:e.images[0]?.url||""})))),o.sort(((e,t)=>t.popularity-e.popularity)),s.sort(((e,t)=>t.popularity-e.popularity));const d=[...l,...o,...s,...c];return r(d),d}catch(e){return console.error("Error searching Spotify:",e),[]}}(e.target.value)}),500)}))}(a),async function(){return await o,window.Spotify?.Player?.isSupported()??!1}()?function(a){e=a,document.getElementById("searchResults").addEventListener("click",(e=>{e.target.classList.contains("resultItem")&&t(e.target.dataset.id,e.target.dataset.type)}))}(a):alert("Device not suitable for playback")}})),window.onSpotifyWebPlaybackSDKReady=()=>{n=new Spotify.Player({name:"Your Web Player Name",getOAuthToken:e=>{e(a)}}),n.addListener("player_state_changed",(e=>{console.log(e),d=!e.paused,document.getElementById("playPause").textContent=d?"⏸️":"▶️"})),n.addListener("ready",(e=>{let{device_id:t}=e;console.log("Ready with Device ID",t),fetch("https://api.spotify.com/v1/me/player",{method:"PUT",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"},body:JSON.stringify({device_ids:[t],play:!0})}).then((e=>{e.ok||console.error("Error setting active device:",e.statusText)}))})),n.connect()},document.getElementById("webPlayer").style.display="block",function(){document.getElementById("loginButton").addEventListener("click",(()=>{window.location.href="https://podify-backend.onrender.com/login"}));const e=document.getElementById("searchInput"),t=document.getElementById("searchResults");e.addEventListener("input",(()=>{e.value.length>0?t.style.display="block":t.style.display="none"})),e.addEventListener("focus",(e=>{e.preventDefault()})),document.getElementById("playPause").addEventListener("click",p),document.getElementById("rewind").addEventListener("click",m),document.getElementById("fastForward").addEventListener("click",u)}()}()}();
//# sourceMappingURL=main.js.map