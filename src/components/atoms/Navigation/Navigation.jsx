import "@fortawesome/fontawesome-free/css/all.css";
import { withRouter } from 'react-router-dom';
import Button from '@material/react-button';
import classnames from 'classnames';
import { connect } from 'react-redux';
import React from 'react';
import { setUser } from '../../../state/actions';

import "./button.css";
import Loader from '../Loader'
import logo from '../../assets/logo.png';
import styles from "./Navigation.module.css";

const Navigation = (props) => {
  const {
    deleteUserState,
    email,
    history,
    location,
    username,
  } = props;

  const goHome = (e) => {
    e.preventDefault();
    history.push('/');
  }

  const goToLogin = (e) => {
    e && e.preventDefault();
    history.push('/login');
  }

  const conditionalSignup = (e) => {
    e && e.preventDefault();
    if(isOnLoginPage){
      history.push('/signup');
    } else {
      history.push('/login');
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    deleteUserState();
    goToLogin();
  }

  const isLoggedIn = username;
  const isOnLoginPage = location.pathname.includes('login');
  // const isOnSignupPage = location.pathname.includes('signup');

  // Login if there is no user logged in.
  if (!isLoggedIn &&
    !(isOnLoginPage || location.pathname.includes('signup'))
  ) {
    goToLogin();
  }

  return (
    <div>
      <Loader></Loader>
      <header className={classnames(styles["mdc-top-app-bar"], styles["mdc-top-app-bar--fixed"])}>
        <div className={styles["mdc-top-app-bar__row"]}>
          <section className={classnames(styles["mdc-top-app-bar__section"], styles["mdc-top-app-bar__section--align-start"])}>
            <span onClick={goHome} className={classnames(styles["material-icons"], styles["mdc-top-app-bar__navigation-icon"])}>
              <i className="fas fa-bars"></i>
            </span>
            <span className={styles["mdc-top-app-bar__title"]}>
              <img alt="Inkless" onClick={goHome} className={styles.brandmark} src={logo} />
            </span>
          </section>
          <section className={classnames(styles["mdc-top-app-bar__section"], styles["mdc-top-app-bar__section--align-end"])} role="toolbar">
            {isLoggedIn ?
                <img alt="Account"
                  className={styles.profile}
                  src='https://www.xing.com/image/d_9_5_be6163231_23804128_5/magnus-g%C3%B6rlitz-foto.256x256.jpg'
                  onClick={logout}
                />
              :
              <div>
                <Button onClick={conditionalSignup}>
                  {isOnLoginPage ? 'Registrieren' : 'Anmelden'}
                </Button>
              </div>
            }
          </section>
        </div>
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.user.name,
  email: state.user.email,
})

const mapDispatchToProps = (dispatch) => ({
  deleteUserState: () => dispatch(setUser({})),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
