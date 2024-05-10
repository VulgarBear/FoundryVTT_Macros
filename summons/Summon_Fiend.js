//Last Updated: 12/11/2023
//Author: EskieMoh#2969

//Insert Compendium Key here
let compendium = ``

const filters = [];

const object = {
    creatures: [
        game.packs.get(compendium)
    ],
    filters,
    options: {
        defaultFilters: false,
        noAnimation: true,

    }    
    
}

const summonData = await foundrySummons.openMenu(object);

let summon = summonData.tokenIds

for(i = 0; i < summonData.amount; i++){

let image = canvas.scene.tokens.get(summon[i]).texture.src
let imageSize = canvas.scene.tokens.get(summon[i]).width * canvas.scene.tokens.get(summon[i]).texture.scaleX
    
 new Sequence()

.wait(200*(1+i))

.effect()
.file("animated-spell-effects-cartoon.magic.mind sliver")
.atLocation(summon[i], {offset:{y:-((imageSize-1)/2)}, gridUnits:true})
.scaleToObject(1.1)
.filter("ColorMatrix", {saturate:-1, brightness:0})
.filter("Blur", { blurX: 5, blurY: 10 })
.animateProperty("spriteContainer", "position.y", { from: -3, to: -0.3, duration: 500, ease: "easeOutCubic", gridUnits:true})
.fadeOut(100)
.rotate(-90)
.scaleOut(0, 100, {ease: "easeOutCubic"})
.duration(500)
.attachTo(summon[i], {bindAlpha: false})
.zIndex(5)
.waitUntilFinished(-300)

.effect()
.file("jb2a.impact.ground_crack.02.dark_red")
.atLocation(summon[i])
.opacity(1)
.randomRotation()
.belowTokens()
.scaleToObject(2)
.zIndex(0.2)

.wait(100)

.effect()
.file("animated-spell-effects-cartoon.energy.pulse.red")
.atLocation(summon[i])
.opacity(1)
.scaleToObject(1.5)

.effect()
.file("jb2a.particles.outward.red.01.03")
.atLocation(summon[i])
.fadeIn(250, {ease: "easeOutQuint"})
.scaleIn(0, 200, {ease: "easeOutCubic"})
.fadeOut(5000, {ease: "easeOutQuint"})
.opacity(1)
.filter("ColorMatrix", {saturate:1, brightness:0.5})
.randomRotation()
.scaleToObject(2)
.duration(10000)

.effect()
.file("jb2a.magic_signs.circle.02.conjuration.loop.red")
.atLocation(summon[i])
.scaleIn(0, 200, {ease: "easeOutCubic"})
.belowTokens()
.scaleToObject(1.25)
.duration(1200)
.fadeIn(200, {ease: "easeOutCirc", delay: 200})
.fadeOut(300, {ease: "linear"})
.filter("ColorMatrix", {saturate:-1, brightness:2})
.filter("Blur", { blurX: 5, blurY: 10 })
.zIndex(0.1)

.effect()
.file("jb2a.magic_signs.circle.02.conjuration.loop.red")
.atLocation(summon[i])
.scaleIn(0, 200, {ease: "easeOutCubic"})
.belowTokens()
.scaleToObject(1.25)
.fadeOut(5000, {ease: "easeOutQuint"})
.duration(10000)

.effect()
.file(image)
.atLocation(summon[i])
.scaleToObject(canvas.scene.tokens.get(summon[i]).texture.scaleX)
.fadeOut(1000, {ease: "easeInExpo"})
.filter("ColorMatrix", {saturate:-1,  brightness:0})
.filter("Blur", { blurX: 5, blurY: 5 })
.scaleIn(0, 500, {ease: "easeOutCubic"})
.duration(1200)
.attachTo(summon[i], {bindAlpha: false})
.waitUntilFinished(-800)

.animation()
.on(summon[i])
.fadeIn(250)

.play()
}