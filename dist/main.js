!function(){"use strict";!function(){let e=null,t=null;function n(t){e=t,document.getElementById("spotifyLogo").addEventListener("click",o),s()}function o(){if(t){const e=`https://open.spotify.com/${t.split(":").slice(1).join("/")}`;window.open(e,"_blank")}else console.error("No track is currently being played.")}async function a(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:3;for(let o=0;o<n;o++)try{const a=await fetch(e,t);if(a.ok)return a;if(o===n-1)throw new Error("Max retries reached")}catch(e){console.error(`Attempt ${o+1} failed. Retrying...`),await new Promise((e=>setTimeout(e,2e3)))}}async function s(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:3;const o={Authorization:`Bearer ${e}`,"Content-Type":"application/json"};if(n<=0)console.warn("Max retries reached. Unable to fetch currently playing track.");else try{const e=await a("https://api.spotify.com/v1/me/player/currently-playing",{headers:o});if(e.ok){const o=await e.text();if(o)try{!function(e){if(e&&e.item){const n=e.item;t=n.uri,document.getElementById("currentImage").src=n.album.images[0].url,document.getElementById("currentTitle").textContent=n.name}else console.warn("No track is currently being played.")}(JSON.parse(o))}catch(e){throw console.error("Failed to parse JSON. Response text:",o),e}else console.warn("No track is currently playing or the response is empty. Retrying..."),setTimeout((()=>s(n-1)),2e3)}else{const t=await e.text();console.error("Error response:",t)}}catch(e){console.error("Error fetching current playing:",e)}}let r,i,c,l=new Promise((e=>{window.onSpotifyWebPlaybackSDKReady=()=>{e()}})),d=null;async function m(){try{const e=await fetch(`https://podify-backend.onrender.com/refresh_token?refresh_token=${localStorage.getItem("refresh_token")}`),t=await e.json();d=t.access_token,localStorage.setItem("access_token",d)}catch(e){console.error("Error refreshing token:",e)}}function p(e){const t=document.getElementById("searchResults");t.innerHTML="";const n=e.filter((e=>"episode"===e.type)),o=e.filter((e=>"track"===e.type)),a=e.filter((e=>"artist"===e.type)),s=e.filter((e=>"show"===e.type));if(a.length>0){const e=document.createElement("h2");e.textContent="Geniuses",t.appendChild(e),a.forEach((e=>u(e,t)))}if(s.length>0){const e=document.createElement("h2");e.textContent="Moguls",t.appendChild(e),s.forEach((e=>u(e,t)))}if(n.length>0){const e=document.createElement("h2");e.textContent="Pods",t.appendChild(e),n.forEach((e=>u(e,t)))}if(o.length>0){const e=document.createElement("h2");e.textContent="Bangers",t.appendChild(e),o.forEach((e=>u(e,t)))}}function u(e,t){const n=document.createElement("div");n.className="resultItem",n.dataset.id=e.id,n.dataset.type=e.type,n.dataset.name=e.name,n.dataset.image=e.image,n.innerHTML=`<img src="${e.image}" alt="${e.name}"/> ${e.name}`,n.addEventListener("click",y),t.appendChild(n)}async function y(n){const o=n.currentTarget.dataset.type,s=n.currentTarget.dataset.id;"artist"===o?await async function(e){const t=`https://api.spotify.com/v1/artists/${e}/top-tracks?market=US`,n={Authorization:`Bearer ${d}`,"Content-Type":"application/json"};try{let e=await fetch(t,{headers:n});401===e.status&&(await m(),e=await fetch(t,{headers:n}));p((await e.json()).tracks.map((e=>({type:"track",id:e.id,name:e.name,image:e.album.images[0].url}))))}catch(e){console.error("Error getting artist top tracks:",e)}}(s):"show"===o?await async function(e){const t=`https://api.spotify.com/v1/shows/${e}/episodes?market=US&limit=10`,n={Authorization:`Bearer ${d}`,"Content-Type":"application/json"};try{let e=await fetch(t,{headers:n});401===e.status&&(await m(),e=await fetch(t,{headers:n}));p((await e.json()).items.map((e=>({type:"episode",id:e.id,name:e.name,image:e.images[0].url}))))}catch(e){console.error("Error getting show episodes:",e)}}(s):"track"!==o&&"episode"!==o||async function(n,o){const s={Authorization:`Bearer ${e}`,"Content-Type":"application/json"};let r;"track"===o||"episode"===o?(t=`spotify:${o}:${n}`,r={uris:[t]}):(t=`spotify:${o}:${n}`,r={context_uri:t});try{console.log("Attempting to play",r);const e=await a("https://api.spotify.com/v1/me/player/play",{method:"PUT",headers:s,body:JSON.stringify(r)});if(!e.ok){const t=await e.json();throw console.error("Play response:",t),new Error(`Unable to play ${o}: ${e.statusText}`)}console.log(`Successfully started playing ${o} with ID: ${n}`)}catch(e){console.error("Error in web player:",e),function(e){console.error("Web Playback SDK error:",e),e.message.includes("Max retries reached")?alert("There seems to be a connection issue with Spotify. Please try again in a few moments."):e.message.includes("Playback cannot be started from this context")?alert("Cannot play this item. Please choose another."):alert("Playback error. Please try again later.")}(e)}const i=Array.from(document.getElementById("searchResults").children).find((e=>e.dataset.id===n));i&&(document.getElementById("currentImage").src=i.dataset.image,document.getElementById("currentTitle").textContent=i.dataset.name)}(s,o)}let h=!1;function g(){h?c.pause().then((()=>{console.log("Paused Playback"),h=!1,document.getElementById("playPause").textContent="▶️",clearInterval(r)})):c.resume().then((()=>{console.log("Resumed Playback"),h=!0,document.getElementById("playPause").textContent="⏸️",r=setInterval(E,1e3)}))}function f(){c.getCurrentState().then((e=>{if(e){const t=Math.max(e.position-15e3,0);c.seek(t).then((()=>{console.log("Rewound 15 seconds!")}))}}))}function w(){c.getCurrentState().then((e=>{if(e){const t=e.position+15e3;c.seek(t).then((()=>{console.log("Fast-forwarded 15 seconds!")}))}}))}function k(e){const t=Math.floor(e/1e3),n=t%60;return`${Math.floor(t/60)}:${n<10?"0":""}${n}`}function E(){c.getCurrentState().then((e=>{if(e){const t=e.position;document.getElementById("seekBar").value=t,document.getElementById("currentTime").textContent=k(t)}}))}window.addEventListener("load",(()=>{const e=window.location.hash.substring(1),t=new URLSearchParams(e);if(t.has("access_token")){document.getElementById("loginButton").style.display="none",i=t.get("access_token");const e=t.get("token_type"),o=t.get("expires_in");document.getElementById("search-container").style.display="block",console.log({access_token:i,token_type:e,expires_in:o}),fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"}}).then((e=>e.json())).then((e=>{var t;t=e.display_name,document.getElementById("username").textContent=t})).catch((e=>{console.error("Error fetching user profile:",e)})),function(e){d=e;const t=document.getElementById("searchInput"),n=document.getElementById("searchResults");let o;t.style.display="block",t.addEventListener("input",(e=>{e.target.value?n.style.border="1px solid #ccc":n.style.border="none",clearTimeout(o),o=setTimeout((()=>{!async function(e){const t=`https://api.spotify.com/v1/search?q=${encodeURIComponent(e)}&type=artist,show,episode,track&limit=5`,n={Authorization:`Bearer ${d}`,"Content-Type":"application/json"};try{let e=await fetch(t,{headers:n});401===e.status&&(await m(),e=await fetch(t,{headers:n}));const o=await e.json();let a=[],s=[],r=[],i=[];o.tracks&&o.tracks.items&&(a=o.tracks.items.map((e=>({type:"track",id:e.id,name:e.name,image:e.album.images[0].url,popularity:e.popularity})))),o.artists&&o.artists.items&&(s=o.artists.items.map((e=>({type:"artist",id:e.id,name:e.name,image:e.images[0]?e.images[0].url:null,popularity:e.popularity})))),o.episodes&&o.episodes.items&&(r=o.episodes.items.map((e=>({type:"episode",id:e.id,name:e.name,image:e.images[0].url})))),o.shows&&o.shows.items&&i.push(...o.shows.items.map((e=>({type:"show",id:e.id,name:e.name,image:e.images[0]?.url||""})))),o.artists&&o.artists.items&&s.push(...o.artists.items.map((e=>({type:"artist",id:e.id,name:e.name,image:e.images[0]?.url||""})))),a.sort(((e,t)=>t.popularity-e.popularity)),s.sort(((e,t)=>t.popularity-e.popularity));const c=[...i,...a,...s,...r];return p(c),c}catch(e){return console.error("Error searching Spotify:",e),[]}}(e.target.value)}),500)}))}(i),async function(){return await l,window.Spotify?.Player?.isSupported()??!1}()?n(i):alert("Device not suitable for playback"),document.getElementById("currentImage").style.display="block",document.getElementById("spotifyLogo").style.display="block",document.getElementById("webPlayer").style.display="flex",document.querySelector(".playerControls").style.display="flex",document.querySelector(".playerControls button").style.display="flex",document.getElementById("seekBarContainer").style.display="flex",document.getElementById("currentTime").style.display="block",document.getElementById("totalTime").style.display="block"}})),window.onSpotifyWebPlaybackSDKReady=()=>{c=new Spotify.Player({name:"Your Web Player Name",getOAuthToken:e=>{e(i)}}),c.addListener("player_state_changed",(e=>{if(console.log(e),e){const t=e.track_window.current_track.duration_ms,n=e.position;document.getElementById("seekBar").max=t,document.getElementById("seekBar").value=n,document.getElementById("currentTime").textContent=k(n),document.getElementById("totalTime").textContent=k(t)}h=!e.paused,document.getElementById("playPause").textContent=h?"⏸️":"▶️"})),c.addListener("ready",(e=>{let{device_id:t}=e;console.log("Ready with Device ID",t),r=setInterval(E,1e3),fetch("https://api.spotify.com/v1/me/player",{method:"PUT",headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify({device_ids:[t],play:!0})}).then((e=>{e.ok||console.error("Error setting active device:",e.statusText)}))})),c.connect()},document.getElementById("webPlayer").style.display="block",document.getElementById("seekBar").addEventListener("input",(e=>{const t=e.target.value;c.seek(t).then((()=>{console.log(`Moved to ${t} ms`)}))})),document.getElementById("currentTime").textContent=k(0),document.getElementById("totalTime").textContent=k(0),document.addEventListener("DOMContentLoaded",(function(){const e=new URLSearchParams(window.location.hash.substring(1)).get("access_token");e&&function(e){return new Promise(((t,n)=>{fetch("https://api.spotify.com/v1/me",{headers:{Authorization:"Bearer "+e}}).then((e=>e.json())).then((e=>{t(e)})).catch((e=>{n(e)}))}))}(e).then((t=>{"premium"!==t.product?(alert("Please upgrade to premium to use this app."),window.location.href="https://www.spotify.com"):n(e)})).catch((e=>{console.error("Error fetching user profile:",e),alert("There was an error fetching your Spotify profile.")}))})),function(){document.getElementById("loginButton").addEventListener("click",(()=>{window.location.href="https://podify-backend.onrender.com/login"}));const e=document.getElementById("searchInput"),t=document.getElementById("searchResults");e.addEventListener("input",(()=>{e.value.length>0?t.style.display="block":t.style.display="none"})),e.addEventListener("focus",(e=>{e.preventDefault()})),document.getElementById("playPause").addEventListener("click",g),document.getElementById("rewind").addEventListener("click",f),document.getElementById("fastForward").addEventListener("click",w)}()}()}();
//# sourceMappingURL=main.js.map