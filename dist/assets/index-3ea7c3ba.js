(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))m(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&m(s)}).observe(document,{childList:!0,subtree:!0});function d(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function m(t){if(t.ep)return;t.ep=!0;const n=d(t);fetch(t.href,n)}})();const g=()=>{const o=document.querySelector(".hamburger"),r=document.querySelector("#nav-menu");o.addEventListener("click",()=>{o.classList.toggle("active"),r.classList.toggle("active")})},C=()=>{const o="785b8de1d01961c956e950a339e714ff",r=document.querySelector("#app"),d=document.getElementById("text-input"),m=async n=>{const s=`https://api.openweathermap.org/data/2.5/weather?q=${n}&appid=${o}&units=metric`;try{const e=await(await fetch(s)).json();return{city:e.name,country:e.sys.country,temperature:e.main.temp,description:e.weather[0].main,humidity:e.main.humidity,temp_min:e.main.temp_min,temp_max:e.main.temp_max}}catch(a){throw console.error("Erreur lors de la requête à l'API OpenWeather : "+a),a}},t=async()=>{const s=d.value.split(",").map(e=>m(e.trim())),a=await Promise.all(s);r.innerHTML="",a.forEach(e=>{const i=document.createElement("div");i.classList.add("card");const p=document.createElement("h2");p.classList.add("city"),p.textContent=`${e.city}, ${e.country}`;const l=document.createElement("p");l.classList.add("temperature"),l.textContent=`${e.temperature} °C`;const c=document.createElement("img");c.classList.add("weatherIcon");const u=document.createElement("p");u.classList.add("description"),u.textContent=`${e.description}`;const y=document.createElement("p");y.classList.add("humidity"),y.textContent=`Humidity: ${e.humidity}%`;const h=document.createElement("p");h.classList.add("temp_min"),h.textContent=`Min: ${e.temp_min} °C`;const f=document.createElement("p");f.classList.add("temp_max"),f.textContent=`Max: ${e.temp_max} °C`,e.description==="Clouds"?c.src="./public/img/icon/cloudy.svg":e.description==="Clear"?c.src="./public/img/icon/day.svg":e.description==="Rain"?c.src="./public/img/icon/rainy-1.svg":e.description==="Snow"?c.src="./public/img/icon/snowy-1.svg":e.description==="Thunderstorm"?c.src="./public/img/icon/thunder.svg":e.description==="Drizzle"&&(c.src="./public/img/icon/rainy-4.svg"),i.appendChild(p),i.appendChild(c),i.appendChild(u),i.appendChild(l),i.appendChild(y),i.appendChild(h),i.appendChild(f),r.appendChild(i)})};d.addEventListener("keyup",async function(n){n.key==="Enter"&&await t()})};C();g();