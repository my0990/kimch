import styled from "styled-components";
import { useState } from "react";
import { Link } from 'react-router-dom'


const Container = styled.div`
    text-align: center;
    textarea {
        width: 80%;
        height: 300px;
    }
    .wrapper {
        display: flex;
        width: 80%;
        justify-content: start;
        margin: 0 auto;
        flex-wrap: wrap;
        p {
            margin: 10px;
        }
    }
    button {
        display: block;
        margin: 0 auto;
    }
`

const KimchContainer = () => {
    const [isCheckClicked,setIsCheckClicked] = useState(false);

    const [value,setValue] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        setIsCheckClicked(true);
    }
    const onChange = (e) => {
        setValue(e.target.value)
    }

    return(
        <Container>
            <h1>문장을 입력하세요</h1>
            <form>
                <textarea onChange={onChange}></textarea>
                <div className="wrapper">
                    {isCheckClicked && 
                        value.split(" ").map(
                            (item) => <p>"{item}"</p>
                        )
                    }
                </div>
                {!isCheckClicked && <button onClick={onSubmit}>확인</button>}
                {isCheckClicked && <Link to="start"><div>시작</div></Link>}
                
            </form>

        </Container>
    )
}

export default KimchContainer;