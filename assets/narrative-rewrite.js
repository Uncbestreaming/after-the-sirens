(function(){
const S={
door:["The Morning Broadcast",()=>{const home=hero.housing==="home";return "6:30 a.m. Sirens have sounded on and off all night. You wake tired, make coffee, and turn on the television. An anchor speaks over footage of a crowded intersection: “Please stay inside. Leave home only if necessary. People have been attacking all night, and there are reports of an infection being transmitted.” The feed cuts to a hospital entrance, freezes, and dissolves into static. The broadcast offers no explanation, only a warning. Your first thought is absurd and immediate: zombie apocalypse. "+(home?"You are in your house. The front door, back door, and rooms between them are familiar.":"You are in your apartment. Your door opens onto a shared hall, and the stairwell connects you to everyone else in the building.")+" The coffee cools beside the television. Outside, a car horn sounds twice, then stops. What do you do?"}],
talk:["A Voice Nearby","A voice reaches you from beyond the nearest barrier. “Hey. Is anyone in there?” The speaker waits without coming closer. You can answer, ask who it is, or listen for movement."],
peek:["A Look Outside","From a covered position, you get a narrow view of the street. A car sits crooked across one lane; a door hangs open. Something moves behind a parked vehicle and disappears. Leaving blindly would be a gamble."],
brace:["Make the Room Safer","You check the nearest entrances and move what you can without making much noise. A locked door may buy time, but it does not promise safety. Water, food, medicine, and a clear route matter if you stay."],
alley:["A Narrow Route","The route narrows between walls and parked vehicles. It offers cover from the main street, but each turn hides what lies beyond. You can still turn back while the way behind you remains clear."],
chain:["The Barrier","The barrier holds. A pause follows, then pressure returns against its weakest point. Whatever is outside has not gone away."],
question:["A Question Through the Door","“Tell me what you heard on the news,” the voice says. The person behind the barrier is weighing your answer and deciding how much to trust you."],
weapon:["A Choice of Tools","You check what you can carry and use without drawing attention. A weapon may create distance. It may also make a sound that travels farther than you do."],
wait:["Listen Before Moving","You wait without touching the door. Somewhere nearby, something scrapes across a hard surface, stops, then scrapes again. The pause gives you a clue, not certainty."],
neri:["A Stranger at the Threshold","The person keeps to the far side of the entrance. “I’m Neri,” they say. “I heard the broadcast too. I’m not opening this until I know what you’re planning.” Their voice is tired and careful."],
stairs:["The Next Landing","You reach the next stretch of the route and stop to listen. Distant voices carry through the air. The way ahead is passable, but it no longer feels empty."],
radio:["A Signal Through Static","The radio catches a voice, loses it, then finds a few words again. No complete location comes through. You can answer, keep listening, or save the battery."],
supplies:["What You Can Carry","You search the places within reach. Useful finds are limited to what this room held; it will not refill itself once searched."],
bite:["The Cost of Contact","Pain cuts through the noise. You pull back and check the wound before panic can decide what it means. Clean and cover it, ask for help, or keep moving while you can."],
treat:["First Aid","You work with what you have, keeping the wound in view and your hands steady. A clean dressing can reduce immediate risk; it cannot answer every question about exposure."],
hold:["Hold Your Ground","You stay where you are and make the position harder to reach. The effort costs time and energy. The sounds outside do not tell you whether the threat has moved on."],
basement:["Below the Main Floor","The lower rooms offer cover and fewer windows. They also leave fewer ways out. You pause and listen before committing."],
rooftop:["Above the Street","From higher ground, you can see more of the blocks, but you are exposed against the sky. A signal might reach someone or reveal your position."],
bus:["At the Roadside","The vehicle is still where it was left. Its windows give you a quick look inside, not proof that it is safe or usable. You check for movement before getting close."],
pharmacy:["A Closed Pharmacy","The front is damaged; shelves visible through the glass have been disturbed. Anything useful will take time to find. The street remains within earshot."],
yard:["The Yard","The yard gives you room to move, with fences and doors limiting the ways in. You check the nearest cover and listen before crossing."],
clinic:["The Clinic","The clinic is quiet enough to hear its ventilation. A few drawers stand open; others remain closed. You do not know who left or whether they are still nearby."],
river:["At the Water","The water is close, but a clear surface does not prove it is safe to drink. The bank offers little cover, and the route back matters as much as the source."],
alone:["No One Answers","You wait for a reply. None comes. The silence does not prove everyone is gone, but for this moment the decision is yours alone."],
endClinic:["A Moment to Regroup","You reach a place where you can pause and take stock. The danger has not ended; it has given you an interval to choose what comes next."],
endRiver:["A Moment by the Water","You take stock of what the water can offer. It is a pause in the struggle, not an answer to what waits beyond."],
endYard:["A Moment Behind Cover","You reach cover and listen for pursuit. The quiet does not prove you are safe for long. You have time to choose your next move."],
endTrade:["Terms","The other survivor waits for your answer. Their offer is specific; their reasons are not. What you say will shape what they remember."]
};
const K={door:"opening",talk:"human",peek:"quiet",brace:"shelter",alley:"weather",chain:"shelter",question:"human",weapon:"infected",wait:"quiet",neri:"human",stairs:"weather",radio:"signal",supplies:"supplies",bite:"infected",treat:"shelter",hold:"shelter",basement:"shelter",rooftop:"signal",bus:"weather",pharmacy:"supplies",yard:"shelter",clinic:"supplies",river:"water",alone:"quiet",endClinic:"quiet",endRiver:"quiet",endYard:"quiet",endTrade:"human"};
const B={
opening:["The broadcast ends without explanation. The room is quiet except for the television and the familiar sounds of where you woke. Your next move is yours.","The anchor repeats the warning, but the feed offers no useful detail. Morning carries on outside as if nothing changed. The sirens say otherwise.","You lower the cup. Staying inside sounds sensible. It does not make the doors, supplies, or people around you any less real."],
human:["A reply comes from nearby, but the person keeps cover between you. Neither of you knows how much of the broadcast is true. Their next words depend on the impression you just made.","The voice answers after a pause. It sounds close and tired. Someone behind the barrier is deciding whether this is a conversation or a risk.","Someone is near enough to hear. They do not open the way. For now, the exchange is words, silence, and what each of you reveals."],
infected:["The noise draws a response. A dead figure turns toward it. It moves without urgency, but shows no sign that pain will stop it. You have a narrow opening to act.","A dead face turns toward the disturbance. It does not hurry or lose interest. The space around you offers seconds to choose a safer angle.","The nearby dead react. One shape closes the distance while another sound carries from farther off. You have changed their attention, not cleared the area."],
signal:["The signal breaks, then returns with a few more words. Whoever is transmitting has not given a clear location. Your action changed what you can hear, not what you can safely assume.","Static fills the gap between a voice and its next attempt. The message is incomplete, but its pattern is easier to recognize.","The radio offers another fragment. It could be a warning or a request. The set remains in your hands; what happens next is yours."],
weather:["Conditions outside have shifted. Wet ground and poor visibility make each route harder to judge. You remain where your last choice left you.","Wind and runoff change the sound of the street. The weather gives cover and takes visibility. It has not moved you from this place.","The air has turned cold and damp. A route that looked simple now asks for more care. You can wait, look again, or act."],
shelter:["The room gives you time to check the entrance. A barrier may slow someone down; it cannot promise safety.","You have cover here. You can hear the difference between the place settling and something testing the way in. Improve this position, keep it, or leave.","The shelter holds for now. You check the route out as carefully as the way in; safety is easier to lose when there is only one exit."],
supplies:["You finish checking the immediate area. Useful finds are limited to what this place held; the empty spots stay empty. Your supplies change, but danger remains.","A careful search yields what was within reach. You sort it before moving and keep track of what adds weight. This area has a finite store.","You check the last likely hiding place. Whatever you found is now part of your load. Asking twice will not refill the room."],
food:["You check the food before keeping it. Carrying a ration and eating it are separate decisions; when to use it remains your choice.","The search turns up what this place can offer. A sealed portion may help now or later, but it will not solve tomorrow by itself.","Old packaging makes you check every seal. Anything safe to keep adds to your rations. The room is finite."],
water:["You check the water before deciding whether to drink or carry it. A container is useful only if its contents are safe.","The source gives you a little to work with. Store it, treat it, or drink if you choose; finding it does not force you to use it.","You measure the water and keep the container covered. The find changes your supplies. What you do with it is still your choice."],
quiet:["The pause lets you notice what the noise had hidden: a distant scrape, a settling hinge, your own breathing. You are still where you were.","For a few seconds, nothing demands an answer. Quiet does not mean danger is gone; it gives you a chance to decide what matters first.","You hold still and listen. The surroundings offer clues, not guarantees. When you move again, the direction is yours."]
};
const H={opening:["The Warning Holds","Morning, Unanswered","Before the First Move"],human:["A Voice Keeps Its Distance","Terms Through the Door","Someone Listening"],infected:["Attention Turns","The Dead Close In","A Narrow Opening"],signal:["Another Fragment","The Frequency Returns","Words in the Static"],weather:["The Street Changes","A Harder Route","Weather at the Threshold"],shelter:["A Place to Pause","The Door Holds","Cover, for Now"],supplies:["The Search Ends Here","What This Room Held","A Finite Find"],food:["A Small Ration","Food Within Reach","The Next Meal"],water:["Measured Carefully","Water to Carry","A Safer Measure"],quiet:["The Pause","A Little Silence","Listening Again"]};
const oldText=typeof sceneText==="function"?sceneText:window.sceneText;if(typeof oldText==="function"){const rewrittenText=function(id,scene){const r=S[id];if(!r)return oldText.apply(this,arguments);if(scene)scene.title=r[0];return typeof r[1]==="function"?r[1]():r[1]};try{sceneText=rewrittenText}catch(e){}window.sceneText=rewrittenText;}
const old=typeof adaptiveStory==="function"?adaptiveStory:window.adaptiveStory;
if(typeof old==="function"){
 const variedBridge={
  opening:["The warning gives you facts to weigh, not a plan to follow.","Nothing outside has settled. You still have the choice of what to do first.","The room remains yours to manage; the street has not made your decision for you."],
  human:["The exchange pauses at the point you leave it. The other person has not made a choice for you.","The stranger waits for your response, watching the same narrow gap you are.","No agreement is assumed. The next words or movement are still yours."],
  infected:["The immediate danger has changed, but the route remains yours to judge.","The dead have reacted to this moment; nothing says where they will go next.","You have a little space to act. Whether you use it to hold, leave, or fight is still your call."],
  signal:["The frequency remains uncertain. You can keep listening or turn your attention elsewhere.","The message ends without resolving who sent it. The radio stays in reach.","No location is confirmed. The next attempt to answer or move is yours."],
  weather:["The conditions make the outside harder to read. You have not moved unless you chose to.","The weather changes the cost of a route, not the decision to take it.","The same ground lies ahead; you can wait for a clearer moment or act in this one."],
  shelter:["This position is only as secure as its entrances and your attention.","You can use the pause here, improve the room, or leave it when you decide.","A safe pause is possible only while the location and its entrances remain secure."],
  supplies:["The search changes what you carry. This room's empty places stay empty.","You can keep, use, or leave the supplies you found; finding them does not spend them.","Nothing more appears without a new search in a different area."],
  food:["You have the food you found. Eating it remains a separate choice.","The ration is available when you decide you need it; it has not been used automatically.","Your food count reflects the find. The next meal is still your decision."],
  water:["The water you found is added to your supplies. You decide whether to drink it.","The container is yours to carry or assess; its contents were not consumed automatically.","Your water count reflects the find. Use it when you choose."],
  quiet:["The pause ends without answering every question. You decide what deserves attention next.","The sounds fade into the background, but they do not prove the area is clear.","You have listened. What you do with what you heard remains open."]
 };
 const reworked=function(){
  const beat=old.apply(this,arguments);if(!beat)return beat;
  const s=typeof state!=="undefined"?state:(window.state||{}),h=typeof hero!=="undefined"?hero:(window.hero||{}),scene=typeof currentScene!=="undefined"?currentScene:(window.currentScene||""),kind=beat.kind||"quiet";
  const n=Math.max(0,Number(typeof adaptiveBeat!=="undefined"?adaptiveBeat:s.daysSurvived||1));
  const token=[s.currentZombieEventId||s.zombieBrain?.lastEvent?.id||"",n,scene,kind].join(":");
  if(s.rewriteKey===token)return beat;
  const extra=[],action=String(s.lastActionText||""),intent=s.lastActionIntent||{},outcome=String(s.lastOutcome||"");
  if(kind==="human"){
   const c=s.activeNpcId&&(s.npcContacts||{})[s.activeNpcId],npc=(s.generatedNpcProfiles||{})[s.activeNpcId]||(typeof getGeneratedNpc==="function"?getGeneratedNpc(s.activeNpcId):null);
   if(c&&npc){if(c.trust<=20)extra.push(npc.name+" keeps a careful distance; the earlier exchange has not earned much trust.");else if(c.trust>=65)extra.push(npc.name+" recognizes the consideration shown before and responds with less suspicion.");if(c.memories?.length>1&&c.memories.at(-2)?.text)extra.push("They remember "+c.memories.at(-2).text+".")}
   if(intent.introducesName)extra.push("You have given them your name. They still decide what to do with it.");else if(intent.asksName)extra.push("You asked for a name; the question is now part of the exchange.");else if(intent.offerTrade)extra.push("Your offer is on the table; no agreement is assumed.");
  }
  if(kind==="infected"){
   const z=s.zombieBrain?.zombies,weapon=s.equipped||"";
   if(s.lastActionWasStruck)extra.push("Pain makes the next movement harder. Your health is "+Math.max(0,Math.round(s.health||0))+"%.");
   if((s.lastActionKind==="fire"||s.lastActionKind==="fight")&&weapon)extra.push("You have "+Math.max(0,Number(s.ammo)||0)+" rounds left for "+weapon+".");
   if(z&&Number(z.alert)>=55)extra.push("Nearby dead are highly alert after the noise.");
  }
  if(kind==="supplies"||kind==="food"||kind==="water"){
   if(s.lastSearchFound){const notice=String(s.lootNotice||"").replace(/^You recover\s*/i,"");if(notice)extra.push("You secure "+notice.replace(/\.$/,"")+".");}
   else if(s.lastActionKind==="search")extra.push("The searched area is depleted; another attempt here will not restore its finite contents.");
  }
  if(s.lastActionKind==="build"&&s.safeRoom)extra.push("The room now counts as secure. Its entrances still need to stay watched.");
  if(s.lastActionKind==="care"&&outcome)extra.push("The supplies used for care have been deducted from your kit.");
  if(s.lastActionKind==="consume"&&outcome)extra.push("Your remaining food and water counts reflect what you used.");
  if((s.lastActionKind==="move"||s.lastActionKind==="drive")&&intent.place)extra.push("You are now at "+String(s.lastPlace||intent.place)+". The passage does not move you farther.");
  if((s.thirst??100)<30)extra.push("Thirst is beginning to slow your thinking.");
  if((s.hunger??100)<30)extra.push("Hunger is beginning to dull your focus.");
  if((s.sleep??100)<25)extra.push("Fatigue makes every careful task take more effort.");
  const job=String(h.job||"");
  if(job==="healthcare"&&["supplies","food","water"].includes(kind))extra.push("You check seals and labels before trusting anything meant to be swallowed.");
  else if(job==="trades"&&kind==="shelter")extra.push("Your eye goes to the frame and hinges, where a weak point would show first.");
  else if(job==="security"&&["infected","human"].includes(kind))extra.push("You keep the nearest exit in view while judging the threat.");
  else if(job==="driver"&&["weather","signal"].includes(kind))extra.push("You weigh visibility and road access before committing to a route.");
  const bridge=(variedBridge[kind]||variedBridge.quiet)[(n+action.length+outcome.length)%3];
  beat.prose=String(beat.prose||"")+(extra.length?"\n\n"+extra.join(" "):"")+(action||outcome?"":"\n\n"+bridge);
  s.rewriteKey=token;return beat;
 };
 try{adaptiveStory=reworked}catch(e){}window.adaptiveStory=reworked;
}
})();