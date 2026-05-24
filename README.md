<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>⚡ Life OS — Sebastian S.</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"></script>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:#f0f4fa;font-family:'Segoe UI',system-ui,sans-serif;padding:12px;min-height:100vh;}
  :root{--font-sans:'Segoe UI',system-ui,sans-serif;}
  input,select,textarea,button{font-family:inherit;}
  a{text-decoration:none;}
  ::-webkit-scrollbar{width:6px;height:6px;}
  ::-webkit-scrollbar-track{background:#f0f4fa;}
  ::-webkit-scrollbar-thumb{background:#b5d4f4;border-radius:3px;}
</style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
const{useState,useEffect,useCallback}=React;

// ── STORAGE (localStorage) ──
async function sGet(key){try{const v=localStorage.getItem(key);return v?JSON.parse(v):null;}catch{return null;}}
async function sSet(key,val){try{localStorage.setItem(key,JSON.stringify(val));}catch{}}

const T={navy:'#0C447C',navyDk:'#042C53',navyLt:'#185FA5',blue:'#378ADD',b50:'#E6F1FB',b100:'#B5D4F4',b200:'#85B7EB',purple:'#7F77DD',purBg:'#EEEDFE',purDk:'#3C3489',teal:'#1D9E75',teaBg:'#E1F5EE',teaDk:'#085041',coral:'#D85A30',corBg:'#FAECE7',corDk:'#712B13',grn:'#639922',grnBg:'#EAF3DE',grnDk:'#27500A',amb:'#BA7517',ambBg:'#FAEEDA',ambDk:'#633806',red:'#E24B4A',redBg:'#FCEBEB',redDk:'#791F1F',gray:'#888780',gryBg:'#F1EFE8',gryDk:'#444441',pink:'#D4537E',pnkBg:'#FBEAF0',pnkDk:'#72243E',gold:'#D4A017'};

const NH_QUOTES=[
  {title:"Definiteness of Purpose",quote:"There is one quality which one must possess to win, and that is definiteness of purpose, the knowledge of what one wants, and a burning desire to possess it."},
  {title:"Desire",quote:"The starting point of all achievement is DESIRE. Keep this constantly in mind. Weak desire brings weak results, just as a small fire makes a small amount of heat."},
  {title:"Faith",quote:"Whatever the mind can conceive and believe, it can achieve."},
  {title:"Auto-Suggestion",quote:"You are the master of your destiny. You can influence, direct and control your own environment. You can make your life what you want it to be."},
  {title:"Specialized Knowledge",quote:"An educated man is not, necessarily, one who has an abundance of general or specialized knowledge. An educated man is one who has so developed the faculties of his mind that he may acquire anything he wants."},
  {title:"Imagination",quote:"First comes thought; then organization of that thought into ideas and plans; then transformation of those plans into reality."},
  {title:"Organized Planning",quote:"Create a definite plan for carrying out your desire and begin at once, whether you are ready or not, to put this plan into action."},
  {title:"Decision",quote:"Successful people make decisions quickly and change them slowly. Unsuccessful people make decisions slowly and change them quickly."},
  {title:"Persistence",quote:"Patience, persistence and perspiration make an unbeatable combination for success."},
  {title:"Mastermind",quote:"No two minds ever come together without thereby creating a third, invisible intangible force, which may be likened to a third mind."},
  {title:"Transmutation",quote:"The emotion of love brings out and develops the artistic and the aesthetic nature of man. It leaves its impress upon one's very soul even after the fire has been subdued by time."},
  {title:"The Subconscious Mind",quote:"The subconscious mind makes no distinction between constructive and destructive thought impulses. It works with the material we feed it."},
  {title:"The Brain",quote:"Your brain is a broadcasting and receiving station for the vibration of thought. Tune it to the right frequency."},
  {title:"The Sixth Sense",quote:"The sixth sense is that portion of the subconscious mind referred to as the Creative Imagination. It is also the medium of contact between the finite mind of man and Infinite Intelligence."},
  {title:"Enthusiasm",quote:"Enthusiasm is the steam that drives the engine. It is the important ingredient in almost everything you do."},
  {title:"Self-Discipline",quote:"Self-discipline begins with the mastery of your thoughts. If you don't control what you think, you can't control what you do."},
  {title:"Applied Faith",quote:"Faith is the only known antidote for failure. It is the starting point of all accumulation of riches."},
  {title:"Going the Extra Mile",quote:"The man who does more than he is paid for will soon be paid for more than he does. There are no limitations to the mind except those we acknowledge."},
  {title:"Pleasing Personality",quote:"Your personality is your greatest asset or your greatest liability. It embraces everything you control — your mind, body, and soul."},
  {title:"Personal Initiative",quote:"Do not wait; the time will never be just right. Start where you stand, and work with whatever tools you may have at your command, and better tools will be found as you go along."},
  {title:"Teamwork",quote:"It is literally true that you can succeed best and quickest by helping others to succeed."},
  {title:"Learning from Adversity",quote:"Every adversity, every failure, every heartache carries with it the seed of an equal or greater benefit."},
  {title:"Creative Vision",quote:"The imagination is literally the workshop wherein are fashioned all plans created by man. Impulse, desire is given shape, form and action through the aid of the imaginative faculty of the mind."},
  {title:"Accurate Thinking",quote:"Think twice before you speak, because your words and influence will plant the seed of either success or failure in the mind of another."},
  {title:"Controlled Attention",quote:"Reduce your plan to writing. The moment you complete this, you will have definitely given concrete form to the intangible desire."},
  {title:"Budgeting Time and Money",quote:"Plan your work and work your plan. Chaos is the enemy of the person who aspires to take control of their own destiny."},
  {title:"Physical Health",quote:"Sound health begins with a sound health consciousness, just as financial success begins with a prosperity consciousness."},
  {title:"Cosmic Habit Force",quote:"Every living thing below the level of man is under the absolute control of the habit of nature from which there is neither escape nor freedom. Man alone has been given the power to control his habit."},
  {title:"Burning Desire",quote:"Desire is the starting point of all achievement, not a hope, not a wish, but a keen pulsating desire which transcends everything."},
  {title:"Success Consciousness",quote:"Success comes to those who become SUCCESS CONSCIOUS. Failure comes to those who indifferently allow themselves to become FAILURE CONSCIOUS."},
  {title:"Opportunity",quote:"Opportunity often comes disguised in the form of misfortune, or temporary defeat."},
  {title:"The Power of the Mind",quote:"The mind is everything. What you think, you become. Your mind is the only thing over which you have complete and unchallengeable control."},
  {title:"Overcoming Fear",quote:"There are six basic fears with which every human suffers at one time or another. Most people are born with the fear of poverty and the fear of death. The other four are acquired."},
  {title:"Riches",quote:"Riches do not respond to wishes. They respond only to definite plans, backed by definite desires, through constant persistence."},
  {title:"Action",quote:"A goal is a dream with a deadline. An idea that is developed and put into action is more important than an idea that exists only as an idea."},
  {title:"The Ladder of Success",quote:"The ladder of success is never crowded at the top. Most people give up just when they're about to achieve success."},
  {title:"Gratitude",quote:"Develop an attitude of gratitude, and give thanks for everything that happens to you, knowing that every step forward is a step toward achieving something bigger than your current situation."},
  {title:"Vision",quote:"Hold a picture of yourself long and steadily enough in your mind's eye, and you will be drawn toward it. Picture clearly and confidently what you want to be, and that mental image will become reality."},
  {title:"Self-Belief",quote:"If you do not conquer self, you will be conquered by self. Your only real limitation is the one you set up in your own mind."},
  {title:"Daily Habits",quote:"Whatever you want in life, start each day by asking yourself: what one thing can I do today that moves me closer to my definite major purpose?"},
  {title:"Wealth",quote:"Both poverty and riches are the offspring of thought. You can think your way to financial freedom just as surely as you can think your way to failure."},
  {title:"Influence",quote:"When you close the door of your mind to negative thoughts, the door of opportunity opens to you. Your mind attracts exactly what it dwells upon most."},
  {title:"Purpose",quote:"A goal is a dream with a deadline. The person with a definite purpose and a burning desire never lacks energy or resourcefulness."},
  {title:"Character",quote:"Great achievement is usually born of great sacrifice, and is never the result of selfishness. Character is the sum of your habits and choices."},
  {title:"Mastermind Power",quote:"The accumulation of great fortunes calls for power, and power is acquired through highly organized and intelligently directed specialized knowledge."},
  {title:"Responsibility",quote:"You are where you are because of who you are. Everything that exists in your life exists because of you — your thoughts, decisions, and actions."},
  {title:"Time",quote:"Time is the most precious resource — it is the only one that cannot be replenished once spent. Invest it wisely in your definite chief aim."},
  {title:"Leadership",quote:"A genius is simply one who has taken the time to know himself thoroughly. Real leadership is knowing yourself first, then inspiring others to know themselves."},
  {title:"Habit Force",quote:"The habit of doing more than you are paid for, giving more in service than you receive in pay, is a habit that brings compound interest to the soul."},
  {title:"Service",quote:"You can always become the person you would have liked to be. Life's greatest rewards are reserved for those who demonstrate a never-ending commitment to act until they achieve."},
  {title:"The Master Key",quote:"The key to success is to focus our conscious mind on things we desire, not things we fear. When you think about what you want and work toward it, you will attract it."},
];

const LB_TIERS=[
  {val:.25,label:'25¢',bg:'#f0fce8',tc:'#3a6b10'},{val:.5,label:'50¢',bg:'#e5f8d4',tc:'#326010'},
  {val:.75,label:'75¢',bg:'#d9f3c0',tc:'#2a5510'},{val:1,label:'$1',bg:'#ceeead',tc:'#224a0e'},
  {val:1.5,label:'$1.50',bg:'#c3e99a',tc:'#1a3f0c'},{val:2,label:'$2',bg:'#b8e487',tc:'#143309'},
  {val:3,label:'$3',bg:'#a9dc6e',tc:'#0e2807'},{val:4,label:'$4',bg:'#98d255',tc:'#091e05'},
  {val:5,label:'$5',bg:'#86c83c',tc:'#051303'},{val:7.5,label:'$7.50',bg:'#72bb22',tc:'#030901'},
  {val:10,label:'$10',bg:'#E6F1FB',tc:'#0C447C'},{val:15,label:'$15',bg:'#cce3f7',tc:'#093d6e'},
  {val:25,label:'$25',bg:'#b3d6f3',tc:'#063360'},{val:50,label:'$50',bg:'#80b8eb',tc:'#042b52'},
  {val:75,label:'$75',bg:'#4d9ae3',tc:'#022344'},{val:100,label:'$100',bg:'#FAEEDA',tc:'#633806'},
  {val:150,label:'$150',bg:'#f5e0b8',tc:'#5a3104'},{val:200,label:'$200',bg:'#f0d296',tc:'#513003'},
  {val:250,label:'$250',bg:'#ebc474',tc:'#482f02'},{val:300,label:'$300',bg:'#e6b652',tc:'#3f2e01'},
  {val:400,label:'$400',bg:'#e1a830',tc:'#362d00'},{val:500,label:'$500',bg:'#dc9a0e',tc:'#2d2c00'},
  {val:750,label:'$750',bg:'#d78c00',tc:'#241b00'},{val:1000,label:'$1K',bg:'#c87f00',tc:'#1b0a00'},
  {val:2000,label:'$2K',bg:'#b87200',tc:'#120000'},
];
const CAT_LB={SM:2,RR:3,WK:5,FM:1.5,EX:2,HC:.5,FR:1,SP:2.5,DR:1,MI:.25};
const REWARDS=[
  {ico:'💆',name:'Chair Massage at Mall',desc:'30-min chair massage',cost:30},
  {ico:'😂',name:'Comedy Show',desc:'Live stand-up night',cost:50},
  {ico:'🎭',name:'Theater / Play',desc:'Live performance',cost:75},
  {ico:'🏍️',name:'ATV Rental',desc:'Half-day adventure',cost:150},
  {ico:'🍕',name:'Family Pizza Night',desc:'Pizza for the family',cost:20},
  {ico:'🍦',name:'Ice Cream Outing',desc:'Ice cream treat',cost:8},
  {ico:'🎬',name:'Movie Night Out',desc:'Cinema with family',cost:35},
  {ico:'🎮',name:'Arcade / Gaming',desc:'Dave & Busters',cost:25},
  {ico:'🍣',name:'Sushi Dinner',desc:'Nice dinner out',cost:60},
  {ico:'⛳',name:'Golf Round',desc:'18 holes at the course',cost:80},
  {ico:'🏖️',name:'Beach Day Trip',desc:'Full day at the beach',cost:45},
  {ico:'🎯',name:'Escape Room',desc:'60-min escape room',cost:30},
  {ico:'🏊',name:'Waterpark Day',desc:'Full day at waterpark',cost:120},
  {ico:'🛒',name:'Shopping Spree',desc:'Personal clothes budget',cost:100},
  {ico:'✈️',name:'Weekend Getaway',desc:'2-night mini vacation',cost:500},
  {ico:'🎸',name:'Concert',desc:'Live music show',cost:75},
  {ico:'🥩',name:'Steakhouse Dinner',desc:'Premium dinner',cost:85},
  {ico:'🏋️',name:'Gym Month',desc:'One month membership',cost:40},
  {ico:'🎁',name:'Surprise Family Gift',desc:'Gift for the family',cost:50},
  {ico:'🧖',name:'Spa Half Day',desc:'Spa treatment package',cost:120},
];

const PURP_QS=[
  {id:'values',q:'What are your top 5 core values?',hint:'Faith, family, freedom, growth, integrity, service — what principles guide your decisions?'},
  {id:'gifts',q:'What are your unique gifts and natural strengths?',hint:'What do people always come to you for? What do you do better than most without much effort?'},
  {id:'passion',q:'What lights you up — what would you do even if unpaid?',hint:'Activities, causes, or conversations that give you energy rather than drain it.'},
  {id:'legacy',q:'What legacy do you want to leave behind?',hint:'How do you want to be remembered by your children, your community, and those you served?'},
  {id:'impact',q:'What problem in the world do you feel called to help solve?',hint:'What injustice, need, or gap do you see that you are personally called to address?'},
  {id:'family_role',q:'What kind of husband, father, and man do you want to be?',hint:'Describe your ideal self with Vanessa, your children, your sponsees, and your sponsor Jim.'},
  {id:'ideal_day',q:'Describe your ideal day 5 years from now in detail.',hint:'Where do you wake up? What do you do first? Who are you with? What have you built?'},
  {id:'obstacles',q:'What are your biggest internal obstacles right now?',hint:'What fears, habits, or beliefs are currently standing between you and your vision?'},
  {id:'mission',q:'Write your Personal Mission Statement.',hint:'One to three sentences. Why you exist, who you serve, and how. Start with: "My mission is to..."'},
  {id:'purpose',q:'Write your Life Purpose Statement — one sentence.',hint:'The core reason you are here. Often starts with a verb: to inspire, to build, to heal, to lead...'},
];

const SLOTS=[{id:1,label:'Slot 1',time:'5–9am'},{id:2,label:'Slot 2',time:'9am–1pm'},{id:3,label:'Slot 3',time:'1–5pm'},{id:4,label:'Slot 4',time:'5–9pm'},{id:5,label:'Slot 5',time:'9–11pm'},{id:6,label:'Slot 6',time:'Float'}];
const STAT_OPTS=['— to do','In progress','Done','Skipped'];
const WHO_GRP=[{g:'Children',n:['Ever','Sofi','Joshua','Dominic','Angie']},{g:'Wife',n:['Vanessa']},{g:'Family',n:['Mami Lopez','Mami Silva','Dad','Papa','Serena','Tio Nano','Tio Mauri','Tio Carlos','Primo Daniel','Aunt Kathy','Cousins','Tio Joe','Tita Ale','Jojo','Mia','Anastasia','Uncle Charlie']},{g:'Sponsees',n:['Mickael','Chris','Louis','Mohamed Iran']},{g:'Sponsor',n:['Jim']}];
const FRIEND_ACTIONS=['Call','Text','FaceTime','Meet up','Check-in','Pray for','Plan hangout'];
const SPONSEE_ACTIONS=['Call','Text','FaceTime','Check-in','Step work — Step 1','Step work — Step 2','Step work — Step 3','Step work — Step 4','Step work — Step 5','Step work — Step 6','Step work — Step 7','Step work — Step 8','Step work — Step 9','Step work — Step 10','Step work — Step 11','Step work — Step 12','Big Book','Prayer call','Meeting invite'];
const DEFAULT_ACTION_LISTS={SM:['Napoleon Hill boot log','Prayer — 6 min','Prayer — 15 min','Write with God — 4 min','Meditation','Gratitude list','Bible reading','YouTube sermon','Audiobook','Conscious contact','Morning devotional'],RR:['Contact sponsee — Mickael','Contact sponsee — Chris','Contact sponsee — Louis','Contact sponsee — Mohamed Iran','Contact sponsor — Jim','Attend AA meeting','Attend PAA meeting','Step work — Step 1','Step work — Step 2','Step work — Step 3','Step work — Step 4','Step work — Step 5','Step work — Step 6','Step work — Step 7','Step work — Step 8','Step work — Step 9','Step work — Step 10','Step work — Step 11','Step work — Step 12','Read Big Book','Service','Fellowship call'],WK:['Call all EST leads','Call all PST leads','Text all P0 leads','Text all P1 leads','Follow up client','Admin tasks','Boss check-in','Presentation prep','CRM update','Report','Prospecting','Team check-in','Training','Pipeline review'],FM:['Set up laptop for Ever','Make lunch','Make dinner','Prep nighttime snack','Talk time','Play time','Call / FaceTime','WU $100 — Serena','Family prayer','Movie night','Date night — Vanessa','Help with homework','Drop off / Pick up','Read together','Game night'],EX:['Squats','Sit-ups','Push-ups','Curls','Military press','Triceps','Gym session','Run','Walk','Bike','Stretch','Yoga','Pull-ups','Bench press','Deadlifts','Cardio','Plank','Lunges','Shoulder press','Rows','Golf'],HC:['Vacuum','Dishes','Counters','Tuesday trash','BR trash','Garage trash','Garage tidy','Living room tidy','Bedroom tidy','Set dinner table','Cook dinner','Prep dinner','Prep lunch','Prep snacks','Prep nighttime snack','Yard work','Home repair','Laundry','Mop','Clean bathroom','Grocery run'],FR:['Call','Text','FaceTime','Meet up','Check-in','Pray for','Plan hangout','Coffee','Lunch','Catch up'],SP:['Call — Mickael','Call — Chris','Call — Louis','Call — Mohamed Iran','Text','FaceTime','Step work — Step 1','Step work — Step 2','Step work — Step 3','Step work — Step 4','Step work — Step 5','Step work — Step 6','Step work — Step 7','Step work — Step 8','Step work — Step 9','Step work — Step 10','Step work — Step 11','Step work — Step 12','Big Book','Prayer call','Meeting invite'],DR:['Dentist appointment','Doctor appointment','Follow up call','Pick up prescription','Lab work','Specialist visit','Eye doctor','Telehealth'],MI:['Errand','Phone call','Email','Research','Planning','Grocery run','Bill payment','Car maintenance','Bank run','Other']};

const mkTask=(code,name,slot,extra={})=>({code,name,slot,status:'— to do',exactTime:'',taskDate:'',...extra});
const DEFAULT_CATS=[
  {id:'SM',label:'Spiritual Maintenance',color:T.purple,bg:T.purBg,tc:T.purDk,type:'standard',tasks:[mkTask('SM1','Napoleon Hill boot log',1,{daily:true}),mkTask('SM2','Prayer — 6 min',1),mkTask('SM3','Write with God — 4 min',1)]},
  {id:'RR',label:'Recovery',color:T.teal,bg:T.teaBg,tc:T.teaDk,type:'standard',tasks:[mkTask('R1','Contact sponsee — Mickael',6),mkTask('R2','Contact sponsor — Jim',6),mkTask('R3','Attend AA meeting',6)]},
  {id:'WK',label:'Work',color:T.blue,bg:T.b50,tc:T.navyDk,type:'standard',tasks:[mkTask('W1','Call all EST leads',2),mkTask('W2','Call all PST leads',3),mkTask('W3','Text all P0 leads',4),mkTask('W4','Text all P1 leads',5)]},
  {id:'FM',label:'Family',color:T.coral,bg:T.corBg,tc:T.corDk,type:'family',tasks:[mkTask('F1','Set up laptop for Ever',3,{exactTime:'15:00',who:'Ever',taskDate:''}),mkTask('F2','Make lunch',6,{who:''}),mkTask('F3','Make dinner',6,{who:''}),mkTask('F4','Nighttime snack',6,{who:'All'}),mkTask('F5','Talk time',6,{who:''}),mkTask('F6','Play time',6,{who:''}),mkTask('F7','Call / FaceTime',6,{who:''}),mkTask('F9','WU $100 — Serena',6,{who:'Serena'})]},
  {id:'EX',label:'Exercise',color:T.grn,bg:T.grnBg,tc:T.grnDk,type:'exercise',myWeight:'',tasks:[mkTask('EX1','Squats',6,{sets:'',reps:'',lbs:''}),mkTask('EX2','Sit-ups',6,{sets:'',reps:'',lbs:''}),mkTask('EX3','Push-ups',6,{sets:'',reps:'',lbs:''}),mkTask('EX4','Curls',6,{sets:'',reps:'',lbs:''}),mkTask('EX5','Military press',6,{sets:'',reps:'',lbs:''}),mkTask('EX6','Triceps',6,{sets:'',reps:'',lbs:''})]},
  {id:'HC',label:'Home Chores',color:T.amb,bg:T.ambBg,tc:T.ambDk,type:'standard',tasks:['Vacuum','Dishes','Counters','Tuesday trash','BR trash','Garage trash','Garage tidy','Living room tidy','BR tidy','Set dinner table','Cook dinner','Prep dinner','Prep lunch','Prep snacks','Prep nighttime snack','Yard work','Home repair'].map((n,i)=>mkTask('HC'+(i+1),n,2))},
  {id:'FR',label:'Friends',color:T.pink,bg:T.pnkBg,tc:T.pnkDk,type:'friends',tasks:[]},
  {id:'SP',label:'Sponsees',color:T.teal,bg:T.teaBg,tc:T.teaDk,type:'sponsees',tasks:[mkTask('SP1','Call — Mickael',1,{who:'Mickael'}),mkTask('SP2','Call — Chris',1,{who:'Chris'}),mkTask('SP3','Call — Louis',1,{who:'Louis'}),mkTask('SP4','Call — Mohamed Iran',1,{who:'Mohamed Iran'})]},
  {id:'DR',label:'Doctors / Dentists',color:T.navy,bg:T.b50,tc:T.navyDk,type:'standard',tasks:[mkTask('D1','Dentist appointment',3,{exactTime:'14:00',taskDate:'2026-05-11'})]},
  {id:'MI',label:'Misc / Other',color:T.gray,bg:T.gryBg,tc:T.gryDk,type:'misc',tasks:[]},
];

function todayKey(){return 'db:'+new Date().toISOString().split('T')[0];}
function getMon(ds){const d=new Date(ds||new Date());const day=d.getDay();const diff=d.getDate()-day+(day===0?-6:1);return new Date(new Date(ds||new Date()).setDate(diff));}
function addWeeks(date,w){const d=new Date(date);d.setDate(d.getDate()+w*7);return d;}
function fmtDate(d){try{return new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});}catch{return '';}}
function fmtShort(d){try{return new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric'});}catch{return '';}}

const AC_TZ={};
[201,202,203,207,212,215,216,229,231,239,240,267,272,276,301,302,304,305,315,321,330,336,347,351,352,386,401,404,407,410,412,413,423,434,440,443,470,478,484,516,518,540,551,561,570,571,585,607,609,610,614,617,631,646,678,703,704,706,717,718,727,732,757,770,772,781,786,803,804,813,814,828,843,845,850,856,857,859,862,864,904,908,910,912,914,929,941,954,973,978,980,984].forEach(c=>AC_TZ[c]='EST');
[205,210,214,228,251,254,256,262,270,281,312,314,316,318,334,361,402,405,409,414,417,501,502,504,507,512,515,563,573,580,601,608,612,618,630,636,641,651,660,662,682,708,713,715,731,763,769,773,785,806,830,832,870,901,903,913,920,936,940,956,972,979].forEach(c=>AC_TZ[c]='CST');
[208,303,307,385,406,435,480,505,575,602,623,720,801,928].forEach(c=>AC_TZ[c]='MST');
[206,209,213,253,310,323,360,408,415,424,425,442,503,510,530,541,559,619,626,650,657,661,707,714,747,760,775,805,818,831,858,909,916,925,949,951].forEach(c=>AC_TZ[c]='PST');
[808].forEach(c=>AC_TZ[c]='HST');
function getTZ(p){const d=(p||'').replace(/\D/g,'');let a;if(d.startsWith('1')&&d.length>=11)a=+d.substring(1,4);else if(d.length>=10)a=+d.substring(0,3);return a?(AC_TZ[a]||'INT'):'INT';}
const TZ_CLR={EST:'#185FA5',CST:'#534AB7',MST:'#854F0B',PST:'#27500A',HST:'#085041',INT:'#5F5E5A'};
function statusBg(s){return s==='Done'?{bg:'#E1F5EE',tc:'#085041'}:s==='Skipped'?{bg:'#FCEBEB',tc:'#791F1F'}:s==='In progress'?{bg:'#FAEEDA',tc:'#633806'}:{bg:'#F1EFE8',tc:'#444441'};}

function Btn({onClick,color,children,style={}}){return <button onClick={onClick} style={{fontSize:12,padding:'5px 12px',borderRadius:7,border:'none',background:color||T.navy,color:'white',cursor:'pointer',fontWeight:500,...style}}>{children}</button>;}
function SlotSel({val,onChange}){return <select value={val} onChange={e=>onChange(+e.target.value)} style={{fontSize:11,padding:'3px 4px',borderRadius:6,border:'0.5px solid '+T.b100,background:'white',cursor:'pointer',width:'100%'}}>{SLOTS.map(s=><option key={s.id} value={s.id}>{s.label}·{s.time}</option>)}</select>;}
function StatSel({val,onChange}){const c=statusBg(val);return <select value={val} onChange={e=>onChange(e.target.value)} style={{fontSize:11,padding:'3px 4px',borderRadius:6,border:'0.5px solid '+T.b100,background:c.bg,color:c.tc,cursor:'pointer',width:'100%'}}>{STAT_OPTS.map(s=><option key={s} value={s}>{s}</option>)}</select>;}
function WhoSel({val,onChange}){return <select value={val} onChange={e=>onChange(e.target.value)} style={{fontSize:11,padding:'3px 4px',borderRadius:6,border:'0.5px solid '+T.b100,background:'white',cursor:'pointer',width:'100%'}}><option value="">— who</option><option>All</option><option>Any</option><option>N/A</option>{WHO_GRP.map(g=><optgroup key={g.g} label={g.g}>{g.n.map(n=><option key={n} value={n}>{n}</option>)}</optgroup>)}</select>;}
function TimeIn({val,onChange}){return <input type="time" value={val||''} onChange={e=>onChange(e.target.value)} style={{fontSize:10,padding:'3px 2px',borderRadius:5,border:'0.5px solid '+T.b100,width:'100%'}}/>;}
function DateIn({val,onChange}){return <input type="date" value={val||''} onChange={e=>onChange(e.target.value)} style={{fontSize:10,padding:'3px 2px',borderRadius:5,border:'0.5px solid '+T.b100,width:'100%'}}/>;}
function ColHdr({cols,grid}){return <div style={{display:'grid',gridTemplateColumns:grid,padding:'4px 10px',background:'#e8f4ff',borderTop:'0.5px solid '+T.b100,gap:3}}>{cols.map(c=><span key={c} style={{fontSize:9,fontWeight:600,color:T.navyLt,textTransform:'uppercase',letterSpacing:'.05em'}}>{c}</span>)}</div>;}
function ActionSel({catId,val,onChange,actionLists}){
  const list=actionLists[catId]||DEFAULT_ACTION_LISTS[catId]||[];
  const crmLeads=catId==='WK'?(window._crmLeads||[]).slice(0,50):[];
  return <select value={val} onChange={e=>{if(e.target.value==='__add__'){const v=prompt('New action:');if(v&&v.trim()){onChange('__add__',v.trim());}}else onChange(e.target.value);}} style={{fontSize:11,padding:'3px 4px',borderRadius:6,border:'0.5px solid '+T.b100,background:'white',cursor:'pointer',width:'100%'}}>
    <option value="">— select action</option>
    {list.map(a=><option key={a} value={a}>{a}</option>)}
    {crmLeads.length>0&&<optgroup label="CRM Clients">{crmLeads.map(n=><option key={n} value={'Follow up — '+n}>Follow up — {n}</option>)}</optgroup>}
    <option value="__add__">✚ Add new action...</option>
  </select>;
}

function CatBlock({cat,updateCat,collapsed,toggleCollapse,actionLists,setActionLists,onTaskComplete}){
  const upTask=(idx,f,v)=>{const tasks=[...cat.tasks];tasks[idx]={...tasks[idx],[f]:v};
    if(f==='status'&&v==='Done'&&tasks[idx].status!=='Done')onTaskComplete(cat.id,tasks[idx].name);
    updateCat({...cat,tasks});};
  const addTask=()=>updateCat({...cat,tasks:[...cat.tasks,mkTask(cat.id+'_'+(cat.tasks.length+1),'',6)]});
  const removeTask=idx=>{if(!confirm('Remove task?'))return;updateCat({...cat,tasks:cat.tasks.filter((_,i)=>i!==idx)});};
  const handleAction=(idx,val,newName)=>{
    if(val==='__add__'&&newName){
      const nl={...actionLists,[cat.id]:[...(actionLists[cat.id]||DEFAULT_ACTION_LISTS[cat.id]||[]),newName]};
      setActionLists(nl);sSet('actionLists',nl);
      upTask(idx,'name',newName);
    } else upTask(idx,'name',val);
  };
  const done=cat.tasks.filter(t=>t.status==='Done').length;
  const lbVal=CAT_LB[cat.id]||0.5;
  const rowStyle=(t)=>({display:'grid',alignItems:'center',padding:'5px 10px',borderTop:'0.5px solid '+T.b100,background:t.status==='Done'?'#f8fff8':t.status==='Skipped'?'#fff8f8':'white',gap:3,opacity:t.status==='Skipped'?.6:1});

  return <div id={'cat-'+cat.id} style={{marginBottom:10,borderRadius:12,border:'0.5px solid '+T.b100,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.04)'}}>
    <div style={{background:cat.bg,padding:'8px 12px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}} onClick={()=>toggleCollapse(cat.id)}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:8,height:8,borderRadius:4,background:cat.color}}/>
        <span style={{fontSize:12,fontWeight:600,color:cat.tc,letterSpacing:'.04em',textTransform:'uppercase'}}>{cat.label}</span>
        {cat.tasks.length>0&&<span style={{fontSize:10,background:cat.color+'33',color:cat.tc,padding:'1px 6px',borderRadius:8}}>{done}/{cat.tasks.length}</span>}
        <span style={{fontSize:10,background:'#FFF8E1',color:'#B8860B',padding:'1px 6px',borderRadius:8}}>💎{lbVal}/task</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <button onClick={e=>{e.stopPropagation();addTask();}} style={{fontSize:11,padding:'2px 8px',borderRadius:5,border:'0.5px solid '+cat.tc+'44',background:'transparent',color:cat.tc,cursor:'pointer'}}>+ task</button>
        <span style={{fontSize:12,color:cat.tc}}>{collapsed?'▸':'▾'}</span>
      </div>
    </div>
    {!collapsed&&<>
      {cat.type==='exercise'&&<div style={{padding:'6px 10px',borderTop:'0.5px solid '+T.b100,background:'#f5fff5',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:11,color:T.grnDk}}>My weight today (lbs):</span>
        <input type="number" value={cat.myWeight||''} onChange={e=>updateCat({...cat,myWeight:e.target.value})} placeholder="—" style={{width:70,fontSize:11,padding:'3px 6px',borderRadius:5,border:'0.5px solid '+T.b100}}/>
      </div>}
      {(cat.type==='standard'||cat.type==='misc')&&<>
        <ColHdr cols={['Action','Time Slot','Apt Time','Date','Status','']} grid="38% 18% 12% 12% 15% 5%"/>
        {cat.tasks.map((t,i)=><div key={i} style={{...rowStyle(t),gridTemplateColumns:'38% 18% 12% 12% 15% 5%'}}>
          {cat.type==='misc'
            ?<input value={t.name||''} onChange={e=>upTask(i,'name',e.target.value)} placeholder="Type task..." style={{fontSize:12,padding:'4px 6px',borderRadius:5,border:'0.5px solid '+T.b100,width:'100%'}}/>
            :<ActionSel catId={cat.id} val={t.name||''} onChange={(v,n)=>handleAction(i,v,n)} actionLists={actionLists}/>}
          <SlotSel val={t.slot} onChange={v=>upTask(i,'slot',v)}/>
          <TimeIn val={t.exactTime} onChange={v=>upTask(i,'exactTime',v)}/>
          <DateIn val={t.taskDate} onChange={v=>upTask(i,'taskDate',v)}/>
          <StatSel val={t.status} onChange={v=>{const tasks=[...cat.tasks];const prev=tasks[i].status;tasks[i]={...tasks[i],status:v};if(v==='Done'&&prev!=='Done')onTaskComplete(cat.id,tasks[i].name);updateCat({...cat,tasks});}}/>
          <button onClick={()=>removeTask(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:0}}>✕</button>
        </div>)}
      </>}
      {cat.type==='family'&&<>
        <ColHdr cols={['Action','Who','Time Slot','Apt Time','Date','Status','']} grid="30% 18% 16% 10% 10% 11% 5%"/>
        {cat.tasks.map((t,i)=><div key={i} style={{...rowStyle(t),gridTemplateColumns:'30% 18% 16% 10% 10% 11% 5%'}}>
          <ActionSel catId={cat.id} val={t.name||''} onChange={(v,n)=>handleAction(i,v,n)} actionLists={actionLists}/>
          <WhoSel val={t.who||''} onChange={v=>upTask(i,'who',v)}/>
          <SlotSel val={t.slot} onChange={v=>upTask(i,'slot',v)}/>
          <TimeIn val={t.exactTime} onChange={v=>upTask(i,'exactTime',v)}/>
          <DateIn val={t.taskDate} onChange={v=>upTask(i,'taskDate',v)}/>
          <StatSel val={t.status} onChange={v=>{const tasks=[...cat.tasks];const prev=tasks[i].status;tasks[i]={...tasks[i],status:v};if(v==='Done'&&prev!=='Done')onTaskComplete(cat.id,tasks[i].name);updateCat({...cat,tasks});}}/>
          <button onClick={()=>removeTask(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:0}}>✕</button>
        </div>)}
      </>}
      {(cat.type==='friends'||cat.type==='sponsees')&&<>
        <ColHdr cols={['Action','Who','Time Slot','Apt Time','Date','Status','']} grid="30% 18% 16% 10% 10% 11% 5%"/>
        {cat.tasks.map((t,i)=><div key={i} style={{...rowStyle(t),gridTemplateColumns:'30% 18% 16% 10% 10% 11% 5%'}}>
          <ActionSel catId={cat.id} val={t.name||''} onChange={(v,n)=>handleAction(i,v,n)} actionLists={actionLists}/>
          <WhoSel val={t.who||''} onChange={v=>upTask(i,'who',v)}/>
          <SlotSel val={t.slot} onChange={v=>upTask(i,'slot',v)}/>
          <TimeIn val={t.exactTime} onChange={v=>upTask(i,'exactTime',v)}/>
          <DateIn val={t.taskDate} onChange={v=>upTask(i,'taskDate',v)}/>
          <StatSel val={t.status} onChange={v=>{const tasks=[...cat.tasks];const prev=tasks[i].status;tasks[i]={...tasks[i],status:v};if(v==='Done'&&prev!=='Done')onTaskComplete(cat.id,tasks[i].name);updateCat({...cat,tasks});}}/>
          <button onClick={()=>removeTask(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:0}}>✕</button>
        </div>)}
      </>}
      {cat.type==='exercise'&&<>
        <ColHdr cols={['Action','Sets','Reps','Lbs','Time Slot','Apt Time','Date','Status','']} grid="22% 7% 7% 7% 15% 10% 10% 17% 5%"/>
        {cat.tasks.map((t,i)=><div key={i} style={{...rowStyle(t),gridTemplateColumns:'22% 7% 7% 7% 15% 10% 10% 17% 5%'}}>
          <ActionSel catId={cat.id} val={t.name||''} onChange={(v,n)=>handleAction(i,v,n)} actionLists={actionLists}/>
          {['sets','reps','lbs'].map(f=><input key={f} type="number" value={t[f]||''} onChange={e=>upTask(i,f,e.target.value)} placeholder="—" style={{fontSize:11,padding:'3px 4px',borderRadius:5,border:'0.5px solid '+T.b100,textAlign:'center',width:'100%'}}/>)}
          <SlotSel val={t.slot} onChange={v=>upTask(i,'slot',v)}/>
          <TimeIn val={t.exactTime} onChange={v=>upTask(i,'exactTime',v)}/>
          <DateIn val={t.taskDate} onChange={v=>upTask(i,'taskDate',v)}/>
          <StatSel val={t.status} onChange={v=>{const tasks=[...cat.tasks];const prev=tasks[i].status;tasks[i]={...tasks[i],status:v};if(v==='Done'&&prev!=='Done')onTaskComplete(cat.id,tasks[i].name);updateCat({...cat,tasks});}}/>
          <button onClick={()=>removeTask(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:0}}>✕</button>
        </div>)}
      </>}
    </>}
  </div>;
}

function DayBuildTab({cats,setCats,save,lb,setLb,actionLists,setActionLists}){
  const [collapsed,setCollapsed]=useState({});
  const toggle=id=>setCollapsed(p=>({...p,[id]:!p[id]}));
  const updateCat=useCallback(cat=>setCats(p=>p.map(c=>c.id===cat.id?cat:c)),[setCats]);
  const handleComplete=(catId,taskName)=>{
    const reward=CAT_LB[catId]||0.5;
    const newLb={...lb,balance:+(lb.balance+reward).toFixed(2),totalEarned:+(lb.totalEarned+reward).toFixed(2),ledger:[{type:'earn',amount:reward,desc:'✅ '+taskName,date:new Date().toLocaleDateString()},...lb.ledger].slice(0,100)};
    setLb(newLb);sSet('lifeBucks',newLb);
  };
  const total=cats.reduce((a,c)=>a+c.tasks.length,0);
  const done=cats.reduce((a,c)=>a+c.tasks.filter(t=>t.status==='Done').length,0);
  const pct=total?Math.round(done/total*100):0;
  const bySlot={};SLOTS.forEach(s=>bySlot[s.id]=[]);
  cats.forEach(cat=>cat.tasks.forEach(t=>{if(bySlot[t.slot])bySlot[t.slot].push({name:t.name||'—',color:cat.color,status:t.status,time:t.exactTime,date:t.taskDate});}));
  return <div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10,flexWrap:'wrap',gap:8}}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:13,color:T.navyLt,fontWeight:500}}>{done}/{total} done ({pct}%)</span>
        <div style={{width:90,height:7,background:'#e0e0e0',borderRadius:4,overflow:'hidden'}}><div style={{width:pct+'%',height:'100%',background:T.grn,borderRadius:4}}/></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:13,background:'#FFF8E1',color:'#B8860B',padding:'4px 10px',borderRadius:8,fontWeight:600}}>💎 {lb.balance.toFixed(2)} Life Bucks</span>
        <Btn onClick={save}>Save day ✓</Btn>
      </div>
    </div>
    <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:10}}>
      {cats.map(cat=><button key={cat.id} onClick={()=>document.getElementById('cat-'+cat.id)&&document.getElementById('cat-'+cat.id).scrollIntoView({behavior:'smooth'})} style={{fontSize:11,padding:'3px 10px',borderRadius:12,border:'0.5px solid '+cat.color,background:cat.bg,color:cat.tc,cursor:'pointer'}}>{cat.label}</button>)}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:7,marginBottom:14}}>
      {SLOTS.map(s=>{const items=bySlot[s.id]||[];
        return <div key={s.id} style={{background:s.id===6?'#FAEEDA':'white',border:'0.5px solid '+T.b100,borderRadius:9,padding:'8px 10px',minHeight:55}}>
          <div style={{fontSize:11,fontWeight:600,color:s.id===6?T.ambDk:T.navyLt,marginBottom:4,textTransform:'uppercase',letterSpacing:'.04em'}}>{s.label}·{s.time}</div>
          {items.length===0?<div style={{fontSize:10,color:'#bbb',fontStyle:'italic'}}>empty</div>:items.map((t,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:4,marginBottom:2}}>
            <div style={{width:5,height:5,borderRadius:'50%',background:t.color,opacity:t.status==='Done'?.3:1,flexShrink:0}}/>
            <span style={{fontSize:11,textDecoration:t.status==='Done'?'line-through':'none',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.name.length>22?t.name.substring(0,22)+'…':t.name}{t.time?' · '+t.time:''}{t.date?' 📅':''}</span>
          </div>)}
        </div>;
      })}
    </div>
    {cats.map(cat=><CatBlock key={cat.id} cat={cat} updateCat={updateCat} collapsed={!!collapsed[cat.id]} toggleCollapse={toggle} actionLists={actionLists} setActionLists={setActionLists} onTaskComplete={handleComplete}/>)}
  </div>;
}

