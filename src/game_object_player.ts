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
		super(position, 10, 18);

		this.domObject.style.width = _z(10) + "px";
		this.domObject.style.height = _z(18) + "px";
		this.domObjectBodyFront = newSpriteDomObject(this.domObject, 10, 0, 10, 18)
		this.domObjectBodyBack = newSpriteDomObject(this.domObject, 20, 0, 10, 18)
	}

	updateSprite()
	{
		let moving: boolean;

		moving = (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) > 2);

		if ((this.velocity.y < -2) && moving)
		{
			this.domObjectBodyFront.style.display = "none";
			this.domObjectBodyBack.style.display = "";
		}
		else
		{
			this.domObjectBodyFront.style.display = "";
			this.domObjectBodyBack.style.display = "none";
		}

		if (_game.ticks % 20 == 0)
		{
			if (moving)
			{
				this.domTransformExtra = "rotate(-10deg)";
				emitParticle(this.position.x + 7, this.position.y, "dust", 300);
			}
			else
			{
				this.domTransformExtra = "rotate(0deg)";
			}
		}
		else if (_game.ticks % 20 == 10)
		{
			if (moving)
			{
				this.domTransformExtra = "rotate(10deg)";
				emitParticle(this.position.x + 3, this.position.y, "dust", 300);
			}
			else
			{
				this.domTransformExtra = "rotate(0deg)";
			}
		}
	}
}