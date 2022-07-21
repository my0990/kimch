import styled from "styled-components";
import Button from 'react-bootstrap/Button'
import { useState, useRef } from "react";
import { Link } from 'react-router-dom'


const Container = styled.div`
    text-align: center;
    min-width: 1190px;
    margin-top: 100px;
    .inputWrapper {
        border: 1px solid black;
        width: 80%;
        height: 300px;
        margin: auto;
        padding: 10px;
        textarea {
            width: 100%;
            height: 80%;
            border: none;
            outline: none;
            ::-webkit-resizer {
                display: none;
            }
        }
    }
    .wrapper {
        display: flex;
        width: 80%;
        justify-content: start;
        margin: 0 auto;
        flex-wrap: wrap;
        p {
            margin: 10px;
            cursor: pointer;
        };
        p:hover{
            color: red;
        }
        
    }
    .nextBtn {
        margin: 30px;
    }

`
let id = 0
// value,setValue props로 받아오기
const KimchContainer = ( {value, setValue}) => {
    const inputRef = useRef()
    const [isReady,setIsReady] = useState(false);
    
    const onSubmit = (e) => {
        if(!isReady){
            setIsReady(true);
        }
        e.preventDefault();
        let tmpWord = []
        let tmpText = inputRef.current.value.split('\n').filter(word => word.length > 0);
        tmpText.forEach(element => tmpWord.push({id: id++, text: element}))
        console.log('tmpWord: ', tmpWord)
        // let tmpText = [...value, ...inputRef.current.value.split('\n')]
        // tmpText = tmpText.filter(word => word.length > 0)
        setValue([...value, ...tmpWord]);
        inputRef.current.value = '';
        inputRef.current.focus();
        console.log('value: ', value);
        
        
    }
    const onRemove = id => {
        setValue(value.filter(item => item.id != id));
    }

    const onShuffle = () => {
        console.log("shuffled")
    }

    return(
        <Container>
            <h1>김치게임</h1>
            <form>
                {/* <div className="textArea">
                    <textarea ref={inputRef}></textarea>
                    <Button className="button" variant="outline-dark" onClick={onSubmit}>문장추가</Button>
                </div> */}
                <div className="inputWrapper">
                    <textarea ref={inputRef} placeholder="문장을 입력하세요"></textarea>
                    <Button className="button" variant="outline-dark" onClick={onSubmit}>문장추가</Button>
                </div>
                <div className="wrapper">
                    {
                        value.map(
                            (item) => <p key={item.id} onClick={()=>{onRemove(item.id)}}>'{item.text}'</p>
                        )
                    }
                </div>
                {isReady &&
                <Link to="start" >
                    <Button className="nextBtn" variant="outline-danger">김치게임 시작</Button>
                </Link>
                }
                
            </form>
            <button onClick={onShuffle}>shuffle</button>
        </Container>
    )
}

export default KimchContainer;