function CRMTab({leads,setLeads,notes,setNotes,saveLeads,saveNotes}){
  const [srch,setSrch]=useState('');const [fLang,setFLang]=useState('');const [fTZ,setFTZ]=useState('');const [fTag,setFTag]=useState('');
  const [sortCol,setSortCol]=useState(0);const [sortAsc,setSortAsc]=useState(true);
  const [showImp,setShowImp]=useState(false);const [impTxt,setImpTxt]=useState('');
  const [selLead,setSelLead]=useState(null);const [noteEdit,setNoteEdit]=useState('');
  const allTags=[...new Set(leads.flatMap(r=>(r[2]||'').split(',').map(t=>t.trim()).filter(Boolean)))].sort();
  window._crmLeads=leads.map(r=>r[3]||'').filter(Boolean);
  let filtered=[...leads];
  if(srch)filtered=filtered.filter(r=>[r[0],r[1],r[2],r[5],r[6],r[8]].join(' ').toLowerCase().includes(srch.toLowerCase())||(notes[r[3]+r[5]]||'').toLowerCase().includes(srch.toLowerCase()));
  if(fLang)filtered=filtered.filter(r=>(r[3]||'').toLowerCase()===fLang.toLowerCase());
  if(fTZ)filtered=filtered.filter(r=>getTZ(r[1])===fTZ);
  if(fTag)filtered=filtered.filter(r=>(r[2]||'').split(',').map(t=>t.trim()).includes(fTag));
  filtered.sort((a,b)=>sortAsc?(a[sortCol]||'').localeCompare(b[sortCol]||''):(b[sortCol]||'').localeCompare(a[sortCol]||''));
  const hot=leads.filter(r=>(r[2]||'').toUpperCase().includes('HOT')).length;
  const appt=leads.filter(r=>(r[7]||'').toLowerCase().includes('appointment set')).length;
  const dead=leads.filter(r=>(r[2]||'').toUpperCase().includes('DEAD')).length;
  function doImport(){
    const raw=impTxt.trim();if(!raw)return;
    const lines=raw.split('\n').filter(l=>l.trim());const sep=lines[0].includes('\t')?'\t':',';
    const hdrs=lines[0].split(sep).map(h=>h.trim().replace(/"/g,'').toLowerCase());
    const fi=k=>hdrs.findIndex(h=>h.includes(k));
    const iN=fi('lead name'),iP=hdrs.findIndex(h=>h.includes('phone')&&!h.includes('secondary')),iT=fi('tag'),iL=fi('language'),iA=fi('appointment date');
    const iR=hdrs.findIndex(h=>h.includes('r1-resort name')&&!h.includes('id')&&!h.includes('r2'));
    const iLS=fi('lead status'),iCS=fi('status of call'),iE=fi('email');
    const g=(c,i)=>i>=0?(c[i]||'').replace(/"/g,'').trim():'—';
    const nr=[];
    for(let i=1;i<lines.length;i++){const c=lines[i].split(sep);if(c.length<3)continue;const nm=g(c,iN);if(!nm||nm==='—')continue;nr.push([g(c,iP),g(c,iT),g(c,iA),nm,g(c,iL),g(c,iP),g(c,iR),g(c,iLS),g(c,iCS),g(c,iE)]);}
    if(nr.length){setLeads(nr);saveLeads(nr);setShowImp(false);setImpTxt('');}
  }
  function openLead(lead){setSelLead(lead);setNoteEdit(notes[lead[3]+lead[5]]||'');}
  function saveNote(){if(!selLead)return;const k=selLead[3]+selLead[5];const n={...notes,[k]:noteEdit};setNotes(n);saveNotes(n);}
  function deleteLead(idx){if(!confirm('Delete this lead?'))return;const nl=leads.filter((_,i)=>i!==idx);setLeads(nl);saveLeads(nl);if(selLead&&leads[idx]===selLead)setSelLead(null);}
  const tagClr=tag=>{const t=(tag||'').toUpperCase();if(t.includes('HOT'))return{bg:'#FCEBEB',tc:'#791F1F'};if(t.includes('WARM'))return{bg:'#EAF3DE',tc:'#27500A'};if(t.includes('DEAD'))return{bg:'#F1EFE8',tc:'#444441'};if(t.includes('COLD'))return{bg:'#E6F1FB',tc:'#0C447C'};if(t.includes('NO SHOW'))return{bg:'#FBEAF0',tc:'#72243E'};return{bg:'#E6F1FB',tc:'#0C447C'};};
  const callClr=s=>{const sl=(s||'').toLowerCase();if(sl.includes('canceled')||sl.includes('no show'))return{bg:'#FBEAF0',tc:'#72243E'};if(sl.includes('set'))return{bg:'#E1F5EE',tc:'#085041'};return{bg:'#FAEEDA',tc:'#633806'};};
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:12}}>
      {[['Total',leads.length,'#E6F1FB','#0C447C'],['HOT',hot,'#FCEBEB','#791F1F'],['Appt Set',appt,'#E1F5EE','#085041'],['Dead',dead,'#F1EFE8','#444441']].map(([l,v,bg,tc])=><div key={l} style={{background:bg,borderRadius:8,padding:'10px 12px',border:'0.5px solid '+tc+'33'}}><div style={{fontSize:11,color:tc,marginBottom:3}}>{l}</div><div style={{fontSize:22,fontWeight:600,color:tc}}>{v}</div></div>)}
    </div>
    <div style={{background:'#E6F1FB',border:'0.5px solid '+T.b100,borderRadius:10,padding:10,marginBottom:10,display:'flex',flexWrap:'wrap',gap:7}}>
      <input value={srch} onChange={e=>setSrch(e.target.value)} placeholder="Search name, phone, resort, notes..." style={{flex:1,minWidth:160,fontSize:12,padding:'6px 10px',borderRadius:8,border:'0.5px solid '+T.b100}}/>
      <select value={fLang} onChange={e=>setFLang(e.target.value)} style={{fontSize:12,padding:'6px',borderRadius:8,border:'0.5px solid '+T.b100}}><option value="">All langs</option><option>English</option><option>Spanish</option></select>
      <select value={fTZ} onChange={e=>setFTZ(e.target.value)} style={{fontSize:12,padding:'6px',borderRadius:8,border:'0.5px solid '+T.b100}}><option value="">All TZ</option>{['EST','CST','MST','PST','HST','INT'].map(z=><option key={z}>{z}</option>)}</select>
      <select value={fTag} onChange={e=>setFTag(e.target.value)} style={{fontSize:12,padding:'6px',borderRadius:8,border:'0.5px solid '+T.b100}}><option value="">All tags</option>{allTags.map(t=><option key={t}>{t}</option>)}</select>
      <span style={{fontSize:11,color:T.navy,padding:'6px 10px',background:T.b100,borderRadius:8,fontWeight:600}}>{filtered.length} leads</span>
      <Btn onClick={()=>setShowImp(!showImp)}>+ Import</Btn>
      <Btn onClick={()=>{if(confirm('Clear ALL leads?')){setLeads([]);saveLeads([]);}}} color={T.red}>Clear all</Btn>
    </div>
    {showImp&&<div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:10,padding:14,marginBottom:10}}>
      <div style={{fontSize:13,fontWeight:600,color:T.navy,marginBottom:4}}>Paste exported TSV or CSV — first row = headers</div>
      <div style={{fontSize:11,color:T.navyLt,marginBottom:8}}>Auto-maps all fields. Empty rows skipped automatically.</div>
      <textarea value={impTxt} onChange={e=>setImpTxt(e.target.value)} style={{width:'100%',height:130,border:'0.5px solid '+T.b100,borderRadius:8,padding:8,fontSize:11,fontFamily:'monospace',resize:'vertical'}} placeholder="Paste here..."/>
      <div style={{display:'flex',gap:8,marginTop:8,justifyContent:'flex-end'}}>
        <Btn onClick={()=>setShowImp(false)} color={T.gray} style={{color:'#333'}}>Cancel</Btn>
        <Btn onClick={doImport}>Import &amp; save</Btn>
      </div>
    </div>}
    {selLead&&<div style={{background:'#f8fbff',border:'2px solid '+T.b100,borderRadius:12,padding:14,marginBottom:12}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
        <div><div style={{fontSize:15,fontWeight:600,color:T.navy}}>{selLead[3]}</div><a href={'tel:'+selLead[5]} style={{fontSize:13,color:T.navyLt}}>{selLead[5]} · {getTZ(selLead[5])}</a></div>
        <div style={{display:'flex',gap:7}}>
          <Btn onClick={()=>deleteLead(leads.indexOf(selLead))} color={T.red}>Delete</Btn>
          <Btn onClick={()=>setSelLead(null)} color={T.gray} style={{color:'#333'}}>Close</Btn>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginBottom:10}}>
        {[['Resort',selLead[6]],['Lead Status',selLead[7]],['Call Status',selLead[8]],['Language',selLead[4]],['Appointment',selLead[2]?selLead[2].substring(0,10):'—'],['Email',selLead[9]]].map(([l,v])=><div key={l} style={{background:'#E6F1FB',borderRadius:6,padding:'6px 8px'}}><div style={{fontSize:10,color:T.navyLt,marginBottom:2}}>{l}</div><div style={{color:T.navyDk,fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontSize:12}}>{l==='Email'?<a href={'mailto:'+v} style={{color:T.navyLt}}>{v||'—'}</a>:v||'—'}</div></div>)}
        <div style={{background:'#E6F1FB',borderRadius:6,padding:'6px 8px',gridColumn:'1/-1'}}><div style={{fontSize:10,color:T.navyLt,marginBottom:2}}>Tag</div><div style={{color:T.navyDk,fontWeight:500,fontSize:11,wordBreak:'break-word'}}>{selLead[1]||'—'}</div></div>
      </div>
      <div><div style={{fontSize:11,fontWeight:600,color:T.navy,marginBottom:4}}>Notes</div>
        <textarea value={noteEdit} onChange={e=>setNoteEdit(e.target.value)} style={{width:'100%',height:80,border:'0.5px solid '+T.b100,borderRadius:6,padding:6,fontSize:12,resize:'vertical'}} placeholder="Call notes, next steps, objections..."/>
        <Btn onClick={saveNote} color={T.grn} style={{marginTop:6}}>Save note</Btn>
      </div>
    </div>}
    <div style={{overflowX:'auto',borderRadius:10,border:'0.5px solid '+T.b100}}>
      <table style={{width:'100%',borderCollapse:'collapse',tableLayout:'fixed',minWidth:760}}>
        <thead><tr style={{background:T.navy}}>
          {[['Lead Name',0,16],['Phone',1,13],['TZ',null,5],['Tag',2,9],['Lang',4,5],['Appt',2,10],['Resort',6,16],['Lead Status',7,11],['Call Status',8,10]].map(([l,col,w])=><th key={l} onClick={col!=null?()=>{setSortCol(col);setSortAsc(p=>col===sortCol?!p:true);}:undefined} style={{padding:'8px 8px',textAlign:'left',fontSize:10,fontWeight:500,color:T.b100,cursor:col!=null?'pointer':'default',width:w+'%',letterSpacing:'.03em'}}>{l}{col===sortCol?(sortAsc?' ↑':' ↓'):''}</th>)}
          <th style={{width:'5%',padding:'8px 4px',fontSize:10,color:T.b100}}></th>
        </tr></thead>
        <tbody>
          {filtered.map((r,i)=>{
            const tz=getTZ(r[5]);const tc=tagClr(r[1]);const cc=callClr(r[8]);const isNoted=notes[r[3]+r[5]];
            return <tr key={i} style={{background:i%2===0?'white':'#E6F1FB',cursor:'pointer'}} onClick={()=>openLead(r)}>
              <td style={{padding:'6px 8px',fontSize:12,fontWeight:500,color:T.navy,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',borderBottom:'0.5px solid '+T.b100}}>
                {r[3]||'—'}{isNoted&&<span style={{marginLeft:4,fontSize:9,background:'#FFF3CD',color:'#856404',padding:'1px 4px',borderRadius:3}}>note</span>}
              </td>
              <td style={{padding:'6px 8px',fontSize:11,fontFamily:'monospace',borderBottom:'0.5px solid '+T.b100}}><a href={'tel:'+r[5]} onClick={e=>e.stopPropagation()} style={{color:T.navyLt}}>{r[5]||'—'}</a></td>
              <td style={{padding:'6px 8px',borderBottom:'0.5px solid '+T.b100}}><span style={{background:TZ_CLR[tz]||'#888',color:'white',fontSize:9,padding:'2px 5px',borderRadius:8,fontWeight:500}}>{tz}</span></td>
              <td style={{padding:'6px 8px',borderBottom:'0.5px solid '+T.b100}}><span style={{background:tc.bg,color:tc.tc,fontSize:9,padding:'2px 6px',borderRadius:8,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',display:'inline-block',maxWidth:'100%'}}>{(r[1]||'—').split(',')[0].trim().substring(0,12)}</span></td>
              <td style={{padding:'6px 8px',fontSize:11,borderBottom:'0.5px solid '+T.b100,color:'#555'}}>{(r[4]||'').substring(0,3)}</td>
              <td style={{padding:'6px 8px',fontSize:10,borderBottom:'0.5px solid '+T.b100}}>{r[2]?r[2].substring(0,10):'—'}</td>
              <td style={{padding:'6px 8px',fontSize:11,color:T.navyLt,borderBottom:'0.5px solid '+T.b100,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{(r[6]||'—').substring(0,22)}</td>
              <td style={{padding:'6px 8px',fontSize:10,borderBottom:'0.5px solid '+T.b100,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{(r[7]||'—').substring(0,20)}</td>
              <td style={{padding:'6px 8px',borderBottom:'0.5px solid '+T.b100}}><span style={{background:cc.bg,color:cc.tc,fontSize:9,padding:'2px 5px',borderRadius:5,whiteSpace:'nowrap'}}>{(r[8]||'—').substring(0,14)}</span></td>
              <td style={{padding:'6px 4px',borderBottom:'0.5px solid '+T.b100}} onClick={e=>e.stopPropagation()}><button onClick={()=>deleteLead(leads.indexOf(r))} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:'2px 4px',borderRadius:3}}>✕</button></td>
            </tr>;
          })}
          {filtered.length===0&&<tr><td colSpan={10} style={{padding:24,textAlign:'center',color:'#aaa',fontSize:13,fontStyle:'italic'}}>No leads match filters</td></tr>}
        </tbody>
      </table>
    </div>
  </div>;
}

function CommTab({deals,setDeals,saveDeals}){
  const [fee,setFee]=useState('');const [vero,setVero]=useState(false);const [payType,setPayType]=useState('UCFS');
  const [client,setClient]=useState('');const [weekOf,setWeekOf]=useState(()=>new Date().toISOString().split('T')[0]);
  const mon=getMon(weekOf);const sun=new Date(mon);sun.setDate(mon.getDate()+6);
  const payFriDate=new Date(mon);payFriDate.setDate(mon.getDate()+11);
  const weekDeals=deals.filter(d=>d.weekOf===mon.toISOString().split('T')[0]);
  const weekVol=weekDeals.reduce((a,d)=>a+(+d.fee||0)-1000,0);
  const rate=weekVol<12000?.15:weekVol<20000?.17:weekVol<30000?.20:weekVol<50000?.23:.25;
  const feeN=+fee||0;const net=feeN-1000-(vero?25:0);const comm=Math.max(0,net*rate);
  const ez70Date=addWeeks(payFriDate,13);
  function addDeal(){
    if(!fee||+fee<1000)return;
    const monKey=getMon(weekOf).toISOString().split('T')[0];
    const d={id:Date.now(),client:client||'—',fee:+fee,vero,payType,weekOf:monKey,net,comm,rate,payFri:payFriDate.toISOString(),ez70Date:ez70Date.toISOString(),now:payType==='Easy Pay'?+(comm*.3).toFixed(2):+comm.toFixed(2),later:payType==='Easy Pay'?+(comm*.7).toFixed(2):0};
    const nd=[...deals,d];setDeals(nd);saveDeals(nd);setFee('');setClient('');setVero(false);
  }
  return <div>
    <div style={{background:'linear-gradient(135deg,'+T.navyDk+','+T.navy+')',borderRadius:12,padding:'13px 17px',color:'white',marginBottom:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><div style={{fontSize:11,color:T.b200}}>Pay Week</div><div style={{fontSize:16,fontWeight:700}}>{fmtShort(mon)} – {fmtShort(sun)}</div></div>
      <div style={{textAlign:'right'}}><div style={{fontSize:11,color:T.b200}}>Payday</div><div style={{fontSize:16,fontWeight:700,color:'#5DCAA5'}}>{fmtDate(payFriDate)}</div></div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
      <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:16}}>
        <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:12}}>New deal entry</div>
        <div style={{marginBottom:10}}><label style={{fontSize:11,color:T.navyLt,display:'block',marginBottom:3}}>Client name</label><input value={client} onChange={e=>setClient(e.target.value)} placeholder="Client name..." style={{width:'100%',fontSize:13,padding:'6px 8px',borderRadius:6,border:'0.5px solid '+T.b100}}/></div>
        <div style={{marginBottom:10}}><label style={{fontSize:11,color:T.navyLt,display:'block',marginBottom:3}}>Our fee ($)</label><input type="number" value={fee} onChange={e=>setFee(e.target.value)} placeholder="0.00" style={{width:'100%',fontSize:13,padding:'6px 8px',borderRadius:6,border:'0.5px solid '+T.b100}}/></div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
          <div><label style={{fontSize:11,color:T.navyLt,display:'block',marginBottom:3}}>Week of</label><input type="date" value={weekOf} onChange={e=>setWeekOf(e.target.value)} style={{width:'100%',fontSize:12,padding:'6px 8px',borderRadius:6,border:'0.5px solid '+T.b100}}/></div>
          <div><label style={{fontSize:11,color:T.navyLt,display:'block',marginBottom:3}}>Payment type</label><select value={payType} onChange={e=>setPayType(e.target.value)} style={{width:'100%',fontSize:12,padding:'7px 8px',borderRadius:6,border:'0.5px solid '+T.b100}}>{['UCFS','Affirm','Cash','Easy Pay'].map(p=><option key={p}>{p}</option>)}</select></div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><input type="checkbox" checked={vero} onChange={e=>setVero(e.target.checked)} style={{width:14,height:14}}/><label style={{fontSize:12,color:T.navyLt}}>Afterhours Vero (-$25)</label></div>
        {feeN>=1000&&<div style={{background:'#E6F1FB',borderRadius:8,padding:12,marginBottom:10}}>
          {[['Fee','$'+feeN.toLocaleString()],['- Base deduct','-$1,000'],vero?['- Afterhours Vero','-$25']:null,['Net','$'+net.toLocaleString()],['Week volume','$'+weekVol.toLocaleString()],['Rate',(rate*100).toFixed(0)+'%'],['Gross commission','$'+comm.toFixed(2)]].filter(Boolean).map(([l,v],i)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'2px 0',borderBottom:i===5?'1px solid '+T.b100:'none'}}><span style={{color:'#555'}}>{l}</span><span style={{fontWeight:i===6?600:400,color:i===6?T.navy:'#333'}}>{v}</span></div>)}
          {payType==='Easy Pay'?<div style={{marginTop:8,padding:'8px',background:'#FAEEDA',borderRadius:6}}><div style={{fontSize:11,fontWeight:600,color:T.ambDk}}>Easy Pay split</div><div style={{fontSize:12,color:T.ambDk}}>30% now ({fmtDate(payFriDate)}): <strong>${(comm*.3).toFixed(2)}</strong></div><div style={{fontSize:12,color:T.ambDk}}>70% in 13 weeks ({fmtDate(ez70Date)}): <strong>${(comm*.7).toFixed(2)}</strong></div></div>
          :<div style={{marginTop:8,padding:'8px',background:'#E1F5EE',borderRadius:6}}><div style={{fontSize:12,color:T.teaDk}}>Full commission payday {fmtDate(payFriDate)}: <strong>${comm.toFixed(2)}</strong></div></div>}
        </div>}
        <button onClick={addDeal} disabled={feeN<1000} style={{padding:'9px',borderRadius:8,border:'none',background:feeN>=1000?T.navy:'#ccc',color:'white',fontSize:13,fontWeight:600,cursor:feeN>=1000?'pointer':'not-allowed',width:'100%'}}>Add deal to week</button>
      </div>
      <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:16}}>
        <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:10}}>Week of {fmtShort(mon)}</div>
        {weekDeals.length===0?<div style={{color:'#aaa',fontSize:12,fontStyle:'italic',marginTop:20}}>No deals this week yet.</div>:<>
          {weekDeals.map(d=><div key={d.id} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'8px 0',borderBottom:'0.5px solid '+T.b100,fontSize:12}}>
            <div><div style={{fontWeight:600,color:T.navy}}>{d.client}</div><div style={{color:'#666',fontSize:11}}>Fee: ${(+d.fee).toLocaleString()} · {d.payType} · {(d.rate*100).toFixed(0)}%</div>
              {d.payType==='Easy Pay'?<div style={{color:T.ambDk,fontSize:11}}>Now: ${d.now.toFixed(2)} · 13wk: ${d.later.toFixed(2)}</div>:<div style={{color:T.teaDk,fontSize:11}}>Commission: ${(+d.comm).toFixed(2)}</div>}
            </div>
            <button onClick={()=>{if(confirm('Remove?')){const nd=deals.filter(x=>x.id!==d.id);setDeals(nd);saveDeals(nd);}}} style={{fontSize:10,padding:'2px 8px',borderRadius:5,border:'0.5px solid #ccc',background:'#fee2e2',color:'#991b1b',cursor:'pointer'}}>Remove</button>
          </div>)}
          <div style={{marginTop:10,padding:'10px',background:'#E6F1FB',borderRadius:8}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:2}}><span style={{color:T.navyLt}}>Week volume</span><span style={{fontWeight:600,color:T.navy}}>${weekVol.toLocaleString()}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:2}}><span style={{color:T.navyLt}}>Rate tier</span><span style={{fontWeight:600,color:T.navy}}>{(rate*100).toFixed(0)}%</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:14,marginTop:6,borderTop:'0.5px solid '+T.b100,paddingTop:6}}><span style={{color:T.navy,fontWeight:600}}>Earned this week</span><span style={{fontWeight:600,color:T.grn}}>${weekDeals.reduce((a,d)=>a+d.now,0).toFixed(2)}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span style={{color:T.navyLt}}>EZ Pay pending</span><span style={{color:T.ambDk}}>${weekDeals.reduce((a,d)=>a+d.later,0).toFixed(2)}</span></div>
          </div>
        </>}
      </div>
    </div>
  </div>;
}

