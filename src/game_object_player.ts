class GameObjectPlayer extends GameObject
{
	domObjectBodyFront: HTMLElement;
	domObjectBodyBack: HTMLElement;
	domObjectEyes: HTMLElement;
	domObjectHands: HTMLElement;
	domObjectGrabBox: HTMLElement;
	domObjectShadow: HTMLElement;
	// speed: number;
	// direction: number;
	
	constructor(position: Vec2D)
	{
		super(position, 10, 18, "", "");

		this.domObject.style.width = _z(10) + "px";
		this.domObject.style.height = _z(18) + "px";
		this.domObjectBodyFront = newSpriteDomObject(this.domObject, 0, 2, 10, 18)
		this.domObjectBodyBack = newSpriteDomObject(this.domObject, 10, 2, 10, 18)
		this.domObjectShadow = newSpriteDomObject(this.domObject, 40, 40, 10, 10)
		this.domObjectShadow.style.transform = "translateY(" + _z(12) + "px) rotateX(90deg)";
		this.domObjectShadow.style.opacity = "0.5";
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
				emitParticle(this.position.x + 5.5, this.position.y, 20, 70, 3, 3, "a2", 300);
				playSound(SOUND_STEP_1);
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
				emitParticle(this.position.x + 1.5, this.position.y, 20, 70, 3, 3, "a2", 300);
				playSound(SOUND_STEP_2);
			}
			else
			{
				this.domTransformExtra = "rotate(0deg)";
			}
		}
	}
}