# TODO Items

- Get latest changes
  - `git stash` (or to delete local changes `git reset --hard HEAD`)
  - `git pull --rebase origin main`
  - `git stash pop` if you've stashed before.

`yarn prisma migrate reset`

- Add more fields to movie: `releaseDate`, `director`, `description`.
    - Add the fields in prisma movie model
    - Use optional field types `director String?`, `releaseDate DateTime?`, `director String?`
    - Run `yarn prisma migrate dev`
    - Add the fields in graphql schema `imdb.graphql`
    - Add the fields in the `Movie.tsx` component in the client

- Add movie rating system. Allow users to rate 1-10, then incorporate the rating in the movie.
    - Add a mutation like `addRating(rating: Float, movi`
    - In the mutation resolver, validate rating is from 1-10 only. Update movie rating.
    - Show an input type="range" for submitting the rating.

- Show actors list in movies.
  - Show actors detail page, with details like name etc.
  - There should be a route in `/actor/[id].tsx` file for each actor.
  - Add more actor fields, like `awards`, `biography`, `birthday`
  - Implement rating system for actors also, similar to movies.
