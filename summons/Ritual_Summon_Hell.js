//Last Updated: 12/11/2023
//Author: EskieMoh#2969

//Insert Actor name
let actor = ""

const object = {
    creatures: [actor],
    options: {
        defaultFilters: false,
        noAnimation: true,

    }    
    
};

const buttonData = {
buttons: [{
label: "SUMMON!", 
value: 1
}]
};

let SumCircleCheck = Sequencer.EffectManager.getEffects({ name: "Summoning Circle" }).length > 0;

if (!SumCircleCheck) {

const summonData = await foundrySummons.openMenu(object);

const summon = await canvas.scene.tokens.get(summonData.tokenIds[0])

const sumLoc = {
  x: summonData.location.x /*+ canvas.grid.size * summon.width / 2*/,
  y: summonData.location.y /*+ canvas.grid.size * summon.width / 2*/,
};
const sumOffset = {
  x: summonData.location.x - canvas.grid.size * summon.width / 2,
  y: summonData.location.y - canvas.grid.size * summon.width / 2,
};

const offsets = [
  { x: 0, y: 0 },
  { x: 1.6, y: 2.2 },
  { x: -1.6, y: 2.2 },
  { x: -2.6, y: -0.8 },
  { x: 2.6, y: -0.8 },
  { x: 0, y: -2.7 },
];

const sumPos = offsets.map(offset => ({
  x: sumLoc.x + offset.x * canvas.grid.size,
  y: sumLoc.y + offset.y * canvas.grid.size,
}));

let lightData={
    x:sumPos[0].x,
    y:sumPos[0].y,
    config:{
    dim:15,
    bright:15,
    luminosity:0.5,
    color: "#fd250d",
    animation: { type: "torch", speed:4, intensity: 2},
    attenuation: 0.75, 
    saturation: 0.2,
    contrast: 0.25,
    shadows: 0.3,
    },
    flags:{
    tagger:{
    tags:['Summon Light']    
    }    
    }
};

//Starting Sequence
const startSeq = new Sequence()

.thenDo(function(){
    
let light = canvas.scene.createEmbeddedDocuments('AmbientLight', [lightData]);
Tagger.addTags(summon, "Pre Summon")

})

.animation()
.on(summon)
.teleportTo(sumOffset)
.opacity(1)
.hide()

.effect()
.name("Summoning Circle")
.atLocation(sumPos[0])
.file(`jb2a.magic_signs.circle.02.conjuration.complete.dark_red`)
.size(6, {gridUnits: true})
.fadeIn(600)
.opacity(1)
.rotateIn(180, 600, {ease: "easeOutCubic"})
.scaleIn(0, 600, {ease: "easeOutCubic"})
.belowTokens()
.persist()

.wait(2500)

.thenDo(function(){
for(e = 1; e < 6; e++){

new Sequence()

.effect()
.name("Summoning Circle")
.atLocation(sumPos[e])
.file("jb2a.impact.010.orange")
.size(2, {gridUnits: true})
.zIndex(1)

.effect()
.name("Summoning Circle")
.atLocation(sumPos[e])
.file(`jb2a.flames.01.orange`)
.size(1.75, {gridUnits: true})
.fadeIn(600)
.opacity(1)
.scaleIn(0, 600, {ease: "easeOutCubic"})
.filter("ColorMatrix", { hue: 0 })
.fadeOut(500)
.persist()

.effect()
.name("Summoning Circle")
.delay(1100,1750)
.atLocation(sumPos[e],{offset:{x:0, y:-0.7}, gridUnits:true})
.file(`animated-spell-effects-cartoon.smoke.33`)
.size(1.75, {gridUnits: true})
.fadeIn(1000)
.opacity(0.35)
.playbackRate(0.5)
.filter("ColorMatrix", { brightness: 0 })
.fadeOut(500)
.randomizeMirrorX()
.persist()
.zIndex(0.1)

.play()

}
})

.thenDo(function(){
for(i = 1; i < 6; i++){
    
var lightData1={
    x:sumPos[i].x,
    y:sumPos[i].y,
    config:{
    alpha: 0.35,    
    dim:10,
    bright:5,
    luminosity:0.5,
    color: "#fd250d",
    animation: { type: "torch", speed:4, intensity: 1},
    attenuation: 0.9, 
    saturation: 0.2,
    contrast: 0.25,
    shadows: 0.3,
    },
    flags:{
    tagger:{
    tags:['Summon Light']    
    }    
    }
   
}

var light1 = canvas.scene.createEmbeddedDocuments('AmbientLight', [lightData1]);

}

})

.effect()
.delay(250)
.name("Summoning Core")
.atLocation(sumPos[0])
.file("jb2a.sphere_of_annihilation.600px.dark_red")
.belowTokens()
.size(1.5,{gridUnits:true})
.scaleIn(0, 500, {ease: "easeOutCubic"})
.fadeIn(500)
.belowTokens()
.persist()

.wait(1000)

.effect()
.name("Summoning Core")
.atLocation(summon)
.file("jb2a.markers.light_orb.complete.yellow")
.filter("ColorMatrix", { hue: -10, saturate: 1})
.size(2,{gridUnits:true})
.belowTokens()
.zIndex(0.1)
.persist()

.effect()
.name("Summoning Core")
.delay(1000)
.atLocation(summon)
.file("jb2a.shield_themed.above.fire.03.orange")
.size(1,{gridUnits:true})
.fadeIn(500)
.belowTokens()
.zIndex(0.2)
.persist()

.play();

await Sequencer.Helpers.wait(5000);

const result = await warpgate.buttonDialog(buttonData);

if (result == 1){

//Ending Sequence
const endSeq = new Sequence()

.thenDo(function(){

Sequencer.EffectManager.endEffects({ name: "Summoning Core" });
Tagger.removeTags(summon, "Pre Summon")    
    
})

.canvasPan()
.shake({duration: 2500, fadeOutDuration:1000, strength: 5, rotation: false })

.effect()
.name("Summoning Core")
.atLocation(sumPos[0])
.file("jb2a.impact.ground_crack.dark_red.01")
.belowTokens()
.size(3.5+summon.width,{gridUnits:true})
.belowTokens()
.zIndex(0.1)

.effect()
.delay(500)
.name("Summoning Circle")
.atLocation(sumPos[0])
.file("jb2a.ground_cracks.dark_red.01")
.belowTokens()
.fadeIn(1000)
.size(3.5+summon.width,{gridUnits:true})
.belowTokens()
.persist()
.zIndex(0.2)

.effect()
.file("jb2a.extras.tmfx.outpulse.circle.02.fast")
.atLocation(summon)
.filter("ColorMatrix", { brightness:0 })
.size(6, {gridUnits: true})
.duration(2000)
.belowTokens()
.opacity(0.15)
.fadeOut(900)
.repeats(4, 450, 450)

.effect()
.name("Summoning Core")
.atLocation(sumPos[0])
.file("jb2a.sphere_of_annihilation.600px.dark_red")
.belowTokens()
.size(1.5,{gridUnits:true})
.animateProperty("sprite", "width", { from: 1.5, to: 1.5+summon.width, duration: 500, gridUnits:true, ease: "easeOutCubic"})
.animateProperty("sprite", "height", { from: 1.5, to: 1.5+summon.width, duration: 500, gridUnits:true, ease: "easeOutCubic"})
.belowTokens()
.fadeOut(1000)
.duration(10000)
.zIndex(0.3)

.thenDo(function(){
for(u = 1; u < 6; u++){

new Sequence()

.effect()
.atLocation(sumPos[u], {offset:{y:-1.15}, gridUnits:true})
.file("jb2a.flames.02.orange")
.size(1.75, {gridUnits: true})
.duration(1000)
.fadeIn(200)
.fadeOut(800)
.animateProperty("sprite", "height", { from: 1.75, to: 4, duration: 500, gridUnits:true, ease:"easeOutBack"})
.zIndex(1)

.effect()
.file(`jb2a.particles.outward.orange.01.03`)
.atLocation(sumPos[u], {offset:{y:-0.75}, gridUnits:true})
.scale(0.2)
.duration(1000)
.fadeOut(800)
.scaleIn(0, 1000, {ease: "easeOutCubic"})
.animateProperty("sprite", "width", { from: 0, to: 0.25, duration: 500, gridUnits:true, ease:"easeOutBack"})
.animateProperty("sprite", "height", { from: 0, to: 3, duration: 1000, gridUnits:true, ease:"easeOutBack"})
.animateProperty("sprite", "position.y", { from: 0, to: -0.6, duration: 1000, gridUnits:true})
.filter("ColorMatrix", { saturate: 1})
.zIndex(1.1)

.play()

}
})

.effect()
.from(summon)
.atLocation(summon)
.scaleIn(0, 500, {ease: "easeOutCubic"})
.filter("ColorMatrix", { brightness:0 })
.filter("Blur", { blurX: 5, blurY: 10 })
.duration(1000)
.fadeOut(500)
.zIndex(2.1)

.effect()
.file("animated-spell-effects-cartoon.fire.13")
.atLocation(summon, {offset: {y:-0.5*summon.width}, gridUnits:true})
.filter("ColorMatrix", { brightness:0 })
.scaleToObject(2.5)
.zIndex(2)

.animation()
.delay(500)
.on(summon)
.show()
.opacity(1)

.play()

} 

} else {
    
Sequencer.EffectManager.endEffects({ name: "Summoning Core" });
Sequencer.EffectManager.endEffects({ name: "Summoning Circle" });

const ambientLights = canvas.scene.lights;
const deleteIds = [];
for(let light of ambientLights){
  if (Tagger.hasTags(light, "Summon Light")) deleteIds.push(light.id);
}

await canvas.scene.deleteEmbeddedDocuments("AmbientLight", deleteIds);
Tagger.removeTags(summon, "Pre Summon")

}