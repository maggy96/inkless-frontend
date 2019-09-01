import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import classnames from 'classnames';

import styles from './Loader.module.css';

const Loader = (props) => {
  const { loading } = props;
  return (
    <div>
      {loading &&
        <div role="progressbar" className={classnames(styles["mdc-linear-progress"], styles["mdc-linear-progress--indeterminate"], styles["loading"])}>
          <div className={styles["mdc-linear-progress__buffering-dots"]}></div>
          <div className={styles["mdc-linear-progress__buffer"]}></div>
          <div className={classnames(styles["mdc-linear-progress__bar"], styles["mdc-linear-progress__primary-bar"])}>
            <span className={styles["mdc-linear-progress__bar-inner"]}></span>
          </div>
          <div className={classnames(styles["mdc-linear-progress__bar"], styles["mdc-linear-progress__secondary-bar"])}>
            <span className={styles["mdc-linear-progress__bar-inner"]}></span>
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({ loading: state.loading });

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Loader);
