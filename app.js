/*
 * Phone Peeking — static, dependency-free interactive iPhone-inspired demo.
 * Change the fictional story in STORY and APP_DATA. No API or database is required.
 */
(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const STORY = {
    character: 'Raka', contact: 'Nara',
    message1: 'Jadi kamu tetap pergi besok?',
    message2: 'Aku lihat tiketmu di meja. Kenapa nggak bilang dari awal?',
    message3: 'Aku cuma mau tahu kamu baik-baik saja.',
    reply1: 'Boleh kita bicara sebentar?',
    reply2: 'Aku baik. Besok aku jelaskan semuanya.',
    response1: 'Aku masih di sini. Telepon aja kalau sudah siap.',
    response2: 'Oke. Tapi tolong jangan menghilang lagi, ya.',
    email: [
      'Rak,',
      'Aku nggak tahu kapan kamu akan membaca ini. Besok mungkin semuanya berubah, tapi aku harap ada satu hal yang nggak berubah.',
      'Ingat foto di stasiun waktu kita hampir ketinggalan kereta? Kamu bilang kita selalu punya waktu untuk mencoba lagi.',
      'Kali ini, jangan memutuskan semuanya sendirian.',
      '— Nara'
    ],
    note: 'Aku tidak pergi karena ingin menjauh dari Nara.\n\nAku pergi karena ada hal yang harus kuselesaikan sendiri. Tapi seharusnya aku menceritakannya dulu.\n\n07:15 — Kereta pagi.\n06:15 — Titik temu di stasiun?\n\nMungkin masih ada waktu untuk meneleponnya malam ini.'
  };

  const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">${body}</svg>`;
  const ICON = {
    phone: svg('<path fill="#fff" d="M16 7c-3 0-7 4-7 8 0 10 15 25 25 25 4 0 8-4 8-7l-2-6c-.8-2-2.5-2-4-1l-5 3C25 26 22 23 19 17l3-5c1-2 0-3-1.5-4z"/>'),
    messages: svg('<path fill="#fff" d="M24 7C12 7 4 14 4 23c0 5 2.5 9 7 12L9 42l10-4c1.5.4 3.2.5 5 .5 12 0 20-6.5 20-15.5S36 7 24 7Z"/>'),
    mail: svg('<rect x="4" y="11" width="40" height="27" rx="4" fill="#fff"/><path d="m5 14 19 15 19-15" fill="none" stroke="#348ce4" stroke-width="2.7"/>'),
    facetime: svg('<rect x="6" y="10" width="26" height="28" rx="7" fill="#fff"/><path d="m30 19 10-8c2-1 3-1 3 2v22c0 2-1 3-3 2l-10-8z" fill="#fff"/>'),
    camera: svg('<rect x="4" y="12" width="40" height="27" rx="6" fill="#2c3039"/><rect x="12" y="9" width="16" height="5" rx="2" fill="#3e414b"/><circle cx="24" cy="25" r="11" fill="#8995a3"/><circle cx="24" cy="25" r="8" fill="#283444"/><circle cx="24" cy="25" r="5" fill="#566e88"/><circle cx="37" cy="18" r="2" fill="#e9eced"/>'),
    photos: svg(Array.from({length:8},(_,i)=>`<ellipse cx="24" cy="14" rx="6" ry="11" fill="${['#f2686e','#f99a4a','#f2c347','#7acb65','#5bcacf','#63a3ed','#a183dc','#ec90c9'][i]}" transform="rotate(${i*45} 24 24)"/>`).join('')+'<circle cx="24" cy="24" r="4" fill="#fff9d8"/>'),
    clock: svg('<circle cx="24" cy="24" r="21" fill="#fff"/><circle cx="24" cy="24" r="19" fill="#1b1c22"/>'+Array.from({length:12},(_,i)=>`<path d="M24 6.5v3" transform="rotate(${i*30} 24 24)" stroke="#fff" stroke-width="1.4"/>`).join('')+'<path d="M24 12v13l10 6" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/><path d="m24 24-6-7" stroke="#f35c56" stroke-width="1.5"/>'),
    maps: svg('<rect x="3" y="5" width="42" height="38" rx="4" fill="#e6efdf"/><path d="M14 5v38M34 5v38" stroke="#c7d9e6" stroke-width="7"/><path d="M3 30 45 17" stroke="#ffe175" stroke-width="8"/><path d="M9 43 40 5" stroke="#fff" stroke-width="4"/><path d="M25 8c-7 0-12 5-12 12 0 8 12 19 12 19s12-11 12-19c0-7-5-12-12-12" fill="#e75c55"/><circle cx="25" cy="20" r="5" fill="white"/>'),
    weather: svg('<circle cx="18" cy="17" r="11" fill="#ffe174"/><path d="M14 38c-5 0-9-3-9-8s4-8 8-8c3-8 14-9 19-2 6-1 12 4 12 10 0 5-4 8-10 8Z" fill="#fff"/>'),
    notes: svg('<rect x="4" y="4" width="40" height="40" rx="6" fill="#fffefa"/><path d="M4 4h40v13H4" fill="#ffdb54"/><path d="M11 24h26M11 30h26M11 36h20" fill="none" stroke="#b2b9bd" stroke-width="1.7"/>'),
    reminders: svg('<rect x="4" y="4" width="40" height="40" rx="6" fill="#fff"/><circle cx="12" cy="14" r="3" fill="#eb6770"/><circle cx="12" cy="24" r="3" fill="#edba56"/><circle cx="12" cy="34" r="3" fill="#7193e8"/><path d="M20 14h18M20 24h18M20 34h18" stroke="#b4b7c5" stroke-width="2"/>'),
    appstore: svg('<g stroke="#fff" stroke-width="5.5" stroke-linecap="round"><path d="m18 9 19 30M30 9 11 39M8 30h32"/></g>'),
    settings: svg('<path d="M20 4h8l2 6 5 3 6-2 4 7-5 4v5l5 4-4 7-6-2-5 3-2 6h-8l-2-6-5-3-6 2-4-7 5-4v-5l-5-4 4-7 6 2 5-3z" fill="#e4e6ec" stroke="#969ba6" stroke-width="1"/><circle cx="24" cy="24" r="12" fill="#8b939e"/><circle cx="24" cy="24" r="7" fill="#f7f7fa"/>'),
    safari: svg('<circle cx="24" cy="24" r="21" fill="#fff"/><circle cx="24" cy="24" r="18" fill="#238be2"/><path d="m16 32 13-17-5 10z" fill="#f25451"/><path d="m16 32 8-7 5-10z" fill="#fff"/><circle cx="24" cy="24" r="2" fill="#fff"/>'),
    music: svg('<path d="M28 9v26c-2-2-5-2-8-1-7 2-8 10-1 11 6 1 12-3 12-9V19l11-3V8z" fill="#fff"/>'),
    files: svg('<path d="M4 13h15l5 5h20v20a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" fill="#3c96eb"/><path d="M4 18h40v5H4" fill="#acd2ff"/>'),
    calendar: '<div style="height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#db5b59;background:white;border-radius:inherit"><b style="font-size:10px">SUN</b><span style="font-size:32px;line-height:1;color:#22252a;font-weight:350">18</span></div>',
    contacts: svg('<rect x="7" y="4" width="34" height="40" rx="5" fill="#f5eee3"/><circle cx="24" cy="19" r="7" fill="#a4a5ac"/><path d="M13 35c2-10 20-10 22 0" fill="#a4a5ac"/><path d="M8 12h-4M8 22h-4M8 32h-4" stroke="#fff" stroke-width="3"/>'),
    calculator: svg('<rect x="8" y="5" width="32" height="38" rx="5" fill="#34353b"/><rect x="12" y="9" width="24" height="8" rx="2" fill="#8d9498"/><circle cx="16" cy="24" r="3" fill="#fff"/><circle cx="25" cy="24" r="3" fill="#fff"/><circle cx="34" cy="24" r="3" fill="#f9a33c"/><circle cx="16" cy="34" r="3" fill="#fff"/><circle cx="25" cy="34" r="3" fill="#fff"/><circle cx="34" cy="34" r="3" fill="#f9a33c"/>'),
    voice: svg('<rect x="20" y="7" width="8" height="24" rx="4" fill="#dd555c"/><path d="M15 22a9 9 0 0 0 18 0M24 31v9M16 40h16" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>'),
    compass: svg('<circle cx="24" cy="24" r="20" fill="#1c2130" stroke="#b8b9c2" stroke-width="2"/><path d="m18 30 6-19 6 19-6 7z" fill="#ee5c57"/><path d="m18 30 6-19v26z" fill="#f2f2f5"/>'),
    health: svg('<path d="M24 41C13 32 5 27 5 17 5 7 18 3 24 13 30 3 43 7 43 17c0 10-8 15-19 24z" fill="#ef6c75"/>'),
    books: svg('<path d="M7 10c6-3 12-2 17 2 5-4 11-5 17-2v28c-6-3-12-2-17 2-5-4-11-5-17-2z" fill="#fff" stroke="#f5a94d" stroke-width="2"/><path d="M24 12v28" stroke="#f5a94d" stroke-width="2"/>'),
    wallet: svg('<rect x="5" y="9" width="38" height="30" rx="6" fill="#30343c"/><rect x="7" y="12" width="34" height="8" rx="3" fill="#6ace91"/><rect x="7" y="20" width="34" height="7" rx="2" fill="#80b6e9"/><path d="M6 27h36v8H6z" fill="#f1dc82"/>'),
    podcasts: svg('<circle cx="24" cy="21" r="17" stroke="#fff" stroke-width="3" fill="none"/><circle cx="24" cy="21" r="10" stroke="#fff" stroke-width="3" fill="none"/><circle cx="24" cy="20" r="4" fill="#fff"/><rect x="20" y="25" width="8" height="16" rx="4" fill="#fff"/>'),
    stocks: svg('<path d="M5 36h38" stroke="#739d85" stroke-width="2"/><path d="m5 33 9-8 6 5 9-16 7 5 8-12" stroke="#fff" fill="none" stroke-width="3.5" stroke-linecap="round"/>'),
    translate: svg('<rect x="3" y="7" width="26" height="28" rx="5" fill="#fff"/><rect x="18" y="17" width="27" height="24" rx="5" fill="#aaccf9"/><text x="10" y="27" fill="#3688df" font-size="19" font-weight="bold">A</text><text x="26" y="34" fill="#3688df" font-size="16" font-weight="bold">文</text>'),
    tips: svg('<path d="M24 4c-11 0-17 8-17 17 0 8 8 11 10 17h14c2-6 10-9 10-17 0-9-6-17-17-17Z" fill="#ffe48b"/><rect x="17" y="38" width="14" height="5" rx="2" fill="#fff"/>'),
    shortcuts: svg('<path d="M9 9h30v30H9z" fill="#fff" opacity=".3"/><path d="m26 5-14 23h12l-2 15 16-25H26z" fill="#fff"/>'),
    findmy: svg('<circle cx="24" cy="24" r="20" fill="#fff"/><circle cx="24" cy="24" r="15" fill="none" stroke="#4cc4a2" stroke-width="5"/><circle cx="24" cy="24" r="8" fill="#82ccff"/><circle cx="24" cy="24" r="3" fill="#fff"/>')
  };

  const APP_DATA = [
    ['facetime','FaceTime','linear-gradient(#61db7c,#19b74a)'],
    ['calendar','Kalender','#fff'], ['photos','Foto','#fff'],
    ['camera','Kamera','linear-gradient(#e4e5e9,#bbc1ca)'],
    ['mail','Mail','linear-gradient(#62b7ff,#217bdc)',1],
    ['clock','Jam','#17171d'],['maps','Peta','#e5efdf'],
    ['weather','Cuaca','linear-gradient(#248df0,#74c5f5)'],
    ['notes','Catatan','#fff'],['reminders','Pengingat','#fff'],
    ['appstore','App Store','#238ded'],
    ['settings','Pengaturan','linear-gradient(#c6c8d0,#878b99)'],
    ['files','File','#fff'],['music','Musik','linear-gradient(145deg,#ff818f,#ec4a65)'],
    ['safari','Safari','#fff'],['messages','Pesan','linear-gradient(#60df76,#1dbe4a)',1],
    ['phone','Telepon','linear-gradient(#5bdd72,#16b942)'],
    ['contacts','Kontak','linear-gradient(#a9b2c5,#707f9c)'],
    ['calculator','Kalkulator','#25252a'],['voice','Memo Suara','#16191f'],
    ['compass','Kompas','#171c28'],['health','Kesehatan','#fff'],
    ['books','Buku','linear-gradient(#ffc46b,#f69b34)'],
    ['wallet','Dompet','#262932'],
    ['podcasts','Podcast','linear-gradient(#ae7ff1,#7e47c7)'],
    ['stocks','Saham','#222e30'],
    ['translate','Terjemahkan','#5a9ee9'],
    ['tips','Tips','linear-gradient(#f3b955,#e48b31)'],
    ['shortcuts','Pintasan','linear-gradient(140deg,#ba88ed,#666dd7)'],
    ['findmy','Lacak','linear-gradient(#70e2c9,#359add)']
  ];
  const appById = Object.fromEntries(APP_DATA.map(([id,name,bg,badge]) => [id,{id,name,bg,badge}]));
  const pageIds = [APP_DATA.slice(0,16).map(a=>a[0]),APP_DATA.slice(16).map(a=>a[0])];
  const dockIds = ['phone','safari','messages','music'];
  const photos = ['Langit menjelang pulang','Stasiun sore itu','Jalan yang kita lewati','Satu tempat favorit','Pemandangan kereta','Senja terakhir'];
  const defaultState = () => ({view:'home',app:null,page:0,wallpaper:'sunset',seen:{},reply:null,mail:'inbox',mailSent:false,callStep:0,callDone:false,photo:0,playing:false,cameraShot:false});
  let state = defaultState();
  let toastTimeout;

  function appButton(id, isDock=false){
    const {name,bg,badge} = appById[id];
    return `<button class="app-button" data-open="${id}" aria-label="Buka ${name}"><span class="app-icon" style="background:${bg}"><span class="app-icon-content">${ICON[id]}</span>${badge&&!state.seen[id]&&!isDock?`<span class="app-badge">${badge}</span>`:''}</span>${isDock?'':`<span class="app-name">${name}</span>`}</button>`;
  }
  function drawHome(){
    $('appGrid').innerHTML=pageIds[state.page].map(id=>appButton(id)).join('');
    $('dock').innerHTML=dockIds.map(id=>appButton(id,true)).join('');
    $('pageDots').innerHTML=pageIds.map((_,index)=>`<button class="page-dot ${index===state.page?'active':''}" data-action="page" data-value="${index}" aria-label="Halaman ${index+1}" aria-current="${index===state.page?'page':'false'}"></button>`).join('');
  }
  function setView(view){
    state.view=view;
    [['lock','lockScreen'],['home','homeScreen'],['app','applicationView'],['call','callingView']].forEach(([key,id])=>$(id).hidden=view!==key);
    $('statusBar').classList.toggle('dark',view==='app');
    document.querySelector('.home-indicator').classList.toggle('dark',view==='app');
    if(view==='home')drawHome();
    updateProgress();
  }
  function openApp(id){
    state.app=id;state.seen[id]=true;setView('app');drawApp();
  }
  function goHome(){state.app=null;state.callStep=0;setView('home')}
  function updateProgress(){
    const targets=['messages','mail','phone','photos','notes','calendar'];
    const count=targets.filter(id=>state.seen[id]).length;
    $('progressLabel').textContent=`${count} / ${targets.length}`;
    $('progressFill').style.width=`${100*count/targets.length}%`;
    $('contextHint').textContent=state.view==='lock'?'Ketuk notifikasi atau geser ke atas untuk membuka layar.':count===6?'Seluruh petunjuk ditemukan. Coba pilih balasan pesan dan hubungi Nara.':state.reply&&!state.callDone?'Pesan sudah dibalas. Coba buka aplikasi Telepon.':state.seen.notes&&!state.seen.calendar?'Catatan menyebut jadwal kereta. Coba periksa Kalender.':state.view==='home'?'Ketuk ikon aplikasi atau geser ke kiri untuk aplikasi lainnya.':'Gunakan garis putih di bawah layar untuk kembali ke Home Screen.';
  }
  function header(title,subtitle='',right=''){
    return `<header class="app-header"><div class="app-header-left"><button class="back-button" data-action="home" aria-label="Kembali ke Home Screen">‹</button><div><div class="app-header-title">${title}</div>${subtitle?`<div class="app-header-sub">${subtitle}</div>`:''}</div></div><div class="app-header-right">${right}</div></header>`;
  }
  function chatBubble(message,mine=false){
    return `<div class="chat-row ${mine?'me':''}">${mine?'':'<div class="chat-avatar">N</div>'}<div class="chat-bubble">${message}</div></div>`;
  }
  function messages(){
    let html=header('Nara','● Online','•••')+'<div class="app-body" id="chatScroll"><div class="chat-date">Minggu, 18 Oktober · 21:38</div>';
    html+=chatBubble(STORY.message1)+chatBubble(STORY.message2)+chatBubble(STORY.message3);
    if(state.reply)html+=chatBubble(state.reply==='talk'?STORY.reply1:STORY.reply2,true)+chatBubble(state.reply==='talk'?STORY.response1:STORY.response2);
    html+='</div><div class="chat-compose">';
    if(!state.reply)html+='<div class="compose-label">BALAS PESAN NARA</div><button class="choice-button" data-action="reply" data-value="talk">“Boleh kita bicara sebentar?” ↗</button><button class="choice-button" data-action="reply" data-value="tomorrow">“Besok aku jelaskan semuanya.” ↗</button>';
    else html+='<div class="compose-label">Pesan terkirim ✓✓</div><button class="primary-button" data-open="phone">☎ &nbsp;Buka Telepon</button>';
    return html+'</div>';
  }
  function mail(){
    if(state.mail==='letter')return header('Mail','‹ Kotak Masuk')+`<div class="app-body"><div class="paper"><h3>Tentang hari Senin</h3><div class="paper-meta"><strong>Nara</strong> · Minggu, 21:28</div>${STORY.email.map(p=>`<p>${p}</p>`).join('')}${state.mailSent?'<div class="hint">✓ Balasan berhasil disimpan dalam simulasi.</div>':'<button class="primary-button" data-action="mailreply">↗ Balas: Kita bicara besok pagi</button>'}</div></div>`;
    if(state.mail==='ticket')return header('Mail','‹ Kotak Masuk')+'<div class="app-body"><div class="paper"><h3>Konfirmasi perjalanan</h3><div class="paper-meta">Travel Desk · Minggu, 18 Oktober</div><p>Halo, Raka.\n\nKeberangkatan Anda telah dikonfirmasi.\n\nTUJUAN: BANDUNG\nHARI: SENIN, 19 OKTOBER\nWAKTU: 07:15\nSTATUS: CONFIRMED</p><div class="hint">Detail tiket dan perjalanan ini fiktif.</div></div></div>';
    return header('Mail','Kotak Masuk','Edit')+'<div class="app-body"><div class="section-label">Kotak masuk · 2 pesan</div><button class="list-row" data-action="mailopen" data-value="letter"><div class="list-avatar">N</div><div class="list-main"><strong>Nara · 21:28</strong><strong>Tentang hari Senin</strong><small>Aku nggak tahu kapan kamu akan membaca...</small></div><span class="list-chevron">›</span></button><button class="list-row" data-action="mailopen" data-value="ticket"><div class="list-avatar" style="background:#6ca7d8">T</div><div class="list-main"><strong>Travel Desk</strong><strong>Konfirmasi perjalanan</strong><small>Tiket ke Bandung · Senin, 07:15</small></div><span class="list-chevron">›</span></button></div>';
  }
  function phone(){
    return header('Telepon','Terbaru','Edit')+`<div class="app-body"><div class="section-label">Panggilan terakhir</div><button class="list-row" data-action="call"><div class="list-avatar">N</div><div class="list-main"><strong style="color:#e45d67">Nara</strong><small>Panggilan tidak terjawab · 20:57</small></div><strong style="color:#30b882;font-size:19px">☎</strong></button><div style="text-align:center;margin:29px 0"><button class="primary-button" data-action="call">☎ &nbsp;Telepon kembali</button></div>${state.callDone?'<div class="hint">✓ Panggilan simulasi telah dilakukan.</div>':''}</div>`;
  }
  function renderCall(){
    const text=state.callStep===1?'Menghubungkan panggilan simulasi...':'“Rak, aku cuma mau dengar suara kamu. Kita bisa ketemu sebelum keretamu berangkat?”';
    $('callingView').innerHTML=`<div class="call-page"><div class="call-avatar">N</div><h3>Nara</h3><p>${text}</p>${state.callStep===2?'<p style="border:1px solid #ffffff40;border-radius:12px;padding:10px">“Bisa. Jam enam di stasiun, ya.”</p>':''}<div class="call-actions">${state.callStep===1?'<div><button class="call-round" style="background:#40bd7a" data-action="connect">☎</button><div class="call-label">Hubungkan</div></div>':''}<div><button class="call-round" style="background:#ed5467" data-action="endcall">✕</button><div class="call-label">Akhiri</div></div></div></div>`;
  }
  function notes(){
    return header('Catatan','Folder: Pribadi','Selesai')+`<div class="app-body"><div class="section-label">Terakhir diedit · Hari ini</div><div class="notes-paper"><h3>Hal yang belum sempat kukatakan</h3>${STORY.note.replaceAll('\n','<br>')}</div></div>`;
  }
  function photoGallery(){
    if(state.photo){let i=state.photo-1;return header('Foto','‹ Perpustakaan',`${state.photo} / 6`)+`<div class="app-body"><div class="photo-art photo-big" style="background:${['linear-gradient(#b5bccb,#e7aaa3,#425477)','linear-gradient(#91b0bf,#cab4c9,#525776)','linear-gradient(#dba99b,#9b88ac,#43576d)','linear-gradient(#b6bfae,#ddaeb1,#5c6782)','linear-gradient(#98b4c1,#b5b2cf,#34446b)','linear-gradient(#e5c1a9,#ae87a3,#434a73)'][i]}"></div><div class="photo-caption">${photos[i]}<br><small>Kenangan · Oktober 2026</small></div><div style="text-align:center"><button class="secondary-button" data-action="photoback">‹ &nbsp;Semua foto</button></div></div>`;}
    return header('Foto','Perpustakaan','Pilih')+`<div class="app-body"><div class="section-label">6 kenangan</div><div class="photo-grid">${photos.map((p,i)=>`<button class="photo-art" data-action="photo" data-value="${i+1}" aria-label="Lihat foto ${p}"></button>`).join('')}</div><div class="hint">Beberapa tempat menyimpan cerita yang belum selesai.</div>${state.cameraShot?'<div class="hint">✓ Foto baru dari Kamera telah diambil.</div>':''}</div>`;
  }
  function calendar(){
    return header('Kalender','Oktober 2026','+')+'<div class="app-body"><div style="background:#fff;text-align:center;padding:26px 5px;color:#e65a63;font-size:61px;letter-spacing:-2px;font-weight:720">18</div><div class="section-label">Agenda mendatang</div><div class="event-card"><strong>Senin · Kereta ke Bandung</strong><small>19 Oktober · 07:15 · Stasiun</small></div><div class="event-card" style="border-color:#f2ba78"><strong>Senin · Bicara dengan Nara?</strong><small>19 Oktober · 06:15 · Belum dikonfirmasi</small></div></div>';
  }
  function settings(){
    return header('Pengaturan','Tampilan')+`<div class="app-body"><div class="section-label">Wallpaper</div><div class="setting-row"><span>Warna layar</span><div class="swatches"><button data-action="wall" data-value="sunset" aria-label="Wallpaper senja" class="swatch ${state.wallpaper==='sunset'?'active':''}" style="background:linear-gradient(#c9a5b9,#61728d)"></button><button data-action="wall" data-value="night" aria-label="Wallpaper malam" class="swatch ${state.wallpaper==='night'?'active':''}" style="background:linear-gradient(#171d48,#4f6095)"></button><button data-action="wall" data-value="rose" aria-label="Wallpaper merah muda" class="swatch ${state.wallpaper==='rose'?'active':''}" style="background:linear-gradient(#ecb7c9,#9376bd)"></button></div></div><div class="hint">Kembali ke Home Screen untuk melihat perubahan wallpaper.</div></div>`;
  }
  const genericInfo={
    facetime:['Panggilan Video','Nara ada dalam daftar kontak. Coba aplikasi Telepon untuk melanjutkan cerita.'],
    clock:['Alarm · 06:00','Alarm sudah disetel untuk perjalanan besok pagi.'],
    maps:['Lokasi Perjalanan','Stasiun kereta · Besok 06:15. Lokasi peta hanya bagian dari cerita.'],
    weather:['Bandung · 24°C','Cerah berawan. Informasi cuaca ini fiktif, bukan prakiraan langsung.'],
    reminders:['Pengingat Besok','Siapkan tiket · Bawa tas · Hubungi Nara'],
    appstore:['Jelajahi Aplikasi','Ini adalah simulasi statis; tidak dapat memasang aplikasi dari App Store.'],
    files:['Dokumen Pribadi','Tiket_Bandung.pdf · Dokumen simulasi'],
    safari:['Browser','Coba aplikasi lain di Home Screen untuk menemukan petunjuk cerita.'],
    contacts:['Daftar Kontak','Nara · Raka · Travel Desk'],
    calculator:['Kalkulator','Simulasi ikon aplikasi Kalkulator.'],
    voice:['Memo Suara','Memo suara Raka belum direkam.'],
    compass:['Kompas','Arah perjalanan masih belum pasti.'],
    health:['Kesehatan','Demo aplikasi tanpa data kesehatan pribadi.'],
    books:['Buku','Perpustakaan cerita fiktif.'],
    wallet:['Dompet','Tiket dan kartu digital fiktif.'],
    podcasts:['Podcast','Daftar podcast dalam demo.'],
    stocks:['Saham','Data saham tidak ditampilkan dalam demo.'],
    translate:['Terjemahkan','Simulasi aplikasi terjemahan.'],
    tips:['Tips iPhone','Geser layar Home ke samping. Ketuk garis di bawah untuk pulang.'],
    shortcuts:['Pintasan','Pintasan untuk membuka aplikasi simulasi.'],
    findmy:['Lacak','Tidak ada akses lokasi sebenarnya.']
  };
  function genericApp(id){
    const obj=appById[id];let [subtitle,description]=genericInfo[id]||['Aplikasi','Simulasi aplikasi pada iPhone.'];
    if(id==='music'){
      return header('Musik','Sedang Diputar')+`<div class="app-body" style="background:#252238;color:white;text-align:center"><div class="music-art">♫</div><strong style="font-size:18px">Between Stations</strong><div style="font-size:11px;color:#b7afcd;margin:9px">A fictional soundtrack</div><div style="height:3px;background:#5b5872;border-radius:4px;margin:32px 23px"><div style="width:${state.playing?'45':'12'}%;background:white;height:100%;border-radius:4px"></div></div><button style="width:62px;height:62px;border-radius:50%;border:0;background:white;color:#302b49;font-size:25px" data-action="play">${state.playing?'Ⅱ':'▶'}</button><div style="color:#b6b0ca;font-size:10px;margin-top:14px">Pemutar visual · Tanpa audio sungguhan</div></div>`;
    }
    if(id==='camera'){
      return header('Kamera','Mode Foto')+'<div class="app-body" style="background:#151924;display:flex;flex-direction:column"><div class="camera-preview"><div class="camera-lines">PHOTO / 01</div></div><div style="text-align:center;padding:7px"><button class="shutter" data-action="shutter" aria-label="Ambil foto"></button></div></div>';
    }
    return header(obj.name,subtitle)+`<div class="app-body"><div class="generic-icon" style="background:${obj.bg}">${ICON[id]}</div><h3 class="generic-title">${subtitle}</h3><div class="hint" style="text-align:center">${description}</div>${id==='facetime'?'<div style="text-align:center"><button class="primary-button" data-open="phone">☎ &nbsp;Buka Telepon</button></div>':''}</div>`;
  }
  function drawApp(){
    const renderers={messages,mail,phone,notes,photos:photoGallery,calendar,settings};
    $('applicationView').innerHTML=renderers[state.app]?renderers[state.app]():genericApp(state.app);
    const scroll=$('chatScroll');if(scroll)scroll.scrollTop=scroll.scrollHeight;
  }
  function setWallpaper(name){state.wallpaper=name;$('wallpaper').className='wallpaper'+(name==='sunset'?'':` ${name}`);if(state.view==='app')drawApp()}
  function toast(message){const el=$('toast');el.textContent=message;el.hidden=false;clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>{el.hidden=true},2300)}
  function reset(){state=defaultState();setWallpaper('sunset');setView('home')}
  function beginCall(){state.callStep=1;setView('call');renderCall()}

  document.addEventListener('click',(event)=>{
    const el=event.target.closest('[data-open],[data-action]');
    if(!el)return;
    if(el.dataset.open){openApp(el.dataset.open);return;}
    const action=el.dataset.action,value=el.dataset.value;
    switch(action){
      case 'home':goHome();break;
      case 'lock':setView('lock');break;
      case 'unlock':setView('home');break;
      case 'flash':toast('Senter tidak tersedia dalam demo.');break;
      case 'wallpaper':{const arr=['sunset','night','rose'];setWallpaper(arr[(arr.indexOf(state.wallpaper)+1)%arr.length]);break;}
      case 'wall':setWallpaper(value);break;
      case 'reset':reset();break;
      case 'page':state.page=Number(value);drawHome();break;
      case 'reply':state.reply=value;drawApp();updateProgress();break;
      case 'mailopen':state.mail=value;drawApp();break;
      case 'mailreply':state.mailSent=true;drawApp();toast('Balasan tersimpan dalam simulasi.');break;
      case 'call':beginCall();break;
      case 'connect':state.callStep=2;renderCall();break;
      case 'endcall':state.callDone=true;state.callStep=0;openApp('phone');break;
      case 'photo':state.photo=Number(value);drawApp();break;
      case 'photoback':state.photo=0;drawApp();break;
      case 'play':state.playing=!state.playing;drawApp();break;
      case 'shutter':state.cameraShot=true;toast('Foto simulasi telah diambil.');break;
    }
  });

  let startX=null,startY=null;
  $('screen').addEventListener('touchstart',(e)=>{startX=e.touches[0].clientX;startY=e.touches[0].clientY},{passive:true});
  $('screen').addEventListener('touchend',(e)=>{
    if(startX===null)return;
    const dx=startX-e.changedTouches[0].clientX,dy=startY-e.changedTouches[0].clientY;
    if(state.view==='lock'&&dy>50)setView('home');
    else if(state.view==='home'&&Math.abs(dx)>58&&Math.abs(dx)>Math.abs(dy)){state.page=dx>0?Math.min(state.page+1,1):Math.max(state.page-1,0);drawHome();}
    else if(state.view==='app'&&dy>125)goHome();
    startX=null;startY=null;
  },{passive:true});

  // Preserve narrative time on the mock iPhone rather than accessing the visitor's clock.
  setView('home');
})();
