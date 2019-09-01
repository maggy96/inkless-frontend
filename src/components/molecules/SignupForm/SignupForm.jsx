import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './SignupForm.css'

import Card, {
  CardPrimaryContent,
  CardActionButtons,
  CardActions,
} from '@material/react-card';
import Button from '@material/react-button';
import TextField, { HelperText, Input } from '@material/react-text-field';
import { disableLoading, enableLoading, setUser } from '../../../state/actions';

class SignupForm extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
    address: "",
    paymentToken: "",
  };

  render() {
    const {
      enableLoading,
      disableLoading,
      signup,
      response,
      history,
      setUser,
    } = this.props;

    disableLoading();

    if (response && response.signup) {
      localStorage.setItem('token', response.signup.token);
      setUser(response.signup.user);
      history.push('/');
    }

    const handleLogin = () => {
      enableLoading();
      signup({
        variables: {
          email: this.state.email,
          password: this.state.password,
          address: "tbd",
          paymentToken: "tbd",
          name: this.state.username,
        }
      });
    };

    return (
      <span className="card-wrapper">
        <Card className="card">
          <CardPrimaryContent>
            <h1>Registrieren</h1>
            <p>Erleben Sie eine Welt voller Wissen.</p>
            <TextField label='Name' helperText={<HelperText>Geben Sie hier Ihren Namen ein.</HelperText>}>
              <Input type="text" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })}></Input>
            </TextField>
            <TextField label='E-Mail-Adresse' helperText={<HelperText>Geben Sie hier Ihre E-Mail-Adresse ein.</HelperText>}>
              <Input id="username" type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}></Input>
            </TextField>
            <TextField label='Passwort' helperText={<HelperText>Geben Sie hier Ihr Passwort ein.</HelperText>}>
              <Input type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}></Input>
            </TextField>
           <p className="termsofservice">Indem Sie fortfahren, erklären Sie sich mit unseren Nutzungsbedingungen und unser Datenschutzerklärung einverstanden.</p>
          </CardPrimaryContent>

          <CardActions>
            <CardActionButtons>
              <Button type="submit" onClick={handleLogin}>Registrieren</Button>
            </CardActionButtons>
          </CardActions>
        </Card>
      </span>
    )
  }
};

const mapDispatchToProps = (dispatch) => ({
  enableLoading: () => dispatch(enableLoading()),
  disableLoading: () => dispatch(disableLoading()),
  setUser: (user) => dispatch(setUser(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(SignupForm));