function HistTab({deals}){
  const [selWeek,setSelWeek]=useState('');
  const weeks=[...new Set(deals.map(d=>d.weekOf))].sort().reverse();
  const wk=selWeek||weeks[0]||'';
  const weekDeals=deals.filter(d=>d.weekOf===wk);
  const totalNow=weekDeals.reduce((a,d)=>a+d.now,0);
  const totalPending=weekDeals.reduce((a,d)=>a+d.later,0);
  const yearTotal=deals.reduce((a,d)=>a+d.now,0);
  const yearPending=deals.reduce((a,d)=>a+d.later,0);
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:14}}>
      {[['Year earned','$'+yearTotal.toFixed(2),'#E1F5EE','#085041'],['EZ pending','$'+yearPending.toFixed(2),'#FAEEDA','#633806'],['Total deals',deals.length,'#E6F1FB','#0C447C']].map(([l,v,bg,tc])=><div key={l} style={{background:bg,borderRadius:8,padding:'10px 12px',border:'0.5px solid '+tc+'44'}}><div style={{fontSize:11,color:tc}}>{l}</div><div style={{fontSize:18,fontWeight:500,color:tc}}>{v}</div></div>)}
    </div>
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12,flexWrap:'wrap'}}>
      <select value={wk} onChange={e=>setSelWeek(e.target.value)} style={{fontSize:13,padding:'6px 10px',borderRadius:8,border:'0.5px solid '+T.b100}}>
        {weeks.length===0?<option>No weeks yet</option>:weeks.map(w=>{const m=new Date(w);const s=new Date(m);s.setDate(m.getDate()+6);const p=new Date(m);p.setDate(m.getDate()+11);return<option key={w} value={w}>Week {fmtShort(m)} – {fmtShort(s)} · Pay {fmtShort(p)}</option>;})}
      </select>
      {weekDeals.length>0&&<div style={{display:'flex',gap:8}}>
        <span style={{fontSize:12,background:'#E1F5EE',color:'#085041',padding:'4px 10px',borderRadius:8}}>Earned: ${totalNow.toFixed(2)}</span>
        <span style={{fontSize:12,background:'#FAEEDA',color:'#633806',padding:'4px 10px',borderRadius:8}}>EZ Pending: ${totalPending.toFixed(2)}</span>
      </div>}
    </div>
    {weekDeals.length===0?<div style={{color:'#aaa',fontStyle:'italic',fontSize:13}}>No deals for this week.</div>:
      <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:10,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
          <thead><tr style={{background:T.navy}}>{['Client','Fee','Type','Rate','Net comm','Now','13wk later','Pay date'].map(h=><th key={h} style={{padding:'8px 10px',textAlign:'left',fontSize:10,fontWeight:500,color:T.b100}}>{h}</th>)}</tr></thead>
          <tbody>{weekDeals.map((d,i)=><tr key={d.id} style={{background:i%2===0?'white':'#E6F1FB'}}>
            <td style={{padding:'7px 10px',color:T.navy,fontWeight:500}}>{d.client}</td>
            <td style={{padding:'7px 10px'}}>${(+d.fee).toLocaleString()}</td>
            <td style={{padding:'7px 10px'}}>{d.payType}</td>
            <td style={{padding:'7px 10px'}}>{(d.rate*100).toFixed(0)}%</td>
            <td style={{padding:'7px 10px'}}>${(+d.comm).toFixed(2)}</td>
            <td style={{padding:'7px 10px',color:T.teaDk,fontWeight:500}}>${d.now.toFixed(2)}</td>
            <td style={{padding:'7px 10px',color:T.ambDk}}>{d.later>0?'$'+d.later.toFixed(2):'—'}</td>
            <td style={{padding:'7px 10px',fontSize:11,color:'#555'}}>{fmtDate(d.payFri)}{d.later>0&&<div style={{fontSize:10,color:T.ambDk}}>70%: {fmtDate(d.ez70Date)}</div>}</td>
          </tr>)}</tbody>
        </table>
      </div>}
  </div>;
}

