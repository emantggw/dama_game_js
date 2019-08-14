/*




			



							++==	+==	   ==+	===+  ++===+    |
							||__	|  \  /	 |	 __|  ||   |  __+__		 
							||		|	\/	 |	|  |  ||   |	|
							++==	|		 |	+==+  ||   |	|___

									INITATED 2019/8/14
									DAMA 2D, 2.5D GAME ENGINE


*/
var cs = document.getElementById("can");
var home = {
	main: document.getElementById("home"),
	playbtn: document.getElementById("playbtn")
}
var game_over = {
	main: document.getElementById("game_over"),
	playagainbtn: document.getElementById("playagainbtn")

}

/*
Modes for modal
1==>Fadein home modal{play, about, licince}
2==>Fadeout home 
3==>Fadein gameover and fading play-again/exit
4==>Fadeout 
0==>Playing do nothing
*/

function fade(opacity, mode) {
	var op = opacity / 1000 - modal.starttime / 1000;
	if (modal.mode == 1) {
		//Fadin home
		home.main.style.display = "block";
		home.main.style.opacity = op;
		home.playbtn.onclick = function () {
			modal.mode = 2;
			newgame();//Initialization new game
		}
	}
	if (modal.mode == 2) {
		//Fadeout home
		home.main.style.opacity = 1 - op;
		if (op >= 0.8)
			home.main.style.display = "none";
	}
	if (modal.mode == 3) {
		//Gameover is triggerd here after complited fading of gameover fadein
		game_over.main.style.display = "block";
		game_over.main.style.opacity = op;
		game_over.main.style.background = level.wall_color;//Hit wall color
		if (op >= 0.6) {
			game.mode = -1;//Cleanup memory
		}
		game_over.playagainbtn.onclick = function () {
			modal.mode = 4;
			newgame();
		}
	}
	if (modal.mode == 4) {
		//Fadeout home
		game_over.main.style.opacity = 1 - op;
		if (op >= 0.8)
			game_over.main.style.display = "none";
	}
}

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');

