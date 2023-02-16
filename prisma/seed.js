const { PrismaClient }= require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Seed actors
  const actor1 = await prisma.person.create({
    data: {
      firstName: 'Tom',
      lastName: 'Hanks',
      actedMovies: {
        create: {
          title: 'Forrest Gump',
          rating: 8.8,
          trailerURL: 'https://www.youtube.com/watch?v=bLvqoHBptjg',
          length: 142,
          aired: true,
        },
      },
    },
  });

  const actor2 = await prisma.person.create({
    data: {
      firstName: 'Leonardo',
      lastName: 'DiCaprio',
      actedMovies: {
        create: {
          title: 'The Wolf of Wall Street',
          rating: 8.2,
          trailerURL: 'https://www.youtube.com/watch?v=iszwuX1AK6A',
          length: 180,
          aired: true,
        },
      },
    },
  });

  // Seed movies
  const movie1 = await prisma.movie.create({
    data: {
      title: 'Inception',
      rating: 8.7,
      trailerURL: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      length: 148,
      aired: true,
      actors: {
        connect: [
          { id: actor2.id },
        ],
      },
      writers: {
        create: [
          {
            firstName: 'Christopher',
            lastName: 'Nolan',
          },
        ],
      },
    },
  });

  const movie2 = await prisma.movie.create({
    data: {
      title: 'The Shawshank Redemption',
      rating: 9.3,
      trailerURL: 'https://www.youtube.com/watch?v=6hB3S9bIaco',
      length: 142,
      aired: true,
      actors: {
        connect: [
          { id: actor1.id },
        ],
      },
      writers: {
        create: [
          {
            firstName: 'Stephen',
            lastName: 'King',
          },
        ],
      },
    },
  });

  console.log({ actor1, actor2, movie1, movie2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
