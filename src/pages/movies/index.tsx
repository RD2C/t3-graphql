import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Movie } from '../../components/Movie';

const query = gql`
query MyQuery {
    movies {
        id
        title
        genre
    }
}
`;
export default function Movies() {
    const { loading, error, data } = useQuery(query);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {data?.movies?.map((movie: any) => (
                    <Movie key={movie.id} movieID={movie.id} />
                ))}
            </ul>
        </div>
    );
}
