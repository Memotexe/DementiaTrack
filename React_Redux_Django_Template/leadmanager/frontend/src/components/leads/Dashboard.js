import React, { Fragment } from 'react';
import Form from './Form';
import Leads from './Leads';
import DBContents from './DBContents';


export default function Dashboard(){
    return (
        <div>
            <Fragment>
                <DBContents /> 
            </Fragment> 
        </div>
    )
}

