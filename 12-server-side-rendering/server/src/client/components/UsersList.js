import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => <li key={user.id}>{user.name}</li>);
  }

  render() {
    return (
      <div>
        Here's a big list of users
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users };
};

export const loadData = store => store.dispatch(fetchUsers());

export default connect(mapStateToProps, { fetchUsers })(UsersList);
