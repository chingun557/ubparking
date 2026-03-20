"use client"

import { useState, useEffect } from "react"

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;font-size:16px}
body{font-family:'DM Sans',sans-serif;background:#080B10;color:#fff;overflow-x:hidden;min-height:100vh}
a{text-decoration:none;color:inherit}
button{cursor:pointer;font-family:'DM Sans',sans-serif}
ul{list-style:none;padding:0}

:root{
  --yellow:#F5C400;
  --yellow2:#FFD740;
  --bg:#080B10;
  --bg2:#0E1420;
  --bg3:#131926;
  --border:rgba(255,255,255,0.07);
  --dim:rgba(255,255,255,0.55);
  --dim2:rgba(255,255,255,0.3);
}

::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--yellow);border-radius:2px}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:200;height:68px;display:flex;align-items:center;padding:0 40px;background:rgba(8,11,16,0.85);backdrop-filter:blur(24px);border-bottom:1px solid var(--border)}
.nav-inner{max-width:1280px;margin:0 auto;width:100%;display:flex;align-items:center}
.logo{display:flex;align-items:center;gap:10px;flex-shrink:0}
.logo-icon{width:36px;height:36px;border-radius:10px;background:var(--yellow);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:18px;color:#080B10}
.logo-text{font-family:'Syne',sans-serif;font-weight:800;font-size:20px;letter-spacing:-0.5px}
.logo-text span{color:var(--yellow)}
.nav-links{display:flex;gap:32px;align-items:center;margin:0 auto;padding:0 32px}
.nav-link{font-size:14px;font-weight:500;color:var(--dim);transition:color .2s;white-space:nowrap;background:none;border:none;cursor:pointer}
.nav-link:hover{color:#fff}
.nav-btns{display:flex;gap:8px;flex-shrink:0}
.btn-ghost{padding:9px 22px;border-radius:8px;font-size:13px;font-weight:600;background:transparent;color:rgba(255,255,255,0.75);border:1px solid var(--border);transition:all .2s}
.btn-ghost:hover{border-color:rgba(255,255,255,0.25);color:#fff}
.btn-cta{padding:9px 22px;border-radius:8px;font-size:13px;font-weight:700;background:var(--yellow);color:#080B10;border:none;transition:all .2s}
.btn-cta:hover{background:var(--yellow2);transform:translateY(-1px)}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 24px 60px;position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 900px 600px at 50% -100px,rgba(245,196,0,0.06) 0%,transparent 70%),radial-gradient(ellipse 600px 400px at 20% 80%,rgba(26,110,245,0.04) 0%,transparent 60%)}
.hero-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px);background-size:60px 60px;mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,black 0%,transparent 100%)}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 16px 6px 8px;border-radius:100px;background:rgba(245,196,0,0.1);border:1px solid rgba(245,196,0,0.25);font-size:12px;font-weight:600;color:var(--yellow);margin-bottom:28px;letter-spacing:.04em}
.hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--yellow);animation:pulse 2s ease infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.3)}}
.hero-h1{font-family:'Syne',sans-serif;font-size:clamp(48px,7vw,88px);font-weight:800;line-height:1.02;letter-spacing:-2px;margin-bottom:24px}
.hero-h1 span{color:var(--yellow)}
.hero-p{font-size:17px;color:var(--dim);max-width:560px;line-height:1.8;margin-bottom:44px}
.hero-actions{display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap}
.btn-hero{padding:16px 40px;border-radius:10px;font-size:15px;font-weight:700;background:var(--yellow);color:#080B10;border:none;transition:all .25s}
.btn-hero:hover:not(:disabled){background:var(--yellow2);transform:translateY(-2px);box-shadow:0 16px 40px rgba(245,196,0,0.25)}
.btn-hero:disabled{opacity:.7;cursor:not-allowed}
.btn-hero-outline{padding:16px 32px;border-radius:10px;font-size:15px;font-weight:600;background:transparent;color:rgba(255,255,255,0.8);border:1px solid var(--border);transition:all .25s}
.btn-hero-outline:hover{border-color:rgba(255,255,255,0.3);color:#fff}

/* MOCKUP */
.mockup-wrap{margin-top:72px;width:100%;max-width:1000px;position:relative;animation:float 4s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.mockup-glow{position:absolute;bottom:-60px;left:50%;transform:translateX(-50%);width:600px;height:200px;background:radial-gradient(ellipse,rgba(245,196,0,0.12) 0%,transparent 70%);pointer-events:none;filter:blur(30px)}
.mockup{border-radius:16px;overflow:hidden;background:var(--bg2);border:1px solid rgba(255,255,255,0.1);box-shadow:0 48px 120px rgba(0,0,0,0.7),0 0 0 1px rgba(255,255,255,0.04)}
.m-titlebar{background:#0C1018;padding:14px 20px;display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--border)}
.m-dots{display:flex;gap:6px}
.m-dot{width:10px;height:10px;border-radius:50%}
.m-url{flex:1;height:28px;background:rgba(255,255,255,0.04);border-radius:6px;display:flex;align-items:center;padding:0 12px;gap:8px;font-size:12px;color:var(--dim2)}
.m-body{display:grid;grid-template-columns:48px 220px 1fr;min-height:420px}
.m-sidebar{background:#090D14;border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 0}
.m-si{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--dim2);transition:all .2s;cursor:pointer;margin:2px 0;background:none;border:none}
.m-si:hover{background:rgba(245,196,0,0.15);color:var(--yellow)}
.m-si.on{background:var(--yellow);color:#080B10}
.m-list{border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden}
.m-list-hdr{padding:12px 14px;border-bottom:1px solid var(--border);font-size:11px;font-weight:700;color:var(--dim2);letter-spacing:.08em;display:flex;justify-content:space-between;align-items:center}
.m-list-count{background:rgba(245,196,0,0.15);color:var(--yellow);padding:2px 7px;border-radius:4px;font-size:10px}
.m-row{padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.04);display:flex;align-items:center;gap:10px;cursor:pointer;transition:background .15s;border-left:2px solid transparent}
.m-row:hover{background:rgba(255,255,255,0.03)}
.m-row.sel{background:rgba(255,255,255,0.03);border-left-color:var(--yellow)}
.m-plate{font-size:12px;font-weight:700;letter-spacing:1.5px;color:#fff}
.m-sub{font-size:10px;color:var(--dim2);margin-top:2px}
.m-badge{padding:2px 6px;border-radius:4px;font-size:9px;font-weight:700;letter-spacing:.05em}
.m-badge.vip{background:rgba(245,196,0,0.15);color:var(--yellow)}
.m-badge.new{background:rgba(34,197,94,0.15);color:#22c55e}
.m-main{padding:20px;display:flex;flex-direction:column;gap:14px}
.m-main-hdr{display:flex;justify-content:space-between;align-items:flex-start}
.m-plate-big{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;letter-spacing:4px;color:#fff;background:rgba(255,255,255,0.05);border:1px solid var(--border);border-radius:8px;padding:8px 16px;display:inline-block}
.m-tag{font-size:10px;font-weight:700;color:var(--dim2);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px}
.m-stat-row{display:flex;gap:10px}
.m-stat{flex:1;background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:8px;padding:10px 12px}
.m-stat-val{font-family:'Syne',sans-serif;font-size:16px;font-weight:700;color:#fff}
.m-stat-lab{font-size:10px;color:var(--dim2);margin-top:2px}
.m-pay-row{display:flex;gap:8px}
.m-pay-btn{flex:1;padding:8px;border-radius:7px;font-size:11px;font-weight:600;border:1px solid var(--border);background:rgba(255,255,255,0.04);color:var(--dim2);cursor:pointer;transition:all .15s}
.m-pay-btn.on{border-color:var(--yellow);color:var(--yellow);background:rgba(245,196,0,0.08)}
.m-total{background:rgba(245,196,0,0.06);border:1px solid rgba(245,196,0,0.2);border-radius:8px;padding:12px 14px;display:flex;justify-content:space-between;align-items:center}
.m-total-lab{font-size:12px;color:var(--dim2)}
.m-total-val{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:var(--yellow)}
.m-finish{width:100%;padding:11px;border-radius:8px;background:var(--yellow);color:#080B10;border:none;font-weight:700;font-size:13px;cursor:pointer;transition:all .2s}
.m-finish.done{background:#22c55e;color:#fff}

/* STATS BAR */
.stats-bar{padding:0 24px;background:var(--bg)}
.stats-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
.stat-item{padding:40px 32px;border-right:1px solid var(--border)}
.stat-item:last-child{border-right:none}
.stat-num{font-family:'Syne',sans-serif;font-size:clamp(36px,4vw,52px);font-weight:800;color:var(--yellow);line-height:1}
.stat-sub{font-size:14px;color:var(--dim);margin-top:6px}

/* SECTIONS */
.sec{padding:120px 24px}
.sec-inner{max-width:1280px;margin:0 auto}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;color:var(--yellow);letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}
.eyebrow::before{content:"";width:24px;height:1px;background:var(--yellow)}
.sec-title{font-family:'Syne',sans-serif;font-size:clamp(30px,4vw,52px);font-weight:800;letter-spacing:-1px;line-height:1.08;margin-bottom:56px}

/* FEATURE ROWS */
.feat-row{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;margin-bottom:100px}
.feat-row:last-child{margin-bottom:0}
.feat-row.r{direction:rtl}
.feat-row.r>*{direction:ltr}
.feat-tag{display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:6px;background:rgba(255,255,255,0.05);border:1px solid var(--border);font-size:12px;font-weight:600;color:var(--dim);margin-bottom:16px;letter-spacing:.03em}
.feat-h{font-family:'Syne',sans-serif;font-size:clamp(22px,2.5vw,32px);font-weight:800;line-height:1.15;margin-bottom:14px;letter-spacing:-.5px}
.feat-p{font-size:15px;color:var(--dim);line-height:1.8;margin-bottom:20px}
.feat-list li{font-size:14px;color:var(--dim);line-height:1.85;margin-bottom:8px;display:flex;align-items:flex-start}
.feat-list li::before{content:"—";color:var(--yellow);margin-right:10px;font-weight:700;flex-shrink:0}
.feat-visual{border-radius:16px;background:var(--bg2);border:1px solid var(--border);overflow:hidden;min-height:260px;display:flex;align-items:center;justify-content:center}

/* PAYMENT GRID */
.pay-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:20px}
.pay-item{background:rgba(255,255,255,0.04);border:1px solid var(--border);border-radius:10px;padding:10px 12px;display:flex;align-items:center;gap:10px;transition:all .2s;cursor:pointer}
.pay-item:hover,.pay-item.flash{background:rgba(245,196,0,0.08);border-color:var(--yellow)}
.pay-ico{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.pay-name{font-size:11px;font-weight:600;color:rgba(255,255,255,0.8)}

/* VIP VISUAL */
.vip-vis{width:100%;padding:32px 24px;display:flex;flex-direction:column;align-items:center;gap:20px}
.vip-label{font-family:'Syne',sans-serif;font-size:11px;font-weight:800;letter-spacing:.2em;color:var(--yellow)}
.vip-cars{display:flex;align-items:flex-end;gap:10px;justify-content:center}
.vip-car{display:flex;flex-direction:column;align-items:center;gap:6px}
.vip-car-body{border-radius:10px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.04);border:1px solid var(--border)}
.vip-car-body.gold{border-color:rgba(245,196,0,0.4);background:rgba(245,196,0,0.06);box-shadow:0 0 30px rgba(245,196,0,0.1)}
.vip-chip{padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700}
.vip-chip.gold{background:rgba(245,196,0,0.2);color:var(--yellow);border:1px solid rgba(245,196,0,0.4)}
.vip-chip.gray{background:rgba(255,255,255,0.07);color:var(--dim2);border:1px solid var(--border)}
.vip-list{display:flex;flex-direction:column;gap:8px;width:100%;padding:0 12px}
.vip-list-item{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:8px;border:1px solid var(--border);font-size:11px}
.vip-list-plate{font-weight:700;letter-spacing:1.5px;color:#fff}
.vip-list-disc{color:var(--yellow);font-weight:700}

/* SETTINGS VISUAL */
.settings-vis{padding:24px;display:flex;flex-direction:column;gap:10px;width:100%}
.settings-row{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px}
.settings-label{font-size:12px;font-weight:500;color:rgba(255,255,255,0.7);display:flex;align-items:center;gap:8px}
.toggle{width:38px;height:22px;border-radius:11px;position:relative;cursor:pointer;flex-shrink:0;border:none;transition:background .2s}
.toggle.on{background:var(--yellow)}
.toggle.off{background:rgba(255,255,255,0.1)}
.toggle-knob{position:absolute;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left .2s}
.toggle.on .toggle-knob{left:19px}
.toggle.off .toggle-knob{left:3px}
.price-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.price-card{padding:12px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;text-align:center}
.price-label{font-size:10px;color:var(--dim2);margin-bottom:4px}
.price-val{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:var(--yellow)}

/* ENGINEER VISUAL */
.eng-vis{padding:24px;display:flex;flex-direction:column;gap:12px;width:100%}
.eng-card{display:flex;align-items:center;gap:14px;padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:10px;cursor:pointer;transition:background .15s}
.eng-card:hover{background:rgba(255,255,255,0.05)}
.eng-icon{width:40px;height:40px;border-radius:10px;background:rgba(245,196,0,0.1);border:1px solid rgba(245,196,0,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0}
.eng-title{font-size:13px;font-weight:600;color:#fff}
.eng-sub{font-size:11px;color:var(--dim2);margin-top:2px}
.eng-status{margin-left:auto;width:8px;height:8px;border-radius:50%;flex-shrink:0}
.eng-status.ok{background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,.5)}
.eng-status.warn{background:var(--yellow);box-shadow:0 0 8px rgba(245,196,0,.5)}

/* PHONE / APP VISUAL */
.app-vis{padding:24px;display:flex;gap:12px;align-items:flex-end;justify-content:center;width:100%}
.phone{border-radius:20px;border:1px solid rgba(255,255,255,0.12);background:#0C1018;overflow:hidden;display:flex;flex-direction:column}
.phone-bar{height:3px;border-radius:3px 3px 0 0}
.phone-body{padding:12px 10px;flex:1;display:flex;flex-direction:column;gap:6px}
.phone-hdr{font-size:9px;font-weight:700;color:var(--yellow);margin-bottom:4px;letter-spacing:.05em}
.phone-map{height:60px;border-radius:8px;background:linear-gradient(135deg,#0d1b2a 0%,#0a1520 100%);display:flex;align-items:center;justify-content:center;margin-bottom:2px}
.phone-map-dot{width:10px;height:10px;border-radius:50%;background:var(--yellow);box-shadow:0 0 12px rgba(245,196,0,0.6)}
.phone-slot{display:flex;justify-content:space-between;align-items:center;padding:5px 7px;background:rgba(255,255,255,0.04);border-radius:6px;font-size:9px}
.phone-slot-num{font-weight:700;letter-spacing:1px;color:#fff}
.status-free{color:#22c55e;font-weight:700}
.status-full{color:var(--dim2);font-weight:700}
.phone-pay{margin-top:4px;width:100%;padding:6px;border-radius:7px;font-size:9px;font-weight:700;text-align:center;border:none;cursor:pointer}

/* CUSTOMERS */
.cust-sec{padding:120px 24px;background:var(--bg)}
.stat-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:48px}
.stat-card{padding:28px 24px;border-radius:14px;background:var(--bg2);border:1px solid var(--border)}
.stat-card-num{font-family:'Syne',sans-serif;font-size:clamp(28px,3vw,42px);font-weight:800;color:var(--yellow);line-height:1}
.stat-card-text{font-size:14px;color:var(--dim);margin-top:8px;line-height:1.5}
.client-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.client-card{border-radius:14px;background:var(--bg2);border:1px solid var(--border);overflow:hidden;transition:all .25s;cursor:pointer}
.client-card:hover{border-color:rgba(245,196,0,0.3);transform:translateY(-3px)}
.client-card:active{transform:scale(0.96)}
.client-img{height:140px;display:flex;align-items:center;justify-content:center;background:var(--bg3);font-size:56px;border-bottom:1px solid var(--border)}
.client-name{padding:16px;font-family:'Syne',sans-serif;font-size:15px;font-weight:700;text-align:center}

/* LET'S TALK */
.talk-sec{padding:120px 24px;border-top:1px solid var(--border)}
.talk-inner{max-width:1280px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start}
.talk-big{font-family:'Syne',sans-serif;font-size:clamp(28px,4vw,54px);font-weight:800;line-height:1.1;letter-spacing:-1px;margin-bottom:20px}
.talk-big span{color:var(--yellow)}
.talk-desc{font-size:15px;color:var(--dim);line-height:1.8;max-width:440px}
.talk-block{padding:28px 0;border-bottom:1px solid var(--border)}
.talk-block:last-child{border-bottom:none;padding-bottom:0}
.talk-block-num{font-family:'Syne',sans-serif;font-size:11px;font-weight:800;color:var(--yellow);letter-spacing:.15em;margin-bottom:10px}
.talk-block-title{font-family:'Syne',sans-serif;font-size:clamp(16px,2vw,22px);font-weight:700;margin-bottom:8px;line-height:1.2}
.talk-block-desc{font-size:14px;color:var(--dim);line-height:1.7;margin-bottom:14px}
.talk-list li{font-size:14px;color:var(--dim);line-height:1.85;margin-bottom:6px;display:flex;align-items:flex-start}
.talk-list li::before{content:"—";color:var(--yellow);margin-right:10px;font-weight:700;flex-shrink:0}

/* CTA */
.cta-sec{padding:100px 24px;background:var(--bg)}
.cta-inner{max-width:700px;margin:0 auto;text-align:center}
.cta-h{font-family:'Syne',sans-serif;font-size:clamp(30px,4vw,52px);font-weight:800;letter-spacing:-1px;margin-bottom:16px}
.cta-p{font-size:16px;color:var(--dim);line-height:1.75;margin-bottom:36px}
.cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

/* FOOTER */
footer{border-top:1px solid var(--border);max-width:1280px;margin:0 auto;padding:60px 24px 40px;display:flex;justify-content:space-between;align-items:flex-start;gap:80px;position:relative;z-index:1}
.ft-left{flex:1}
.ft-right{flex:0 0 auto;text-align:right}
.logo{display:flex;align-items:center;gap:8px;margin-bottom:16px;font-family:'Syne',sans-serif;font-weight:800;font-size:18px;color:#fff}
.logo-mark{width:32px;height:32px;border-radius:8px}
.logo-name{letter-spacing:-0.5px}
.logo-name b{color:var(--yellow)}
.ft-tagline{font-size:13px;color:var(--dim);margin-bottom:24px}
.ft-contacts{display:flex;flex-direction:column;gap:12px;margin-bottom:32px}
.ft-contact{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--dim);text-decoration:none;transition:color .2s}
.ft-contact:hover{color:#fff}
.ft-contact-icon{width:16px;height:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--yellow)}
.ft-nav{display:flex;gap:24px;margin-top:24px}
.ft-nav a{font-size:13px;color:var(--dim);text-decoration:none;transition:color .2s}
.ft-nav a:hover{color:#fff}
.ft-app-label{font-size:12px;font-weight:700;color:var(--yellow);letter-spacing:.08em;text-transform:uppercase;margin-bottom:12px}
.ft-store-btns{display:flex;flex-direction:column;gap:8px}
.ft-store{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:8px;background:rgba(255,255,255,0.08);border:1px solid var(--border);font-size:12px;font-weight:600;color:rgba(255,255,255,0.8);text-decoration:none;transition:all .2s}
.ft-store:hover{background:rgba(255,255,255,0.12);border-color:rgba(255,255,255,0.15);color:#fff}

/* BACK TO TOP */
.backtop{position:fixed;bottom:28px;right:28px;z-index:99;width:44px;height:44px;border-radius:10px;background:var(--yellow);color:#080B10;border:none;font-size:16px;font-weight:700;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 24px rgba(245,196,0,0.3);cursor:pointer;transition:all .2s}
.backtop:hover{background:var(--yellow2);transform:translateY(-2px)}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.72);z-index:999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)}
.modal-box{background:#0E1420;border:1px solid rgba(255,255,255,0.1);border-radius:18px;padding:40px 36px;width:100%;max-width:400px;box-shadow:0 40px 80px rgba(0,0,0,0.6)}
.modal-logo{width:48px;height:48px;border-radius:12px;background:var(--yellow);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:22px;color:#080B10;margin:0 auto 18px}
.modal-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;margin-bottom:6px;color:#fff;text-align:center}
.modal-sub{font-size:13px;color:rgba(255,255,255,0.4);margin-bottom:28px;text-align:center}
.modal-input{width:100%;padding:12px 14px;border-radius:9px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:14px;margin-bottom:10px;outline:none;font-family:'DM Sans',sans-serif}
.modal-input:focus{border-color:rgba(245,196,0,0.4)}
.modal-textarea{width:100%;padding:12px 14px;border-radius:9px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:14px;margin-bottom:22px;outline:none;resize:none;font-family:'DM Sans',sans-serif}
.modal-btn-primary{width:100%;padding:13px;border-radius:9px;background:var(--yellow);color:#080B10;border:none;font-weight:700;font-size:14px;cursor:pointer;margin-bottom:10px;font-family:'DM Sans',sans-serif;transition:all .2s}
.modal-btn-primary:hover{background:var(--yellow2)}
.modal-btn-primary.sent{background:#22c55e;color:#fff}
.modal-btn-cancel{width:100%;padding:13px;border-radius:9px;background:transparent;color:rgba(255,255,255,0.45);border:1px solid rgba(255,255,255,0.1);font-size:13px;cursor:pointer;font-family:'DM Sans',sans-serif}

/* RESPONSIVE */
@media(max-width:900px){
  .nav-links{display:none}
  .m-body{grid-template-columns:48px 1fr}
  .m-main{display:none}
  .feat-row,.feat-row.r,.talk-inner{grid-template-columns:1fr;gap:40px;direction:ltr}
  .pay-grid{grid-template-columns:repeat(2,1fr)}
  .stat-cards,.client-grid{grid-template-columns:repeat(2,1fr)}
  .stats-inner{grid-template-columns:1fr}
  .stat-item{border-right:none;border-bottom:1px solid var(--border)}
  .stat-item:last-child{border-bottom:none}
}
@media(max-width:600px){
  .nav{padding:0 20px}
  .hero{padding:100px 16px 60px}
  .sec,.cust-sec,.talk-sec,.cta-sec{padding:80px 16px}
  .client-grid{grid-template-columns:repeat(2,1fr)}
}
`

// ─── DATA ────────────────────────────────────────────────────────────────────

const CAR_ROWS = [
  { plate: "1742УБЧ", time: "11:32 — 45 мин", badge: "new" },
  { plate: "0283УБВ", time: "12:11 — 16 мин", badge: "vip" },
  { plate: "5000УБК", time: "12:01 — 26 мин", badge: null },
  { plate: "1110УБВ", time: "11:38 — 49 мин", badge: null },
  { plate: "8279УНМ", time: "11:34 — 53 мин", badge: null },
  { plate: "4333УБН", time: "03:09 — 9ц18мин", badge: "vip" },
]

const SIDEBAR_ICONS = ["🅿", "📋", "🚗", "🚩", "📈", "⚙"]

const PAY_METHODS = [
  { ic: "🏦", n: "Хаан банк",     c: "#16a34a" },
  { ic: "💰", n: "Most money",    c: "#2563eb" },
  { ic: "🏛", n: "National bank", c: "#7c3aed" },
  { ic: "🏦", n: "State bank",    c: "#0891b2" },
  { ic: "💳", n: "TDB online",    c: "#16a34a" },
  { ic: "Q",  n: "QPay wallet",   c: "#1d4ed8" },
  { ic: "☁", n: "MonPay",        c: "#0ea5e9" },
  { ic: "🏠", n: "Hoome",         c: "#059669" },
  { ic: "💵", n: "Social Pay",    c: "#f59e0b" },
  { ic: "M",  n: "М банк",        c: "#dc2626" },
  { ic: "🔴", n: "Ard App",       c: "#dc2626" },
  { ic: "🟡", n: "Toki app",      c: "#d97706" },
]

const SETTINGS_ITEMS = [
  { icon: "🚗", label: "Автомат ANPR тэмдэглэл",  default: true  },
  { icon: "📱", label: "QPay автомат төлбөр",      default: true  },
  { icon: "📊", label: "Тайлан автоматаар",        default: false },
  { icon: "🔔", label: "Дуусгавар мэдэгдэл",       default: true  },
]

const ENG_CARDS = [
  { icon: "📷", title: "ANPR Камер",        sub: "2 CH HD • Дугаар таних",         status: "ok"   },
  { icon: "🚧", title: "Орц баррьер",       sub: "FAAC автомат • Хаалт 1",         status: "ok"   },
  { icon: "🖥",  title: "Сервер",            sub: "Ubuntu 22.04 • 99.9% uptime",    status: "ok"   },
  { icon: "📡", title: "Интернет холболт",  sub: "Резерв сүлжээ идэвхтэй",         status: "warn" },
]

const CLIENTS = [
  { name: "Шангри Ла",    emoji: "🏙" },
  { name: "Наадам Центр", emoji: "🏬" },
  { name: "Чингис Музей", emoji: "🏛" },
  { name: "MCS Плаза",    emoji: "🏢" },
]

type ModalProps = { onClose: () => void }

type NavProps = { onLogin: () => void; onContact: () => void }

type HeroProps = {}

type CTAProps = { onContact: () => void }

// ─── LOGO ────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="logo">
      <div className="logo-icon">P</div>
      <span className="logo-text">Park<span>in</span></span>
    </div>
  )
}

// ─── MODAL ───────────────────────────────────────────────────────────────────

function LoginModal({ onClose }: ModalProps) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ textAlign: "center" }}>
        <div className="modal-logo">P</div>
        <div className="modal-title">Нэвтрэх</div>
        <div className="modal-sub">Parkin Dashboard-д нэвтрэх</div>
        <input className="modal-input" placeholder="И-мэйл эсвэл утас" />
        <input className="modal-input" type="password" placeholder="Нууц үг" />
        <button className="modal-btn-primary" onClick={onClose}>Нэвтрэх</button>
        <button className="modal-btn-cancel" onClick={onClose}>Болих</button>
      </div>
    </div>
  )
}

function ContactModal({ onClose }: ModalProps) {
  const [sent, setSent] = useState(false)
  function handleSend() {
    setSent(true)
    setTimeout(onClose, 1200)
  }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" style={{ maxWidth: 440 }}>
        <div className="modal-title" style={{ textAlign: "left", marginBottom: 6 }}>Бидэнтэй холбогдох</div>
        <div className="modal-sub" style={{ textAlign: "left", marginBottom: 28 }}>
          Мэргэжилтэн тантай 24 цагийн дотор холбогдоно
        </div>
        <input className="modal-input" placeholder="Нэр" />
        <input className="modal-input" placeholder="Утасны дугаар" />
        <textarea className="modal-textarea" placeholder="Мессеж (заавал биш)" rows={3} />
        <button className={`modal-btn-primary${sent ? " sent" : ""}`} onClick={handleSend}>
          {sent ? "✓ Илгээгдлээ!" : "Илгээх"}
        </button>
        <button className="modal-btn-cancel" onClick={onClose}>Болих</button>
      </div>
    </div>
  )
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav({ onLogin, onContact }: NavProps) {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Logo />
        <div className="nav-links">
          {[["features","Боломжууд"],["customers","Харилцагчид"],["pricing","Үнийн санал"],["talk","Компани"]].map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </div>
        <div className="nav-btns">
          <button className="btn-ghost" onClick={onLogin}>Нэвтрэх</button>
          <button className="btn-cta" onClick={onContact}>Холбогдох</button>
        </div>
      </div>
    </nav>
  )
}

// ─── MOCKUP ───────────────────────────────────────────────────────────────────

function Mockup() {
  const [activeSidebar, setActiveSidebar] = useState(0)
  const [selectedRow, setSelectedRow] = useState(0)
  const [payMethod, setPayMethod] = useState(0)
  const [receiptTab, setReceiptTab] = useState(0)
  const [finished, setFinished] = useState(false)

  const selected = CAR_ROWS[selectedRow]

  function handleFinish() {
    setFinished(true)
    setTimeout(() => setFinished(false), 2200)
  }

  return (
    <div className="mockup-wrap">
      <div className="mockup-glow" />
      <div className="mockup">
        {/* Title bar */}
        <div className="m-titlebar">
          <div className="m-dots">
            <div className="m-dot" style={{ background: "#FF5F57" }} />
            <div className="m-dot" style={{ background: "#FEBC2E" }} />
            <div className="m-dot" style={{ background: "#28C840" }} />
          </div>
          <div className="m-url">
            <svg width="10" height="12" viewBox="0 0 10 12" fill="none" style={{ opacity: .4 }}>
              <path d="M8 5V3.5a3 3 0 00-6 0V5H1v7h8V5H8zm-4.5-1.5a1.5 1.5 0 013 0V5h-3V3.5z" fill="rgba(255,255,255,0.6)" />
            </svg>
            parkin.mn/dashboard
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
            Дотор зогсоол <b style={{ color: "var(--yellow)" }}>8</b>/55
          </div>
        </div>

        {/* Body */}
        <div className="m-body">
          {/* Sidebar */}
          <div className="m-sidebar">
            {SIDEBAR_ICONS.map((ic, i) => (
              <button key={i} className={`m-si${activeSidebar === i ? " on" : ""}`}
                onClick={() => setActiveSidebar(i)}>{ic}</button>
            ))}
            <div style={{ marginTop: "auto", marginBottom: 8, width: 30, height: 30, borderRadius: "50%", background: "var(--yellow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>👤</div>
          </div>

          {/* Car list */}
          <div className="m-list">
            <div className="m-list-hdr">
              ОРСОН МАШИН <span className="m-list-count">{CAR_ROWS.length}</span>
            </div>
            {CAR_ROWS.map((row, i) => (
              <div key={i} className={`m-row${selectedRow === i ? " sel" : ""}`}
                onClick={() => setSelectedRow(i)}>
                <div>
                  <div className="m-plate">{row.plate}</div>
                  <div className="m-sub">{row.time}</div>
                </div>
                {row.badge && <span className={`m-badge ${row.badge}`}>{row.badge === "vip" ? "VIP" : "Шинэ"}</span>}
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div className="m-main">
            <div className="m-main-hdr">
              <div>
                <div className="m-tag">Гарч байгаа машин</div>
                <div className="m-plate-big">{selected.plate.slice(0,4)} {selected.plate.slice(4)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="m-tag">Нийт орлого</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--yellow)" }}>₮247,500</div>
              </div>
            </div>

            <div className="m-stat-row">
              {[["45 мин","Зогссон хугацаа"],["Цаг","Үйлчлүүлэгч"],["0₮","Хөнгөлөлт"]].map(([v,l]) => (
                <div key={l} className="m-stat">
                  <div className="m-stat-val">{v}</div>
                  <div className="m-stat-lab">{l}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="m-tag" style={{ marginBottom: 6 }}>Төлбөрийн хэрэгсэл</div>
              <div className="m-pay-row">
                {["Бэлэн","💳 Карт","📱 QPay"].map((label, i) => (
                  <button key={i} className={`m-pay-btn${payMethod === i ? " on" : ""}`}
                    onClick={() => setPayMethod(i)}>{label}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="m-tag" style={{ marginBottom: 6 }}>Төлбөрийн баримт</div>
              <div style={{ display: "flex", gap: 6 }}>
                {["Хувь хүн","Хувиараа НӨАТ","Байгууллага"].map((label, i) => (
                  <button key={i}
                    style={{ padding: "6px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", transition: "all .15s",
                      background: receiptTab === i ? "rgba(245,196,0,0.1)" : "rgba(255,255,255,0.04)",
                      color: receiptTab === i ? "var(--yellow)" : "rgba(255,255,255,0.4)",
                      border: receiptTab === i ? "1px solid rgba(245,196,0,0.25)" : "1px solid rgba(255,255,255,0.07)" }}
                    onClick={() => setReceiptTab(i)}>{label}</button>
                ))}
              </div>
            </div>

            <div className="m-total">
              <div className="m-total-lab">Нийт төлбөр</div>
              <div className="m-total-val">1,500₮</div>
            </div>

            <button className={`m-finish${finished ? " done" : ""}`} onClick={handleFinish} disabled={finished}>
              {finished ? "✓ Амжилттай гүйцэтгэлээ!" : "✓ Дуусгах — Гарах хаалт нээх"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-badge">
        <span className="hero-badge-dot" />
        Монголын #1 авто зогсоолын платформ
      </div>
      <h1 className="hero-h1">Ухаалаг авто<br /><span>зогсоолын</span> систем</h1>
      <p className="hero-p">
        Зогсоолын үйл ажиллагааг автоматжуулан захиалга, цахим төлбөр, борлуулалтаа өсгөх бүхий л боломжийг Parkin танд олгоно.
      </p>
     
      <Mockup />
    </section>
  )
}

// ─── FEATURES ────────────────────────────────────────────────────────────────

function PaymentVisual() {
  const [flash, setFlash] = useState<number | null>(null)
  function handleClick(i: number) {
    setFlash(i)
    setTimeout(() => setFlash(null), 700)
  }
  return (
    <div className="feat-visual">
      <div className="pay-grid">
        {PAY_METHODS.map((p, i) => (
          <div key={i} className={`pay-item${flash === i ? " flash" : ""}`} onClick={() => handleClick(i)}>
            <div className="pay-ico" style={{ background: `${p.c}22`, color: p.c }}>{p.ic}</div>
            <span className="pay-name">{p.n}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsVisual() {
  const [toggles, setToggles] = useState<boolean[]>(SETTINGS_ITEMS.map(s => s.default))
  const toggle = (i: number) => setToggles(prev => prev.map((v, idx) => idx === i ? !v : v))
  return (
    <div className="feat-visual">
      <div className="settings-vis">
        {SETTINGS_ITEMS.map((item, i) => (
          <div key={i} className="settings-row">
            <span className="settings-label"><span style={{ fontSize: 16 }}>{item.icon}</span> {item.label}</span>
            <button className={`toggle ${toggles[i] ? "on" : "off"}`} onClick={() => toggle(i)}>
              <div className="toggle-knob" />
            </button>
          </div>
        ))}
        <div className="price-row">
          <div className="price-card"><div className="price-label">Цагийн тариф</div><div className="price-val">1,500₮</div></div>
          <div className="price-card"><div className="price-label">Өдрийн хязгаар</div><div className="price-val">12,000₮</div></div>
        </div>
      </div>
    </div>
  )
}

function EngineerVisual() {
  const [cards, setCards] = useState(ENG_CARDS)
  function resolve(i: number) {
    setCards(prev => prev.map((c, idx) => idx === i && c.status === "warn" ? { ...c, status: "ok", sub: "Шинэчлэгдлээ ✓" } : c))
  }
  return (
    <div className="feat-visual">
      <div className="eng-vis">
        {cards.map((c, i) => (
          <div key={i} className="eng-card" onClick={() => resolve(i)}>
            <div className="eng-icon">{c.icon}</div>
            <div><div className="eng-title">{c.title}</div><div className="eng-sub">{c.sub}</div></div>
            <div className={`eng-status ${c.status}`} style={{ marginLeft: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  )
}

function AppVisual() {
  return (
    <div className="feat-visual">
      <div className="app-vis">
        {/* Phone 1 */}
        <div className="phone" style={{ width: 90, height: 200 }}>
          <div className="phone-bar" style={{ background: "rgba(255,255,255,0.2)" }} />
          <div className="phone-body">
            <div className="phone-hdr">ЗОГСООЛ</div>
            <div className="phone-map"><div className="phone-map-dot" /></div>
            <div className="phone-slot"><span className="phone-slot-num">A-12</span><span className="status-free">Сул</span></div>
            <div className="phone-slot" style={{ opacity: .4 }}><span className="phone-slot-num">A-13</span><span className="status-full">Дүүрэн</span></div>
            <button className="phone-pay" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}>Хаах</button>
          </div>
        </div>
        {/* Phone 2 — featured */}
        <div className="phone" style={{ width: 90, height: 240 }}>
          <div className="phone-bar" style={{ background: "var(--yellow)" }} />
          <div className="phone-body">
            <div className="phone-hdr" style={{ color: "var(--yellow)" }}>HOOME</div>
            <div className="phone-map" style={{ height: 72 }}><div className="phone-map-dot" /></div>
            <div className="phone-slot"><span className="phone-slot-num">B-04</span><span className="status-free">Сул</span></div>
            <div className="phone-slot"><span className="phone-slot-num">B-05</span><span className="status-free">Сул</span></div>
            <button className="phone-pay" style={{ background: "var(--yellow)", color: "#080B10" }}>1,500₮ Төлөх</button>
          </div>
        </div>
        {/* Phone 3 */}
        <div className="phone" style={{ width: 90, height: 210 }}>
          <div className="phone-bar" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div className="phone-body">
            <div className="phone-hdr">И-БАРИМТ</div>
            <div style={{ height: 50, borderRadius: 6, background: "rgba(255,255,255,0.04)", marginBottom: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🧾</div>
            <div className="phone-slot" style={{ marginBottom: 4 }}><span style={{ color: "var(--dim2)", fontSize: 9 }}>Нийт</span><span className="phone-slot-num" style={{ fontSize: 11 }}>1,500₮</span></div>
            <button className="phone-pay" style={{ background: "var(--yellow)", color: "#080B10" }}>Баримт авах</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Features() {
  return (
    <section className="sec" id="features">
      <div className="sec-inner">
        <div className="eyebrow">Features</div>
        <h2 className="sec-title">Parkin Боломжууд</h2>

        {/* 1. Payment */}
        <div className="feat-row">
          <div>
            <div className="feat-tag">💳 Benefit</div>
            <h3 className="feat-h">Төлбөрийн олон боломжууд</h3>
            <p className="feat-p">Parkin системд цахим болон биет төлбөрийн хэрэгсэл бэлэн холбогдсон байдаг тул эдгээр хэрэгслээр зэрэг хүлээн авах боломжтой.</p>
            <ul className="feat-list">
              {["Hoome app & Most money","Social Pay & QPay","Gerege kiosk & Toki app","Visa card & банкны карт"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <PaymentVisual />
        </div>

        {/* 2. VIP */}
        <div className="feat-row r">
          <div>
            <div className="feat-tag">⭐ Loyalty</div>
            <h3 className="feat-h">VIP машин & Хөнгөлөлт</h3>
            <p className="feat-p">Гэрээт машин бүртгэх, гэрээний хугацаа бүртгэл хийх, төрөл бүрийн хөнгөлөлтийн бодлого гаргах, идэвхжүүлэх боломжтой.</p>
            <ul className="feat-list">
              {["Гэрээт машин, VIP үйлчлүүлэгчдийн бүртгэл","Спорт клубын гишүүний хөнгөлөлт","Оффис ажилтнуудын машины гэрээ","Түгээлт, хүргэлтийн машин бүртгэл"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="feat-visual">
            <div className="vip-vis">
              <div className="vip-label">VIP ЗОГСООЛ УДИРДЛАГА</div>
              <div className="vip-cars">
                <div className="vip-car">
                  <div className="vip-car-body" style={{ width: 70, height: 58, fontSize: 32 }}>🚗</div>
                  <span className="vip-chip gray">Цаг</span>
                </div>
                <div className="vip-car">
                  <div className="vip-car-body gold" style={{ width: 86, height: 70, fontSize: 42 }}>🚙</div>
                  <span className="vip-chip gold">VIP — 100%</span>
                </div>
                <div className="vip-car">
                  <div className="vip-car-body" style={{ width: 70, height: 58, fontSize: 32 }}>🚗</div>
                  <span className="vip-chip gray">50%</span>
                </div>
              </div>
              <div className="vip-list">
                {[["8888УБВ","VIP — Үнэгүй"],["1234УБТ","Ажилтан — 50%"],["5555УБА","Гишүүн — 30%"]].map(([p,d]) => (
                  <div key={p} className="vip-list-item">
                    <span className="vip-list-plate">{p}</span>
                    <span className="vip-list-disc">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Settings */}
        <div className="feat-row">
          <div>
            <div className="feat-tag">⚙️ Settings</div>
            <h3 className="feat-h">Уян хатан тохиргоо</h3>
            <p className="feat-p">Байгууллагын бодлогод тохируулан тохиргоо хийх боломжтой. Улирал болон онцгой үеүүдэд тааруулан үнийн тариф шинэчлэх боломжтой.</p>
            <ul className="feat-list">
              {["Үнийн тариф тохиргоо","Хөнгөлөлт тохиргоо","Эрхийн тохиргоо","Шаардлагатай хэрэглэгчийн хөгжүүлэлт"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <SettingsVisual />
        </div>

        {/* 4. Maintenance */}
        <div className="feat-row r">
          <div>
            <div className="feat-tag">🔧 Maintenance</div>
            <h3 className="feat-h">Мэргэжлийн инженерийн үйлчилгээ</h3>
            <p className="feat-p">Мэргэжлийн IT багаар системийг нэвтрэхээс эхлээд бүх процессын үед тусламж дуудлага бүрт цаг тухайд нь халамж үйлчилгээ үзүүлдэг.</p>
            <ul className="feat-list">
              {["Зогсоолын орц гарц байршуулах консалтинг","Камер, баррьер гэх мэт тоног сонголт","Серверийн арчилгаа","Аливаа доголдлын дуудлага үйлчилгээ"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <EngineerVisual />
        </div>

        {/* 5. App */}
        <div className="feat-row">
          <div>
            <div className="feat-tag">📱 Application</div>
            <h3 className="feat-h">Сул зогсоол харах Мобайл Апп</h3>
            <p className="feat-p">&quot;Hoome&quot; мобайл аппаар зогсоолуудын байршил, сул зогсоолын тоо, төлбөр төлөлт хийгддэг.</p>
            <ul className="feat-list">
              {["Hoome аппаар зогсоолуудын сул зайг харах","Төлбөр бодолт, төлбөр хийх","И-баримт бүртгэл"].map(t => <li key={t}>{t}</li>)}
            </ul>
            <button
              onClick={() => document.getElementById("customers")?.scrollIntoView({ behavior: "smooth" })}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 22, padding: "11px 22px", borderRadius: 8, fontSize: 14, fontWeight: 600, background: "transparent", color: "var(--yellow)", border: "1px solid rgba(245,196,0,0.35)", cursor: "pointer", transition: "all .2s" }}>
              Hoome танилцуулга →
            </button>
          </div>
          <AppVisual />
        </div>
      </div>
    </section>
  )
}

// ─── CUSTOMERS ───────────────────────────────────────────────────────────────

function Customers() {
  return (
    <section className="cust-sec" id="customers">
      <div className="sec-inner">
        <div className="eyebrow">Customers</div>
        <h2 className="sec-title">Parkin Харилцагчид</h2>
        <div className="stat-cards">
          {[["4,000+","Гаруй машины зогсоол удирддаг"],["40+","Авто зогсоолд нэвтэрсэн"],["20,000+","Өдөрт машины төлбөр бодолт"]].map(([n,t]) => (
            <div key={n} className="stat-card">
              <div className="stat-card-num">{n}</div>
              <div className="stat-card-text">{t}</div>
            </div>
          ))}
        </div>
        <div className="client-grid">
          {CLIENTS.map(c => (
            <div key={c.name} className="client-card">
              <div className="client-img">{c.emoji}</div>
              <div className="client-name">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── LET'S TALK ──────────────────────────────────────────────────────────────

function LetsTalk() {
  return (
    <section className="talk-sec" id="talk">
      <div className="talk-inner">
        <div>
          <div className="eyebrow">Let&apos;s Talk</div>
          <div className="talk-big">Зогсоолын шийдлээ<br /><span>хэрхэн сонгох</span> вэ?</div>
          <p className="talk-desc">Авто зогсоолын систем авахдаа бизнесийн онцлог, байршил, хүчин чадал, зориулалтаас шалтгаалан дараах хүчин зүйлсийг тодорхойлоорой.</p>
        </div>
        <div>
          <div className="talk-block">
            <div className="talk-block-num">01 / ШИЙДЭЛ</div>
            <h3 className="talk-block-title">Нөхцөл байдлаа тодорхойлох</h3>
            <p className="talk-block-desc">Ямар төрлийн зориулалттай зогсоол, ямар цар хүрээтэй ашиглахыг бодолцох.</p>
            <ul className="talk-list">
              {["Зогсоолын төрөл ба тоо","Төлбөрийн шийдлийн төрөл","Ачааллын тооцоо"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="talk-block">
            <div className="talk-block-num">02 / КОНСАЛТИНГ</div>
            <h3 className="talk-block-title">Орц гарц байршлын шийдэл</h3>
            <p className="talk-block-desc">Зогсоолын орц гарцын зөв зохион байгуулалт болон төхөөрөмжийн сонголтын зөвлөгөө авах.</p>
            <ul className="talk-list">
              {["Түгжрэл үүсэхгүй байршлын судалгаа","Орц гарцын оновчтой шийдэл","Замын эрчим, түгжрэлийн шалтгаан"].map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────

function CTA({ onContact }: CTAProps) {
  const [dlState, setDlState] = useState("idle")
  function handleDownload() {
    setDlState("loading")
    setTimeout(() => { setDlState("done"); setTimeout(() => setDlState("idle"), 1500) }, 900)
  }
  const dlLabel = dlState === "loading" ? "⏳ Бэлдэж байна..." : dlState === "done" ? "✓ Татагдлаа!" : "Танилцуулга татах"

  return (
    <section className="cta-sec" id="pricing">
      <div className="cta-inner">
        <h2 className="cta-h">Зогсоолоо ухаалаг болгох цаг иржээ</h2>
        <p className="cta-p">Parkin-тай хамтран зогсоолынхоо үйл ажиллагааг бүрэн автоматжуулаарай. Манай баг таны бизнест тохирсон шийдэл гарган ажиллана.</p>
        <div className="cta-actions">
          <button className="btn-hero" onClick={onContact}>Холбогдох</button>
          <button className="btn-hero-outline" onClick={handleDownload} disabled={dlState !== "idle"}>{dlLabel}</button>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer>
        <div className="ft-left">
          <a href="#" className="logo">
            <div className="logo-mark">🏠</div>
            <span className="logo-name">park<b>in</b></span>
          </a>
          
          <div className="ft-contacts">
            <a href="mailto:info@nomadicss.mn" className="ft-contact">
              <span className="ft-contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
              info@nomadicss.mn
            </a>
            <a href="tel:80162424" className="ft-contact">
              <span className="ft-contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
              8016-2424, 7222-2828
            </a>
            <a href="#" className="ft-contact">
              <span className="ft-contact-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></span>
              УБ, Хан-Уул, Хаан цамхаг, 22 давхар
            </a>
          </div>
          <nav className="ft-nav">
            {["Танилцуулга", "Үнэ цэнэ", "Бизнес", "Бидний тухай"].map((l) => (
              <a key={l} href="#">{l}</a>
            ))}
          </nav>
        </div>
        <div className="ft-right">
          
        </div>
      </footer>
  )
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

export default function Page() {
  const [showBackTop, setShowBackTop] = useState(false)
  const [modal, setModal] = useState<null | "login" | "contact">(null)

  useEffect(() => {
    const fn = () => setShowBackTop(window.scrollY > 500)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <>
      <style>{css}</style>

      <Nav onLogin={() => setModal("login")} onContact={() => setModal("contact")} />
      <Hero />

      

      <Features />
      <Customers />
      <LetsTalk />
      <CTA onContact={() => setModal("contact")} />
      <Footer />

      {showBackTop && (
        <button className="backtop" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>
      )}

      {modal === "login"   && <LoginModal   onClose={() => setModal(null)} />}
      {modal === "contact" && <ContactModal onClose={() => setModal(null)} />}
    </>
  )
}
