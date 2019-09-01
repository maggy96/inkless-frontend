import React from "react";
import Proptypes from "prop-types";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./Article.module.css";
import de from 'date-fns/locale/de';
import format from 'date-fns/format'
import { mapPublisherToLogo } from '../../util';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class Article extends React.Component {
  timer=null;

  componentDidMount() {
    document.title = "Inkless - " + this.props.title;
    const readMutation = gql`
    mutation Read($articleId: ID!){
      createRead(articleId: $articleId)
    }`;
    if(process.env.NODE_ENV === "production"){
      this.timer = setTimeout(
        () => this.props.client.mutate({
          mutation: readMutation,
          variables: { articleId: this.props._id }
        }),
        Math.round(this.props.text.split(' ').length / 250 * 60000)
      );
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {
      author,
      date,
      intro,
      publisher,
      readTime,
      text,
      title,
    } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className={styles.brandmark}>
              <img className={styles.logo} alt={publisher} src={mapPublisherToLogo(publisher)} />
              <p className={styles.info}>
                ca. {readTime} min Lesedauer • {format(date, 'dddd, DD.MM.YYYY, HH:mm [Uhr]', { locale: de })}
                <br />
                {author}
              </p>
            </div>
            <h1 className={styles.headline}>{title}</h1>
            <p className={styles.intro}>{intro}</p>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  author: Proptypes.string.isRequired,
  date: Proptypes.string.isRequired,
  intro: Proptypes.string.isRequired,
  publisher: Proptypes.string.isRequired,
  readTime: Proptypes.number.isRequired,
  text: Proptypes.string.isRequired,
  title: Proptypes.string.isRequired,
}

export default withApollo(Article);
