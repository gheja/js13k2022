class GameObjectContainer extends GameObject
{
    domObject2: HTMLElement;
    domObjectFire: HTMLElement;
    animationFrame: number;

    constructor(position: Vec2D)
    {
        super(position, 10, 10);
        this.domObject2 = newSpriteDomObject(this.domObject, 0, 18, 10, 10);
        this.domObjectFire = newSpriteDomObject(this.domObject, 0, 0, 10, 10);
        this.animationFrame = Math.floor(Math.random() * 5000);
    }

    updateSprite()
    {
        if (_game.ticks % 8 == 0)
        {
            this.animationFrame++;
            let a = [ 10, 20, 30 ];
            this.domObjectFire.style.background = "url(" + getSprite(a[(this.animationFrame) % 3], 18, 10, 10) + ") no-repeat";
        }
    }
}