function RewardsTab({lb,setLb}){
  function spend(reward){
    if(lb.balance<reward.cost){alert('Need '+(reward.cost-lb.balance).toFixed(2)+' more Life Bucks!');return;}
    const newLb={...lb,balance:+(lb.balance-reward.cost).toFixed(2),totalSpent:+(lb.totalSpent+reward.cost).toFixed(2),ledger:[{type:'spend',amount:reward.cost,desc:reward.ico+' '+reward.name,date:new Date().toLocaleDateString()},...lb.ledger].slice(0,100)};
    setLb(newLb);sSet('lifeBucks',newLb);
    alert('🎉 Enjoy your '+reward.name+'!\nBalance: 💎'+newLb.balance.toFixed(2)+' Life Bucks');
  }
  return <div>
    <div style={{background:'linear-gradient(135deg,#7D5000,#B8860B,#D4A017)',borderRadius:14,padding:'18px 22px',color:'white',marginBottom:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><div style={{fontSize:12,opacity:.85,marginBottom:3}}>Sebastian S. — Life Buck Balance</div><div style={{fontSize:34,fontWeight:800}}>💎 {lb.balance.toFixed(2)}</div><div style={{fontSize:11,opacity:.85,marginTop:2}}>Life Bucks™ · 1 LB = $1.00</div></div>
      <div style={{textAlign:'right'}}><div style={{fontSize:12,opacity:.85}}>All-time earned</div><div style={{fontSize:22,fontWeight:700}}>💎 {lb.totalEarned.toFixed(2)}</div><div style={{fontSize:12,opacity:.85,marginTop:4}}>All-time spent</div><div style={{fontSize:18,fontWeight:700}}>💎 {lb.totalSpent.toFixed(2)}</div></div>
    </div>
    <div style={{marginBottom:12}}>
      <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:8}}>Point Values by Task Type — 25 Reward Tiers</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:5,marginBottom:14}}>
        {LB_TIERS.map(l=><div key={l.val} style={{background:l.bg,borderRadius:7,padding:'7px 8px',textAlign:'center',border:'0.5px solid '+l.tc+'44'}}><div style={{fontSize:15,fontWeight:700,color:l.tc}}>{l.label}</div><div style={{fontSize:9,color:l.tc,opacity:.75,marginTop:1}}>{l.val<10?l.val<5?'chores':'tasks':l.val<100?'work':'milestone'}</div></div>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:5,marginBottom:14}}>
        {Object.entries(CAT_LB).map(([id,val])=>{const cat=DEFAULT_CATS.find(c=>c.id===id);const tier=LB_TIERS.find(t=>t.val===val)||LB_TIERS[0];return<div key={id} style={{background:tier.bg,borderRadius:7,padding:'7px 8px',textAlign:'center',border:'0.5px solid '+tier.tc+'44'}}><div style={{fontSize:11,fontWeight:600,color:tier.tc}}>{cat&&cat.label||id}</div><div style={{fontSize:14,fontWeight:700,color:tier.tc}}>💎 {val}</div></div>;})}
      </div>
    </div>
    <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:10}}>🛍️ Reward Store</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:14}}>
      {REWARDS.map(r=>{const can=lb.balance>=r.cost;return<div key={r.name} style={{background:'white',borderRadius:12,border:'1.5px solid '+(can?T.grn:'#e0d0a0'),padding:14,opacity:can?1:.85}}>
        <div style={{fontSize:28,marginBottom:6}}>{r.ico}</div>
        <div style={{fontSize:13,fontWeight:700,color:'#333',marginBottom:3}}>{r.name}</div>
        <div style={{fontSize:11,color:T.gray,marginBottom:8}}>{r.desc}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:18,fontWeight:800,color:'#B8860B'}}>💎 {r.cost}</div>
          {can?<button onClick={()=>spend(r)} style={{fontSize:11,padding:'5px 12px',borderRadius:7,border:'none',background:'#D4A017',color:'white',cursor:'pointer',fontWeight:600}}>Redeem!</button>
            :<span style={{fontSize:10,padding:'2px 8px',borderRadius:8,background:'#f0f0f0',color:'#999'}}>Need {(r.cost-lb.balance).toFixed(0)} more</span>}
        </div>
      </div>;})}
    </div>
    <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:10}}>📜 Recent Activity</div>
    {lb.ledger.length===0?<div style={{color:'#aaa',fontStyle:'italic',fontSize:13}}>No activity yet — complete tasks to earn Life Bucks!</div>
      :lb.ledger.slice(0,20).map((e,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'0.5px solid #e8f0f8',fontSize:12}}>
        <div><div style={{fontWeight:500,color:'#333'}}>{e.desc}</div><div style={{fontSize:10,color:'#888'}}>{e.date}</div></div>
        <div style={{fontSize:16,fontWeight:700,color:e.type==='earn'?T.grn:T.redDk}}>{e.type==='earn'?'+':'-'}💎{e.amount.toFixed(2)}</div>
      </div>)}
  </div>;
}

function PurposeTab({answers,setAnswers}){
  const [step,setStep]=useState(0);
  const [drafts,setDrafts]=useState(answers);
  const ans=PURP_QS.filter(q=>answers[q.id]&&answers[q.id].trim()).length;
  function save(idx,next){
    const newA={...answers,[PURP_QS[idx].id]:drafts[PURP_QS[idx].id]||''};
    setAnswers(newA);sSet('purposeAnswers',newA);
    if(next>=0)setStep(next);
  }
  const q=PURP_QS[step];
  return <div>
    <div style={{background:'linear-gradient(135deg,'+T.purDk+','+T.purple+')',borderRadius:14,padding:'18px 22px',color:'white',marginBottom:14}}>
      <div style={{fontSize:11,color:'rgba(255,255,255,.7)',marginBottom:4}}>Sebastian S. — Life Architecture</div>
      <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>🧭 Purpose, Mission &amp; Values</div>
      <div style={{fontSize:13,opacity:.8}}>{ans}/{PURP_QS.length} questions answered</div>
      <div style={{height:5,background:'rgba(255,255,255,.2)',borderRadius:3,overflow:'hidden',marginTop:10}}><div style={{width:(ans/PURP_QS.length*100)+'%',height:'100%',background:'white',borderRadius:3}}/></div>
    </div>
    <div style={{background:'white',borderRadius:12,border:'2px solid '+T.purple,padding:20,marginBottom:12}}>
      <div style={{fontSize:11,color:T.purDk,fontWeight:600,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:5}}>Question {step+1} of {PURP_QS.length}</div>
      <div style={{fontSize:17,fontWeight:700,color:T.purDk,marginBottom:6,lineHeight:1.4}}>{q.q}</div>
      <div style={{fontSize:12,color:T.gray,marginBottom:12,fontStyle:'italic'}}>{q.hint}</div>
      <textarea value={drafts[q.id]||''} onChange={e=>setDrafts(p=>({...p,[q.id]:e.target.value}))} placeholder="Your answer..." style={{width:'100%',minHeight:90,padding:10,borderRadius:8,border:'0.5px solid '+T.b100,fontSize:13,resize:'vertical',fontFamily:'inherit'}}/>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
        {step>0?<Btn onClick={()=>{save(step,step-1);}} color={T.gray} style={{color:'#333'}}>← Back</Btn>:<span/>}
        <Btn onClick={()=>save(step,step<PURP_QS.length-1?step+1:-1)} color={T.purple}>{step<PURP_QS.length-1?'Save & Next →':'Save & Finish ✓'}</Btn>
      </div>
    </div>
    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
      {PURP_QS.map((pq,i)=><button key={i} onClick={()=>setStep(i)} style={{fontSize:11,padding:'4px 10px',borderRadius:8,border:'0.5px solid '+(answers[pq.id]?T.purple:T.b100),background:answers[pq.id]?T.purBg:i===step?T.b50:'white',color:answers[pq.id]?T.purDk:T.navy,cursor:'pointer'}}>{i+1}. {pq.id.replace('_',' ')}{answers[pq.id]?' ✓':''}</button>)}
    </div>
    {ans>0&&<div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:16}}>
      <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:12}}>Your Life Architecture</div>
      {[{id:'purpose',label:'Life Purpose',icon:'⚡'},{id:'mission',label:'Personal Mission',icon:'🎯'},{id:'values',label:'Core Values',icon:'💎'},{id:'legacy',label:'Legacy',icon:'🌟'},{id:'family_role',label:'Family Role',icon:'👨‍👩‍👧'}].filter(f=>answers[f.id]).map(f=><div key={f.id} style={{background:'linear-gradient(135deg,'+T.purBg+',white)',border:'1px solid '+T.purple+'44',borderRadius:10,padding:14,marginBottom:8}}>
        <div style={{fontSize:11,fontWeight:700,color:T.purDk,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:5}}>{f.icon} {f.label}</div>
        <div style={{fontSize:14,color:T.purDk,lineHeight:1.7,fontStyle:'italic'}}>{answers[f.id]}</div>
      </div>)}
    </div>}
  </div>;
}

function FavoritesTab({favs,setFavs}){
  const [name,setName]=useState('');const [url,setUrl]=useState('');const [ico,setIco]=useState('');
  function add(){if(!name.trim()||!url.trim())return;const nf=[...favs,{name:name.trim(),url:url.trim(),ico:ico.trim()||'🔗'}];setFavs(nf);sSet('favLinks',nf);setName('');setUrl('');setIco('');}
  function remove(i){if(!confirm('Remove?'))return;const nf=favs.filter((_,j)=>j!==i);setFavs(nf);sSet('favLinks',nf);}
  return <div>
    <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:16,marginBottom:12}}>
      <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:12}}>⭐ My Favorite Links</div>
      <div style={{display:'flex',gap:7,marginBottom:14,flexWrap:'wrap'}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Label (e.g. My CRM)" style={{fontSize:12,padding:'6px 9px',borderRadius:7,border:'0.5px solid '+T.b100,flex:1,minWidth:120}}/>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..." style={{fontSize:12,padding:'6px 9px',borderRadius:7,border:'0.5px solid '+T.b100,flex:2,minWidth:180}}/>
        <input value={ico} onChange={e=>setIco(e.target.value)} placeholder="🔗" style={{fontSize:12,padding:'6px 9px',borderRadius:7,border:'0.5px solid '+T.b100,width:60}}/>
        <Btn onClick={add}>Add link</Btn>
      </div>
      {favs.length===0?<div style={{color:'#aaa',fontStyle:'italic',fontSize:13}}>No links yet — add your favorites above</div>
        :<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:9}}>
          {favs.map((f,i)=><div key={i} style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:9,padding:13,display:'flex',alignItems:'center',gap:9}}>
            <div style={{fontSize:22,flexShrink:0}}>{f.ico}</div>
            <div style={{flex:1,overflow:'hidden'}}>
              <div style={{fontSize:12,fontWeight:700,color:T.navy,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}><a href={f.url} target="_blank" rel="noreferrer" style={{color:T.navy}}>{f.name}</a></div>
              <div style={{fontSize:10,color:T.gray,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.url}</div>
            </div>
            <button onClick={()=>remove(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:'2px 4px',borderRadius:3,flexShrink:0}}>✕</button>
          </div>)}
        </div>}
    </div>
  </div>;
}

function DashTab({tab,setTab,cats,leads,deals,lb,nhQuoteIdx,setNhQuoteIdx}){
  const total=cats.reduce((a,c)=>a+c.tasks.length,0);
  const done=cats.reduce((a,c)=>a+c.tasks.filter(t=>t.status==='Done').length,0);
  const yearTotal=deals.reduce((a,d)=>a+d.now,0);
  const q=NH_QUOTES[nhQuoteIdx];
  const cards=[
    {ico:'📅',title:'Day Build',sub:done+'/'+total+' tasks today',color:T.purple,id:'day'},
    {ico:'👥',title:'PNC CRM',sub:leads.length+' leads loaded',color:T.blue,id:'crm'},
    {ico:'💰',title:'Commission',sub:'Track deals & pay',color:T.teal,id:'comm'},
    {ico:'📈',title:'Pay History',sub:deals.length+' deals recorded',color:T.coral,id:'hist'},
    {ico:'🏆',title:'Rewards',sub:'💎 '+lb.balance.toFixed(2)+' Life Bucks',color:T.gold,id:'rew'},
    {ico:'🧭',title:'Purpose',sub:'Mission & values',color:T.purple,id:'purp'},
  ];
  return <div>
    <div style={{background:'linear-gradient(135deg,'+T.navyDk+','+T.navy+')',borderRadius:14,padding:'18px 22px',color:'white',marginBottom:14}}>
      <div style={{fontSize:11,color:T.b200,marginBottom:4}}>Good morning, Sebastian S.</div>
      <select value={nhQuoteIdx} onChange={e=>{setNhQuoteIdx(+e.target.value);sSet('nhQIdx',+e.target.value);}} style={{fontSize:11,padding:'5px 8px',borderRadius:7,border:'0.5px solid rgba(255,255,255,.3)',background:'rgba(255,255,255,.1)',color:'white',marginBottom:9,width:'100%',fontFamily:'inherit'}}>
        {NH_QUOTES.map((q,i)=><option key={i} value={i}>Napoleon Hill: {q.title}</option>)}
      </select>
      {q&&<><div style={{fontSize:14,fontStyle:'italic',lineHeight:1.6,color:'#E6F1FB'}}>"{q.quote}"</div><div style={{fontSize:11,color:T.b200,marginTop:6}}>— Napoleon Hill · {q.title}</div></>}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:14}}>
      {cards.map(c=><div key={c.id} onClick={()=>setTab(c.id)} style={{background:'white',borderRadius:13,padding:16,border:'0.5px solid '+T.b100,cursor:'pointer',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,right:0,width:50,height:50,borderRadius:'0 13px 0 50px',background:c.color,opacity:.12}}/>
        <div style={{fontSize:28,marginBottom:6}}>{c.ico}</div>
        <div style={{fontSize:14,fontWeight:700,color:c.color,marginBottom:2}}>{c.title}</div>
        <div style={{fontSize:11,color:T.gray}}>{c.sub}</div>
      </div>)}
    </div>
    <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:15}}>
      <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:10}}>Today at a Glance — Sebastian S.</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
        {[['Tasks done',done+'/'+total,'#E6F1FB','#0C447C'],['Life Bucks','💎 '+lb.balance.toFixed(0),'#FFF8E1','#7D5000'],['Year earned','$'+yearTotal.toFixed(0),'#E1F5EE','#085041'],['CRM leads',leads.length,'#FAECE7','#712B13']].map(([l,v,bg,tc])=><div key={l} style={{background:bg,borderRadius:9,padding:'11px 12px'}}><div style={{fontSize:11,color:tc,marginBottom:3}}>{l}</div><div style={{fontSize:20,fontWeight:700,color:tc}}>{v}</div></div>)}
      </div>
    </div>
  </div>;
}

