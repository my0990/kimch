import styled from "styled-components";
import { useState, useRef } from "react";
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
// value,setValue props로 받아오기
const KimchContainer = ( {value, setValue}) => {
    const [isCheckClicked,setIsCheckClicked] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        setIsCheckClicked(true);
        let tmpText = [...value, ...inputRef.current.value.split('\n')]
        setValue(tmpText);
        inputRef.current.value = '';
        inputRef.current.focus();
        console.log(value)
        
    }
    // const onChange = (e) => {
    //     setValue(e.target.value)
    // }

    // 입력값 ref
    const inputRef = useRef()

    return(
        <Container>
            <h1>문장을 입력하세요</h1>
            <form>
                <textarea ref={inputRef}></textarea>
                <div className="wrapper">
                    {isCheckClicked && 
                        value.map(
                            (item) => <p>"{item}"</p>
                        )
                    }
                </div>
                <button onClick={onSubmit}>확인</button>
                {/* {!isCheckClicked && <button onClick={onSubmit}>확인</button>}
                {isCheckClicked && <Link to="start"><div>시작</div></Link>} */}
                
            </form>

        </Container>
    )
}

export default KimchContainer;