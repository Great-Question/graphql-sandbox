const express = require("express");
const controller = require("./controller/controller.js");
const expressGraphQL = require('express-graphql').graphqlHTTP;
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLDate, GraphQLList, GraphQLNonNull } = require('graphql');
const app = express();



const PeopleType = new GraphQLObjectType({
    name: 'People',
    description: 'This represents people',
    fields: () => ({
        '_id': {type: GraphQLNonNull(GraphQLInt)},
        'name': {type: GraphQLNonNull(GraphQLString)},
        'height': {type: GraphQLNonNull(GraphQLInt)},
        'mass': {type: GraphQLNonNull(GraphQLInt)},
        'hair_color': {type: GraphQLNonNull(GraphQLString)},
        'skin_color': {type: GraphQLNonNull(GraphQLString)},
        'eye_color': {type: GraphQLNonNull(GraphQLString)},
        'birth_year': {type: GraphQLNonNull(GraphQLString)},
        'gender': {type: GraphQLNonNull(GraphQLString)},
        'homeworld': {type: GraphQLNonNull(GraphQLString)},
        'films': {
            type: new GraphQLList(FilmType),
            resolve: (people) => controller.getFilmsByPeopleId(people._id)
        },
        // }, // array of strings
        // 'species': {type: }, // array of strings
        // 'vehicles': {type: }, // array of strings
        // 'starships': {type: }, // array of strings
        'created': {type: GraphQLNonNull(GraphQLString)},
        'edited': {type: GraphQLNonNull(GraphQLString)},
        'url': {type: GraphQLNonNull(GraphQLString)},
    })
})

const FilmType = new GraphQLObjectType({
    name: 'Film',
    description: 'This represents films',
    fields: () => ({
        '_id': {type: GraphQLNonNull(GraphQLInt)},
        'title': {type: GraphQLNonNull(GraphQLString)},
        'director': {type: GraphQLNonNull(GraphQLString)},
        'opening_crawl': {type: GraphQLString},
        'producer': {type: GraphQLNonNull(GraphQLString)},
        'release_date': {type: GraphQLDate},
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        people: {
            type: new GraphQLList(PeopleType),
            description: 'List of All Characters',
            resolve: () => controller.getCharacters()
        },
        films: {
            type: new GraphQLList(FilmType),
            description: 'List of All Films',
            resolve: () => controller.getFilms()
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))




app.listen(3000, () => console.log("server is listening on port 3000"))
