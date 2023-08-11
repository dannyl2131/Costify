import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
            income
            expenses {
                _id
                name
                amount
            }
            savingsgoal
        }
    }
`;
