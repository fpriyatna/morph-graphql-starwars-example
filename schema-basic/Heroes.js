import {GraphQLObjectType,GraphQLList,GraphQLNonNull,GraphQLString,GraphQLInt,GraphQLFloat} from 'graphql'
import knex from './database'
const Heroes = new GraphQLObjectType({	description: 'An instance of Heroes',
	name: 'Heroes',
	sqlTable: 'heroes',
	uniqueKey: ['episodeid','charid'],
	fields: () => ({
		identifier:{
			type: GraphQLString,
			sqlDeps: ['episodeid','charid'],
		sqlExpr: table => `'http://starwars.mappingpedia.linkeddata.es/heroes/' || ${table}.episodeid || '/' || ${table}.charid || ''`
		},
		hero:{
			type: new GraphQLList(Character),
			args: {
				identifier:{type:GraphQLString},
				name:{type:GraphQLString}
			},
			where: (table, args, context) => {
				let sqlWhere = []
				if(args.identifier != null) { sqlWhere.push(`'http://starwars.mappingpedia.linkeddata.es/character/' || ${table}.id || '' = '${args.identifier}'`) }
				if(args.name != null) { sqlWhere.push(`'' || ${table}.fname || ' ' || ${table}.lname || '' = '${args.name}'`) }
				if(args.type != null) { sqlWhere.push(`null`) }
				if(args.friends != null) { sqlWhere.push(`null`) }
				if(args.appearsIn != null) { sqlWhere.push(`null`) }
				let sqlWhereString = sqlWhere.join(" AND ")
				console.log(`sqlWhereString = ${sqlWhereString}`)
				return sqlWhereString
			},
			sqlJoin: (child, parent) => `${child}.charid = ${parent}.id`
		},
		episode:{
			type: new GraphQLList(Episode),
			args: {
				identifier:{type:GraphQLString},
				code:{type:GraphQLString}
			},
			where: (table, args, context) => {
				let sqlWhere = []
				if(args.identifier != null) { sqlWhere.push(`'http://starwars.mappingpedia.linkeddata.es/episode/' || ${table}.id || '' = '${args.identifier}'`) }
				if(args.code != null) { sqlWhere.push(`${table}.code = '${args.code}'`) }
				let sqlWhereString = sqlWhere.join(" AND ")
				console.log(`sqlWhereString = ${sqlWhereString}`)
				return sqlWhereString
			},
			sqlJoin: (child, parent) => `${child}.episodeid = ${parent}.id`
		}
	})
})
export default Heroes
import Character from './Character'
import Episode from './Episode'