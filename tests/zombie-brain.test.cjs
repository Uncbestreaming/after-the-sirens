const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { ZombieBrain } = require('../assets/zombie-brain.js');

test('browser game is wired to the engine, existing save key, and freeform modes', () => {
  const path = require('node:path');
  const base = path.join(__dirname, '..');
  const htmlPath = fs.existsSync(path.join(base, 'after-the-sirens.html')) ? path.join(base, 'after-the-sirens.html') : path.join(base, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.match(html, /assets\/zombie-brain\.js/);
  assert.match(html, /afterTheSirensSaveV1/);
  assert.match(html, /version:3/);
  assert.match(html, /resolveAdaptive=function\(action,kind,typed,skillOverride\)/);
  assert.match(html, /freeActionMode/);
  assert.match(html, /typedAct=tryAdaptive/);
  assert.match(html, /oldResolveDaily=resolveDaily/);
});

test('migrates old game state without losing story, inventory, or NPC data', () => {
  const old = {
    food: 4, water: 2.5, ammo: 7, lastPlace: 'your house',
    npcContacts: { neri: { trust: 61, met: true, memories: [{ day: 1, text: 'old memory' }] } },
    pendingAdaptive: { kind: 'human', title: 'At the door' }
  };
  const migrated = ZombieBrain.migrate(old);
  assert.equal(migrated.food, 4);
  assert.equal(migrated.water, 2.5);
  assert.equal(migrated.ammo, 7);
  assert.equal(migrated.pendingAdaptive.title, 'At the door');
  assert.equal(migrated.npcContacts.neri.trust, 61);
  assert.equal(migrated.npcContacts.neri.memories[0].text, 'old memory');
  assert.equal(migrated.zombieBrain.schemaVersion, ZombieBrain.schemaVersion);
});

test('choice IDs are stable for the same event and distinct for new events', () => {
  const brain = new ZombieBrain({});
  const first = brain.eventId('beat:1|listen');
  assert.equal(brain.eventId('beat:1|listen'), first);
  assert.notEqual(brain.eventId('beat:1|move'), first);
  assert.notEqual(brain.eventId('beat:2|listen'), first);
});

test('a human encounter records a shared ration, relationship change, and memory once', () => {
  const state = { food: 3, daysSurvived: 1, npcContacts: { neri: { trust: 50, fear: 20, memories: [] } } };
  const brain = new ZombieBrain(state);
  const eventId = brain.eventId('human:1:share');
  const outcome = brain.applyChoice({ id: eventId, action: 'Share one food ration with Neri', kind: 'social', encounter: 'human', npcId: 'neri' });
  assert.equal(state.food, 2);
  assert.equal(state.npcContacts.neri.trust, 62);
  assert.equal(state.npcContacts.neri.memories.at(-1).text, 'you shared a food ration');
  assert.equal(outcome.npcDecision, 'cooperate');
  assert.equal(brain.applyChoice({ id: eventId, action: 'Share one food ration with Neri', kind: 'social', encounter: 'human', npcId: 'neri' }).duplicate, true);
  assert.equal(state.food, 2);
  assert.equal(state.zombieBrain.events.length, 1);
});

test('hostile and helpful NPC actions affect trust, fear, and retained memories', () => {
  const state = { food: 2, daysSurvived: 1, npcContacts: { stranger_1: { trust: 50, fear: 10, memories: [] } } };
  const brain = new ZombieBrain(state);
  brain.applyChoice({ id: brain.eventId('help'), action: 'Offer food to the survivor', kind: 'social', encounter: 'human', npcId: 'stranger_1' });
  assert.equal(state.npcContacts.stranger_1.trust, 62);
  brain.applyChoice({ id: brain.eventId('threat'), action: 'Threaten them with the weapon', kind: 'social', encounter: 'human', npcId: 'stranger_1' });
  assert.equal(state.npcContacts.stranger_1.trust, 44);
  assert.equal(state.npcContacts.stranger_1.fear, 23);
  assert.equal(state.npcContacts.stranger_1.memories.length, 2);
});

test('gunfire increases alertness and quiet actions reduce it', () => {
  const state = { daysSurvived: 1, ammo: 2, noise: 0 };
  const brain = new ZombieBrain(state);
  brain.applyChoice({ id: brain.eventId('gun'), action: 'Fire the handgun', kind: 'fire', encounter: 'infected', ammoAvailable: true });
  assert.equal(state.zombieBrain.zombies.alert, 38);
  assert.equal(brain.zombieBehavior(0), 'investigate');
  brain.applyChoice({ id: brain.eventId('quiet'), action: 'Stay quiet behind cover', kind: 'quiet', encounter: 'infected' });
  assert.equal(state.zombieBrain.zombies.alert, 26);
});

test('rejects malformed and future-version engine saves', () => {
  assert.throws(() => ZombieBrain.migrate({ zombieBrain: { schemaVersion: 999 } }), /newer ZombieBrain version/);
  assert.throws(() => ZombieBrain.migrate({ zombieBrain: { schemaVersion: 1, events: {} } }), /event history/);
});

