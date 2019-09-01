import React from 'react';
import Proptypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import styles from './Card.module.css';
import { mapPublisherToLogo, shorten, mapTagToLang } from '../../util';

const Card = (props) => {
  const {
    _id,
    history,
    intro,
    publisher,
    readTime,
    tags,
    title,
  } = props;

  const goToArticle = (e, id) => {
    e.preventDefault();
    history.push(`/article/${id}`);
  }

    return (
    <div className={classnames(styles.preview, styles['mdc-card'])} onClick={(e) => goToArticle(e, _id)}>
      {publisher &&
        <img alt={publisher} src={mapPublisherToLogo(publisher)} className={styles.brandmark}/>
      }
      <p className={styles.smallprint}>
         {readTime} min • { tags && tags[0] && mapTagToLang(tags[0]) }
      </p>
      <h1 className={styles.headline}>{shorten(title, 75)}</h1>
      <p className={styles.intro}>{shorten(intro, 180)}</p>
    </div>
  )
}

Card.propTypes = {
  _id: Proptypes.string.isRequired,
  intro: Proptypes.string.isRequired,
  publisher: Proptypes.string,
  readTime: Proptypes.number.isRequired,
  title: Proptypes.string.isRequired,
  tags: Proptypes.array,
}

export default withRouter(Card);
