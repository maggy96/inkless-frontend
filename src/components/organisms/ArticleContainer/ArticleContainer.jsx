import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import Article from '../../atoms/Article';
import { disableLoading, enableLoading } from '../../../state/actions';

const ArticleContainer = (props) => {
  return (
    <div className="container-fluid">
      <Query
        query={gql`
      {
        article(id: "${props.match.params.id}"){
          _id
          author
          date
          intro
          publisher
          readTime
          text
          title
        }
      }
    `}>
        {({ loading, error, data }) => {
          if (loading) {
            props.enableLoading();
            return null;
          }
          if (error) {
            props.disableLoading();
            return <p>Error {error.message}</p>;
          }

          props.disableLoading();
          return (
            <Article {...data.article} />
          )
        }}
      </Query>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  enableLoading: () => { dispatch(enableLoading()); },
  disableLoading: () => { dispatch(disableLoading()); }
});

export default connect(null, mapDispatchToProps)(ArticleContainer);
