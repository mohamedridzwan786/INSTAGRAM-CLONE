import React from 'react';
import { Link } from "react-router-dom";
import ModalForm from '../components/Modal';
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { TiSocialInstagram } from "react-icons/ti";
import { MdAccountCircle } from "react-icons/md";
import { IoIosNavigate } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';


class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,


    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,

    });
  }

  handleLogOut = event => {

    event.preventDefault()
    localStorage.removeItem('jwt')
    this.props.setUser()
  }

  render() {
    return (
      <Navbar color="dark" variant="light" expand="md" sticky="top">
        <NavbarBrand style={styles.NavBarHeader} href="/"><TiSocialInstagram/>Instagram</NavbarBrand>
        

        <form className= "form-inline my-2 my-lg-0" action="/users/search" method="GET">
          <input className="form-control mr-sm-2" type="search" name="users" placeholder="Search" aria-label="Search"/>
          <button type="submit" className="btn btn-outline-info my-2 my-sm-0"  value="Search"> Search </button>
        </form>
        
        
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem onClick={this.props.currentUser}>
              <Link to={`/profile`}><NavLink><MdAccountCircle/></NavLink></Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle>
              <IoIosArrowDropdownCircle />
                    </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <Link to={`/DiscoverPeople`}><NavLink><IoIosNavigate/>Discover People</NavLink></Link>
                      </DropdownItem>
                <DropdownItem>
                <Link to={`/Notifications`}><NavLink><IoIosNotifications/>Notifications</NavLink></Link>
                      </DropdownItem>
                <DropdownItem divider />
                {this.props.currentUser ?
                  <DropdownItem onClick={this.handleLogOut}>{this.props.buttonLabel}{this.props.currentUser && 'Log Out'}</DropdownItem>

                  : <ModalForm currentUser={this.props.currentUser} setUser={this.props.setUser}><button /></ModalForm>
                }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse >
      </Navbar >
    );
  }
}

const styles = {
  Navbar: {
    backgroundColor: 'grey'
  },
  NavBarHeader: {
    fontFamily: 'Lobster',
  }
}
export default NavBar;