import React from 'react'
import Chat from '../components/Call';
import Form from "../components/Form";

function HomePage(props: any) {
    return (
        <div>
            {/* Navbar.tsx */}
            <Form history={props.history}/>
        </div>
    )
}

export default HomePage
