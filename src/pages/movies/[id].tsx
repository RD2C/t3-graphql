import React from 'react';
import { gql, useLazyQuery, useQuery } from '@apollo/client';

const query = gql`
query getMovieDetails {
    movies {
        id
        title
    }
}`;

export default function Movie() {
    const { loading, error, data } = useQuery(query, {
        variables: { movieID: 1 },
    });
    return (
        <div>
            <h1>Movie</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error :(</p>}
            {data && <p>{data.movies?.[0]?.title}</p>}
        </div>
    )
}