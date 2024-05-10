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

.wait(150*(1+i))

.effect()
.file("jb2a.impact.fire.01.orange")
.atLocation(summon[i], {offset: {y:-0}, gridUnits:true})
.scaleToObject(2.5)
.fadeOut(1000, {ease: "easeInExpo"})
.attachTo(summon[i], {bindAlpha: false})
.zIndex(5)

.wait(100)

.effect()
.file("jb2a.ground_cracks.orange.02")
.atLocation(summon[i])
.fadeIn(500, {ease: "easeOutCirc"})
.fadeOut(5000, {ease: "easeOutQuint"})
.duration(10000)
.opacity(1)
.randomRotation()
.belowTokens()
.scaleToObject(1.5)
.zIndex(0.2)

.effect()
.file("jb2a.particles.outward.orange.01.03")
.atLocation(summon[i])
.fadeIn(250, {ease: "easeOutQuint"})
.scaleIn(0, 200, {ease: "easeOutCubic"})
.fadeOut(5000, {ease: "easeOutQuint"})
.opacity(1)
.filter("ColorMatrix", {saturate:0, brightness:1})
.randomRotation()
.scaleToObject(2)
.duration(10000)

.effect()
.file("jb2a.magic_signs.circle.02.conjuration.loop.yellow")
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
.file("jb2a.magic_signs.circle.02.conjuration.loop.yellow")
.atLocation(summon[i])
.filter("ColorMatrix", {saturate:-0, brightness:1.1})
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
.filter("ColorMatrix", {saturate:-1,  brightness:50})
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