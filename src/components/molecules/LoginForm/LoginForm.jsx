import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import './LoginForm.css'

import Card, {
  CardPrimaryContent,
  CardActionButtons,
  CardActions,
} from '@material/react-card';
import Button from '@material/react-button';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { disableLoading, enableLoading, setUser } from '../../../state/actions';

class LoginForm extends React.Component {
  render() {
    const {
      load,
      login,
      response,
      history,
      setUser,
      loading,
      stopLoad,
      error,
    } = this.props;

    stopLoad();

    if (response && response.login) {
      localStorage.setItem('token', response.login.token);
      setUser(response.login.user);
      history.push('/');
    }

    return (
      <span className="card-wrapper">
        <Card className="card">
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              let errors = {};
              if (!values.email) {
                errors.email = 'E-Mail-Addresse wird benötigt.';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Ungültige E-Mail-Adresse.';
              } else if (
                !values.password
              ) {
                errors.password = 'Passwort wird benötigt.'
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              load();
              login({ variables: { email: values.email, password: values.password } });
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>
                  <CardPrimaryContent initRipple={false}>
                    <h1>Anmelden</h1>
                    <p>Bitte melden Sie sich an.</p>
                    <TextField label='E-Mail-Adresse' helperText={<HelperText>Geben Sie hier Ihre E-Mail-Adresse ein.</HelperText>}>
                      <Input id="email" type="email" value={values.email} onChange={handleChange}></Input>
                    </TextField>
                    <TextField label='Passwort' helperText={<HelperText>Geben Sie hier Ihr Passwort ein.</HelperText>}>
                      <Input type="password" name="password" value={values.password} onChange={handleChange}></Input>
                    </TextField>
                    <p className="errors">
                      {errors.email && touched.email && errors.email}
                      {errors.password && touched.password && errors.password}
                      {error && error.message}
                    </p>
                    <p className="termsofservice">Indem Sie fortfahren, erklären Sie sich mit unseren Nutzungsbedingungen und unser Datenschutzerklärung einverstanden.</p>
                  </CardPrimaryContent>
                  <CardActions>
                    <CardActionButtons>
                      <Button disabled={loading} outlined type="submit" onClick={handleSubmit}>Anmelden</Button>
                      <Button>Passwort vergessen</Button>
                    </CardActionButtons>
                  </CardActions>
                </form>
              )}
          </Formik>
        </Card>
      </span>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  load: () => dispatch(enableLoading()),
  stopLoad: () => dispatch(disableLoading()),
  setUser: (user) => dispatch(setUser(user)),
});

const mapStateToProps = state => ({
  loading: state.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));