function App(){
  const [tab,setTab]=useState('dash');
  const [cats,setCats]=useState(DEFAULT_CATS);
  const [leads,setLeads]=useState([]);
  const [notes,setNotes]=useState({});
  const [deals,setDeals]=useState([]);
  const [lb,setLb]=useState({balance:0,totalEarned:0,totalSpent:0,ledger:[]});
  const [favs,setFavs]=useState([{name:'12 Easy Steps',url:'https://12easysteps.org/report-card.html',ico:'🔵'},{name:'Claude.ai',url:'https://claude.ai',ico:'⚡'},{name:'Zoho CRM',url:'https://crm.zoho.com',ico:'📊'}]);
  const [purposeAnswers,setPurposeAnswers]=useState({});
  const [nhQuoteIdx,setNhQuoteIdx]=useState(0);
  const [actionLists,setActionLists]=useState(DEFAULT_ACTION_LISTS);
  const [loading,setLoading]=useState(true);
  const [saved,setSaved]=useState(false);

  useEffect(()=>{
    (async()=>{
      const day=await sGet(todayKey());if(day)setCats(day);
      const l=await sGet('crm:leads');if(l)setLeads(l);
      const n=await sGet('crm:notes');if(n)setNotes(n);
      const d=await sGet('comm:deals');if(d)setDeals(d);
      const lb2=await sGet('lifeBucks');if(lb2)setLb(lb2);
      const fv=await sGet('favLinks');if(fv)setFavs(fv);
      const pa=await sGet('purposeAnswers');if(pa)setPurposeAnswers(pa);
      const qi=await sGet('nhQIdx');if(qi!=null)setNhQuoteIdx(qi);
      const al=await sGet('actionLists');if(al)setActionLists(al);
      setLoading(false);
    })();
  },[]);

  const saveDay=useCallback(async()=>{await sSet(todayKey(),cats);setSaved(true);setTimeout(()=>setSaved(false),2000);},[cats]);
  const saveLeads=useCallback(l=>sSet('crm:leads',l),[]);
  const saveNotes=useCallback(n=>sSet('crm:notes',n),[]);
  const saveDeals=useCallback(d=>sSet('comm:deals',d),[]);
  useEffect(()=>{if(!loading)sSet(todayKey(),cats);},[cats,loading]);

  const TABS=[
    {id:'dash',label:'🏠 Dashboard'},
    {id:'day',label:'📅 Day Build'},
    {id:'crm',label:'👥 PNC CRM'},
    {id:'comm',label:'💰 Commission'},
    {id:'hist',label:'📈 Pay History'},
    {id:'rew',label:'🏆 Rewards'},
    {id:'purp',label:'🧭 Purpose'},
    {id:'favs',label:'⭐ Favorites'},
  ];

  if(loading)return <div style={{padding:24,color:T.navyLt,fontSize:13}}>Loading Life OS — Sebastian S....</div>;

  return <div style={{fontFamily:'var(--font-sans)'}}>
    <div style={{background:'linear-gradient(135deg,'+T.navyDk+' 0%,'+T.navy+' 60%,'+T.navyLt+' 100%)',borderRadius:12,padding:'12px 16px',marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 4px 20px rgba(12,68,124,.3)',flexWrap:'wrap',gap:8}}>
      <div><div style={{fontSize:16,fontWeight:800,color:'#E6F1FB',letterSpacing:'.01em'}}>⚡ Life OS</div><div style={{fontSize:10,color:T.b200,marginTop:1,fontStyle:'italic'}}>Sebastian S. — Personal Operating System</div></div>
      <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{fontSize:11,padding:'6px 11px',borderRadius:8,border:'none',background:tab===t.id?'#185FA5':'rgba(255,255,255,.12)',color:tab===t.id?'white':T.b100,cursor:'pointer',fontWeight:tab===t.id?600:400}}>{t.label}</button>)}
      </div>
      <div style={{textAlign:'right'}}>
        <div style={{fontSize:11,color:T.b100}}>{new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</div>
        {saved&&<div style={{fontSize:10,color:'#5DCAA5'}}>✓ Saved</div>}
        <div style={{fontSize:11,color:'#D4A017',marginTop:1}}>💎 {lb.balance.toFixed(2)} LB</div>
      </div>
    </div>
    {tab==='dash'&&<DashTab tab={tab} setTab={setTab} cats={cats} leads={leads} deals={deals} lb={lb} nhQuoteIdx={nhQuoteIdx} setNhQuoteIdx={setNhQuoteIdx}/>}
    {tab==='day'&&<DayBuildTab cats={cats} setCats={setCats} save={saveDay} lb={lb} setLb={setLb} actionLists={actionLists} setActionLists={setActionLists}/>}
    {tab==='crm'&&<CRMTab leads={leads} setLeads={setLeads} notes={notes} setNotes={setNotes} saveLeads={saveLeads} saveNotes={saveNotes}/>}
    {tab==='comm'&&<CommTab deals={deals} setDeals={setDeals} saveDeals={saveDeals}/>}
    {tab==='hist'&&<HistTab deals={deals}/>}
    {tab==='rew'&&<RewardsTab lb={lb} setLb={setLb}/>}
    {tab==='purp'&&<PurposeTab answers={purposeAnswers} setAnswers={setPurposeAnswers}/>}
    {tab==='favs'&&<FavoritesTab favs={favs} setFavs={setFavs}/>}
  </div>;
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
</script>
</body>
</html><!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>⚡ Life OS — Sebastian S.</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"></script>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{background:#f0f4fa;font-family:'Segoe UI',system-ui,sans-serif;padding:12px;min-height:100vh;}
  :root{--font-sans:'Segoe UI',system-ui,sans-serif;}
  input,select,textarea,button{font-family:inherit;}
  a{text-decoration:none;}
  ::-webkit-scrollbar{width:6px;height:6px;}
  ::-webkit-scrollbar-track{background:#f0f4fa;}
  ::-webkit-scrollbar-thumb{background:#b5d4f4;border-radius:3px;}
</style>
</head>
<body>
<div id="root"></div>
<script type="text/babel">
const{useState,useEffect,useCallback}=React;

// ── STORAGE (localStorage) ──
async function sGet(key){try{const v=localStorage.getItem(key);return v?JSON.parse(v):null;}catch{return null;}}
async function sSet(key,val){try{localStorage.setItem(key,JSON.stringify(val));}catch{}}

const T={navy:'#0C447C',navyDk:'#042C53',navyLt:'#185FA5',blue:'#378ADD',b50:'#E6F1FB',b100:'#B5D4F4',b200:'#85B7EB',purple:'#7F77DD',purBg:'#EEEDFE',purDk:'#3C3489',teal:'#1D9E75',teaBg:'#E1F5EE',teaDk:'#085041',coral:'#D85A30',corBg:'#FAECE7',corDk:'#712B13',grn:'#639922',grnBg:'#EAF3DE',grnDk:'#27500A',amb:'#BA7517',ambBg:'#FAEEDA',ambDk:'#633806',red:'#E24B4A',redBg:'#FCEBEB',redDk:'#791F1F',gray:'#888780',gryBg:'#F1EFE8',gryDk:'#444441',pink:'#D4537E',pnkBg:'#FBEAF0',pnkDk:'#72243E',gold:'#D4A017'};

const NH_QUOTES=[
  {title:"Definiteness of Purpose",quote:"There is one quality which one must possess to win, and that is definiteness of purpose, the knowledge of what one wants, and a burning desire to possess it."},
  {title:"Desire",quote:"The starting point of all achievement is DESIRE. Keep this constantly in mind. Weak desire brings weak results, just as a small fire makes a small amount of heat."},
  {title:"Faith",quote:"Whatever the mind can conceive and believe, it can achieve."},
  {title:"Auto-Suggestion",quote:"You are the master of your destiny. You can influence, direct and control your own environment. You can make your life what you want it to be."},
  {title:"Specialized Knowledge",quote:"An educated man is not, necessarily, one who has an abundance of general or specialized knowledge. An educated man is one who has so developed the faculties of his mind that he may acquire anything he wants."},
  {title:"Imagination",quote:"First comes thought; then organization of that thought into ideas and plans; then transformation of those plans into reality."},
  {title:"Organized Planning",quote:"Create a definite plan for carrying out your desire and begin at once, whether you are ready or not, to put this plan into action."},
  {title:"Decision",quote:"Successful people make decisions quickly and change them slowly. Unsuccessful people make decisions slowly and change them quickly."},
  {title:"Persistence",quote:"Patience, persistence and perspiration make an unbeatable combination for success."},
  {title:"Mastermind",quote:"No two minds ever come together without thereby creating a third, invisible intangible force, which may be likened to a third mind."},
  {title:"Transmutation",quote:"The emotion of love brings out and develops the artistic and the aesthetic nature of man. It leaves its impress upon one's very soul even after the fire has been subdued by time."},
  {title:"The Subconscious Mind",quote:"The subconscious mind makes no distinction between constructive and destructive thought impulses. It works with the material we feed it."},
  {title:"The Brain",quote:"Your brain is a broadcasting and receiving station for the vibration of thought. Tune it to the right frequency."},
  {title:"The Sixth Sense",quote:"The sixth sense is that portion of the subconscious mind referred to as the Creative Imagination. It is also the medium of contact between the finite mind of man and Infinite Intelligence."},
  {title:"Enthusiasm",quote:"Enthusiasm is the steam that drives the engine. It is the important ingredient in almost everything you do."},
  {title:"Self-Discipline",quote:"Self-discipline begins with the mastery of your thoughts. If you don't control what you think, you can't control what you do."},
  {title:"Applied Faith",quote:"Faith is the only known antidote for failure. It is the starting point of all accumulation of riches."},
  {title:"Going the Extra Mile",quote:"The man who does more than he is paid for will soon be paid for more than he does. There are no limitations to the mind except those we acknowledge."},
  {title:"Pleasing Personality",quote:"Your personality is your greatest asset or your greatest liability. It embraces everything you control — your mind, body, and soul."},
  {title:"Personal Initiative",quote:"Do not wait; the time will never be just right. Start where you stand, and work with whatever tools you may have at your command, and better tools will be found as you go along."},
  {title:"Teamwork",quote:"It is literally true that you can succeed best and quickest by helping others to succeed."},
  {title:"Learning from Adversity",quote:"Every adversity, every failure, every heartache carries with it the seed of an equal or greater benefit."},
  {title:"Creative Vision",quote:"The imagination is literally the workshop wherein are fashioned all plans created by man. Impulse, desire is given shape, form and action through the aid of the imaginative faculty of the mind."},
  {title:"Accurate Thinking",quote:"Think twice before you speak, because your words and influence will plant the seed of either success or failure in the mind of another."},
  {title:"Controlled Attention",quote:"Reduce your plan to writing. The moment you complete this, you will have definitely given concrete form to the intangible desire."},
  {title:"Budgeting Time and Money",quote:"Plan your work and work your plan. Chaos is the enemy of the person who aspires to take control of their own destiny."},
  {title:"Physical Health",quote:"Sound health begins with a sound health consciousness, just as financial success begins with a prosperity consciousness."},
  {title:"Cosmic Habit Force",quote:"Every living thing below the level of man is under the absolute control of the habit of nature from which there is neither escape nor freedom. Man alone has been given the power to control his habit."},
  {title:"Burning Desire",quote:"Desire is the starting point of all achievement, not a hope, not a wish, but a keen pulsating desire which transcends everything."},
  {title:"Success Consciousness",quote:"Success comes to those who become SUCCESS CONSCIOUS. Failure comes to those who indifferently allow themselves to become FAILURE CONSCIOUS."},
  {title:"Opportunity",quote:"Opportunity often comes disguised in the form of misfortune, or temporary defeat."},
  {title:"The Power of the Mind",quote:"The mind is everything. What you think, you become. Your mind is the only thing over which you have complete and unchallengeable control."},
  {title:"Overcoming Fear",quote:"There are six basic fears with which every human suffers at one time or another. Most people are born with the fear of poverty and the fear of death. The other four are acquired."},
  {title:"Riches",quote:"Riches do not respond to wishes. They respond only to definite plans, backed by definite desires, through constant persistence."},
  {title:"Action",quote:"A goal is a dream with a deadline. An idea that is developed and put into action is more important than an idea that exists only as an idea."},
  {title:"The Ladder of Success",quote:"The ladder of success is never crowded at the top. Most people give up just when they're about to achieve success."},
  {title:"Gratitude",quote:"Develop an attitude of gratitude, and give thanks for everything that happens to you, knowing that every step forward is a step toward achieving something bigger than your current situation."},
  {title:"Vision",quote:"Hold a picture of yourself long and steadily enough in your mind's eye, and you will be drawn toward it. Picture clearly and confidently what you want to be, and that mental image will become reality."},
  {title:"Self-Belief",quote:"If you do not conquer self, you will be conquered by self. Your only real limitation is the one you set up in your own mind."},
  {title:"Daily Habits",quote:"Whatever you want in life, start each day by asking yourself: what one thing can I do today that moves me closer to my definite major purpose?"},
  {title:"Wealth",quote:"Both poverty and riches are the offspring of thought. You can think your way to financial freedom just as surely as you can think your way to failure."},
  {title:"Influence",quote:"When you close the door of your mind to negative thoughts, the door of opportunity opens to you. Your mind attracts exactly what it dwells upon most."},
  {title:"Purpose",quote:"A goal is a dream with a deadline. The person with a definite purpose and a burning desire never lacks energy or resourcefulness."},
  {title:"Character",quote:"Great achievement is usually born of great sacrifice, and is never the result of selfishness. Character is the sum of your habits and choices."},
  {title:"Mastermind Power",quote:"The accumulation of great fortunes calls for power, and power is acquired through highly organized and intelligently directed specialized knowledge."},
  {title:"Responsibility",quote:"You are where you are because of who you are. Everything that exists in your life exists because of you — your thoughts, decisions, and actions."},
  {title:"Time",quote:"Time is the most precious resource — it is the only one that cannot be replenished once spent. Invest it wisely in your definite chief aim."},
  {title:"Leadership",quote:"A genius is simply one who has taken the time to know himself thoroughly. Real leadership is knowing yourself first, then inspiring others to know themselves."},
  {title:"Habit Force",quote:"The habit of doing more than you are paid for, giving more in service than you receive in pay, is a habit that brings compound interest to the soul."},
  {title:"Service",quote:"You can always become the person you would have liked to be. Life's greatest rewards are reserved for those who demonstrate a never-ending commitment to act until they achieve."},
  {title:"The Master Key",quote:"The key to success is to focus our conscious mind on things we desire, not things we fear. When you think about what you want and work toward it, you will attract it."},
];

const LB_TIERS=[
  {val:.25,label:'25¢',bg:'#f0fce8',tc:'#3a6b10'},{val:.5,label:'50¢',bg:'#e5f8d4',tc:'#326010'},
  {val:.75,label:'75¢',bg:'#d9f3c0',tc:'#2a5510'},{val:1,label:'$1',bg:'#ceeead',tc:'#224a0e'},
  {val:1.5,label:'$1.50',bg:'#c3e99a',tc:'#1a3f0c'},{val:2,label:'$2',bg:'#b8e487',tc:'#143309'},
  {val:3,label:'$3',bg:'#a9dc6e',tc:'#0e2807'},{val:4,label:'$4',bg:'#98d255',tc:'#091e05'},
  {val:5,label:'$5',bg:'#86c83c',tc:'#051303'},{val:7.5,label:'$7.50',bg:'#72bb22',tc:'#030901'},
  {val:10,label:'$10',bg:'#E6F1FB',tc:'#0C447C'},{val:15,label:'$15',bg:'#cce3f7',tc:'#093d6e'},
  {val:25,label:'$25',bg:'#b3d6f3',tc:'#063360'},{val:50,label:'$50',bg:'#80b8eb',tc:'#042b52'},
  {val:75,label:'$75',bg:'#4d9ae3',tc:'#022344'},{val:100,label:'$100',bg:'#FAEEDA',tc:'#633806'},
  {val:150,label:'$150',bg:'#f5e0b8',tc:'#5a3104'},{val:200,label:'$200',bg:'#f0d296',tc:'#513003'},
  {val:250,label:'$250',bg:'#ebc474',tc:'#482f02'},{val:300,label:'$300',bg:'#e6b652',tc:'#3f2e01'},
  {val:400,label:'$400',bg:'#e1a830',tc:'#362d00'},{val:500,label:'$500',bg:'#dc9a0e',tc:'#2d2c00'},
  {val:750,label:'$750',bg:'#d78c00',tc:'#241b00'},{val:1000,label:'$1K',bg:'#c87f00',tc:'#1b0a00'},
  {val:2000,label:'$2K',bg:'#b87200',tc:'#120000'},
];
const CAT_LB={SM:2,RR:3,WK:5,FM:1.5,EX:2,HC:.5,FR:1,SP:2.5,DR:1,MI:.25};
const REWARDS=[
  {ico:'💆',name:'Chair Massage at Mall',desc:'30-min chair massage',cost:30},
  {ico:'😂',name:'Comedy Show',desc:'Live stand-up night',cost:50},
  {ico:'🎭',name:'Theater / Play',desc:'Live performance',cost:75},
  {ico:'🏍️',name:'ATV Rental',desc:'Half-day adventure',cost:150},
  {ico:'🍕',name:'Family Pizza Night',desc:'Pizza for the family',cost:20},
  {ico:'🍦',name:'Ice Cream Outing',desc:'Ice cream treat',cost:8},
  {ico:'🎬',name:'Movie Night Out',desc:'Cinema with family',cost:35},
  {ico:'🎮',name:'Arcade / Gaming',desc:'Dave & Busters',cost:25},
  {ico:'🍣',name:'Sushi Dinner',desc:'Nice dinner out',cost:60},
  {ico:'⛳',name:'Golf Round',desc:'18 holes at the course',cost:80},
  {ico:'🏖️',name:'Beach Day Trip',desc:'Full day at the beach',cost:45},
  {ico:'🎯',name:'Escape Room',desc:'60-min escape room',cost:30},
  {ico:'🏊',name:'Waterpark Day',desc:'Full day at waterpark',cost:120},
  {ico:'🛒',name:'Shopping Spree',desc:'Personal clothes budget',cost:100},
  {ico:'✈️',name:'Weekend Getaway',desc:'2-night mini vacation',cost:500},
  {ico:'🎸',name:'Concert',desc:'Live music show',cost:75},
  {ico:'🥩',name:'Steakhouse Dinner',desc:'Premium dinner',cost:85},
  {ico:'🏋️',name:'Gym Month',desc:'One month membership',cost:40},
  {ico:'🎁',name:'Surprise Family Gift',desc:'Gift for the family',cost:50},
  {ico:'🧖',name:'Spa Half Day',desc:'Spa treatment package',cost:120},
];

const PURP_QS=[
  {id:'values',q:'What are your top 5 core values?',hint:'Faith, family, freedom, growth, integrity, service — what principles guide your decisions?'},
  {id:'gifts',q:'What are your unique gifts and natural strengths?',hint:'What do people always come to you for? What do you do better than most without much effort?'},
  {id:'passion',q:'What lights you up — what would you do even if unpaid?',hint:'Activities, causes, or conversations that give you energy rather than drain it.'},
  {id:'legacy',q:'What legacy do you want to leave behind?',hint:'How do you want to be remembered by your children, your community, and those you served?'},
  {id:'impact',q:'What problem in the world do you feel called to help solve?',hint:'What injustice, need, or gap do you see that you are personally called to address?'},
  {id:'family_role',q:'What kind of husband, father, and man do you want to be?',hint:'Describe your ideal self with Vanessa, your children, your sponsees, and your sponsor Jim.'},
  {id:'ideal_day',q:'Describe your ideal day 5 years from now in detail.',hint:'Where do you wake up? What do you do first? Who are you with? What have you built?'},
  {id:'obstacles',q:'What are your biggest internal obstacles right now?',hint:'What fears, habits, or beliefs are currently standing between you and your vision?'},
  {id:'mission',q:'Write your Personal Mission Statement.',hint:'One to three sentences. Why you exist, who you serve, and how. Start with: "My mission is to..."'},
  {id:'purpose',q:'Write your Life Purpose Statement — one sentence.',hint:'The core reason you are here. Often starts with a verb: to inspire, to build, to heal, to lead...'},
];

const SLOTS=[{id:1,label:'Slot 1',time:'5–9am'},{id:2,label:'Slot 2',time:'9am–1pm'},{id:3,label:'Slot 3',time:'1–5pm'},{id:4,label:'Slot 4',time:'5–9pm'},{id:5,label:'Slot 5',time:'9–11pm'},{id:6,label:'Slot 6',time:'Float'}];
const STAT_OPTS=['— to do','In progress','Done','Skipped'];
const WHO_GRP=[{g:'Children',n:['Ever','Sofi','Joshua','Dominic','Angie']},{g:'Wife',n:['Vanessa']},{g:'Family',n:['Mami Lopez','Mami Silva','Dad','Papa','Serena','Tio Nano','Tio Mauri','Tio Carlos','Primo Daniel','Aunt Kathy','Cousins','Tio Joe','Tita Ale','Jojo','Mia','Anastasia','Uncle Charlie']},{g:'Sponsees',n:['Mickael','Chris','Louis','Mohamed Iran']},{g:'Sponsor',n:['Jim']}];
const FRIEND_ACTIONS=['Call','Text','FaceTime','Meet up','Check-in','Pray for','Plan hangout'];
const SPONSEE_ACTIONS=['Call','Text','FaceTime','Check-in','Step work — Step 1','Step work — Step 2','Step work — Step 3','Step work — Step 4','Step work — Step 5','Step work — Step 6','Step work — Step 7','Step work — Step 8','Step work — Step 9','Step work — Step 10','Step work — Step 11','Step work — Step 12','Big Book','Prayer call','Meeting invite'];
const DEFAULT_ACTION_LISTS={SM:['Napoleon Hill boot log','Prayer — 6 min','Prayer — 15 min','Write with God — 4 min','Meditation','Gratitude list','Bible reading','YouTube sermon','Audiobook','Conscious contact','Morning devotional'],RR:['Contact sponsee — Mickael','Contact sponsee — Chris','Contact sponsee — Louis','Contact sponsee — Mohamed Iran','Contact sponsor — Jim','Attend AA meeting','Attend PAA meeting','Step work — Step 1','Step work — Step 2','Step work — Step 3','Step work — Step 4','Step work — Step 5','Step work — Step 6','Step work — Step 7','Step work — Step 8','Step work — Step 9','Step work — Step 10','Step work — Step 11','Step work — Step 12','Read Big Book','Service','Fellowship call'],WK:['Call all EST leads','Call all PST leads','Text all P0 leads','Text all P1 leads','Follow up client','Admin tasks','Boss check-in','Presentation prep','CRM update','Report','Prospecting','Team check-in','Training','Pipeline review'],FM:['Set up laptop for Ever','Make lunch','Make dinner','Prep nighttime snack','Talk time','Play time','Call / FaceTime','WU $100 — Serena','Family prayer','Movie night','Date night — Vanessa','Help with homework','Drop off / Pick up','Read together','Game night'],EX:['Squats','Sit-ups','Push-ups','Curls','Military press','Triceps','Gym session','Run','Walk','Bike','Stretch','Yoga','Pull-ups','Bench press','Deadlifts','Cardio','Plank','Lunges','Shoulder press','Rows','Golf'],HC:['Vacuum','Dishes','Counters','Tuesday trash','BR trash','Garage trash','Garage tidy','Living room tidy','Bedroom tidy','Set dinner table','Cook dinner','Prep dinner','Prep lunch','Prep snacks','Prep nighttime snack','Yard work','Home repair','Laundry','Mop','Clean bathroom','Grocery run'],FR:['Call','Text','FaceTime','Meet up','Check-in','Pray for','Plan hangout','Coffee','Lunch','Catch up'],SP:['Call — Mickael','Call — Chris','Call — Louis','Call — Mohamed Iran','Text','FaceTime','Step work — Step 1','Step work — Step 2','Step work — Step 3','Step work — Step 4','Step work — Step 5','Step work — Step 6','Step work — Step 7','Step work — Step 8','Step work — Step 9','Step work — Step 10','Step work — Step 11','Step work — Step 12','Big Book','Prayer call','Meeting invite'],DR:['Dentist appointment','Doctor appointment','Follow up call','Pick up prescription','Lab work','Specialist visit','Eye doctor','Telehealth'],MI:['Errand','Phone call','Email','Research','Planning','Grocery run','Bill payment','Car maintenance','Bank run','Other']};

const mkTask=(code,name,slot,extra={})=>({code,name,slot,status:'— to do',exactTime:'',taskDate:'',...extra});
const DEFAULT_CATS=[
  {id:'SM',label:'Spiritual Maintenance',color:T.purple,bg:T.purBg,tc:T.purDk,type:'standard',tasks:[mkTask('SM1','Napoleon Hill boot log',1,{daily:true}),mkTask('SM2','Prayer — 6 min',1),mkTask('SM3','Write with God — 4 min',1)]},
  {id:'RR',label:'Recovery',color:T.teal,bg:T.teaBg,tc:T.teaDk,type:'standard',tasks:[mkTask('R1','Contact sponsee — Mickael',6),mkTask('R2','Contact sponsor — Jim',6),mkTask('R3','Attend AA meeting',6)]},
  {id:'WK',label:'Work',color:T.blue,bg:T.b50,tc:T.navyDk,type:'standard',tasks:[mkTask('W1','Call all EST leads',2),mkTask('W2','Call all PST leads',3),mkTask('W3','Text all P0 leads',4),mkTask('W4','Text all P1 leads',5)]},
  {id:'FM',label:'Family',color:T.coral,bg:T.corBg,tc:T.corDk,type:'family',tasks:[mkTask('F1','Set up laptop for Ever',3,{exactTime:'15:00',who:'Ever',taskDate:''}),mkTask('F2','Make lunch',6,{who:''}),mkTask('F3','Make dinner',6,{who:''}),mkTask('F4','Nighttime snack',6,{who:'All'}),mkTask('F5','Talk time',6,{who:''}),mkTask('F6','Play time',6,{who:''}),mkTask('F7','Call / FaceTime',6,{who:''}),mkTask('F9','WU $100 — Serena',6,{who:'Serena'})]},
  {id:'EX',label:'Exercise',color:T.grn,bg:T.grnBg,tc:T.grnDk,type:'exercise',myWeight:'',tasks:[mkTask('EX1','Squats',6,{sets:'',reps:'',lbs:''}),mkTask('EX2','Sit-ups',6,{sets:'',reps:'',lbs:''}),mkTask('EX3','Push-ups',6,{sets:'',reps:'',lbs:''}),mkTask('EX4','Curls',6,{sets:'',reps:'',lbs:''}),mkTask('EX5','Military press',6,{sets:'',reps:'',lbs:''}),mkTask('EX6','Triceps',6,{sets:'',reps:'',lbs:''})]},
  {id:'HC',label:'Home Chores',color:T.amb,bg:T.ambBg,tc:T.ambDk,type:'standard',tasks:['Vacuum','Dishes','Counters','Tuesday trash','BR trash','Garage trash','Garage tidy','Living room tidy','BR tidy','Set dinner table','Cook dinner','Prep dinner','Prep lunch','Prep snacks','Prep nighttime snack','Yard work','Home repair'].map((n,i)=>mkTask('HC'+(i+1),n,2))},
  {id:'FR',label:'Friends',color:T.pink,bg:T.pnkBg,tc:T.pnkDk,type:'friends',tasks:[]},
  {id:'SP',label:'Sponsees',color:T.teal,bg:T.teaBg,tc:T.teaDk,type:'sponsees',tasks:[mkTask('SP1','Call — Mickael',1,{who:'Mickael'}),mkTask('SP2','Call — Chris',1,{who:'Chris'}),mkTask('SP3','Call — Louis',1,{who:'Louis'}),mkTask('SP4','Call — Mohamed Iran',1,{who:'Mohamed Iran'})]},
  {id:'DR',label:'Doctors / Dentists',color:T.navy,bg:T.b50,tc:T.navyDk,type:'standard',tasks:[mkTask('D1','Dentist appointment',3,{exactTime:'14:00',taskDate:'2026-05-11'})]},
  {id:'MI',label:'Misc / Other',color:T.gray,bg:T.gryBg,tc:T.gryDk,type:'misc',tasks:[]},
];

function todayKey(){return 'db:'+new Date().toISOString().split('T')[0];}
function getMon(ds){const d=new Date(ds||new Date());const day=d.getDay();const diff=d.getDate()-day+(day===0?-6:1);return new Date(new Date(ds||new Date()).setDate(diff));}
function addWeeks(date,w){const d=new Date(date);d.setDate(d.getDate()+w*7);return d;}
function fmtDate(d){try{return new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});}catch{return '';}}
function fmtShort(d){try{return new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric'});}catch{return '';}}

const AC_TZ={};
[201,202,203,207,212,215,216,229,231,239,240,267,272,276,301,302,304,305,315,321,330,336,347,351,352,386,401,404,407,410,412,413,423,434,440,443,470,478,484,516,518,540,551,561,570,571,585,607,609,610,614,617,631,646,678,703,704,706,717,718,727,732,757,770,772,781,786,803,804,813,814,828,843,845,850,856,857,859,862,864,904,908,910,912,914,929,941,954,973,978,980,984].forEach(c=>AC_TZ[c]='EST');
[205,210,214,228,251,254,256,262,270,281,312,314,316,318,334,361,402,405,409,414,417,501,502,504,507,512,515,563,573,580,601,608,612,618,630,636,641,651,660,662,682,708,713,715,731,763,769,773,785,806,830,832,870,901,903,913,920,936,940,956,972,979].forEach(c=>AC_TZ[c]='CST');
[208,303,307,385,406,435,480,505,575,602,623,720,801,928].forEach(c=>AC_TZ[c]='MST');
[206,209,213,253,310,323,360,408,415,424,425,442,503,510,530,541,559,619,626,650,657,661,707,714,747,760,775,805,818,831,858,909,916,925,949,951].forEach(c=>AC_TZ[c]='PST');
[808].forEach(c=>AC_TZ[c]='HST');
function getTZ(p){const d=(p||'').replace(/\D/g,'');let a;if(d.startsWith('1')&&d.length>=11)a=+d.substring(1,4);else if(d.length>=10)a=+d.substring(0,3);return a?(AC_TZ[a]||'INT'):'INT';}
const TZ_CLR={EST:'#185FA5',CST:'#534AB7',MST:'#854F0B',PST:'#27500A',HST:'#085041',INT:'#5F5E5A'};
function statusBg(s){return s==='Done'?{bg:'#E1F5EE',tc:'#085041'}:s==='Skipped'?{bg:'#FCEBEB',tc:'#791F1F'}:s==='In progress'?{bg:'#FAEEDA',tc:'#633806'}:{bg:'#F1EFE8',tc:'#444441'};}

function Btn({onClick,color,children,style={}}){return <button onClick={onClick} style={{fontSize:12,padding:'5px 12px',borderRadius:7,border:'none',background:color||T.navy,color:'white',cursor:'pointer',fontWeight:500,...style}}>{children}</button>;}
function SlotSel({val,onChange}){return <select value={val} onChange={e=>onChange(+e.target.value)} style={{fontSize:11,padding:'3px 4px',borderRadius:6,border:'0.5px solid '+T.b100,background:'white',cursor:'pointer',width:'100%'}}>{SLOTS.map(s=><option key={s.id} value={s.id}>{s.label}·{s.time}</option>)}</select>;}
function StatSel({val,onChange}){const c=statusBg(val);return <select value={val} onChange={e=>onChange(e.target.value)} style={{fontSize:11,padding:'3px 4px',borderRadius:6,border:'0.5px solid '+T.b100,background:c.bg,color:c.tc,cursor:'pointer',width:'100%'}}>{STAT_OPTS.map(s=><option key={s} value={s}>{s}</option>)}</select>;}
function WhoSel({val,onChange}){return <select value={val} onChange={e=>onChange(e.target.value)} style={{fontSize:11,padding:'3px 4px',borderRadius:6,border:'0.5px solid '+T.b100,background:'white',cursor:'pointer',width:'100%'}}><option value="">— who</option><option>All</option><option>Any</option><option>N/A</option>{WHO_GRP.map(g=><optgroup key={g.g} label={g.g}>{g.n.map(n=><option key={n} value={n}>{n}</option>)}</optgroup>)}</select>;}
function TimeIn({val,onChange}){return <input type="time" value={val||''} onChange={e=>onChange(e.target.value)} style={{fontSize:10,padding:'3px 2px',borderRadius:5,border:'0.5px solid '+T.b100,width:'100%'}}/>;}
function DateIn({val,onChange}){return <input type="date" value={val||''} onChange={e=>onChange(e.target.value)} style={{fontSize:10,padding:'3px 2px',borderRadius:5,border:'0.5px solid '+T.b100,width:'100%'}}/>;}
function ColHdr({cols,grid}){return <div style={{display:'grid',gridTemplateColumns:grid,padding:'4px 10px',background:'#e8f4ff',borderTop:'0.5px solid '+T.b100,gap:3}}>{cols.map(c=><span key={c} style={{fontSize:9,fontWeight:600,color:T.navyLt,textTransform:'uppercase',letterSpacing:'.05em'}}>{c}</span>)}</div>;}
function ActionSel({catId,val,onChange,actionLists}){
  const list=actionLists[catId]||DEFAULT_ACTION_LISTS[catId]||[];
  const crmLeads=catId==='WK'?(window._crmLeads||[]).slice(0,50):[];
  return <select value={val} onChange={e=>{if(e.target.value==='__add__'){const v=prompt('New action:');if(v&&v.trim()){onChange('__add__',v.trim());}}else onChange(e.target.value);}} style={{fontSize:11,padding:'3px 4px',borderRadius:6,border:'0.5px solid '+T.b100,background:'white',cursor:'pointer',width:'100%'}}>
    <option value="">— select action</option>
    {list.map(a=><option key={a} value={a}>{a}</option>)}
    {crmLeads.length>0&&<optgroup label="CRM Clients">{crmLeads.map(n=><option key={n} value={'Follow up — '+n}>Follow up — {n}</option>)}</optgroup>}
    <option value="__add__">✚ Add new action...</option>
  </select>;
}

function CatBlock({cat,updateCat,collapsed,toggleCollapse,actionLists,setActionLists,onTaskComplete}){
  const upTask=(idx,f,v)=>{const tasks=[...cat.tasks];tasks[idx]={...tasks[idx],[f]:v};
    if(f==='status'&&v==='Done'&&tasks[idx].status!=='Done')onTaskComplete(cat.id,tasks[idx].name);
    updateCat({...cat,tasks});};
  const addTask=()=>updateCat({...cat,tasks:[...cat.tasks,mkTask(cat.id+'_'+(cat.tasks.length+1),'',6)]});
  const removeTask=idx=>{if(!confirm('Remove task?'))return;updateCat({...cat,tasks:cat.tasks.filter((_,i)=>i!==idx)});};
  const handleAction=(idx,val,newName)=>{
    if(val==='__add__'&&newName){
      const nl={...actionLists,[cat.id]:[...(actionLists[cat.id]||DEFAULT_ACTION_LISTS[cat.id]||[]),newName]};
      setActionLists(nl);sSet('actionLists',nl);
      upTask(idx,'name',newName);
    } else upTask(idx,'name',val);
  };
  const done=cat.tasks.filter(t=>t.status==='Done').length;
  const lbVal=CAT_LB[cat.id]||0.5;
  const rowStyle=(t)=>({display:'grid',alignItems:'center',padding:'5px 10px',borderTop:'0.5px solid '+T.b100,background:t.status==='Done'?'#f8fff8':t.status==='Skipped'?'#fff8f8':'white',gap:3,opacity:t.status==='Skipped'?.6:1});

  return <div id={'cat-'+cat.id} style={{marginBottom:10,borderRadius:12,border:'0.5px solid '+T.b100,overflow:'hidden',boxShadow:'0 1px 4px rgba(0,0,0,.04)'}}>
    <div style={{background:cat.bg,padding:'8px 12px',display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}} onClick={()=>toggleCollapse(cat.id)}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:8,height:8,borderRadius:4,background:cat.color}}/>
        <span style={{fontSize:12,fontWeight:600,color:cat.tc,letterSpacing:'.04em',textTransform:'uppercase'}}>{cat.label}</span>
        {cat.tasks.length>0&&<span style={{fontSize:10,background:cat.color+'33',color:cat.tc,padding:'1px 6px',borderRadius:8}}>{done}/{cat.tasks.length}</span>}
        <span style={{fontSize:10,background:'#FFF8E1',color:'#B8860B',padding:'1px 6px',borderRadius:8}}>💎{lbVal}/task</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <button onClick={e=>{e.stopPropagation();addTask();}} style={{fontSize:11,padding:'2px 8px',borderRadius:5,border:'0.5px solid '+cat.tc+'44',background:'transparent',color:cat.tc,cursor:'pointer'}}>+ task</button>
        <span style={{fontSize:12,color:cat.tc}}>{collapsed?'▸':'▾'}</span>
      </div>
    </div>
    {!collapsed&&<>
      {cat.type==='exercise'&&<div style={{padding:'6px 10px',borderTop:'0.5px solid '+T.b100,background:'#f5fff5',display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:11,color:T.grnDk}}>My weight today (lbs):</span>
        <input type="number" value={cat.myWeight||''} onChange={e=>updateCat({...cat,myWeight:e.target.value})} placeholder="—" style={{width:70,fontSize:11,padding:'3px 6px',borderRadius:5,border:'0.5px solid '+T.b100}}/>
      </div>}
      {(cat.type==='standard'||cat.type==='misc')&&<>
        <ColHdr cols={['Action','Time Slot','Apt Time','Date','Status','']} grid="38% 18% 12% 12% 15% 5%"/>
        {cat.tasks.map((t,i)=><div key={i} style={{...rowStyle(t),gridTemplateColumns:'38% 18% 12% 12% 15% 5%'}}>
          {cat.type==='misc'
            ?<input value={t.name||''} onChange={e=>upTask(i,'name',e.target.value)} placeholder="Type task..." style={{fontSize:12,padding:'4px 6px',borderRadius:5,border:'0.5px solid '+T.b100,width:'100%'}}/>
            :<ActionSel catId={cat.id} val={t.name||''} onChange={(v,n)=>handleAction(i,v,n)} actionLists={actionLists}/>}
          <SlotSel val={t.slot} onChange={v=>upTask(i,'slot',v)}/>
          <TimeIn val={t.exactTime} onChange={v=>upTask(i,'exactTime',v)}/>
          <DateIn val={t.taskDate} onChange={v=>upTask(i,'taskDate',v)}/>
          <StatSel val={t.status} onChange={v=>{const tasks=[...cat.tasks];const prev=tasks[i].status;tasks[i]={...tasks[i],status:v};if(v==='Done'&&prev!=='Done')onTaskComplete(cat.id,tasks[i].name);updateCat({...cat,tasks});}}/>
          <button onClick={()=>removeTask(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:0}}>✕</button>
        </div>)}
      </>}
      {cat.type==='family'&&<>
        <ColHdr cols={['Action','Who','Time Slot','Apt Time','Date','Status','']} grid="30% 18% 16% 10% 10% 11% 5%"/>
        {cat.tasks.map((t,i)=><div key={i} style={{...rowStyle(t),gridTemplateColumns:'30% 18% 16% 10% 10% 11% 5%'}}>
          <ActionSel catId={cat.id} val={t.name||''} onChange={(v,n)=>handleAction(i,v,n)} actionLists={actionLists}/>
          <WhoSel val={t.who||''} onChange={v=>upTask(i,'who',v)}/>
          <SlotSel val={t.slot} onChange={v=>upTask(i,'slot',v)}/>
          <TimeIn val={t.exactTime} onChange={v=>upTask(i,'exactTime',v)}/>
          <DateIn val={t.taskDate} onChange={v=>upTask(i,'taskDate',v)}/>
          <StatSel val={t.status} onChange={v=>{const tasks=[...cat.tasks];const prev=tasks[i].status;tasks[i]={...tasks[i],status:v};if(v==='Done'&&prev!=='Done')onTaskComplete(cat.id,tasks[i].name);updateCat({...cat,tasks});}}/>
          <button onClick={()=>removeTask(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:0}}>✕</button>
        </div>)}
      </>}
      {(cat.type==='friends'||cat.type==='sponsees')&&<>
        <ColHdr cols={['Action','Who','Time Slot','Apt Time','Date','Status','']} grid="30% 18% 16% 10% 10% 11% 5%"/>
        {cat.tasks.map((t,i)=><div key={i} style={{...rowStyle(t),gridTemplateColumns:'30% 18% 16% 10% 10% 11% 5%'}}>
          <ActionSel catId={cat.id} val={t.name||''} onChange={(v,n)=>handleAction(i,v,n)} actionLists={actionLists}/>
          <WhoSel val={t.who||''} onChange={v=>upTask(i,'who',v)}/>
          <SlotSel val={t.slot} onChange={v=>upTask(i,'slot',v)}/>
          <TimeIn val={t.exactTime} onChange={v=>upTask(i,'exactTime',v)}/>
          <DateIn val={t.taskDate} onChange={v=>upTask(i,'taskDate',v)}/>
          <StatSel val={t.status} onChange={v=>{const tasks=[...cat.tasks];const prev=tasks[i].status;tasks[i]={...tasks[i],status:v};if(v==='Done'&&prev!=='Done')onTaskComplete(cat.id,tasks[i].name);updateCat({...cat,tasks});}}/>
          <button onClick={()=>removeTask(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:0}}>✕</button>
        </div>)}
      </>}
      {cat.type==='exercise'&&<>
        <ColHdr cols={['Action','Sets','Reps','Lbs','Time Slot','Apt Time','Date','Status','']} grid="22% 7% 7% 7% 15% 10% 10% 17% 5%"/>
        {cat.tasks.map((t,i)=><div key={i} style={{...rowStyle(t),gridTemplateColumns:'22% 7% 7% 7% 15% 10% 10% 17% 5%'}}>
          <ActionSel catId={cat.id} val={t.name||''} onChange={(v,n)=>handleAction(i,v,n)} actionLists={actionLists}/>
          {['sets','reps','lbs'].map(f=><input key={f} type="number" value={t[f]||''} onChange={e=>upTask(i,f,e.target.value)} placeholder="—" style={{fontSize:11,padding:'3px 4px',borderRadius:5,border:'0.5px solid '+T.b100,textAlign:'center',width:'100%'}}/>)}
          <SlotSel val={t.slot} onChange={v=>upTask(i,'slot',v)}/>
          <TimeIn val={t.exactTime} onChange={v=>upTask(i,'exactTime',v)}/>
          <DateIn val={t.taskDate} onChange={v=>upTask(i,'taskDate',v)}/>
          <StatSel val={t.status} onChange={v=>{const tasks=[...cat.tasks];const prev=tasks[i].status;tasks[i]={...tasks[i],status:v};if(v==='Done'&&prev!=='Done')onTaskComplete(cat.id,tasks[i].name);updateCat({...cat,tasks});}}/>
          <button onClick={()=>removeTask(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:0}}>✕</button>
        </div>)}
      </>}
    </>}
  </div>;
}

function DayBuildTab({cats,setCats,save,lb,setLb,actionLists,setActionLists}){
  const [collapsed,setCollapsed]=useState({});
  const toggle=id=>setCollapsed(p=>({...p,[id]:!p[id]}));
  const updateCat=useCallback(cat=>setCats(p=>p.map(c=>c.id===cat.id?cat:c)),[setCats]);
  const handleComplete=(catId,taskName)=>{
    const reward=CAT_LB[catId]||0.5;
    const newLb={...lb,balance:+(lb.balance+reward).toFixed(2),totalEarned:+(lb.totalEarned+reward).toFixed(2),ledger:[{type:'earn',amount:reward,desc:'✅ '+taskName,date:new Date().toLocaleDateString()},...lb.ledger].slice(0,100)};
    setLb(newLb);sSet('lifeBucks',newLb);
  };
  const total=cats.reduce((a,c)=>a+c.tasks.length,0);
  const done=cats.reduce((a,c)=>a+c.tasks.filter(t=>t.status==='Done').length,0);
  const pct=total?Math.round(done/total*100):0;
  const bySlot={};SLOTS.forEach(s=>bySlot[s.id]=[]);
  cats.forEach(cat=>cat.tasks.forEach(t=>{if(bySlot[t.slot])bySlot[t.slot].push({name:t.name||'—',color:cat.color,status:t.status,time:t.exactTime,date:t.taskDate});}));
  return <div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10,flexWrap:'wrap',gap:8}}>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:13,color:T.navyLt,fontWeight:500}}>{done}/{total} done ({pct}%)</span>
        <div style={{width:90,height:7,background:'#e0e0e0',borderRadius:4,overflow:'hidden'}}><div style={{width:pct+'%',height:'100%',background:T.grn,borderRadius:4}}/></div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontSize:13,background:'#FFF8E1',color:'#B8860B',padding:'4px 10px',borderRadius:8,fontWeight:600}}>💎 {lb.balance.toFixed(2)} Life Bucks</span>
        <Btn onClick={save}>Save day ✓</Btn>
      </div>
    </div>
    <div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:10}}>
      {cats.map(cat=><button key={cat.id} onClick={()=>document.getElementById('cat-'+cat.id)&&document.getElementById('cat-'+cat.id).scrollIntoView({behavior:'smooth'})} style={{fontSize:11,padding:'3px 10px',borderRadius:12,border:'0.5px solid '+cat.color,background:cat.bg,color:cat.tc,cursor:'pointer'}}>{cat.label}</button>)}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:7,marginBottom:14}}>
      {SLOTS.map(s=>{const items=bySlot[s.id]||[];
        return <div key={s.id} style={{background:s.id===6?'#FAEEDA':'white',border:'0.5px solid '+T.b100,borderRadius:9,padding:'8px 10px',minHeight:55}}>
          <div style={{fontSize:11,fontWeight:600,color:s.id===6?T.ambDk:T.navyLt,marginBottom:4,textTransform:'uppercase',letterSpacing:'.04em'}}>{s.label}·{s.time}</div>
          {items.length===0?<div style={{fontSize:10,color:'#bbb',fontStyle:'italic'}}>empty</div>:items.map((t,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:4,marginBottom:2}}>
            <div style={{width:5,height:5,borderRadius:'50%',background:t.color,opacity:t.status==='Done'?.3:1,flexShrink:0}}/>
            <span style={{fontSize:11,textDecoration:t.status==='Done'?'line-through':'none',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.name.length>22?t.name.substring(0,22)+'…':t.name}{t.time?' · '+t.time:''}{t.date?' 📅':''}</span>
          </div>)}
        </div>;
      })}
    </div>
    {cats.map(cat=><CatBlock key={cat.id} cat={cat} updateCat={updateCat} collapsed={!!collapsed[cat.id]} toggleCollapse={toggle} actionLists={actionLists} setActionLists={setActionLists} onTaskComplete={handleComplete}/>)}
  </div>;
}

