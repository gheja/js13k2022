# js13k2022

## notes
- If you mess up but have the ingredients you can try to cook it again. (skipping alreadyDone)

## general
- [ ] find a name
- [x] cooking individual ingredients
- [x] text progressbar for cooking
- [x] level loading
- [ ] save/load progress
- [ ] new game
- [x] recipes
- [ ] feedback (★ = &starf;)
- [x] menu button
- [ ] recipe text content caching
- [x] play area boundaries


## input
- [ ] virtual gamepad for mobile


## ui
- [x] menu
- [x] welcome screen
- [ ] level transition effect


## graphics
- [ ] wall
- [ ] cutting board
- [ ] firewood/place


## extras/bonuses
- [ ] infinite pans, pots
- [ ] extended last 3 seconds


## server features

### stats
- [ ] total meals started
- [ ] total meals finished
- [ ] total time cooked
- [ ] total pans and pots used
- [ ] total seasoning used
- [ ] total stars collected


## content

### ingredients
- [ ] fire fungi
- [ ] some vegetables

### seasoning
- [ ] black pepper
- [ ] garlic
- [ ] green chili
- [ ] red habanero


## annoying bugs
- [x] "in front of you" checks the grabbed object and its children as well
- [ ] jagged/buggy edges of transformed divs (Chrome only)

## severe bugs


## breaking bugs


## optimizations
- [x] cache the sprites in getSprite()
- [ ] rename css classes, ids, etc.
- [x] use integers instead of strings for object types
- [ ] remove css comments
- [ ] AdvZIP
- [/] pack sprite sheet more densly
- [ ] replace all unicode characters with html entities


## nice to have
- [ ] some transition from the welcome screen
- [ ] Find a name for Goblin
- [ ] Goblin shuold walk around
- [ ] proper move and slide
- [ ] GameObject is interactable?
- [ ] proper 3rd axis handling (z-height?)
- [ ] stacking z-height handling
- [ ] sort the contents of dishes properly
- [ ] fix border around dialog profile picture
- [x] better font
- [ ] progressbar for cooking
- [ ] disable text selection
- [x] recursive highlight so the meat also blinks
- [ ] better gamepad dead zone handling (i.e. https://www.smashingmagazine.com/2015/11/gamepad-api-in-web-games/#applying-a-dead-zone )
- [ ] cursor always arrow
- [ ] blinky "Press Start"? :)
- [ ] _floorHeight, _floorWidth, _padX, _padY, _zoom -> const
- [ ] _names -> data
- [ ] separate shadows from objects?
- [ ] dynamic shirt, pants colors
- [x] rearrange description box, separate boxes for "in front of", "drop target", etc.
- [ ] easter egg for trying to leave the play area
- [ ] easter egg for cooking stuffs too long (turn into coal)
