import styled from "styled-components";
import { useState } from "react";
import sentenceConvert from "../api/sentenceConvert";

const Container = styled.div`
    text-align: center;
    textarea {
        width: 80%;
        height: 300px;
    }
`

const KimchContainer = () => {
    const [isStartClicked,setIsStartClicked] = useState(false);
    const [value,setValue] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        setIsStartClicked(true);
    }
    const onChange = (e) => {
        setValue(e.target.value)
    }

    return(
        <Container>
            <h1>문장을 입력하세요</h1>
            <form>
                <textarea onChange={onChange}></textarea>
                <button onClick={onSubmit}>확인</button>
            </form>
            {isStartClicked && 
                value.split(" ").map(
                    (item) => <div>{item}</div>
                )
            }
        </Container>
    )
}

export default KimchContainer;