function CRMTab({leads,setLeads,notes,setNotes,saveLeads,saveNotes}){
  const [srch,setSrch]=useState('');const [fLang,setFLang]=useState('');const [fTZ,setFTZ]=useState('');const [fTag,setFTag]=useState('');
  const [sortCol,setSortCol]=useState(0);const [sortAsc,setSortAsc]=useState(true);
  const [showImp,setShowImp]=useState(false);const [impTxt,setImpTxt]=useState('');
  const [selLead,setSelLead]=useState(null);const [noteEdit,setNoteEdit]=useState('');
  const allTags=[...new Set(leads.flatMap(r=>(r[2]||'').split(',').map(t=>t.trim()).filter(Boolean)))].sort();
  window._crmLeads=leads.map(r=>r[3]||'').filter(Boolean);
  let filtered=[...leads];
  if(srch)filtered=filtered.filter(r=>[r[0],r[1],r[2],r[5],r[6],r[8]].join(' ').toLowerCase().includes(srch.toLowerCase())||(notes[r[3]+r[5]]||'').toLowerCase().includes(srch.toLowerCase()));
  if(fLang)filtered=filtered.filter(r=>(r[3]||'').toLowerCase()===fLang.toLowerCase());
  if(fTZ)filtered=filtered.filter(r=>getTZ(r[1])===fTZ);
  if(fTag)filtered=filtered.filter(r=>(r[2]||'').split(',').map(t=>t.trim()).includes(fTag));
  filtered.sort((a,b)=>sortAsc?(a[sortCol]||'').localeCompare(b[sortCol]||''):(b[sortCol]||'').localeCompare(a[sortCol]||''));
  const hot=leads.filter(r=>(r[2]||'').toUpperCase().includes('HOT')).length;
  const appt=leads.filter(r=>(r[7]||'').toLowerCase().includes('appointment set')).length;
  const dead=leads.filter(r=>(r[2]||'').toUpperCase().includes('DEAD')).length;
  function doImport(){
    const raw=impTxt.trim();if(!raw)return;
    const lines=raw.split('\n').filter(l=>l.trim());const sep=lines[0].includes('\t')?'\t':',';
    const hdrs=lines[0].split(sep).map(h=>h.trim().replace(/"/g,'').toLowerCase());
    const fi=k=>hdrs.findIndex(h=>h.includes(k));
    const iN=fi('lead name'),iP=hdrs.findIndex(h=>h.includes('phone')&&!h.includes('secondary')),iT=fi('tag'),iL=fi('language'),iA=fi('appointment date');
    const iR=hdrs.findIndex(h=>h.includes('r1-resort name')&&!h.includes('id')&&!h.includes('r2'));
    const iLS=fi('lead status'),iCS=fi('status of call'),iE=fi('email');
    const g=(c,i)=>i>=0?(c[i]||'').replace(/"/g,'').trim():'—';
    const nr=[];
    for(let i=1;i<lines.length;i++){const c=lines[i].split(sep);if(c.length<3)continue;const nm=g(c,iN);if(!nm||nm==='—')continue;nr.push([g(c,iP),g(c,iT),g(c,iA),nm,g(c,iL),g(c,iP),g(c,iR),g(c,iLS),g(c,iCS),g(c,iE)]);}
    if(nr.length){setLeads(nr);saveLeads(nr);setShowImp(false);setImpTxt('');}
  }
  function openLead(lead){setSelLead(lead);setNoteEdit(notes[lead[3]+lead[5]]||'');}
  function saveNote(){if(!selLead)return;const k=selLead[3]+selLead[5];const n={...notes,[k]:noteEdit};setNotes(n);saveNotes(n);}
  function deleteLead(idx){if(!confirm('Delete this lead?'))return;const nl=leads.filter((_,i)=>i!==idx);setLeads(nl);saveLeads(nl);if(selLead&&leads[idx]===selLead)setSelLead(null);}
  const tagClr=tag=>{const t=(tag||'').toUpperCase();if(t.includes('HOT'))return{bg:'#FCEBEB',tc:'#791F1F'};if(t.includes('WARM'))return{bg:'#EAF3DE',tc:'#27500A'};if(t.includes('DEAD'))return{bg:'#F1EFE8',tc:'#444441'};if(t.includes('COLD'))return{bg:'#E6F1FB',tc:'#0C447C'};if(t.includes('NO SHOW'))return{bg:'#FBEAF0',tc:'#72243E'};return{bg:'#E6F1FB',tc:'#0C447C'};};
  const callClr=s=>{const sl=(s||'').toLowerCase();if(sl.includes('canceled')||sl.includes('no show'))return{bg:'#FBEAF0',tc:'#72243E'};if(sl.includes('set'))return{bg:'#E1F5EE',tc:'#085041'};return{bg:'#FAEEDA',tc:'#633806'};};
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:12}}>
      {[['Total',leads.length,'#E6F1FB','#0C447C'],['HOT',hot,'#FCEBEB','#791F1F'],['Appt Set',appt,'#E1F5EE','#085041'],['Dead',dead,'#F1EFE8','#444441']].map(([l,v,bg,tc])=><div key={l} style={{background:bg,borderRadius:8,padding:'10px 12px',border:'0.5px solid '+tc+'33'}}><div style={{fontSize:11,color:tc,marginBottom:3}}>{l}</div><div style={{fontSize:22,fontWeight:600,color:tc}}>{v}</div></div>)}
    </div>
    <div style={{background:'#E6F1FB',border:'0.5px solid '+T.b100,borderRadius:10,padding:10,marginBottom:10,display:'flex',flexWrap:'wrap',gap:7}}>
      <input value={srch} onChange={e=>setSrch(e.target.value)} placeholder="Search name, phone, resort, notes..." style={{flex:1,minWidth:160,fontSize:12,padding:'6px 10px',borderRadius:8,border:'0.5px solid '+T.b100}}/>
      <select value={fLang} onChange={e=>setFLang(e.target.value)} style={{fontSize:12,padding:'6px',borderRadius:8,border:'0.5px solid '+T.b100}}><option value="">All langs</option><option>English</option><option>Spanish</option></select>
      <select value={fTZ} onChange={e=>setFTZ(e.target.value)} style={{fontSize:12,padding:'6px',borderRadius:8,border:'0.5px solid '+T.b100}}><option value="">All TZ</option>{['EST','CST','MST','PST','HST','INT'].map(z=><option key={z}>{z}</option>)}</select>
      <select value={fTag} onChange={e=>setFTag(e.target.value)} style={{fontSize:12,padding:'6px',borderRadius:8,border:'0.5px solid '+T.b100}}><option value="">All tags</option>{allTags.map(t=><option key={t}>{t}</option>)}</select>
      <span style={{fontSize:11,color:T.navy,padding:'6px 10px',background:T.b100,borderRadius:8,fontWeight:600}}>{filtered.length} leads</span>
      <Btn onClick={()=>setShowImp(!showImp)}>+ Import</Btn>
      <Btn onClick={()=>{if(confirm('Clear ALL leads?')){setLeads([]);saveLeads([]);}}} color={T.red}>Clear all</Btn>
    </div>
    {showImp&&<div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:10,padding:14,marginBottom:10}}>
      <div style={{fontSize:13,fontWeight:600,color:T.navy,marginBottom:4}}>Paste exported TSV or CSV — first row = headers</div>
      <div style={{fontSize:11,color:T.navyLt,marginBottom:8}}>Auto-maps all fields. Empty rows skipped automatically.</div>
      <textarea value={impTxt} onChange={e=>setImpTxt(e.target.value)} style={{width:'100%',height:130,border:'0.5px solid '+T.b100,borderRadius:8,padding:8,fontSize:11,fontFamily:'monospace',resize:'vertical'}} placeholder="Paste here..."/>
      <div style={{display:'flex',gap:8,marginTop:8,justifyContent:'flex-end'}}>
        <Btn onClick={()=>setShowImp(false)} color={T.gray} style={{color:'#333'}}>Cancel</Btn>
        <Btn onClick={doImport}>Import &amp; save</Btn>
      </div>
    </div>}
    {selLead&&<div style={{background:'#f8fbff',border:'2px solid '+T.b100,borderRadius:12,padding:14,marginBottom:12}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
        <div><div style={{fontSize:15,fontWeight:600,color:T.navy}}>{selLead[3]}</div><a href={'tel:'+selLead[5]} style={{fontSize:13,color:T.navyLt}}>{selLead[5]} · {getTZ(selLead[5])}</a></div>
        <div style={{display:'flex',gap:7}}>
          <Btn onClick={()=>deleteLead(leads.indexOf(selLead))} color={T.red}>Delete</Btn>
          <Btn onClick={()=>setSelLead(null)} color={T.gray} style={{color:'#333'}}>Close</Btn>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:6,marginBottom:10}}>
        {[['Resort',selLead[6]],['Lead Status',selLead[7]],['Call Status',selLead[8]],['Language',selLead[4]],['Appointment',selLead[2]?selLead[2].substring(0,10):'—'],['Email',selLead[9]]].map(([l,v])=><div key={l} style={{background:'#E6F1FB',borderRadius:6,padding:'6px 8px'}}><div style={{fontSize:10,color:T.navyLt,marginBottom:2}}>{l}</div><div style={{color:T.navyDk,fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',fontSize:12}}>{l==='Email'?<a href={'mailto:'+v} style={{color:T.navyLt}}>{v||'—'}</a>:v||'—'}</div></div>)}
        <div style={{background:'#E6F1FB',borderRadius:6,padding:'6px 8px',gridColumn:'1/-1'}}><div style={{fontSize:10,color:T.navyLt,marginBottom:2}}>Tag</div><div style={{color:T.navyDk,fontWeight:500,fontSize:11,wordBreak:'break-word'}}>{selLead[1]||'—'}</div></div>
      </div>
      <div><div style={{fontSize:11,fontWeight:600,color:T.navy,marginBottom:4}}>Notes</div>
        <textarea value={noteEdit} onChange={e=>setNoteEdit(e.target.value)} style={{width:'100%',height:80,border:'0.5px solid '+T.b100,borderRadius:6,padding:6,fontSize:12,resize:'vertical'}} placeholder="Call notes, next steps, objections..."/>
        <Btn onClick={saveNote} color={T.grn} style={{marginTop:6}}>Save note</Btn>
      </div>
    </div>}
    <div style={{overflowX:'auto',borderRadius:10,border:'0.5px solid '+T.b100}}>
      <table style={{width:'100%',borderCollapse:'collapse',tableLayout:'fixed',minWidth:760}}>
        <thead><tr style={{background:T.navy}}>
          {[['Lead Name',0,16],['Phone',1,13],['TZ',null,5],['Tag',2,9],['Lang',4,5],['Appt',2,10],['Resort',6,16],['Lead Status',7,11],['Call Status',8,10]].map(([l,col,w])=><th key={l} onClick={col!=null?()=>{setSortCol(col);setSortAsc(p=>col===sortCol?!p:true);}:undefined} style={{padding:'8px 8px',textAlign:'left',fontSize:10,fontWeight:500,color:T.b100,cursor:col!=null?'pointer':'default',width:w+'%',letterSpacing:'.03em'}}>{l}{col===sortCol?(sortAsc?' ↑':' ↓'):''}</th>)}
          <th style={{width:'5%',padding:'8px 4px',fontSize:10,color:T.b100}}></th>
        </tr></thead>
        <tbody>
          {filtered.map((r,i)=>{
            const tz=getTZ(r[5]);const tc=tagClr(r[1]);const cc=callClr(r[8]);const isNoted=notes[r[3]+r[5]];
            return <tr key={i} style={{background:i%2===0?'white':'#E6F1FB',cursor:'pointer'}} onClick={()=>openLead(r)}>
              <td style={{padding:'6px 8px',fontSize:12,fontWeight:500,color:T.navy,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',borderBottom:'0.5px solid '+T.b100}}>
                {r[3]||'—'}{isNoted&&<span style={{marginLeft:4,fontSize:9,background:'#FFF3CD',color:'#856404',padding:'1px 4px',borderRadius:3}}>note</span>}
              </td>
              <td style={{padding:'6px 8px',fontSize:11,fontFamily:'monospace',borderBottom:'0.5px solid '+T.b100}}><a href={'tel:'+r[5]} onClick={e=>e.stopPropagation()} style={{color:T.navyLt}}>{r[5]||'—'}</a></td>
              <td style={{padding:'6px 8px',borderBottom:'0.5px solid '+T.b100}}><span style={{background:TZ_CLR[tz]||'#888',color:'white',fontSize:9,padding:'2px 5px',borderRadius:8,fontWeight:500}}>{tz}</span></td>
              <td style={{padding:'6px 8px',borderBottom:'0.5px solid '+T.b100}}><span style={{background:tc.bg,color:tc.tc,fontSize:9,padding:'2px 6px',borderRadius:8,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',display:'inline-block',maxWidth:'100%'}}>{(r[1]||'—').split(',')[0].trim().substring(0,12)}</span></td>
              <td style={{padding:'6px 8px',fontSize:11,borderBottom:'0.5px solid '+T.b100,color:'#555'}}>{(r[4]||'').substring(0,3)}</td>
              <td style={{padding:'6px 8px',fontSize:10,borderBottom:'0.5px solid '+T.b100}}>{r[2]?r[2].substring(0,10):'—'}</td>
              <td style={{padding:'6px 8px',fontSize:11,color:T.navyLt,borderBottom:'0.5px solid '+T.b100,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{(r[6]||'—').substring(0,22)}</td>
              <td style={{padding:'6px 8px',fontSize:10,borderBottom:'0.5px solid '+T.b100,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{(r[7]||'—').substring(0,20)}</td>
              <td style={{padding:'6px 8px',borderBottom:'0.5px solid '+T.b100}}><span style={{background:cc.bg,color:cc.tc,fontSize:9,padding:'2px 5px',borderRadius:5,whiteSpace:'nowrap'}}>{(r[8]||'—').substring(0,14)}</span></td>
              <td style={{padding:'6px 4px',borderBottom:'0.5px solid '+T.b100}} onClick={e=>e.stopPropagation()}><button onClick={()=>deleteLead(leads.indexOf(r))} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:'2px 4px',borderRadius:3}}>✕</button></td>
            </tr>;
          })}
          {filtered.length===0&&<tr><td colSpan={10} style={{padding:24,textAlign:'center',color:'#aaa',fontSize:13,fontStyle:'italic'}}>No leads match filters</td></tr>}
        </tbody>
      </table>
    </div>
  </div>;
}

function CommTab({deals,setDeals,saveDeals}){
  const [fee,setFee]=useState('');const [vero,setVero]=useState(false);const [payType,setPayType]=useState('UCFS');
  const [client,setClient]=useState('');const [weekOf,setWeekOf]=useState(()=>new Date().toISOString().split('T')[0]);
  const mon=getMon(weekOf);const sun=new Date(mon);sun.setDate(mon.getDate()+6);
  const payFriDate=new Date(mon);payFriDate.setDate(mon.getDate()+11);
  const weekDeals=deals.filter(d=>d.weekOf===mon.toISOString().split('T')[0]);
  const weekVol=weekDeals.reduce((a,d)=>a+(+d.fee||0)-1000,0);
  const rate=weekVol<12000?.15:weekVol<20000?.17:weekVol<30000?.20:weekVol<50000?.23:.25;
  const feeN=+fee||0;const net=feeN-1000-(vero?25:0);const comm=Math.max(0,net*rate);
  const ez70Date=addWeeks(payFriDate,13);
  function addDeal(){
    if(!fee||+fee<1000)return;
    const monKey=getMon(weekOf).toISOString().split('T')[0];
    const d={id:Date.now(),client:client||'—',fee:+fee,vero,payType,weekOf:monKey,net,comm,rate,payFri:payFriDate.toISOString(),ez70Date:ez70Date.toISOString(),now:payType==='Easy Pay'?+(comm*.3).toFixed(2):+comm.toFixed(2),later:payType==='Easy Pay'?+(comm*.7).toFixed(2):0};
    const nd=[...deals,d];setDeals(nd);saveDeals(nd);setFee('');setClient('');setVero(false);
  }
  return <div>
    <div style={{background:'linear-gradient(135deg,'+T.navyDk+','+T.navy+')',borderRadius:12,padding:'13px 17px',color:'white',marginBottom:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><div style={{fontSize:11,color:T.b200}}>Pay Week</div><div style={{fontSize:16,fontWeight:700}}>{fmtShort(mon)} – {fmtShort(sun)}</div></div>
      <div style={{textAlign:'right'}}><div style={{fontSize:11,color:T.b200}}>Payday</div><div style={{fontSize:16,fontWeight:700,color:'#5DCAA5'}}>{fmtDate(payFriDate)}</div></div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
      <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:16}}>
        <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:12}}>New deal entry</div>
        <div style={{marginBottom:10}}><label style={{fontSize:11,color:T.navyLt,display:'block',marginBottom:3}}>Client name</label><input value={client} onChange={e=>setClient(e.target.value)} placeholder="Client name..." style={{width:'100%',fontSize:13,padding:'6px 8px',borderRadius:6,border:'0.5px solid '+T.b100}}/></div>
        <div style={{marginBottom:10}}><label style={{fontSize:11,color:T.navyLt,display:'block',marginBottom:3}}>Our fee ($)</label><input type="number" value={fee} onChange={e=>setFee(e.target.value)} placeholder="0.00" style={{width:'100%',fontSize:13,padding:'6px 8px',borderRadius:6,border:'0.5px solid '+T.b100}}/></div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
          <div><label style={{fontSize:11,color:T.navyLt,display:'block',marginBottom:3}}>Week of</label><input type="date" value={weekOf} onChange={e=>setWeekOf(e.target.value)} style={{width:'100%',fontSize:12,padding:'6px 8px',borderRadius:6,border:'0.5px solid '+T.b100}}/></div>
          <div><label style={{fontSize:11,color:T.navyLt,display:'block',marginBottom:3}}>Payment type</label><select value={payType} onChange={e=>setPayType(e.target.value)} style={{width:'100%',fontSize:12,padding:'7px 8px',borderRadius:6,border:'0.5px solid '+T.b100}}>{['UCFS','Affirm','Cash','Easy Pay'].map(p=><option key={p}>{p}</option>)}</select></div>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}><input type="checkbox" checked={vero} onChange={e=>setVero(e.target.checked)} style={{width:14,height:14}}/><label style={{fontSize:12,color:T.navyLt}}>Afterhours Vero (-$25)</label></div>
        {feeN>=1000&&<div style={{background:'#E6F1FB',borderRadius:8,padding:12,marginBottom:10}}>
          {[['Fee','$'+feeN.toLocaleString()],['- Base deduct','-$1,000'],vero?['- Afterhours Vero','-$25']:null,['Net','$'+net.toLocaleString()],['Week volume','$'+weekVol.toLocaleString()],['Rate',(rate*100).toFixed(0)+'%'],['Gross commission','$'+comm.toFixed(2)]].filter(Boolean).map(([l,v],i)=><div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:12,padding:'2px 0',borderBottom:i===5?'1px solid '+T.b100:'none'}}><span style={{color:'#555'}}>{l}</span><span style={{fontWeight:i===6?600:400,color:i===6?T.navy:'#333'}}>{v}</span></div>)}
          {payType==='Easy Pay'?<div style={{marginTop:8,padding:'8px',background:'#FAEEDA',borderRadius:6}}><div style={{fontSize:11,fontWeight:600,color:T.ambDk}}>Easy Pay split</div><div style={{fontSize:12,color:T.ambDk}}>30% now ({fmtDate(payFriDate)}): <strong>${(comm*.3).toFixed(2)}</strong></div><div style={{fontSize:12,color:T.ambDk}}>70% in 13 weeks ({fmtDate(ez70Date)}): <strong>${(comm*.7).toFixed(2)}</strong></div></div>
          :<div style={{marginTop:8,padding:'8px',background:'#E1F5EE',borderRadius:6}}><div style={{fontSize:12,color:T.teaDk}}>Full commission payday {fmtDate(payFriDate)}: <strong>${comm.toFixed(2)}</strong></div></div>}
        </div>}
        <button onClick={addDeal} disabled={feeN<1000} style={{padding:'9px',borderRadius:8,border:'none',background:feeN>=1000?T.navy:'#ccc',color:'white',fontSize:13,fontWeight:600,cursor:feeN>=1000?'pointer':'not-allowed',width:'100%'}}>Add deal to week</button>
      </div>
      <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:16}}>
        <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:10}}>Week of {fmtShort(mon)}</div>
        {weekDeals.length===0?<div style={{color:'#aaa',fontSize:12,fontStyle:'italic',marginTop:20}}>No deals this week yet.</div>:<>
          {weekDeals.map(d=><div key={d.id} style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',padding:'8px 0',borderBottom:'0.5px solid '+T.b100,fontSize:12}}>
            <div><div style={{fontWeight:600,color:T.navy}}>{d.client}</div><div style={{color:'#666',fontSize:11}}>Fee: ${(+d.fee).toLocaleString()} · {d.payType} · {(d.rate*100).toFixed(0)}%</div>
              {d.payType==='Easy Pay'?<div style={{color:T.ambDk,fontSize:11}}>Now: ${d.now.toFixed(2)} · 13wk: ${d.later.toFixed(2)}</div>:<div style={{color:T.teaDk,fontSize:11}}>Commission: ${(+d.comm).toFixed(2)}</div>}
            </div>
            <button onClick={()=>{if(confirm('Remove?')){const nd=deals.filter(x=>x.id!==d.id);setDeals(nd);saveDeals(nd);}}} style={{fontSize:10,padding:'2px 8px',borderRadius:5,border:'0.5px solid #ccc',background:'#fee2e2',color:'#991b1b',cursor:'pointer'}}>Remove</button>
          </div>)}
          <div style={{marginTop:10,padding:'10px',background:'#E6F1FB',borderRadius:8}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:2}}><span style={{color:T.navyLt}}>Week volume</span><span style={{fontWeight:600,color:T.navy}}>${weekVol.toLocaleString()}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:2}}><span style={{color:T.navyLt}}>Rate tier</span><span style={{fontWeight:600,color:T.navy}}>{(rate*100).toFixed(0)}%</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:14,marginTop:6,borderTop:'0.5px solid '+T.b100,paddingTop:6}}><span style={{color:T.navy,fontWeight:600}}>Earned this week</span><span style={{fontWeight:600,color:T.grn}}>${weekDeals.reduce((a,d)=>a+d.now,0).toFixed(2)}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:12}}><span style={{color:T.navyLt}}>EZ Pay pending</span><span style={{color:T.ambDk}}>${weekDeals.reduce((a,d)=>a+d.later,0).toFixed(2)}</span></div>
          </div>
        </>}
      </div>
    </div>
  </div>;
}

