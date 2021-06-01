import React, { Component } from 'react';
import { connect } from 'react-redux';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

import Avatar from '@material-ui/core/Avatar';
import * as actions from '../../../store/actions/index';

class NavigationItems extends Component {
  // componentDidMount() {
  //   this.props.onGetProfileImage();
  // }

  render() {
    let navigationItems = (<ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>Trang chủ</NavigationItem>
      <NavigationItem link="/login">Đăng nhập</NavigationItem>
    </ul>);

    // let avatar = (
    //   <AccountCircleRoundedIcon
    //     className={classes.ProfileIcon}
    //     style={{ color: '#07627e' }}
    //   >
    //   </AccountCircleRoundedIcon>
    // );

    // if (localStorage.getItem('profileImage') !== 'null') {
    //   avatar = (
    //     <Avatar
    //       alt="Remy Sharp"
    //       src={this.props.profileImage + `?a=${Math.random()}`}
    //       style={{
    //         height: '25px',
    //         width: '25px',
    //         marginTop: '17px',
    //         marginRight: '-12px'
    //       }}
    //     />
    //   );
    // }

    if (localStorage.getItem('token') !== null) {
      navigationItems = (<ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Trang chủ</NavigationItem>
        <NavigationItem link="/testing" exact>Xét nghiệm</NavigationItem>
        <NavigationItem link="/check-in" exact>Check-in</NavigationItem>
        <NavigationItem link="/itinerary" exact>Lịch trình</NavigationItem>
        <div className={classes.ProfileContainer}>
          <Avatar
            alt="Remy Sharp"
            src={localStorage.getItem('profileImage')}
            style={{
              height: '25px',
              width: '25px',
              marginTop: '17px',
              marginRight: '-12px'
            }}
          />
          <NavigationItem link="/user-profiles">{localStorage.getItem('user')}</NavigationItem>
        </div>

      </ul>);
    }

    return (
      <div>
        {navigationItems}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileImage: state.setProfileImage.profileImage
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetProfileImage: () => dispatch(actions.getProfileImage())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);