const db = require('sqlite');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const Promise = require('bluebird');
const uuid = require('uuid');

var { buildSchema } = require('graphql');

var schema = buildSchema(`
	type Query {
		CharacterType(identifier:String,name:String): [CharacterType]
		Friendship(identifier:String,charid:String,friendId:String): [Friendship]
		Heroes(identifier:String): [Heroes]
		Appears(identifier:String): [Appears]
		Character(identifier:String,name:String): [Character]
		Episode(identifier:String,code:String): [Episode]
	}

	type Mutation {
		createCharacterType(name:String): CharacterType
		createFriendship(charid:String,friendId:String): Friendship
		createHeroes(): Heroes
		createAppears(): Appears
		createCharacter(): Character
		createEpisode(code:String): Episode
	}

	type CharacterType {
		identifier:String
		name:String
	}

	type Friendship {
		identifier:String
		charid:String
		friendId:String
	}

	type Heroes {
		identifier:String
	}

	type Appears {
		identifier:String
	}

	type Character {
		identifier:String
		name:String
	}

	type Episode {
		identifier:String
		code:String
	}

`);
class CharacterType {
}
class Friendship {
}
class Heroes {
}
class Appears {
}
class Character {
}
class Episode {
}

var root = { 
	CharacterType: function({identifier,name}) {
		let sqlSelectFrom = `SELECT 'http://starwars.mappingpedia.linkeddata.es/type/' || id || '' AS tmaf4858f5,name AS name FROM types`
		let sqlWhere = []
		if(identifier != null) { sqlWhere.push("tmaf4858f5 = '"+ identifier +"'") }
		if(name != null) { sqlWhere.push("name = '"+ name +"'") }
		let sql = "";
		if(sqlWhere.length == 0) { sql = sqlSelectFrom} else { sql = sqlSelectFrom + " WHERE " + sqlWhere.join("AND") }
		let data = db.all(sql);
		console.log(`sql = ${sql}`)
		let allInstances = [];
		return data.then(rows => {
			rows.forEach((row) => {
				let instance = new CharacterType();
				instance.identifier = `${row["tmaf4858f5"]}`
				instance.name = row["name"];
				allInstances.push(instance);
			})
			return allInstances;
		});
	}
,
	Friendship: function({identifier,charid,friendId}) {
		let sqlSelectFrom = `SELECT 'http://starwars.mappingpedia.linkeddata.es/friends/' || id || '/' || fid || '' AS tm1e22426c,id AS id,fid AS fid FROM friends`
		let sqlWhere = []
		if(identifier != null) { sqlWhere.push("tm1e22426c = '"+ identifier +"'") }
		if(charid != null) { sqlWhere.push("id = '"+ charid +"'") }
		if(friendId != null) { sqlWhere.push("fid = '"+ friendId +"'") }
		let sql = "";
		if(sqlWhere.length == 0) { sql = sqlSelectFrom} else { sql = sqlSelectFrom + " WHERE " + sqlWhere.join("AND") }
		let data = db.all(sql);
		console.log(`sql = ${sql}`)
		let allInstances = [];
		return data.then(rows => {
			rows.forEach((row) => {
				let instance = new Friendship();
				instance.identifier = `${row["tm1e22426c"]}`
				instance.charid = row["id"];
				instance.friendId = row["fid"];
				allInstances.push(instance);
			})
			return allInstances;
		});
	}
,
	Heroes: function({identifier}) {
		let sqlSelectFrom = `SELECT 'http://starwars.mappingpedia.linkeddata.es/heroes/' || episodeid || '/' || charid || '' AS tm1f911d26 FROM heroes`
		let sqlWhere = []
		if(identifier != null) { sqlWhere.push("tm1f911d26 = '"+ identifier +"'") }
		let sql = "";
		if(sqlWhere.length == 0) { sql = sqlSelectFrom} else { sql = sqlSelectFrom + " WHERE " + sqlWhere.join("AND") }
		let data = db.all(sql);
		console.log(`sql = ${sql}`)
		let allInstances = [];
		return data.then(rows => {
			rows.forEach((row) => {
				let instance = new Heroes();
				instance.identifier = `${row["tm1f911d26"]}`
				allInstances.push(instance);
			})
			return allInstances;
		});
	}
,
	Appears: function({identifier}) {
		let sqlSelectFrom = `SELECT 'http://starwars.mappingpedia.linkeddata.es/movie/' || charid || '/' || episodeid || '' AS tm1d042589 FROM appears`
		let sqlWhere = []
		if(identifier != null) { sqlWhere.push("tm1d042589 = '"+ identifier +"'") }
		let sql = "";
		if(sqlWhere.length == 0) { sql = sqlSelectFrom} else { sql = sqlSelectFrom + " WHERE " + sqlWhere.join("AND") }
		let data = db.all(sql);
		console.log(`sql = ${sql}`)
		let allInstances = [];
		return data.then(rows => {
			rows.forEach((row) => {
				let instance = new Appears();
				instance.identifier = `${row["tm1d042589"]}`
				allInstances.push(instance);
			})
			return allInstances;
		});
	}
,
	Character: function({identifier,name}) {
		let sqlSelectFrom = `SELECT 'http://starwars.mappingpedia.linkeddata.es/character/' || id || '' AS tmbe0fb590,'' || fname || ' ' || lname || '' AS tm29b9fa50 FROM characters`
		let sqlWhere = []
		if(identifier != null) { sqlWhere.push("tmbe0fb590 = '"+ identifier +"'") }
		if(name != null) { sqlWhere.push("tm29b9fa50 = '"+ name +"'") }
		let sql = "";
		if(sqlWhere.length == 0) { sql = sqlSelectFrom} else { sql = sqlSelectFrom + " WHERE " + sqlWhere.join("AND") }
		let data = db.all(sql);
		console.log(`sql = ${sql}`)
		let allInstances = [];
		return data.then(rows => {
			rows.forEach((row) => {
				let instance = new Character();
				instance.identifier = `${row["tmbe0fb590"]}`
				instance.name = `${row["tm29b9fa50"]}`
				allInstances.push(instance);
			})
			return allInstances;
		});
	}
,
	Episode: function({identifier,code}) {
		let sqlSelectFrom = `SELECT 'http://starwars.mappingpedia.linkeddata.es/episode/' || id || '' AS tm52cecf69,code AS code FROM episodes`
		let sqlWhere = []
		if(identifier != null) { sqlWhere.push("tm52cecf69 = '"+ identifier +"'") }
		if(code != null) { sqlWhere.push("code = '"+ code +"'") }
		let sql = "";
		if(sqlWhere.length == 0) { sql = sqlSelectFrom} else { sql = sqlSelectFrom + " WHERE " + sqlWhere.join("AND") }
		let data = db.all(sql);
		console.log(`sql = ${sql}`)
		let allInstances = [];
		return data.then(rows => {
			rows.forEach((row) => {
				let instance = new Episode();
				instance.identifier = `${row["tm52cecf69"]}`
				instance.code = row["code"];
				allInstances.push(instance);
			})
			return allInstances;
		});
	}
	,
	createCharacterType: function({name}) {
		if(identifier == undefined) { identifier = uuid.v4().substring(0,8) }
		if(name == undefined) { name = 'NULL'}	
		let sqlInsert = `INSERT INTO types(name) VALUES('${name}')`
		let status = db.run(sqlInsert).then(dbStatus => { return dbStatus });
		console.log(`sql = ${sqlInsert}`)
		let newInstance = new CharacterType()
		newInstance.name = name
		return newInstance
	}
,
	createFriendship: function({charid,friendId}) {
		if(identifier == undefined) { identifier = uuid.v4().substring(0,8) }
		if(charid == undefined) { charid = 'NULL'}	
		if(friendId == undefined) { friendId = 'NULL'}	
		let sqlInsert = `INSERT INTO friends(id,fid) VALUES('${charid}','${friendId}')`
		let status = db.run(sqlInsert).then(dbStatus => { return dbStatus });
		console.log(`sql = ${sqlInsert}`)
		let newInstance = new Friendship()
		newInstance.charid = charid
		newInstance.friendId = friendId
		return newInstance
	}
,
	createHeroes: function({}) {
		if(identifier == undefined) { identifier = uuid.v4().substring(0,8) }

		let sqlInsert = `INSERT INTO heroes() VALUES()`
		let status = db.run(sqlInsert).then(dbStatus => { return dbStatus });
		console.log(`sql = ${sqlInsert}`)
		let newInstance = new Heroes()

		return newInstance
	}
,
	createAppears: function({}) {
		if(identifier == undefined) { identifier = uuid.v4().substring(0,8) }

		let sqlInsert = `INSERT INTO appears() VALUES()`
		let status = db.run(sqlInsert).then(dbStatus => { return dbStatus });
		console.log(`sql = ${sqlInsert}`)
		let newInstance = new Appears()

		return newInstance
	}
,
	createCharacter: function({}) {
		if(identifier == undefined) { identifier = uuid.v4().substring(0,8) }

		let sqlInsert = `INSERT INTO characters() VALUES()`
		let status = db.run(sqlInsert).then(dbStatus => { return dbStatus });
		console.log(`sql = ${sqlInsert}`)
		let newInstance = new Character()

		return newInstance
	}
,
	createEpisode: function({code}) {
		if(identifier == undefined) { identifier = uuid.v4().substring(0,8) }
		if(code == undefined) { code = 'NULL'}	
		let sqlInsert = `INSERT INTO episodes(code) VALUES('${code}')`
		let status = db.run(sqlInsert).then(dbStatus => { return dbStatus });
		console.log(`sql = ${sqlInsert}`)
		let newInstance = new Episode()
		newInstance.code = code
		return newInstance
	}

};
const app = express();
const port = process.env.PORT || 4321;
app.use('/graphql', graphqlHTTP({schema: schema,  rootValue: root,  graphiql: true,}));
Promise.resolve().then(() => db.open('starwars.sqlite', { Promise }))
	.catch(err => console.error(err.stack))
	.finally(() => app.listen(port));

console.log('Running a GraphQL API server at localhost:4321/graphql');
