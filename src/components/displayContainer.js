import styled from "styled-components";
import { useState, useEffect  } from "react";
import kimch from '../media2.gif'
import kimchAudio from '../kimchAudio.mp3';


const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`

// 색깔 17개
const colorArr = ['black','red','purple','fuchsia','green','navy','brown','fuchsia','olive','gray','maroon','darkgreen','indigo','tomato','skyblue']

let tempText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ")

const Item = styled.p`
    margin: 10px;
    font-size: 140px;
    font-weight: bold;
`
// const getRandomColor = () => {
//     return "#" + Math.floor(Math.random() * 16777215).toString(16);
// }

// 단어의 갯수 3~7개
const getRandomNumber = () => {
    return Math.floor(Math.random()*3) + 4
}

// num길이의 무작위 색깔배열 반환
const getRandomColor = (num) => {
    let tmpArr = []
    let tmpColorArr = [...colorArr].sort(() => 0.5 - Math.random())
    for (let i = 0; i < num; i++) {
        tmpArr.push(tmpColorArr.pop())
    }
    return tmpArr
    
}



const DisplayContainer = () => {
    const [count,setCount] = useState(0)
    const [renderText,setRenderText] = useState('')
    const [colorCount,setColorCount] = useState(0)
    const [isKimch,setIsKimch] = useState(false);

    const getText = () => {
        let alt = getRandomNumber()
        const tmpArr = getRandomColor(alt)
        let temp = []
        console.log(temp == renderText)
        let j = 0
        for (let i = count; i < count + alt; i++) {
            temp.push([tempText[i],tmpArr[j++]])
        }
        setCount(prev => prev + alt)
        setRenderText(temp)
        console.log(renderText)
        console.log('tmpArr: ', tmpArr)
        setColorCount(0)
    }

    const makeColorWhite = () => {
        let tmp = [...renderText]
        tmp[colorCount][1] = 'white'
        setRenderText(tmp)
        setColorCount(colorCount+1)
        if(colorCount == tmp.length-1){
            setIsKimch(true)
            // audio.play()
        }
    }
    useEffect(()=>{
        setTimeout(function(){
            setIsKimch(false)
            console.log('test')
        },7000)
    },[setIsKimch])

    
    
    
    let audio = new Audio(kimchAudio)
    return(
        <Container>
            {isKimch 
            ? null
            :renderText && 
            renderText.map(
                (item) => <Item style={{color:item[1]}}>{item[0]}</Item>
            )}
            
           
            <img src={isKimch ? kimch: null} />
            <button onClick={()=>{setIsKimch(!isKimch)}}>kimch</button>
            <button onClick={getText}>test</button>
            <button onClick={makeColorWhite}>test2</button>
        </Container>
    )
}

export default DisplayContainer;