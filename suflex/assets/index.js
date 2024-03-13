(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(e){if(e.ep)return;e.ep=!0;const l=s(e);fetch(e.href,l)}})();let c=t=>document.querySelector(t),i,n=1,d=!1;function p(t){i&&i.pause(),i=c("audio"),i.src=t,i.playbackRate=n,i.preservesPitch=d,i.play()}function u(){let t=c("#slider"),r=c("#pitch-toggle");c("#file").onchange=o=>{const e=o.target.files[0];e&&(document.title=`suflex: ${e.name}`,p(URL.createObjectURL(e)))},r.onchange=()=>{d=r.checked,i&&(i.preservesPitch=r.checked)},t.value=1;function s(){n=t.value,c("#speedLabel").innerText=parseFloat(t.value).toFixed(2),i&&(i.preservesPitch=r.checked,i.playbackRate=t.value)}t.onchange=s,c("#speedLabel").onclick=()=>{t.value=1,s()}}const f=t=>t;document.querySelector("body").innerHTML=f`<div class="app">
<h1 class="title">suflex <span style="font-size: 15px">beta</span></h1>
<div class="editor">
  <div class="cat-in">
    <input type="file" id="file" accept="audio/*"><br>
    <audio controls></audio>
  </div>
  <div class="cat-in">
    <label id="speedReset" for="slider" title="click here to reset speed">speed:</label>
    <input type="range" id="slider" min="0.2" max="2.5" step="0.01" />
    <label id="speedLabel">1.00</label><br>

    <label for="pitch-toggle">keep pitch?</label>
    <input type="checkbox" id="pitch-toggle" />
  </div>
</div>
</div>`;u();
