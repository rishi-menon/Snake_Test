const snake_size = 20;
//this is to add spaces between blocks
const snake_draw_percent = 0.85; //this is to draw a portion of the block...
const snake_draw_size = snake_size * snake_draw_percent;

function DrawRect (x, y, l, b, col, mode) {
    ctx.beginPath ();
    ctx.rect (x, y, l, b);
    ctx.closePath ();
    if (mode == "s") {
        //stroke
        ctx.strokeStyle = col;
        ctx.stroke ();
    } else if (mode == "f") {
        ctx.fillStyle = col;
        ctx.fill ();
    } else
        return;
}

function get_col_from_value (val) {
    //returns string of colour from a hexadecimal number
    return ("#" + val.toString(16));
}

function lerp_colour (a, b, value) {
		// # RRGGBB - each letter is 4 bytes
		var red = lerp (a>>16, b>>16, value);
		var green = lerp ((a>>8) & 0xFF, (b>>8) & 0xFF, value);
		var blue = lerp (a & 0xFF, b & 0xFF, value);
		return ((red<<16) | (green<<8) | (blue));
}
function lerp (a, b, value) {
		return a + (b-a) * value;
}

function move_player_in_dir (key) {

    //new dir should latest dir which should be the last element of a list
    //or the dir if the list is empty
    var new_dir = (dirs_list.length > 0) ? dirs_list[dirs_list.length - 1] : dir;
    var old_dir = new_dir;

    //Playerr is alivee
    switch (key) {
      case 68:
      case 39:
      //right
        //if it is 1 then its going either up or down
        if (new_dir % 2 == 1) {
            new_dir = 2;
        }
        break;

      case 65:
      case 37:
      //left
        //if it is 1 then its going either up or down
        if (new_dir % 2 == 1) {
            new_dir = 4;
        }
        break;

      case 87:
      case 38:
        //up
        //if it is 0 then its going either left or right
        if (new_dir % 2 == 0) {
            new_dir = 1;
        }
        break;

      case 40:
      case 83:
      //down
      //if it is 0 then its going either left or right
        if (new_dir % 2 == 0) {
            new_dir = 3;
        }
        break;
    }

    //check whether to add direction to the list or not
    //add if there is a new direction AND if size is left
    if (new_dir != old_dir && dirs_list.length < dirs_size) {
            //add direction to the list
            dirs_list.push (new_dir);
    }
}  

