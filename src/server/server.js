"use strict";

const MESSAGE_RECORD = "b";
const MESSAGE_GET_STATS = "c";
const MESSAGE_STATS = "d";

const STORAGE_KEY = "a";

let leaderboards = null;
let players = 0;

function log(a, b)
{
	// useful for recovering stats if the database
	// gets corrupted or anything unexpected happens
	console.log(Date.now() + ":" + a + ":" + JSON.stringify(b));
}

async function submitRecord(socket_id, entry)
{
	let a;
	
	// TODO:
	// a = (await storage.get(STORAGE_KEY)) || [];
	// await storage.set(STORAGE_KEY, a);
	
	log("a", a);
	log("b", entry);
}

async function sendStats(socket)
{
	socket.emit(MESSAGE_STATS, await storage.get(STORAGE_KEY));
}

module.exports = {
	io: (socket) => {
		socket.on("disconnect", () => {
			players--;
			log("e", players);
		});
		socket.on(MESSAGE_RECORD, (entry) => submitRecord(socket.id, entry));
		socket.on(MESSAGE_NEW_NAME, (name) => setName(socket.id, name));
		socket.on(MESSAGE_GET_STATS, () => sendStats(socket));
		
		players++;
		log("d", players);
	},
};
