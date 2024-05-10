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
.file("jb2a.smoke.puff.centered.dark_black")
.atLocation(summon[i])
.scaleToObject(1.8*canvas.scene.tokens.get(summon[i]).texture.scaleX)
.randomRotation()
.belowTokens()
.scaleIn(0, 2000, {ease: "easeOutCubic"})
.repeats(5, 500,500)

.effect()
.file(image)
.atLocation(summon[i])
.scaleToObject(canvas.scene.tokens.get(summon[i]).texture.scaleX)
.fadeIn(500, {ease: "easeInExpo"})
.fadeOut(1500, {ease: "easeInExpo"})
.filter("ColorMatrix", {saturate:-1,  brightness:0})
.filter("Blur", { blurX: 5, blurY: 5 })
.scaleIn(0, 2000, {ease: "easeOutSine"})
.duration(3500)
.attachTo(summon[i], {bindAlpha: false})
.waitUntilFinished(-1000)

.effect()
.file("jb2a.smoke.puff.centered.dark_black")
.atLocation(summon[i])
.scaleToObject(1.8*canvas.scene.tokens.get(summon[i]).texture.scaleX)
.randomRotation()
.fadeOut(2400)
.scaleOut(0.25, 2400, {ease: "easeOutSine"})

.animation()
.on(summon[i])
.fadeIn(500)

.play()
}