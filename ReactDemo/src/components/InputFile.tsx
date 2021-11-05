<<<<<<< HEAD
import React, { useState } from 'react'
=======
import React from "react";
>>>>>>> ad09ed0dcc6fa8185a801e0e00ef54c4e3e60ab0
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
<<<<<<< HEAD

    const [filename, setFileName] = useState("");

    const onChange = (event: any, cb: any, setFileName: any) => {
        cb(event);
    }

    return (
        <div>
            
        </div>
    )
=======
  return <div></div>;
>>>>>>> ad09ed0dcc6fa8185a801e0e00ef54c4e3e60ab0
}

export default InputFile;
