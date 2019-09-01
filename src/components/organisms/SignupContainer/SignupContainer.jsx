import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import SignupForm from '../../molecules/SignupForm';

const SIGNUP = gql`
  mutation Signup($email: String! $password: String! $name: String! $address: String! $paymentToken: String!) {
    signup(
      email:$email
      password:$password
      name:$name
      address:$address
      paymentToken:$paymentToken
    ){
      token
      user {
        name
        email
      }
    }
  }
`;

const SignupContainer = () => {
  return (
    <Mutation mutation={SIGNUP}>
      {(signup, { data }) => (
        <SignupForm signup={signup} response={data}>
        </SignupForm>
      )}
    </Mutation>
  )
};

export default SignupContainer;