function HistTab({deals}){
  const [selWeek,setSelWeek]=useState('');
  const weeks=[...new Set(deals.map(d=>d.weekOf))].sort().reverse();
  const wk=selWeek||weeks[0]||'';
  const weekDeals=deals.filter(d=>d.weekOf===wk);
  const totalNow=weekDeals.reduce((a,d)=>a+d.now,0);
  const totalPending=weekDeals.reduce((a,d)=>a+d.later,0);
  const yearTotal=deals.reduce((a,d)=>a+d.now,0);
  const yearPending=deals.reduce((a,d)=>a+d.later,0);
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8,marginBottom:14}}>
      {[['Year earned','$'+yearTotal.toFixed(2),'#E1F5EE','#085041'],['EZ pending','$'+yearPending.toFixed(2),'#FAEEDA','#633806'],['Total deals',deals.length,'#E6F1FB','#0C447C']].map(([l,v,bg,tc])=><div key={l} style={{background:bg,borderRadius:8,padding:'10px 12px',border:'0.5px solid '+tc+'44'}}><div style={{fontSize:11,color:tc}}>{l}</div><div style={{fontSize:18,fontWeight:500,color:tc}}>{v}</div></div>)}
    </div>
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12,flexWrap:'wrap'}}>
      <select value={wk} onChange={e=>setSelWeek(e.target.value)} style={{fontSize:13,padding:'6px 10px',borderRadius:8,border:'0.5px solid '+T.b100}}>
        {weeks.length===0?<option>No weeks yet</option>:weeks.map(w=>{const m=new Date(w);const s=new Date(m);s.setDate(m.getDate()+6);const p=new Date(m);p.setDate(m.getDate()+11);return<option key={w} value={w}>Week {fmtShort(m)} – {fmtShort(s)} · Pay {fmtShort(p)}</option>;})}
      </select>
      {weekDeals.length>0&&<div style={{display:'flex',gap:8}}>
        <span style={{fontSize:12,background:'#E1F5EE',color:'#085041',padding:'4px 10px',borderRadius:8}}>Earned: ${totalNow.toFixed(2)}</span>
        <span style={{fontSize:12,background:'#FAEEDA',color:'#633806',padding:'4px 10px',borderRadius:8}}>EZ Pending: ${totalPending.toFixed(2)}</span>
      </div>}
    </div>
    {weekDeals.length===0?<div style={{color:'#aaa',fontStyle:'italic',fontSize:13}}>No deals for this week.</div>:
      <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:10,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:12}}>
          <thead><tr style={{background:T.navy}}>{['Client','Fee','Type','Rate','Net comm','Now','13wk later','Pay date'].map(h=><th key={h} style={{padding:'8px 10px',textAlign:'left',fontSize:10,fontWeight:500,color:T.b100}}>{h}</th>)}</tr></thead>
          <tbody>{weekDeals.map((d,i)=><tr key={d.id} style={{background:i%2===0?'white':'#E6F1FB'}}>
            <td style={{padding:'7px 10px',color:T.navy,fontWeight:500}}>{d.client}</td>
            <td style={{padding:'7px 10px'}}>${(+d.fee).toLocaleString()}</td>
            <td style={{padding:'7px 10px'}}>{d.payType}</td>
            <td style={{padding:'7px 10px'}}>{(d.rate*100).toFixed(0)}%</td>
            <td style={{padding:'7px 10px'}}>${(+d.comm).toFixed(2)}</td>
            <td style={{padding:'7px 10px',color:T.teaDk,fontWeight:500}}>${d.now.toFixed(2)}</td>
            <td style={{padding:'7px 10px',color:T.ambDk}}>{d.later>0?'$'+d.later.toFixed(2):'—'}</td>
            <td style={{padding:'7px 10px',fontSize:11,color:'#555'}}>{fmtDate(d.payFri)}{d.later>0&&<div style={{fontSize:10,color:T.ambDk}}>70%: {fmtDate(d.ez70Date)}</div>}</td>
          </tr>)}</tbody>
        </table>
      </div>}
  </div>;
}

