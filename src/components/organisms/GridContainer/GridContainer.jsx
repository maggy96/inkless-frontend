import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

import { disableLoading, enableLoading } from '../../../state/actions';
import Grid from '../../molecules/Grid';
import FilterContainer from '../../molecules/FilterContainer';

const GridContainer = (props) => {
  const {
    tag,
    filter,
  } = props;

  return (
    <div className="container-fluid">
      <div className="home row">
        <div className="col-10 offset-1">
          <Query 
            query={gql`
            {
              trending${tag ? ('(tag: "' + tag + '")'):''}{
                _id
                intro
                publisher
                readTime
                tags
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
              return <p>Error: {error.message}</p>;
            } 

            props.disableLoading();
            return (
              <div>
                <FilterContainer></FilterContainer>
                <Grid
                  tag={tag}
                  filter={filter}
                  articles={data.trending}
                >
                </Grid>
              </div>
           );
          }}
         </Query>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  filter: state.filter,
});

const mapDispatchToProps = dispatch => ({
  enableLoading: () => { dispatch(enableLoading()); },
  disableLoading: () => { dispatch(disableLoading()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
