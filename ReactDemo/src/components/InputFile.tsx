import React, { useState } from 'react'
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
`;

const Label = styled.label`
`;

const Input = styled.input`
    display: none;
`;

const FileName = styled.p`
`;

function InputFile() {

    const [filename, setFileName] = useState("");

    const onChange = (event: any, cb: any, setFileName: any) => {
        cb(event);
    }

    return (
        <div>
            
        </div>
    )
}

export default InputFile
