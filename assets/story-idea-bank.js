// Original, context-tagged narrative cues served with the game. The online
// Ink/Twine references below inform stateful branching and conditional prose;
// none of their story text is used here.
window.AFTER_SIRENS_IDEA_BANK = {
  version: 1,
  sources: [
    "https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md",
    "https://twinery.org/"
  ],
  ideas: [
    { id:"search-food-seal", actions:["search","observe"], scenes:["food","supplies"], topics:["food","supplies"], text:"You check the seam and the storage dust before trusting the package; a label can be old even when the wrapper looks intact." },
    { id:"search-food-carry", actions:["search","move"], scenes:["food","supplies"], topics:["food"], text:"The food is light enough to carry, but every loose wrapper can announce your position if the street is quiet." },
    { id:"search-water-container", actions:["search","observe"], scenes:["water","supplies"], topics:["water"], text:"You compare the cap, seal, and container before counting it as drinkable; clear liquid alone proves little." },
    { id:"search-water-source", actions:["search","track"], scenes:["water","supplies"], topics:["water"], text:"The source leaves a faint mineral line on the basin. It tells you where water has been, not whether it is safe now." },
    { id:"search-medicine", actions:["search","care"], scenes:["human","supplies","shelter"], topics:["medicine","injury"], text:"You sort sealed doses from loose tablets. Without a label, the loose ones are a risk you cannot identify." },
    { id:"search-ammo", actions:["search","observe"], scenes:["supplies","shelter","infected"], topics:["ammunition","weapon"], text:"You count each round as you find it. A small reserve is useful only if you can keep it dry and reach it quickly." },
    { id:"search-room-limit", actions:["search"], scenes:["supplies","food","water"], topics:["supplies","food","water","medicine","ammunition"], text:"The obvious hiding places are empty now. You mark what you checked so the same room does not become an endless source." },
    { id:"ask-name", actions:["social"], scenes:["human"], questions:["name"], topics:["people"], text:"You leave space after the question. The pause lets the other person answer without making the doorway feel like a trap." },
    { id:"ask-injury", actions:["social","care"], scenes:["human","shelter"], questions:["injury"], topics:["injury","medicine"], text:"You keep the question plain and specific. In this light, a torn sleeve and a wound can look alike until someone checks." },
    { id:"ask-supplies", actions:["social"], scenes:["human","supplies"], questions:["supplies"], topics:["food","water","medicine","ammunition","supplies"], text:"You ask what they can spare before showing what you carry. Neither pack is open, and the exchange remains undecided." },
    { id:"ask-location", actions:["social","radio","track"], scenes:["human","signal","quiet"], questions:["location"], topics:["home","route","shelter"], text:"You ask for a landmark you can verify from here. A direction without a reference point is only a guess." },
    { id:"ask-threat", actions:["social","quiet","observe"], scenes:["human","infected","quiet"], questions:["threat"], topics:["threat"], text:"You listen for what they actually heard: number, distance, and direction. Fear can fill in the parts no one saw." },
    { id:"ask-motive", actions:["social"], scenes:["human"], questions:["motive"], topics:["people","trade"], text:"You let the question stand without pressing closer. Their answer may explain their need, but trust will take more than one sentence." },
    { id:"ask-signal", actions:["radio","track","observe"], scenes:["signal"], questions:["signal"], topics:["signal","route","shelter"], text:"You separate the repeated words from the broken ones. The interruption is not proof that the message ended where you think it did." },
    { id:"social-trade", actions:["social"], scenes:["human","supplies"], topics:["trade","food","water","medicine"], text:"You name one item at a time and keep your hands visible. A fair exchange is easier to judge when neither pack disappears from view." },
    { id:"social-family", actions:["social","radio"], scenes:["human","signal","quiet"], topics:["people"], questions:["person"], text:"You listen for the small details in the reply: a name, a familiar place, anything that can distinguish a real contact from a hopeful echo." },
    { id:"radio-static", actions:["radio"], scenes:["signal","quiet"], topics:["signal"], text:"You write down the exact fragments instead of completing the message in your head. Static leaves room for mistakes." },
    { id:"radio-battery", actions:["radio","observe"], scenes:["signal","shelter"], topics:["signal"], text:"The receiver warms in your palm. You lower the volume between transmissions to save power and hear the room around you." },
    { id:"move-route", actions:["move","drive","track"], scenes:["weather","shelter","quiet","signal"], topics:["route","home","shelter"], text:"You check the return path before committing farther. The next landmark is visible; what lies beyond it is still unknown." },
    { id:"move-near", actions:["move"], scenes:["human","infected","shelter","quiet"], topics:["people","threat","entry"], text:"You cover only the distance you chose, then stop to listen. The sounds ahead have not yet told you whether the way is clear." },
    { id:"quiet-count", actions:["quiet","observe"], scenes:["infected","human","quiet"], topics:["threat","people"], text:"You count the sounds, then wait for the pattern to repeat. One silence cannot tell you what moved during it." },
    { id:"quiet-building", actions:["quiet","observe"], scenes:["shelter","supplies","quiet"], topics:["entry","shelter"], text:"A settling pipe ticks twice. You compare it with the earlier noise before deciding whether anything in the room changed." },
    { id:"care-pressure", actions:["care"], scenes:["human","shelter","infected"], topics:["injury","medicine"], text:"You check the dressing for fresh blood before loosening it. The wound needs attention, but haste can make the next step harder." },
    { id:"care-supplies", actions:["care","search"], scenes:["human","supplies","shelter"], topics:["injury","medicine"], text:"You lay out only what you can identify and keep the rest of the kit dry. Every used bandage changes what you can do later." },
    { id:"build-latch", actions:["build","observe"], scenes:["shelter","human","quiet"], topics:["entry","shelter"], text:"The latch meets the frame unevenly. You test it once from the safe side and note where pressure could make it fail." },
    { id:"build-exit", actions:["build"], scenes:["shelter","supplies","quiet"], topics:["entry","shelter"], text:"You keep the second way out clear while securing the first. A barrier helps only if it does not leave you boxed in." },
    { id:"infected-attention", actions:["fight","fire","quiet","move"], scenes:["infected"], topics:["threat","weapon"], text:"Its head turns toward the last sharp sound. You have a brief measure of its attention, not a guarantee about what it will do next." },
    { id:"infected-obstacle", actions:["fight","move","observe"], scenes:["infected"], topics:["threat","route"], text:"The infected catches on a curb and regains its footing. The obstacle buys a moment, not enough time to stop watching." },
    { id:"human-cover", actions:["social","quiet","observe"], scenes:["human"], topics:["people","threat"], text:"The other person keeps one shoulder hidden. You can see their caution clearly; you cannot yet tell what they intend." },
    { id:"weapon-noise", actions:["fire","fight"], scenes:["infected","human","quiet"], topics:["weapon","threat","ammunition"], text:"The noise carries farther than the struggle. You count what was spent and listen for any response before assuming it went unheard." },
    { id:"daylight", actions:["move","observe","track"], scenes:["weather","shelter","quiet"], topics:["route","home","shelter"], text:"The daylight gives edges and distances, but reflections still hide detail. You judge the near ground before trusting the view." },
    { id:"rain", actions:["move","observe","quiet"], scenes:["weather","water","quiet"], topics:["route","water"], text:"Rain covers softer sounds and makes the pavement slick. You shorten your stride and keep to the side with better footing." },
    { id:"food-need", actions:["consume","search"], scenes:["food","supplies"], topics:["food"], text:"You count the ration you used against the days remaining. The relief is real, but the supply has one less portion." },
    { id:"water-need", actions:["consume","search"], scenes:["water","supplies"], topics:["water"], text:"You drink a measured amount and close the container again. The thirst eases; the remaining water is easier to count now." },
    { id:"sleep-safe", actions:["quiet","observe"], scenes:["shelter","quiet"], topics:["shelter"], text:"You check the door and the nearest exit before letting your eyes rest. Even a short pause depends on what you secured first." },
    { id:"injury-cost", actions:["fight","fire","move"], scenes:["human","infected","shelter"], topics:["injury","threat"], text:"The movement pulls at the injury. You can keep going, but the strain narrows how quickly you can react." },
    { id:"uncertain-clue", actions:["track","observe","radio"], scenes:["signal","quiet","weather"], topics:["signal","route","threat"], text:"The clue narrows the possibilities without settling them. You keep it as a lead until another detail confirms it." },
    { id:"home-specific", actions:["observe","search","quiet"], scenes:["supplies","shelter","quiet"], topics:["home","food","water"], text:"A familiar mark places the sound inside your own home. The rooms you know still need to be checked one at a time." },
    { id:"apartment-specific", actions:["observe","search","quiet"], scenes:["supplies","shelter","quiet"], topics:["home","entry","threat"], text:"The sound travels through the shared wall before it reaches the hall. You cannot tell which apartment it came from without listening again." }
  ]
};

