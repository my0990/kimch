import styled from "styled-components";
import { useState, useEffect, useRef  } from "react";
import kimch from '../media2.gif'
import kimchAudio from '../kimchAudio.mp3';
import useFullscreen from "../api/useFullscreen";
import expandIcon from "../expand.png";
import exitIcon from "../fullscreen.png";
import { render } from "@testing-library/react";


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    min-width: 1190px;
    height: 100vh;
    overflow: hidden;
    .kimchBtn {
        position: absolute;
        bottom: 0;
    };
    img {
        width: 100%;
    }
    .expand {
        width: 60px;
        height: 60px;
        position: absolute;
        top: 20px;
        right: 20px;
        opacity: 10%;
        cursor: pointer;
        &:hover {
            transform: scale(1.1);
            opacity: 100%;
        }
    }
`

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    
`


// let tempText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ")

const Item = styled.p`
    margin: 10px;
    font-size: 150px;
    font-weight: bold;
    text-shadow: -3px 0px black, 0px 3px black, 3px 0px black, 0px -3px black;
    
`
// const getRandomColor = () => {
//     return "#" + Math.floor(Math.random() * 16777215).toString(16);
// }


// num길이의 무작위 색깔배열 반환
const getRandomColor = (num) => {
    let tmpArr = []

    for (let i = 0; i < num; i++) {
        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        
        tmpArr.push("rgb(" + x + "," + y + "," + z + ")")
    }
    return tmpArr
    
}



const DisplayContainer = ({value}) => {
    const [count,setCount] = useState(0)
    const [renderText,setRenderText] = useState('')
    const [colorCount,setColorCount] = useState(0)
    const [isKimch,setIsKimch] = useState(false);
    const focusRef = useRef();
    const [isFullScreen,setIsFullScreen] = useState(false);
    // const audio = new Audio(kimchAudio)
    const [audio,setAudio] = useState(new Audio(kimchAudio))
    const onFulls = (isFull) => {
        console.log(isFull ? "We are full" : "We are small");
    }
    const {element, triggerFull, exitFull} = useFullscreen(onFulls)
    const getText = () => {
        // let alt = getRandomNumber()
        console.log('count: ',count)
        console.log('length: ', value.length)
        if(value.length === 0 || count === value.length){
            window.location.replace('/kimch');
            alert('마지막 문장입니다');
        }
        let tempText = value[count].text.split(" ") //매 라운드 문장
        const tmpColorArr = getRandomColor(tempText.length) //매 라운드 단어 수만큼의 색깔 배열 
        let temp = []  //단어와 색깔 매치 ex) [['hello','red']]

        for (let i = 0; i < tempText.length; i++) {
            temp.push([tempText[i],tmpColorArr[i]])

        }

        setCount(prev => prev + 1)
        setRenderText(temp)
        setColorCount(0);
        
        audio.pause()
        audio.currentTime = 0
    }


    const makeColorWhite = (e) => {
        e.preventDefault();
        if(isKimch){
            setIsKimch(false);
            getText();
            return
        }
        if(e.code == "Space"){
            let tmp = [...renderText]
            if(colorCount == tmp.length-1){ //마지막 단어 도달시
                let temp = Math.random()
                if(temp > 0.5){  //50%확률로 김치송 틀어줌
                    setIsKimch(true)
                    audio.play()
                } else {  //다음 문장으로 넘어가기
                    getText()
                }
            } else {
                tmp[colorCount][1] = 'white'
                setRenderText(tmp)
                setColorCount(colorCount+1)
            }
        }
        
    }
    useEffect(()=>{
        getText();
        focusRef.current.focus();
    },[])
    const onExpand = () => {
        if(!isFullScreen){
            triggerFull();
            setIsFullScreen(true);
        } else {
            exitFull();
            setIsFullScreen(false);
        }
    }

    
    
    
        return(
        <div
            ref={element} 
            style={{background:'white'}}
        >
            <Container
                tabIndex="0"
                onKeyDown={makeColorWhite}
                ref= {focusRef}
                >
                {console.log('test')}
                <Wrapper
                    
                >
                    {isKimch 
                    ? null
                    :renderText && 
                    renderText.map(
                        (item) => <Item style={{color:item[1]}}>{item[0]}</Item>
                    )}
                </Wrapper>
                <img 
                    src={isKimch ? kimch: null} 
                    style={{display: isKimch ? 'block' : 'None'}}
                    alt="김치송"/>
                <img 
                    src={isFullScreen ? exitIcon : expandIcon} 
                    className="expand" 
                    onClick={onExpand}
                    alt="전체화면"
                ></img>
                
                

            </Container>
            </div>
        )
    }



export default DisplayContainer;