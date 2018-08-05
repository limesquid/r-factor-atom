import React from 'react';
import { connect } from 'react-redux';

const ComponentComponent = () => (
  <div>Name</div>
);

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export const Component = connect(mapStateToProps, mapDispatchToProps)(ComponentComponent);