function RewardsTab({lb,setLb}){
  function spend(reward){
    if(lb.balance<reward.cost){alert('Need '+(reward.cost-lb.balance).toFixed(2)+' more Life Bucks!');return;}
    const newLb={...lb,balance:+(lb.balance-reward.cost).toFixed(2),totalSpent:+(lb.totalSpent+reward.cost).toFixed(2),ledger:[{type:'spend',amount:reward.cost,desc:reward.ico+' '+reward.name,date:new Date().toLocaleDateString()},...lb.ledger].slice(0,100)};
    setLb(newLb);sSet('lifeBucks',newLb);
    alert('🎉 Enjoy your '+reward.name+'!\nBalance: 💎'+newLb.balance.toFixed(2)+' Life Bucks');
  }
  return <div>
    <div style={{background:'linear-gradient(135deg,#7D5000,#B8860B,#D4A017)',borderRadius:14,padding:'18px 22px',color:'white',marginBottom:14,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div><div style={{fontSize:12,opacity:.85,marginBottom:3}}>Sebastian S. — Life Buck Balance</div><div style={{fontSize:34,fontWeight:800}}>💎 {lb.balance.toFixed(2)}</div><div style={{fontSize:11,opacity:.85,marginTop:2}}>Life Bucks™ · 1 LB = $1.00</div></div>
      <div style={{textAlign:'right'}}><div style={{fontSize:12,opacity:.85}}>All-time earned</div><div style={{fontSize:22,fontWeight:700}}>💎 {lb.totalEarned.toFixed(2)}</div><div style={{fontSize:12,opacity:.85,marginTop:4}}>All-time spent</div><div style={{fontSize:18,fontWeight:700}}>💎 {lb.totalSpent.toFixed(2)}</div></div>
    </div>
    <div style={{marginBottom:12}}>
      <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:8}}>Point Values by Task Type — 25 Reward Tiers</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:5,marginBottom:14}}>
        {LB_TIERS.map(l=><div key={l.val} style={{background:l.bg,borderRadius:7,padding:'7px 8px',textAlign:'center',border:'0.5px solid '+l.tc+'44'}}><div style={{fontSize:15,fontWeight:700,color:l.tc}}>{l.label}</div><div style={{fontSize:9,color:l.tc,opacity:.75,marginTop:1}}>{l.val<10?l.val<5?'chores':'tasks':l.val<100?'work':'milestone'}</div></div>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:5,marginBottom:14}}>
        {Object.entries(CAT_LB).map(([id,val])=>{const cat=DEFAULT_CATS.find(c=>c.id===id);const tier=LB_TIERS.find(t=>t.val===val)||LB_TIERS[0];return<div key={id} style={{background:tier.bg,borderRadius:7,padding:'7px 8px',textAlign:'center',border:'0.5px solid '+tier.tc+'44'}}><div style={{fontSize:11,fontWeight:600,color:tier.tc}}>{cat&&cat.label||id}</div><div style={{fontSize:14,fontWeight:700,color:tier.tc}}>💎 {val}</div></div>;})}
      </div>
    </div>
    <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:10}}>🛍️ Reward Store</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:14}}>
      {REWARDS.map(r=>{const can=lb.balance>=r.cost;return<div key={r.name} style={{background:'white',borderRadius:12,border:'1.5px solid '+(can?T.grn:'#e0d0a0'),padding:14,opacity:can?1:.85}}>
        <div style={{fontSize:28,marginBottom:6}}>{r.ico}</div>
        <div style={{fontSize:13,fontWeight:700,color:'#333',marginBottom:3}}>{r.name}</div>
        <div style={{fontSize:11,color:T.gray,marginBottom:8}}>{r.desc}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:18,fontWeight:800,color:'#B8860B'}}>💎 {r.cost}</div>
          {can?<button onClick={()=>spend(r)} style={{fontSize:11,padding:'5px 12px',borderRadius:7,border:'none',background:'#D4A017',color:'white',cursor:'pointer',fontWeight:600}}>Redeem!</button>
            :<span style={{fontSize:10,padding:'2px 8px',borderRadius:8,background:'#f0f0f0',color:'#999'}}>Need {(r.cost-lb.balance).toFixed(0)} more</span>}
        </div>
      </div>;})}
    </div>
    <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:10}}>📜 Recent Activity</div>
    {lb.ledger.length===0?<div style={{color:'#aaa',fontStyle:'italic',fontSize:13}}>No activity yet — complete tasks to earn Life Bucks!</div>
      :lb.ledger.slice(0,20).map((e,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:'0.5px solid #e8f0f8',fontSize:12}}>
        <div><div style={{fontWeight:500,color:'#333'}}>{e.desc}</div><div style={{fontSize:10,color:'#888'}}>{e.date}</div></div>
        <div style={{fontSize:16,fontWeight:700,color:e.type==='earn'?T.grn:T.redDk}}>{e.type==='earn'?'+':'-'}💎{e.amount.toFixed(2)}</div>
      </div>)}
  </div>;
}

function PurposeTab({answers,setAnswers}){
  const [step,setStep]=useState(0);
  const [drafts,setDrafts]=useState(answers);
  const ans=PURP_QS.filter(q=>answers[q.id]&&answers[q.id].trim()).length;
  function save(idx,next){
    const newA={...answers,[PURP_QS[idx].id]:drafts[PURP_QS[idx].id]||''};
    setAnswers(newA);sSet('purposeAnswers',newA);
    if(next>=0)setStep(next);
  }
  const q=PURP_QS[step];
  return <div>
    <div style={{background:'linear-gradient(135deg,'+T.purDk+','+T.purple+')',borderRadius:14,padding:'18px 22px',color:'white',marginBottom:14}}>
      <div style={{fontSize:11,color:'rgba(255,255,255,.7)',marginBottom:4}}>Sebastian S. — Life Architecture</div>
      <div style={{fontSize:20,fontWeight:800,marginBottom:4}}>🧭 Purpose, Mission &amp; Values</div>
      <div style={{fontSize:13,opacity:.8}}>{ans}/{PURP_QS.length} questions answered</div>
      <div style={{height:5,background:'rgba(255,255,255,.2)',borderRadius:3,overflow:'hidden',marginTop:10}}><div style={{width:(ans/PURP_QS.length*100)+'%',height:'100%',background:'white',borderRadius:3}}/></div>
    </div>
    <div style={{background:'white',borderRadius:12,border:'2px solid '+T.purple,padding:20,marginBottom:12}}>
      <div style={{fontSize:11,color:T.purDk,fontWeight:600,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:5}}>Question {step+1} of {PURP_QS.length}</div>
      <div style={{fontSize:17,fontWeight:700,color:T.purDk,marginBottom:6,lineHeight:1.4}}>{q.q}</div>
      <div style={{fontSize:12,color:T.gray,marginBottom:12,fontStyle:'italic'}}>{q.hint}</div>
      <textarea value={drafts[q.id]||''} onChange={e=>setDrafts(p=>({...p,[q.id]:e.target.value}))} placeholder="Your answer..." style={{width:'100%',minHeight:90,padding:10,borderRadius:8,border:'0.5px solid '+T.b100,fontSize:13,resize:'vertical',fontFamily:'inherit'}}/>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
        {step>0?<Btn onClick={()=>{save(step,step-1);}} color={T.gray} style={{color:'#333'}}>← Back</Btn>:<span/>}
        <Btn onClick={()=>save(step,step<PURP_QS.length-1?step+1:-1)} color={T.purple}>{step<PURP_QS.length-1?'Save & Next →':'Save & Finish ✓'}</Btn>
      </div>
    </div>
    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:12}}>
      {PURP_QS.map((pq,i)=><button key={i} onClick={()=>setStep(i)} style={{fontSize:11,padding:'4px 10px',borderRadius:8,border:'0.5px solid '+(answers[pq.id]?T.purple:T.b100),background:answers[pq.id]?T.purBg:i===step?T.b50:'white',color:answers[pq.id]?T.purDk:T.navy,cursor:'pointer'}}>{i+1}. {pq.id.replace('_',' ')}{answers[pq.id]?' ✓':''}</button>)}
    </div>
    {ans>0&&<div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:16}}>
      <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:12}}>Your Life Architecture</div>
      {[{id:'purpose',label:'Life Purpose',icon:'⚡'},{id:'mission',label:'Personal Mission',icon:'🎯'},{id:'values',label:'Core Values',icon:'💎'},{id:'legacy',label:'Legacy',icon:'🌟'},{id:'family_role',label:'Family Role',icon:'👨‍👩‍👧'}].filter(f=>answers[f.id]).map(f=><div key={f.id} style={{background:'linear-gradient(135deg,'+T.purBg+',white)',border:'1px solid '+T.purple+'44',borderRadius:10,padding:14,marginBottom:8}}>
        <div style={{fontSize:11,fontWeight:700,color:T.purDk,textTransform:'uppercase',letterSpacing:'.05em',marginBottom:5}}>{f.icon} {f.label}</div>
        <div style={{fontSize:14,color:T.purDk,lineHeight:1.7,fontStyle:'italic'}}>{answers[f.id]}</div>
      </div>)}
    </div>}
  </div>;
}

function FavoritesTab({favs,setFavs}){
  const [name,setName]=useState('');const [url,setUrl]=useState('');const [ico,setIco]=useState('');
  function add(){if(!name.trim()||!url.trim())return;const nf=[...favs,{name:name.trim(),url:url.trim(),ico:ico.trim()||'🔗'}];setFavs(nf);sSet('favLinks',nf);setName('');setUrl('');setIco('');}
  function remove(i){if(!confirm('Remove?'))return;const nf=favs.filter((_,j)=>j!==i);setFavs(nf);sSet('favLinks',nf);}
  return <div>
    <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:16,marginBottom:12}}>
      <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:12}}>⭐ My Favorite Links</div>
      <div style={{display:'flex',gap:7,marginBottom:14,flexWrap:'wrap'}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Label (e.g. My CRM)" style={{fontSize:12,padding:'6px 9px',borderRadius:7,border:'0.5px solid '+T.b100,flex:1,minWidth:120}}/>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..." style={{fontSize:12,padding:'6px 9px',borderRadius:7,border:'0.5px solid '+T.b100,flex:2,minWidth:180}}/>
        <input value={ico} onChange={e=>setIco(e.target.value)} placeholder="🔗" style={{fontSize:12,padding:'6px 9px',borderRadius:7,border:'0.5px solid '+T.b100,width:60}}/>
        <Btn onClick={add}>Add link</Btn>
      </div>
      {favs.length===0?<div style={{color:'#aaa',fontStyle:'italic',fontSize:13}}>No links yet — add your favorites above</div>
        :<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:9}}>
          {favs.map((f,i)=><div key={i} style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:9,padding:13,display:'flex',alignItems:'center',gap:9}}>
            <div style={{fontSize:22,flexShrink:0}}>{f.ico}</div>
            <div style={{flex:1,overflow:'hidden'}}>
              <div style={{fontSize:12,fontWeight:700,color:T.navy,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}><a href={f.url} target="_blank" rel="noreferrer" style={{color:T.navy}}>{f.name}</a></div>
              <div style={{fontSize:10,color:T.gray,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{f.url}</div>
            </div>
            <button onClick={()=>remove(i)} style={{fontSize:10,color:'#ccc',border:'none',background:'none',cursor:'pointer',padding:'2px 4px',borderRadius:3,flexShrink:0}}>✕</button>
          </div>)}
        </div>}
    </div>
  </div>;
}

function DashTab({tab,setTab,cats,leads,deals,lb,nhQuoteIdx,setNhQuoteIdx}){
  const total=cats.reduce((a,c)=>a+c.tasks.length,0);
  const done=cats.reduce((a,c)=>a+c.tasks.filter(t=>t.status==='Done').length,0);
  const yearTotal=deals.reduce((a,d)=>a+d.now,0);
  const q=NH_QUOTES[nhQuoteIdx];
  const cards=[
    {ico:'📅',title:'Day Build',sub:done+'/'+total+' tasks today',color:T.purple,id:'day'},
    {ico:'👥',title:'PNC CRM',sub:leads.length+' leads loaded',color:T.blue,id:'crm'},
    {ico:'💰',title:'Commission',sub:'Track deals & pay',color:T.teal,id:'comm'},
    {ico:'📈',title:'Pay History',sub:deals.length+' deals recorded',color:T.coral,id:'hist'},
    {ico:'🏆',title:'Rewards',sub:'💎 '+lb.balance.toFixed(2)+' Life Bucks',color:T.gold,id:'rew'},
    {ico:'🧭',title:'Purpose',sub:'Mission & values',color:T.purple,id:'purp'},
  ];
  return <div>
    <div style={{background:'linear-gradient(135deg,'+T.navyDk+','+T.navy+')',borderRadius:14,padding:'18px 22px',color:'white',marginBottom:14}}>
      <div style={{fontSize:11,color:T.b200,marginBottom:4}}>Good morning, Sebastian S.</div>
      <select value={nhQuoteIdx} onChange={e=>{setNhQuoteIdx(+e.target.value);sSet('nhQIdx',+e.target.value);}} style={{fontSize:11,padding:'5px 8px',borderRadius:7,border:'0.5px solid rgba(255,255,255,.3)',background:'rgba(255,255,255,.1)',color:'white',marginBottom:9,width:'100%',fontFamily:'inherit'}}>
        {NH_QUOTES.map((q,i)=><option key={i} value={i}>Napoleon Hill: {q.title}</option>)}
      </select>
      {q&&<><div style={{fontSize:14,fontStyle:'italic',lineHeight:1.6,color:'#E6F1FB'}}>"{q.quote}"</div><div style={{fontSize:11,color:T.b200,marginTop:6}}>— Napoleon Hill · {q.title}</div></>}
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:14}}>
      {cards.map(c=><div key={c.id} onClick={()=>setTab(c.id)} style={{background:'white',borderRadius:13,padding:16,border:'0.5px solid '+T.b100,cursor:'pointer',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,right:0,width:50,height:50,borderRadius:'0 13px 0 50px',background:c.color,opacity:.12}}/>
        <div style={{fontSize:28,marginBottom:6}}>{c.ico}</div>
        <div style={{fontSize:14,fontWeight:700,color:c.color,marginBottom:2}}>{c.title}</div>
        <div style={{fontSize:11,color:T.gray}}>{c.sub}</div>
      </div>)}
    </div>
    <div style={{background:'white',border:'0.5px solid '+T.b100,borderRadius:12,padding:15}}>
      <div style={{fontSize:14,fontWeight:600,color:T.navy,marginBottom:10}}>Today at a Glance — Sebastian S.</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
        {[['Tasks done',done+'/'+total,'#E6F1FB','#0C447C'],['Life Bucks','💎 '+lb.balance.toFixed(0),'#FFF8E1','#7D5000'],['Year earned','$'+yearTotal.toFixed(0),'#E1F5EE','#085041'],['CRM leads',leads.length,'#FAECE7','#712B13']].map(([l,v,bg,tc])=><div key={l} style={{background:bg,borderRadius:9,padding:'11px 12px'}}><div style={{fontSize:11,color:tc,marginBottom:3}}>{l}</div><div style={{fontSize:20,fontWeight:700,color:tc}}>{v}</div></div>)}
      </div>
    </div>
  </div>;
}

function App(){
  const [tab,setTab]=useState('dash');
  const [cats,setCats]=useState(DEFAULT_CATS);
  const [leads,setLeads]=useState([]);
  const [notes,setNotes]=useState({});
  const [deals,setDeals]=useState([]);
  const [lb,setLb]=useState({balance:0,totalEarned:0,totalSpent:0,ledger:[]});
  const [favs,setFavs]=useState([{name:'12 Easy Steps',url:'https://12easysteps.org/report-card.html',ico:'🔵'},{name:'Claude.ai',url:'https://claude.ai',ico:'⚡'},{name:'Zoho CRM',url:'https://crm.zoho.com',ico:'📊'}]);
  const [purposeAnswers,setPurposeAnswers]=useState({});
  const [nhQuoteIdx,setNhQuoteIdx]=useState(0);
  const [actionLists,setActionLists]=useState(DEFAULT_ACTION_LISTS);
  const [loading,setLoading]=useState(true);
  const [saved,setSaved]=useState(false);

  useEffect(()=>{
    (async()=>{
      const day=await sGet(todayKey());if(day)setCats(day);
      const l=await sGet('crm:leads');if(l)setLeads(l);
      const n=await sGet('crm:notes');if(n)setNotes(n);
      const d=await sGet('comm:deals');if(d)setDeals(d);
      const lb2=await sGet('lifeBucks');if(lb2)setLb(lb2);
      const fv=await sGet('favLinks');if(fv)setFavs(fv);
      const pa=await sGet('purposeAnswers');if(pa)setPurposeAnswers(pa);
      const qi=await sGet('nhQIdx');if(qi!=null)setNhQuoteIdx(qi);
      const al=await sGet('actionLists');if(al)setActionLists(al);
      setLoading(false);
    })();
  },[]);

  const saveDay=useCallback(async()=>{await sSet(todayKey(),cats);setSaved(true);setTimeout(()=>setSaved(false),2000);},[cats]);
  const saveLeads=useCallback(l=>sSet('crm:leads',l),[]);
  const saveNotes=useCallback(n=>sSet('crm:notes',n),[]);
  const saveDeals=useCallback(d=>sSet('comm:deals',d),[]);
  useEffect(()=>{if(!loading)sSet(todayKey(),cats);},[cats,loading]);

  const TABS=[
    {id:'dash',label:'🏠 Dashboard'},
    {id:'day',label:'📅 Day Build'},
    {id:'crm',label:'👥 PNC CRM'},
    {id:'comm',label:'💰 Commission'},
    {id:'hist',label:'📈 Pay History'},
    {id:'rew',label:'🏆 Rewards'},
    {id:'purp',label:'🧭 Purpose'},
    {id:'favs',label:'⭐ Favorites'},
  ];

  if(loading)return <div style={{padding:24,color:T.navyLt,fontSize:13}}>Loading Life OS — Sebastian S....</div>;

  return <div style={{fontFamily:'var(--font-sans)'}}>
    <div style={{background:'linear-gradient(135deg,'+T.navyDk+' 0%,'+T.navy+' 60%,'+T.navyLt+' 100%)',borderRadius:12,padding:'12px 16px',marginBottom:12,display:'flex',alignItems:'center',justifyContent:'space-between',boxShadow:'0 4px 20px rgba(12,68,124,.3)',flexWrap:'wrap',gap:8}}>
      <div><div style={{fontSize:16,fontWeight:800,color:'#E6F1FB',letterSpacing:'.01em'}}>⚡ Life OS</div><div style={{fontSize:10,color:T.b200,marginTop:1,fontStyle:'italic'}}>Sebastian S. — Personal Operating System</div></div>
      <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>
        {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{fontSize:11,padding:'6px 11px',borderRadius:8,border:'none',background:tab===t.id?'#185FA5':'rgba(255,255,255,.12)',color:tab===t.id?'white':T.b100,cursor:'pointer',fontWeight:tab===t.id?600:400}}>{t.label}</button>)}
      </div>
      <div style={{textAlign:'right'}}>
        <div style={{fontSize:11,color:T.b100}}>{new Date().toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})}</div>
        {saved&&<div style={{fontSize:10,color:'#5DCAA5'}}>✓ Saved</div>}
        <div style={{fontSize:11,color:'#D4A017',marginTop:1}}>💎 {lb.balance.toFixed(2)} LB</div>
      </div>
    </div>
    {tab==='dash'&&<DashTab tab={tab} setTab={setTab} cats={cats} leads={leads} deals={deals} lb={lb} nhQuoteIdx={nhQuoteIdx} setNhQuoteIdx={setNhQuoteIdx}/>}
    {tab==='day'&&<DayBuildTab cats={cats} setCats={setCats} save={saveDay} lb={lb} setLb={setLb} actionLists={actionLists} setActionLists={setActionLists}/>}
    {tab==='crm'&&<CRMTab leads={leads} setLeads={setLeads} notes={notes} setNotes={setNotes} saveLeads={saveLeads} saveNotes={saveNotes}/>}
    {tab==='comm'&&<CommTab deals={deals} setDeals={setDeals} saveDeals={saveDeals}/>}
    {tab==='hist'&&<HistTab deals={deals}/>}
    {tab==='rew'&&<RewardsTab lb={lb} setLb={setLb}/>}
    {tab==='purp'&&<PurposeTab answers={purposeAnswers} setAnswers={setPurposeAnswers}/>}
    {tab==='favs'&&<FavoritesTab favs={favs} setFavs={setFavs}/>}
  </div>;
}

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
</script>
</body>
</html>
