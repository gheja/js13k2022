class GameObjectPlayer extends GameObject
{
	domObjectBodyFront: HTMLElement;
	domObjectBodyBack: HTMLElement;
	domObjectEyes: HTMLElement;
	domObjectHands: HTMLElement;
	domObjectGrabBox: HTMLElement;
	// speed: number;
	// direction: number;
	
	constructor(position: Vec2D)
	{
		super("player", position)

		this.domObjectBodyFront = newSpriteDomObject(this.domObject, 10, 0, 10, 18)
		this.domObjectBodyBack = newSpriteDomObject(this.domObject, 10, 0, 20, 18)
	}

	updateSprite()
	{
		let moving: boolean;

		moving = (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) > 2);

		if ((this.velocity.y < -2) && moving)
		{
			this.domObjectBodyFront.style.display = "none";
			this.domObjectBodyBack.style.display = "block";
		}
		else
		{
			this.domObjectBodyFront.style.display = "block";
			this.domObjectBodyBack.style.display = "none";
		}

		if (_game.ticks % 20 == 0)
		{
			if (moving)
			{
				this.domObject.style.transform = "rotate(-10deg)";
				emitParticle(this.domObject.offsetLeft + 12, this.domObject.offsetTop + 58, "dust", 300);
			}
			else
			{
				this.domObject.style.transform = "rotate(0deg)";
			}
		}
		else if (_game.ticks % 20 == 10)
		{
			if (moving)
			{
				this.domObject.style.transform = "rotate(10deg)";
				emitParticle(this.domObject.offsetLeft + 28, this.domObject.offsetTop + 58, "dust", 300);
			}
			else
			{
				this.domObject.style.transform = "rotate(0deg)";
			}
		}
	}
}