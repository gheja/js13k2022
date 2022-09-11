"use strict";

const MESSAGE_RECORD = "b";
const MESSAGE_STATS = "d";

const STORAGE_KEY = "a";

let players = 0;

function log(a, b)
{
	// useful for recovering stats if the database
	// gets corrupted or anything unexpected happens
	console.log(Date.now() + ":" + a + ":" + JSON.stringify(b));
}

async function submitRecord(socket, entry)
{
	let a;
	let i;
	
	// TODO:
	a = (await storage.get(STORAGE_KEY)) || [0,0,0,0,0,0,0,0,0,0,0,0];
	
	for(i=0;i<entry.length;i++)
	{
		a[i] += entry[i];
	}
	
	await storage.set(STORAGE_KEY, a);

	
	log("a", a);
	log("b", entry);

	socket.emit(MESSAGE_STATS, a);
}

module.exports = {
	io: (socket) => {
		socket.on("disconnect", () => {
			players--;
			log("e", players);
		});
		socket.on(MESSAGE_RECORD, (entry) => submitRecord(socket, entry));
		
		players++;
		log("d", players);
	},
};
