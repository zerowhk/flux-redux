import React, { Component } from 'react';
import PropTypes from 'prop-types';



const connect = (mapStateToProps, mapDispatchToProps) => {
     return (RealComponent) => {
        class connectComponent extends Component {
            render() {
                let props;
                if(typeof mapStateToProps === 'function') {
                    props = mapStateToProps(this.context.store);
                }else {
                    props = { };
                }
              
                let events;
                if(typeof mapDispatchToProps === 'function') {
                    events = mapDispatchToProps();
                }else {
                    events = { };
                }
                let mergeProps = Object.assign({ }, props, events);
                return <RealComponent {...mergeProps} />
            }
        }
        
        connectComponent.contextTypes = {
            store: PropTypes.object
        };

        return connectComponent;
     }
}

export default connect;