window.addEventListener('keydown', this.key, false);
var keycode = 0;//right;
function key(e) {
	if (e.keyCode <= 40 && e.keyCode >= 37) {
		keycode = e.keyCode - 37;
	}
}
function range(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function randColor() {
	var col = [[37, 218, 218], [37, 218, 37], [37, 37, 218], [224, 224, 31], [224, 31, 224], [224, 31, 31]];
	//return 'rgb('+Math.floor(Math.random()*1000%255)+','+Math.floor(Math.random()*1000%255)+','+Math.floor(Math.random()*1000%255)+')';
	var sel = col[Math.floor(Math.random() * col.length)];
	return 'rgb(' + sel[0] + ',' + sel[1] + ',' + sel[2] + ')';
}
function rotate(ax, rd) {
	var rt = {
		x: ax.x * Math.cos(rd) - ax.y * Math.sin(rd),
		y: ax.y * Math.cos(rd) + ax.x * Math.sin(rd)
	}
	return rt;
}
function getVertices(r, sides) {
	var ang = Math.PI * 2 / sides;
	var vert = [];
	var delta = -Math.PI / 4;//To make Normal rectangle
	for (var i = 0; i < sides; i++) {
		//console.log(Math.cos(i*ang)*r);
		var pt = { x: Math.cos(i * ang + delta) * r, y: Math.sin(i * ang + delta) * r };
		vert[i] = pt;
	}
	return vert;
}
function distanceBetween(pt1, pt2) {
	return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
function isoTo2d(iso) {
	return { x: (2 * iso.y + iso.x), y: (2 * isoy - iso.x) / 2 };
}
function twToiso(car) {
	return { x: (car.x - car.y), y: (car.x + car.y) / 2 };
}

var modal = {
	fps: 20,
	timestep: 1000 / 20,
	starttime: 0,
	isset_start_time: false,
	dur: 1000,
	lastupdate: 0,
	mode: 1
};
var game = {
	fps: 60,//Normal Frame persecond
	timestep: 1000 / 10,
	lastupdate: 0,
	mode: 0,//Ready to start,
	dev: "Emant"
};
var dama_info = { x: 0, y: 0, ditected_rgb: "", clicked: false, dblclicked: false };
canvas.addEventListener("mousemove", function (e) {
	if (e.clientX >= level.x && e.clientX < level.x + level.tilewidth * level.cols && e.clientY >= level.y && e.clientY < level.y + level.tilewidth * level.rows) {
		var x = e.clientX;
		var y = e.clientY;
		var data = c.getImageData(x, y, 1, 1).data;
		dama_info.x = Math.round((x - level.x) / level.tilewidth);
		dama_info.y = Math.round((y - level.y) / level.tilewidth);
		dama_info.ditected_rgb = "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";
		dama_info.clicked = false;
		dama_info.dblclicked = false;
	}
});
canvas.addEventListener("click", function (e) {
	dama_info.clicked = true;
});
canvas.addEventListener("dblclick", function (e) {
	dama_info.dblclicked = true;
});



var Level = function () {
	//Initialization
	/*
		2D, Isometric view
	If we want to feel like 3d use isometric view, which makes better your game
	but one thing consider here is that, you can just transform simple 2D to isometric there is some concepts
	offcourse even actual matrix tiles is store in 2d but the way interacting to screen is isometric
	1.
		Convert the screen display coordinate to isometric
	2.
		Use the spirtes img which is aready in diamends shape, so it can fit
	3.	If you want to use the actual core canvas to fill colors and shape of your tiles level
		you have to work hard
	Example
	you can't just translate drawrect to isometric becuase it only let you specify starting vertices(1) and width and height
	beign with top-left of the screen
	so miss 3-vertices, without them you can't translate whole rectangle 
	*/
};

Level.prototype.init = function () {
	this.view = "2d";
	//This design is based upon isometric view
	//You can't just set width and hight of tiles by hand,
	//It's depend on the number of virtual radius you have given, large r >> large width and height
	this.virtualRadius = 30;
	//Get vertices coordinate 
	this.vert = getVertices(this.virtualRadius, 4);
	//Inorder to get acurate width and height(actually both are equal) we have to measure the distance between two vertices
	//We have to calculate the distance between two points which relay on x
	//at v3 and v0 ==> or v2==>v1 we can get width
	//Same manner to get height V3 and V2 or v0 and v1 distance
	this.tilewidth = distanceBetween(this.vert[this.vert.length - 1], this.vert[0]);//2*this.virtualRadius*sin|cos(pi/4)
	this.tileheight = distanceBetween(this.vert[0], this.vert[1]);
	this.cols = 10;
	this.rows = 10;
	//Since we are store rows and column by integer 
	//Means that we can get specific cols and rows by indexing num
	//By default my custem grid center is not top-left so we can directly draw at center of grid by half of tilewidth
	//you can looping and increment it's cols and rows(x, y) by one. simply check weather it's bounce with wall or not by(current_y+1 is not wall)
	//But the problem is that when you increase the index by some floating number(like 0.1..) how can get the exact position of this cols and rows
	//One way to do rounding to the nearest number of looping variable 0.1 >> 0, and 0.6 >> 1 so we can get actual cols and rows since they are integer
	//Not finished yet, to get actual collision it's also not accurate by checking(y+1 IS wall?) as i said my grid tile orgin is center so collision detection plus +1 
	//May not accurate since, example current_x = 11, current_y=4, wall_y = 6
	/*
	===>wall = 6;
	===>speed = 0.1
	===>current_x = 11;
	===>current_y = 4.4+speed;
		if(round(current_y)+1==6)?bounce:keep_going
		>>4.5 is rounded nearset to 5, 
		>>5+1 is also 6 then it will bounce to back, but we still remaing 0.5 to get actual pos
		==>AVOID using +1 check instaied use +0.5 -0.5 if you are using speed floating numbers 
			at this time rounding will fit to normal
	*/


	//At screen center position
	//Or you can leave, and by default start with top-left of screen position
	//==>2D center-obj this.x = innerWidth/2-(this.cols/2)*this.tilewidth;
	//==>2D center-obj this.y = innerHeight/2-(this.rows/2)*this.tileheight;
	//Iso center-obj
	this.x = innerWidth / 2 - (this.cols / 2) * this.tilewidth;
	this.y = innerHeight / 2 - (this.rows / 2) * this.tileheight;
	this.tiles = [];
	this.playable_field = "rgb(255,255,255)";
	this.solider = { north: 2, south: 3 };

	for (var i = 0; i < this.cols; i += 1) {
		this.tiles[i] = [];
		for (var j = 0; j < this.rows; j += 1) {
			if (i == 0 || j == 0 || i == this.cols - 1 || j == this.rows - 1) {
				//Walls
				this.tiles[i][j] = -1;
			}
			else if ((i + j) % 2 == 0) {
				//1 by default free avaliable battle field
				//2 reserved by oponent
				//3 reserved by other oposite oponent
				this.tiles[i][j] = 1;
			} else {
				this.tiles[i][j] = -1;
			}
		}
	}
};
Level.prototype.draw = function () {
	for (var i = 0; i < this.cols; i += 1) {
		for (var j = 0; j < this.rows; j += 1) {
			if (this.tiles[i][j] == 1 || this.tiles[i][j] == 2 || this.tiles[i][j] == 3) {
				//Walls
				this.drawRect(i * this.tilewidth, j * this.tileheight, this.view, "fill", this.playable_field);
			} if (this.tiles[i][j] == -1) {
				this.drawRect(i * this.tilewidth, j * this.tileheight, this.view, "fill", "black");
			}
		}
	}

};
Level.prototype.drawLine = function (i, j, view, mode, color) {
	//i=i*this.tilewidth
	//j=j*this.tilewidth
	c.lineWidth = 1.5;
	if (view == "2d") {
		c.beginPath();
		c.moveTo(this.x + this.vert[3].x + i, this.y + this.vert[3].y + j);
		c.lineTo(this.x + this.vert[2].x + i, this.y + this.vert[2].y + j);
		if (mode == "stroke") {
			c.strokeStyle = color;
			c.stroke();
		} else {
			c.fillStyle = color;
			c.fill();
		}
		c.closePath();
	}

}
Level.prototype.drawRect = function (i, j, view, mode, color) {
	c.lineWidth = 0.1;
	if (view == "2d") {
		c.beginPath();
		c.moveTo(this.x + this.vert[3].x + i, this.y + this.vert[3].y + j);
		for (var r = 0; r < this.vert.length; r++) {
			c.lineTo(this.x + this.vert[r].x + i, this.y + this.vert[r].y + j);
		}
		if (mode == "stroke") {
			c.strokeStyle = color;
			c.stroke();
		} else {
			c.fillStyle = color;
			c.fill();
		}
		c.closePath();
	}
	if (view == "iso") {
		c.beginPath();
		//Isometric x
		c.moveTo(this.x + twToiso(
			{ x: this.vert[3].x + i, y: this.vert[3].y + j }).x, this.y + twToiso(
				{ x: this.vert[3].x + i, y: this.vert[3].y + j }).y);
		for (var r = 0; r < this.vert.length; r++) {
			c.lineTo(this.x + twToiso(
				{ x: this.vert[r].x + i, y: this.vert[r].y + j }).x, this.y + twToiso(
					{ x: this.vert[r].x + i, y: this.vert[r].y + j }).y);
		}
		if (mode == "stroke") {
			c.strokeStyle = color;
			c.stroke();
		} else {
			c.fillStyle = color;
			c.fill();
		}
		c.closePath();
	}

};
var Solider = function (x, y, type) {
	//init
	this.init(x, y, type);
};
Solider.prototype.init = function (x, y, position) {
	this.x = x;
	this.y = y;
	this.r = level.tilewidth / 2.5;
	this.position = position;
	this.status = this.position == level.solider.south ? false : true;
	this.color = this.position == level.solider.north ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
	this.active = "white";
	this.is_king = false;
	this.is_killed = false;

};

Solider.prototype.update = function (soliders) {
	battle.war(this, soliders);
	this.draw();
};
Solider.prototype.draw = function () {
	if (battle.hint_move.length != 0) {
		//Showing hint move to the current cursor solider
		for (var i = 0; i < battle.hint_move.length; i++) {
			if (this == battle.hint_move[i].sold) {
				c.lineWidth = 2;
				c.strokeStyle = this.active;
				c.fillStyle = this.active;
				c.beginPath();
				c.arc(level.x + battle.hint_move[i].x * level.tilewidth, level.y + battle.hint_move[i].y * level.tilewidth, this.r / 2, 0, Math.PI * 2, false);
				c.fill();
				c.closePath();
				c.beginPath();
				c.moveTo(level.x + battle.hint_move[i].x * level.tilewidth, level.y + battle.hint_move[i].y * level.tilewidth);
				c.lineTo(level.x + this.x * level.tilewidth, level.y + this.y * level.tilewidth);
				c.stroke();
				c.closePath();
			}
		}
	}
	if (battle.kill_move.length != 0) {
		for (var i = 0; i < battle.kill_move.length; i++) {
			c.fillStyle = 'lime';
			c.beginPath();
			c.arc(level.x + battle.kill_move[i].jx * level.tilewidth, level.y + battle.kill_move[i].jy * level.tilewidth, this.r / 2, 0, Math.PI * 2, false);
			c.fill();
			c.closePath();
		}
	}
	if (!this.is_king) {
		c.beginPath();
		c.strokeStyle = this.active;
		c.lineWidth = 5;
		c.fillStyle = this.color;
		c.arc(level.x + this.x * level.tilewidth, level.y + this.y * level.tilewidth, this.r, 0, Math.PI * 2, false);
		c.fill();
		c.stroke();
		c.closePath();
	} else {
		c.beginPath();
		c.fillStyle = this.color;
		c.arc(level.x + this.x * level.tilewidth, level.y + this.y * level.tilewidth, this.r, 0, Math.PI * 2, false);
		c.fill();
		c.closePath();
		c.fillStyle = "white";
		c.beginPath();
		c.font = "15pt TimesNewRoman";
		c.fillText("K", level.x + this.x * level.tilewidth - 5, level.y + this.y * level.tilewidth + 5);
		c.closePath();
	}

};
var Battle = function () {
	//INIT
}
Battle.prototype.init = function (soliders) {
	//===WAR BETWEEN NORTH AND SOUTH
	//>>>>NORTH=2
	//>>>>SOUTH=3
	this.hint_move = [];
	this.free_move = [];
	this.kill_move = [];
	this.commanded_solider = null;
	this.moved = false;
	this.toggleAttack(soliders);
}
Battle.prototype.toggleAttack = function (soliders) {
	//The attacking power shift to two respective zones
	//South and North
	for (var i = 0; i < soliders.length; i++) {
		if (soliders[i].position == level.solider.south) {
			soliders[i].status = !soliders[i].status;
		} else {
			soliders[i].status = !soliders[i].status;
		}
	}
};

Battle.prototype.scanner = function (sold, soliders) {
	var enemy_pos = sold.position == level.solider.north ? level.solider.south : level.solider.north;
	var by = sold.position == level.solider.north ? 1 : -1;
	var take = [];
	for (var i = 0; i < soliders.length; i++) {
		if (soliders[i].is_killed || soliders[i].position == enemy_pos) {
			continue;
		}
		if (soliders[i].is_king) {
			if (level.tiles[soliders[i].x - 1][soliders[i].y - 1] == enemy_pos) {
				if (level.tiles[soliders[i].x - 2][soliders[i].y - 2] == 1) {
					take.push({
						jx: soliders[i].x - 2, jy: soliders[i].y - 2, sold: soliders[i],
						enemy: this.getSolider(soliders[i].x - 1, soliders[i].y - 1, soliders)
					});

				}
			}
			if (level.tiles[soliders[i].x + 1][soliders[i].y - 1] == enemy_pos) {
				if (level.tiles[soliders[i].x + 2][soliders[i].y - 2] == 1) {
					take.push({
						jx: soliders[i].x + 2, jy: soliders[i].y - 2, sold: soliders[i],
						enemy: this.getSolider(soliders[i].x + 1, soliders[i].y - 1, soliders)
					});

				}
			}
			if (level.tiles[soliders[i].x + 1][soliders[i].y + 1] == enemy_pos) {
				if (level.tiles[soliders[i].x + 2][soliders[i].y + 2] == 1) {
					take.push({
						jx: soliders[i].x + 2, jy: soliders[i].y + 2, sold: soliders[i],
						enemy: this.getSolider(soliders[i].x + 1, soliders[i].y + 1, soliders)
					});

				}
			}
			if (level.tiles[soliders[i].x - 1][soliders[i].y + 1] == enemy_pos) {
				if (level.tiles[soliders[i].x - 2][soliders[i].y + 2] == 1) {
					take.push({
						jx: soliders[i].x - 2, jy: soliders[i].y + 2, sold: soliders[i],
						enemy: this.getSolider(soliders[i].x - 1, soliders[i].y + 1, soliders)
					});
				}
			}
		} else {
			//Solidures kills
			if (level.tiles[soliders[i].x - 1][soliders[i].y + by] == enemy_pos) {
				if (!this.getSolider(soliders[i].x - 1, soliders[i].y + by, soliders).is_king) {
					if (level.tiles[soliders[i].x - 2][soliders[i].y + 2 * by] == 1) {
						take.push({
							jx: soliders[i].x - 2, jy: soliders[i].y + 2 * by, sold: soliders[i],
							enemy: this.getSolider(soliders[i].x - 1, soliders[i].y + by, soliders)
						});
					}
				}
			}
			if (level.tiles[soliders[i].x + 1][soliders[i].y + by] == enemy_pos) {
				if (!this.getSolider(soliders[i].x + 1, soliders[i].y + by, soliders).is_king) {
					if (level.tiles[soliders[i].x + 2][soliders[i].y + 2 * by] == 1) {
						take.push({
							jx: soliders[i].x + 2, jy: soliders[i].y + 2 * by, sold: soliders[i],
							enemy: this.getSolider(soliders[i].x + 1, soliders[i].y + by, soliders)
						});
					}
				}
			}
		}
	}
	return take;
};
Battle.prototype.war = function (solider, soliders) {
	//Here first check is there any buffer which stored next_move and solider
	//Then next click we give much concern
	if (this.commanded_solider != null && dama_info.clicked) {
		//RULE BASED ON "EGERENGA"
		//HERE ENTER ONLY WHEN USERS FIRED ONLY FRRE BATTLE FIELD(WHITE AREA)
		var fired_x = dama_info.x;
		var fired_y = dama_info.y;
		var sold = this.commanded_solider;

		this.kill_move = this.scanner(sold, soliders);
		var kills = this.kill_move.length > 0 ? true : false;
		console.log(this.kill_move);
		for (var i = 0; i < this.kill_move.length; i++) {
			if (fired_x == this.kill_move[i].jx && fired_y == this.kill_move[i].jy && sold == this.kill_move[i].sold) {
				this.move(fired_x, fired_y, sold);
				this.kill(this.kill_move[i].enemy);
				this.kill_move = this.scanner(sold, soliders);
				if (this.kill_move.length == 0) {
					this.toggleAttack(soliders);
				}
			}
		}
		if (!kills) {
			for (var i = 0; i < this.free_move.length; i++) {
				if (this.free_move[i].x == fired_x && this.free_move[i].y == fired_y) {
					this.move(fired_x, fired_y, sold);
					this.toggleAttack(soliders);
				}
			}
		}

		this.free_move = [];
		this.commanded_solider = null;
		dama_info.clicked = false;


	}
	if (solider.status) {
		if (dama_info.x == solider.x && dama_info.y == solider.y && dama_info.ditected_rgb == solider.color) {
			solider.active = "lime";
			//Showing the current avalibale moves 
			this.hint_move = this.nextMove(solider, soliders);
			if (dama_info.clicked) {
				//Take target position to move
				this.free_move = this.nextMove(solider, soliders);
				this.commanded_solider = solider;
				canvas.style.cursor = "pointer";

				//Avoid stack and make not load this over and overagain
				//Save stack size
				dama_info.clicked = false;
			}
		} else {
			//Out cursor
			solider.active = "white";
			this.hint_move = [];
		}
	}
};
Battle.prototype.move = function (x, y, sold) {
	//Freeup space
	level.tiles[sold.x][sold.y] = 1;
	sold.x = x;
	sold.y = y;
	level.tiles[sold.x][sold.y] = sold.position;
	canvas.style.cursor = "default";
	if (sold.position == level.solider.north && !sold.is_king) {
		//To became king at southern
		if (sold.y == level.rows - 2) {
			sold.is_king = true;
			sold.color = sold.color == "rgb(255,0,0)" ? "rgb(128,0,0)" : "rgb(0,0,128)";
			sold.r = level.tilewidth / 2.3;
		}
	}
	if (sold.position == level.solider.south && !sold.is_king) {
		//To became king at southern
		if (sold.y == 1) {
			sold.is_king = true;
			sold.color = sold.color == "rgb(255,0,0)" ? "rgb(128,0,0)" : "rgb(0,0,128)";
			sold.r = level.tilewidth / 2.3;
		}
	}

};
Battle.prototype.kill = function (sold) {
	level.tiles[sold.x][sold.y] = 1;
	sold.is_killed = true;
	sold.position = 1;
	sold.x = 0;
	sold.y = 0;
};

Battle.prototype.nextMove = function (solider, soliders) {
	//Finding avaliable next move with respecting of only playable field
	var move = [];
	var x = solider.x;
	var y = solider.y;
	var by = solider.position == level.solider.south ? -1 : 1;

	if (!solider.is_king) {
		//Then show hint free move
		if (level.tiles[x - 1][y + by] == 1) {
			move.push({ x: x - 1, y: y + by, step: by, sold: solider });
		}
		if (level.tiles[x + 1][y + by] == 1) {
			move.push({ x: x + 1, y: y + by, step: by, sold: solider });
		}
	} if (solider.is_king) {
		if (level.tiles[x - 1][y - 1] == 1) {
			move.push({ x: x - 1, y: y - 1, sold: solider });
		}
		if (level.tiles[x + 1][y - 1] == 1) {
			move.push({ x: x + 1, y: y - 1, sold: solider });
		}
		if (level.tiles[x + 1][y + 1] == 1) {
			move.push({ x: x + 1, y: y + 1, sold: solider });
		}
		if (level.tiles[x - 1][y + 1] == 1) {
			move.push({ x: x - 1, y: y + 1, sold: solider });
		}
	}
	return move;

};
Battle.prototype.getSolider = function (x, y, soliders) {
	for (var i = 0; i < soliders.length; i++) {
		if (soliders[i].x == x && soliders[i].y == y) {
			return soliders[i];
		}
	}
	return null;
};
//======SCORE
var Score = function () {
	//Initialization
};

//FPS
var FPS = function () {
	//Initialization
	this.init();
};
FPS.prototype.init = function () {
	// body...
	this.x = innerWidth * 0.08;
	this.y = innerHeight * 0.3;
	this.lastupdate = 0.0;
	this.current_frames = 0;
	this.fps = 0;

};
FPS.prototype.draw = function () {

	c.fillStyle = "teal";
	c.beginPath();
	c.arc(this.x, this.y, 50, 0, Math.PI * 2, false);
	c.fill();
	c.closePath();

	c.fillStyle = "white";
	c.font = "bold 25pt TimesNewRoman";
	c.beginPath();
	c.fillText("FPS", this.x - 30, this.y - 52);
	c.fillText(Math.floor(this.fps), this.x - 8 * (Math.floor(this.fps) + "").length, this.y + 10);
	c.closePath();
};
//DEV
var Dev = function () {
	//Initialization
	this.init();
};
Dev.prototype.init = function () {
	// body...
	this.x = (level.cols * this.level + level.x) * 0.85;
	this.y = (level.rows * level.tileheight + level.y) * 0.85;
};
Dev.prototype.draw = function () {
	c.fillStyle = "rgba(110,110, 34, 0.2)";
	c.font = "bold 35pt Impact";
	c.beginPath();
	c.fillText(game.dev, this.x, this.y);
	c.closePath();
};




var level = new Level();
var score = new Score();
var fps = new FPS();
var dev = new Dev();
var soliders = [];
var battle = new Battle();


function newgame() {
	keycode = 2;
	game.mode = 1;//Comman Start playing
	game.lastupdate = 0;
	level.init();
	//Positioning solider for both part(enemy and count)
	for (var j = 0; j < level.rows / 2 - 1; j++) {
		for (var i = 0; i < level.cols; i++) {
			if (level.tiles[i][j] == 1) {
				//Putting solider only battle field
				soliders.push(new Solider(i, j, level.solider.north));
				//Reserve it's space position solider after put
				level.tiles[i][j] = level.solider.north;

			}
		}
	}
	//Solider-part-two
	for (var j = level.rows - 1; j > level.rows - level.rows / 2 - 1 + 1; j--) {
		for (var i = 0; i < level.cols; i++) {
			//Putting solider only battle field
			if (level.tiles[i][j] == 1) {
				soliders.push(new Solider(i, j, level.solider.south));
				//Reserve it's space position 
				level.tiles[i][j] = level.solider.south;
			}
		}
	}
	//Triggering soliders
	battle.init(soliders);

	main(0);//Starting main;

}

function main(timestamp) {
	c.clearRect(0, 0, innerWidth, innerHeight);

	if (timestamp - game.lastupdate >= game.timestep && game.mode == 1) {
		//jk.update();
		game.lastupdate = timestamp;
	}

	if (game.mode == 1 || game.mode == -1) {
		/*
		========NOTE====
		Snake draw and other drawing is running under normal circemstance
		which means they running 60fps, but only update snake address by specified fps,
		so the the snake draw function keep catch it's postion till update is called. One thing here is
		as i said we only want to limit snake speed not snake drawing or level, rat, score... thats why
		i let them to draw max fps
		=========
		*/
		//Show game grahic in playing and even faild also


		level.draw();
		soliders.forEach(e => {
			if (!e.is_killed) {
				e.update(soliders);
			}
		});


	}


	//User interacting
	if (modal.mode != 0 && timestamp - modal.lastupdate >= modal.timestep) {
		//Welcome 
		modal.starttime = modal.isset_start_time ? modal.starttime : timestamp;//Setting start time
		modal.isset_start_time = true;//Set in each iteration to keep start time
		fade(timestamp, modal.mode);//Call the method to fade/inout whatever modal
		modal.lastupdate = timestamp;//Save the last timestamp

		if (timestamp - modal.starttime > modal.dur) {
			//The timestamp reached the duration
			//Update keys
			modal.isset_start_time = false;
			modal.mode = 0;
		}
	}

	//Calculating and displaying FPS 
	if (timestamp > fps.lastupdate + 1000) {
		//Update every seconds
		fps.fps = 0.25 * fps.current_frames + (1 - 0.25) * fps.fps;
		//Compute FPS
		//save lastupdate
		fps.lastupdate = timestamp;
		//Set current to zero
		fps.current_frames = 0
	}
	fps.current_frames++;
	fps.draw();
	dev.draw();

	if (game.mode != -1) {
		// Only when the game is playing the main animation is looping
		// Otherwise to save system terminate it
		window.requestAnimationFrame(main);
	}
}
main(0);

