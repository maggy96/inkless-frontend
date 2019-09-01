import React from 'react';
import styles from './Grid.module.css';
import Proptypes from 'prop-types';
import Card from '../../atoms/Card';

const Grid = (props) => {
  const {
    articles,
    filter,
  } = props;

  const articleHtml = [];

  articles.forEach(article => {
    if(filter && filter.length !== 0){
      filter.forEach(tag => {
        if(article.tags.includes(tag)){
          articleHtml.push(<Card {...article} />);
          return;
        }
      })
    } else {
      articleHtml.push(<Card {...article} />);
    }
  });

  return (
    <div className={styles.grid}>
      <div className={styles.articleGrid}>
        {articleHtml}
      </div>
    </div>
  )
}

Grid.propTypes = {
  articles: Proptypes.array.isRequired,
  filter: Proptypes.array.isRequired,
}

export default Grid;
