import React from 'react';
import GridContainer from '../../organisms/GridContainer';
import styles from './RecommendationPage.module.css';

const RecommendationPage = (props) => {
  document.title = "Inkless";
  return(
    <div className={styles.RecommendationPage}>
      <GridContainer></GridContainer>
    </div>
  );
}

export default RecommendationPage;