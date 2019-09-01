import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import LoginForm from '../../molecules/LoginForm';

const LOGIN = gql`
  mutation Login($email: String! $password: String!) {
    login(email:$email password:$password){
      token
      user {
        name
        email
      }
    }
  }
`;

const LoginContainer = () => {
  return (
    <Mutation mutation={LOGIN}>
      {(login, { data, error }) => (
        <LoginForm login={login} error={error} response={data}>
        </LoginForm>
      )}
    </Mutation>
  )
};

export default LoginContainer;
