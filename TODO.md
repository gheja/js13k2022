# js13k2022

## notes
- If you mess up but have the ingredients you can try to cook it again. (skipping alreadyDone)

## general
- [x] optimize performance (auto-reduce effects if runing with low FPS)
- [x] set colors for dialog boxes based on speakers
- [x] find a name
- [x] handle ticks separately from frames (skip frames instead of slowing down)
- [ ] ~reduce running speed~
- [x] cooking individual ingredients
- [x] text progressbar for cooking
- [x] level loading
- [x] save/load progress
- [x] new game
- [x] recipes
- [x] feedback (★ = &starf;)
- [x] menu button
- [x] recipe text content caching
- [x] play area boundaries
- [x] add status - score display, recipe+stars, total points
- [x] common way to update the contents of recipe, description, status divs
- [x] head pats for Cerberos
- [ ] ~About page~
- [ ] add a highlight to action buttons before they are used
- [ ] Goblin should remind to attach the recipe


## sounds
- [x] steps x2
- [x] cooking
- [x] different sound for petting
- [/] ~dialog x3~
- [ ] ~level load~
- [ ] ~level win~
- [x] seasoning
- [x] steps sound should be quieter


## input
- [x] virtual gamepad for mobile


## ui
- [x] menu
- [x] welcome screen
- [x] level transition effect


## graphics
- [x] wall
- [x] cutting board
- [ ] ~firewood/place~


## extras/bonuses

### Coil
- [x] add notice

### NEAR
- [x] add login
- [x] tip?
- [x] "thank you" message for tip

### in game
- [x] infinite pans, pots
- [x] extended last 3 seconds


## server features

### stats
- [x] total meals started
- [x] total meals finished
- [ ] total time cooked
- [x] total pans and pots used
- [ ] total seasoning used
- [x] total stars collected
- [x] total pats for Cerberos


## content

### ingredients
- [x] fire fungi
- [x] some vegetables

### seasoning
- [x] black pepper
- [ ] ~garlic~
- [x] green chili
- [ ] ~red habanero~


## annoying bugs
- [x] "in front of you" checks the grabbed object and its children as well
- [ ] jagged/buggy edges of transformed divs (Chrome only)
- [x] "d" div has background color
- [ ] stats are off when in transit (see code)

## severe bugs


## breaking bugs


## optimizations
- [x] cache the sprites in getSprite()
- [x] rename css classes, ids, etc.
- [x] remove newlines from minimized html
- [x] use integers instead of strings for object types
- [x] remove css comments
- [x] AdvZIP
- [/] pack sprite sheet more densly
- [x] replace all unicode characters with html entities
- [ ] set Google Closure Compiler to use single quotes (already set?!)
- [x] remove unused dialogs
- [x] remove console.log() calls
- [x] trash icon in sprites is unused
- [x] reduce sprites.png palette
- [x] remove chute sprite
- [ ] remove additional delay handling in dialog
- [ ] remove quotes from some attributes (i.e. onclick)
- [ ] Google Closure Compiler does not rename ".position", ".name", ".description", ".status"


## nice to have
- [ ] some transition from the welcome screen
- [ ] Find a name for Goblin
- [x] green dialog box for Goblin
- [ ] Goblin should walk around
- [ ] proper move and slide
- [ ] GameObject is interactable?
- [ ] proper 3rd axis handling (z-height?)
- [x] stacking z-height handling
- [ ] sort the contents of dishes properly
- [ ] ~fix border around dialog profile picture~
- [x] better font
- [ ] progressbar for cooking
- [ ] disable text selection
- [x] recursive highlight so the meat also blinks
- [ ] better gamepad dead zone handling (i.e. https://www.smashingmagazine.com/2015/11/gamepad-api-in-web-games/#applying-a-dead-zone )
- [x] cursor always arrow
- [ ] blinky "Press Start"? :)
- [ ] _floorHeight, _floorWidth, _padX, _padY, _zoom -> const
- [ ] _names -> data
- [ ] separate shadows from objects?
- [ ] dynamic shirt, pants colors
- [x] rearrange description box, separate boxes for "in front of", "drop target", etc.
- [ ] easter egg for trying to leave the play area
- [ ] easter egg for cooking stuffs too long (turn into coal)
