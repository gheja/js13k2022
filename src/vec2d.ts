class Vec2D
{
	x: number;
	y: number;
	
	constructor(x: number=0, y: number=0)
	{
		this.x = x;
		this.y = y;
	}
	
	copyFrom(source: Vec2D)
	{
		this.x = source.x;
		this.y = source.y;
	}
	
	add(source: Vec2D)
	{
		this.x += source.x;
		this.y += source.y;
	}
	
	subtract(source: Vec2D)
	{
		this.x -= source.x;
		this.y -= source.y;
	}
	
	zero()
	{
		this.x = 0;
		this.y = 0;
	}
	
	normalize()
	{
		let a;
		a = Math.abs(this.x) + Math.abs(this.y);
		if (a == 0)
		{
			this.x = 1;
			this.y = 0;
		}
		else
		{
			this.x /= a;
			this.y /= a;
		}
	}
}
