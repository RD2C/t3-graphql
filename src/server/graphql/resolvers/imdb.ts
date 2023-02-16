import { Movie } from '@prisma/client';
import { prisma } from '../../db';
type MovieFilter = {
    genre: string
    dateAfter: string
    search: string
    hitMoviesOnly: boolean
}

type MovieArgs = {
    filter: MovieFilter,
    sortBy: string[]
}

type ReviewArgs = {
    text: string
    movieID: string
}


const imdb = {
    Mutation: {
        async reviewMovie(parent: any, args: ReviewArgs, context: any) {
            const { text, movieID } = args
        
            const review = await prisma.review.create({
              data: {
                text,
                movie: {
                  connect: { id: movieID }
                },
                ...(context.user?.id && { user: { connect: { id: context.user?.id } } })
              }
            })
        
            return review ? true : false
        },
        async addView(parent: any, args: { movieID: string }, context: any) {
            const { movieID } = args
            const createdView = await prisma.movieViews.create({
                data: {
                    movie: {
                        connect: { id: movieID }
                    },
                    ...(context.user?.id && { user: { connect: { id: context.user?.id } } })
                },
            });

            return createdView ? true : false
        },
    },
    Query: {
        people: async (parent: undefined, args: { search?: string }) => {
            const people = await prisma.person.findMany({
                where: {
                    ...(args.search &&{
                        OR: [{
                            firstName: {
                                contains: args.search || '',
                            }
                        }, {
                            lastName: {
                                contains: args.search || '',
                            }
                        }]
                    }),
                },
            });
            return people;
        },
        person: async (parent: undefined, args: { id: string }) => {
            const { id } = args;
            const person = await prisma.person.findUnique({
                where: { id },
            });
            return person;
        },
        movie: async (parent: undefined, args: { id: string }) => {
            const { id } = args;
            const movie = await prisma.movie.findUnique({
                where: { id },
            });
            return movie;
        },
        movies: async (parent: undefined, args: MovieArgs) => {
            const { filter={} as never } = args;
            const { genre, dateAfter, hitMoviesOnly, search } = filter;
            const movies = await prisma.movie.findMany({
                where: {
                    ...(hitMoviesOnly && {
                        OR: [{
                            length: {
                                gte: 200,
                            },
                        }, {
                            aired: true,
                        }],
                    }),
                    ...(genre?.length && {
                        genre: {
                            in: [genre],
                        },
                    }),
                    ...(search && {
                        title: {
                            contains: search, 
                        },
                    }),
                }
            });
            return movies;
        }
    },
    Movie: {
        writers: (parent: Movie) => {
            return prisma.movie
                .findUnique({
                    where: { id: parent.id || undefined },
                })
                .writers()
        },
        reviews: (parent: Movie) => {
            return prisma.movie.findUnique({
                where: { id: parent.id || undefined },
            }).reviews();
        }
    }
}

// module.exports = imdb;
export default imdb;
