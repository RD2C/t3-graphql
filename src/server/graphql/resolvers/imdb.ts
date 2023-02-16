import { Movie } from '@prisma/client';
import { prisma } from '../../db';
type MovieFilter = {
    genre: string
    dateAfter: string
    search: string
    hitMoviesOnly: boolean
}

const imdb = {
    Query: {
        movies: (parent: undefined, args: MovieFilter) => {
            return prisma.movie.findMany();
        }
    },
    Movie: {
        writers: (parent: Movie) => {
            return prisma.movie
                .findUnique({
                    where: { id: parent.id || undefined },
                })
                .writers()
        }
    }
}

// module.exports = imdb;
export default imdb;
