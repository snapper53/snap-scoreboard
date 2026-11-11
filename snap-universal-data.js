const config={apiKey:'AIzaSyDhDslP2d1XUFKM9yEj0SeA-5aNJKjaUs8',authDomain:'snap-scoreboard.firebaseapp.com',databaseURL:'https://snap-scoreboard-default-rtdb.firebaseio.com',projectId:'snap-scoreboard',appId:'1:894028177928:web:c5e501acc379289bb9e7bd'};const names={"prepa2": "PREPA 2", "eiao": "EIAO", "prepa9": "PREPA 9", "prepa22": "PREPA 22", "prepa25": "PREPA 25", "eyptm": "EYPTM", "fime": "FIME", "facdyc": "FACDYC", "prepa23": "PREPA 23", "cideb": "CIDEB"};const matches=[
  {
    "fecha": "2026-11-12",
    "hora": "10:00",
    "local": "prepa2",
    "visitante": "eiao",
    "etapa": "SEMIFINAL"
  },
  {
    "fecha": "2026-11-12",
    "hora": "12:30",
    "local": "prepa9",
    "visitante": "prepa22",
    "etapa": "SEMIFINAL"
  },
  {
    "fecha": "2026-11-12",
    "hora": "14:30",
    "local": "prepa25",
    "visitante": "eyptm",
    "etapa": "SEMIFINAL"
  },
  {
    "fecha": "2026-11-12",
    "hora": "19:00",
    "local": "fime",
    "visitante": "facdyc",
    "etapa": "FINAL"
  },
  {
    "fecha": "2026-11-14",
    "hora": "10:00",
    "local": "prepa23",
    "visitante": "cideb",
    "etapa": "SEMIFINAL"
  }
];const initial={left:0,right:0,down:1,quarter:1,remaining:720000,running:false,endAt:0,match:0};const fmt=ms=>{let s=Math.ceil(Math.max(0,ms)/1000);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};