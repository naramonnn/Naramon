import React from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

import Breadcrumb from '../../layouts/AdminLayout/Breadcrumb';

import { CopyToClipboard } from 'react-copy-to-clipboard';


import AuthMembers from './JWTSignup';

const Signup = () => {
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content-signup">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center ">
            <Card.Body>
              <div className="mb-4">
                <i className="feather icon-user-plus auth-icon" />
              </div>
              <AuthMembers />

            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;


