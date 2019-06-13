import {GraphQLObjectType,GraphQLList,GraphQLNonNull,GraphQLString,GraphQLInt,GraphQLFloat} from 'graphql'
import knex from './database'
const Friendship = new GraphQLObjectType({	description: 'An instance of Friendship',
	name: 'Friendship',
	sqlTable: 'friends',
	uniqueKey: ['id','fid'],
	fields: () => ({
		identifier:{
			type: GraphQLString,
			sqlDeps: ['id','fid'],
		sqlExpr: table => `'http://starwars.mappingpedia.linkeddata.es/friends/' || ${table}.id || '/' || ${table}.fid || ''`
		},
		charid:{
			type: GraphQLString,
			sqlColumn: 'id'
		},
		friendId:{
			type: GraphQLString,
			sqlColumn: 'fid'
		}
	})
})
export default Friendship
