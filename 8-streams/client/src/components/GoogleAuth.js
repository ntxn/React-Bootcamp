import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: 'GOOGLE_OAUTH2_CLIENT_ID',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) this.props.signIn(this.auth.currentUser.get().getId());
    else this.props.signOut();
  };

  onSignInClick = () => this.auth.signIn();

  onSignOutClick = () => this.auth.signOut();

  renderAuthButton() {
    if (this.props.isSignedIn === null) return null;

    const btnConfig = {
      signIn: {
        fn: this.onSignInClick,
        text: 'Sign In With Google',
      },
      signOut: {
        fn: this.onSignOutClick,
        text: 'Sign Out',
      },
    };

    const { fn, text } = btnConfig[
      this.props.isSignedIn ? 'signOut' : 'signIn'
    ];

    return (
      <button onClick={fn} className="ui red google button">
        <i className="google icon" />
        {text}
      </button>
    );
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
