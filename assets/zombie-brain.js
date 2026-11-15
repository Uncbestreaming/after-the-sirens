;(function(root,factory){
 const ZombieBrain=factory();
 if(typeof module==='object'&&module.exports)module.exports={ZombieBrain};
 root.AfterSirensZombieBrain=ZombieBrain;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const SCHEMA_VERSION=1;
 const clamp=(n,min=0,max=100)=>Math.max(min,Math.min(max,Number.isFinite(Number(n))?Number(n):min));
 const clone=value=>JSON.parse(JSON.stringify(value));
 const makeRunId=()=>{
  try{if(globalThis.crypto?.randomUUID)return globalThis.crypto.randomUUID()}catch{}
  return 'run-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,10);
 };
 function validateExtension(ext){
  if(!ext||typeof ext!=='object'||Array.isArray(ext))throw new Error('Invalid ZombieBrain save extension.');
  if(ext.schemaVersion!==undefined&&(!Number.isInteger(Number(ext.schemaVersion))||Number(ext.schemaVersion)<1))throw new Error('Invalid ZombieBrain schema version.');
  if(Number(ext.schemaVersion)>SCHEMA_VERSION)throw new Error('This save was made by a newer ZombieBrain version.');
  if(ext.runId!==undefined&&typeof ext.runId!=='string')throw new Error('Invalid ZombieBrain run identifier.');
  if(ext.eventSequence!==undefined&&(!Number.isSafeInteger(Number(ext.eventSequence))||Number(ext.eventSequence)<0))throw new Error('Invalid ZombieBrain event counter.');
  if(ext.events!==undefined&&!Array.isArray(ext.events))throw new Error('Invalid ZombieBrain event history.');
  if(ext.processedEventIds!==undefined&&!Array.isArray(ext.processedEventIds))throw new Error('Invalid ZombieBrain event index.');
  if(ext.npcs!==undefined&&(!ext.npcs||typeof ext.npcs!=='object'||Array.isArray(ext.npcs)))throw new Error('Invalid ZombieBrain NPC memories.');
  if(ext.zombies!==undefined&&(!ext.zombies||typeof ext.zombies!=='object'||Array.isArray(ext.zombies)))throw new Error('Invalid ZombieBrain threat state.');
  if(ext.choiceIds!==undefined&&(!ext.choiceIds||typeof ext.choiceIds!=='object'||Array.isArray(ext.choiceIds)))throw new Error('Invalid ZombieBrain choice identifiers.');
  if(ext.zombies?.alert!==undefined&&!Number.isFinite(Number(ext.zombies.alert)))throw new Error('Invalid ZombieBrain alertness value.');
 }
 class ZombieBrain{
  constructor(state){
   if(!state||typeof state!=='object'||Array.isArray(state))throw new Error('ZombieBrain requires a game state object.');
   this.state=state;this.migrate();
  }
  static migrate(state){
   if(!state||typeof state!=='object'||Array.isArray(state))throw new Error('Save state must be an object.');
   const prior=state.zombieBrain;
   if(prior)validateExtension(prior);
   const ext={
    schemaVersion:SCHEMA_VERSION,runId:prior?.runId||makeRunId(),eventSequence:Math.max(0,Number(prior?.eventSequence)||0),
    events:Array.isArray(prior?.events)?prior.events.slice(-300):[],processedEventIds:Array.isArray(prior?.processedEventIds)?prior.processedEventIds.slice(-600):[],
    choiceIds:prior?.choiceIds&&typeof prior.choiceIds==='object'&&!Array.isArray(prior.choiceIds)?{...prior.choiceIds}:{},
    npcs:prior?.npcs&&typeof prior.npcs==='object'&&!Array.isArray(prior.npcs)?clone(prior.npcs):{},
    zombies:{nearby:Math.max(0,Number(prior?.zombies?.nearby)||3),alert:clamp(prior?.zombies?.alert||0)},
    turn:Math.max(0,Number(prior?.turn)||0),lastEvent:prior?.lastEvent||null
   };
   state.zombieBrain=ext;
   state.npcContacts=state.npcContacts&&typeof state.npcContacts==='object'&&!Array.isArray(state.npcContacts)?state.npcContacts:{};
   for(const [id,contact] of Object.entries(state.npcContacts)){
    if(!contact||typeof contact!=='object'||Array.isArray(contact))continue;
    contact.memories=Array.isArray(contact.memories)?contact.memories.slice(-40):[];
    const oldTrust=Number(contact.trust);contact.trust=clamp(Number.isFinite(oldTrust)?oldTrust:50,0,100);contact.fear=clamp(contact.fear??20,0,100);contact.loyalty=clamp(contact.loyalty??50,0,100);
    ext.npcs[id]??={memories:contact.memories.slice(),trust:contact.trust,fear:contact.fear,loyalty:contact.loyalty};
   }
   return state;
  }
  migrate(){return ZombieBrain.migrate(this.state)}
  get data(){return this.state.zombieBrain}
  eventId(context){
   const ext=this.data,key=String(context||'choice');
   if(ext.choiceIds[key])return ext.choiceIds[key];
   ext.eventSequence++;
   const id=ext.runId+'-e'+ext.eventSequence.toString(36);
   ext.choiceIds[key]=id;
   const keys=Object.keys(ext.choiceIds);if(keys.length>1600)for(const old of keys.slice(0,keys.length-1200))delete ext.choiceIds[old];
   return id;
  }
  contact(id){
   if(!id)return null;
   this.state.npcContacts??={};this.data.npcs??={};
   const c=this.state.npcContacts[id]||(this.state.npcContacts[id]={knowsName:false,learnedName:false,trust:0,fear:20,loyalty:50,memories:[]});
   c.trust=clamp(c.trust??50);c.fear=clamp(c.fear??20);c.loyalty=clamp(c.loyalty??50);c.memories=Array.isArray(c.memories)?c.memories:[];
   const memory=this.data.npcs[id]||(this.data.npcs[id]={memories:[],trust:c.trust,fear:c.fear,loyalty:c.loyalty});
   memory.trust=c.trust;memory.fear=c.fear;memory.loyalty=c.loyalty;memory.memories=c.memories;
   return c;
  }
  remember(id,text,day){
   const c=this.contact(id);if(!c)return;
   const item={day:Math.max(1,Number(day)||Number(this.state.daysSurvived)||1),text:String(text||'').slice(0,180)};
   c.memories.push(item);c.memories=c.memories.slice(-40);
   this.data.npcs[id].memories=c.memories;
  }
  npcDecision(id){
   const c=this.contact(id);if(!c)return'unavailable';
   if(c.fear>=85)return'panic';if(c.trust<10&&c.memories.some(m=>/refused|threatened/i.test(String(m?.text||''))))return'refuse';if(c.loyalty>=75&&c.trust>=60)return'protect_player';return'cooperate';
  }
  zombieBehavior(noise=0){const z=this.data.zombies;if(z.nearby<=0)return'no_threat';if(Number(noise)>=2||z.alert>=80)return'attack';if(Number(noise)>=1||z.alert>=30)return'investigate';return'wander'}
  applyChoice({id,action,kind,encounter,npcId,day,ammoAvailable,allowResourceTransfer=true}={}){
   if(!id||!action||!kind)throw new Error('ZombieBrain choices require an event ID, action, and kind.');
   const ext=this.data;if(ext.processedEventIds.includes(id))return{duplicate:true,event:ext.events.find(e=>e.id===id)||null};
   const text=String(action).slice(0,300),low=text.toLowerCase(),event={id,day:Math.max(1,Number(day)||Number(this.state.daysSurvived)||1),turn:ext.turn+1,scene:String(this.state.lastEncounterKind||encounter||'opening'),encounter:String(encounter||'opening'),kind:String(kind),action:text,npcId:npcId||'',effects:{}};
   const z=ext.zombies;
   if(kind==='fire'&&ammoAvailable){z.alert=clamp(z.alert+38);z.nearby=Math.max(1,z.nearby);event.effects.zombieAlert=38}
   else if(kind==='fight'){z.alert=clamp(z.alert+16);event.effects.zombieAlert=16}
   else if(kind==='radio'||kind==='drive'){z.alert=clamp(z.alert+7);event.effects.zombieAlert=7}
   else if(kind==='quiet'){z.alert=clamp(z.alert-12);event.effects.zombieAlert=-12}
   else if(kind==='observe'){z.alert=clamp(z.alert-3);event.effects.zombieAlert=-3}
   const contactId=npcId||this.state.activeNpcId;
   if(encounter==='human'&&contactId&&kind==='social'){
    const c=this.contact(contactId);let delta=1,memory='spoke with you';
    if(allowResourceTransfer&&/\b(share|give|offer)\b.{0,35}\b(food|ration|meal|suppl)/i.test(text)&&Number(this.state.food)>0){this.state.food=Math.max(0,this.state.food-1);delta=12;c.fear=clamp(c.fear-5);memory='you shared a food ration';event.effects.food=-1}
    else if(/\b(refuse|won't help|will not help|deny|keep my (?:food|supplies)|not helping)\b/i.test(text)){delta=-12;c.fear=clamp(c.fear+8);memory='you refused their request'}
    else if(/\b(threaten|aim (?:a |your )?weapon|point (?:a |your )?gun|demand)\b/i.test(text)){delta=-18;c.fear=clamp(c.fear+18);memory='you threatened them'}
    else if(/\b(introduce|my name is|what is your name|what's your name|who are you|offer to trade|trade)\b/i.test(text)){delta=4;memory='you exchanged names or discussed a trade'}
    c.trust=clamp(c.trust+delta);event.effects.trust=delta;event.effects.fear=c.fear;this.remember(contactId,memory,event.day);event.effects.npcDecision=this.npcDecision(contactId);
   }else if(encounter==='human'&&contactId){const c=this.contact(contactId);if(kind==='fight'||kind==='fire'){c.trust=clamp(c.trust-8);c.fear=clamp(c.fear+12);event.effects.trust=-8;event.effects.fear=c.fear;this.remember(contactId,'you used force during the encounter',event.day)}else this.remember(contactId,'you '+text.slice(0,130),event.day)}
   ext.turn++;ext.lastEvent=event;ext.events.push(event);ext.events=ext.events.slice(-300);ext.processedEventIds.push(id);ext.processedEventIds=ext.processedEventIds.slice(-600);
   return{duplicate:false,event,npcDecision:event.effects.npcDecision||this.npcDecision(contactId),zombieBehavior:this.zombieBehavior(this.state.noise||0)};
  }
 }
 ZombieBrain.schemaVersion=SCHEMA_VERSION;
 ZombieBrain.validateExtension=validateExtension;
 return ZombieBrain;
});

