import {initializeApp} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {getDatabase,ref,onValue,set} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js';
import {getAuth,signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';

const config={
 apiKey:'AIzaSyDhDslP2d1XUFKM9yEj0SeA-5aNJKjaUs8',
 authDomain:'snap-scoreboard.firebaseapp.com',
 databaseURL:'https://snap-scoreboard-default-rtdb.firebaseio.com',
 projectId:'snap-scoreboard',
 storageBucket:'snap-scoreboard.firebasestorage.app',
 messagingSenderId:'894028177928',
 appId:'1:894028177928:web:c5e501acc379289bb9e7bd'
};

const app=initializeApp(config);
const db=getDatabase(app);
const auth=getAuth(app);
const node=ref(db,'partidos/principal');

const defaults={
 left:0,right:0,down:1,quarter:1,
 remaining:720000,running:false,endAt:0
};

let state={...defaults};
let loaded=false;
let authorized=false;

const $=id=>document.getElementById(id);
const control=!!$('login');

const remain=()=>Math.max(0,state.running?state.endAt-Date.now():state.remaining);

const fmt=ms=>{
 const sec=Math.ceil(ms/1000);
 return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0');
};

function render(){
 if($('left'))$('left').textContent=String(state.left||0).padStart(2,'0');
 if($('right'))$('right').textContent=String(state.right||0).padStart(2,'0');
 if($('clock'))$('clock').textContent=fmt(remain());
 if($('down'))$('down').textContent=['1ST','2ND','3RD','4TH'][Math.max(1,Math.min(4,state.down||1))-1];
 if($('quarter'))$('quarter').textContent='QTR '+Math.max(1,Math.min(4,state.quarter||1));
 if($('toggle'))$('toggle').textContent=state.running?'PAUSAR':'INICIAR';
}

function status(s){
 if($('status'))$('status').textContent=s;
}

onValue(node,snap=>{
 state={...defaults,...(snap.val()||{})};
 loaded=true;
 render();
 if(control)status(authorized?'Conectado a Firebase':'Inicia sesión para controlar');
},e=>status('Error de lectura: '+e.message));

setInterval(render,200);

if(control){
 onAuthStateChanged(auth,user=>{
  authorized=!!user;
  $('login').hidden=authorized;
  $('panel').hidden=!authorized;
  status(authorized?'Conectado a Firebase':'Inicia sesión para controlar');
 });

 $('loginForm').addEventListener('submit',async e=>{
  e.preventDefault();
  status('Verificando acceso…');
  try{
   await signInWithEmailAndPassword(auth,$('email').value,$('password').value);
   $('password').value='';
  }catch(err){
   status('No se pudo iniciar sesión: revisa correo y contraseña');
  }
 });

 $('logout').onclick=()=>signOut(auth);

 document.querySelectorAll('[data-action]').forEach(b=>b.onclick=async()=>{
  if(!authorized||!loaded)return;
  let next={...state};
  const action=b.dataset.action;
  const ms=remain();

  if(action==='toggle'){
   next.running=!state.running;
   next.remaining=ms;
   next.endAt=next.running?Date.now()+ms:0;
  }else if(action==='reset'){
   next.running=false;
   next.remaining=720000;
   next.endAt=0;
  }else if(action==='quarter+'){
   next.quarter=Math.min(4,(state.quarter||1)+1);
  }else if(action==='quarter-'){
   next.quarter=Math.max(1,(state.quarter||1)-1);
  }else if(action==='down+'){
   next.down=Math.min(4,state.down+1);
  }else if(action==='down-'){
   next.down=Math.max(1,state.down-1);
  }else{
   const side=action.startsWith('left')?'left':'right';
   const delta=action.endsWith('+')?1:-1;
   next[side]=Math.max(0,Math.min(99,next[side]+delta));
  }

  try{
   await set(node,next);
   status('Conectado a Firebase');
  }catch(err){
   status('No se pudo guardar: '+err.message);
  }
 });
}
