import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

const query = gql`
query GetMovie($movieID: ID!) {
    movie(id: $movieID) {
        id
        title
        genre
        reviews {
            id
            text
        }
    }
}
`;

const addMovieReview = gql`
mutation AddMovieReview($movieID:ID, $text:String) {
    reviewMovie(text:$text, movieID:$movieID)
}
`

export function Movie({ movieID }: { movieID: string }) {
    
    const { loading, error, data, refetch } = useQuery(query, {
        variables: { movieID }
    });
    const [review, setReview] = React.useState('');

    const [addReview] = useMutation(addMovieReview, {
        variables: { movieID, text: review }
    });

    const movie = data?.movie;
    return (<div className='container'>

        <li>
            {movie?.title} - {movie?.genre}
        </li>
        <input className='border-2' type="text" value={review} onChange={(e) => setReview(e.target.value)} />
        <div>
            {movie?.reviews?.map((review: any) => (
                <div key={review.id}>{review.text}</div>
            ))}
        </div>
        <button className='border-2' onClick={() => {
            console.log(review);
            addReview({
                variables: { movieID, text: review }
            }).then((res) => {
                refetch();
            });
        }}>Submit</button>
    </div>
    );
}