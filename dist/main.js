!function(){"use strict";!function(){let e=null;let t=null;let n,a,s=new Promise((e=>{window.onSpotifyWebPlaybackSDKReady=()=>{e()}})),o=!1;function i(){o?a.pause().then((()=>{console.log("Paused Playback"),o=!1,document.getElementById("playPause").textContent="▶️"})):a.resume().then((()=>{console.log("Resumed Playback"),o=!0,document.getElementById("playPause").textContent="⏸️"}))}function r(){a.seek(a.getCurrentState().position-15e3)}function c(){a.seek(a.getCurrentState().position+15e3)}window.addEventListener("load",(()=>{const a=window.location.hash.substring(1),o=new URLSearchParams(a);if(o.has("access_token")){document.getElementById("loginButton").style.display="none",n=o.get("access_token");const a=o.get("token_type"),i=o.get("expires_in");document.getElementById("search-container").style.display="block",console.log({access_token:n,token_type:a,expires_in:i}),fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{var t;t=e.display_name,document.getElementById("username").textContent=t})).catch((e=>{console.error("Error fetching user profile:",e)})),function(t){e=t;const n=document.getElementById("searchInput"),a=document.getElementById("searchResults");let s;n.addEventListener("input",(t=>{t.target.value?a.style.border="1px solid #ccc":a.style.border="none",clearTimeout(s),s=setTimeout((()=>{!async function(t){const n=`https://api.spotify.com/v1/search?q=${encodeURIComponent(t)}&type=album,artist,track,show,episode&limit=5`,a={Authorization:`Bearer ${e}`,"Content-Type":"application/json"};try{let e=await fetch(n,{headers:a});401===e.status&&(await async function(){}(),e=await fetch(n,{headers:a}));const t=await e.json(),s=[];return t.tracks&&t.tracks.items&&s.push(...t.tracks.items.map((e=>({type:"track",id:e.id,name:e.artists[0].name?`${e.artists[0].name} - ${e.name}`:e.name,image:e.album.images[0].url})))),t.episodes&&t.episodes.items&&s.push(...t.episodes.items.map((e=>({type:"episode",id:e.id,name:e.show?`${e.show.name} - ${e.name}`:e.name,image:e.images[0].url})))),t.artists&&t.artists.items&&s.push(...t.artists.items.map((e=>({type:"artist",id:e.id,name:e.name,image:e.images[0]?e.images[0].url:null})))),t.albums&&t.albums.items&&s.push(...t.albums.items.map((e=>({type:"album",id:e.id,name:e.name,image:e.images[0].url})))),t.shows&&t.shows.items&&s.push(...t.shows.items.map((e=>({type:"show",id:e.id,name:e.name,image:e.images[0].url})))),function(e){const t=document.getElementById("searchResults");t.innerHTML="",e.forEach((e=>{const n=document.createElement("div");n.className="resultItem",n.dataset.id=e.id,n.dataset.type=e.type,n.dataset.name=e.name,n.dataset.image=e.image,n.innerHTML=`<img src="${e.image}" alt="${e.name}"/> ${e.name}`,t.appendChild(n)}))}(s),s}catch(e){return console.error("Error searching Spotify:",e),[]}}(t.target.value)}),500)}))}(n),async function(){return await s,window.Spotify?.Player?.isSupported()??!1}()?function(e){t=e,document.getElementById("searchResults").addEventListener("click",(e=>{e.target.classList.contains("resultItem")&&async function(e,n){const a={Authorization:`Bearer ${t}`,"Content-Type":"application/json"},s={context_uri:`spotify:${n}:${e}`};try{console.log("Attempting to play",s.context_uri);const t=await fetch("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:a,body:JSON.stringify(s)});if(!t.ok){const e=await t.json();throw console.error("Play response:",e),new Error(`Unable to play ${n}: ${t.statusText}`)}console.log(`Successfully started playing ${n} with ID: ${e}`)}catch(e){console.error("Error in web player:",e),function(e){console.error("Web Playback SDK error:",e),e.message.includes("Playback cannot be started from this context")?alert("Cannot play this item. Please choose another."):alert("Playback error. Please try again later.")}(e)}const o=Array.from(document.getElementById("searchResults").children).find((t=>t.dataset.id===e));o&&(document.getElementById("currentImage").src=o.dataset.image,document.getElementById("currentTitle").textContent=o.dataset.name)}(e.target.dataset.id,e.target.dataset.type)}))}(n):alert("Device not suitable for playback")}})),window.onSpotifyWebPlaybackSDKReady=()=>{a=new Spotify.Player({name:"Your Web Player Name",getOAuthToken:e=>{e(n)}}),a.addListener("player_state_changed",(e=>{console.log(e),o=!e.paused,document.getElementById("playPause").textContent=o?"⏸️":"▶️"})),a.addListener("ready",(e=>{let{device_id:t}=e;console.log("Ready with Device ID",t),fetch("https://api.spotify.com/v1/me/player",{method:"PUT",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({device_ids:[t],play:!0})}).then((e=>{e.ok||console.error("Error setting active device:",e.statusText)}))})),a.connect()},document.getElementById("webPlayer").style.display="block",function(){document.getElementById("loginButton").addEventListener("click",(()=>{window.location.href="https://podify-backend.onrender.com/login"}));const e=document.getElementById("searchInput"),t=document.getElementById("searchResults");e.addEventListener("input",(()=>{e.value.length>0?t.style.display="block":t.style.display="none"})),e.addEventListener("focus",(e=>{e.preventDefault()})),document.getElementById("playPause").addEventListener("click",i),document.getElementById("rewind").addEventListener("click",r),document.getElementById("fastForward").addEventListener("click",c)}()}()}();
//# sourceMappingURL=main.js.map